const db = require("../models/index");
const emailService = require("./emailService");
const { v4: uuidv4 } = require('uuid');

const bookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.patientId) {
                res.status = 404;
                res.errCode = 1;
                res.message = "You need login first";
                res.booking = {};
                resolve(res);
            } else {
                const existSchedule = await db.Schedule.findOne({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date,
                        timeType: data.timeType
                    }
                });

                if (!existSchedule) {
                    res.status = 404;
                    res.errCode = 2;
                    res.message = "Time is not valid";
                    res.booking = {};
                    resolve(res);
                }
                if (existSchedule.currentNumber >= existSchedule.maxNumber) {
                    res.status = 404;
                    res.errCode = 3;
                    res.message = "Over the number of booking";
                    res.booking = {};
                    resolve(res);
                }
                if (existSchedule && existSchedule.currentNumber < existSchedule.maxNumber) {
                    const currentNum = existSchedule.currentNumber;
                    const token = uuidv4();
                    const url = createUrlValidate(token, data.doctorId);
                    const newData = {
                        statusId: "S1",
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        date: data.date,
                        timeType: data.timeType,
                        reason: data.reason,
                        token: token,
                    }
                    const booking = await db.Booking.create(newData);
                    existSchedule.update({ currentNumber: currentNum + 1 });
                    res.status = 200;
                    res.errCode = 0;
                    res.message = "Pls Confirm booking in your email";
                    res.booking = booking;
                    emailService.sendEmail(data, data.language, url);
                    resolve(res);
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const verifyBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.doctorId || !data.token) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Appointment doesn't exist";
                resolve(res);
            } else {
                const booking = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                    }
                });
                console.log(booking)
                if (!booking) {
                    res.status = 404;
                    res.errCode = 2;
                    res.message = "Appointment doesn't exist";
                    resolve(res);
                }
                if (booking) {
                    if (booking.statusId === "S1") {
                        await booking.update({ statusId: "S2" });
                        res.status = 200;
                        res.errCode = 0;
                        res.message = "Confirm susscessfully";
                        resolve(res);
                    } else {
                        res.status = 404;
                        res.errCode = 3;
                        res.message = "Appointment has been activated";
                        resolve(res);
                    }
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const createUrlValidate = (token, id) => {
    return `${process.env.REACT_APP_URL}/verify-booking-appointment?token=${token}&nonce=${id}`;
}

module.exports = { bookAppointment, verifyBookingAppointment }