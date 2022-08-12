const { PaletteLocation } = require('../../../models');

const updatePaletteLocation = {
    one: {
        byPaletteLocationId: ({ paletteLocationId }, {
            paletteId,
            name
        }) => PaletteLocation.update({ paletteId, name }, {where: { paletteLocationId }})
    }
}

module.exports = {
    updatePaletteLocation
}