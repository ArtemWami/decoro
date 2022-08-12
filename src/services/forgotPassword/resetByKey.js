const { ForgotPassword } = require('../../../models');

const resetByKey = ({ key }) => ForgotPassword.update({ reset: true }, { where: { key } });

module.exports = resetByKey;
