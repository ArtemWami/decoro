const { EmailTemplate } = require('../../../models');
const findOneParentByEmailTemplateId = require('./findOneParentByEmailTemplateId');

const findOneOrCreateByEmailTemplateId = async ({
    emailTemplateId,
    companyId,
    subdomainId,
    createdBy,
}) => {
    const parentEmailTemplate = await findOneParentByEmailTemplateId({
        emailTemplateId,
        companyId,
    });

    if (!parentEmailTemplate) {
        return null;
    }

    if (parentEmailTemplate.child) {
        return parentEmailTemplate.child;
    }

    const {
        subject,
        deliveryStage,
        daysDelay,
        template,
        name,
        from,
        isEnabled,
        orderId,
        emailTemplateId: parentEmailTemplateId,
    } = parentEmailTemplate;

    return EmailTemplate.create({
        subject,
        deliveryStage,
        daysDelay,
        template,
        name,
        from,
        isEnabled,
        orderId,
        companyId,
        subdomainId,
        createdBy,
        parentEmailTemplateId,
    });
};

module.exports = findOneOrCreateByEmailTemplateId;
