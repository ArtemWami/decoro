const { Buildings } = require('../../../models');

const update = async ({ buildingId, name, address, city, province, postalCode, updatedBy }) => {
    return Buildings.update(
        { name, address, city, province, postalCode, updatedBy },
        { where: { buildingId } }
    );
};

module.exports = {
    update,
};
