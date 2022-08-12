const { StripeCustomer } = require('../../../../models');
const { SECRET_KEY } = process.env;
const { Stripe } = require('stripe');
const stripe = new Stripe(SECRET_KEY, {});

const get = {
    stripe: {
        byCustomerStripeId: ({ customerStripeId }) => stripe.customers.retrieve(customerStripeId),
        list: () => stripe.customers.list(),
    },
    db: {
        many: {
            list: ({ limit, offset, }) =>
                StripeCustomer.findAll({ limit, offset, attributes: StripeCustomer.attributes.base })
        },
        one: {
            byCustomerId: ({ customerId }) =>
                StripeCustomer.findOne({ where: { customerId }}),
            byCustomerStripeId: ({ customerStripeId }) =>
                StripeCustomer.findOne({ where: { customerStripeId }}),
            byUserId: ({ userId }) => StripeCustomer.findOne({ where: { userId }})
        }
    }

}


module.exports = { get };
