const { pick, splitByPredicate, mapByType } = require('../helpers/collections');

const getChangedData = (models, data, compareAttribute = 'id') => {
    const pickAttribute = pick(compareAttribute);
    const dataAttributes = data.map(pickAttribute);
    const [existedModels, deletedModels] = splitByPredicate(models, (model) =>
        dataAttributes.includes(pickAttribute(model))
    );

    const existedAttributes = existedModels.map(pickAttribute);
    const [updatedData, createdData] = splitByPredicate(data, (value) =>
        existedAttributes.includes(pickAttribute(value))
    );

    const updatedDataMap = mapByType(updatedData, compareAttribute);
    const updatedEntities = existedModels.map((model) => ({
        model,
        data: updatedDataMap[model[compareAttribute]],
    }));

    return {
        createdData,
        updatedEntities,
        deletedModels,
    };
};

module.exports = {
    getChangedData,
};
