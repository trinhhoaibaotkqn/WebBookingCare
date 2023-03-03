const authRouter = require('./auth');
const adminRouter = require('./admin');

route = (app) => {
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
}

module.exports = route;