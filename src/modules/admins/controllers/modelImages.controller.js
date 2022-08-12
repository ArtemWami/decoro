const httpStatusCodes = require('http-status-codes');
const modelService = require('../../../services/model');
const modelImagesService = require('../../../services/modelImages');
const awsService = require('../../../services/aws');
const { ModelImage } = require('../../../../models');
const { ConflictError, NotFoundError, BadRequestError } = require('../../../errors');

const limitByType = {
    [ModelImage.TYPE.FLOOR_PLANS]: 3,
    [ModelImage.TYPE.PHOTOS_RENDERS]: 10,
};

const checkLimitByType = async ({ type, modelId }) => {
    const limit = limitByType[type];
    if (!limit) {
        throw new BadRequestError({ message: 'Invalid type' });
    }

    const count = await modelImagesService.countByType({ type, modelId });
    if (count >= limit) {
        throw new ConflictError({ message: `Image type ${type} limit ${limit} exceeded` });
    }
};

const create = async (req, res) => {
    const { key, location, size } = req.file;
    const { modelId } = req.params;
    const { type } = req.body;

    await checkLimitByType({ type, modelId });

    const model = await modelService.findOneBuildingId({ modelId });
    if (!model) {
        throw new NotFoundError({ message: 'Model not found' });
    }

    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const image = await modelImagesService.create({
        modelId,
        type,
        key,
        location,
        size,
        companyId,
        subdomainId,
        buildingId: model.buildingId,
        createdBy: userId,
    });

    res.json(image);
};

const destroy = async (req, res) => {
    const { imageId, modelId } = req.params;
    const image = await modelImagesService.findOneByImageId({ imageId, modelId });
    if (!image) {
        throw new NotFoundError({ message: 'Image not found' });
    }

    await awsService.s3.deleteObject(image.key);
    await modelImagesService.destroyByImageId({ imageId });
    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    create,
    destroy,
};
