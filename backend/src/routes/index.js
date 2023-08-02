const authRouter = require('./auth');
const adminRouter = require('./admin');
const userRouter = require('./user');
const doctorRouter = require("./doctor");
const {
    verifyTokenAndAdminAuthor,
    verifyTokenAndDoctorAuthor,
} = require("../middlewares/verifyToken");

route = (app) => {
    app.use('/auth', authRouter);
    app.use('/admin', verifyTokenAndAdminAuthor, adminRouter);
    app.use('/user', userRouter);
    app.use('/doctor', verifyTokenAndDoctorAuthor, doctorRouter);
}

module.exports = route;