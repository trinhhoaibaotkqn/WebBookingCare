const db = require("../models/index");
const doctorSevice = require("../services/doctorService");
const moment = require("moment");

class DocTorController {

    getAllcode = async (req, res) => {
        try {
            const type = req.params.type;
            if (type === "ROLE") {
                res.json({
                    errCode: 1,
                    message: `Type is not valid`,
                    objCode: []
                });
            } else {
                const objCode = await db.Allcode.findAll({
                    where: {
                        type: type
                    }
                })
                if (!objCode) {
                    res.json({
                        errCode: 1,
                        message: `Type is not valid`,
                        objCode: []
                    });
                }
                if (objCode) {
                    res.json({
                        errCode: 0,
                        message: `Get ${type} successfully`,
                        objCode: objCode
                    });
                }
            }

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
}

module.exports = new DocTorController;