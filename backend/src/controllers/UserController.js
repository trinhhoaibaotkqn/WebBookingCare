const { sequelize } = require("../models/index");
const db = require("../models/index");
const userService = require("../services/userService");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class UserController {

    getTopDoctorHome = async (req, res) => {
        try {
            let limitInput = req.params.limit;
            let limit;
            if (!limitInput) {
                limit = 10;
            } else {
                limit = parseInt(limitInput);
            }
            let data = await userService.getTopDoctorHome(limit);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getTopClinic = async (req, res) => {
        try {
            let limitInput = req.query.limit;
            let limit = limitInput ? parseInt(limitInput) : 10;
            let data = await userService.getTopClinic(limit);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getTopSpecialty = async (req, res) => {
        try {
            let limitInput = req.query.limit;
            let limit = limitInput ? parseInt(limitInput) : 10;
            let data = await userService.getTopSpecialty(limit);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[GET] get-detail-doctor/:id
    // getDetailDoctor = async (req, res) => {
    //     try {
    //         let id = req.params.id;
    //         const user = await db.User.findOne({
    //             where: {
    //                 id: id
    //             },
    //             attributes: {
    //                 exclude: ['password']
    //             },
    //             include: [
    //                 { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
    //                 { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
    //                 { model: db.Allcode, as: 'roleData', attributes: ['valueEn', 'valueVi'] },
    //                 { model: db.Markdown, as: 'doctorData', attributes: ['contentHTML', 'contentMarkdown', "description"] },
    //             ],
    //             raw: true,
    //             nest: true
    //         })
    //         res.status(200).json({
    //             errCode: 0,
    //             message: "Get detail information doctor successfully",
    //             user: user
    //         });
    //     } catch (err) {
    //         res.status(500).json("Server error");
    //     }
    // }

    getScheduleDoctor = async (req, res) => {
        try {
            let doctorId = req.query.doctorId;
            let date = req.query.date;
            const data = await db.Schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: date,
                    currentNumber: {
                        [Op.lt]: sequelize.col("maxNumber")
                    }
                },
                include: [
                    { model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });
            res.status(200).json({
                errCode: 0,
                message: "Get schedule successfully",
                data: data
            })
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getDoctorInfoPriceAddressClinic = async (req, res) => {
        try {
            let doctorId = req.params.id;
            const data = await db.DoctorInfo.findOne({
                where: {
                    doctorId: doctorId,
                },
                include: [
                    { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });
            res.status(200).json({
                errCode: 0,
                message: "Get schedule successfully",
                data: data
            })
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[POST] 
    bookAppointment = async (req, res) => {
        try {
            let data = await userService.bookAppointment(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    verifyBookingAppointment = async (req, res) => {
        try {
            let data = await userService.verifyBookingAppointment(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getAllSpecialty = async (req, res) => {
        try {
            let limitInput = req.query?.limit;
            let currentPage = req.query?.currentPage;
            let limit = limitInput ? parseInt(limitInput) : 9;
            let numPage = limitInput ? parseInt(currentPage) : 9;
            let data = await userService.getAllSpecialty(limit, numPage);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getAllClinic = async (req, res) => {
        try {
            let limitInput = req.query?.limit;
            let currentPage = req.query?.currentPage;
            let limit = limitInput ? parseInt(limitInput) : 9;
            let numPage = limitInput ? parseInt(currentPage) : 9;
            let data = await userService.getAllClinic(limit, numPage);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getAllDoctorBySpecialty = async (req, res) => {
        try {
            let limitInput = req.query?.limit;
            let currentPage = req.query?.currentPage;
            let limit = limitInput ? parseInt(limitInput) : 9;
            let numPage = limitInput ? parseInt(currentPage) : 9;
            let specialtyId = req.params.specialtyId;
            let data = await userService.getAllDoctorBySpecialty(specialtyId, limit, numPage);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getAllDoctorByClinic = async (req, res) => {
        try {
            let limitInput = req.query?.limit;
            let currentPage = req.query?.currentPage;
            let limit = limitInput ? parseInt(limitInput) : 9;
            let numPage = limitInput ? parseInt(currentPage) : 9;
            let clinicId = req.params.clinicId;
            let data = await userService.getAllDoctorByClinic(clinicId, limit, numPage);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }
}

module.exports = new UserController;