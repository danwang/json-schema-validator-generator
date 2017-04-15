export type Context = {
  gengensym: () => () => string,
  gensym: () => string,
  error: () => Array<string>,
  symbolForSchema: (schema: Object) => string,
};
