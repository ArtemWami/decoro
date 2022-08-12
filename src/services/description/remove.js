const { Description } = require('../../../models');

const removeDescription = {
    byDescriptionId: ({ descriptionId }) => Description.destroy({ where: { descriptionId }, force: true })
}

module.exports = {
    removeDescription
}
