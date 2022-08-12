const { Buildings } = require('../../../models');

const createBuildings = ({
    name,
    address,
    city,
    province,
    postalCode,
    companyId,
    subdomainId,
    createdBy,
    status = Buildings.STATUS.DRAFT,
}) =>
    Buildings.create({
        name,
        address,
        city,
        province,
        postalCode,
        status,
        companyId,
        subdomainId,
        createdBy,
    });

module.exports = { createBuildings };
