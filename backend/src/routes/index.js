const authRouter = require('./auth');
const adminRouter = require('./admin');
const userRouter = require('./user');

route = (app) => {
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
    app.use('/user', userRouter);
}

module.exports = route;