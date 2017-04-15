// @flow
import _ from 'lodash';
import Ast from './ast.js';
import type {JsAst, Function1Type} from './ast.js';
import transform from './transform.js';

const uniqFuncs = (fns: Array<Function1Type>): Array<Function1Type> => {
  const mapping = _.reduce(fns, (result, fn, key) => {
    if (result.hasOwnProperty(key)) {
      return result;
    } else {
      const matches = _.filter(_.range(fns.length), (i) => {
        return i !== key && _.isEqual(fns[i].body, fn.body);
      });
      const updates = _.fromPairs(_.map(matches, (i) => [i, key]));
      return {
        ...result,
        ...updates,
      };
    }
  }, {});

  const transformer = transform((ast: JsAst) => {
    if (ast.type === 'call') {
      const name = ast.fn.value;
      return Ast.Call(
        mapping[name] || name,
        ast.arg.value,
      );
    } else {
      return null;
    }
  });

  return (fns.filter((v, i) => !mapping[i]).map(transformer): any);
};

export default uniqFuncs;
