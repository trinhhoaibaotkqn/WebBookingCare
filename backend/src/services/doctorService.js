const db = require("../models/index");
const _ = require('lodash');
const moment = require("moment");
const emailService = require("./emailService");
const ResponseForm = require("../utils/ResponseForm");

const getAllcode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (type === "ROLE") {
                const res = new ResponseForm(404, 1, `TYPE is not valid`, []);
                resolve(res);
            } else {
                const data = await db.Allcode.findAll({
                    where: {
                        type: type
                    }
                });
                if (!data) {
                    const res = new ResponseForm(404, 1, "Type is not valid", []);
                    resolve(res);
                }
                if (data) {
                    const res = new ResponseForm(200, 0, `Get ${type} successfully`, data);
                    resolve(res);
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const saveSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let dataRequest = [];
            if (!data.listTimeType || data.listTimeType.length <= 0 || !data.doctorId || !data.date) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing required parameters";
                resolve(res);
            } else {
                if (data.listTimeType && data.listTimeType.length > 0) {
                    dataRequest = data.listTimeType.map(item => {
                        return {
                            doctorId: data.doctorId,
                            date: moment(data.date).format('YYYY-MM-DD'),
                            timeType: item,
                        }
                    })
                }
                let dataExist = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date
                    },
                    attributes: ['doctorId', "date", "timeType"],
                    raw: true
                })
                const dataCreate = _.differenceWith(dataRequest, dataExist, _.isEqual);
                const dataDelete = _.differenceWith(dataExist, dataRequest, _.isEqual);
                if (dataCreate && dataCreate.length > 0) {
                    await db.Schedule.bulkCreate(dataCreate);
                }
                if (dataDelete && dataDelete.length > 0) {
                    dataDelete.forEach(async (item) => {
                        await db.Schedule.destroy({
                            where: item,
                            raw: true
                        });
                    })
                }
                const dataDB = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date
                    },
                    attributes: ["timeType"],
                    raw: true
                });
                res.status = 200;
                res.errCode = 0;
                res.message = "Update schedule successfully";
                res.data = dataDB;
                resolve(res);
            }
        } catch (err) {
            reject(err);
        }
    })
}

const saveDataDoctorInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.doctorId || !data.priceId || !data.provinceId
                || !data.paymentId || !data.addressClinic || !data.nameClinic) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing required parameters";
                res.data = {};
                resolve(res);
            } else {
                const existData = await db.DoctorInfo.findOne({
                    where: {
                        doctorId: data.doctorId
                    }
                })
                newData = {
                    doctorId: data.doctorId,
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                    addressClinic: data.addressClinic,
                    nameClinic: data.nameClinic,
                    note: data.note
                }
                if (!existData) {
                    const info = await db.DoctorInfo.create(newData);
                    res.status = 200;
                    res.errCode = 0;
                    res.message = "Create information doctor successfully";
                    res.data = info;
                    resolve(res);
                } else {
                    const info = await existData.update(newData);
                    res.status = 200;
                    res.errCode = 0;
                    res.message = "Update information doctor successfully";
                    res.data = info;
                    resolve(res);
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const doneAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.image || data.image === "") {
                res.status = 404;
                res.errCode = 1;
                res.message = "You forget attach prescription";
                resolve(res);
            } else {
                const existData = await db.Booking.findOne({
                    where: {
                        id: data.id,
                        statusId: "S2"
                    }
                });
                if (existData) {
                    await existData.update({ statusId: "S3" });
                    await emailService.sendEmailCompleteBooking(data, data.language);
                    res.status = 200;
                    res.errCode = 0;
                    res.message = "Completed appointment";
                    resolve(res);
                } else {
                    res.status = 404;
                    res.errCode = 2;
                    res.message = "User is not exist";
                    resolve(res);
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    saveSchedule, saveDataDoctorInfo, doneAppointment,
    getAllcode,
};