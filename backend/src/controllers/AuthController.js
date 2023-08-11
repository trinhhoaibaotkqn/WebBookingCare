const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const { generateAccessToken, generateRefreshToken, saveRefreshTokenToDB } = require("../services/authService");

class AuthController {
    //[POST] register
    register = async (req, res) => {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(404).json({
                    errCode: 1,
                    message: "Missing email or password",
                    user: {}
                });
            }
            const existUser = await db.User.findOne({ where: { email: req.body.email } });
            if (existUser)
                return res.status(404).json({
                    errCode: 2,
                    message: "User already exist",
                    user: {}
                });
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = {
                name: req.body.name,
                password: hashed,
                email: req.body.email,
                gender: req.body.gender,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                image: req.body.image,
                roleid: "R3",
            };
            const user = await db.User.create(newUser, { raw: true });
            delete user.dataValues.password;
            res.status(200).json({
                errCode: 0,
                message: "User created successfully",
                user: user
            });
        } catch (err) {
            res.status(500).json("Server error");
        }
    }

    // [POST] login
    async login(req, res) {
        try {
            const user = await db.User.findOne({
                where: { email: req.body.email },
                raw: true
            });
            if (!user) {
                return res.status(404).json({
                    errCode: 1,
                    message: "Wrong email",
                    user: {}
                });
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json({
                    errCode: 1,
                    message: "Wrong password",
                    user: {}
                });
            }
            if (user && validPassword) {
                delete user.password;
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                await saveRefreshTokenToDB(refreshToken, user);
                res.cookie("refreshToken", refreshToken,
                    {
                        httpOnly: true,
                        secure: true,//when deploy change to true
                        path: "/",
                        sameSite: "none",
                    }
                )
                return res.status(200).json({
                    errCode: 0,
                    message: "Login successfully",
                    user: { ...user, accessToken }
                });
            }
        } catch {
            res.status(500).json("error");
        }
    }

    //[POST] refresh
    async requestRefreshToken(req, res) {
        const user = req.user;
        const refreshToken = req.refreshToken;
        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        await saveRefreshTokenToDB(newRefreshToken, user);

        res.cookie("refreshToken", newRefreshToken,
            {
                httpOnly: true,
                secure: true,//when deploy change to true
                path: "/",
                sameSite: "none",
            }
        );
        res.status(200).json({ accessToken: accessToken })
    }

    //[POST] logout
    async logout(req, res) {
        await db.RefreshToken.destroy({
            where: {
                token: req.cookies.refreshToken
            }
        });
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully");
    }
}

module.exports = new AuthController;