const { EmailTemplate } = require('../../../models');
const { render } = require('../../helpers/templates');

const getEmailTemplate = (emailTemplateId) => {
    if (emailTemplateId instanceof EmailTemplate) {
        return emailTemplateId;
    }

    return EmailTemplate.findOne({ where: { emailTemplateId } });
};

const renderByEmailTemplateId = async (emailTemplateId, params = {}) => {
    const template = await getEmailTemplate(emailTemplateId);
    const { subject, text, template: html } = template;
    return {
        template,
        subject: render(subject, params),
        text: render(text, params),
        html: render(html, params),
    };
};

module.exports = renderByEmailTemplateId;
