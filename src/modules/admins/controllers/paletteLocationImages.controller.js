const httpStatusCodes = require('http-status-codes');
const paletteLocationService = require('../../../services/paletteLocation');
const paletteLocationImagesService = require('../../../services/paletteLocationImages');
const awsService = require('../../../services/aws');
const { PaletteLocationImage } = require('../../../../models');
const { ConflictError, NotFoundError, BadRequestError } = require('../../../errors');

const limitByType = {
    [PaletteLocationImage.TYPE.COLOR_PALETTE_IMG]: 4,
};

const checkLimitByType = async ({ type, paletteLocationId }) => {
    const limit = limitByType[type];
    if (!limit) {
        throw new BadRequestError({ message: 'Invalid type' });
    }

    const count = await paletteLocationImagesService.countByType({ type, paletteLocationId });
    if (count >= limit) {
        throw new ConflictError({ message: `Image type ${type} limit ${limit} exceeded` });
    }
};

const create = async (req, res) => {
    const { key, location, size } = req.file;
    const { paletteLocationId } = req.params;
    const { type } = req.body;

    await checkLimitByType({ type, paletteLocationId });

    const paletteLocation = await paletteLocationService.findOneBuildingId({ paletteLocationId });
    if (!paletteLocation) {
        throw new NotFoundError({ message: 'Palette location not found' });
    }

    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const image = await paletteLocationImagesService.create({
        paletteLocationId,
        type,
        key,
        location,
        size,
        companyId,
        subdomainId,
        buildingId: paletteLocation.buildingId,
        createdBy: userId,
    });

    res.json(image);
};

const destroy = async (req, res) => {
    const { imageId, paletteLocationId } = req.params;
    const image = await paletteLocationImagesService.findOneByImageId({ imageId, paletteLocationId });
    if (!image) {
        throw new NotFoundError({ message: 'Image not found' });
    }

    await awsService.s3.deleteObject(image.key);
    await paletteLocationImagesService.destroyByImageId({ imageId });
    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    create,
    destroy,
};
