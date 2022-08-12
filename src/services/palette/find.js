const { Palette, PaletteLocation, PaletteLocationImage } = require('../../../models');

const findPalette = {
    all: {
        list: () =>
            Palette.findAll({
                order: [['createdAt', 'ASC']],
                include: [PaletteLocation.include.base([PaletteLocationImage.include.base()])],
            }),
        listByBuildingId: ({ buildingId }) =>
            Palette.findAll({
                where: { buildingId },
                order: [['createdAt', 'ASC']],
                include: [PaletteLocation.include.base([PaletteLocationImage.include.base()])],
            }),
    },
    one: {
        byPaletteId: ({ paletteId, attributes = Palette.attributes.base }) =>
            Palette.findOne({
                where: { paletteId },
                attributes,
                include: [PaletteLocation.include.base([PaletteLocationImage.include.base()])],
            }),
    },
};

module.exports = { findPalette };
