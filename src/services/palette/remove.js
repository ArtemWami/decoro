const { Palette } = require('../../../models');

const removePalette = {
    one: {
        byPaletteId: ({ paletteId }) => Palette.destroy({ where: { paletteId }, force: true })
    }
}

module.exports = {
    removePalette
}