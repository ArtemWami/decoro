const create = require('./create');
const findOneByPriceId = require('./findOneByPriceId');
const findOneBuildingId = require('./findOneBuildingId');
const findOneCompanyId = require('./findOneCompanyId');
const updateByPriceId = require('./updateByPriceId');
const destroyByPriceId = require('./destroyByPriceId');

module.exports = {
    create,
    findOneByPriceId,
    updateByPriceId,
    destroyByPriceId,
    findOneBuildingId,
    findOneCompanyId,
};
