const { createCompany } = require('./create');
const { findCompany } = require('./find');
const findOneByCompanyId = require('./findOneByCompanyId');
const findOneBySubdomainId = require('./findOneBySubdomainId');
const { updateCompany } = require('./update');
const { removeCompany } = require('./remove');

module.exports = {
    createCompany,
    findOneByCompanyId,
    findOneBySubdomainId,
    findCompany,
    updateCompany,
    removeCompany,
};
