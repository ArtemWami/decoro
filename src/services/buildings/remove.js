const { Buildings } = require('../../../models');

const removeBuildings = {
    one: {
        byBuildingId: ({ buildingId }) => Buildings.destroy({ where: { buildingId }, force: true }),
    },
    all: {
        byCompanyId: ({ companyId }) => Buildings.destroy({ where: { companyId }, force: true }),
    }
}

module.exports = {
    removeBuildings
}
