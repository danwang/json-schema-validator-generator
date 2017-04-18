// @flow
import _ from 'lodash';
import path from 'path';
import generateValidator from '../generate-validator.js';

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
  it('generates a validator for the entire spec', () => {
    const definitions = _.pick(spec.definitions, MODELS_TO_SNAPSHOT);
    const code = generateValidator(spec, definitions);
    expect(code).toMatchSnapshot();

    const validators = eval(`(function(){${code}})()`); // eslint-disable-line no-eval
    MODELS_TO_SNAPSHOT.forEach((property) => {
      expect(validators).toHaveProperty(property);
    });
  });
});
