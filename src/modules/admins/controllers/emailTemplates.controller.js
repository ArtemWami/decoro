const httpStatusCodes = require('http-status-codes');
const emailTemplatesService = require('../../../services/emailTemplates');
const emailsService = require('../../../services/emails');
const { NotFoundError } = require('../../../errors');
const { buildUrl, buildLink } = require('../../../helpers/templates');

const getParentEmailTemplate = async ({ emailTemplateId, companyId }, attributes) => {
    const emailTemplate = await emailTemplatesService.findOneParentByEmailTemplateId(
        { emailTemplateId, companyId },
        attributes
    );

    if (!emailTemplate) {
        throw new NotFoundError({ message: 'Email template not found' });
    }

    return emailTemplate;
};

const findOneOrCreateByEmailTemplateId = async ({
    emailTemplateId,
    companyId,
    subdomainId,
    createdBy,
}) => {
    const emailTemplate = await emailTemplatesService.findOneOrCreateByEmailTemplateId({
        emailTemplateId,
        companyId,
        subdomainId,
        createdBy,
    });

    if (!emailTemplate) {
        throw new NotFoundError({ message: 'Email template not found' });
    }

    return emailTemplate;
};

const findAll = async (req, res) => {
    const { companyId } = req.state.company;
    const parentEmailTemplates = await emailTemplatesService.findAllParentsByCompanyId({
        companyId,
    });

    const emailTemplates = parentEmailTemplates.map((parentEmailTemplate) => {
        if (parentEmailTemplate.child) {
            return parentEmailTemplate.child;
        }

        return parentEmailTemplate;
    });

    res.json({ data: emailTemplates });
};

const findOne = async (req, res) => {
    const { companyId } = req.state.company;
    const { emailTemplateId } = req.params;
    const attributes = { exclude: ['text'] };
    const parentEmailTemplate = await getParentEmailTemplate(
        { emailTemplateId, companyId },
        attributes
    );

    let emailTemplate = parentEmailTemplate;
    if (parentEmailTemplate.child) {
        emailTemplate = parentEmailTemplate.child;
    }

    res.json(emailTemplate);
};

const update = async (req, res) => {
    const { emailTemplateId } = req.params;
    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const { subject, template, daysDelay, name, isEnabled, from } = req.body;

    // WARN: emailTemplate.emailTemplateId could be different from req.params.emailTemplateId
    let emailTemplate = await findOneOrCreateByEmailTemplateId({
        emailTemplateId,
        companyId,
        subdomainId,
        createdBy: userId,
    });

    await emailTemplatesService.updateByEmailTemplateId(
        { emailTemplateId: emailTemplate.emailTemplateId },
        {
            subject,
            template,
            daysDelay,
            name,
            isEnabled,
            from,
            updatedBy: userId,
        }
    );

    emailTemplate = await emailTemplatesService.findOneByEmailTemplateId({ emailTemplateId });
    res.json(emailTemplate);
};

const destroy = async (req, res) => {
    const { companyId } = req.state.company;
    const { emailTemplateId } = req.params;
    const emailTemplate = await emailTemplatesService.findOneByEmailTemplateId({
        emailTemplateId,
        companyId,
    });

    if (!emailTemplate) {
        throw new NotFoundError({ message: 'Email template not found' });
    }

    await emailTemplatesService.destroyByEmailTemplateId({ emailTemplateId });
    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

const send = async (req, res) => {
    const { emailTemplateId } = req.params;
    const { email } = req.body;
    const { companyId } = req.state.company;
    const parentEmailTemplate = await getParentEmailTemplate({ emailTemplateId, companyId });
    let emailTemplate = parentEmailTemplate;
    if (parentEmailTemplate.child) {
        emailTemplate = parentEmailTemplate.child;
    }

    const { subdomainId, name: subdomainName } = req.state.subdomain;
    const user = req.state.user;
    await emailsService.sendCampaignEmail({
        companyId,
        subdomainId,
        force: true,
        to: email,
        from: subdomainName,
        userId: user.userId,
        emailTemplateId: emailTemplate,
    });

    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    findAll,
    findOne,
    update,
    destroy,
    send,
};
