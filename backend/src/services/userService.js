const db = require("../models/index");

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
                    const newData = {
                        statusId: "S1",
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        date: data.date,
                        timeType: data.timeType,
                        reason: data.reason
                    }
                    const booking = await db.Booking.create(newData);
                    existSchedule.update({ currentNumber: currentNum + 1 })
                    res.status = 200;
                    res.errCode = 0;
                    res.message = "Create appointment successfully";
                    res.booking = booking;
                    resolve(res);
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = { bookAppointment }