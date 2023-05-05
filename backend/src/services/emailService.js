const nodemailer = require("nodemailer");
const { languages } = require("../utils/Constants");
const moment = require("moment");
require('moment/locale/vi');
const { Buffer } = require("buffer");

let sendEmailConfirmBooking = async (data, language, url) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });
    let content = getContentEmailConfirmBooking(data, language, url);
    await transporter.sendMail({
        from: '"BookingCare 👻" <baotrinh160120@gmail.com>', // sender address
        to: `${data.patientEmail}, ${data.patientEmail}`, // list of receivers
        subject: language === languages.EN ? "Confirm booking appointment✔" : "Xác nhận lịch khám bệnh✔", // Subject line
        html: content, // html body
    });
}

const getContentEmailConfirmBooking = (data, language, url) => {
    if (language === languages.VI) {
        let content = `
        <h3>Chào ${data.patientName},</h3>
        <p>Cảm ơn bạn đã sử dụng dịch vụ đặt lịch khám bệnh online của chúng tôi trên BookingCare.</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${moment(data.date).locale("vi").format('dddd - DD/MM/yyyy')}, từ ${data.timeData}</b></div>
        <div><b>Bác sỹ: ${data.doctorName}</b></div>
        <div><b>Tên phòng khám: ${data.nameClinic}</b></div>
        <div><b>Địa chỉ phòng khám: ${data.addressClinic}, ${data.provinceData.valueVi}</b></div>
        <div><b>Giá khám: ${data.priceData.valueVi}đ</b></div>
        <p>Vui lòng kiểm tra lại thông tin và xác nhận bằng cách click vào đường link <a href=${url} target="_blank">tại đây</a></p>
        `
        return content;
    }
    if (language === languages.EN) {
        let content =
            `
        <h3>Dear ${data.patientName},</h3>
        <p>Thank you for using our online medical appointment booking service on BookingCare.</p>
        <p>Appointment information:</p>
        <div><b>Date and time: ${moment(data.date).locale("en").format('dddd - DD/MM/yyyy')}, ${data.timeData}</b></div>
        <div><b>Doctor: ${data.doctorName}</b></div>
        <div><b>Clinic name: ${data.nameClinic}</b></div>
        <div><b>Clinic address: ${data.addressClinic}, ${data.provinceData.valueEn}</b></div>
        <div><b>Price: ${data.priceData.valueEn}$</b></div>
        <p>Please check the information and confirm by <a href=${url} target="_blank">Click here</a></p>
        `
        return content;
    }
}

let sendEmailCompleteBooking = async (data, language) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });
    let content = getContentEmailCompleteBooking(data, language);
    await transporter.sendMail({
        from: '"BookingCare 👻" <baotrinh160120@gmail.com>', // sender address
        to: `${data.patientEmail}, ${data.patientEmail}`, // list of receivers
        subject: language === languages.EN ? "Prescription of examination✔" : "Đơn thuốc khám bệnh✔", // Subject line
        html: content,
        attachments: [
            {
                fileName: 'prescription',
                content: data.image.split("base64,")[1],
                encoding: 'base64'
            }]
    });
}

const getContentEmailCompleteBooking = (data, language) => {
    if (language === languages.VI) {
        let content =
            `
        <h3>Chào ${data.name},</h3>
        <p>Bạn nhận được thư này bởi vì bạn đã khám bệnh xong.</p>
        <p>Thông tin đơn thuốc được gửi trong tệp đính kèm</p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ.</p>
        `
        return content;
    }
    if (language === languages.EN) {
        let content =
            `
        <h3>Dear ${data.name},</h3>
        <p>You are receiving this message because you have completed your medical examination.</p>
        <p>Prescription information is sent in attachment</p>
        <p>Thank you for using the service.</p>
        `
        return content;
    }
}

module.exports = { sendEmailConfirmBooking, sendEmailCompleteBooking }