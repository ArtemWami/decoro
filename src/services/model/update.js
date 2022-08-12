const { Model } = require('../../../models');

const updateModel = {
    one: {
        byModelId: ({ modelId }, { name, interiorSqFt, exteriorSqFt, bedrooms, den, bathrooms }) =>
            Model.update(
                { name, interiorSqFt, exteriorSqFt, bedrooms, den, bathrooms },
                { where: { modelId } }
            ),
    },
};

module.exports = {
    updateModel,
};
