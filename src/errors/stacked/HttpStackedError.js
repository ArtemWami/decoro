const HttpError = require('../HttpError');

class HttpStackedError extends HttpError {
  constructor(message, statusCode, payload, original) {
    super(message, statusCode, payload);
    this.original = original;
  }
}

module.exports = HttpStackedError;
