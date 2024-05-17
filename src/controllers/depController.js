const service = require('../services/depService')
const Joi = require('joi');
const validateRequest = require('../middlewares/validation-request');
const { NAME } = require('../_helpers/reg');
const { canCreateDep } = require('../permissions/deps');
class DepartmentController {
    //[GET] 
    getAll(req, res, next){
        service.getAll()
            .then(deps => res.json(deps))
            .catch(() => {
                res.status(400);
                next();
            });
    }

    // [GET] /?name
    getDepWithParam(req, res, next){
        service.getByParams(req.params)
            .then(dep => res.json(dep))
            .catch((err) => {
                res.status(400);
                next(err);
                }
            );
    }

    // [PUT] /id
    update(req, res, next) {
        service.update(req.params.id, req.body)
            .then(() => res.json({ message: 'Department updated' }))
            .catch((err) => {
                    res.status(400);
                    next(err);
                }
            );
    }

    // [POST] /
    create(req, res, next) {
        console.log(req.user);
        if(!canCreateDep(req.user)) {
            res.status(403);
            return res.send('Not allowed');
        }
        service.create(req.body)
            .then(() => res.json({msg: 'Created department'}))
            .catch((err) => {
                res.status(400);
                next(err);
            })
        next();
    }

    // [DEL] /{id}
    delete(req, res, next) {
        service.delete(req.params.name)
            .then(() => res.json({ message: `Department ${req.params.name} has been deleted` }))
            .catch((err) => {
                res.status(400);
                next(err);
            }
        );
    }

    //schema function
    createSchema(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().regex(NAME).required(),
        });
        validateRequest(req, res, next, schema);
    }
    
    updateSchema(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().regex(NAME).required()
        });
        validateRequest(req, res, next, schema);
    }
}

module.exports = DepartmentController;