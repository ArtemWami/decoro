const { FinishTypePalette } = require('../../../models');
const { getChangedData } = require('../../base/model');

const bulkCreate = require('./bulkCreate');
const { selectPaletteId } = require('../../helpers/selectors');

const bulkUpdateByFinishTypeId = async (
    finishTypeId,
    finishTypePalettes,
    data,
    { transaction } = {}
) => {
    const { deletedModels, createdData } = getChangedData(finishTypePalettes, data, 'paletteId');
    const paletteId = deletedModels.map(selectPaletteId);
    await Promise.all([
        FinishTypePalette.destroy({ force: true, where: { finishTypeId, paletteId }, transaction }),
        bulkCreate(createdData, transaction),
    ]);
};

module.exports = bulkUpdateByFinishTypeId;
