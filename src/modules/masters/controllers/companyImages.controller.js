const httpStatusCodes = require('http-status-codes');
const companyService = require('../../../services/company');
const companyImagesService = require('../../../services/companyImages');
const awsService = require('../../../services/aws');
const { NotFoundError, ConflictError } = require('../../../errors');

const create = async (req, res) => {
    const { userId } = req.state.user;
    const { companyId } = req.params;
    const { type } = req.body;
    const { key, location, size } = req.file;

    const company = await companyService.findOneByCompanyId({ companyId });
    if (!company) {
        throw new NotFoundError({ message: 'Company not found' });
    }

    let image = await companyImagesService.findOneByType({ type, companyId });
    if (image) {
        throw new ConflictError({ message: 'Image exists' });
    }

    image = await companyImagesService.create({
        companyId,
        type,
        key,
        location,
        size,
        createdBy: userId,
        subdomainId: company.subdomainId,
    });

    res.json(image);
};

const destroy = async (req, res) => {
    const { imageId, companyId } = req.params;
    const image = await companyImagesService.findOneByImageId({ imageId, companyId });
    if (!image) {
        throw new NotFoundError({ message: 'Image not found' });
    }

    await awsService.s3.deleteObject(image.key);
    await companyImagesService.destroyByImageId({ imageId });
    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    create,
    destroy,
};
