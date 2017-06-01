
/* eslint-disable */
export type JsonSchema = {
  id?: string,
  $schema?: string,
  title?: string,
  description?: string,
  default?: mixed,
  multipleOf?: number,
  maximum?: number,
  exclusiveMaximum?: boolean,
  minimum?: number,
  exclusiveMinimum?: boolean,
  maxLength?: T0,
  minLength?: T1,
  pattern?: string,
  additionalItems?: boolean | JsonSchema,
  items?: JsonSchema | T2,
  maxItems?: T0,
  minItems?: T1,
  uniqueItems?: boolean,
  maxProperties?: T0,
  minProperties?: T1,
  required?: T3,
  additionalProperties?: boolean | JsonSchema,
  definitions?: {[key: string]: JsonSchema},
  properties?: {[key: string]: JsonSchema},
  patternProperties?: {[key: string]: JsonSchema},
  dependencies?: {[key: string]: JsonSchema | T3},
  enum?: Array<mixed>,
  type?: T4 | Array<T4>,
  allOf?: T2,
  anyOf?: T2,
  oneOf?: T2,
  not?: JsonSchema,
};
export type T0 = number;
export type T1 = T0 & mixed;
export type T2 = Array<JsonSchema>;
export type T3 = Array<string>;
export type T4 = "array" | "boolean" | "integer" | "null" | "number" | "object" | "string";
