const { ChangeEmailHandler } = require('../../../models');

const update = {
    one: {
        byId: ({ changeEmailHandlerId }, { isUpdated }) =>
            ChangeEmailHandler.update({ isUpdated }, { where: { changeEmailHandlerId } }),
    },
};

module.exports = {
    update,
};
