const { CompanyImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByType = ({ type, companyId, subdomainId }) =>
    CompanyImage.findOne({
        where: { type, companyId, ...omitUndefined({ subdomainId }) },
    });

module.exports = findOneByType;
