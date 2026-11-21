/**
 * 墨韻活字工坊 - 110 階核心合成台控制器 (app.js)
 */

(() => {
  // 測試刷卡專用密碼（可自行修改）
  const TEST_CARD_PASSCODE = "8888";

  let state = StorageManager.loadProgress();
  let currentLayout = "lr"; // lr | tb | tri | quad | enc
  let slots = [null, null];
  let currentTileFilter = "all";
  let selectedPackage = { coins: 100, price: 30 };
  let pendingChestStage = null;

  // 簡易 Web Audio 音效合成器
  const SoundFX = (() => {
    let ctx = null;
    function getCtx() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      return ctx;
    }
    function playTone(freq, duration = 0.14, type = "sine", delay = 0) {
      const audio = getCtx();
      if (!audio) return;
      if (audio.state === "suspended") audio.resume();
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audio.currentTime + delay);
      gain.gain.setValueAtTime(0.08, audio.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(audio.currentTime + delay);
      osc.stop(audio.currentTime + delay + duration);
    }
    return {
      click: () => playTone(520, 0.07, "triangle"),
      success: () => {
        playTone(523.25, 0.12, "sine", 0);
        playTone(659.25, 0.12, "sine", 0.09);
        playTone(783.99, 0.22, "sine", 0.18);
      },
      twin: () => {
        playTone(587.33, 0.11, "sine", 0);
        playTone(739.99, 0.11, "sine", 0.08);
        playTone(880, 0.12, "sine", 0.16);
        playTone(1174.66, 0.26, "sine", 0.24);
      },
      chest: () => {
        playTone(587.33, 0.12, "triangle", 0);
        playTone(739.99, 0.12, "triangle", 0.1);
        playTone(880, 0.14, "triangle", 0.2);
        playTone(1174.66, 0.3, "triangle", 0.32);
      },
      error: () => playTone(220, 0.18, "sawtooth"),
      coin: () => {
        playTone(987.77, 0.09, "sine", 0);
        playTone(1318.51, 0.22, "sine", 0.08);
      }
    };
  })();

  // DOM 參照
  const elStageSelect = document.getElementById("stage-select");
  const elStageSubtitle = document.getElementById("stage-subtitle");
  const elProgressFill = document.getElementById("stage-progress-fill");
  const elProgressText = document.getElementById("stage-progress-text");
  const elChestBtn = document.getElementById("btn-open-chest");
  const elChestBtnEmoji = document.getElementById("chest-btn-emoji");
  const elChestBtnTitle = document.getElementById("chest-btn-title");
  const elChestBtnSub = document.getElementById("chest-btn-sub");
  const elTileGrid = document.getElementById("tile-grid");
  const elTileSearch = document.getElementById("tile-search");
  const elSlotsContainer = document.getElementById("slots-container");
  const elFeedback = document.getElementById("forge-feedback");
  const elTargetList = document.getElementById("target-list");
  const elSyncDot = document.getElementById("sync-dot");
  const elSyncStatusTag = document.getElementById("sync-status-tag");

  // 雲端同步狀態燈號監聽
  StorageManager.setSyncStatusListener((status, text) => {
    if (elSyncStatusTag) elSyncStatusTag.textContent = text;
    if (elSyncDot) {
      elSyncDot.className =
        "status-dot " +
        (status === "syncing" ? "syncing" : status === "error" ? "offline" : "");
    }
  });

  function persistState(options = {}) {
    StorageManager.saveProgress(state, options);
    updateTopBar();
  }

  function updateTopBar() {
    document.getElementById("header-stage-badge").textContent =
      `第 ${state.activeStage} / ${GameData.getTotalStages()} 階`;
    document.getElementById("header-coins").textContent = state.coins.toLocaleString();

    const user = StorageManager.getActiveUsername();
    document.getElementById("header-username").textContent = user ? user : "訪客模式";
    if (!user) {
      elSyncStatusTag.textContent = "本機暫存";
    }
  }

  function setFeedback(msg, type = "neutral") {
    elFeedback.textContent = msg;
    elFeedback.className = "forge-feedback";
    if (type === "success") elFeedback.classList.add("success");
    if (type === "error") elFeedback.classList.add("error");
  }

  // 階級選單初始化
  function populateStageSelect() {
    elStageSelect.innerHTML = "";
    STAGES_DATA.forEach((st) => {
      const opt = document.createElement("option");
      const locked = st.stage > state.maxStageUnlocked;
      opt.value = st.stage;
      opt.disabled = locked;
      opt.textContent = locked
        ? `🔒 第 ${st.stage} 階：${st.title}`
        : `第 ${st.stage} 階：${st.title}`;
      if (st.stage === state.activeStage) opt.selected = true;
      elStageSelect.appendChild(opt);
    });
  }

  // 渲染左側活字字庫
  function renderTileGrid() {
    const keyword = elTileSearch.value.trim();
    const stageCfg = GameData.getStage(state.activeStage);
    const stageNewSet = new Set(stageCfg.components);
    const craftedSet = new Set(state.unlockedChars);

    // 合併已解鎖基礎部件與已合成字（讓多階合成字如「林+木=森」也能直接取用）
    const combinedPool = Array.from(
      new Set([...state.unlockedComponents, ...state.unlockedChars])
    );

    const filtered = combinedPool.filter((ch) => {
      if (keyword && !ch.includes(keyword)) return false;
      if (currentTileFilter === "new") return stageNewSet.has(ch);
      if (currentTileFilter === "crafted") return craftedSet.has(ch);
      return true;
    });

    document.getElementById("tile-count-badge").textContent = filtered.length;
    elTileGrid.innerHTML = "";

    if (filtered.length === 0) {
      elTileGrid.innerHTML = `<div class="empty-hint-msg" style="grid-column:1/-1; text-align:center; padding:1rem;">找不到符合條件的活字部件</div>`;
      return;
    }

    filtered.forEach((ch) => {
      const tile = document.createElement("div");
      tile.className = "wood-tile";
      tile.draggable = true;

      const isNew = stageNewSet.has(ch);
      const isCrafted = craftedSet.has(ch) && !isNew;
      if (isNew) tile.classList.add("is-new");
      else if (isCrafted) tile.classList.add("is-crafted");

      const rule = RADICAL_TRANSFORMS[ch];
      const variantHint = rule
        ? rule.left
          ? `左作${rule.left}`
          : rule.top
          ? `頂作${rule.top}`
          : rule.right
          ? `右作${rule.right}`
          : rule.bottom
          ? `底作${rule.bottom}`
          : ""
        : isCrafted
        ? "已合成"
        : "";

      tile.innerHTML = `
        ${isNew ? `<span class="tile-new-dot">本階</span>` : ""}
        <span class="tile-char">${ch}</span>
        ${variantHint ? `<span class="tile-variant-hint">${variantHint}</span>` : ""}
      `;

      tile.addEventListener("click", () => {
        SoundFX.click();
        placeCharIntoNextSlot(ch);
      });

      tile.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", ch);
      });

      elTileGrid.appendChild(tile);
    });
  }

  // 依據造字結構設定盤面格數與方位標籤
  function getSlotConfigForLayout(layout) {
    if (layout === "lr") return ["左部", "右部"];
    if (layout === "tb") return ["上部", "下部"];
    if (layout === "enc") return ["外框", "內芯"];
    if (layout === "tri") return ["頂部", "左下", "右下"];
    if (layout === "quad") return ["一", "二", "三", "四"];
    return ["一", "二"];
  }

  function setLayout(newLayout) {
    currentLayout = newLayout;
    const labels = getSlotConfigForLayout(newLayout);
    const nextSlots = new Array(labels.length).fill(null);
    for (let i = 0; i < Math.min(slots.length, nextSlots.length); i++) {
      nextSlots[i] = slots[i];
    }
    slots = nextSlots;

    document.querySelectorAll(".layout-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.layout === newLayout);
    });
    renderSlots();
  }

  function placeCharIntoNextSlot(ch) {
    const emptyIdx = slots.findIndex((s) => !s);
    if (emptyIdx !== -1) {
      slots[emptyIdx] = ch;
    } else {
      slots.shift();
      slots.push(ch);
    }
    renderSlots();
  }

  function renderSlots() {
    const labels = getSlotConfigForLayout(currentLayout);
    elSlotsContainer.className = `slots-container layout-${currentLayout}`;
    elSlotsContainer.innerHTML = "";

    labels.forEach((posLabel, idx) => {
      const val = slots[idx];
      const slotEl = document.createElement("div");
      slotEl.className = "forge-slot" + (val ? " filled" : "");
      slotEl.title = val ? "點擊移除此活字" : `放入${posLabel}部件`;

      const transformNote = val ? GameData.getTransformHint(val, idx, currentLayout) : null;

      slotEl.innerHTML = `
        <span class="slot-pos-label">${posLabel}</span>
        <span class="slot-char">${val || "+"}</span>
        ${transformNote ? `<span class="slot-transform-note">${transformNote}</span>` : ""}
      `;

      slotEl.addEventListener("click", () => {
        if (slots[idx]) {
          slots[idx] = null;
          SoundFX.click();
          renderSlots();
        }
      });

      slotEl.addEventListener("dragover", (e) => {
        e.preventDefault();
        slotEl.classList.add("drag-over");
      });
      slotEl.addEventListener("dragleave", () => slotEl.classList.remove("drag-over"));
      slotEl.addEventListener("drop", (e) => {
        e.preventDefault();
        slotEl.classList.remove("drag-over");
        const droppedChar = e.dataTransfer.getData("text/plain");
        if (droppedChar) {
          slots[idx] = droppedChar;
          SoundFX.click();
          renderSlots();
        }
      });

      elSlotsContainer.appendChild(slotEl);
    });
  }

  // 執行拼合造字
  function handleForge() {
    const filledCount = slots.filter(Boolean).length;
    if (filledCount < 2) {
      SoundFX.error();
      setFeedback("⚠️ 請至少在盤面放入 2 個活字部件再進行造字！", "error");
      return;
    }

    const result = GameData.matchRecipe(
      slots,
      currentLayout,
      state.activeStage,
      state.maxStageUnlocked
    );

    if (!result) {
      SoundFX.error();
      setFeedback("❌ 此部件組合與結構無法構成有效正體漢字，試試調整結構或交換位置！", "error");
      return;
    }

    if (result.wrongLayout) {
      SoundFX.error();
      setFeedback(
        `💡 部件方向正確！但請將造字結構切換為「${result.expectedLayoutLabel}」再試一次。`,
        "error"
      );
      return;
    }

    if (result.locked) {
      SoundFX.error();
      setFeedback(
        `🔒 「${result.target.char}」屬於第 ${result.stage} 階高階漢字，請先開啟前置傳承寶箱解鎖！`,
        "error"
      );
      return;
    }

    const target = result.target;
    const isNew = !state.unlockedChars.includes(target.char);

    if (isNew) {
      state.unlockedChars.push(target.char);
      const isTwin = Boolean(target.twin);
      const rewardCoins = isTwin ? 15 : 10;
      state.coins += rewardCoins;

      if (isTwin) {
        SoundFX.twin();
        setFeedback(
          `🌟 發現雙子星異構字「${target.char}」（與「${target.twin}」結構對映）！獲得 +${rewardCoins} 🪙 金幣！`,
          "success"
        );
      } else {
        SoundFX.success();
        setFeedback(
          `🎉 造字成功！「${target.char}」— ${target.hint}（獲得 +${rewardCoins} 🪙 金幣）`,
          "success"
        );
      }
    } else {
      SoundFX.click();
      setFeedback(`📜 「${target.char}」已收錄於字譜中：${target.hint}`, "neutral");
    }

    persistState();
    renderStageStatus();
    renderTileGrid();
    renderTargetList();
  }

  // 渲染本階進度與傳承寶箱狀態
  function renderStageStatus() {
    const st = GameData.getStage(state.activeStage);
    elStageSubtitle.textContent = st.subtitle;

    const unlockedCount = st.targets.filter((t) => state.unlockedChars.includes(t.char)).length;
    const totalCount = st.targets.length;
    const pct = Math.min(100, Math.round((unlockedCount / totalCount) * 100));

    elProgressFill.style.width = `${pct}%`;
    elProgressText.textContent =
      `本階進度：${unlockedCount} / ${totalCount} 字（達成 ${st.unlockThreshold} 字可開啟下階傳承寶箱）`;

    const isOpened = state.openedChests.includes(st.stage);
    const isReady = unlockedCount >= st.unlockThreshold && !isOpened;

    elChestBtn.className = "chest-trigger-btn";
    if (isOpened) {
      elChestBtn.classList.add("opened");
      elChestBtnEmoji.textContent = "📭";
      elChestBtnTitle.textContent = "本階寶箱已啟封";
      elChestBtnSub.textContent = st.stage < GameData.getTotalStages() ? `已解鎖第 ${st.stage + 1} 階` : "全 110 階制霸";
    } else if (isReady) {
      elChestBtn.classList.add("ready");
      elChestBtnEmoji.textContent = "🎁";
      elChestBtnTitle.textContent = "開啟下階傳承寶箱！";
      elChestBtnSub.textContent = `點擊領取 +${st.chestRewardCoins} 🪙 與新活字`;
    } else {
      const remain = Math.max(0, st.unlockThreshold - unlockedCount);
      elChestBtnEmoji.textContent = "🧰";
      elChestBtnTitle.textContent = "下階傳承寶箱";
      elChestBtnSub.textContent = `還差 ${remain} 字解鎖`;
    }
  }

  // 渲染右側本階字譜
  function renderTargetList() {
    const st = GameData.getStage(state.activeStage);
    const unlockedCount = st.targets.filter((t) => state.unlockedChars.includes(t.char)).length;
    document.getElementById("target-count-badge").textContent = `${unlockedCount} / ${st.targets.length}`;

    elTargetList.innerHTML = "";
    st.targets.forEach((t) => {
      const unlocked = state.unlockedChars.includes(t.char);
      const card = document.createElement("div");
      card.className = "target-card" + (unlocked ? " unlocked" : "");

      const layoutLabel = GameData.LAYOUT_LABELS[t.layout] || t.layout;
      const formulaText = unlocked
        ? `${t.recipes[0].join(" + ")}（${layoutLabel}）`
        : `${layoutLabel} · ${t.recipes[0].length} 部件`;
      const descText = unlocked ? t.hint : "尚未合成，可使用左側活字嘗試拼合";

      card.innerHTML = `
        <div class="target-char-box">${unlocked ? t.char : "？"}</div>
        <div class="target-meta">
          <div class="target-formula">${formulaText}</div>
          <div class="target-desc" title="${descText}">${descText}</div>
        </div>
        ${t.twin ? `<span class="twin-badge">雙子星</span>` : ""}
      `;

      elTargetList.appendChild(card);
    });
  }

  // 渲染三階字理錦囊已購清單
  function renderHintsList() {
    const listEl = document.getElementById("purchased-hints-list");
    const stageHints = state.purchasedHints[state.activeStage] || [];

    if (stageHints.length === 0) {
      listEl.innerHTML = `<div class="empty-hint-msg">本階尚未購買字理錦囊，遇瓶頸時可點擊上方按鈕獲取提示。</div>`;
      return;
    }

    listEl.innerHTML = stageHints
      .map((item) => {
        const solved = state.unlockedChars.includes(item.targetChar);
        return `
          <div class="hint-item-card">
            ${solved ? `✅ <strong>${item.targetChar}</strong>：` : "🔍 "}${item.text}
          </div>
        `;
      })
      .join("");
  }

  // 購買三階字理錦囊 (15 / 30 / 60 🪙)
  document.querySelectorAll(".hint-buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tier = parseInt(btn.dataset.hintTier, 10);
      const cost = parseInt(btn.dataset.cost, 10);
      const st = GameData.getStage(state.activeStage);

      if (!state.purchasedHints[st.stage]) state.purchasedHints[st.stage] = [];
      const existing = state.purchasedHints[st.stage];

      // 找出尚未解鎖且尚未購買過同階級提示的目標字
      const candidates = st.targets.filter(
        (t) =>
          !state.unlockedChars.includes(t.char) &&
          !existing.some((h) => h.targetChar === t.char && h.tier >= tier)
      );

      if (candidates.length === 0) {
        setFeedback("📜 本階所有未解鎖漢字皆已擁有此等級（或更高級）的錦囊線索！", "neutral");
        return;
      }

      if (state.coins < cost) {
        SoundFX.error();
        setFeedback(`🪙 金幣不足（目前 ${state.coins} 🪙，需要 ${cost} 🪙），可合成新字或前往錢莊儲值！`, "error");
        return;
      }

      const target = candidates[0];
      const text = GameData.buildHintText(target, tier);
      state.coins -= cost;
      existing.unshift({ targetChar: target.char, tier, text });

      SoundFX.coin();
      persistState();
      renderHintsList();
      setFeedback(`💡 已花費 ${cost} 🪙 購得字理錦囊，請查看下方線索欄！`, "success");
    });
  });

  // 階段寶箱開啟流程
  elChestBtn.addEventListener("click", () => {
    const st = GameData.getStage(state.activeStage);
    const unlockedCount = st.targets.filter((t) => state.unlockedChars.includes(t.char)).length;

    if (state.openedChests.includes(st.stage)) {
      setFeedback(`📭 第 ${st.stage} 階傳承寶箱已經啟封過囉！`, "neutral");
      return;
    }

    if (unlockedCount < st.unlockThreshold) {
      setFeedback(
        `🧰 還差 ${st.unlockThreshold - unlockedCount} 個本階漢字即可啟封「第 ${st.stage} 階傳承寶箱」！`,
        "neutral"
      );
      return;
    }

    pendingChestStage = st;
    const boxArt = document.getElementById("chest-box-art");
    boxArt.className = "chest-box-art";
    document.getElementById("chest-lock-label").textContent = "啟封";
    document.getElementById("chest-rewards-reveal").classList.add("hidden");
    document.getElementById("chest-modal-badge").textContent = `第 ${st.stage} 階達標（${unlockedCount} / ${st.targets.length} 字）`;
    document.getElementById("chest-modal-title").textContent = `第 ${st.stage} 階・傳承寶箱`;
    document.getElementById("chest-modal-desc").textContent =
      st.stage < GameData.getTotalStages()
        ? `點擊下方寶箱啟封，領取 +${st.chestRewardCoins} 🪙 並解鎖第 ${st.stage + 1} 階的 5 個全新活字部件！`
        : `恭喜達成最終第 110 階！點擊寶箱領取宗師大獎 +${st.chestRewardCoins} 🪙！`;

    document.getElementById("chest-modal").classList.remove("hidden");
  });

  document.getElementById("chest-visual-trigger").addEventListener("click", () => {
    if (!pendingChestStage) return;
    const st = pendingChestStage;
    if (state.openedChests.includes(st.stage)) return;

    const boxArt = document.getElementById("chest-box-art");
    boxArt.classList.add("shaking");
    SoundFX.chest();

    setTimeout(() => {
      boxArt.classList.remove("shaking");
      boxArt.classList.add("opened");
      document.getElementById("chest-lock-label").textContent = "已啟";

      // 寫入獎勵與下一階解鎖狀態
      state.openedChests.push(st.stage);
      state.coins += st.chestRewardCoins;

      const newComps = GameData.getNextStageRewardComponents(st.stage);
      newComps.forEach((c) => {
        if (!state.unlockedComponents.includes(c)) {
          state.unlockedComponents.push(c);
        }
      });

      if (st.stage < GameData.getTotalStages() && state.maxStageUnlocked <= st.stage) {
        state.maxStageUnlocked = st.stage + 1;
      }

      persistState({ immediate: true });
      populateStageSelect();
      renderStageStatus();
      renderTileGrid();

      document.getElementById("chest-coin-banner").textContent =
        `🪙 獲得階段金幣：+${st.chestRewardCoins} 🪙`;

      const row = document.getElementById("chest-new-cards-row");
      if (newComps.length > 0) {
        row.innerHTML = newComps
          .map(
            (c, idx) => `
            <div class="reveal-tile" style="animation-delay:${idx * 0.08}s">
              <span>${c}</span>
              <small>第 ${st.stage + 1} 階</small>
            </div>
          `
          )
          .join("");
      } else {
        row.innerHTML = `<div class="badge">🎉 全 110 階活字部件已全數集齊！</div>`;
      }

      document.getElementById("chest-rewards-reveal").classList.remove("hidden");
    }, 420);
  });

  document.getElementById("btn-chest-continue").addEventListener("click", () => {
    document.getElementById("chest-modal").classList.add("hidden");
    if (pendingChestStage && pendingChestStage.stage < GameData.getTotalStages()) {
      state.activeStage = pendingChestStage.stage + 1;
      persistState();
      populateStageSelect();
      renderAll();
    }
    pendingChestStage = null;
  });

  // 金幣商城與信用卡即時預覽
  const elCcNumber = document.getElementById("cc-number");
  const elCcName = document.getElementById("cc-name");
  const elCcExpiry = document.getElementById("cc-expiry");
  const elCcCvv = document.getElementById("cc-cvv");
  const elCcVisualCard = document.getElementById("cc-visual-card");
  const elCcError = document.getElementById("cc-error");
  const elSubmitPayBtn = document.getElementById("btn-submit-payment");

  document.getElementById("btn-open-shop").addEventListener("click", () => {
    const user = StorageManager.getActiveUsername();
    document.getElementById("shop-account-status").textContent = user
      ? `目前儲值帳號：「${user}」（儲值成功後將即時入帳並同步至雲端）`
      : "目前為「訪客模式」（建議先登入雲端帳號再儲值，以免清除瀏覽器資料遺失金幣）";
    document.getElementById("shop-modal").classList.remove("hidden");
  });

  document.querySelectorAll(".pkg-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".pkg-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedPackage = {
        coins: parseInt(card.dataset.coins, 10),
        price: parseInt(card.dataset.price, 10)
      };
      elSubmitPayBtn.textContent = `確認刷卡付款 NT$ ${selectedPackage.price}`;
      SoundFX.click();
    });
  });

  elCcNumber.addEventListener("input", () => {
    elCcNumber.value = PaymentManager.formatCardNumber(elCcNumber.value);
    const info = PaymentManager.detectCardNetwork(elCcNumber.value);
    document.getElementById("cc-visual-network").textContent = info.label;
    document.getElementById("cc-visual-number").textContent =
      elCcNumber.value || "•••• •••• •••• ••••";
    elCcVisualCard.className = "credit-card-visual " + (info.cssClass || "");
  });

  elCcName.addEventListener("input", () => {
    document.getElementById("cc-visual-name").textContent =
      elCcName.value.trim().toUpperCase() || "YOUR NAME";
  });

  elCcExpiry.addEventListener("input", () => {
    elCcExpiry.value = PaymentManager.formatExpiry(elCcExpiry.value);
    document.getElementById("cc-visual-exp").textContent = elCcExpiry.value || "MM/YY";
  });

  // 測試刷卡快捷填入（需驗證密碼）
  document.querySelectorAll("[data-fill-card]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const inputPwd = window.prompt("請輸入測試刷卡密碼：");
      if (inputPwd === null) return;

      if (inputPwd.trim() !== TEST_CARD_PASSCODE) {
        elCcError.textContent = "🔒 測試刷卡密碼錯誤，無法填入測試卡號！";
        elCcError.classList.remove("hidden");
        SoundFX.error();
        return;
      }

      const sample = PaymentManager.TEST_CARDS[btn.dataset.fillCard];
      if (!sample) return;
      elCcNumber.value = sample.number;
      elCcName.value = sample.name;
      elCcExpiry.value = sample.exp;
      elCcCvv.value = sample.cvv;
      elCcNumber.dispatchEvent(new Event("input"));
      elCcName.dispatchEvent(new Event("input"));
      elCcExpiry.dispatchEvent(new Event("input"));
      elCcError.classList.add("hidden");
      SoundFX.click();
    });
  });

  document.getElementById("credit-card-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    elCcError.classList.add("hidden");

    // 若輸入的是內建測試卡號，送出時也需驗證測試授權密碼
    const rawNum = elCcNumber.value.replace(/\s+/g, "");
    const isTestCard = Object.values(PaymentManager.TEST_CARDS || {}).some(
      (c) => c.number.replace(/\s+/g, "") === rawNum
    );

    if (isTestCard) {
      const inputPwd = window.prompt("偵測到測試卡號，請輸入測試授權密碼：");
      if (inputPwd === null) return;

      if (inputPwd.trim() !== TEST_CARD_PASSCODE) {
        elCcError.textContent = "🔒 測試授權密碼錯誤，刷卡已拒絕！";
        elCcError.classList.remove("hidden");
        SoundFX.error();
        return;
      }
    }

    elSubmitPayBtn.disabled = true;
    elSubmitPayBtn.textContent = "銀行授權與雲端入帳中...";

    const res = await PaymentManager.processCardPayment({
      cardNumber: elCcNumber.value,
      cardName: elCcName.value,
      expiry: elCcExpiry.value,
      cvv: elCcCvv.value,
      coins: selectedPackage.coins,
      priceTWD: selectedPackage.price,
      currentState: state
    });

    elSubmitPayBtn.disabled = false;
    elSubmitPayBtn.textContent = `確認刷卡付款 NT$ ${selectedPackage.price}`;

    if (!res.ok) {
      elCcError.textContent = res.message;
      elCcError.classList.remove("hidden");
      SoundFX.error();
      return;
    }

    updateTopBar();
    SoundFX.coin();
    document.getElementById("shop-modal").classList.add("hidden");
    setFeedback(
      `💳 ${res.receipt.network}（末四碼 ${res.receipt.last4}）刷卡成功！已儲值 +${res.receipt.coinsAdded} 🪙 金幣！`,
      "success"
    );
  });

  // 帳號中心與雲端同步管理
  function renderAuthModal() {
    const activeUser = StorageManager.getActiveUsername();
    document.getElementById("auth-active-user").textContent = activeUser
      ? `${activeUser}（已登入雲端帳號）`
      : "訪客模式（本機暫存）";
    document.getElementById("auth-stats-badge").textContent =
      `最高第 ${state.maxStageUnlocked} 階 · ${state.unlockedChars.length} 字 · ${state.coins} 🪙`;

    const accounts = StorageManager.listSavedAccounts();
    const listEl = document.getElementById("saved-accounts-list");
    if (accounts.length === 0) {
      listEl.innerHTML = `<div class="empty-hint-msg">尚無本機帳號紀錄，請在上方輸入帳號與密碼進行註冊或登入。</div>`;
      return;
    }

    listEl.innerHTML = accounts
      .map(
        (acc) => `
        <div class="account-row-item">
          <div>
            <strong>${acc.username}</strong>
            <span style="color:var(--ink-secondary); margin-left:6px;">
              第 ${acc.maxStage} 階 · 已造 ${acc.unlockedCount} 字 · ${acc.coins} 🪙
            </span>
          </div>
          <button type="button" class="mini-btn" data-fill-user="${acc.username}">填入帳號</button>
        </div>
      `
      )
      .join("");

    listEl.querySelectorAll("[data-fill-user]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.getElementById("auth-username").value = btn.dataset.fillUser;
        const pinInput = document.getElementById("auth-pin");
        pinInput.value = "";
        pinInput.focus();
      });
    });
  }

  document.getElementById("btn-open-auth").addEventListener("click", () => {
    renderAuthModal();
    document.getElementById("auth-modal").classList.remove("hidden");
  });

  document.getElementById("btn-cloud-login").addEventListener("click", async () => {
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-pin").value;
    const msgEl = document.getElementById("auth-msg");
    const btn = document.getElementById("btn-cloud-login");

    btn.disabled = true;
    btn.textContent = "雲端驗證中...";
    const res = await StorageManager.loginUser(u, p);
    btn.disabled = false;
    btn.textContent = "登入帳號（載入雲端進度）";

    msgEl.textContent = res.message;
    msgEl.className = res.ok ? "form-info" : "form-error";
    msgEl.classList.remove("hidden");

    if (res.ok) {
      state = res.progress;
      populateStageSelect();
      renderAll();
      renderAuthModal();
      setFeedback(`☁️ 已登入「${res.username}」並載入最新雲端進度！`, "success");
    }
  });

  document.getElementById("btn-cloud-register").addEventListener("click", async () => {
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-pin").value;
    const msgEl = document.getElementById("auth-msg");
    const btn = document.getElementById("btn-cloud-register");

    btn.disabled = true;
    btn.textContent = "建立雲端存檔中...";
    const res = await StorageManager.registerUser(u, p, state);
    btn.disabled = false;
    btn.textContent = "註冊新帳號（綁定目前進度）";

    msgEl.textContent = res.message;
    msgEl.className = res.ok ? "form-info" : "form-error";
    msgEl.classList.remove("hidden");

    if (res.ok) {
      state = res.progress;
      populateStageSelect();
      renderAll();
      renderAuthModal();
      setFeedback(`☁️ 雲端帳號「${res.username}」註冊並綁定成功！`, "success");
    }
  });

  document.getElementById("btn-logout-guest").addEventListener("click", () => {
    state = StorageManager.logoutToGuest();
    populateStageSelect();
    renderAll();
    renderAuthModal();
    setFeedback("已登出雲端帳號並切換回訪客模式。", "neutral");
  });

  document.getElementById("btn-export-json").addEventListener("click", () => {
    StorageManager.exportBackupJSON(state);
  });

  document.getElementById("input-import-json").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    StorageManager.importBackupJSON(file, (res) => {
      const msgEl = document.getElementById("auth-msg");
      msgEl.textContent = res.message;
      msgEl.className = res.ok ? "form-info" : "form-error";
      msgEl.classList.remove("hidden");
      if (res.ok) {
        state = res.progress;
        populateStageSelect();
        renderAll();
        renderAuthModal();
      }
    });
  });

  // 偏旁圖鑑視窗
  document.getElementById("btn-open-guide").addEventListener("click", () => {
    const listEl = document.getElementById("guide-radical-list");
    listEl.innerHTML = Object.entries(RADICAL_TRANSFORMS)
      .map(
        ([rad, info]) => `
        <div class="radical-item">
          <strong>「${rad}」</strong>：${info.desc}
        </div>
      `
      )
      .join("");
    document.getElementById("guide-modal").classList.remove("hidden");
  });

  // 全 110 階總覽視窗
  document.getElementById("btn-open-overview").addEventListener("click", () => {
    const totalTargets = GameData.getTotalTargetsCount();
    document.getElementById("overview-summary-text").textContent =
      `目前已解鎖至第 ${state.maxStageUnlocked} / ${GameData.getTotalStages()} 階，累計合成 ${state.unlockedChars.length} / ${totalTargets} 個正體漢字。點擊已解鎖階級可快速切換：`;

    const gridEl = document.getElementById("all-stages-grid");
    gridEl.innerHTML = STAGES_DATA.map((st) => {
      const unlocked = st.stage <= state.maxStageUnlocked;
      const count = st.targets.filter((t) => state.unlockedChars.includes(t.char)).length;
      return `
        <div class="stage-overview-card ${unlocked ? "unlocked" : "locked"}" data-jump-stage="${st.stage}">
          <div style="font-weight:700; font-size:0.85rem;">
            ${unlocked ? "" : "🔒 "}第 ${st.stage} 階 · ${st.title}
          </div>
          <div style="font-size:0.74rem; color:var(--ink-secondary); margin-top:2px;">
            進度：${count} / ${st.targets.length} 字
          </div>
        </div>
      `;
    }).join("");

    gridEl.querySelectorAll("[data-jump-stage]").forEach((card) => {
      card.addEventListener("click", () => {
        const targetStage = parseInt(card.dataset.jumpStage, 10);
        if (targetStage > state.maxStageUnlocked) return;
        state.activeStage = targetStage;
        persistState();
        populateStageSelect();
        renderAll();
        document.getElementById("overview-modal").classList.add("hidden");
        SoundFX.click();
      });
    });

    document.getElementById("overview-modal").classList.remove("hidden");
  });

  // 合成台與過濾控制綁定
  document.getElementById("btn-forge").addEventListener("click", handleForge);

  document.getElementById("btn-swap").addEventListener("click", () => {
    if (slots.length >= 2) {
      const first = slots.shift();
      slots.push(first);
      SoundFX.click();
      renderSlots();
    }
  });

  document.getElementById("btn-clear-slots").addEventListener("click", () => {
    slots = slots.map(() => null);
    SoundFX.click();
    renderSlots();
  });

  document.querySelectorAll(".layout-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      SoundFX.click();
      setLayout(btn.dataset.layout);
    });
  });

  elStageSelect.addEventListener("change", () => {
    state.activeStage = parseInt(elStageSelect.value, 10);
    persistState();
    renderAll();
  });

  elTileSearch.addEventListener("input", renderTileGrid);
  document.getElementById("btn-clear-search").addEventListener("click", () => {
    elTileSearch.value = "";
    renderTileGrid();
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentTileFilter = btn.dataset.filter;
      renderTileGrid();
      SoundFX.click();
    });
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.close).classList.add("hidden");
    });
  });

  // 關閉或切換分頁前強制使用 keepalive 推送雲端存檔
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && StorageManager.isCloudLoggedIn()) {
      StorageManager.saveCloudDataNow(state, null, true);
    }
  });

  function renderAll() {
    updateTopBar();
    renderStageStatus();
    renderTileGrid();
    renderSlots();
    renderTargetList();
    renderHintsList();
  }

  // 初始化畫面
  populateStageSelect();
  renderAll();

  // 啟動時自動向雲端拉取最新進度
  StorageManager.syncFromCloudOnBoot().then((cloudState) => {
    if (cloudState) {
      state = cloudState;
      populateStageSelect();
      renderAll();
    }
  });
})();
