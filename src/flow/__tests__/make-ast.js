// @flow
import Ast from 'flow/ast/ast.js';
import type {FlowType} from 'flow/ast/ast.js';
import makeAst from 'flow/make-ast.js';

const assertType = (schema: Object, ft: FlowType) => {
  expect(makeAst(schema)).toEqual(ft);
};

describe('makeAst', () => {
  describe('allOf', () => {
    it('works with primitive types', () => {
      const schema = {
        allOf: [
          {type: 'string'},
          {type: 'null'},
        ],
      };

      const expected = Ast.Intersection([Ast.String, Ast.Null]);
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

      const expected = Ast.Union([Ast.String, Ast.Null]);
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

      const expected = Ast.Union([Ast.String, Ast.Null]);
      assertType(schema, expected);
    });
  });
  describe('enum', () => {
    it('produces a union of exact types', () => {
      const schema = {
        enum: [1, 'foo', {a: 1}],
      };

      const expected = Ast.Union([
        Ast.Exact(1),
        Ast.Exact('foo'),
        Ast.Exact({a: 1}),
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

      const expected = Ast.Array(Ast.String);
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

      const expected = Ast.Tuple([Ast.String, Ast.Mixed]);
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

      const expected = Ast.Record({
        foo: Ast.Number,
        bar: Ast.Optional(Ast.Boolean),
      });

      assertType(schema, expected);
    });
  });
  describe('type', () => {
    it('works with string types', () => {
      assertType({type: 'boolean'}, Ast.Boolean);
      assertType({type: 'null'}, Ast.Null);
      assertType({type: 'number'}, Ast.Number);
      assertType({type: 'integer'}, Ast.Number);
      assertType({type: 'string'}, Ast.String);
    });

    it('reduces an array a single string to the single type', () => {
      const schema = {
        type: ['string'],
      };

      const expected = Ast.String;
      assertType(schema, expected);
    });

    it('works with an array of strings', () => {
      const schema = {
        type: ['string', 'boolean', 'boolean'],
      };

      const expected = Ast.Union([Ast.String, Ast.Boolean]);
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

      const expected = Ast.Union([
        Ast.String,
        Ast.Boolean,
        Ast.Record({foo: Ast.Optional(Ast.Number)}),
      ]);
      assertType(schema, expected);
    });
  });
});
