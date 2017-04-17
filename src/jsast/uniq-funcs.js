// @flow
import _ from 'lodash';
import Ast from './ast.js';
import type {JsAst, Function1Type} from './ast.js';
import transform from './transform.js';
import type {Transform} from './transform.js';
import compose from '../compose.js';

// A structure representing a collection of rewrites. If a tuple a->b is in the
// map, it means that references to a can be replaced with references to b.
type Replacements = Map<number, number>;
type NameToId = {[key: string]: number};

type Replacer = (fns: Array<Function1Type>, nameToId: NameToId) => Replacements;
const simplify = (replacements: Replacements): Replacements => {
  return new Map(_.map(Array.from(replacements.keys()), (id) => {
    let result: number = id;
    while (replacements.has(result)) {
      result = (replacements.get(result): any);
    }
    return [id, result];
  }));
};

// Creates a Replacements map by replacing functions of the form
//   function f(a) { return g(a); }
const delegateReplacements = (fns: Array<Function1Type>, nameToId: NameToId): Replacements => {
  const entries = _.flatMap(fns, (ast: Function1Type) => {
    const {name, argument, body} = ast;
    if (body.type === 'return') {
      if (body.value.type === 'call') {
        const {fn, arg} = body.value;
        if (arg.value === argument) {
          return [[nameToId[name], nameToId[fn.value]]];
        }
      }
    }
    return [];
  });
  return simplify(new Map(entries));
};

// Creates a Replacements map by checking if function bodies are equal
const equalReplacements = (fns: Array<Function1Type>, nameToId: NameToId): Replacements => {
  const replacements = new Map();
  fns.forEach((ast, id) => {
    if (!replacements.has(id)) {
      _.range(id + 1, fns.length).forEach((i) => {
        if (_.isEqual(fns[i].body, ast.body)) {
          replacements.set(i, id);
        }
      });
    }
  });
  return simplify(replacements);
};

const uniqFuncs = (fns: Array<Function1Type>): Transform => {
  const replace = (replacer: Replacer): Transform => {
    const nameToId: NameToId = _.fromPairs(_.map(fns, (ast: Function1Type, i) => [ast.name, i]));
    const mapping = replacer(fns, nameToId);

    return transform((ast: JsAst): JsAst => {
      if (ast.type === 'literal') {
        const id = nameToId[ast.value];
        if (mapping.has(id)) {
          return Ast.Literal(fns[(mapping.get(id): any)].name);
        } else {
          return ast;
        }
      } else if (ast.type === 'function1') {
        const id = nameToId[ast.name];
        if (mapping.has(id)) {
          return Ast.Empty;
        } else {
          return ast;
        }
      } else {
        return ast;
      }
    });
  };

  return compose(
    replace(delegateReplacements),
    replace(equalReplacements),
  );
};

export default uniqFuncs;
