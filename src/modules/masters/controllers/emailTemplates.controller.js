const emailTemplatesService = require('../../../services/emailTemplates');
const { NotFoundError } = require('../../../errors');

const getEmailTemplate = async ({ emailTemplateId, companyId }) => {
    const emailTemplate = await emailTemplatesService.findOneByEmailTemplateId({
        emailTemplateId,
        companyId,
    });

    if (!emailTemplate) {
        throw new NotFoundError({ message: 'Email template not found' });
    }

    return emailTemplate;
};

const findAll = async (req, res) => {
    const { companyId } = req.state.company;
    const emailTemplates = await emailTemplatesService.findAllByCompanyId({ companyId });
    res.json({ data: emailTemplates });
};

const findOne = async (req, res) => {
    const { companyId } = req.state.company;
    const { emailTemplateId } = req.params;
    const emailTemplate = await getEmailTemplate({ emailTemplateId, companyId });
    res.json(emailTemplate);
};

const update = async (req, res) => {
    const { emailTemplateId } = req.params;
    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subject, template, daysDelay, name } = req.body;
    let emailTemplate = await getEmailTemplate({ emailTemplateId, companyId });
    await emailTemplatesService.updateByEmailTemplateId(
        { emailTemplateId: emailTemplate.emailTemplateId },
        {
            subject,
            template,
            daysDelay,
            name,
            updatedBy: userId,
        }
    );

    emailTemplate = await emailTemplatesService.findOneByEmailTemplateId({ emailTemplateId });
    res.json(emailTemplate);
};

module.exports = {
    findAll,
    findOne,
    update,
};
