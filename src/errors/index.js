const HttpError = require('./HttpError');
const BadRequestError = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const PaymentRequiredError = require('./PaymentRequiredError');
const RequestTimeoutError = require('./RequestTimeoutError');
const ServerError = require('./ServerError');
const TooManyRequestsError = require('./TooManyRequestsError');
const UnauthorizedError = require('./UnauthorizedError');
const UnprocessableEntityError = require('./UnprocessableEntityError');

module.exports = {
  HttpError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  PaymentRequiredError,
  RequestTimeoutError,
  ServerError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
};
