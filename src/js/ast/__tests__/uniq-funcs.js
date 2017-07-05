// @flow
import uniqFuncs from 'js/ast/uniq-funcs.js';
import Ast from 'js/ast/ast.js';

describe('uniqFuncs', () => {
  it('handles functions with trivial bodies', () => {
    const ast = Ast.Body(
      Ast.Function1(Ast.Var('f0'), Ast.Var('v'), Ast.Empty),
      Ast.Function1(
        Ast.Var('f1'),
        Ast.Var('v'),
        Ast.Body(Ast.Return(Ast.Call1(Ast.Var('f0'), Ast.Var('v'))))
      )
    );
    expect(uniqFuncs(ast)).toEqual(
      Ast.Body(Ast.Function1(Ast.Var('f0'), Ast.Var('v'), Ast.Empty), Ast.Empty)
    );
  });

  it('removes and renames duplicate functions', () => {
    const ast = Ast.Body(
      Ast.Function1(
        Ast.Var('f0'),
        Ast.Var('v'),
        Ast.Body(Ast.Return(Ast.Null))
      ),
      Ast.Function1(Ast.Var('f1'), Ast.Var('v'), Ast.Body(Ast.Return(Ast.Null)))
    );
    expect(uniqFuncs(ast)).toEqual(
      Ast.Body(
        Ast.Function1(
          Ast.Var('f0'),
          Ast.Var('v'),
          Ast.Body(Ast.Return(Ast.Null))
        ),
        Ast.Empty
      )
    );
  });
});
