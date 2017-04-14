// @flow
import flowType from './flow-type.js';
import type {FlowType} from './flow-type.js'; // eslint-disable-line no-duplicate-imports

export const generateLines = (ft: FlowType): Array<string> => {
  switch (ft.type) {
    case 'mixed':
      return ['mixed'];
    case 'boolean':
      return ['boolean'];
    case 'null':
      return ['null'];
    case 'number':
      return ['number'];
    case 'string':
      return ['string'];
    default:
      return ['mixed'];
  }
};

const generateFlow = (schema: Object): Array<string> => generateLines(flowType(schema));
export default generateFlow;
