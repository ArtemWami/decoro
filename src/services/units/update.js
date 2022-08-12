const { Units } = require('../../../models');

const updateUnits = {
    one: {
        byUnitId: ({ unitId }, { status, modelId, recipientId, cash }) =>
            Units.update({ status, modelId, recipientId, cash }, { where: { unitId } }),
    },
};

module.exports = {
    updateUnits,
};
