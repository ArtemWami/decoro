const httpStatusCodes = require('http-status-codes');
const HttpStackedError = require('./HttpStackedError');

class UnprocessableEntityStackedError extends HttpStackedError {
  constructor({ message, payload, original } = {}) {
    super(message, httpStatusCodes.UNPROCESSABLE_ENTITY, payload, original);
  }
}

module.exports = UnprocessableEntityStackedError;
