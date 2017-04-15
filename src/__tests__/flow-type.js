// @flow
import flowType, {
  Mixed,
  Boolean,
  Null,
  Exact,
  Optional,
  Number,
  String,
  Array,
  Tuple,
  Record,
  Union,
  Intersection,
} from '../flow-type.js';
import type {FlowType} from '../flow-type.js';

const assertType = (schema: Object, ft: FlowType) => {
  expect(flowType(schema)).toEqual(ft);
};

describe('flowType', () => {
  describe('allOf', () => {
    it('works with primitive types', () => {
      const schema = {
        allOf: [
          {type: 'string'},
          {type: 'null'},
        ],
      };

      const expected = Intersection([String, Null]);
      assertType(schema, expected);
    });
  });
  describe('anyOf', () => {
    it('produces a union', () => {
      const schema = {
        anyOf: [
          {type: 'string'},
          {type: 'null'},
        ],
      };

      const expected = Union([String, Null]);
      assertType(schema, expected);
    });

    it('removes duplicates', () => {
      const schema = {
        anyOf: [
          {type: 'string'},
          {type: 'string'},
          {type: 'null'},
        ],
      };

      const expected = Union([String, Null]);
      assertType(schema, expected);
    });
  });
  describe('enum', () => {
    it('produces a union of exact types', () => {
      const schema = {
        enum: [1, 'foo', {a: 1}],
      };

      const expected = Union([
        Exact(1),
        Exact('foo'),
        Exact({a: 1}),
      ]);
      assertType(schema, expected);
    });
  });
  describe('items', () => {
    it('works with single-schema items', () => {
      const schema = {
        type: 'array',
        items: {type: 'string'},
      };

      const expected = Array(String);
      assertType(schema, expected);
    });

    it('works with an array of schemas as items', () => {
      const schema = {
        type: 'array',
        items: [
          {type: 'string'},
          {},
        ],
      };

      const expected = Tuple([String, Mixed]);
      assertType(schema, expected);
    });
  });
  it('oneOf', () => {
  });
  describe('objects', () => {
    it('works with properties and required', () => {
      const schema = {
        type: 'object',
        properties: {
          foo: {type: 'number'},
          bar: {type: 'boolean'},
        },
        required: ['foo'],
      };

      const expected = Record({
        foo: Number,
        bar: Optional(Boolean),
      });

      assertType(schema, expected);
    });
  });
  describe('type', () => {
    it('works with string types', () => {
      assertType({type: 'boolean'}, Boolean);
      assertType({type: 'null'}, Null);
      assertType({type: 'number'}, Number);
      assertType({type: 'integer'}, Number);
      assertType({type: 'string'}, String);
    });

    it('reduces an array a single string to the single type', () => {
      const schema = {
        type: ['string'],
      };

      const expected = String;
      assertType(schema, expected);
    });

    it('works with an array of strings', () => {
      const schema = {
        type: ['string', 'boolean', 'boolean'],
      };

      const expected = Union([String, Boolean]);
      assertType(schema, expected);
    });

    it('works with an array of mixed strings and schemas', () => {
      const schema = {
        type: [
          'string',
          {type: 'boolean'},
          {
            type: 'object',
            properties: {
              foo: {type: 'number'},
            },
          },
        ],
      };

      const expected = Union([String, Boolean, Record({foo: Optional(Number)})]);
      assertType(schema, expected);
    });
  });
});
