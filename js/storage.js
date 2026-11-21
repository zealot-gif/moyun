/**
 * 墨韻活字工坊 - 跨裝置雲端同步與本機雙層暫存引擎 (storage.js)
 */

const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxcF-joWiInjdBt9Ea2rGZffkjqhx_g7_fRd0KMnOOpXkJ5EYQmy4W-irbD3rp7-CpSmw/exec";

const StorageManager = (() => {
  const KEYS = {
    GUEST_CACHE: "moyun_guest_cache_v2",
    ACCOUNTS_DB: "moyun_accounts_db_v2",
    ACTIVE_USER: "moyun_cloud_user_v2",
    ACTIVE_HASH: "moyun_cloud_hash_v2"
  };

  let syncTimer = null;
  let onSyncStatusChangeCallback = null;

  function setSyncStatusListener(cb) {
    onSyncStatusChangeCallback = cb;
  }

  function notifySyncStatus(status, text) {
    if (typeof onSyncStatusChangeCallback === "function") {
      onSyncStatusChangeCallback(status, text);
    }
  }

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
    let h = 0;
    for (let i = 0; i < clean.length; i++) {
      h = (Math.imul(31, h) + clean.charCodeAt(i)) | 0;
    }
    return "fallback_" + Math.abs(h).toString(16);
  }

  function isCloudConfigured() {
    return Boolean(GAS_API_URL && GAS_API_URL.startsWith("https://"));
  }

  async function callGAS(payload, useKeepAlive = false) {
    if (!isCloudConfigured()) {
      return { success: false, offline: true, message: "尚未設定 GAS_API_URL，目前僅使用本機暫存" };
    }
    const response = await fetch(GAS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      keepalive: useKeepAlive
    });
    return await response.json();
  }

  function createDefaultProgress() {
    return {
      maxStageUnlocked: 1,
      activeStage: 1,
      openedChests: [],
      unlockedChars: [],
      unlockedComponents: GameData.getStarterComponents(),
      coins: 120,
      purchasedHints: {},
      paymentHistory: [],
      updatedAt: new Date().toISOString()
    };
  }

  function normalizeProgress(raw) {
    const base = createDefaultProgress();
    const merged = { ...base, ...(raw || {}) };
    // 確保已解鎖階級的所有活字部件皆存在（相容舊存檔）
    const requiredComps = GameData.getComponentsUpToStage(merged.maxStageUnlocked || 1);
    const compSet = new Set([...(merged.unlockedComponents || []), ...requiredComps]);
    merged.unlockedComponents = Array.from(compSet);
    if (!Array.isArray(merged.unlockedChars)) merged.unlockedChars = [];
    if (!Array.isArray(merged.openedChests)) merged.openedChests = [];
    if (!merged.purchasedHints || typeof merged.purchasedHints !== "object") merged.purchasedHints = {};
    if (!Array.isArray(merged.paymentHistory)) merged.paymentHistory = [];
    return merged;
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
        return normalizeProgress(db[activeUser].progress);
      }
    }
    try {
      const cached = JSON.parse(localStorage.getItem(KEYS.GUEST_CACHE));
      if (cached) {
        return normalizeProgress(cached);
      }
    } catch (e) {
      console.warn("讀取裝置暫存失敗，建立新存檔", e);
    }
    return createDefaultProgress();
  }

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
        const merged = normalizeProgress(res.userData);
        const db = getAccountsDB();
        db[username] = { hash: passwordHash, progress: merged };
        saveAccountsDB(db);
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

  async function saveCloudDataNow(userDataObj, receipt = null, useKeepAlive = false) {
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
      const res = await callGAS(
        {
          action: "save",
          username,
          passwordHash,
          userData: userDataObj,
          receipt
        },
        useKeepAlive
      );
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

  function saveProgress(progress, options = {}) {
    progress.updatedAt = new Date().toISOString();
    const activeUser = getActiveUsername();
    const activeHash = localStorage.getItem(KEYS.ACTIVE_HASH);

    if (activeUser) {
      const db = getAccountsDB();
      db[activeUser] = {
        hash: activeHash || (db[activeUser] && db[activeUser].hash) || "",
        progress
      };
      saveAccountsDB(db);
    } else {
      localStorage.setItem(KEYS.GUEST_CACHE, JSON.stringify(progress));
      notifySyncStatus("local", "本機暫存");
      return;
    }

    if (!activeHash) {
      notifySyncStatus("local", "本機暫存");
      return;
    }

    if (options.immediate) {
      clearTimeout(syncTimer);
      saveCloudDataNow(progress, options.receipt || null, Boolean(options.keepalive));
    } else {
      notifySyncStatus("syncing", "待同步...");
      clearTimeout(syncTimer);
      syncTimer = setTimeout(() => {
        saveCloudDataNow(progress, null, false);
      }, 1200);
    }
  }

  async function registerUser(username, password, initialData) {
    const cleanName = username.trim();
    if (!cleanName || password.trim().length < 4) {
      return { ok: false, message: "請輸入帳號名稱，且密碼至少需 4 碼。" };
    }

    const passwordHash = await hashPassword(password);
    const payloadData = normalizeProgress({ ...initialData, updatedAt: new Date().toISOString() });

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

    localStorage.setItem(KEYS.ACTIVE_USER, cleanName);
    localStorage.setItem(KEYS.ACTIVE_HASH, passwordHash);
    const db = getAccountsDB();
    db[cleanName] = { hash: passwordHash, createdAt: new Date().toISOString(), progress: payloadData };
    saveAccountsDB(db);

    notifySyncStatus(isCloudConfigured() ? "synced" : "local", isCloudConfigured() ? "雲端已同步" : "本機已存");
    return {
      ok: true,
      username: cleanName,
      progress: payloadData,
      message: isCloudConfigured()
        ? `雲端帳號「${cleanName}」註冊成功！換裝置登入相同帳密即可同步進度。`
        : `本機帳號「${cleanName}」建立成功。`
    };
  }

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
        const loaded = normalizeProgress(res.userData || {});
        localStorage.setItem(KEYS.ACTIVE_USER, cleanName);
        localStorage.setItem(KEYS.ACTIVE_HASH, passwordHash);

        const db = getAccountsDB();
        db[cleanName] = { hash: passwordHash, progress: loaded };
        saveAccountsDB(db);

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

    const db = getAccountsDB();
    if (!db[cleanName]) {
      return { ok: false, message: "本機找不到此帳號，請先點擊「註冊新帳號」。" };
    }
    if (db[cleanName].hash !== passwordHash) {
      return { ok: false, message: "密碼錯誤，請重新輸入。" };
    }
    localStorage.setItem(KEYS.ACTIVE_USER, cleanName);
    localStorage.setItem(KEYS.ACTIVE_HASH, passwordHash);
    const loaded = normalizeProgress(db[cleanName].progress);
    notifySyncStatus("local", "本機已存");
    return { ok: true, username: cleanName, progress: loaded, message: `已載入本機帳號「${cleanName}」。` };
  }

  function logoutToGuest() {
    clearTimeout(syncTimer);
    localStorage.removeItem(KEYS.ACTIVE_USER);
    localStorage.removeItem(KEYS.ACTIVE_HASH);
    notifySyncStatus("local", "本機暫存");
    try {
      const cached = JSON.parse(localStorage.getItem(KEYS.GUEST_CACHE));
      return cached ? normalizeProgress(cached) : createDefaultProgress();
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
      version: "2.0",
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
        const merged = normalizeProgress(parsed.progress);
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
