const { CompanyImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByImageId = ({ imageId, companyId, subdomainId }) =>
    CompanyImage.findOne({
        where: { imageId, ...omitUndefined({ companyId, subdomainId }) },
    });

module.exports = findOneByImageId;
