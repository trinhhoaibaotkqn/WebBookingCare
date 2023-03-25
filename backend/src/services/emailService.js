const nodemailer = require("nodemailer");
const { languages } = require("../utils/Constants");
const moment = require("moment");
require('moment/locale/vi');

let sendEmail = async (data, language, url) => {
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
        <h3>Chào ${data.name},</h3>
        <p>Cảm ơn bạn đã sử dụng dịch vụ đặt lịch khám bệnh online của chúng tôi trên BookingCare.</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${moment(data.date).locale("vi").format('dddd - DD/MM/yyyy')}, từ ${data.timeData}</b></div>
        <div><b>Bác sỹ: ${data.doctorName}</b></div>
        <div><b>Tên phòng khám: ${data.doctorInfo.nameClinic}</b></div>
        <div><b>Địa chỉ phòng khám: ${data.doctorInfo.addressClinic}, ${data.doctorInfo.provinceData.valueVi}</b></div>
        <div><b>Giá khám: ${data.doctorInfo.priceData.valueVi}đ</b></div>
        <p>Vui lòng kiểm tra lại thông tin và xác nhận bằng cách click vào đường link <a href=${url} target="_blank">tại đây</a></p>
        `
        return content;

    }
    if (language === languages.EN) {
        let content =
            `
        <h3>Dear ${data.name},</h3>
        <p>Thank you for using our online medical appointment booking service on BookingCare.</p>
        <p>Appointment information:</p>
        <div><b>Date and time: ${moment(data.date).locale("en").format('dddd - DD/MM/yyyy')}, ${data.timeData}</b></div>
        <div><b>Doctor: ${data.doctorName}</b></div>
        <div><b>Clinic name: ${data.doctorInfo.nameClinic}</b></div>
        <div><b>Clinic address: ${data.doctorInfo.addressClinic}, ${data.doctorInfo.provinceData.valueEn}</b></div>
        <div><b>Price: ${data.doctorInfo.priceData.valueEn}$</b></div>
        <p>Please check the information and confirm by <a href=${url} target="_blank">Click here</a></p>
        `
        return content;

    }
}

module.exports = { sendEmail }