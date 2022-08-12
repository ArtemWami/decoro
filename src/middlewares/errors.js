/* eslint-disable no-unused-vars */
const httpStatusCodes = require('http-status-codes');
const Sentry = require('@sentry/node');
const { logger } = require('../base/logger');
const { HttpError } = require('../errors');
const { HttpStackedError } = require('../errors/stacked');

const { STACKED_ERROR_RESPONSE } = process.env;

const handleErrors = (err, req, res, next) => {
    Sentry.captureException(err);
    if (err instanceof HttpStackedError && STACKED_ERROR_RESPONSE === 'true') {
        const { original, statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR } = err;
        res.status(statusCode).json({
            status: statusCode,
            error: original.message,
            stack: original.stack,
            ...original,
        });

        return;
    }

    if (!(err instanceof HttpError)) {
        logger.error(err);
    }

    const { message, payload, statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR } = err;
    const body = payload || {
        status: statusCode,
        error: message,
    };

    res.status(statusCode).json(body);
};

module.exports = {
    handleErrors,
};
