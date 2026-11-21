/**
 * 墨韻活字工坊 - 金幣經濟與信用卡結帳串接模組 (payment.js)
 * 支援卡別自動辨識與檢核：
 * - VISA (4 開頭，16 碼)
 * - Mastercard (51–55 或 2221–2720 開頭，16 碼)
 * - JCB (3528–3589 開頭，16 碼)
 */

const PaymentManager = (() => {
  const TEST_CARDS = {
    visa: { number: "4532 0151 1283 0366", name: "WANG XIAO MING", exp: "09/29", cvv: "888" },
    mc:   { number: "5425 2334 3010 9903", name: "LIN YA TING",   exp: "11/28", cvv: "642" },
    jcb:  { number: "3530 1113 3330 0000", name: "CHEN JUN HONG", exp: "05/30", cvv: "358" }
  };

  // 可選：若您有串接第三方金流後端驗證 API（如綠界/藍新/TapPay），可填入此端點
  const PAYMENT_GATEWAY_ENDPOINT = null;

  function detectCardNetwork(rawNumber) {
    const digits = rawNumber.replace(/\D/g, "");
    if (!digits) return { network: "UNKNOWN", label: "VISA / MC / JCB", cssClass: "" };

    if (/^4/.test(digits)) {
      return { network: "VISA", label: "VISA", cssClass: "network-visa" };
    }

    const first2 = parseInt(digits.slice(0, 2), 10);
    const first4 = parseInt(digits.slice(0, 4), 10);
    if ((first2 >= 51 && first2 <= 55) || (digits.length >= 4 && first4 >= 2221 && first4 <= 2720)) {
      return { network: "MASTERCARD", label: "Mastercard", cssClass: "network-mc" };
    }

    if ((digits.length >= 4 && first4 >= 3528 && first4 <= 3589) || /^35/.test(digits)) {
      return { network: "JCB", label: "JCB", cssClass: "network-jcb" };
    }

    return { network: "UNSUPPORTED", label: "僅支援 VISA / MC / JCB", cssClass: "" };
  }

  function validateLuhn(rawNumber) {
    const digits = rawNumber.replace(/\D/g, "");
    if (digits.length < 15 || digits.length > 16) return false;
    let sum = 0;
    let doubleUp = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let d = parseInt(digits[i], 10);
      if (doubleUp) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      doubleUp = !doubleUp;
    }
    return sum % 10 === 0;
  }

  function validateExpiry(expStr) {
    const match = /^(\d{2})\/(\d{2})$/.exec(expStr.trim());
    if (!match) return false;
    const month = parseInt(match[1], 10);
    const year = 2000 + parseInt(match[2], 10);
    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
  }

  function formatCardNumber(value) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  }

  /**
   * 執行信用卡授權驗證、入帳並串接雲端存檔
   */
  async function processCardPayment({ cardNumber, cardName, expiry, cvv, coins, priceTWD, currentState }) {
    const info = detectCardNetwork(cardNumber);
    if (!["VISA", "MASTERCARD", "JCB"].includes(info.network)) {
      return { ok: false, message: "卡別不符：本商城僅接受 VISA、Mastercard 或 JCB 信用卡。" };
    }
    if (!validateLuhn(cardNumber)) {
      return { ok: false, message: "信用卡卡號檢核未通過，請確認 16 位數字是否正確。" };
    }
    if (!cardName || cardName.trim().length < 2) {
      return { ok: false, message: "請輸入持卡人英文姓名。" };
    }
    if (!validateExpiry(expiry)) {
      return { ok: false, message: "卡片有效期限格式錯誤或已過期（格式 MM/YY）。" };
    }
    if (!/^\d{3,4}$/.test(cvv.trim())) {
      return { ok: false, message: "請輸入 3 至 4 碼卡片背面安全碼 (CVV)。" };
    }

    const last4 = cardNumber.replace(/\D/g, "").slice(-4);
    const txId = "TX-" + Date.now() + "-" + Math.floor(100 + Math.random() * 900);

    // 若已串接真實金流閘道 API，發送授權請求
    if (PAYMENT_GATEWAY_ENDPOINT) {
      try {
        const gwRes = await fetch(PAYMENT_GATEWAY_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            txId,
            username: StorageManager.getActiveUsername() || "guest",
            amountTWD: priceTWD,
            coins,
            last4,
            network: info.label
          })
        });
        const gwData = await gwRes.json();
        if (!gwData.success) {
          return { ok: false, message: gwData.message || "發卡銀行拒絕授權交易。" };
        }
      } catch (err) {
        return { ok: false, message: "金流閘道連線異常，請稍後再試。" };
      }
    } else {
      // 模擬銀行授權延遲
      await new Promise((resolve) => setTimeout(resolve, 650));
    }

    const receipt = {
      txId,
      network: info.label,
      last4,
      coinsAdded: coins,
      amountTWD: priceTWD,
      paidAt: new Date().toISOString()
    };

    // 若傳入目前遊戲狀態，直接更新金幣並強制立即同步至雲端（GAS Users + Payments 工作表）
    if (currentState) {
      currentState.coins += coins;
      if (!Array.isArray(currentState.paymentHistory)) {
        currentState.paymentHistory = [];
      }
      currentState.paymentHistory.unshift(receipt);
      StorageManager.saveProgress(currentState, { immediate: true, receipt });
    }

    return {
      ok: true,
      receipt
    };
  }

  return {
    TEST_CARDS,
    detectCardNetwork,
    validateLuhn,
    validateExpiry,
    formatCardNumber,
    formatExpiry,
    processCardPayment
  };
})();
