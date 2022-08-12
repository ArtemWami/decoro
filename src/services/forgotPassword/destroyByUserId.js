const { ForgotPassword } = require('../../../models');

const destroyByUserId = async ({ userId }) =>
    ForgotPassword.destroy({ force: true, where: { createdBy: userId } });

module.exports = destroyByUserId;
