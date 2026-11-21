/**
 * 墨韻活字工坊 - 跨裝置雲端同步與本機雙層暫存引擎 (storage.js)
 */

const GAS_API_URL = "貼上你的_WEB_APP_URL"; // <--- 請貼上部署後的 GAS Web App URL

const StorageManager = (() => {
  const KEYS = {
    DEVICE_CACHE: "moyun_device_cache_v1",
    ACCOUNTS_DB: "moyun_accounts_db_v1",
    ACTIVE_USER: "cloud_user",
    ACTIVE_HASH: "cloud_hash"
  };

  let syncTimer = null;
  let onSyncStatusChangeCallback = null;

  function setSyncStatusListener(cb) {
    onSyncStatusChangeCallback = cb;
  }

  function notifySyncStatus(status, text) {
    if (typeof onSyncStatusChangeCallback === "function") {
      onSyncStatusChangeCallback(status, text); // status: 'local' | 'syncing' | 'synced' | 'error'
    }
  }

  // 將密碼轉為 SHA-256 雜湊值（含非 HTTPS 環境降級保護）
  async function hashPassword(password) {
    const clean = password.trim();
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(clean);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    // 備援簡易雜湊（僅供非安全連線本機測試）
    let h = 0;
    for (let i = 0; i < clean.length; i++) {
      h = (Math.imul(31, h) + clean.charCodeAt(i)) | 0;
    }
    return "fallback_" + Math.abs(h).toString(16);
  }

  function isCloudConfigured() {
    return GAS_API_URL && GAS_API_URL.startsWith("https://");
  }

  // 發送請求給 GAS（不加 application/json header，避開 CORS preflight）
  async function callGAS(payload) {
    if (!isCloudConfigured()) {
      return { success: false, offline: true, message: "尚未設定 GAS_API_URL，目前僅使用本機暫存" };
    }
    const response = await fetch(GAS_API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return await response.json();
  }

  function createDefaultProgress() {
    return {
      maxStageUnlocked: 1,
      activeStage: 1,
      openedChests: [],
      unlockedChars: [],
      coins: 120,
      purchasedHints: {},
      paymentHistory: [],
      updatedAt: new Date().toISOString()
    };
  }

  function getAccountsDB() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.ACCOUNTS_DB)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveAccountsDB(db) {
    localStorage.setItem(KEYS.ACCOUNTS_DB, JSON.stringify(db));
  }

  function getActiveUsername() {
    return localStorage.getItem(KEYS.ACTIVE_USER) || null;
  }

  function isCloudLoggedIn() {
    return Boolean(localStorage.getItem(KEYS.ACTIVE_USER) && localStorage.getItem(KEYS.ACTIVE_HASH));
  }

  function loadProgress() {
    const activeUser = getActiveUsername();
    if (activeUser) {
      const db = getAccountsDB();
      if (db[activeUser] && db[activeUser].progress) {
        return { ...createDefaultProgress(), ...db[activeUser].progress };
      }
    }
    try {
      const cached = JSON.parse(localStorage.getItem(KEYS.DEVICE_CACHE));
      if (cached) {
        return { ...createDefaultProgress(), ...cached };
      }
    } catch (e) {
      console.warn("讀取裝置暫存失敗，建立新存檔", e);
    }
    return createDefaultProgress();
  }

  // 啟動時自動從雲端拉取最新進度（實現跨裝置無縫接軌）
  async function syncFromCloudOnBoot() {
    const username = localStorage.getItem(KEYS.ACTIVE_USER);
    const passwordHash = localStorage.getItem(KEYS.ACTIVE_HASH);
    if (!username || !passwordHash || !isCloudConfigured()) {
      return null;
    }

    notifySyncStatus("syncing", "雲端同步中...");
    try {
      const res = await callGAS({
        action: "login",
        username,
        passwordHash
      });
      if (res.success && res.userData) {
        const merged = { ...createDefaultProgress(), ...res.userData };
        const db = getAccountsDB();
        db[username] = { hash: passwordHash, progress: merged };
        saveAccountsDB(db);
        localStorage.setItem(KEYS.DEVICE_CACHE, JSON.stringify(merged));
        notifySyncStatus("synced", "雲端已同步");
        return merged;
      } else {
        notifySyncStatus("error", "雲端同步異常");
        return null;
      }
    } catch (err) {
      notifySyncStatus("error", "離線暫存中");
      return null;
    }
  }

  // 立即推送至雲端
  async function saveCloudDataNow(userDataObj, receipt = null) {
    const username = localStorage.getItem(KEYS.ACTIVE_USER);
    const passwordHash = localStorage.getItem(KEYS.ACTIVE_HASH);
    if (!username || !passwordHash) {
      notifySyncStatus("local", "本機暫存");
      return { success: false, message: "尚未登入雲端帳號" };
    }
    if (!isCloudConfigured()) {
      notifySyncStatus("local", "本機已存");
      return { success: false, offline: true, message: "未設定雲端網址，已存於本機" };
    }

    notifySyncStatus("syncing", "同步雲端中...");
    try {
      const res = await callGAS({
        action: "save",
        username,
        passwordHash,
        userData: userDataObj,
        receipt
      });
      if (res.success) {
        notifySyncStatus("synced", "雲端已同步");
      } else {
        notifySyncStatus("error", "同步失敗");
      }
      return res;
    } catch (err) {
      notifySyncStatus("error", "離線暫存中");
      return { success: false, message: "網路異常，進度已暫存於本機" };
    }
  }

  /**
   * 儲存進度（本機即時寫入 + 雲端智慧同步）
   * @param {Object} progress 遊戲狀態物件
   * @param {Object} options { immediate: boolean, receipt: Object|null }
   */
  function saveProgress(progress, options = {}) {
    progress.updatedAt = new Date().toISOString();

    // 1. 本機裝置立即寫入
    localStorage.setItem(KEYS.DEVICE_CACHE, JSON.stringify(progress));

    const activeUser = getActiveUsername();
    const activeHash = localStorage.getItem(KEYS.ACTIVE_HASH);
    if (activeUser) {
      const db = getAccountsDB();
      db[activeUser] = {
        hash: activeHash || (db[activeUser] && db[activeUser].hash) || "",
        progress
      };
      saveAccountsDB(db);
    }

    // 2. 雲端同步（儲值或寶箱開啟時立即同步，一般操作防抖動 1.5 秒）
    if (!activeUser || !activeHash) {
      notifySyncStatus("local", "本機暫存");
      return;
    }

    if (options.immediate) {
      clearTimeout(syncTimer);
      saveCloudDataNow(progress, options.receipt || null);
    } else {
      notifySyncStatus("syncing", "待同步...");
      clearTimeout(syncTimer);
      syncTimer = setTimeout(() => {
        saveCloudDataNow(progress, null);
      }, 1500);
    }
  }

  // 1. 註冊雲端與本機帳號
  async function registerUser(username, password, initialData) {
    const cleanName = username.trim();
    if (!cleanName || password.trim().length < 4) {
      return { ok: false, message: "請輸入帳號名稱，且密碼至少需 4 碼。" };
    }

    const passwordHash = await hashPassword(password);
    const payloadData = { ...createDefaultProgress(), ...initialData, updatedAt: new Date().toISOString() };

    if (isCloudConfigured()) {
      notifySyncStatus("syncing", "註冊雲端中...");
      try {
        const res = await callGAS({
          action: "register",
          username: cleanName,
          passwordHash,
          userData: payloadData
        });
        if (!res.success) {
          notifySyncStatus("error", "註冊失敗");
          return { ok: false, message: res.message || "註冊失敗" };
        }
      } catch (err) {
        notifySyncStatus("error", "連線失敗");
        return { ok: false, message: "無法連線至雲端伺服器，請檢查網路或 GAS 部署設定。" };
      }
    }

    // 寫入本機憑證與快取
    localStorage.setItem(KEYS.ACTIVE_USER, cleanName);
    localStorage.setItem(KEYS.ACTIVE_HASH, passwordHash);
    const db = getAccountsDB();
    db[cleanName] = { hash: passwordHash, createdAt: new Date().toISOString(), progress: payloadData };
    saveAccountsDB(db);
    localStorage.setItem(KEYS.DEVICE_CACHE, JSON.stringify(payloadData));

    notifySyncStatus(isCloudConfigured() ? "synced" : "local", isCloudConfigured() ? "雲端已同步" : "本機已存");
    return {
      ok: true,
      username: cleanName,
      progress: payloadData,
      message: isCloudConfigured()
        ? `雲端帳號「${cleanName}」註冊成功！換裝置登入相同帳密即可同步進度。`
        : `本機帳號「${cleanName}」建立成功（未設定雲端網址，目前為本機存檔）。`
    };
  }

  // 2. 登入雲端帳號並拉取跨裝置進度
  async function loginUser(username, password) {
    const cleanName = username.trim();
    if (!cleanName || password.trim().length < 4) {
      return { ok: false, message: "請輸入帳號名稱與至少 4 碼密碼。" };
    }

    const passwordHash = await hashPassword(password);

    if (isCloudConfigured()) {
      notifySyncStatus("syncing", "登入雲端中...");
      try {
        const res = await callGAS({
          action: "login",
          username: cleanName,
          passwordHash
        });
        if (!res.success) {
          notifySyncStatus("error", "登入失敗");
          return { ok: false, message: res.message || "帳號或密碼錯誤" };
        }
        const loaded = { ...createDefaultProgress(), ...(res.userData || {}) };
        localStorage.setItem(KEYS.ACTIVE_USER, cleanName);
        localStorage.setItem(KEYS.ACTIVE_HASH, passwordHash);

        const db = getAccountsDB();
        db[cleanName] = { hash: passwordHash, progress: loaded };
        saveAccountsDB(db);
        localStorage.setItem(KEYS.DEVICE_CACHE, JSON.stringify(loaded));

        notifySyncStatus("synced", "雲端已同步");
        return {
          ok: true,
          username: cleanName,
          progress: loaded,
          message: `歡迎回來，「${cleanName}」！已從雲端載入最新進度與金幣。`
        };
      } catch (err) {
        notifySyncStatus("error", "連線失敗");
        return { ok: false, message: "雲端伺服器連線逾時，請稍後再試。" };
      }
    }

    // 離線/未設定 GAS 時的本機驗證降級
    const db = getAccountsDB();
    if (!db[cleanName]) {
      return { ok: false, message: "本機找不到此帳號，請先點擊「註冊新帳號」。" };
    }
    if (db[cleanName].hash !== passwordHash) {
      return { ok: false, message: "密碼錯誤，請重新輸入。" };
    }
    localStorage.setItem(KEYS.ACTIVE_USER, cleanName);
    localStorage.setItem(KEYS.ACTIVE_HASH, passwordHash);
    const loaded = { ...createDefaultProgress(), ...db[cleanName].progress };
    localStorage.setItem(KEYS.DEVICE_CACHE, JSON.stringify(loaded));
    notifySyncStatus("local", "本機已存");
    return { ok: true, username: cleanName, progress: loaded, message: `已載入本機帳號「${cleanName}」。` };
  }

  function logoutToGuest() {
    localStorage.removeItem(KEYS.ACTIVE_USER);
    localStorage.removeItem(KEYS.ACTIVE_HASH);
    notifySyncStatus("local", "本機暫存");
    try {
      const cached = JSON.parse(localStorage.getItem(KEYS.DEVICE_CACHE));
      return cached ? { ...createDefaultProgress(), ...cached } : createDefaultProgress();
    } catch (e) {
      return createDefaultProgress();
    }
  }

  function listSavedAccounts() {
    const db = getAccountsDB();
    return Object.keys(db).map((name) => ({
      username: name,
      unlockedCount: (db[name].progress?.unlockedChars || []).length,
      maxStage: db[name].progress?.maxStageUnlocked || 1,
      coins: db[name].progress?.coins ?? 0,
      updatedAt: db[name].progress?.updatedAt || ""
    }));
  }

  function exportBackupJSON(progress) {
    const payload = {
      app: "墨韻活字工坊",
      version: "1.1",
      user: getActiveUsername() || "guest",
      exportedAt: new Date().toISOString(),
      progress
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moyun-save-${payload.user}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importBackupJSON(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed.progress || !Array.isArray(parsed.progress.unlockedChars)) {
          callback({ ok: false, message: "無效的存檔檔案格式。" });
          return;
        }
        const merged = { ...createDefaultProgress(), ...parsed.progress };
        saveProgress(merged, { immediate: true });
        callback({ ok: true, progress: merged, message: "進度備份檔匯入並同步成功！" });
      } catch (err) {
        callback({ ok: false, message: "JSON 解析失敗，請確認檔案是否損毀。" });
      }
    };
    reader.readAsText(file);
  }

  return {
    loadProgress,
    saveProgress,
    saveCloudDataNow,
    syncFromCloudOnBoot,
    getActiveUsername,
    isCloudLoggedIn,
    registerUser,
    loginUser,
    logoutToGuest,
    listSavedAccounts,
    exportBackupJSON,
    importBackupJSON,
    setSyncStatusListener
  };
})();
