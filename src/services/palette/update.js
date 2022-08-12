const { Palette } = require('../../../models');

const updatePalette = {
    one: {
        byPaletteId: ({ paletteId }, { name, description }) =>
            Palette.update({ name, description }, { where: { paletteId } }),
    },
};

module.exports = {
    updatePalette,
};
