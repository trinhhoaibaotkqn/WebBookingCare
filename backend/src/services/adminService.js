const db = require("../models/index");
const bcrypt = require('bcrypt');
const ResponseForm = require("../utils/ResponseForm");

const LIMITDATAPAGE = 3;

const getCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.Allcode.findAll({
                where: {
                    type: type
                },
                attributes: ['key', 'valueEn', 'valueVi']
            });
            if (!data) {
                const res = new ResponseForm(404, 1, `Get ${type} fail`, []);
                resolve(res);
            }
            if (data) {
                const res = new ResponseForm(200, 0, `Get ${type} successfully`, data);
                resolve(res);
            }
        } catch (err) {
            reject(err);
        }
    })
}
//------------------------USER------------------------
const getAllUserByRole = (roleid, currentPage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let numPage = parseInt(currentPage);
            const { count, rows } = await db.User.findAndCountAll({
                limit: LIMITDATAPAGE,
                offset: LIMITDATAPAGE * (numPage - 1),
                where: {
                    roleid: roleid
                }, attributes: { exclude: ['password'] },
            });
            let totalPage = Math.ceil(count / LIMITDATAPAGE);
            if (numPage > totalPage) {
                const res = new ResponseForm(404, 1, "Page is not valid", []);
                resolve(res);
                return;
            }
            else {
                let data = {
                    page: numPage,
                    perPage: LIMITDATAPAGE,
                    totalPage: totalPage,
                    total: count,
                    data: rows
                }
                const res = new ResponseForm(200, 0, "Get data successfully", data);
                resolve(res);
                return;
            }
        } catch (err) {
            reject(err);
        }
    })
}

const createUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!userData.name || !userData.email || !userData.password || !userData.phoneNumber || !userData.address
                || !userData.gender || !userData.positionId || !userData.roleid) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing parameters";
                res.user = {};
                resolve(res);
            } else {
                const existUser = await db.User.findOne({ where: { email: userData.email } });
                if (existUser) {
                    res.status = 404;
                    res.errCode = 2;
                    res.message = "Email already exist";
                    res.user = {};
                    resolve(res);
                }
                let position = await isValidValue("POSITION", userData.positionId);
                let gender = await isValidValue("GENDER", userData.gender);
                let role = await isValidValue("ROLE", userData.roleid);
                if (!position || !gender || !role) {
                    res.status = 404;
                    res.errCode = 3;
                    res.message = "Position, gender or role is not valid";
                    res.user = {}
                    resolve(res);
                }
                if (!existUser && position && gender && role) {
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hash(userData.password, salt);
                    let isValidImage = true;
                    if (userData?.image?.length > 10000000) {
                        res.status = 404;
                        res.errCode = 7;
                        res.message = "Image size is too large";
                        res.user = {};
                        isValidImage = false;
                        resolve(res);
                    } else {
                        const newUser = {
                            name: userData.name,
                            email: userData.email,
                            password: hashed,
                            gender: userData.gender,
                            phoneNumber: userData.phoneNumber,
                            address: userData.address,
                            image: userData.image,
                            roleid: userData.roleid,
                            positionId: userData.positionId,
                        }
                        const user = await db.User.create(newUser, { raw: true });
                        delete user.dataValues.password;
                        res.status = 200;
                        res.errCode = 0;
                        res.message = "User already is created";
                        res.user = user;
                        resolve(res);
                    }

                }
            }

        } catch (err) {
            reject(err);
        }
    })
}

