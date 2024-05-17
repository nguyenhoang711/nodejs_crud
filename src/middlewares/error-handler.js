const { constants } = require("../../constants");

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode ? res.statusCode: 500;
    console.log(statusCode);
    switch(statusCode) {
        case constants.NOT_FOUND:
            res.json({
                title: 'Not found',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: 'Not allowed',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED: 
            res.json({
                title: 'Not authorized',
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.VALIDATION_ERROR:
            res.json({
                title: 'Not valid',
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: 'Server error',
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            console.log('All success');
            break;
    }
}