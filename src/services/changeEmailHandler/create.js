const { ChangeEmailHandler } = require('../../../models');

const create = ({
    userId,
    companyId,
    subdomainId,
    isUpdated,
    oldEmail,
    newEmail,
    confirmationKey,
    cancelKey,
}) =>
    ChangeEmailHandler.create({
        userId,
        companyId,
        subdomainId,
        isUpdated,
        oldEmail,
        newEmail,
        confirmationKey,
        cancelKey,
    });

module.exports = {
    create,
};
