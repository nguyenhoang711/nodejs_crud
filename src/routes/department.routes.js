const express = require('express');
const passport = require('passport');
const DepartmentController = require('../controllers/depController');
const asyncHandler = require('express-async-handler');  
//tao ra Router để điều hướng
const depRouter = express.Router();
depRouter.use(passport.authenticate('jwt', {session: false}));

const depController = new DepartmentController();

depRouter.get('/:name',asyncHandler(depController.getDepWithParam));
depRouter.put('/:id', depController.updateSchema, asyncHandler(depController.update));
depRouter.post('', depController.createSchema, asyncHandler(depController.create));
depRouter.delete('/:name', asyncHandler(depController.delete));
depRouter.get('', depController.getAll);

module.exports = depRouter;