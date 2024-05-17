const service = require('../services/authService');
const Joi = require('joi');
const validateRequest = require('../middlewares/validation-request');
const { USER_NAME, REGEX_PASSWORD, EMAIL } = require('../_helpers/reg');

class AuthController {
    login(req,res,next) {
        service.getAccount(req.body)
            .then(token => res.json({token: token}))
            .catch(err => {
                res.status(401);
                next(err);
            });
    }

    regist(req,res,next) {
        service.register(req.body)
            .then(() => res.json({message: 'Regist successfully'}))
            .catch(err => {
                res.status(400);
                next(err);
            })
    }

    currentUser(req, res, next){
        service.getInfo(req.user.username)
            .then(info => res.json(info))
            .catch(err => {
                res.status(401);
                next(err);
            });
    }

    active(req,res,next) {
        service.activeAcc(req.params.id)
            .then(() => res.json({msg: 'Account active'}))
            .catch(err => {
                res.status(400);
                next(err);
            });
    }

    //schema function
    loginSchema(req,res,next) {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).required()
        });
        validateRequest(req, res, next, schema);
    }

    //schema function
    createSchema(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().regex(USER_NAME).required(),
            password: Joi.string().regex(REGEX_PASSWORD).min(6).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            depName: Joi.string().required(),
            email: Joi.string().regex(EMAIL).required(),
            role: Joi.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').required()
            // status: Joi.string().regex(/^NOT_ACTIVE|ACTIVE$/)
            // createdDate: Joi.date().format('DD/MM/YYYY')
        });
        validateRequest(req, res, next, schema);
    }
}

module.exports = AuthController;