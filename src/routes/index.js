const siteRouter = require('./sites.routes');
const depRouter = require('./department.routes');
const accRouter = require('./account.routes');
const authRouter = require('./auth.routes');
function router(app) {

    //routes api for department
    app.use('/api/departments', depRouter);

    //routes api for accounts
    app.use('/api/accounts', accRouter);

    //route login, singup, active-account
    app.use('/auth', authRouter);

    // routes api for sites (luôn đặt cuối cùng)
    app.use('/', siteRouter);
}

module.exports = router;