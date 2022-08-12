const { CompanyImage } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const destroyByImageId = ({ imageId, companyId, subdomainId }) =>
    CompanyImage.destroy({
        force: true,
        where: { imageId, ...omitUndefined({ companyId, subdomainId }) },
    });

module.exports = destroyByImageId;
