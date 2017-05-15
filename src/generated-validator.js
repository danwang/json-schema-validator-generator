// @noflow
/* eslint-disable */
export default (function() {
  function f0(v0) {
    var v1;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      if (v0.exclusiveMaximum !== undefined && v0.maximum === undefined) {
        return 1;
      }
      if (v0.exclusiveMinimum !== undefined && v0.minimum === undefined) {
        return 2;
      }
    }
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      v1 = v0.id;
      if (v1 !== undefined && f1(v1) !== 0) {
        return 3;
      }
      v1 = v0.$schema;
      if (v1 !== undefined && f1(v1) !== 0) {
        return 4;
      }
      v1 = v0.title;
      if (v1 !== undefined && f2(v1) !== 0) {
        return 5;
      }
      v1 = v0.description;
      if (v1 !== undefined && f2(v1) !== 0) {
        return 6;
      }
      v1 = v0.default;
      if (v1 !== undefined && f3(v1) !== 0) {
        return 7;
      }
      v1 = v0.multipleOf;
      if (v1 !== undefined && f4(v1) !== 0) {
        return 8;
      }
      v1 = v0.maximum;
      if (v1 !== undefined && f5(v1) !== 0) {
        return 9;
      }
      v1 = v0.exclusiveMaximum;
      if (v1 !== undefined && f6(v1) !== 0) {
        return 10;
      }
      v1 = v0.minimum;
      if (v1 !== undefined && f5(v1) !== 0) {
        return 11;
      }
      v1 = v0.exclusiveMinimum;
      if (v1 !== undefined && f6(v1) !== 0) {
        return 12;
      }
      v1 = v0.maxLength;
      if (v1 !== undefined && f19(v1) !== 0) {
        return 13;
      }
      v1 = v0.minLength;
      if (v1 !== undefined && f20(v1) !== 0) {
        return 14;
      }
      v1 = v0.pattern;
      if (v1 !== undefined && f9(v1) !== 0) {
        return 15;
      }
      v1 = v0.additionalItems;
      if (v1 !== undefined && f10(v1) !== 0) {
        return 16;
      }
      v1 = v0.items;
      if (v1 !== undefined && f11(v1) !== 0) {
        return 17;
      }
      v1 = v0.maxItems;
      if (v1 !== undefined && f19(v1) !== 0) {
        return 18;
      }
      v1 = v0.minItems;
      if (v1 !== undefined && f20(v1) !== 0) {
        return 19;
      }
      v1 = v0.uniqueItems;
      if (v1 !== undefined && f6(v1) !== 0) {
        return 20;
      }
      v1 = v0.maxProperties;
      if (v1 !== undefined && f19(v1) !== 0) {
        return 21;
      }
      v1 = v0.minProperties;
      if (v1 !== undefined && f20(v1) !== 0) {
        return 22;
      }
      v1 = v0.required;
      if (v1 !== undefined && f22(v1) !== 0) {
        return 23;
      }
      v1 = v0.additionalProperties;
      if (v1 !== undefined && f10(v1) !== 0) {
        return 24;
      }
      v1 = v0.definitions;
      if (v1 !== undefined && f13(v1) !== 0) {
        return 25;
      }
      v1 = v0.properties;
      if (v1 !== undefined && f13(v1) !== 0) {
        return 26;
      }
      v1 = v0.patternProperties;
      if (v1 !== undefined && f13(v1) !== 0) {
        return 27;
      }
      v1 = v0.dependencies;
      if (v1 !== undefined && f14(v1) !== 0) {
        return 28;
      }
      v1 = v0.enum;
      if (v1 !== undefined && f15(v1) !== 0) {
        return 29;
      }
      v1 = v0.type;
      if (v1 !== undefined && f16(v1) !== 0) {
        return 30;
      }
      v1 = v0.allOf;
      if (v1 !== undefined && f26(v1) !== 0) {
        return 31;
      }
      v1 = v0.anyOf;
      if (v1 !== undefined && f26(v1) !== 0) {
        return 32;
      }
      v1 = v0.oneOf;
      if (v1 !== undefined && f26(v1) !== 0) {
        return 33;
      }
      v1 = v0.not;
      if (v1 !== undefined && f0(v1) !== 0) {
        return 34;
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      return 35;
    }
    return 0;
  }
  function f1(v0) {
    if (typeof v0 !== 'string') {
      return 36;
    }
    return 0;
  }
  function f2(v0) {
    if (typeof v0 !== 'string') {
      return 37;
    }
    return 0;
  }
  function f3(v0) {
    return 0;
  }
  function f4(v0) {
    if (typeof v0 === 'number' && v0 <= 0) {
      return 38;
    }
    if (typeof v0 !== 'number') {
      return 39;
    }
    return 0;
  }
  function f5(v0) {
    if (typeof v0 !== 'number') {
      return 40;
    }
    return 0;
  }
  function f6(v0) {
    if (typeof v0 !== 'boolean') {
      return 41;
    }
    return 0;
  }
  function f9(v0) {
    if (typeof v0 !== 'string') {
      return 42;
    }
    return 0;
  }
  function f10(v0) {
    var v1;
    v1 = 0;
    f21(v0) === 0 && (v1)++;
    f0(v0) === 0 && (v1)++;
    if (v1 === 0) {
      return 43;
    }
    return 0;
  }
  function f11(v0) {
    var v1;
    v1 = 0;
    f0(v0) === 0 && (v1)++;
    f26(v0) === 0 && (v1)++;
    if (v1 === 0) {
      return 44;
    }
    return 0;
  }
  function f13(v0) {
    var v1, v2;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      for (var v1 in v0) {
        v2 = v0[v1];
        if (f0(v2) !== 0) {
          return 45;
        }
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      return 46;
    }
    return 0;
  }
  function f14(v0) {
    var v1, v2;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      for (var v1 in v0) {
        v2 = v0[v1];
        if (f23(v2) !== 0) {
          return 47;
        }
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      return 48;
    }
    return 0;
  }
  function f15(v0) {
    var v2, v3, v4;
    if (Array.isArray(v0) && v0.length < 1) {
      return 49;
    }
    if (!(Array.isArray(v0))) {
      return 50;
    }
    if (Array.isArray(v0)) {
      v2 = {};
      v3 = 0;
      for (; v3 < v0.length; (v3)++) {
        v4 = JSON.stringify(v0[v3]);
        v2[v4] = true;
      }
      if (Object.keys(v2).length !== v0.length) {
        return 51;
      }
    }
    return 0;
  }
  function f16(v0) {
    var v1;
    v1 = 0;
    f28(v0) === 0 && (v1)++;
    f25(v0) === 0 && (v1)++;
    if (v1 === 0) {
      return 52;
    }
    return 0;
  }
  function f19(v0) {
    if (typeof v0 === 'number' && v0 < 0) {
      return 53;
    }
    if (typeof v0 !== 'number' || v0 % 1 !== 0) {
      return 54;
    }
    return 0;
  }
  function f20(v0) {
    if (f19(v0) !== 0) {
      return 55;
    }
    if (f3(v0) !== 0) {
      return 55;
    }
    return 0;
  }
  function f21(v0) {
    if (typeof v0 !== 'boolean') {
      return 56;
    }
    return 0;
  }
  function f22(v0) {
    var v1, v3, v4, v5;
    if (Array.isArray(v0)) {
      v1 = 0;
      for (; v1 < v0.length; (v1)++) {
        if (f2(v0[v1]) !== 0) {
          return 57;
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      return 58;
    }
    if (!(Array.isArray(v0))) {
      return 59;
    }
    if (Array.isArray(v0)) {
      v3 = {};
      v4 = 0;
      for (; v4 < v0.length; (v4)++) {
        v5 = JSON.stringify(v0[v4]);
        v3[v5] = true;
      }
      if (Object.keys(v3).length !== v0.length) {
        return 60;
      }
    }
    return 0;
  }
  function f23(v0) {
    var v1;
    v1 = 0;
    f0(v0) === 0 && (v1)++;
    f22(v0) === 0 && (v1)++;
    if (v1 === 0) {
      return 61;
    }
    return 0;
  }
  function f25(v0) {
    var v1, v3, v4, v5;
    if (Array.isArray(v0)) {
      v1 = 0;
      for (; v1 < v0.length; (v1)++) {
        if (f28(v0[v1]) !== 0) {
          return 62;
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      return 63;
    }
    if (!(Array.isArray(v0))) {
      return 64;
    }
    if (Array.isArray(v0)) {
      v3 = {};
      v4 = 0;
      for (; v4 < v0.length; (v4)++) {
        v5 = JSON.stringify(v0[v4]);
        v3[v5] = true;
      }
      if (Object.keys(v3).length !== v0.length) {
        return 65;
      }
    }
    return 0;
  }
  function f26(v0) {
    var v1;
    if (Array.isArray(v0)) {
      v1 = 0;
      for (; v1 < v0.length; (v1)++) {
        if (f0(v0[v1]) !== 0) {
          return 66;
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      return 67;
    }
    if (!(Array.isArray(v0))) {
      return 68;
    }
    return 0;
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
      return 69;
    }
    return 0;
  }
  return {
    JsonSchema: f0,
  };
}());
