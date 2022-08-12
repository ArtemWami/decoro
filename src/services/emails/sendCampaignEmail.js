const { EmailTemplateLog } = require('../../../models');
const { buildFrom } = require('../../helpers/templates');
const renderByEmailTemplateId = require('../emailTemplates/renderByEmailTemplateId');

const sendEmail = require('./sendEmail');

const sendCampaignEmail = async (
    {
        to,
        emailTemplateId,
        userId,
        unitId,
        buildingId,
        companyId,
        subdomainId,
        from: fromSubdomain,
        force = false,
    },
    params = {}
) => {
    const { subject, text, html, template } = await renderByEmailTemplateId(
        emailTemplateId,
        params
    );

    const from = buildFrom(template.from || fromSubdomain);
    let res = {};
    if (force || template.isEnabled) {
        res = await sendEmail({ to, subject, text, html, from });
    }

    await EmailTemplateLog.create({
        userId,
        unitId,
        buildingId,
        companyId,
        subdomainId,
        from,
        email: to,
        emailTemplateId: template.emailTemplateId,
        result: res.result,
        error: res.error,
    });
};

module.exports = sendCampaignEmail;
