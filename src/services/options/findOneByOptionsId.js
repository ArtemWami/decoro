const { Options } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByOptionsId = ({ optionsId, companyId, subdomainId, buildingId }) =>
    Options.findOne({
        where: { optionsId, ...omitUndefined({ companyId, subdomainId, buildingId }) },
    });

module.exports = findOneByOptionsId;
