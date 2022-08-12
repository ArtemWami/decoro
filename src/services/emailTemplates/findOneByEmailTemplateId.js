const { EmailTemplate } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneByEmailTemplateId = ({ emailTemplateId, companyId, subdomainId }) =>
    EmailTemplate.findOne({
        where: { emailTemplateId, ...omitUndefined({ companyId, subdomainId }) },
    });

module.exports = findOneByEmailTemplateId;
