const { ModelImage } = require('../../../models');

const create = ({
    modelId,
    type,
    key,
    location,
    size,
    buildingId,
    companyId,
    subdomainId,
    createdBy,
}) => {
    return ModelImage.create({
        modelId,
        type,
        key,
        location,
        size,
        buildingId,
        companyId,
        subdomainId,
        createdBy,
    });
};

module.exports = create;
