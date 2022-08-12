const { pickNested, path } = require('../../../../helpers/objects');

const formatPaymentMethodResponse = pickNested([
  'data[].card.brand',
  'data[].card.exp_month',
  'data[].card.exp_year',
  'data[].card.last4'
]);

module.exports = {
  formatPaymentMethodResponse
};
