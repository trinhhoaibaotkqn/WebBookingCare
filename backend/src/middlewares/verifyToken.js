const jwt = require("jsonwebtoken");
const db = require("../models/index");

verifyAccessToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json("You're not authenticated");
    }
}

verifyRefreshToken = async (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json("You're not authenticated");
    }
    const tokenInDB = await db.RefreshToken.findOne({ where: { token: token } });
    if (tokenInDB) {
        const refreshToken = tokenInDB.token;
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            req.refreshToken = refreshToken;
            next();
        });
    }
    else {
        res.status(401).json("Token is not valid");
    }
}

module.exports = { verifyAccessToken, verifyRefreshToken }