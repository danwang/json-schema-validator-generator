// @flow
import uniqFuncs from 'js/jsast/uniq-funcs.js';
import Ast from 'js/jsast/ast.js';

describe('uniqFuncs', () => {
  it('handles functions with trivial bodies', () => {
    const ast = Ast.Body(
      Ast.Function1('f0', 'v', Ast.Empty),
      Ast.Function1('f1', 'v', Ast.Body(Ast.Return(
        Ast.Call('f0', Ast.Var('v')),
      ))),
    );
    expect(uniqFuncs(ast)).toEqual(Ast.Body(
      Ast.Function1('f0', 'v', Ast.Empty),
      Ast.Empty,
    ));
  });

  it('removes and renames duplicate functions', () => {
    const ast = Ast.Body(
      Ast.Function1('f0', 'v', Ast.Body(Ast.Return(Ast.Null))),
      Ast.Function1('f1', 'v', Ast.Body(Ast.Return(Ast.Null))),
    );
    expect(uniqFuncs(ast)).toEqual(Ast.Body(
      Ast.Function1('f0', 'v', Ast.Body(Ast.Return(Ast.Null))),
      Ast.Empty,
    ));
  });
});
