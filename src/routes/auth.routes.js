const express = require('express');
const db = require('../_helpers/db');
const AuthController = require('../controllers/authController');
const asyncHandler = require('express-async-handler');
// const validateToken = require('../middlewares/validateTokenHandler');
const passport = require('passport');

//tao ra Router để điều hướng
const authRouter = express.Router();
const authController = new AuthController();

// authRouter.get('/active-account', asyncHandler(authController));

authRouter.post('/signin',authController.loginSchema,asyncHandler(authController.login));
authRouter.post('/signup',authController.createSchema, asyncHandler(authController.regist));
authRouter.get('/current',passport.authenticate('jwt', {session: false}), authController.currentUser);
authRouter.get('/active_account/:id', authController.active);


module.exports = authRouter;