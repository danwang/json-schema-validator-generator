// @flow
import uniqFuncs from 'jsvg/jsast/uniq-funcs.js';
import Ast from 'jsvg/jsast/ast.js';

describe('uniqFuncs', () => {
  it('handles functions with trivial bodies', () => {
    const ast = Ast.Body(
      Ast.Function1('f0', 'v', Ast.Empty),
      Ast.Function1('f1', 'v', Ast.Return(
        Ast.Call('f0', 'v'),
      )),
    );
    expect(uniqFuncs(ast)).toEqual(Ast.Body(
      Ast.Function1('f0', 'v', Ast.Empty),
      Ast.Empty,
    ));
  });

  it('removes and renames duplicate functions', () => {
    const ast = Ast.Body(
      Ast.Function1('f0', 'v', Ast.Return('null')),
      Ast.Function1('f1', 'v', Ast.Return('null')),
    );
    expect(uniqFuncs(ast)).toEqual(Ast.Body(
      Ast.Function1('f0', 'v', Ast.Return('null')),
      Ast.Empty,
    ));
  });
});
