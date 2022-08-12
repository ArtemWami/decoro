const httpStatusCodes = require('http-status-codes');
const buildingImagesService = require('../../../services/buildingImages');
const awsService = require('../../../services/aws');
const { ConflictError, NotFoundError } = require('../../../errors');

const create = async (req, res) => {
    const { key, location, size } = req.file;
    const { buildingId } = req.params;
    const { type } = req.body;

    let image = await buildingImagesService.findOneByType({ type, buildingId });
    if (image) {
        throw new ConflictError({ message: 'Image exists' });
    }

    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    image = await buildingImagesService.create({
        buildingId,
        type,
        key,
        location,
        size,
        companyId,
        subdomainId,
        createdBy: userId,
    });

    if (!res) {
        return image;
    }

    res.json(image);
};

const destroy = async (req, res) => {
    const { imageId, buildingId } = req.params;
    const image = await buildingImagesService.findOneByImageId({ imageId, buildingId });
    if (!image) {
        throw new NotFoundError({ message: 'Image not found' });
    }

    await awsService.s3.deleteObject(image.key);
    await buildingImagesService.destroyByImageId({ imageId });
    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    create,
    destroy,
};
