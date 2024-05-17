const service = require('../services/accService')
const Joi = require('joi');
const validateRequest = require('../middlewares/validation-request');
const { USER_NAME, EMAIL, NAME, REGEX_PASSWORD } = require('../_helpers/reg');
const status = require('../_helpers/enum');

class AccountController {

    // [GET]
    getAll(req,res,next) {
        service.getAll()
            .then(deps => res.json(deps))
            .catch(err => {
                res.status(400);
                next(err);
            })
    }
    //[GET] /params
    getAllByParam(req, res, next){
        service.getAllByParams(req.query)
            .then(dep => res.json(dep))
            .catch(err => {
                res.status(500);
                next(err);
            });
    }

    // [GET] /{id}
    getAccById(req, res, next){
        service.getById(req.params.id)
            .then(dep => res.json(dep))
            .catch(err => {
                res.status(400);
                next(err);
            });
    }

    // [PUT] /{id}
    update(req, res, next) {
        service.update(req.params.id, req.body)
            .then(() => res.json({ message: 'Account updated' }))
            .catch(err => {
                res.status(400);
                next(err);
            });
    }

    // [POST] 
    create(req, res, next) {
        console.log(res);
        service.create(req.body)
            .then(() => res.json({ message: 'Account created' }))
            .catch(err => {
                res.status(400);
                next(err);
            });
    }

    // [DEL] /{id}
    delete(req, res, next) {
        let so = req.params.id;
        service.delete(req.params.id)
            .then(() => res.json({ message: `Department  with id: ${so} deleted` }))
            .catch(err => {
                res.status(400);
                next(err);
            });
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
            role: Joi.string().valid('MANAGER','ADMIN', 'EMPLOYEE').required(),
            status: Joi.string().regex(/^NOT_ACTIVE|ACTIVE$/)
            // createdDate: Joi.date().format('DD/MM/YYYY')
        });
        validateRequest(req, res, next, schema);
    }
    
    updateSchema(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().regex(USER_NAME).required(),
            firstName: Joi.string().regex(NAME).required(),
            lastName: Joi.string().regex(NAME).required(),
            email: Joi.string().regex(EMAIL).required(),
            status: Joi.string().valid(...Object.keys(status)),
            role: Joi.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').required(),
            depName: Joi.string().required()
        });
        validateRequest(req,res,next, schema);
    }
}

module.exports = AccountController;