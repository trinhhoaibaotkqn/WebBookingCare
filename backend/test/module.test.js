const dotenv = require('dotenv').config();
const { generateAccessToken, generateRefreshToken } = require("../src/services/authService");
const { testLogin, testSendEmail, testBookAppointment } = require('./userRequest');
const authController = require("../src/controllers/AuthController")

describe(`Модульное тестирование`, () => {
    // test('Генерировать access token успешно', () => {
    //     const user = {
    //         id: 12,
    //         roleid: "R3"
    //     }
    //     expect(generateAccessToken(user)).not.toBeNull();
    // });

    // test('Генерировать access token не успешно из-за нет пользователя', () => {
    //     const user = null;
    //     let actualResult;
    //     try {
    //         actualResult = generateAccessToken(user);
    //     } catch (err) {
    //         actualResult = null;
    //     }
    //     expect(actualResult).toBeNull();
    // });

    // test('Генерировать refresh token успешно', () => {
    //     const user = {
    //         id: 12,
    //         roleid: "R3"
    //     }
    //     expect(generateRefreshToken(user)).not.toBeNull();
    // });

    // test('Генерировать refresh token не успешно из-за нет пользователя', () => {
    //     const user = null;
    //     let actualResult;
    //     try {
    //         actualResult = generateAccessToken(user);
    //     } catch (err) {
    //         actualResult = null;
    //     }
    //     expect(actualResult).toBeNull();
    // });

    // test('Login успешно', async () => {
    //     const email = "user3@gmail.com";
    //     const password = "1601";
    //     return await testLogin(email, password).then(data => {
    //         expect(data.status).toEqual(200);
    //         expect(JSON.parse(data.text).user.accessToken).not.toBeNull();
    //         expect(data.header["set-cookie"][0]).not.toBeNull();
    //     })
    // });

    // test('Login не успешно из-за неправильный е-мейл и пароль', async () => {
    //     const email = "user3@gmail.ru";
    //     const password = "1601";
    //     return await testLogin(email, password).catch(data => {
    //         expect(data.status).toEqual(404);
    //     })
    // });

    // test('Login не успешно из-за неправильный пароль', async () => {
    //     const email = "user3@gmail.com";
    //     const password = "1602";
    //     return await testLogin(email, password).catch(data => {
    //         expect(data.status).toEqual(404);
    //         expect(JSON.parse(data.response.text).message).toEqual("Wrong password");
    //     })
    // });

    // test('Login не успешно из-за неправильный е-мейл', async () => {
    //     const email = "user3@gmail.ru";
    //     const password = "1601";
    //     return await testLogin(email, password).catch(data => {
    //         expect(data.status).toEqual(404);
    //         expect(JSON.parse(data.response.text).message).toEqual("Wrong email");
    //     })
    // });

    // test('Отправить письмо на почту пациента успешно', async () => {
    //     const patient = {
    //         id: 14,
    //         name: "Hoai Bao",
    //         email: "hbgaming16@gmail.com",
    //         phoneNumber: "+7 389 849 94-73"
    //     }
    //     const doctor = {
    //         id: 2,
    //         name: "Anton",
    //     }
    //     const date = "2023-05-13";
    //     const timeType = "T1";
    //     const timeData = "8:00 AM - 9:00 AM";
    //     let actualResult;
    //     try {
    //         await testSendEmail(patient, doctor, date, timeType, timeData);
    //         actualResult = true;
    //     } catch (err) {
    //         actualResult = true;
    //     }
    //     expect(actualResult).toBe(true);
    // });

    // test('Записаться на прием успешно', async () => {
    //     const patient = {
    //         id: 31,
    //         name: "Hoài Bảo DRG",
    //         email: "hbgaming16@gmail.com",
    //         phoneNumber: "+84325353623"
    //     }
    //     const doctor = {
    //         id: 13,
    //         name: "Anton",
    //     }
    //     const date = "2023-05-13";
    //     const timeType = "T4";
    //     const timeData = "8:00 AM - 9:00 AM";
    //     return await testBookAppointment(patient, doctor, date, timeType, timeData).then(data => {
    //         expect(data.status).toEqual(200);
    //     })
    //     // .catch(data => {
    //     //     console.log(data.status)
    //     //     expect(data.status).toEqual(404);
    //     // })
    // });

    // test('Записаться на прием не успешно из-за неправильный врач', async () => {
    //     const patient = {
    //         id: 31,
    //         name: "Hoài Bảo DRG",
    //         email: "hbgaming16@gmail.com",
    //         phoneNumber: "+84325353623"
    //     }
    //     const doctor = {
    //         id: 32,
    //         name: "Anton",
    //     }
    //     const date = "2023-05-13";
    //     const timeType = "T1";
    //     const timeData = "8:00 AM - 9:00 AM";
    //     return await testBookAppointment(patient, doctor, date, timeType, timeData)
    //         .catch(data => {
    //             expect(data.status).toEqual(404);
    //             expect(JSON.parse(data.response.text).message).toEqual("Time is not valid");
    //         })
    // });

    // test('Записаться на прием не успешно из-за неправильное расписание', async () => {
    //     const patient = {
    //         id: 31,
    //         name: "Hoài Bảo DRG",
    //         email: "hbgaming16@gmail.com",
    //         phoneNumber: "+84325353623"
    //     }
    //     const doctor = {
    //         id: 13,
    //         name: "Anton",
    //     }
    //     const date = "2023-05-15";
    //     const timeType = "T1";
    //     const timeData = "8:00 AM - 9:00 AM";
    //     return await testBookAppointment(patient, doctor, date, timeType, timeData)
    //         .catch(data => {
    //             expect(data.status).toEqual(404);
    //             expect(JSON.parse(data.response.text).message).toEqual("Time is not valid");
    //         })
    // });

    // test('Записаться на прием не успешно из-за неправильное время', async () => {
    //     const patient = {
    //         id: 31,
    //         name: "Hoài Bảo DRG",
    //         email: "hbgaming16@gmail.com",
    //         phoneNumber: "+84325353623"
    //     }
    //     const doctor = {
    //         id: 13,
    //         name: "Anton",
    //     }
    //     const date = "2023-05-15";
    //     const timeType = "T1";
    //     const timeData = "8:00 AM - 9:00 AM";
    //     return await testBookAppointment(patient, doctor, date, timeType, timeData)
    //         .catch(data => {
    //             expect(data.status).toEqual(404);
    //             expect(JSON.parse(data.response.text).message).toEqual("Time is not valid");
    //         })
    // });

    // test('Записаться на прием не успешно из-за того что пациент не авторизован', async () => {
    //     const patient = {}
    //     const doctor = {
    //         id: 13,
    //         name: "Anton",
    //     }
    //     const date = "2023-05-15";
    //     const timeType = "T1";
    //     const timeData = "8:00 AM - 9:00 AM";
    //     return await testBookAppointment(patient, doctor, date, timeType, timeData)
    //         .catch(data => {
    //             expect(data.status).toEqual(404);
    //             expect(JSON.parse(data.response.text).message).toEqual("You need login first");
    //         })
    // });

    test('Записаться на прием не успешно из-за того что данный пациента не существует в систем', async () => {
        const patient = {
            id: 31,
            name: "Hoài Bảo DRG",
            email: "hbgaming16@gmail.com",
            phoneNumber: "+84325353623"
        }
        const doctor = {
            id: 13,
            name: "Anton",
        }
        const date = "2023-05-13";
        const timeType = "T5";
        const timeData = "8:00 AM - 9:00 AM";
        let actualResult;
        await testBookAppointment(patient, doctor, date, timeType, timeData)
            .then(() => {
                actualResult = 200;
            })
            .catch(() => {
                actualResult = 404;
            })

        expect(actualResult).toEqual(200);
    });

})

