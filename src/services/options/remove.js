const { Options } = require('../../../models');

const removeOptions = {
    one: {
        byOptionsId: ({ optionsId }) => Options.destroy({ where: { optionsId }, force: true }),
        byBuildingAndRoomId: ({ buildingId, roomId }) =>
          Options.destroy({ where: { buildingId, roomId }, force: true })
    }
}

module.exports = {
    removeOptions
}