const editUser = async (id, dataUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let userExist = await db.User.findOne({
                where: {
                    id: id
                }
            });
            if (!userExist) {
                res.status = 404;
                res.errCode = 1;
                res.message = "User does not exist";
                res.user = {};
                resolve(res);
            };
            if (!dataUpdate.name || !dataUpdate.phoneNumber || !dataUpdate.address
                || !dataUpdate.roleid || !dataUpdate.gender || !dataUpdate.positionId) {
                res.status = 404;
                res.errCode = 2;
                res.message = "Missing parameters";
                res.user = {};
                resolve(res);
            } else {
                let position = await isValidValue("POSITION", dataUpdate.positionId);
                let gender = await isValidValue("GENDER", dataUpdate.gender);
                let role = await isValidValue("ROLE", dataUpdate.roleid);
                if (!position || !gender || !role) {
                    res.status = 404;
                    res.errCode = 3;
                    res.message = "Position, gender or role is not valid";
                    res.user = {}
                    resolve(res);
                }
                if (userExist && position && gender && role) {
                    newData = {
                        name: dataUpdate.name,
                        gender: dataUpdate.gender,
                        address: dataUpdate.address,
                        phoneNumber: dataUpdate.phoneNumber,
                        roleid: dataUpdate.roleid,
                        positionId: dataUpdate.positionId,
                    }
                    let isValidImage = true;
                    if (dataUpdate && dataUpdate.image) {
                        newData.image = dataUpdate.image;
                        if (dataUpdate.image.length > 10000000) {
                            res.status = 404;
                            res.errCode = 7;
                            res.message = "Image size is too large";
                            res.user = {};
                            isValidImage = false;
                            resolve(res);
                        }
                    }
                    let existEmail;
                    if (dataUpdate.isUpdateEmail) {
                        if (!dataUpdate.email) {
                            res.status = 404;
                            res.errCode = 4;
                            res.message = "Email is not valid";
                            res.user = {};
                            resolve(res);
                        } else {
                            existEmail = await db.User.findOne({ where: { email: dataUpdate.email } });
                            if (existEmail) {
                                res.status = 404;
                                res.errCode = 5;
                                res.message = "Email already exist";
                                res.user = {};
                                resolve(res);
                            } else {
                                newData.email = dataUpdate.email;
                            }
                        }
                    }
                    let validPassword = true;
                    if (dataUpdate.isUpdatePassword) {
                        if (!dataUpdate.password) {
                            res.status = 404;
                            res.errCode = 6;
                            res.message = "Missming password";
                            res.user = {};
                            resolve(res);
                        } else {
                            const salt = await bcrypt.genSalt(10);
                            const hashed = await bcrypt.hash(dataUpdate.password, salt);
                            newData.password = hashed;
                        }
                    }
                    if (!existEmail && validPassword && isValidImage) {
                        await userExist.update(newData);
                        delete userExist.dataValues.password;
                        res.status = 200;
                        res.errCode = 0;
                        res.message = "User already is updated";
                        res.user = userExist;
                        resolve(res);
                    }
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            const user = await db.User.findOne({
                where: {
                    id: id
                }
            });
            if (!user) {
                res.status = 404;
                res.errCode = 1;
                res.message = "User does not exist";
                resolve(res);
            }
            if (user) {
                user.destroy();
                res.status = 200;
                res.errCode = 0;
                res.message = "Delete user successfully";
                resolve(res);
            }
        } catch (err) {
            reject(err);
        }
    })
}
//--------------INFO DOCTOR--------------------
const getListNameClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.Clinic.findAll({
                attributes: ["id", "name"],
            });
            const res = new ResponseForm(200, 0, "Get data successfully", data);
            resolve(res);
        } catch (err) {
            reject(err);
        }
    })
}

const getListNameSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.Specialty.findAll({
                attributes: ["id", "name"],
            });
            const res = new ResponseForm(200, 0, "Get data successfully", data);
            resolve(res);
        } catch (err) {
            reject(err);
        }
    })
}

const getInfoDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.Markdown.findOne({
                where: {
                    doctorInfoId: doctorId
                }
            })
            const res = new ResponseForm(200, 0, "Get information doctor successfully", data)
            resolve(res);
        } catch (err) {
            reject(err);
        }
    })
}

const saveInfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.description) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing data input";
                res.info = {};
                resolve(res);
            } else {
                const existData = await db.Markdown.findOne({
                    where: {
                        doctorInfoId: data.doctorId
                    }
                });
                const newInfo = {
                    doctorInfoId: data.doctorId,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    clinicId: data.clinicId ?? null,
                    specialtyId: data.specialtyId ?? null
                };
                if (!existData) {
                    const content = await db.Markdown.create(newInfo);
                    res.status = 200;
                    res.errCode = 0;
                    res.message = "Content already is created";
                    res.info = content;
                    resolve(res);
                }
                if (existData) {
                    const content = await existData.update(newInfo);
                    res.status = 200;
                    res.errCode = 0;
                    res.message = "Content already is updated";
                    res.info = content;
                    resolve(res);
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}
//----------------SPECIALTY----------------------
const getAllSpecialty = (currentPage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let numPage = parseInt(currentPage);
            const { count, rows } = await db.Specialty.findAndCountAll({
                limit: LIMITDATAPAGE,
                offset: LIMITDATAPAGE * (numPage - 1),
            });
            let totalPage = Math.ceil(count / LIMITDATAPAGE);
            if (numPage > totalPage) {
                const res = new ResponseForm(404, 1, "Page is not valid", []);
                resolve(res);
            }
            else {
                let data = {
                    page: numPage,
                    perPage: LIMITDATAPAGE,
                    totalPage: totalPage,
                    total: count,
                    data: rows
                }
                const res = new ResponseForm(200, 0, "Get list specialty successfully", data);
                resolve(res);
                return;
            }
        } catch (err) {
            reject(err);
        }
    })
}

const createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing parameters";
                res.data = null;
                resolve(res);
            } else {
                const existSpecialty = await db.Specialty.findOne({
                    where: { name: data.name }
                });
                if (existSpecialty) {
                    res.status = 404;
                    res.errCode = 2;
                    res.message = "This specialty already exist";
                    res.data = null;
                    resolve(res);
                } else {

                    if (data.image.length > 10000000) {
                        res.status = 404;
                        res.errCode = 3;
                        res.message = "Image size is too large";
                        res.data = null;
                        resolve(res);
                    } else {
                        const newSpecialty = {
                            name: data.name,
                            image: data.image,
                            descriptionHTML: data.descriptionHTML,
                            descriptionMarkdown: data.descriptionMarkdown,
                        }
                        const specialty = await db.Specialty.create(newSpecialty);
                        res.status = 200;
                        res.errCode = 0;
                        res.message = "Specialty already is created";
                        res.data = specialty;
                        resolve(res);
                    }
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const editSpecialty = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.name || !data.descriptionHTML || !data.descriptionMarkdown) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing parameters";
                res.data = null;
                resolve(res);
            } else {
                const existSpecialty = await db.Specialty.findOne({
                    where: { id: id }
                });
                if (!existSpecialty) {
                    res.status = 404;
                    res.errCode = 2;
                    res.message = "This specialty is not exist";
                    res.data = null;
                    resolve(res);
                } else {
                    const updateSpecialty = {
                        name: data.name,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown,
                    }
                    let isValidImage = true;
                    if (data.image) {
                        if (data.image.length > 10000000) {
                            isValidImage = false;
                            res.status = 404;
                            res.errCode = 3;
                            res.message = "Image size is too large";
                            res.data = null;
                            resolve(res);
                        } else {
                            updateSpecialty.image = data.image;
                        }
                    }
                    if (isValidImage) {
                        const newSpecialty = await existSpecialty.update(updateSpecialty);
                        res.status = 200;
                        res.errCode = 0;
                        res.message = "Update specialty successfully";
                        res.data = newSpecialty;
                        resolve(res);
                    }
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const deleteSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            const specialty = await db.Specialty.findOne({
                where: {
                    id: id
                }
            });
            if (!specialty) {
                res.status = 404;
                res.errCode = 1;
                res.message = "This specialty does not exist";
                resolve(res);
            }
            if (specialty) {
                specialty.destroy();
                res.status = 200;
                res.errCode = 0;
                res.message = "Delete specialty successfully";
                resolve(res);
            }
        } catch (err) {
            reject(err);
        }
    })
}

