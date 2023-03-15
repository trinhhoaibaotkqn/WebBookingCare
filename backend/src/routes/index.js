const authRouter = require('./auth');
const adminRouter = require('./admin');
const userRouter = require('./user');
const doctorRouter = require("./doctor");

route = (app) => {
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
    app.use('/user', userRouter);
    app.use('/doctor', doctorRouter);
}

module.exports = route;