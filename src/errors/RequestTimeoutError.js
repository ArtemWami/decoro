const httpStatusCodes = require('http-status-codes');
const HttpError = require('./HttpError');

class RequestTimeoutError extends HttpError {
  constructor({ message, payload } = {}) {
    super(message, httpStatusCodes.REQUEST_TIMEOUT, payload);
  }
}

module.exports = RequestTimeoutError;