//--------------------------CLINIC--------------
const getAllClinic = (currentPage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let numPage = parseInt(currentPage);
            const { count, rows } = await db.Clinic.findAndCountAll({
                limit: LIMITDATAPAGE,
                offset: LIMITDATAPAGE * (numPage - 1),
            });
            let totalPage = Math.ceil(count / LIMITDATAPAGE);
            if (numPage > totalPage) {
                const res = new ResponseForm(404, 1, "Page is not valid", []);
                resolve(res);
            }
            else {
                let data = {
                    page: numPage,
                    perPage: LIMITDATAPAGE,
                    totalPage: totalPage,
                    total: count,
                    data: rows
                }
                const res = new ResponseForm(200, 0, "Get list Clinic successfully", data);
                resolve(res);
                return;
            }
        } catch (err) {
            reject(err);
        }
    })
}

const createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.name || !data.address || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing parameters";
                res.data = null;
                resolve(res);
            } else {
                const existClinic = await db.Clinic.findOne({
                    where: { name: data.name }
                });
                if (existClinic) {
                    res.status = 404;
                    res.errCode = 2;
                    res.message = "This specialty already exist";
                    res.data = null;
                    resolve(res);
                } else {

                    if (data.image.length > 10000000) {
                        res.status = 404;
                        res.errCode = 3;
                        res.message = "Image size is too large";
                        res.data = null;
                        resolve(res);
                    } else {
                        const newClinic = {
                            name: data.name,
                            address: data.address,
                            image: data.image,
                            descriptionHTML: data.descriptionHTML,
                            descriptionMarkdown: data.descriptionMarkdown,
                        }
                        const specialty = await db.Clinic.create(newClinic);
                        res.status = 200;
                        res.errCode = 0;
                        res.message = "Specialty already is created";
                        res.data = specialty;
                        resolve(res);
                    }
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const editClinic = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing parameters";
                res.data = null;
                resolve(res);
            } else {
                const existClinic = await db.Clinic.findOne({
                    where: { id: id }
                });
                if (!existClinic) {
                    res.status = 404;
                    res.errCode = 2;
                    res.message = "This clinic is not exist";
                    res.data = null;
                    resolve(res);
                } else {
                    const updateClinic = {
                        name: data.name,
                        address: data.address,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown,
                    }
                    let isValidImage = true;
                    if (data.image) {
                        if (data.image.length > 10000000) {
                            isValidImage = false;
                            res.status = 404;
                            res.errCode = 3;
                            res.message = "Image size is too large";
                            res.data = null;
                            resolve(res);
                        } else {
                            updateClinic.image = data.image;
                        }
                    }
                    if (isValidImage) {
                        const newClinic = await existClinic.update(updateClinic);
                        res.status = 200;
                        res.errCode = 0;
                        res.message = "Update specialty successfully";
                        res.data = newClinic;
                        resolve(res);
                    }
                }
            }
        } catch (err) {
            reject(err);
        }
    })
}

const deleteClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            const clinic = await db.Clinic.findOne({
                where: {
                    id: id
                }
            });
            if (!clinic) {
                res.status = 404;
                res.errCode = 1;
                res.message = "This clinic does not exist";
                resolve(res);
            }
            if (clinic) {
                clinic.destroy();
                res.status = 200;
                res.errCode = 0;
                res.message = "Delete clinic successfully";
                resolve(res);
            }
        } catch (err) {
            reject(err);
        }
    })
}

const isValidValue = async (type, key,) => {
    let value = await db.Allcode.findOne({
        where: {
            type: type,
            key: key
        }
    });
    if (!value) {
        return false;
    } else {
        return true
    }
}

module.exports = {
    getAllUserByRole, getCode, getInfoDoctor,
    createUser, editUser, deleteUser, saveInfoDoctor,
    getListNameClinic, getListNameSpecialty,
    createSpecialty, editSpecialty, deleteSpecialty,
    createClinic, editClinic, deleteClinic, getAllSpecialty,
    getAllClinic
}