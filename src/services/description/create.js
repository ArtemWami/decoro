const { Description } = require('../../../models');

const createDescription = ({ text, unitId, userId, buildingId, companyId, subdomainId }) => {
    return Description.create({ text, unitId, userId, buildingId, companyId, subdomainId });
};

module.exports = { createDescription };
