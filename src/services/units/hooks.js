const { Units, UnitsUsers, Op } = require('../../../models');
const { updateUnits } = require('./update');

const onOwnerCreated = async ({ unitId, userId }) => {
    const unit = await Units.findOne({ attributes: ['unitId', 'recipientId'], where: { unitId } });
    if (unit.recipientId) {
        return;
    }

    await updateUnits.one.byUnitId({ unitId }, { recipientId: userId });
};

const onOwnerRemoved = async ({ unitId, userId }) => {
    const unit = await Units.findOne({ where: { unitId } });
    if (unit.recipientId !== userId) {
        return;
    }

    // Find remaining owner
    const unitOwner = await UnitsUsers.findOne({
        where: { unitId, userId: { [Op.ne]: userId } },
        order: [['createdAt', 'DESC']],
    });

    if (!unitOwner) {
        return;
    }

    await updateUnits.one.byUnitId({ unitId }, { recipientId: unitOwner.userId });
};

module.exports = {
    onOwnerCreated,
    onOwnerRemoved,
};
