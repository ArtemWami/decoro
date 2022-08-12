const { PaletteLocation } = require('../../../models');

const removePaletteLocation = {
    one: {
        byPaletteLocationId: ({ paletteLocationId }) => PaletteLocation.destroy({ where: { paletteLocationId }, force: true })
    }
}

module.exports = {
    removePaletteLocation
}