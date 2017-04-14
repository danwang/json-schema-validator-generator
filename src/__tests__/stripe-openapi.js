// @flow
import path from 'path';
import generateValidator from '../generate-validator.js';
import generateFlow from '../generate-flow.js';

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
  const specPath = path.join(__dirname, '../../', 'openapi/openapi/spec2.json');
  // $FlowFixMe
  const definitions = require(specPath).definitions;
  MODELS_TO_SNAPSHOT.forEach((model) => {
    it(`generates validators for ${model}`, () => {
      expect(generateValidator(definitions[model])).toMatchSnapshot();
    });
    it(`generates flow types for ${model}`, () => {
      expect(generateFlow(definitions[model])).toMatchSnapshot();
    });
  });
});
