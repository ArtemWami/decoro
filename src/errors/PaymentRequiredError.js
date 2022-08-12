const httpStatusCodes = require('http-status-codes');
const HttpError = require('./HttpError');

class PaymentRequiredError extends HttpError {
  constructor({ message, payload } = {}) {
    super(message, httpStatusCodes.PAYMENT_REQUIRED, payload);
  }
}

module.exports = PaymentRequiredError;
