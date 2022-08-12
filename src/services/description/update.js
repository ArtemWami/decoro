const { Description } = require('../../../models');

const updateDescription = {
    byDescriptionId: ({ descriptionId }, { text, unitId, userId }) =>
        Description.update({ text, unitId, userId }, { where: { descriptionId }})
}

module.exports = {
    updateDescription
}
