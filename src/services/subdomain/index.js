const { createSubdomain } = require('./create');
const { findSubdomain } = require('./find');
const findOneBySubdomainId = require('./findOneBySubdomainId');
const findOneByName = require('./findOneByName');
const { updateSubdomain } = require('./update');
const { removeSubdomain } = require('./remove');

module.exports = {
    createSubdomain,
    findSubdomain,
    findOneBySubdomainId,
    findOneByName,
    updateSubdomain,
    removeSubdomain,
};
