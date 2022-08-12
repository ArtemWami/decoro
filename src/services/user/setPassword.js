const { User } = require('../../../models');
const { hashPassword } = require('../../helpers/users');

const setPassword = async ({ userId }, { password }) => {
    const hashedPassword = await hashPassword(password);
    return User.update({ password: hashedPassword }, { where: { userId }});
}

module.exports = {
    setPassword
}