const { createUser } = require('./create');
const {
    findUser,
    findIdentity,
    findOwner,
    findOwnerByEmail,
    findIdentifyAdmin,
} = require('./find');

const findAllCompanyIds = require('./findAllCompanyIds');
const findOneCompanyId = require('./findOneCompanyId');
const { updateUser } = require('./update');
const { removeUser } = require('./remove');
const { setPassword } = require('./setPassword');
const findOneByEmail = require('./findOneByEmail');
const setPasswordByEmail = require('./setPasswordByEmail');

module.exports = {
    createUser,
    findUser,
    findAllCompanyIds,
    findOneCompanyId,
    findIdentity,
    findOwner,
    findOwnerByEmail,
    findIdentifyAdmin,
    updateUser,
    removeUser,
    setPassword,
    findOneByEmail,
    setPasswordByEmail,
};
