const create = require('./create');
const findOneBuildingId = require('./findOneBuildingId');
const findOneCompanyId = require('./findOneCompanyId');
const findOneByFinishTypeId = require('./findOneByFinishTypeId');
const updateByFinishTypeId = require('./updateByFinishTypeId');
const destroyByFinishTypeId = require('./destroyByFinishTypeId');

module.exports = {
    create,
    findOneBuildingId,
    findOneCompanyId,
    findOneByFinishTypeId,
    updateByFinishTypeId,
    destroyByFinishTypeId,
};
