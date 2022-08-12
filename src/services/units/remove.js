const { Units } = require('../../../models');

const removeUnit = {
    one: {
        byUnitId: ({ unitId }) => Units.destroy({ where: { unitId }, force: true })
    }
}

module.exports = {
    removeUnit
}
