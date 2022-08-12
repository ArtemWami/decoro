const { EmailTemplate } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const destroyByEmailTemplateId = async ({ emailTemplateId, companyId, subdomainId }) =>
    EmailTemplate.destroy({
        force: true,
        where: { emailTemplateId, ...omitUndefined({ companyId, subdomainId }) },
    });

module.exports = destroyByEmailTemplateId;
