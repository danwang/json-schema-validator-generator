// @flow
import _ from 'lodash';

const INDENT = '  ';
const indent = (line: string, depth: number) => `${_.repeat(INDENT, depth)}${line}`;

const gengensym = () => {
  const cache = {};
  return (prefix: string = 'v') => {
    cache[prefix] = cache[prefix] || 0;
    return `${prefix}${cache[prefix]++}`;
  };
};


export default {
  indent,
  gengensym,
};
