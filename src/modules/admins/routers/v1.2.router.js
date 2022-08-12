const { Router } = require('express');
const { wrap } = require('../../../base/controller');
const { checkAuthorization } = require('../../../middlewares/authorization');
const { checkRolePermissions } = require('../../../middlewares/checkRolePermission');
const { User } = require('../../../../models');

const adminRouter = require('./admin.router');
const buildingsRouter = require('./buildings.router');
const companyRouter = require('./company.router');
const finishTypesRouter = require('./finishTypes.router');
const descriptionRouter = require('./description.router');
const emailTemplatesRouter = require('./emailTemplates.router');
const inviteTeamMemberRouter = require('./inviteTeamMember.router');
const modelRouter = require('./model.router');
const optionsRouter = require('./options.router');
const paletteRouter = require('./palette.router');
const paletteLocationsRouter = require('./paletteLocations.router');
const pricesRouter = require('./prices.router');
const roomRouter = require('./room.router');
const stripeRouter = require('./stripe.router');
const teamMemberRouter = require('./teamMember.router');
const unitsRouter = require('./units.router');

const router = Router();
router.use(wrap(checkAuthorization));
router.use(checkRolePermissions([User.ROLE.ADMIN]));

router.use('/admin', adminRouter);
router.use('/buildings', buildingsRouter);
router.use('/company', companyRouter);
router.use('/finish-types', finishTypesRouter);
router.use('/description', descriptionRouter);
router.use('/email-templates', emailTemplatesRouter);
router.use('/invitation/teamMember', inviteTeamMemberRouter);
router.use('/model', modelRouter);
router.use('/options', optionsRouter);
router.use('/palette', paletteRouter);
router.use('/palette-locations', paletteLocationsRouter);
router.use('/prices', pricesRouter);
router.use('/room', roomRouter);
router.use('/stripe', stripeRouter);
router.use('/teamMember', teamMemberRouter);
router.use('/units', unitsRouter);

module.exports = router;
