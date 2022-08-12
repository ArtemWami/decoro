const { v4: uuidv4, v1: uuidv1 } = require('uuid');
const { promisify } = require('util');
const { compare, hash } = require('bcrypt');

const generateKey = () => `${uuidv1()}${uuidv4()}`.replace(/-/g, '');
const hashPromise = promisify(hash);
const hashPassword = (password, salt = 0x101) => hashPromise(password, salt);

module.exports = {
    generateKey,
    hashPassword,
    comparePassword: compare,
};
