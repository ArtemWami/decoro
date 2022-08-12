const emailTemplatesService = require('../../../services/emailTemplates');
const emailTemplateImagesService = require('../../../services/emailTemplateImages');
const { NotFoundError } = require('../../../errors');

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

const create = async (req, res) => {
    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const { emailTemplateId } = req.params;
    const { type } = req.body;
    const { key, location, size } = req.file;

    // WARN: emailTemplate.emailTemplateId could be different from req.params.emailTemplateId
    const emailTemplate = await findOneOrCreateByEmailTemplateId({
        emailTemplateId,
        companyId,
        subdomainId,
        createdBy: userId,
    });

    const image = await emailTemplateImagesService.create({
        type,
        key,
        location,
        size,
        companyId,
        subdomainId,
        createdBy: userId,
        emailTemplateId: emailTemplate.emailTemplateId,
    });

    res.json(image);
};

module.exports = {
    create,
};
