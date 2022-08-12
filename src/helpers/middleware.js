const validator = require('validator');

const isString = (value) => typeof value === 'string';
const isID = (value, version = 4) => isString(value) && validator.isUUID(value, version);

const getRequestParam = (name) => (req) => req.params[name];
const getRequestQuery = (name) => (req) => req.query[name];
const getRequestBody = (name) => (req) => req.body[name];

const updateRequestState = (req, data = {}) => {
    if (!req.state) {
        req.state = {};
    }

    req.state = {
        ...req.state,
        ...data,
    };

    return req;
};

module.exports = {
    isID,
    getRequestParam,
    getRequestQuery,
    getRequestBody,
    updateRequestState,
};
