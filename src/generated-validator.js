// @noflow
/* eslint-disable */
export default (function() {
  function f0(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16, v17, v18, v19, v20, v21, v22, v23, v24, v25, v26, v27, v28, v29, v30, v31, v32;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.exclusiveMaximum !== undefined) {
        if (v0.maximum === undefined) {
          return "error";
        }
      }
      if (v0.exclusiveMinimum !== undefined) {
        if (v0.minimum === undefined) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.id;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.$schema;
      if (v2 !== undefined) {
        if (f1(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.title;
      if (v3 !== undefined) {
        if (f1(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.description;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.default;
      if (v5 !== undefined) {
        if (f3(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.multipleOf;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.maximum;
      if (v7 !== undefined) {
        if (f5(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.exclusiveMaximum;
      if (v8 !== undefined) {
        if (f6(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.minimum;
      if (v9 !== undefined) {
        if (f5(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.exclusiveMinimum;
      if (v10 !== undefined) {
        if (f6(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.maxLength;
      if (v11 !== undefined) {
        if (f19(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.minLength;
      if (v12 !== undefined) {
        if (f20(v12) !== null) {
          return "error";
        }
      }
      v13 = v0.pattern;
      if (v13 !== undefined) {
        if (f1(v13) !== null) {
          return "error";
        }
      }
      v14 = v0.additionalItems;
      if (v14 !== undefined) {
        if (f10(v14) !== null) {
          return "error";
        }
      }
      v15 = v0.items;
      if (v15 !== undefined) {
        if (f11(v15) !== null) {
          return "error";
        }
      }
      v16 = v0.maxItems;
      if (v16 !== undefined) {
        if (f19(v16) !== null) {
          return "error";
        }
      }
      v17 = v0.minItems;
      if (v17 !== undefined) {
        if (f20(v17) !== null) {
          return "error";
        }
      }
      v18 = v0.uniqueItems;
      if (v18 !== undefined) {
        if (f6(v18) !== null) {
          return "error";
        }
      }
      v19 = v0.maxProperties;
      if (v19 !== undefined) {
        if (f19(v19) !== null) {
          return "error";
        }
      }
      v20 = v0.minProperties;
      if (v20 !== undefined) {
        if (f20(v20) !== null) {
          return "error";
        }
      }
      v21 = v0.required;
      if (v21 !== undefined) {
        if (f22(v21) !== null) {
          return "error";
        }
      }
      v22 = v0.additionalProperties;
      if (v22 !== undefined) {
        if (f10(v22) !== null) {
          return "error";
        }
      }
      v23 = v0.definitions;
      if (v23 !== undefined) {
        if (f13(v23) !== null) {
          return "error";
        }
      }
      v24 = v0.properties;
      if (v24 !== undefined) {
        if (f13(v24) !== null) {
          return "error";
        }
      }
      v25 = v0.patternProperties;
      if (v25 !== undefined) {
        if (f13(v25) !== null) {
          return "error";
        }
      }
      v26 = v0.dependencies;
      if (v26 !== undefined) {
        if (f14(v26) !== null) {
          return "error";
        }
      }
      v27 = v0.enum;
      if (v27 !== undefined) {
        if (f15(v27) !== null) {
          return "error";
        }
      }
      v28 = v0.type;
      if (v28 !== undefined) {
        if (f16(v28) !== null) {
          return "error";
        }
      }
      v29 = v0.allOf;
      if (v29 !== undefined) {
        if (f26(v29) !== null) {
          return "error";
        }
      }
      v30 = v0.anyOf;
      if (v30 !== undefined) {
        if (f26(v30) !== null) {
          return "error";
        }
      }
      v31 = v0.oneOf;
      if (v31 !== undefined) {
        if (f26(v31) !== null) {
          return "error";
        }
      }
      v32 = v0.not;
      if (v32 !== undefined) {
        if (f0(v32) !== null) {
          return "error";
        }
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f1(v0) {
    if (!(typeof v0 === 'string')) {
      return "error";
    }
    return null;
  }
  function f3(v0) {
    return null;
  }
  function f4(v0) {
    if (typeof v0 === 'number') {
      if (v0 <= 0) {
        return "error";
      }
    }
    if (!(typeof v0 === 'number')) {
      return "error";
    }
    return null;
  }
  function f5(v0) {
    if (!(typeof v0 === 'number')) {
      return "error";
    }
    return null;
  }
  function f6(v0) {
    if (!(typeof v0 === 'boolean')) {
      return "error";
    }
    return null;
  }
  function f10(v0) {
    var v1;
    v1 = 0;
    f6(v0) ===     null &&     v1++
    f0(v0) ===     null &&     v1++
    if (v1 === 0) {
      return "error";
    }
    return null;
  }
  function f11(v0) {
    var v1;
    v1 = 0;
    f0(v0) ===     null &&     v1++
    f26(v0) ===     null &&     v1++
    if (v1 === 0) {
      return "error";
    }
    return null;
  }
  function f13(v0) {
    var v1, v2;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      for (var v1 in v0) {
        v2 = v0[v1];
        if (f0(v2) !== null) {
          return "error";
        }
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f14(v0) {
    var v1, v2;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      for (var v1 in v0) {
        v2 = v0[v1];
        if (f23(v2) !== null) {
          return "error";
        }
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f15(v0) {
    var v1, v2, v3;
    if (Array.isArray(v0)) {
      if (v0.length < 1) {
        return "error";
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    if (Array.isArray(v0)) {
      v1 = {};
      v2 = 0;
      for (; v2 < v0.length; v2++) {
        v3 = JSON.stringify(v0[v2]);
        v1[v3] = true;
      }
      if (Object.keys(v1).length !== v0.length) {
        return "error";
      }
    }
    return null;
  }
  function f16(v0) {
    var v1;
    v1 = 0;
    f28(v0) ===     null &&     v1++
    f25(v0) ===     null &&     v1++
    if (v1 === 0) {
      return "error";
    }
    return null;
  }
  function f19(v0) {
    if (typeof v0 === 'number') {
      if (v0 < 0) {
        return "error";
      }
    }
    if (!(typeof v0 === 'number' && v0 % 1 === 0)) {
      return "error";
    }
    return null;
  }
  function f20(v0) {
    var v1, v2;
    v1 = f19(v0);
    if (v1 !== null) {
      return "error";
    }
    v2 = f3(v0);
    if (v2 !== null) {
      return "error";
    }
    return null;
  }
  function f22(v0) {
    var v1, v2, v3, v4, v5;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f1(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (Array.isArray(v0)) {
      if (v0.length < 1) {
        return "error";
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    if (Array.isArray(v0)) {
      v3 = {};
      v4 = 0;
      for (; v4 < v0.length; v4++) {
        v5 = JSON.stringify(v0[v4]);
        v3[v5] = true;
      }
      if (Object.keys(v3).length !== v0.length) {
        return "error";
      }
    }
    return null;
  }
  function f23(v0) {
    var v1;
    v1 = 0;
    f0(v0) ===     null &&     v1++
    f22(v0) ===     null &&     v1++
    if (v1 === 0) {
      return "error";
    }
    return null;
  }
  function f25(v0) {
    var v1, v2, v3, v4, v5;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f28(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (Array.isArray(v0)) {
      if (v0.length < 1) {
        return "error";
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    if (Array.isArray(v0)) {
      v3 = {};
      v4 = 0;
      for (; v4 < v0.length; v4++) {
        v5 = JSON.stringify(v0[v4]);
        v3[v5] = true;
      }
      if (Object.keys(v3).length !== v0.length) {
        return "error";
      }
    }
    return null;
  }
  function f26(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f0(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (Array.isArray(v0)) {
      if (v0.length < 1) {
        return "error";
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f28(v0) {
    var v1;
    v1 = 0;
    if (v0 === "array") {
      v1++
    }
    if (v0 === "boolean") {
      v1++
    }
    if (v0 === "integer") {
      v1++
    }
    if (v0 === "null") {
      v1++
    }
    if (v0 === "number") {
      v1++
    }
    if (v0 === "object") {
      v1++
    }
    if (v0 === "string") {
      v1++
    }
    if (v1 === 0) {
      return "error";
    }
    return null;
  }
  return {
    JsonSchema: f0,
  };
})();
