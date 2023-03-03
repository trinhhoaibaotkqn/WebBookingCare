const db = require("../models/index");
const bcrypt = require('bcrypt');

const createUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!userData.name || !userData.email || !userData.password || !userData.phoneNumber
                || !userData.gender || !userData.positionId || !userData.roleid) {
                res.status = 404;
                res.errCode = 1;
                res.message = "Missing parameters";
                res.user = {};
                resolve(res);
            }
            const existUser = await db.User.findOne({ where: { email: userData.email } });
            if (existUser) {
                res.status = 404;
                res.errCode = 2;
                res.message = "User already exist";
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
            if (position && gender && role) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(userData.password, salt);
                const newUser = {
                    name: userData.name,
                    email: userData.email,
                    password: hashed,
                    gender: userData.gender,
                    phoneNumber: userData.phoneNumber,
                    address: userData.address,
                    image: userData.image,
                    roleid: userData.roleid,
                    positionId: userData.positionId
                }
                const user = await db.User.create(newUser, { raw: true });
                delete user.dataValues.password;
                res.status = 200;
                res.errCode = 0;
                res.message = "User already is created";
                res.user = user;
                resolve(res);
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
            if (!dataUpdate.name || !dataUpdate.email || !dataUpdate.password || !dataUpdate.phoneNumber
                || !dataUpdate.roleid || !dataUpdate.gender || !dataUpdate.positionId) {
                res.status = 404;
                res.errCode = 2;
                res.message = "Missing parameters";
                res.user = {};
                resolve(res);
            }
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
                if (dataUpdate.password !== userExist.password) {
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hash(dataUpdate.password, salt);
                    dataUpdate.password = hashed;
                }
                await userExist.update(dataUpdate);
                delete userExist.dataValues.password;
                res.status = 200;
                res.errCode = 0;
                res.message = "User already is updated";
                res.user = userExist;
                resolve(res);
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