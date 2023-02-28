const jwt = require('jsonwebtoken');
const db = require("../models/index");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            roleid: user.roleid
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '10s' },
    );
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            roleid: user.roleid
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '7d' },
    );
}

const saveRefreshTokenToDB = async (refreshToken, user) => {
    const tokenExist = await db.RefreshToken.findOne({ where: { userid: user.id } });
    if (tokenExist) {
        await db.RefreshToken.update({ token: refreshToken }, {
            where: {
                userid: user.id
            }
        });
    } else {
        await db.RefreshToken.create({
            userid: user.id,
            token: refreshToken
        });
    }
}

module.exports = { generateAccessToken, generateRefreshToken, saveRefreshTokenToDB }