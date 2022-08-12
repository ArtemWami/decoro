const userService = require('../../../services/user');
const { User } = require('../../../../models');
const { NotFoundError, BadRequestError, ConflictError } = require('../../../errors');

/**
 * Get users teamMember
 * */
const getTeamMembers = async (req, res) => {
    const { limit, offset } = req.query;
    const { companyId } = req.state.company;
    const teamMembers = await userService.findUser.all.inCompany({ limit, offset, companyId });
    res.json({ data: teamMembers });
};

/**
 * Get specific user with status teamMember by userId
 * */
const getTeamMember = async (req, res) => {
    const user = await userService.findUser.findOneByUserId({ userId: req.params.userId });
    const { userId, role } = user;
    if (role !== User.ROLE.TEAM_MEMBER)
        throw new NotFoundError({ message: 'TEAM MEMBER WITH THIS ID IS NOT EXIST' });
    const teamMember = await userService.findUser.one.byUserId({ userId });
    res.json({ data: teamMember });
};

/**
 * Update user teamMember
 * */
const updateTeamMember = async (req, res) => {
    const { userId } = req.params;
    const user = await userService.findUser.findOneByUserId({ userId });
    const {
        firstName,
        lastName,
        email,
        emailVerified,
        role,
        phone,
        languageCode,
        lastLogin,
        subdomainId,
        companyId,
    } = req.body;

    /** CHECK USER WITH DUPLICATE EMAIL */
    if (email) {
        const sameUserEmail = await userService.findUser.one.byEmail({ email });
        if (sameUserEmail) throw new ConflictError({ message: 'USER WITH THIS EMAIL IS EXIST!' });
    }

    const { role: currentRole } = user;
    if (currentRole !== User.ROLE.TEAM_MEMBER && currentRole !== User.ROLE.ADMIN_MANAGER)
        throw new BadRequestError({
            message: 'ONLY TEAM MEMBER OR ADMIN_MANAGER CAN BE UPDATE ON THIS ROUTE',
        });

    await userService.updateUser.one.byUserId(
        { userId },
        {
            firstName,
            lastName,
            email,
            emailVerified,
            role,
            phone,
            languageCode,
            lastLogin,
            subdomainId,
            companyId,
        }
    );

    const teamMember = await userService.findUser.one.byUserId({ userId });

    res.json({ data: teamMember });
};

/**
 * SET TEAM_MEMBER AS ACCOUNT ADMIN
 * */
const setAsAdmin = async (req, res) => {
    const { userId } = req.params;
    const user = await userService.findUser.findOneByUserId({ userId });
    const { role: currentRole } = user;
    if (currentRole !== User.ROLE.TEAM_MEMBER)
        throw new BadRequestError({ message: 'ONLY TEAM MEMBER CAN BE UPDATE ON THIS ROUTE' });

    await userService.updateUser.one.byUserId(
        { userId },
        {
            role: User.ROLE.ADMIN_MANAGER,
        }
    );

    const teamMember = await userService.findUser.one.byUserId({ userId });
    res.json({ data: teamMember });
};

/**
 * Remove user teamMember
 * */
const removeTeamMember = async (req, res) => {
    const { userId } = req.params;
    const user = await userService.findUser.findOneByUserId({ userId });
    const { role: currentRole } = user;
    if (currentRole !== User.ROLE.TEAM_MEMBER && currentRole !== User.ROLE.ADMIN_MANAGER)
        throw new BadRequestError({
            message: 'ONLY TEAM MEMBER OR ADMIN_MANAGER CAN BE REMOVED ON THIS ROUTE',
        });

    await userService.removeUser.one.byUserId({ userId });
    res.json({ msg: 'TEAM MEMBER IS REMOVED' });
};

module.exports = {
    getTeamMembers,
    getTeamMember,
    updateTeamMember,
    setAsAdmin,
    removeTeamMember,
};
