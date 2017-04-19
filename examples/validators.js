export default (function() {
  function f0(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16, v17, v18, v19, v20, v21, v22, v23, v24, v25, v26, v27, v28, v29, v30, v31, v32, v33, v34, v35, v36, v37, v38;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.amount;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.amount_authorized;
      if (v2 !== undefined) {
        if (f1(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.amount_captured;
      if (v3 !== undefined) {
        if (f1(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.amount_refunded;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.application;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.application_fee;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.balance_transaction;
      if (v7 !== undefined) {
        if (f4(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.captured;
      if (v8 !== undefined) {
        if (f7(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.card;
      if (v9 !== undefined) {
        if (f53(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.created;
      if (v10 !== undefined) {
        if (f1(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.currency;
      if (v11 !== undefined) {
        if (f4(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.customer;
      if (v12 !== undefined) {
        if (f4(v12) !== null) {
          return "error";
        }
      }
      v13 = v0.description;
      if (v13 !== undefined) {
        if (f4(v13) !== null) {
          return "error";
        }
      }
      v14 = v0.destination;
      if (v14 !== undefined) {
        if (f4(v14) !== null) {
          return "error";
        }
      }
      v15 = v0.dispute;
      if (v15 !== undefined) {
        if (f4(v15) !== null) {
          return "error";
        }
      }
      v16 = v0.failure_code;
      if (v16 !== undefined) {
        if (f4(v16) !== null) {
          return "error";
        }
      }
      v17 = v0.failure_message;
      if (v17 !== undefined) {
        if (f4(v17) !== null) {
          return "error";
        }
      }
      v18 = v0.fraud_details;
      if (v18 !== undefined) {
        if (f17(v18) !== null) {
          return "error";
        }
      }
      v19 = v0.id;
      if (v19 !== undefined) {
        if (f4(v19) !== null) {
          return "error";
        }
      }
      v20 = v0.invoice;
      if (v20 !== undefined) {
        if (f4(v20) !== null) {
          return "error";
        }
      }
      v21 = v0.livemode;
      if (v21 !== undefined) {
        if (f7(v21) !== null) {
          return "error";
        }
      }
      v22 = v0.metadata;
      if (v22 !== undefined) {
        if (f17(v22) !== null) {
          return "error";
        }
      }
      v23 = v0.object;
      if (v23 !== undefined) {
        if (f4(v23) !== null) {
          return "error";
        }
      }
      v24 = v0.on_behalf_of;
      if (v24 !== undefined) {
        if (f4(v24) !== null) {
          return "error";
        }
      }
      v25 = v0.order;
      if (v25 !== undefined) {
        if (f4(v25) !== null) {
          return "error";
        }
      }
      v26 = v0.outcome;
      if (v26 !== undefined) {
        if (f54(v26) !== null) {
          return "error";
        }
      }
      v27 = v0.paid;
      if (v27 !== undefined) {
        if (f7(v27) !== null) {
          return "error";
        }
      }
      v28 = v0.receipt_email;
      if (v28 !== undefined) {
        if (f4(v28) !== null) {
          return "error";
        }
      }
      v29 = v0.receipt_number;
      if (v29 !== undefined) {
        if (f4(v29) !== null) {
          return "error";
        }
      }
      v30 = v0.refunded;
      if (v30 !== undefined) {
        if (f7(v30) !== null) {
          return "error";
        }
      }
      v31 = v0.refunds;
      if (v31 !== undefined) {
        if (f30(v31) !== null) {
          return "error";
        }
      }
      v32 = v0.review;
      if (v32 !== undefined) {
        if (f4(v32) !== null) {
          return "error";
        }
      }
      v33 = v0.shipping;
      if (v33 !== undefined) {
        if (f60(v33) !== null) {
          return "error";
        }
      }
      v34 = v0.source_transfer;
      if (v34 !== undefined) {
        if (f4(v34) !== null) {
          return "error";
        }
      }
      v35 = v0.statement_descriptor;
      if (v35 !== undefined) {
        if (f4(v35) !== null) {
          return "error";
        }
      }
      v36 = v0.status;
      if (v36 !== undefined) {
        if (f4(v36) !== null) {
          return "error";
        }
      }
      v37 = v0.transfer;
      if (v37 !== undefined) {
        if (f4(v37) !== null) {
          return "error";
        }
      }
      v38 = v0.transfer_group;
      if (v38 !== undefined) {
        if (f4(v38) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.amount === undefined) {
        return "error";
      }
      if (v0.amount_captured === undefined) {
        return "error";
      }
      if (v0.amount_refunded === undefined) {
        return "error";
      }
      if (v0.captured === undefined) {
        return "error";
      }
      if (v0.created === undefined) {
        return "error";
      }
      if (v0.currency === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.livemode === undefined) {
        return "error";
      }
      if (v0.metadata === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.paid === undefined) {
        return "error";
      }
      if (v0.refunded === undefined) {
        return "error";
      }
      if (v0.refunds === undefined) {
        return "error";
      }
      if (v0.status === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f38(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16, v17, v18, v19, v20, v21;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.account_balance;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.alipay_accounts;
      if (v2 !== undefined) {
        if (f40(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.bank_accounts;
      if (v3 !== undefined) {
        if (f41(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.business_vat_id;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.cards;
      if (v5 !== undefined) {
        if (f43(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.created;
      if (v6 !== undefined) {
        if (f1(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.currency;
      if (v7 !== undefined) {
        if (f4(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.default_bank_account;
      if (v8 !== undefined) {
        if (f4(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.default_card;
      if (v9 !== undefined) {
        if (f4(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.default_source;
      if (v10 !== undefined) {
        if (f4(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.delinquent;
      if (v11 !== undefined) {
        if (f7(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.description;
      if (v12 !== undefined) {
        if (f4(v12) !== null) {
          return "error";
        }
      }
      v13 = v0.discount;
      if (v13 !== undefined) {
        if (f64(v13) !== null) {
          return "error";
        }
      }
      v14 = v0.email;
      if (v14 !== undefined) {
        if (f4(v14) !== null) {
          return "error";
        }
      }
      v15 = v0.id;
      if (v15 !== undefined) {
        if (f4(v15) !== null) {
          return "error";
        }
      }
      v16 = v0.livemode;
      if (v16 !== undefined) {
        if (f7(v16) !== null) {
          return "error";
        }
      }
      v17 = v0.metadata;
      if (v17 !== undefined) {
        if (f17(v17) !== null) {
          return "error";
        }
      }
      v18 = v0.object;
      if (v18 !== undefined) {
        if (f4(v18) !== null) {
          return "error";
        }
      }
      v19 = v0.shipping;
      if (v19 !== undefined) {
        if (f65(v19) !== null) {
          return "error";
        }
      }
      v20 = v0.sources;
      if (v20 !== undefined) {
        if (f51(v20) !== null) {
          return "error";
        }
      }
      v21 = v0.subscriptions;
      if (v21 !== undefined) {
        if (f52(v21) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.account_balance === undefined) {
        return "error";
      }
      if (v0.cards === undefined) {
        return "error";
      }
      if (v0.created === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.livemode === undefined) {
        return "error";
      }
      if (v0.metadata === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.sources === undefined) {
        return "error";
      }
      if (v0.subscriptions === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f1(v0) {
    if (!(typeof v0 === 'number' && v0 % 1 === 0)) {
      return "error";
    }
    return null;
  }
  function f4(v0) {
    if (!(typeof v0 === 'string')) {
      return "error";
    }
    return null;
  }
  function f7(v0) {
    if (!(typeof v0 === 'boolean')) {
      return "error";
    }
    return null;
  }
  function f17(v0) {
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f30(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.data;
      if (v1 !== undefined) {
        if (f55(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.has_more;
      if (v2 !== undefined) {
        if (f7(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.object;
      if (v3 !== undefined) {
        if (f57(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.total_count;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.url;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.data === undefined) {
        return "error";
      }
      if (v0.has_more === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.url === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f40(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.data;
      if (v1 !== undefined) {
        if (f61(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.has_more;
      if (v2 !== undefined) {
        if (f7(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.object;
      if (v3 !== undefined) {
        if (f57(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.total_count;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.url;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.data === undefined) {
        return "error";
      }
      if (v0.has_more === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.url === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f41(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.data;
      if (v1 !== undefined) {
        if (f62(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.has_more;
      if (v2 !== undefined) {
        if (f7(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.object;
      if (v3 !== undefined) {
        if (f57(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.total_count;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.url;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.data === undefined) {
        return "error";
      }
      if (v0.has_more === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.url === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f43(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.data;
      if (v1 !== undefined) {
        if (f63(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.has_more;
      if (v2 !== undefined) {
        if (f7(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.object;
      if (v3 !== undefined) {
        if (f57(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.total_count;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.url;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.data === undefined) {
        return "error";
      }
      if (v0.has_more === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.url === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f51(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.data;
      if (v1 !== undefined) {
        if (f66(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.has_more;
      if (v2 !== undefined) {
        if (f7(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.object;
      if (v3 !== undefined) {
        if (f57(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.total_count;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.url;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.data === undefined) {
        return "error";
      }
      if (v0.has_more === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.url === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f52(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.data;
      if (v1 !== undefined) {
        if (f67(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.has_more;
      if (v2 !== undefined) {
        if (f7(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.object;
      if (v3 !== undefined) {
        if (f57(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.total_count;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.url;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.data === undefined) {
        return "error";
      }
      if (v0.has_more === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.url === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f53(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16, v17, v18, v19, v20, v21, v22, v23, v24, v25, v26, v27, v28, v29, v30, v31;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.account;
      if (v1 !== undefined) {
        if (f4(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.address_city;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.address_country;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.address_line1;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.address_line1_check;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.address_line2;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.address_state;
      if (v7 !== undefined) {
        if (f4(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.address_zip;
      if (v8 !== undefined) {
        if (f4(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.address_zip_check;
      if (v9 !== undefined) {
        if (f4(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.available_payout_methods;
      if (v10 !== undefined) {
        if (f77(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.brand;
      if (v11 !== undefined) {
        if (f4(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.country;
      if (v12 !== undefined) {
        if (f4(v12) !== null) {
          return "error";
        }
      }
      v13 = v0.currency;
      if (v13 !== undefined) {
        if (f4(v13) !== null) {
          return "error";
        }
      }
      v14 = v0.customer;
      if (v14 !== undefined) {
        if (f4(v14) !== null) {
          return "error";
        }
      }
      v15 = v0.cvc_check;
      if (v15 !== undefined) {
        if (f4(v15) !== null) {
          return "error";
        }
      }
      v16 = v0.default_for_currency;
      if (v16 !== undefined) {
        if (f7(v16) !== null) {
          return "error";
        }
      }
      v17 = v0.dynamic_last4;
      if (v17 !== undefined) {
        if (f4(v17) !== null) {
          return "error";
        }
      }
      v18 = v0.estimated_availability;
      if (v18 !== undefined) {
        if (f4(v18) !== null) {
          return "error";
        }
      }
      v19 = v0.exp_month;
      if (v19 !== undefined) {
        if (f1(v19) !== null) {
          return "error";
        }
      }
      v20 = v0.exp_year;
      if (v20 !== undefined) {
        if (f1(v20) !== null) {
          return "error";
        }
      }
      v21 = v0.fingerprint;
      if (v21 !== undefined) {
        if (f4(v21) !== null) {
          return "error";
        }
      }
      v22 = v0.funding;
      if (v22 !== undefined) {
        if (f4(v22) !== null) {
          return "error";
        }
      }
      v23 = v0.google_reference;
      if (v23 !== undefined) {
        if (f4(v23) !== null) {
          return "error";
        }
      }
      v24 = v0.id;
      if (v24 !== undefined) {
        if (f4(v24) !== null) {
          return "error";
        }
      }
      v25 = v0.last4;
      if (v25 !== undefined) {
        if (f4(v25) !== null) {
          return "error";
        }
      }
      v26 = v0.metadata;
      if (v26 !== undefined) {
        if (f17(v26) !== null) {
          return "error";
        }
      }
      v27 = v0.name;
      if (v27 !== undefined) {
        if (f4(v27) !== null) {
          return "error";
        }
      }
      v28 = v0.object;
      if (v28 !== undefined) {
        if (f4(v28) !== null) {
          return "error";
        }
      }
      v29 = v0.recipient;
      if (v29 !== undefined) {
        if (f4(v29) !== null) {
          return "error";
        }
      }
      v30 = v0.three_d_secure;
      if (v30 !== undefined) {
        if (f17(v30) !== null) {
          return "error";
        }
      }
      v31 = v0.tokenization_method;
      if (v31 !== undefined) {
        if (f4(v31) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.brand === undefined) {
        return "error";
      }
      if (v0.exp_month === undefined) {
        return "error";
      }
      if (v0.exp_year === undefined) {
        return "error";
      }
      if (v0.funding === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.last4 === undefined) {
        return "error";
      }
      if (v0.metadata === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f54(v0) {
    var v1, v2, v3, v4, v5, v6;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.network_status;
      if (v1 !== undefined) {
        if (f4(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.reason;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.risk_level;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.rule;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.seller_message;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.type;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.type === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f55(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f116(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f57(v0) {
    var v1;
    v1 = 0;
    if (v0 === "list") {
      v1++
    }
    if (v1 === 0) {
      return "error";
    }
    if (!(typeof v0 === 'string')) {
      return "error";
    }
    return null;
  }
  function f60(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.address;
      if (v1 !== undefined) {
        if (f117(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.carrier;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.name;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.phone;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.tracking_number;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.address === undefined) {
        return "error";
      }
      if (v0.name === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f61(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f118(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f62(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f119(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f63(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f53(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f64(v0) {
    var v1, v2, v3, v4, v5, v6;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.coupon;
      if (v1 !== undefined) {
        if (f120(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.customer;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.end;
      if (v3 !== undefined) {
        if (f1(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.object;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.start;
      if (v5 !== undefined) {
        if (f1(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.subscription;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.coupon === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.start === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f65(v0) {
    var v1, v2, v3;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.address;
      if (v1 !== undefined) {
        if (f117(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.name;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.phone;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.address === undefined) {
        return "error";
      }
      if (v0.name === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f66(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f17(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f67(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f121(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f77(v0) {
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f116(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.amount;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.balance_transaction;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.charge;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.created;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.currency;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.description;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.id;
      if (v7 !== undefined) {
        if (f4(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.metadata;
      if (v8 !== undefined) {
        if (f17(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.object;
      if (v9 !== undefined) {
        if (f4(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.reason;
      if (v10 !== undefined) {
        if (f4(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.receipt_number;
      if (v11 !== undefined) {
        if (f4(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.status;
      if (v12 !== undefined) {
        if (f4(v12) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.amount === undefined) {
        return "error";
      }
      if (v0.created === undefined) {
        return "error";
      }
      if (v0.currency === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.metadata === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f117(v0) {
    var v1, v2, v3, v4, v5, v6;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.city;
      if (v1 !== undefined) {
        if (f4(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.country;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.line1;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.line2;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.postal_code;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.state;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f118(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.created;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.customer;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.fingerprint;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.id;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.livemode;
      if (v5 !== undefined) {
        if (f7(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.metadata;
      if (v6 !== undefined) {
        if (f17(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.object;
      if (v7 !== undefined) {
        if (f4(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.payment_amount;
      if (v8 !== undefined) {
        if (f1(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.payment_currency;
      if (v9 !== undefined) {
        if (f4(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.reusable;
      if (v10 !== undefined) {
        if (f7(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.used;
      if (v11 !== undefined) {
        if (f7(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.username;
      if (v12 !== undefined) {
        if (f4(v12) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.created === undefined) {
        return "error";
      }
      if (v0.fingerprint === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.livemode === undefined) {
        return "error";
      }
      if (v0.metadata === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.reusable === undefined) {
        return "error";
      }
      if (v0.used === undefined) {
        return "error";
      }
      if (v0.username === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f119(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16, v17, v18, v19, v20, v21, v22, v23, v24;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.account;
      if (v1 !== undefined) {
        if (f4(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.account_holder_name;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.account_holder_type;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.address_city;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.address_line1;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.address_line2;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.address_state;
      if (v7 !== undefined) {
        if (f4(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.address_zip;
      if (v8 !== undefined) {
        if (f4(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.allows_debits;
      if (v9 !== undefined) {
        if (f7(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.bank_name;
      if (v10 !== undefined) {
        if (f4(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.country;
      if (v11 !== undefined) {
        if (f4(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.currency;
      if (v12 !== undefined) {
        if (f4(v12) !== null) {
          return "error";
        }
      }
      v13 = v0.customer;
      if (v13 !== undefined) {
        if (f4(v13) !== null) {
          return "error";
        }
      }
      v14 = v0.customer_reference;
      if (v14 !== undefined) {
        if (f4(v14) !== null) {
          return "error";
        }
      }
      v15 = v0.default_for_currency;
      if (v15 !== undefined) {
        if (f7(v15) !== null) {
          return "error";
        }
      }
      v16 = v0.fingerprint;
      if (v16 !== undefined) {
        if (f4(v16) !== null) {
          return "error";
        }
      }
      v17 = v0.id;
      if (v17 !== undefined) {
        if (f4(v17) !== null) {
          return "error";
        }
      }
      v18 = v0.last4;
      if (v18 !== undefined) {
        if (f4(v18) !== null) {
          return "error";
        }
      }
      v19 = v0.metadata;
      if (v19 !== undefined) {
        if (f17(v19) !== null) {
          return "error";
        }
      }
      v20 = v0.object;
      if (v20 !== undefined) {
        if (f4(v20) !== null) {
          return "error";
        }
      }
      v21 = v0.reusable;
      if (v21 !== undefined) {
        if (f7(v21) !== null) {
          return "error";
        }
      }
      v22 = v0.routing_number;
      if (v22 !== undefined) {
        if (f4(v22) !== null) {
          return "error";
        }
      }
      v23 = v0.status;
      if (v23 !== undefined) {
        if (f4(v23) !== null) {
          return "error";
        }
      }
      v24 = v0.used;
      if (v24 !== undefined) {
        if (f7(v24) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.country === undefined) {
        return "error";
      }
      if (v0.currency === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.last4 === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.status === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f120(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.amount_off;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.created;
      if (v2 !== undefined) {
        if (f1(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.currency;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.duration;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.duration_in_months;
      if (v5 !== undefined) {
        if (f1(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.id;
      if (v6 !== undefined) {
        if (f4(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.livemode;
      if (v7 !== undefined) {
        if (f7(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.max_redemptions;
      if (v8 !== undefined) {
        if (f1(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.metadata;
      if (v9 !== undefined) {
        if (f17(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.object;
      if (v10 !== undefined) {
        if (f4(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.percent_off;
      if (v11 !== undefined) {
        if (f1(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.redeem_by;
      if (v12 !== undefined) {
        if (f1(v12) !== null) {
          return "error";
        }
      }
      v13 = v0.times_redeemed;
      if (v13 !== undefined) {
        if (f1(v13) !== null) {
          return "error";
        }
      }
      v14 = v0.valid;
      if (v14 !== undefined) {
        if (f7(v14) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.created === undefined) {
        return "error";
      }
      if (v0.duration === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.livemode === undefined) {
        return "error";
      }
      if (v0.metadata === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.times_redeemed === undefined) {
        return "error";
      }
      if (v0.valid === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f121(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16, v17, v18, v19, v20, v21, v22, v23, v24, v25, v26, v27;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.account_balance;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.application_fee_percent;
      if (v2 !== undefined) {
        if (f154(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.billing;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.cancel_at_period_end;
      if (v4 !== undefined) {
        if (f7(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.canceled_at;
      if (v5 !== undefined) {
        if (f1(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.created;
      if (v6 !== undefined) {
        if (f1(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.current_period_end;
      if (v7 !== undefined) {
        if (f1(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.current_period_start;
      if (v8 !== undefined) {
        if (f1(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.customer;
      if (v9 !== undefined) {
        if (f4(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.days_until_due;
      if (v10 !== undefined) {
        if (f1(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.discount;
      if (v11 !== undefined) {
        if (f64(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.ended_at;
      if (v12 !== undefined) {
        if (f1(v12) !== null) {
          return "error";
        }
      }
      v13 = v0.id;
      if (v13 !== undefined) {
        if (f4(v13) !== null) {
          return "error";
        }
      }
      v14 = v0.items;
      if (v14 !== undefined) {
        if (f163(v14) !== null) {
          return "error";
        }
      }
      v15 = v0.livemode;
      if (v15 !== undefined) {
        if (f7(v15) !== null) {
          return "error";
        }
      }
      v16 = v0.max_occurrences;
      if (v16 !== undefined) {
        if (f1(v16) !== null) {
          return "error";
        }
      }
      v17 = v0.metadata;
      if (v17 !== undefined) {
        if (f17(v17) !== null) {
          return "error";
        }
      }
      v18 = v0.object;
      if (v18 !== undefined) {
        if (f4(v18) !== null) {
          return "error";
        }
      }
      v19 = v0.on_behalf_of;
      if (v19 !== undefined) {
        if (f4(v19) !== null) {
          return "error";
        }
      }
      v20 = v0.plan;
      if (v20 !== undefined) {
        if (f173(v20) !== null) {
          return "error";
        }
      }
      v21 = v0.quantity;
      if (v21 !== undefined) {
        if (f1(v21) !== null) {
          return "error";
        }
      }
      v22 = v0.retains_own_balance;
      if (v22 !== undefined) {
        if (f7(v22) !== null) {
          return "error";
        }
      }
      v23 = v0.start;
      if (v23 !== undefined) {
        if (f1(v23) !== null) {
          return "error";
        }
      }
      v24 = v0.status;
      if (v24 !== undefined) {
        if (f4(v24) !== null) {
          return "error";
        }
      }
      v25 = v0.tax_percent;
      if (v25 !== undefined) {
        if (f154(v25) !== null) {
          return "error";
        }
      }
      v26 = v0.trial_end;
      if (v26 !== undefined) {
        if (f1(v26) !== null) {
          return "error";
        }
      }
      v27 = v0.trial_start;
      if (v27 !== undefined) {
        if (f1(v27) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.cancel_at_period_end === undefined) {
        return "error";
      }
      if (v0.created === undefined) {
        return "error";
      }
      if (v0.customer === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.livemode === undefined) {
        return "error";
      }
      if (v0.metadata === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.start === undefined) {
        return "error";
      }
      if (v0.status === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f154(v0) {
    if (!(typeof v0 === 'number')) {
      return "error";
    }
    return null;
  }
  function f163(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.data;
      if (v1 !== undefined) {
        if (f172(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.has_more;
      if (v2 !== undefined) {
        if (f7(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.object;
      if (v3 !== undefined) {
        if (f57(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.total_count;
      if (v4 !== undefined) {
        if (f1(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.url;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.data === undefined) {
        return "error";
      }
      if (v0.has_more === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.url === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f172(v0) {
    var v1, v2;
    if (Array.isArray(v0)) {
      v1 = 0;
      v2 = null;
      for (; v1 < v0.length; v1++) {
        v2 = f181(v0[v1]);
        if (v2 !== null) {
          return v2;
        }
      }
    }
    if (!(Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f173(v0) {
    var v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.amount;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.created;
      if (v2 !== undefined) {
        if (f1(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.currency;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.id;
      if (v4 !== undefined) {
        if (f4(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.interval;
      if (v5 !== undefined) {
        if (f4(v5) !== null) {
          return "error";
        }
      }
      v6 = v0.interval_count;
      if (v6 !== undefined) {
        if (f1(v6) !== null) {
          return "error";
        }
      }
      v7 = v0.livemode;
      if (v7 !== undefined) {
        if (f7(v7) !== null) {
          return "error";
        }
      }
      v8 = v0.metadata;
      if (v8 !== undefined) {
        if (f17(v8) !== null) {
          return "error";
        }
      }
      v9 = v0.name;
      if (v9 !== undefined) {
        if (f4(v9) !== null) {
          return "error";
        }
      }
      v10 = v0.object;
      if (v10 !== undefined) {
        if (f4(v10) !== null) {
          return "error";
        }
      }
      v11 = v0.statement_descriptor;
      if (v11 !== undefined) {
        if (f4(v11) !== null) {
          return "error";
        }
      }
      v12 = v0.trial_period_days;
      if (v12 !== undefined) {
        if (f1(v12) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.amount === undefined) {
        return "error";
      }
      if (v0.created === undefined) {
        return "error";
      }
      if (v0.currency === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.interval === undefined) {
        return "error";
      }
      if (v0.interval_count === undefined) {
        return "error";
      }
      if (v0.livemode === undefined) {
        return "error";
      }
      if (v0.metadata === undefined) {
        return "error";
      }
      if (v0.name === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  function f181(v0) {
    var v1, v2, v3, v4, v5;
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      v1 = v0.created;
      if (v1 !== undefined) {
        if (f1(v1) !== null) {
          return "error";
        }
      }
      v2 = v0.id;
      if (v2 !== undefined) {
        if (f4(v2) !== null) {
          return "error";
        }
      }
      v3 = v0.object;
      if (v3 !== undefined) {
        if (f4(v3) !== null) {
          return "error";
        }
      }
      v4 = v0.plan;
      if (v4 !== undefined) {
        if (f173(v4) !== null) {
          return "error";
        }
      }
      v5 = v0.quantity;
      if (v5 !== undefined) {
        if (f1(v5) !== null) {
          return "error";
        }
      }
    }
    if (v0 && typeof v0 === 'object' && !Array.isArray(v0)) {
      if (v0.created === undefined) {
        return "error";
      }
      if (v0.id === undefined) {
        return "error";
      }
      if (v0.object === undefined) {
        return "error";
      }
      if (v0.plan === undefined) {
        return "error";
      }
      if (v0.quantity === undefined) {
        return "error";
      }
    }
    if (!(v0 && typeof v0 === 'object' && !Array.isArray(v0))) {
      return "error";
    }
    return null;
  }
  return {
    Charge: f0,
    Customer: f38,
  };
})();