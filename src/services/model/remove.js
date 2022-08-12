const { Model } = require('../../../models');

const removeModel = {
    one: {
        byModelId: ({ modelId }) => Model.destroy({ where: { modelId }, force: true })
    }
}

module.exports = {
    removeModel
}