// describe(`Login успешно -> Записаться на прием успешно -> Отправить письмо на почту пациента успешно`, () => {
//     const doctor = {
//         id: 13,
//         name: "Anton",
//     }
//     const date = "2023-05-13";
//     const timeType = "T2";
//     const timeData = "9:00 AM - 10:00 AM";
//     let patient = {};

//     test('Login успешно', async () => {
//         const email = "hbgaming16@gmail.com";
//         const password = "1601";
//         return await testLogin(email, password).then(data => {
//             patient.id = JSON.parse(data.text).user.id;
//             patient.name = JSON.parse(data.text).user.name;
//             patient.email = JSON.parse(data.text).user.email;
//             patient.phoneNumber = JSON.parse(data.text).user.phoneNumber;
//             expect(data.status).toEqual(200);
//             expect(JSON.parse(data.text).user.accessToken).not.toBeNull();
//             expect(data.header["set-cookie"][0]).not.toBeNull();
//         })
//     });
//     let isSuccess = false;
//     test('Записаться на прием успешно', async () => {

//         return await testBookAppointment(patient, doctor, date, timeType, timeData).then(data => {
//             isSuccess = true;
//             expect(data.status).toEqual(200);
//         })
//     });

//     test('Отправить письмо на почту пациента успешно', async () => {
//         let actualResult = false;
//         if (isSuccess) {
//             actualResult = true;
//         }
//         expect(actualResult).toEqual(true);
//     })
// })

