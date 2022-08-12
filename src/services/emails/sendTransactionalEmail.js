const { TransactionalEmailLog } = require('../../../models');
const transactionalEmailTemplatesService = require('../transactionalEmailTemplates');

const sendEmail = require('./sendEmail');

const sendTransactionalEmail = async ({ to, type, companyId, subdomainId }, params = {}) => {
    const { subject, text, html, template } = await transactionalEmailTemplatesService.renderByType(
        type,
        params
    );

    const { error, result } = await sendEmail({ to, subject, text, html });
    const { transactionalEmailTemplateId } = template;
    await TransactionalEmailLog.create({
        transactionalEmailTemplateId,
        result,
        error,
        companyId,
        subdomainId,
        email: to,
    });
};

module.exports = sendTransactionalEmail;
