const db = require("../models/index");
const doctorSevice = require("../services/doctorService");
const moment = require("moment");

class DocTorController {

    getAllcode = async (req, res) => {
        try {
            const type = req.params.type;
            let data = await doctorSevice.getAllcode(type);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    //[GET] get-schedule
    getSchedule = async (req, res) => {
        try {
            const doctorId = req.query?.doctorId;
            const date = req.query?.date;
            const data = await db.Schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: date
                },
                attributes: ["timeType"],
                raw: true
            })
            res.status(200).json({
                errCode: 0,
                message: "Get list selected time susscessfully",
                data: data
            })
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    saveSchedule = async (req, res) => {
        try {
            let data = await doctorSevice.saveSchedule(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    saveDataDoctorInfo = async (req, res) => {
        try {
            let data = await doctorSevice.saveDataDoctorInfo(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getDataDoctorInfo = async (req, res) => {
        try {
            const doctorId = req.params.id;
            const data = await db.DoctorInfo.findOne({
                where: {
                    doctorId: doctorId,
                }
            })
            res.status(200).json({
                errCode: 0,
                message: "Get doctor information susscessfully",
                data: data
            })
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    getListAppointment = async (req, res) => {
        try {
            const doctorId = req.query?.doctorId;
            const date = req.query?.date;
            const data = await db.Booking.findAll({
                where: {
                    doctorId: doctorId,
                    date: date,
                    statusId: "S2"
                },
                attributes: {
                    exclude: ['token', "statusId"]
                },
                include: [
                    { model: db.Allcode, as: 'timeAppointment', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'patientData', attributes: ['name', 'phoneNumber', "email", "address", "image"] },
                ],
                raw: true,
                nest: true
            })
            res.status(200).json({
                errCode: 0,
                message: "Get list appointment susscessfully",
                data: data
            })
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    doneAppointment = async (req, res) => {
        try {
            let data = await doctorSevice.doneAppointment(req.body);
            let statusCode = data.status;
            delete data.status;
            return res.status(statusCode).json(data);
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

}

module.exports = new DocTorController;