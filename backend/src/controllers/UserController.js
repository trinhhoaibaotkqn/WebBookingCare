const { sequelize } = require("../models/index");
const db = require("../models/index");
const userService = require("../services/userService");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class UserController {

    //[GET] get-top-doctor-home
    getTopDoctorHome = async (req, res) => {
        try {
            let limitInput = req.params.limit;
            let limit;
            if (!limitInput) {
                limit = 10;
            } else {
                limit = parseInt(limitInput);
            }
            const user = await db.User.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
                where: {
                    roleid: "R2"
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'roleData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Markdown, as: 'doctorData', attributes: ['contentHTML', 'contentMarkdown', "description"] },
                ],
                raw: true,
                nest: true
            })
            res.json(user);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[GET] get-detail-doctor/:id
    getDetailDoctor = async (req, res) => {
        try {
            let id = req.params.id;
            const user = await db.User.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'roleData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Markdown, as: 'doctorData', attributes: ['contentHTML', 'contentMarkdown', "description"] },
                ],
                raw: true,
                nest: true
            })
            res.status(200).json({
                errCode: 0,
                message: "Get detail information doctor successfully",
                user: user
            });
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

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
}

module.exports = new UserController;