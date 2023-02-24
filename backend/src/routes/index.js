const authRouter = require('./auth');

route = (app) => {
    app.use('/auth', authRouter);
}

module.exports = route;