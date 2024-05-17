const express = require('express');
const AccountController = require('../controllers/accController');
const asyncHandler = require('express-async-handler');
//tao ra Router để điều hướng
const accountRouter = express.Router();

const accController = new AccountController();
accountRouter.get('/params', asyncHandler(accController.getAllByParam));
// accountRouter.get('/:id', asyncHandler(accController.getAccById));
accountRouter.put('/:id', accController.updateSchema, accController.update);
accountRouter.post('', accController.createSchema, accController.create);
accountRouter.delete('/:id', accController.delete);
accountRouter.get('', accController.getAll);

module.exports = accountRouter;