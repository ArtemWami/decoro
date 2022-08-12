const { StripeCustomer } = require('../../../../models');
const { SECRET_KEY } = process.env;
const { Stripe } = require('stripe');
const stripe = new Stripe(SECRET_KEY, {});

const create = async ({ userId, companyId, phone, firstName, lastName, email, subdomainId }) => {
    /** CREATE CUSTOMER IN STRIPE */
    const customer = await stripe.customers.create({
        email,
        name: firstName + ' ' + lastName,
        phone,
    });

    /** CREATE CUSTOMER IN DB */
    const { id: customerStripeId } = customer;
    return StripeCustomer.create({ customerStripeId, userId, companyId, subdomainId });
};

module.exports = { create };
