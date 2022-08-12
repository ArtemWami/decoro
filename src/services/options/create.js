const { Options } = require('../../../models');

const createOptions = ({ name, buildingId, roomId, companyId, subdomainId }) =>
    Options.create({ name, buildingId, roomId, companyId, subdomainId });

module.exports = { createOptions };
