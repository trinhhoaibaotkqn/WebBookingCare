const db = require("../models/index");
const bcrypt = require('bcrypt');

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
                            image: userData.image
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

module.exports = { createUser, editUser, deleteUser }