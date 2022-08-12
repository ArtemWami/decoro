const { FinishType } = require('../../../models');

const updateByFinishTypeId = (
    finishTypeId,
    { name, description, updatedBy },
    { transaction } = {}
) => FinishType.update({ name, description, updatedBy }, { where: { finishTypeId }, transaction });

module.exports = updateByFinishTypeId;
