const userService = require('../../../services/user');
const unitsService = require('../../../services/units');
const { User } = require('../../../../models');
const { ConflictError, NotFoundError } = require('../../../errors');

const create = async (req, res) => {
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const { unitId } = req.params;
    const { firstName, lastName, email, phone } = req.body;

    /** ASSIGN USER IF USER HAS SAME EMAIL*/
    let currentOwner = await userService.findOwnerByEmail({ email, companyId });
    if (!currentOwner) {
        currentOwner = await userService.createUser({
            firstName,
            lastName,
            email,
            phone,
            companyId,
            subdomainId,
            role: User.ROLE.OWNER,
        });
    }

    const { userId: ownerId } = currentOwner;
    const checkAssign = await unitsService.checkAssign({ unitId, userId: ownerId });
    if (!checkAssign) await unitsService.assignUnitsToUsers({ userId: ownerId, unitId });
    await unitsService.onOwnerCreated({ unitId, userId: ownerId });
    res.json({ data: currentOwner });
};

const findAll = async (req, res) => {
    const { unitId } = req.params;
    const owners = await userService.findUser.all.byRoleOnBuilding({
        role: User.ROLE.OWNER,
        unitId,
    });
    res.json({ data: owners });
};

const update = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    const owner = await userService.findOwner({ userId });
    const { email: currentEmail } = owner;

    /** CHECK USER WITH DUPLICATE EMAIL */
    if (email) {
        const sameUserEmail = await userService.findUser.one.byEmail({ email });
        if (sameUserEmail && email !== currentEmail)
            throw new ConflictError({ message: 'USER WITH THIS EMAIL IS EXIST!' });
    }

    await userService.updateUser.one.byUserId({ userId }, { firstName, lastName, email, phone });

    const currentOwner = await userService.findOwner({ userId });
    res.json({ data: currentOwner });
};

const destroy = async (req, res) => {
    const { userId, unitId } = req.params;

    /** CHECK EXIST ASSIGN */
    const currentAssign = await unitsService.checkAssign({ unitId, userId });
    if (!currentAssign) throw new NotFoundError({ message: 'ASSIGN US NOT EXIST !!!' });

    /** REMOVE USER ASSIGN */
    await unitsService.reAssignUnitsToUsers({ userId, unitId });
    await unitsService.onOwnerRemoved({ unitId, userId });

    /** COUNT ASSIGN IF USER HAVE NOT ASSIGN REMOVE USER PROFILE */
    const countAssign = await unitsService.countAssign({ userId });
    if (countAssign === 0) await userService.removeUser.one.byUserId({ userId });

    res.json({ msg: 'UNIT IS REASSIGNED' });
};

module.exports = {
    create,
    findAll,
    update,
    destroy,
};
