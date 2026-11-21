/**
 * 墨韻活字工坊 - 使用者登入與雙層進度暫存引擎 (storage.js)
 * 支援：
 * 1. 本機裝置即時暫存 (localStorage device cache)
 * 2. 多使用者帳號註冊、密碼驗證與一鍵切換存檔
 * 3. JSON 進度備份檔匯出與匯入
 * 4. 預留雲端資料庫同步介接埠 (CloudSyncAdapter)
 */

const StorageManager = (() => {
  const KEYS = {
    DEVICE_CACHE: "moyun_device_cache_v1",
    ACCOUNTS_DB: "moyun_accounts_db_v1",
    ACTIVE_USER: "moyun_active_user_v1"
  };

  function createDefaultProgress() {
    return {
      maxStageUnlocked: 1,
      activeStage: 1,
      openedChests: [],         // 已開啟過寶箱的階段編號陣列 (例如 [1, 2])
      unlockedChars: [],        // 玩家已合成解鎖的漢字陣列
      coins: 120,               // 初始贈送 120 金幣
      purchasedHints: {},       // { "1": ["【字義暗示】明：日月齊輝..."] }
      paymentHistory: [],       // 信用卡儲值紀錄
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

  function saveProgress(progress) {
    progress.updatedAt = new Date().toISOString();
    // 1. 永遠寫入本機裝置暫存 (確保離線或未登入時也絕不遺失)
    localStorage.setItem(KEYS.DEVICE_CACHE, JSON.stringify(progress));

    // 2. 若已登入使用者帳號，同步更新該帳號專屬存檔
    const activeUser = getActiveUsername();
    if (activeUser) {
      const db = getAccountsDB();
      if (db[activeUser]) {
        db[activeUser].progress = progress;
        saveAccountsDB(db);
      }
    }

    // 3. 觸發預留雲端同步介面（若已設定雲端端點）
    CloudSyncAdapter.push(activeUser, progress);
  }

  function loginOrRegister(username, pin, currentProgress) {
    const cleanName = username.trim();
    if (!cleanName || pin.trim().length < 4) {
      return { ok: false, message: "請輸入帳號名稱，且密碼 / PIN 碼至少需 4 碼。" };
    }

    const db = getAccountsDB();
    if (db[cleanName]) {
      // 驗證既有帳號
      if (db[cleanName].pin !== pin.trim()) {
        return { ok: false, message: "密碼 / PIN 碼錯誤，請重新輸入。" };
      }
      localStorage.setItem(KEYS.ACTIVE_USER, cleanName);
      const loaded = { ...createDefaultProgress(), ...db[cleanName].progress };
      localStorage.setItem(KEYS.DEVICE_CACHE, JSON.stringify(loaded));
      return {
        ok: true,
        isNew: false,
        username: cleanName,
        progress: loaded,
        message: `歡迎回來，「${cleanName}」！已載入您的雲端/本機帳號進度。`
      };
    } else {
      // 註冊新帳號並繼承目前訪客進度
      db[cleanName] = {
        pin: pin.trim(),
        createdAt: new Date().toISOString(),
        progress: { ...currentProgress, updatedAt: new Date().toISOString() }
      };
      saveAccountsDB(db);
      localStorage.setItem(KEYS.ACTIVE_USER, cleanName);
      return {
        ok: true,
        isNew: true,
        username: cleanName,
        progress: db[cleanName].progress,
        message: `已成功註冊「${cleanName}」，並將目前進度與金幣綁定至此帳號！`
      };
    }
  }

  function switchAccountDirect(username) {
    const db = getAccountsDB();
    if (!db[username]) return null;
    localStorage.setItem(KEYS.ACTIVE_USER, username);
    const loaded = { ...createDefaultProgress(), ...db[username].progress };
    localStorage.setItem(KEYS.DEVICE_CACHE, JSON.stringify(loaded));
    return loaded;
  }

  function logoutToGuest() {
    localStorage.removeItem(KEYS.ACTIVE_USER);
    return loadProgress();
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
      version: "1.0",
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
        saveProgress(merged);
        callback({ ok: true, progress: merged, message: "進度備份檔匯入成功！" });
      } catch (err) {
        callback({ ok: false, message: "JSON 解析失敗，請確認檔案是否損毀。" });
      }
    };
    reader.readAsText(file);
  }

  return {
    loadProgress,
    saveProgress,
    getActiveUsername,
    loginOrRegister,
    switchAccountDirect,
    logoutToGuest,
    listSavedAccounts,
    exportBackupJSON,
    importBackupJSON
  };
})();

/**
 * 雲端同步擴充介接層 (若未來串接 Firebase / Supabase / 自建後端 API 可在此實作)
 */
const CloudSyncAdapter = {
  endpoint: null, // 例如: "https://your-api.example.com/api/sync"
  async push(username, progress) {
    if (!this.endpoint || !username) return;
    try {
      await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, progress })
      });
    } catch (err) {
      console.warn("雲端同步暫時離線，已安全保存於本機裝置暫存。", err);
    }
  }
};
