const { StripeCustomer } = require('../../../../models');
const { SECRET_KEY } = process.env;
const { Stripe } = require('stripe');
const stripe = new Stripe(SECRET_KEY, {});

const remove  = async ({ customerId, customerStripeId }) => {
    await StripeCustomer.destroy({ where: { customerId }, force: true });
    return stripe.customers.del(customerStripeId);
};

module.exports = { remove };
