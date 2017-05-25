// @noflow
/* eslint-disable */
export default (function() {
  function f0(v0) {
    var v2, v1;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      if (v0.exclusiveMaximum !== undefined && v0.maximum === undefined) {
        /* JsonSchema: dependencies[exclusiveMaximum] */
        return [1];
      }
      if (v0.exclusiveMinimum !== undefined && v0.minimum === undefined) {
        /* JsonSchema: dependencies[exclusiveMinimum] */
        return [2];
      }
    }
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      v2 = v0.id;
      if (v2 !== undefined) {
        v1 = f1(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[id] */
          return v1.concat(3);
        }
      }
      v2 = v0.$schema;
      if (v2 !== undefined) {
        v1 = f1(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[$schema] */
          return v1.concat(4);
        }
      }
      v2 = v0.title;
      if (v2 !== undefined) {
        v1 = f2(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[title] */
          return v1.concat(5);
        }
      }
      v2 = v0.description;
      if (v2 !== undefined) {
        v1 = f2(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[description] */
          return v1.concat(6);
        }
      }
      v2 = v0.default;
      if (v2 !== undefined) {
        v1 = f3(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[default] */
          return v1.concat(7);
        }
      }
      v2 = v0.multipleOf;
      if (v2 !== undefined) {
        v1 = f4(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[multipleOf] */
          return v1.concat(8);
        }
      }
      v2 = v0.maximum;
      if (v2 !== undefined) {
        v1 = f5(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[maximum] */
          return v1.concat(9);
        }
      }
      v2 = v0.exclusiveMaximum;
      if (v2 !== undefined) {
        v1 = f6(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[exclusiveMaximum] */
          return v1.concat(10);
        }
      }
      v2 = v0.minimum;
      if (v2 !== undefined) {
        v1 = f5(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[minimum] */
          return v1.concat(11);
        }
      }
      v2 = v0.exclusiveMinimum;
      if (v2 !== undefined) {
        v1 = f6(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[exclusiveMinimum] */
          return v1.concat(12);
        }
      }
      v2 = v0.maxLength;
      if (v2 !== undefined) {
        v1 = f19(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[maxLength] */
          return v1.concat(13);
        }
      }
      v2 = v0.minLength;
      if (v2 !== undefined) {
        v1 = f20(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[minLength] */
          return v1.concat(14);
        }
      }
      v2 = v0.pattern;
      if (v2 !== undefined) {
        v1 = f9(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[pattern] */
          return v1.concat(15);
        }
      }
      v2 = v0.additionalItems;
      if (v2 !== undefined) {
        v1 = f10(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[additionalItems] */
          return v1.concat(16);
        }
      }
      v2 = v0.items;
      if (v2 !== undefined) {
        v1 = f11(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[items] */
          return v1.concat(17);
        }
      }
      v2 = v0.maxItems;
      if (v2 !== undefined) {
        v1 = f19(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[maxItems] */
          return v1.concat(18);
        }
      }
      v2 = v0.minItems;
      if (v2 !== undefined) {
        v1 = f20(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[minItems] */
          return v1.concat(19);
        }
      }
      v2 = v0.uniqueItems;
      if (v2 !== undefined) {
        v1 = f6(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[uniqueItems] */
          return v1.concat(20);
        }
      }
      v2 = v0.maxProperties;
      if (v2 !== undefined) {
        v1 = f19(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[maxProperties] */
          return v1.concat(21);
        }
      }
      v2 = v0.minProperties;
      if (v2 !== undefined) {
        v1 = f20(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[minProperties] */
          return v1.concat(22);
        }
      }
      v2 = v0.required;
      if (v2 !== undefined) {
        v1 = f22(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[required] */
          return v1.concat(23);
        }
      }
      v2 = v0.additionalProperties;
      if (v2 !== undefined) {
        v1 = f10(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[additionalProperties] */
          return v1.concat(24);
        }
      }
      v2 = v0.definitions;
      if (v2 !== undefined) {
        v1 = f13(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[definitions] */
          return v1.concat(25);
        }
      }
      v2 = v0.properties;
      if (v2 !== undefined) {
        v1 = f13(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[properties] */
          return v1.concat(26);
        }
      }
      v2 = v0.patternProperties;
      if (v2 !== undefined) {
        v1 = f13(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[patternProperties] */
          return v1.concat(27);
        }
      }
      v2 = v0.dependencies;
      if (v2 !== undefined) {
        v1 = f14(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[dependencies] */
          return v1.concat(28);
        }
      }
      v2 = v0.enum;
      if (v2 !== undefined) {
        v1 = f15(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[enum] */
          return v1.concat(29);
        }
      }
      v2 = v0.type;
      if (v2 !== undefined) {
        v1 = f16(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[type] */
          return v1.concat(30);
        }
      }
      v2 = v0.allOf;
      if (v2 !== undefined) {
        v1 = f26(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[allOf] */
          return v1.concat(31);
        }
      }
      v2 = v0.anyOf;
      if (v2 !== undefined) {
        v1 = f26(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[anyOf] */
          return v1.concat(32);
        }
      }
      v2 = v0.oneOf;
      if (v2 !== undefined) {
        v1 = f26(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[oneOf] */
          return v1.concat(33);
        }
      }
      v2 = v0.not;
      if (v2 !== undefined) {
        v1 = f0(v2);
        if (v1 !== 0) {
          /* JsonSchema: properties[not] */
          return v1.concat(34);
        }
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      /* JsonSchema: type */
      return [35];
    }
    return 0;
  }
  function f1(v0) {
    if (typeof v0 !== 'string') {
      /* f1: type */
      return [36];
    }
    return 0;
  }
  function f2(v0) {
    if (typeof v0 !== 'string') {
      /* f2: type */
      return [37];
    }
    return 0;
  }
  function f3(v0) {
    return 0;
  }
  function f4(v0) {
    if (typeof v0 === 'number' && v0 <= 0) {
      /* f4: minimum */
      return [38];
    }
    if (typeof v0 !== 'number') {
      /* f4: type */
      return [39];
    }
    return 0;
  }
  function f5(v0) {
    if (typeof v0 !== 'number') {
      /* f5: type */
      return [40];
    }
    return 0;
  }
  function f6(v0) {
    if (typeof v0 !== 'boolean') {
      /* f6: type */
      return [41];
    }
    return 0;
  }
  function f9(v0) {
    if (typeof v0 !== 'string') {
      /* f9: type */
      return [42];
    }
    return 0;
  }
  function f10(v0) {
    var v1;
    v1 = 0;
    f21(v0) === 0 && (v1)++;
    f0(v0) === 0 && (v1)++;
    if (v1 === 0) {
      /* f10: anyOf */
      return [43];
    }
    return 0;
  }
  function f11(v0) {
    var v1;
    v1 = 0;
    f0(v0) === 0 && (v1)++;
    f26(v0) === 0 && (v1)++;
    if (v1 === 0) {
      /* f11: anyOf */
      return [44];
    }
    return 0;
  }
  function f13(v0) {
    var v1, v2, v4;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      for (var v1 in v0) {
        v2 = v0[v1];
        v4 = f0(v2);
        if (v4 !== 0) {
          /* f13: additionalProperties */
          return v4.concat(45);
        }
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      /* f13: type */
      return [46];
    }
    return 0;
  }
  function f14(v0) {
    var v1, v2, v4;
    if (v0 && typeof v0 === 'object' && !(Array.isArray(v0))) {
      for (var v1 in v0) {
        v2 = v0[v1];
        v4 = f23(v2);
        if (v4 !== 0) {
          /* f14: additionalProperties */
          return v4.concat(47);
        }
      }
    }
    if (!(v0) || typeof v0 !== 'object' || Array.isArray(v0)) {
      /* f14: type */
      return [48];
    }
    return 0;
  }
  function f15(v0) {
    var v3, v4, v5;
    if (Array.isArray(v0) && v0.length < 1) {
      /* f15: minItems */
      return [49];
    }
    if (!(Array.isArray(v0))) {
      /* f15: type */
      return [50];
    }
    if (Array.isArray(v0)) {
      v3 = {};
      v4 = 0;
      for (; v4 < v0.length; (v4)++) {
        v5 = JSON.stringify(v0[v4]);
        v3[v5] = true;
      }
      if (Object.keys(v3).length !== v0.length) {
        /* f15: uniqueItems */
        return [51];
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
      /* f16: anyOf */
      return [52];
    }
    return 0;
  }
  function f19(v0) {
    if (typeof v0 === 'number' && v0 < 0) {
      /* f19: minimum */
      return [53];
    }
    if (typeof v0 !== 'number' || v0 % 1 !== 0) {
      /* f19: type */
      return [54];
    }
    return 0;
  }
  function f20(v0) {
    var v1;
    v1 = f19(v0);
    if (v1 !== 0) {
      /* f20: allOf */
      return v1.concat(55);
    }
    v1 = f3(v0);
    if (v1 !== 0) {
      /* f20: allOf */
      return v1.concat(55);
    }
    return 0;
  }
  function f21(v0) {
    if (typeof v0 !== 'boolean') {
      /* f21: type */
      return [56];
    }
    return 0;
  }
  function f22(v0) {
    var v1, v4, v5, v6;
    if (Array.isArray(v0)) {
      v1 = 0;
      for (; v1 < v0.length; (v1)++) {
        if (f2(v0[v1]) !== 0) {
          /* f22: items */
          return [57];
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      /* f22: minItems */
      return [58];
    }
    if (!(Array.isArray(v0))) {
      /* f22: type */
      return [59];
    }
    if (Array.isArray(v0)) {
      v4 = {};
      v5 = 0;
      for (; v5 < v0.length; (v5)++) {
        v6 = JSON.stringify(v0[v5]);
        v4[v6] = true;
      }
      if (Object.keys(v4).length !== v0.length) {
        /* f22: uniqueItems */
        return [60];
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
      /* f23: anyOf */
      return [61];
    }
    return 0;
  }
  function f25(v0) {
    var v1, v4, v5, v6;
    if (Array.isArray(v0)) {
      v1 = 0;
      for (; v1 < v0.length; (v1)++) {
        if (f28(v0[v1]) !== 0) {
          /* f25: items */
          return [62];
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      /* f25: minItems */
      return [63];
    }
    if (!(Array.isArray(v0))) {
      /* f25: type */
      return [64];
    }
    if (Array.isArray(v0)) {
      v4 = {};
      v5 = 0;
      for (; v5 < v0.length; (v5)++) {
        v6 = JSON.stringify(v0[v5]);
        v4[v6] = true;
      }
      if (Object.keys(v4).length !== v0.length) {
        /* f25: uniqueItems */
        return [65];
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
          /* f26: items */
          return [66];
        }
      }
    }
    if (Array.isArray(v0) && v0.length < 1) {
      /* f26: minItems */
      return [67];
    }
    if (!(Array.isArray(v0))) {
      /* f26: type */
      return [68];
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
      /* f28: enum */
      return [69];
    }
    return 0;
  }
  return {
    JsonSchema: f0,
  };
}());
