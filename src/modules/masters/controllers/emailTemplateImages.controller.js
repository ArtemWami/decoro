const emailTemplatesService = require('../../../services/emailTemplates');
const emailTemplateImagesService = require('../../../services/emailTemplateImages');
const { NotFoundError } = require('../../../errors');

const create = async (req, res) => {
    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const { emailTemplateId } = req.params;
    const { type } = req.body;
    const { key, location, size } = req.file;

    const emailTemplate = await emailTemplatesService.findOneByEmailTemplateId({
        emailTemplateId,
        companyId,
    });

    if (!emailTemplate) {
        throw new NotFoundError({ message: 'Email template not found' });
    }

    const image = await emailTemplateImagesService.create({
        emailTemplateId,
        type,
        key,
        location,
        size,
        companyId,
        subdomainId,
        createdBy: userId,
    });

    res.json(image);
};

module.exports = {
    create,
};
