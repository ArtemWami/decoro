const { ChangeEmailHandler } = require('../../../models');

const remove = {
    byId: ({ changeEmailHandlerId }) => ChangeEmailHandler.destroy({ where: { changeEmailHandlerId }, force: true })
}

module.exports = { remove };
