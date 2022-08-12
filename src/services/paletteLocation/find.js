const { PaletteLocation, PaletteLocationImage } = require('../../../models');

const findPaletteLocation = {
    all: {
        list: () =>
            PaletteLocation.findAll({
                attributes: PaletteLocation.attributes.base,
                order: [['createdAt', 'ASC']],
                include: [PaletteLocationImage.include.base()],
            }),
    },
    one: {
        byPaletteLocationId: ({
            paletteLocationId,
            attributes = PaletteLocation.attributes.base,
        }) =>
            PaletteLocation.findOne({
                where: { paletteLocationId },
                attributes,
                include: [PaletteLocationImage.include.base()],
            }),
    },
};

module.exports = {
    findPaletteLocation,
};
