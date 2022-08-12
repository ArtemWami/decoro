const { User } = require('../../../models');
const { hashPassword, generateKey } = require('../../helpers/users');

const createUser = async ({
    firstName,
    lastName,
    email,
    emailVerified,
    password,
    role,
    phone,
    languageCode,
    lastLogin,
    subdomainId,
    companyId,
}) => {
    const passwordHash = password || (await hashPassword(generateKey()));
    return User.create({
        firstName,
        lastName,
        email,
        emailVerified,
        role,
        phone,
        languageCode,
        lastLogin,
        subdomainId,
        companyId,
        password: passwordHash,
    });
};

module.exports = { createUser };
