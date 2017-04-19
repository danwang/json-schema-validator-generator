// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {JsAst} from 'js/jsast/ast.js';
import collect from 'js/jsast/collect.js';
import type {Collect} from 'js/jsast/collect.js';

const _getVars = collect((ast: JsAst, recur: Collect<string>) => {
  if (ast.type === 'assignment') {
    if (ast.variable.type === 'var' || ast.variable.type === 'literal') {
      return [ast.variable.value];
    } else {
      return [];
    }
  } else if (ast.type === 'forin') {
    return [ast.variable.value, ...recur(ast.body)];
  } else if (ast.type === 'function1') {
    return [];
  } else {
    return recur(ast);
  }
});

const getVars = (ast: JsAst) => _.uniq(_getVars(ast));
export default getVars;
