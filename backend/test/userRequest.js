const superagent = require('superagent');
const { sendEmailConfirmBooking } = require("../src/services/emailService");
const baseURL = 'http://localhost:8080/';
const dotenv = require('dotenv').config();

const testLogin = async (email, password) => {
    return superagent.post(`${baseURL}auth/login`)
        .send({
            email: email,
            password: password
        })
}

const testBookAppointment = async (patient, doctor, date, timeType, timeData) => {
    const dataBooking = {
        doctorId: doctor.id,
        doctorName: doctor.name,

        date: date,
        timeType: timeType,//T1
        timeData: timeData,//8:00 AM - 9:00 AM

        patientId: patient.id,
        patientEmail: patient.email,
        patientName: patient.name,
        patientPhoneNumber: patient.phoneNumber,

        reason: "sick",
        language: "en",
        nameClinic: "Clinic no 5",
        addressClinic: "Zelenograd",
        provinceData: { valueEn: "Moscow" },
        priceData: { valueEn: "2000" }
    }
    return superagent.post(`${baseURL}user/book-appointment`).send(dataBooking);
}

const testSendEmail = async (patient, doctor, date, timeType, timeData) => {
    const data = {
        doctorId: doctor.id,
        doctorName: doctor.name,

        date: date,
        timeType: timeType,//T1
        timeData: timeData,//8:00 AM - 9:00 AM

        patientId: patient.id,
        patientEmail: patient.email,
        patientName: patient.name,
        patientPhoneNumber: patient.phoneNumber,

        reason: "sick",
        language: "en",
        nameClinic: "Clinic no 5",
        addressClinic: "Zelenograd",
        provinceData: { valueEn: "Moscow" },
        priceData: { valueEn: "2000" }
    }
    await sendEmailConfirmBooking(data, "en", "http://localhost:3000");
}

module.exports = {
    testLogin,
    testBookAppointment,
    testSendEmail
}