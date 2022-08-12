const unitsOwnerService = require('../services/units');
const { ForbiddenError, NotFoundError, BadRequestError } = require('../../../errors');
const { wrap } = require('../../../base/middleware');
const { isID } = require('../../../helpers/middleware');

const checkUserCompany = (user, { companyId }) => {
    if (user.companyId !== companyId) {
        throw new ForbiddenError();
    }
};

const checkUnitOwnerPermission = (getUnitId) =>
    wrap(async (req) => {
        const unitId = getUnitId(req);
        const { user } = req.state;

        if (!isID(unitId)) {
            throw new BadRequestError({ message: `Invalid unitId '${unitId}'` });
        }

        const unit = await unitsOwnerService.findOneOnlyWithUser({ unitId, userId: user.userId });

        if (!unit) {
            throw new NotFoundError({
                message: 'UNIT IS NOT FOUND OR CURRENT OWNER HAVE NOT PERMISSION TO THIS UNIT'
            });
        }

        checkUserCompany(user, unit);
    });

module.exports = {
    checkUnitOwnerPermission
};
