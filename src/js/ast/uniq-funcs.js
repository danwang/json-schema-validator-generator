// @flow
import _ from 'lodash';
import Ast from 'js/ast/ast.js';
import type {JsAst, Function1Type} from 'js/ast/ast.js';
import transform from 'js/ast/transform.js';
import compose from 'lambdanwang/compose';
import collect from 'js/ast/collect.js';
import type {Collect} from 'js/ast/collect.js';
import type {Transform} from 'js/ast/transform.js';

// A structure representing a collection of rewrites. If a tuple a->b is in the
// map, it means that references to a can be replaced with references to b.
type Replacements = Map<number, number>;
type NameToId = {[key: string]: number};

type Replacer = (fns: Array<Function1Type>, nameToId: NameToId) => Replacements;
const simplify = (replacements: Replacements): Replacements => {
  return new Map(
    _.map(Array.from(replacements.keys()), id => {
      let result: number = id;
      while (replacements.has(result)) {
        result = (replacements.get(result): any);
      }
      return [id, result];
    })
  );
};

// Creates a Replacements map by replacing functions of the form
//   function f(a) { return g(a); }
const delegateReplacements = (
  fns: Array<Function1Type>,
  nameToId: NameToId
): Replacements => {
  const entries = _.flatMap(fns, (ast: Function1Type) => {
    const {name, argument, body} = ast;
    if (body.type === 'body' && body.body.length === 1) {
      const line = body.body[0];
      if (line.type === 'return') {
        if (line.value.type === 'call1') {
          const {fn, arg} = line.value;
          if (fn.type === 'var') {
            if (arg.value === argument.value) {
              return [[nameToId[name.value], nameToId[fn.value]]];
            }
          }
        }
      }
    }
    return [];
  });
  return simplify(new Map(entries));
};

const _getFuncs = collect((ast: JsAst, recur: Collect<JsAst>) => {
  if (ast.type === 'function1') {
    return [ast];
  } else {
    return recur(ast);
  }
});
const getFuncs = (ast: JsAst) => _.uniq(_getFuncs(ast));

// Creates a Replacements map by checking if function bodies are equal
const equalReplacements = (
  fns: Array<Function1Type>,
  nameToId: NameToId
): Replacements => {
  const replacements = new Map();
  fns.forEach((ast, id) => {
    if (!replacements.has(id)) {
      _.range(id + 1, fns.length).forEach(i => {
        if (_.isEqual(fns[i].body, ast.body)) {
          replacements.set(i, id);
        }
      });
    }
  });
  return simplify(replacements);
};

const replace = (replacer: Replacer) => (base: JsAst): JsAst => {
  const fns = getFuncs(base);
  const nameToId: NameToId = _.fromPairs(
    _.map(fns, (f: Function1Type, i) => [f.name.value, i])
  );
  const mapping = replacer(fns, nameToId);

  const t = transform((ast: JsAst, recur: Transform): JsAst => {
    if (ast.type === 'var') {
      const id = nameToId[ast.value];
      if (mapping.has(id)) {
        const replacedId: any = mapping.get(id);
        return fns[replacedId].name;
      } else {
        return recur(ast);
      }
    } else if (ast.type === 'function1') {
      const id = nameToId[ast.name.value];
      if (mapping.has(id)) {
        return Ast.Empty;
      } else {
        return Ast.Function1(ast.name, ast.argument, recur(ast.body));
      }
    } else {
      return recur(ast);
    }
  });

  return t(base);
};

const uniqFuncs = compose(
  replace(delegateReplacements),
  replace(equalReplacements)
);

export default uniqFuncs;
