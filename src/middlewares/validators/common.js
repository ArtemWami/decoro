const httpStatusCodes = require('http-status-codes');
const { validationResult, body } = require('express-validator');

const ifNotEmpty = (field) => body(field).if(body(field).not().isEmpty());
const ifExists = (field) => body(field).if(body(field).exists({ checkNull: false }));

const validationResponse = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
        return;
    }

    next();
};

module.exports = {
    ifExists,
    ifNotEmpty,
    validationResponse,
};
