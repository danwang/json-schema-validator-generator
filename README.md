# json-schema-validator-generator

A [Flow](https://flow.org/) type and JS validator code generator for [JSON Schema](http://json-schema.org/). ![Circle CI build status](https://circleci.com/gh/danwang/json-schema-validator-generator.svg?style=shield&circle-token=e55c75fb4868a71bbd2fba3479cbd8e056cb2548)

## Install
```
yarn add json-schema-validator-generator
```

## Usage
### Basic

```js
import generate from 'json-schema-validator-generator';
const schema = {type: 'string'};
const {flow, js} = generate(schema);

console.log(flow);
// declare type root = string;

console.log(js);
// (function() {
//   function f0(v0) {
//     if (typeof v0 !== 'string') {
//       return "error";
//     }
//     return null;
//   }
//   return {
//     root: f0,
//   };
// })()
```

### Flow Output
The generated flow string is meant for direct consumption in a project's [library definitions](https://flow.org/en/docs/libdefs/creation/). See [scripts/generate.js](https://github.com/danwang/json-schema-validator-generator/blob/master/scripts/generate.js) for an example script which writes flow types to [src/decls/json-schema.js](https://github.com/danwang/json-schema-validator-generator/blob/master/src/decls/json-schema.js).

### JS Output
The generated JS string is an [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) that evaluates to an object whose values are validator functions. Each validator returns the string `'error'` if the model is invalid or `null` otherwise.

```js
type Validator = (data: mixed) => 'error' | null;
```

It's recommended to write the generated JS to the filesystem, but it's possible to use the generated code at runtime.

#### Static JS Usage
See [scripts/generate.js](https://github.com/danwang/json-schema-validator-generator/blob/master/scripts/generate.js) for an example script which writes validators to [src/generated-validator.js](https://github.com/danwang/json-schema-validator-generator/blob/master/src/generated-validator.js).

#### Dynamic JS Usage (not recommended)
```js
import generate from 'json-schema-validator-generator';

const validatorForSchema = (schema) => {
  const {js} = generate(schema);
  return eval(js);
};
```

### Advanced
Sometimes we may be using JSON Schema to define a collection of types. In this case, the generator needs some information about the subschema to be generated.

For example, consider the definition of a binary tree of numbers:

```js
import generate from 'json-schema-validator-generator';
const schema = {
  definitions: {
    node: {
      type: 'object',
      properties: {
        left: {$ref: '#/definitions/nodeOrValue'},
        right: {$ref: '#/definitions/nodeOrValue'},
      },
      required: ['left', 'right'],
    },
    nodeOrValue: {
      oneOf: [
        {$ref: '#/definitions/node'},
        {type: 'number'},
      ],
    },
  },
};
const {flow, js} = generate(schema, {node: schema.definitions.node});
const nodeValidator = eval(js).node;

console.log(nodeValidator({left: 1, right: 2})); // null
console.log(nodeValidator({left: 1, right: {left: 2, right: 3}})); // null

console.log(nodeValidator(1)); // 'error'
console.log(nodeValidator({left: 1})); // 'error'
console.log(nodeValidator({left: 1, right: '2'})); // 'error'
```
