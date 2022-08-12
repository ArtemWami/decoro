const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { checkAuthorization } = require('../../../middlewares/authorization');
const { checkRolePermissions } = require('../../../middlewares/checkRolePermission');
const { User } = require('../../../../models');

const adminRouter = require('./admin.router');
const buildingsRouter = require('./buildings.router');
const descriptionRouter = require('./description.router');
const finishTypesRouter = require('./finishTypes.router');
const modelRouter = require('./model.router');
const optionsRouter = require('./options.router');
const paletteRouter = require('./palette.router');
const paletteLocationsRouter = require('./paletteLocations.router');
const pricesRouter = require('./prices.router');
const roomRouter = require('./room.router');
const unitsRouter = require('./units.router');

const router = Router();
router.use(wrap(checkAuthorization));
router.use(checkRolePermissions([User.ROLE.TEAM_MEMBER]));

router.use('/admin', adminRouter);
router.use('/buildings', buildingsRouter);
router.use('/description', descriptionRouter);
router.use('/finish-types', finishTypesRouter);
router.use('/model', modelRouter);
router.use('/options', optionsRouter);
router.use('/palette', paletteRouter);
router.use('/palette-locations', paletteLocationsRouter);
router.use('/prices', pricesRouter);
router.use('/room', roomRouter);
router.use('/units', unitsRouter);

module.exports = router;
