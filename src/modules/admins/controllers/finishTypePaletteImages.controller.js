const httpStatusCodes = require('http-status-codes');
const finishTypePaletteService = require('../../../services/finishTypePalette');
const finishTypePaletteImagesService = require('../../../services/finishTypePaletteImages');
const awsService = require('../../../services/aws');
const { ConflictError, NotFoundError } = require('../../../errors');

const create = async (req, res) => {
    const { key, location, size } = req.file;
    const { finishTypeId } = req.params;
    const { type, paletteId } = req.body;

    let image = await finishTypePaletteImagesService.findOneByType({ type, finishTypeId, paletteId });
    if (image) {
        throw new ConflictError({ message: 'Image exists' });
    }

    const finishTypePalette = await finishTypePaletteService.findOneBuildingId({
        finishTypeId,
        paletteId,
    });

    if (!finishTypePalette) {
        throw new NotFoundError({ message: 'Finish type palette not found' });
    }

    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    image = await finishTypePaletteImagesService.create({
        finishTypeId,
        paletteId,
        type,
        key,
        location,
        size,
        companyId,
        subdomainId,
        buildingId: finishTypePalette.buildingId,
        createdBy: userId,
    });

    res.json(image);
};

const destroy = async (req, res) => {
    const { imageId, finishTypeId } = req.params;
    const { paletteId } = req.body;
    const image = await finishTypePaletteImagesService.findOneByImageId({
        imageId,
        finishTypeId,
        paletteId,
    });

    if (!image) {
        throw new NotFoundError({ message: 'Image not found' });
    }

    await awsService.s3.deleteObject(image.key);
    await finishTypePaletteImagesService.destroyByImageId({ imageId });
    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    create,
    destroy,
};
