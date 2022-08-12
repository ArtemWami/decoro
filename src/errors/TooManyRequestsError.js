const httpStatusCodes = require('http-status-codes');
const HttpError = require('./HttpError');

class TooManyRequestsError extends HttpError {
  constructor({ message, payload } = {}) {
    super(message, httpStatusCodes.TOO_MANY_REQUESTS, payload);
  }
}

module.exports = TooManyRequestsError;
