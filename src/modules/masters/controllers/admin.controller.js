const userService = require('../../../services/user');
const stripeService = require('../../../services/stripe');
const { User } = require('../../../../models');
const { NotFoundError, BadRequestError, ConflictError } = require('../../../errors');

/**
 * Create user with role admin
 * new user can be created when subdomain functionality works
 * */
const createAdmin = async (req, res) => {
    const { firstName, lastName, email, phone, languageCode, subdomainId, companyId } = req.body;
    const { company, subdomain } = req.state;

    if (company.subdomainId !== subdomain.subdomainId)
        throw new BadRequestError({ message: 'CURRENT COMPANY HAVE NOT THIS SUBDOMAIN' });

    const user = await userService.createUser({
        firstName,
        lastName,
        email,
        role: User.ROLE.ADMIN,
        phone,
        languageCode,
        subdomainId,
        companyId,
    });

    res.json({
        msg: 'ADMIN CREATED',
        user: { userId: user.userId, email: user.email },
    });
};

/**
 * Get users admin
 * */
const getAdmins = async (req, res) => {
    const { limit, offset } = req.query;
    const admins = await userService.findUser.all.byRole({ role: User.ROLE.ADMIN, limit, offset });
    res.json({ data: admins });
};

/**
 * Get specific user with status admin by userId
 * */
const getAdmin = async (req, res) => {
    const { userId, role } = req.state.user;
    if (role !== User.ROLE.ADMIN)
        throw new NotFoundError({ message: 'ADMIN WITH THIS ID IS NOT EXIST' });

    const admin = await userService.findUser.one.byUserId({ userId });
    res.json({ data: admin });
};

/**
 * Update user admin
 * */
const updateAdmin = async (req, res) => {
    const { userId } = req.params;
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

    /** STRIPE UPDATE */
    const customer = await stripeService.customer.get.db.one.byUserId({ userId });
    if (customer) {
        const { customerStripeId } = customer;
        const stripeUpdateObj = {};
        if (email) stripeUpdateObj.email = email;
        if (phone) stripeUpdateObj.phone = phone;
        if (firstName || lastName) stripeUpdateObj.name = `${firstName || ''} ${lastName || ''}`;

        await stripeService.customer.update({
            ...stripeUpdateObj,
            customerStripeId,
        });
    }

    /** CHECK USER WITH DUPLICATE EMAIL */
    if (email) {
        const sameUserEmail = await userService.findUser.one.byEmail({ email });
        if (sameUserEmail) throw new ConflictError({ message: 'USER WITH THIS EMAIL IS EXIST!' });
    }

    const { role: currentRole } = req.state.user;
    if (currentRole !== User.ROLE.ADMIN)
        throw new BadRequestError({ message: 'ONLY ADMIN CAN BE UPDATE ON THIS ROUTE' });

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

    const admin = await userService.findUser.one.byUserId({ userId });

    res.json({ admin });
};

/**
 * Remove user admin
 * */
const removeAdmin = async (req, res) => {
    const { userId } = req.params;

    const { role: currentRole } = req.state.user;
    if (currentRole !== User.ROLE.ADMIN)
        throw new BadRequestError({ message: 'ONLY ADMIN CAN BE REMOVED ON THIS ROUTE' });

    await userService.removeUser.one.byUserId({ userId });

    /** REMOVE STRIPE CUSTOMER */
    const customer = await stripeService.customer.get.db.one.byUserId({ userId });
    if (customer) {
        const { customerStripeId, customerId } = customer;
        await stripeService.customer.remove({
            customerStripeId,
            customerId,
        });
    }

    res.json({ msg: 'ADMIN IS REMOVED' });
};

module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    removeAdmin,
};
