const { EmailTemplate } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const updateByEmailTemplateId = (
    { emailTemplateId, companyId, subdomainId },
    { subject, daysDelay, template, name, updatedBy, isEnabled, from }
) =>
    EmailTemplate.update(
        { subject, daysDelay, template, name, updatedBy, isEnabled, from },
        { where: { emailTemplateId, ...omitUndefined({ companyId, subdomainId }) } }
    );

module.exports = updateByEmailTemplateId;
