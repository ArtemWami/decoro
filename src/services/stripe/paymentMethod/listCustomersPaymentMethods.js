const { SECRET_KEY } = process.env;
const { Stripe } = require('stripe');
const stripe = new Stripe(SECRET_KEY, {});

const listCustomersPaymentMethods = ({ customerStripeId }) =>
  stripe.customers.listPaymentMethods(customerStripeId, {type: 'card'});

module.exports = { listCustomersPaymentMethods };
