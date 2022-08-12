const { Description } = require('../../../models');

const findDescription = {
    all: {
        list: ({ unitId }) =>
            Description.findAll({
                attributes: Description.attributes.base,
                where: { unitId }
            }),
    },
    one: {
        byDescriptionId: ({ descriptionId }) =>
            Description.findOne({
                where: { descriptionId },
                attributes: Description.attributes.base,
            })
    }
}

module.exports = {
    findDescription
}
