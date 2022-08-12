const { Model } = require('../../../models');

const findModel = {
    all: {
        list: (attributes = Model.attributes.base) => Model.findAll({ attributes }),
    },
    one: {
        byModelId: ({ modelId, attributes = Model.attributes.base }) =>
            Model.scope(['withImages', 'withRooms']).findOne({ attributes, where: { modelId } }),
    },
};

const findModelsByBuildingId = ({ buildingId }) =>
    Model.findAll({ where: { buildingId } });

module.exports = {
    findModel,
    findModelsByBuildingId
};
