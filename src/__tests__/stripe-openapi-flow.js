// @flow
import path from 'path';
import generateFlow from 'jsvg/flow/generate.js';

const MODELS_TO_SNAPSHOT = [
  'account',
  'balance_transaction',
  'card',
  'charge',
  'coupon',
  'customer',
  'discount',
  'dispute',
];
describe('Stripe openapi', () => {
  // $FlowFixMe
  const spec = require(path.join(__dirname, '../../', 'openapi/openapi/spec2.json'));
  MODELS_TO_SNAPSHOT.forEach((model) => {
    it(`generates flow types for ${model}`, () => {
      expect(generateFlow(spec.definitions[model])).toMatchSnapshot();
    });
  });
});
