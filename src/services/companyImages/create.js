const { CompanyImage } = require('../../../models');

const create = ({ companyId, type, key, location, size, subdomainId, createdBy }) => {
    return CompanyImage.create({ companyId, type, key, location, size, subdomainId, createdBy });
};

module.exports = create;
