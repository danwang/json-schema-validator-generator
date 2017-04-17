// @flow
import uniqFuncs from '../uniq-funcs.js';
import Ast from '../ast.js';

describe('uniqFuncs', () => {
  it('handles functions with trivial bodies', () => {
    const fns = [
      Ast.Function1('f0', 'v', Ast.Empty),
      Ast.Function1('f1', 'v', Ast.Return(
        Ast.Call('f0', 'v'),
      )),
    ];
    const ast = Ast.Body(...fns);
    const uniquer = uniqFuncs(fns);
    expect(uniquer(ast)).toEqual(Ast.Body(
      Ast.Function1('f0', 'v', Ast.Empty),
      Ast.Empty,
    ));
  });

  it('removes and renames duplicate functions', () => {
    const fns = [
      Ast.Function1('f0', 'v', Ast.Return('null')),
      Ast.Function1('f1', 'v', Ast.Return('null')),
    ];
    const ast = Ast.Body(...fns);
    const uniquer = uniqFuncs(fns);
    expect(uniquer(ast)).toEqual(Ast.Body(
      Ast.Function1('f0', 'v', Ast.Return('null')),
      Ast.Empty,
    ));
  });
});