// describe(`Login не успешно -> Записаться на прием не успешно -> Отправить письмо на почту пациента не успешно`, () => {
//     const doctor = {
//         id: 13,
//         name: "Anton",
//     }
//     const date = "2023-05-13";
//     const timeType = "T2";
//     const timeData = "9:00 AM - 10:00 AM";
//     let patient = {};

//     test('Login не успешно', async () => {
//         const email = "user3@gmail.ru";
//         const password = "1601";
//         return await testLogin(email, password).catch(data => {
//             patient.id = null;
//             patient.name = null;
//             patient.email = null;
//             patient.phoneNumber = null;
//             expect(data.status).toEqual(404);
//         })
//     });
//     let isSuccess = false;
//     test('Записаться на прием не успешно', async () => {

//         return await testBookAppointment(patient, doctor, date, timeType, timeData).then(data => {
//             isSuccess = true;
//             expect(data.status).toEqual(200);
//         })
//             .catch(data => {
//                 expect(data.status).toEqual(404);
//             })
//     });

//     test('Отправить письмо на почту пациента не успешно', async () => {
//         let actualResult = false;
//         if (isSuccess) {
//             actualResult = true;
//         }
//         expect(actualResult).toEqual(false);
//     })
// })

// describe(`Login успешно -> Записаться на прием не успешно -> Отправить письмо на почту пациента не успешно`, () => {
//     const doctor = {
//         id: 37,
//         name: "Anton",
//     }
//     const date = "2023-05-13";
//     const timeType = "T2";
//     const timeData = "9:00 AM - 10:00 AM";
//     let patient = {};

//     test('Login успешно', async () => {
//         const email = "hbgaming16@gmail.com";
//         const password = "1601";
//         return await testLogin(email, password).then(data => {
//             patient.id = JSON.parse(data.text).user.id;
//             patient.name = JSON.parse(data.text).user.name;
//             patient.email = JSON.parse(data.text).user.email;
//             patient.phoneNumber = JSON.parse(data.text).user.phoneNumber;
//             expect(data.status).toEqual(200);
//             expect(JSON.parse(data.text).user.accessToken).not.toBeNull();
//             expect(data.header["set-cookie"][0]).not.toBeNull();
//         })
//     });
//     let isSuccess = false;
//     test('Записаться на прием не успешно', async () => {

//         return await testBookAppointment(patient, doctor, date, timeType, timeData).then(data => {
//             isSuccess = true;
//             expect(data.status).toEqual(200);
//         })
//             .catch(data => {
//                 expect(data.status).toEqual(404);
//             })
//     });

//     test('Отправить письмо на почту пациента не успешно', async () => {
//         let actualResult = false;
//         if (isSuccess) {
//             actualResult = true;
//         }
//         expect(actualResult).toEqual(false);
//     })
// })