const { Options } = require('../../../models');

const updateOptions = {
    one: {
        byOptionsId: ({ optionsId }, { name }) =>
            Options.update({ name }, { where: { optionsId } }),
    },
};

module.exports = {
    updateOptions,
};
