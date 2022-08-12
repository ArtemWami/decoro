const { SECRET_KEY } = process.env;
const { Stripe } = require('stripe');
const stripe = new Stripe(SECRET_KEY, {});

const update  = ({ customerStripeId, email, name, phone }) =>
    stripe.customers.update(
        customerStripeId,
        { email, name, phone }
    );

module.exports = { update };
