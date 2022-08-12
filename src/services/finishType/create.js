const { FinishType } = require('../../../models');

const create = (
    { optionsId, name, description, companyId, subdomainId, buildingId, createdBy },
    { transaction } = {}
) =>
    FinishType.create(
        {
            optionsId,
            name,
            description,
            companyId,
            subdomainId,
            buildingId,
            createdBy,
        },
        { transaction }
    );

module.exports = create;
