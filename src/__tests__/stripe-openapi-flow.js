// @flow
import _ from 'lodash';
import path from 'path';
import generateFlow from 'jsvg/flow/generate.js';

const MODELS = {
  Account: 'account',
  BalanceTransaction: 'balance_transaction',
  Card: 'card',
  Charge: 'charge',
  Coupon: 'coupon',
  Customer: 'customer',
  Discount: 'discount',
  Dispute: 'dispute',
};
describe('Stripe openapi', () => {
  // $FlowFixMe
  const spec = require(path.join(__dirname, '../../', 'openapi/openapi/spec2.json'));
  it('generates flow types for the entire spec', () => {
    expect(generateFlow(spec, _.mapValues(MODELS, (key) => spec.definitions[key]))).toMatchSnapshot();
  });
});
