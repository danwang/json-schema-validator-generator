// @noflow
/* eslint-disable */
export default (function() {
  function f0(v0) {
    var v1;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      if (v0.exclusiveMaximum !== undefined && v0.maximum === undefined) {
        /* dependencies[exclusiveMaximum] */
        return 'error';
      }
      if (v0.exclusiveMinimum !== undefined && v0.minimum === undefined) {
        /* dependencies[exclusiveMinimum] */
        return 'error';
      }
    }
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      v1 = v0.id;
      if (v1 !== undefined && f1(v1) !== null) {
        /* properties[id] */
        return 'error';
      }
      v1 = v0.$schema;
      if (v1 !== undefined && f1(v1) !== null) {
        /* properties[$schema] */
        return 'error';
      }
      v1 = v0.title;
      if (v1 !== undefined && f1(v1) !== null) {
        /* properties[title] */
        return 'error';
      }
      v1 = v0.description;
      if (v1 !== undefined && f1(v1) !== null) {
        /* properties[description] */
        return 'error';
      }
      v1 = v0.default;
      if (v1 !== undefined && f3(v1) !== null) {
        /* properties[default] */
        return 'error';
      }
      v1 = v0.multipleOf;
      if (v1 !== undefined && f4(v1) !== null) {
        /* properties[multipleOf] */
        return 'error';
      }
      v1 = v0.maximum;
      if (v1 !== undefined && f5(v1) !== null) {
        /* properties[maximum] */
        return 'error';
      }
      v1 = v0.exclusiveMaximum;
      if (v1 !== undefined && f6(v1) !== null) {
        /* properties[exclusiveMaximum] */
        return 'error';
      }
      v1 = v0.minimum;
      if (v1 !== undefined && f5(v1) !== null) {
        /* properties[minimum] */
        return 'error';
      }
      v1 = v0.exclusiveMinimum;
      if (v1 !== undefined && f6(v1) !== null) {
        /* properties[exclusiveMinimum] */
        return 'error';
      }
      v1 = v0.maxLength;
      if (v1 !== undefined && f19(v1) !== null) {
        /* properties[maxLength] */
        return 'error';
      }
      v1 = v0.minLength;
      if (v1 !== undefined && f20(v1) !== null) {
        /* properties[minLength] */
        return 'error';
      }
      v1 = v0.pattern;
      if (v1 !== undefined && f1(v1) !== null) {
        /* properties[pattern] */
        return 'error';
      }
      v1 = v0.additionalItems;
      if (v1 !== undefined && f10(v1) !== null) {
        /* properties[additionalItems] */
        return 'error';
      }
      v1 = v0.items;
      if (v1 !== undefined && f11(v1) !== null) {
        /* properties[items] */
        return 'error';
      }
      v1 = v0.maxItems;
      if (v1 !== undefined && f19(v1) !== null) {
        /* properties[maxItems] */
        return 'error';
      }
      v1 = v0.minItems;
      if (v1 !== undefined && f20(v1) !== null) {
        /* properties[minItems] */
        return 'error';
      }
      v1 = v0.uniqueItems;
      if (v1 !== undefined && f6(v1) !== null) {
        /* properties[uniqueItems] */
        return 'error';
      }
      v1 = v0.maxProperties;
      if (v1 !== undefined && f19(v1) !== null) {
        /* properties[maxProperties] */
        return 'error';
      }
      v1 = v0.minProperties;
      if (v1 !== undefined && f20(v1) !== null) {
        /* properties[minProperties] */
        return 'error';
      }
      v1 = v0.required;
      if (v1 !== undefined && f22(v1) !== null) {
        /* properties[required] */
        return 'error';
      }
      v1 = v0.additionalProperties;
      if (v1 !== undefined && f10(v1) !== null) {
        /* properties[additionalProperties] */
        return 'error';
      }
      v1 = v0.definitions;
      if (v1 !== undefined && f13(v1) !== null) {
        /* properties[definitions] */
        return 'error';
      }
      v1 = v0.properties;
      if (v1 !== undefined && f13(v1) !== null) {
        /* properties[properties] */
        return 'error';
      }
      v1 = v0.patternProperties;
      if (v1 !== undefined && f13(v1) !== null) {
        /* properties[patternProperties] */
        return 'error';
      }
      v1 = v0.dependencies;
      if (v1 !== undefined && f14(v1) !== null) {
        /* properties[dependencies] */
        return 'error';
      }
      v1 = v0.enum;
      if (v1 !== undefined && f15(v1) !== null) {
        /* properties[enum] */
        return 'error';
      }
      v1 = v0.type;
      if (v1 !== undefined && f16(v1) !== null) {
        /* properties[type] */
        return 'error';
      }
      v1 = v0.allOf;
      if (v1 !== undefined && f26(v1) !== null) {
        /* properties[allOf] */
        return 'error';
      }
      v1 = v0.anyOf;
      if (v1 !== undefined && f26(v1) !== null) {
        /* properties[anyOf] */
        return 'error';
      }
      v1 = v0.oneOf;
      if (v1 !== undefined && f26(v1) !== null) {
        /* properties[oneOf] */
        return 'error';
      }
      v1 = v0.not;
      if (v1 !== undefined && f0(v1) !== null) {
        /* properties[not] */
        return 'error';
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      /* type */
      return 'error';
    }
    return null;
  }
  function f1(v0) {
    if (typeof v0 !== 'string') {
      /* type */
      return 'error';
    }
    return null;
  }
  function f3(v0) {
    return null;
  }
  function f4(v0) {
    if (typeof v0 === 'number' && v0 <= 0) {
      /* minimum */
      return 'error';
    }
    if (typeof v0 !== 'number') {
      /* type */
      return 'error';
    }
    return null;
  }
  function f5(v0) {
    if (typeof v0 !== 'number') {
      /* type */
      return 'error';
    }
    return null;
  }
  function f6(v0) {
    if (typeof v0 !== 'boolean') {
      /* type */
      return 'error';
    }
    return null;
  }
  function f10(v0) {
    var v1;
    v1 = 0;
    f6(v0) === null && (v1)++;
    f0(v0) === null && (v1)++;
    if (v1 === 0) {
      /* anyOf */
      return 'error';
    }
    return null;
  }
  function f11(v0) {
    var v1;
    v1 = 0;
    f0(v0) === null && (v1)++;
    f26(v0) === null && (v1)++;
    if (v1 === 0) {
      /* anyOf */
      return 'error';
    }
    return null;
  }
  function f13(v0) {
    var v1, v2;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      for (var v1 in v0) {
        v2 = v0[v1];
        if (f0(v2) !== null) {
          /* additionalProperties */
          return 'error';
        }
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      /* type */
      return 'error';
    }
    return null;
  }
  function f14(v0) {
    var v1, v2;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      for (var v1 in v0) {
        v2 = v0[v1];
        if (f23(v2) !== null) {
          /* additionalProperties */
          return 'error';
        }
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      /* type */
      return 'error';
    }
    return null;
  }
  function f15(v0) {
    var v1, v2, v3;
    if (Array.isArray(v0) && v0.length < 1) {
      /* minItems */
      return 'error';
    }
    if (!(Array.isArray(v0))) {
      /* type */
      return 'error';
    }
    if (Array.isArray(v0)) {
      v1 = {};
      v2 = 0;
      for (; v2 < v0.length; (v2)++) {
        v3 = JSON.stringify(v0[v2]);
        v1[v3] = true;
      }
      if (Object.keys(v1).length !== v0.length) {
        /* uniqueItems */
        return 'error';
      }
    }
    return null;
  }
  function f16(v0) {
    var v1;
    v1 = 0;
    f28(v0) === null && (v1)++;
    f25(v0) === null && (v1)++;
    if (v1 === 0) {
      /* anyOf */
      return 'error';
    }
    return null;
  }
  function f19(v0) {
    if (typeof v0 === 'number' && v0 < 0) {
      /* minimum */
      return 'error';
    }
    if (typeof v0 !== 'number' || v0 % 1 !== 0) {
      /* type */
      return 'error';
    }
    return null;
  }
  function f20(v0) {
    if (f19(v0) !== null) {
      /* allOf */
      return 'error';
    }
    if (f3(v0) !== null) {
      /* allOf */
      return 'error';
    }
    return null;
  }
  function f22(v0) {
    var v1, v2, v3, v4, v5;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; (v1)++) {
        if (f1(v0[v1]) !== null) {
          /* items */
          return 'error';
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      /* minItems */
      return 'error';
    }
    if (!(Array.isArray(v0))) {
      /* type */
      return 'error';
    }
    if (Array.isArray(v0)) {
      v3 = {};
      v4 = 0;
      for (; v4 < v0.length; (v4)++) {
        v5 = JSON.stringify(v0[v4]);
        v3[v5] = true;
      }
      if (Object.keys(v3).length !== v0.length) {
        /* uniqueItems */
        return 'error';
      }
    }
    return null;
  }
  function f23(v0) {
    var v1;
    v1 = 0;
    f0(v0) === null && (v1)++;
    f22(v0) === null && (v1)++;
    if (v1 === 0) {
      /* anyOf */
      return 'error';
    }
    return null;
  }
  function f25(v0) {
    var v1, v2, v3, v4, v5;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; (v1)++) {
        if (f28(v0[v1]) !== null) {
          /* items */
          return 'error';
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      /* minItems */
      return 'error';
    }
    if (!(Array.isArray(v0))) {
      /* type */
      return 'error';
    }
    if (Array.isArray(v0)) {
      v3 = {};
      v4 = 0;
      for (; v4 < v0.length; (v4)++) {
        v5 = JSON.stringify(v0[v4]);
        v3[v5] = true;
      }
      if (Object.keys(v3).length !== v0.length) {
        /* uniqueItems */
        return 'error';
      }
    }
    return null;
  }
  function f26(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; (v1)++) {
        if (f0(v0[v1]) !== null) {
          /* items */
          return 'error';
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      /* minItems */
      return 'error';
    }
    if (!(Array.isArray(v0))) {
      /* type */
      return 'error';
    }
    return null;
  }
  function f28(v0) {
    var v1;
    v1 = 0;
    if (v0 === 'array') {
      (v1)++;
    }
    if (v0 === 'boolean') {
      (v1)++;
    }
    if (v0 === 'integer') {
      (v1)++;
    }
    if (v0 === 'null') {
      (v1)++;
    }
    if (v0 === 'number') {
      (v1)++;
    }
    if (v0 === 'object') {
      (v1)++;
    }
    if (v0 === 'string') {
      (v1)++;
    }
    if (v1 === 0) {
      /* enum */
      return 'error';
    }
    return null;
  }
  return {
    JsonSchema: f0,
  };
}());
