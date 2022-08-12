const userService = require('../../../services/user');
const { Stripe } = require('stripe');
const { NotFoundError } = require('../../../errors');
const stripeService = require("../../../services/stripe");
const {formatPaymentMethodResponse} = require("./formatters/paymentMethod");
const {path} = require("../../../helpers/objects");

const { SECRET_KEY } = process.env;

const stripe = new Stripe(SECRET_KEY, {});
const PRICE_ID = 'price_1KTYuvFnhV97oRYk68ruzCZ4';

/** CREATE SUBSCRIPTION */
const createSubscription = async (req, res) => {
    const { user } = req.state;
    const { userId } = user;

    const currentUser = await userService.findUser.one.byUserIdWithStripe({ userId });
    const { stripeCustomer } = currentUser;
    if (!stripeCustomer) throw new NotFoundError({ message: 'CURRENT USER HAVE NO CUSTOMER !!!' });
    const { customerStripeId: customerId } = stripeCustomer;

    const { paymentMethodId } = req.body;
    const priceId = PRICE_ID;

    // Attach the payment method to the customer
    try {
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });
    } catch (error) {
        return res.status('402').send({ error: { message: error.message } });
    }

    // Change the default invoice settings on the customer to the new payment method
    await stripe.customers.update(customerId, {
        invoice_settings: {
            default_payment_method: paymentMethodId,
        },
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
    });

    res.send(subscription);
};

/** CREATE PAYMENT METHOD */
const createPaymentMethod = async (req, res) => {
    const { number, exp_month, exp_year, cvc } = req.body;
    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
            number,
            exp_month,
            exp_year,
            cvc,
        },
    });

    res.json({ paymentMethod });
};

/** GET CARD INFORMATION OF CUSTOMER */
const getCardInfo = async (req, res) => {
    const { user } = req.state;
    const { userId } = user;

    const customer = await stripeService.customer.get.db.one.byUserId({ userId });
    if(!customer) throw new NotFoundError({ message: 'CUSTOMER IS NOT EXIST !!!' });
    const { customerStripeId } = customer;

    const paymentMethods = await stripeService.paymentMethod.listCustomersPM({ customerStripeId });
    const card = formatPaymentMethodResponse(paymentMethods);

    const selectCard = path( ['data', 0, 'card']);
    const adminCard = selectCard(card);

    res.json(adminCard);
};

module.exports = {
    createSubscription,
    createPaymentMethod,
    getCardInfo
};
