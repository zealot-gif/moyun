/**
 * 墨韻活字工坊 - 核心遊戲控制器 (app.js)
 * 整合：110 階造字合成、階段寶箱開啟動畫、金幣提示購買、帳號與裝置暫存
 */

document.addEventListener("DOMContentLoaded", () => {
  // 載入玩家進度（優先載入登入帳號存檔，否則讀取裝置暫存）
  let state = StorageManager.loadProgress();
  let currentLayout = "lr";
  let slots = ["", ""];
  let currentFilter = "all";
  let searchQuery = "";
  let selectedPackage = { coins: 120, price: 30 };

  const LAYOUT_CONFIG = {
    lr:   { count: 2, labels: ["左部", "右部"], name: "左右結構" },
    tb:   { count: 2, labels: ["上部", "下部"], name: "上下結構" },
    tri:  { count: 3, labels: ["第一部", "第二部", "第三部"], name: "三疊 / 品字結構" },
    enc:  { count: 2, labels: ["外框 / 半包", "內部"], name: "包圍結構" },
    quad: { count: 4, labels: ["一", "二", "三", "四"], name: "四疊結構" },
    quin: { count: 5, labels: ["一", "二", "三", "四", "五"], name: "五元神字結構" }
  };

  // ================= 簡易 Web Audio 音效（無需外部音檔） =================
  const SoundFX = (() => {
    let ctx = null;
    function getCtx() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      return ctx;
    }
    function playTone(freq, duration = 0.12, type = "triangle", gainVal = 0.12) {
      try {
        const audio = getCtx();
        if (!audio) return;
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audio.currentTime);
        gain.gain.setValueAtTime(gainVal, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start();
        osc.stop(audio.currentTime + duration);
      } catch (e) {}
    }
    return {
      clack: () => playTone(320, 0.08, "triangle", 0.15),
      success: () => {
        playTone(523.25, 0.14, "sine", 0.14);
        setTimeout(() => playTone(659.25, 0.16, "sine", 0.14), 90);
        setTimeout(() => playTone(783.99, 0.25, "sine", 0.15), 180);
      },
      coin: () => {
        playTone(987.77, 0.1, "sine", 0.12);
        setTimeout(() => playTone(1318.51, 0.22, "sine", 0.14), 80);
      },
      chestOpen: () => {
        [440, 554.37, 659.25, 880].forEach((f, idx) => {
          setTimeout(() => playTone(f, 0.28, "triangle", 0.16), idx * 110);
        });
      },
      error: () => playTone(180, 0.18, "sawtooth", 0.09)
    };
  })();

  // ================= DOM 參照 =================
  const elStageSelect = document.getElementById("stage-select");
  const elStageSubtitle = document.getElementById("stage-subtitle");
  const elProgressFill = document.getElementById("stage-progress-fill");
  const elProgressText = document.getElementById("stage-progress-text");
  const elChestBtn = document.getElementById("btn-stage-chest");
  const elChestIcon = document.getElementById("chest-btn-icon");
  const elChestTitle = document.getElementById("chest-btn-title");
  const elChestSub = document.getElementById("chest-btn-sub");
  const elTileInventory = document.getElementById("tile-inventory");
  const elInventoryCount = document.getElementById("inventory-count");
  const elWorkbenchSlots = document.getElementById("workbench-slots");
  const elForgeFeedback = document.getElementById("forge-feedback");
  const elTargetList = document.getElementById("stage-target-list");
  const elCodexCount = document.getElementById("stage-codex-count");
  const elCoinBalance = document.getElementById("coin-balance");
  const elHintCoinDisplay = document.getElementById("hint-coin-display");
  const elPurchasedHintsList = document.getElementById("purchased-hints-list");
  const elCurrentUserLabel = document.getElementById("current-user-label");

  // ================= 資料輔助計算 =================
  function getStageObj(stageNum) {
    return STAGES_DATA.find((s) => s.stage === stageNum) || STAGES_DATA[0];
  }

  // 取得玩家目前已擁有的所有基礎部件（第 1 階至 maxStageUnlocked）
  function getAvailableBaseComponents() {
    const set = new Set();
    for (const st of STAGES_DATA) {
      if (st.stage <= state.maxStageUnlocked) {
        st.components.forEach((c) => set.add(c));
      }
    }
    return set;
  }

  function persistState() {
    StorageManager.saveProgress(state);
    updateHeaderStatus();
  }

  function updateHeaderStatus() {
    const activeUser = StorageManager.getActiveUsername();
    elCurrentUserLabel.textContent = activeUser ? `帳號：${activeUser}` : "訪客（本機暫存）";
    elCoinBalance.textContent = state.coins;
    elHintCoinDisplay.textContent = state.coins;
  }

  // ================= 初始化階段下拉選單 =================
  function populateStageDropdown() {
    elStageSelect.innerHTML = "";
    STAGES_DATA.forEach((st) => {
      const opt = document.createElement("option");
      opt.value = st.stage;
      const locked = st.stage > state.maxStageUnlocked;
      opt.disabled = locked;
      opt.textContent = locked
        ? `🔒 第 ${st.stage} 階：${st.title}（需開啟前階寶箱）`
        : `第 ${st.stage} 階：${st.title}`;
      if (st.stage === state.activeStage) opt.selected = true;
      elStageSelect.appendChild(opt);
    });
  }

  // ================= 渲染左側活字字庫 =================
  function renderInventory() {
    const currentStageObj = getStageObj(state.activeStage);
    const stageNewSet = new Set(currentStageObj.components);
    const baseSet = getAvailableBaseComponents();
    const craftedSet = new Set(state.unlockedChars);

    // 合併所有可用活字塊（基礎部件 + 已造出漢字）
    const allTiles = [];
    baseSet.forEach((ch) => {
      allTiles.push({
        char: ch,
        isBase: true,
        isStageNew: stageNewSet.has(ch),
        isCrafted: false
      });
    });
    craftedSet.forEach((ch) => {
      if (!baseSet.has(ch)) {
        allTiles.push({
          char: ch,
          isBase: false,
          isStageNew: false,
          isCrafted: true
        });
      }
    });

    const filtered = allTiles.filter((item) => {
      if (searchQuery && !item.char.includes(searchQuery)) return false;
      if (currentFilter === "stage-new") return item.isStageNew;
      if (currentFilter === "radicals") return item.isBase;
      if (currentFilter === "crafted") return item.isCrafted;
      return true;
    });

    elInventoryCount.textContent = filtered.length;
    elTileInventory.innerHTML = "";

    filtered.forEach((item) => {
      const tile = document.createElement("div");
      tile.className = "wood-tile";
      if (item.isStageNew) tile.classList.add("is-new");
      if (item.isCrafted) tile.classList.add("is-crafted");
      tile.draggable = true;

      const transformInfo = RADICAL_TRANSFORMS[item.char];
      let variantText = "";
      if (transformInfo) {
        variantText = transformInfo.left || transformInfo.top || transformInfo.right || "";
      }

      tile.innerHTML = `
        ${item.isStageNew ? '<span class="tile-new-dot">新</span>' : ""}
        <span class="tile-char">${item.char}</span>
        ${variantText ? `<span class="tile-variant-hint">偏旁:${variantText}</span>` : ""}
      `;

      // 點擊自動填入第一個空槽位
      tile.addEventListener("click", () => {
        placeCharIntoFirstEmptySlot(item.char);
      });

      // 拖曳開始
      tile.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", item.char);
      });

      elTileInventory.appendChild(tile);
    });
  }

  // ================= 渲染中間合成盤面 =================
  function getContextualDisplay(char, layout, slotIndex) {
    const rule = RADICAL_TRANSFORMS[char];
    if (!rule) return { display: char, note: "" };

    if (layout === "lr" && slotIndex === 0 && rule.left) {
      return { display: rule.left, note: `${char}→${rule.left}` };
    }
    if (layout === "lr" && slotIndex === 1 && rule.right) {
      return { display: rule.right, note: `${char}→${rule.right}` };
    }
    if (layout === "tb" && slotIndex === 0 && rule.top) {
      return { display: rule.top, note: `${char}→${rule.top}` };
    }
    if (layout === "tb" && slotIndex === 1 && rule.bottom) {
      return { display: rule.bottom, note: `${char}→${rule.bottom}` };
    }
    return { display: char, note: "" };
  }

  function renderWorkbench() {
    const cfg = LAYOUT_CONFIG[currentLayout];
    if (slots.length !== cfg.count) {
      const old = [...slots];
      slots = Array(cfg.count).fill("");
      for (let i = 0; i < Math.min(old.length, cfg.count); i++) {
        slots[i] = old[i];
      }
    }

    elWorkbenchSlots.className = `slots-container layout-${currentLayout}`;
    elWorkbenchSlots.innerHTML = "";

    slots.forEach((ch, idx) => {
      const slotEl = document.createElement("div");
      slotEl.className = "forge-slot" + (ch ? " filled" : "");
      const ctx = ch ? getContextualDisplay(ch, currentLayout, idx) : { display: "", note: "" };

      slotEl.innerHTML = `
        <span class="slot-pos-label">${cfg.labels[idx]}</span>
        <span class="slot-char">${ctx.display}</span>
        ${ctx.note ? `<span class="slot-transform-note">${ctx.note}</span>` : ""}
      `;

      // 點擊已填入的槽位可移除該部件
      slotEl.addEventListener("click", () => {
        if (slots[idx]) {
          slots[idx] = "";
          SoundFX.clack();
          renderWorkbench();
        }
      });

      // 支援拖放
      slotEl.addEventListener("dragover", (e) => {
        e.preventDefault();
        slotEl.classList.add("drag-over");
      });
      slotEl.addEventListener("dragleave", () => {
        slotEl.classList.remove("drag-over");
      });
      slotEl.addEventListener("drop", (e) => {
        e.preventDefault();
        slotEl.classList.remove("drag-over");
        const droppedChar = e.dataTransfer.getData("text/plain");
        if (droppedChar) {
          slots[idx] = droppedChar;
          SoundFX.clack();
          renderWorkbench();
        }
      });

      elWorkbenchSlots.appendChild(slotEl);
    });
  }

  function placeCharIntoFirstEmptySlot(char) {
    const emptyIdx = slots.findIndex((s) => !s);
    if (emptyIdx !== -1) {
      slots[emptyIdx] = char;
    } else {
      slots[slots.length - 1] = char;
    }
    SoundFX.clack();
    renderWorkbench();
  }

  // ================= 合成判定引擎 =================
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => val === b[i]);
  }

  function arraysSameMultiset(a, b) {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((val, i) => val === sb[i]);
  }

  function attemptForge() {
    if (slots.some((s) => !s)) {
      setFeedback("請先將所有活字槽位填滿後再點擊「落印合成」。", "error");
      SoundFX.error();
      return;
    }

    // 搜尋全 110 階中（已解鎖階數內）符合的目標字
    const unlockedStagePool = STAGES_DATA.filter((s) => s.stage <= state.maxStageUnlocked);
    let exactMatch = null;
    let unorderedMatch = null;
    let wrongLayoutMatch = null;

    for (const st of unlockedStagePool) {
      for (const target of st.targets) {
        for (const recipe of target.recipes) {
          if (target.layout === currentLayout && arraysEqual(slots, recipe)) {
            exactMatch = { target, stage: st.stage };
            break;
          }
          if (target.layout === currentLayout && !target.twin && arraysSameMultiset(slots, recipe)) {
            unorderedMatch = { target, stage: st.stage };
          }
          if (target.layout !== currentLayout && arraysSameMultiset(slots, recipe)) {
            wrongLayoutMatch = { target, stage: st.stage };
          }
        }
        if (exactMatch) break;
      }
      if (exactMatch) break;
    }

    const matched = exactMatch || unorderedMatch;
    if (matched) {
      const { target } = matched;
      const isFirstUnlock = !state.unlockedChars.includes(target.char);
      if (isFirstUnlock) {
        state.unlockedChars.push(target.char);
        const coinGain = target.twin ? 15 : 10;
        state.coins += coinGain;
        SoundFX.success();
        const twinMsg = target.twin ? `（雙子星提示：互換位置或改換結構還能造出「${target.twin}」！）` : "";
        setFeedback(`✨ 造字成功！【${target.char}】— ${target.hint}（+${coinGain} 🪙）${twinMsg}`, "success");
      } else {
        SoundFX.clack();
        setFeedback(`已重現漢字【${target.char}】：${target.hint}`, "success");
      }

      slots = Array(LAYOUT_CONFIG[currentLayout].count).fill("");
      persistState();
      renderAll();
      return;
    }

    if (wrongLayoutMatch) {
      const correctLayoutName = LAYOUT_CONFIG[wrongLayoutMatch.target.layout].name;
      setFeedback(`💡 部件組合正確，但排版結構不符！試試切換為「${correctLayoutName}」再試一次。`, "error");
      SoundFX.error();
      return;
    }

    setFeedback("此組部件尚未構成收錄漢字，試試調整部件順序或購買錦囊線索。", "error");
    SoundFX.error();
  }

  function setFeedback(msg, type = "") {
    elForgeFeedback.textContent = msg;
    elForgeFeedback.className = "forge-feedback" + (type ? ` ${type}` : "");
  }

  // ================= 階段進度與寶箱狀態 =================
  function renderStageProgressAndCodex() {
    const st = getStageObj(state.activeStage);
    elStageSubtitle.textContent = st.subtitle;

    const unlockedInStage = st.targets.filter((t) => state.unlockedChars.includes(t.char));
    const totalInStage = st.targets.length;
    const pct = totalInStage ? Math.round((unlockedInStage.length / totalInStage) * 100) : 0;

    elProgressFill.style.width = `${pct}%`;
    elCodexCount.textContent = `${unlockedInStage.length}/${totalInStage}`;

    const chestOpened = state.openedChests.includes(st.stage);
    const chestReady = unlockedInStage.length >= st.unlockThreshold;

    if (chestOpened) {
      elProgressText.textContent = `已解鎖 ${unlockedInStage.length} / ${totalInStage} 字（本階傳承寶箱已開啟）`;
      elChestBtn.className = "chest-trigger-btn opened";
      elChestIcon.textContent = "📭";
      elChestTitle.textContent = "寶箱已領取";
      elChestSub.textContent = st.stage < 110 ? `第 ${st.stage + 1} 階已開啟` : "已達造字宗師";
    } else if (chestReady) {
      elProgressText.textContent = `已解鎖 ${unlockedInStage.length} / ${totalInStage} 字（✨ 已達寶箱開啟條件！）`;
      elChestBtn.className = "chest-trigger-btn ready";
      elChestIcon.textContent = "🎁";
      elChestTitle.textContent = "開啟階段寶箱！";
      elChestSub.textContent = "點擊領取下階新部件";
    } else {
      const remain = st.unlockThreshold - unlockedInStage.length;
      elProgressText.textContent = `已解鎖 ${unlockedInStage.length} / ${totalInStage} 字（開啟寶箱需 ${st.unlockThreshold} 字）`;
      elChestBtn.className = "chest-trigger-btn locked";
      elChestIcon.textContent = "🔒";
      elChestTitle.textContent = "下階傳承寶箱";
      elChestSub.textContent = `尚差 ${remain} 字解鎖`;
    }

    // 渲染右側本階字譜
    elTargetList.innerHTML = "";
    st.targets.forEach((t) => {
      const isUnlocked = state.unlockedChars.includes(t.char);
      const card = document.createElement("div");
      card.className = "target-card" + (isUnlocked ? " unlocked" : "");
      const formulaStr = t.recipes[0].join(" + ");

      card.innerHTML = `
        <div class="target-char-box">${isUnlocked ? t.char : "？"}</div>
        <div class="target-meta">
          <div class="target-formula">${isUnlocked ? `${t.char} ＝ ${formulaStr}` : `${LAYOUT_CONFIG[t.layout].name}・${t.recipes[0].length} 部件`}</div>
          <div class="target-desc" title="${t.hint}">${isUnlocked ? t.hint : "尚未造出，可點擊或買錦囊探索"}</div>
        </div>
        ${t.twin ? `<span class="twin-badge">⇄ 雙子星</span>` : ""}
      `;
      elTargetList.appendChild(card);
    });

    renderPurchasedHints();
  }

  // ================= 階段寶箱開啟動畫與領取 =================
  function openChestModal() {
    const st = getStageObj(state.activeStage);
    const unlockedCount = st.targets.filter((t) => state.unlockedChars.includes(t.char)).length;

    if (unlockedCount < st.unlockThreshold && !state.openedChests.includes(st.stage)) {
      setFeedback(`尚需在本階造出 ${st.unlockThreshold - unlockedCount} 個字，才能解開青銅寶箱鎖扣！`, "error");
      SoundFX.error();
      return;
    }

    const modal = document.getElementById("chest-modal");
    const boxArt = document.getElementById("chest-box-art");
    const revealArea = document.getElementById("chest-rewards-reveal");

    document.getElementById("chest-modal-badge").textContent = `第 ${st.stage} 階「${st.title}」達成`;
    document.getElementById("chest-modal-title").textContent =
      st.stage < 110 ? `開啟第 ${st.stage + 1} 階傳承寶箱` : "開啟造字宗師終極寶箱";

    boxArt.classList.remove("opened", "shaking");
    revealArea.classList.add("hidden");
    modal.classList.remove("hidden");

    // 若之前已開過，直接顯示內容
    if (state.openedChests.includes(st.stage)) {
      revealChestContents(st, true);
    }
  }

  function revealChestContents(currentStageObj, alreadyOpened = false) {
    const boxArt = document.getElementById("chest-box-art");
    const revealArea = document.getElementById("chest-rewards-reveal");
    const newCardsRow = document.getElementById("chest-new-cards");
    const coinBanner = document.getElementById("chest-coin-banner");
    const claimBtn = document.getElementById("btn-claim-next-stage");

    boxArt.classList.add("opened");
    if (!alreadyOpened) {
      SoundFX.chestOpen();
      state.openedChests.push(currentStageObj.stage);
      const reward = currentStageObj.stage === 110 ? 500 : currentStageObj.chestRewardCoins;
      state.coins += reward;
      if (currentStageObj.stage < 110 && state.maxStageUnlocked < currentStageObj.stage + 1) {
        state.maxStageUnlocked = currentStageObj.stage + 1;
      }
      persistState();
      coinBanner.textContent = `+${reward} 🪙 寶箱金幣已入帳！`;
    } else {
      coinBanner.textContent = "此寶箱獎勵已領取過";
    }

    newCardsRow.innerHTML = "";
    if (currentStageObj.stage < 110) {
      const nextSt = getStageObj(currentStageObj.stage + 1);
      nextSt.components.forEach((comp, i) => {
        const card = document.createElement("div");
        card.className = "reveal-tile";
        card.style.animationDelay = `${i * 0.1}s`;
        card.innerHTML = `<span>${comp}</span><small>第 ${nextSt.stage} 階</small>`;
        newCardsRow.appendChild(card);
      });
      claimBtn.textContent = `前往第 ${nextSt.stage} 階：${nextSt.title}`;
    } else {
      newCardsRow.innerHTML = `<div class="reveal-tile" style="width:140px"><span>宗師</span><small>全 110 階制霸</small></div>`;
      claimBtn.textContent = "返回工坊繼續探索";
    }

    revealArea.classList.remove("hidden");
  }

  document.getElementById("chest-interactive-box").addEventListener("click", () => {
    const st = getStageObj(state.activeStage);
    const boxArt = document.getElementById("chest-box-art");
    if (boxArt.classList.contains("opened")) return;
    boxArt.classList.add("shaking");
    setTimeout(() => {
      boxArt.classList.remove("shaking");
      revealChestContents(st, state.openedChests.includes(st.stage));
    }, 450);
  });

  document.getElementById("btn-claim-next-stage").addEventListener("click", () => {
    document.getElementById("chest-modal").classList.add("hidden");
    if (state.activeStage < 110 && state.maxStageUnlocked >= state.activeStage + 1) {
      state.activeStage += 1;
      persistState();
    }
    populateStageDropdown();
    renderAll();
  });

  // ================= 金幣購買提示系統 =================
  const HINT_PRICES = { 1: 15, 2: 30, 3: 60 };

  function buyHint(tier) {
    const cost = HINT_PRICES[tier];
    if (state.coins < cost) {
      setFeedback(`金幣不足（需要 ${cost} 🪙）！可點擊右上角「+ 儲值」購買金幣。`, "error");
      SoundFX.error();
      return;
    }

    const st = getStageObj(state.activeStage);
    const remaining = st.targets.filter((t) => !state.unlockedChars.includes(t.char));
    if (remaining.length === 0) {
      setFeedback("本階所有漢字皆已解鎖，無需購買線索！", "success");
      return;
    }

    const target = remaining[0];
    let hintText = "";
    if (tier === 1) {
      hintText = `【字義暗示】目標字含義：「${target.hint}」`;
    } else if (tier === 2) {
      hintText = `【結構與首部】排版為「${LAYOUT_CONFIG[target.layout].name}」，包含部件「${target.recipes[0][0]}」`;
    } else {
      hintText = `【完整配方】${target.recipes[0].join(" + ")} （${LAYOUT_CONFIG[target.layout].name}）＝「${target.char}」`;
    }

    state.coins -= cost;
    const key = String(state.activeStage);
    if (!state.purchasedHints[key]) state.purchasedHints[key] = [];
    state.purchasedHints[key].unshift(hintText);

    SoundFX.coin();
    persistState();
    renderPurchasedHints();
    setFeedback(`已花費 ${cost} 🪙 開啟錦囊！線索已顯示於下方。`, "success");
  }

  function renderPurchasedHints() {
    const list = state.purchasedHints[String(state.activeStage)] || [];
    if (list.length === 0) {
      elPurchasedHintsList.innerHTML = `<div class="empty-hint-msg">尚未購買本階提示，遇到瓶頸時可花費金幣開啟錦囊。</div>`;
      return;
    }
    elPurchasedHintsList.innerHTML = list
      .map((item) => `<div class="hint-item-card">${item}</div>`)
      .join("");
  }

  // ================= 信用卡儲值互動邏輯 =================
  const elCcNumber = document.getElementById("cc-number");
  const elCcName = document.getElementById("cc-name");
  const elCcExpiry = document.getElementById("cc-expiry");
  const elCcCvv = document.getElementById("cc-cvv");
  const elCardVisual = document.getElementById("card-visual");
  const elNetworkLabel = document.getElementById("cc-network-label");
  const elCcError = document.getElementById("cc-error-msg");
  const elSubmitPayBtn = document.getElementById("btn-submit-payment");

  document.querySelectorAll(".pkg-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".pkg-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedPackage = {
        coins: parseInt(card.dataset.coins, 10),
        price: parseInt(card.dataset.price, 10)
      };
      elSubmitPayBtn.textContent = `確認刷卡付款 NT$ ${selectedPackage.price}`;
    });
  });

  elCcNumber.addEventListener("input", () => {
    elCcNumber.value = PaymentManager.formatCardNumber(elCcNumber.value);
    const net = PaymentManager.detectCardNetwork(elCcNumber.value);
    elCardVisual.className = `credit-card-visual ${net.cssClass}`;
    elNetworkLabel.textContent = net.label;
    document.getElementById("cc-preview-number").textContent =
      elCcNumber.value || "•••• •••• •••• ••••";
  });

  elCcName.addEventListener("input", () => {
    document.getElementById("cc-preview-name").textContent =
      elCcName.value.toUpperCase() || "WENREN SCHOLAR";
  });

  elCcExpiry.addEventListener("input", () => {
    elCcExpiry.value = PaymentManager.formatExpiry(elCcExpiry.value);
    document.getElementById("cc-preview-exp").textContent = elCcExpiry.value || "MM/YY";
  });

  document.querySelectorAll("[data-testcard]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sample = PaymentManager.TEST_CARDS[btn.dataset.testcard];
      if (!sample) return;
      elCcNumber.value = sample.number;
      elCcName.value = sample.name;
      elCcExpiry.value = sample.exp;
      elCcCvv.value = sample.cvv;
      elCcNumber.dispatchEvent(new Event("input"));
      elCcName.dispatchEvent(new Event("input"));
      elCcExpiry.dispatchEvent(new Event("input"));
      elCcError.classList.add("hidden");
    });
  });

  document.getElementById("credit-card-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    elCcError.classList.add("hidden");
    elSubmitPayBtn.disabled = true;
    elSubmitPayBtn.textContent = "銀行授權連線中...";

    const res = await PaymentManager.processCardPayment({
      cardNumber: elCcNumber.value,
      cardName: elCcName.value,
      expiry: elCcExpiry.value,
      cvv: elCcCvv.value,
      coins: selectedPackage.coins,
      priceTWD: selectedPackage.price
    });

    elSubmitPayBtn.disabled = false;
    elSubmitPayBtn.textContent = `確認刷卡付款 NT$ ${selectedPackage.price}`;

    if (!res.ok) {
      elCcError.textContent = res.message;
      elCcError.classList.remove("hidden");
      SoundFX.error();
      return;
    }

    state.coins += res.receipt.coinsAdded;
    state.paymentHistory.unshift(res.receipt);
    persistState();
    SoundFX.coin();

    document.getElementById("shop-modal").classList.add("hidden");
    setFeedback(
      `💳 ${res.receipt.network} 末四碼 ${res.receipt.last4} 刷卡成功！已儲值 ${res.receipt.coinsAdded} 🪙 金幣。`,
      "success"
    );
  });

  // ================= 使用者登入與帳號管理邏輯 =================
  function renderAuthModal() {
    const activeUser = StorageManager.getActiveUsername();
    document.getElementById("auth-active-user").textContent = activeUser
      ? `${activeUser}（已登入並啟用裝置同步）`
      : "訪客（本機裝置暫存中）";
    document.getElementById("auth-stats-summary").textContent =
      `已解鎖 ${state.unlockedChars.length} 字・最高第 ${state.maxStageUnlocked} 階・${state.coins} 🪙`;

    const accounts = StorageManager.listSavedAccounts();
    const listEl = document.getElementById("saved-accounts-list");
    if (accounts.length === 0) {
      listEl.innerHTML = `<div class="empty-hint-msg">本機尚無註冊帳號，在上方輸入帳號與 PIN 碼即可建立！</div>`;
      return;
    }
    listEl.innerHTML = accounts
      .map(
        (acc) => `
      <div class="account-row-item">
        <div>
          <strong>${acc.username}</strong>
          <span style="color:#666; margin-left:6px;">第 ${acc.maxStage} 階・解鎖 ${acc.unlockedCount} 字・${acc.coins} 🪙</span>
        </div>
        <button type="button" class="mini-btn" data-switch-user="${acc.username}">切換至此帳號</button>
      </div>
    `
      )
      .join("");

    listEl.querySelectorAll("[data-switch-user]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const loaded = StorageManager.switchAccountDirect(btn.dataset.switchUser);
        if (loaded) {
          state = loaded;
          populateStageDropdown();
          renderAll();
          renderAuthModal();
          setFeedback(`已切換至帳號「${btn.dataset.switchUser}」並載入進度！`, "success");
        }
      });
    });
  }

  document.getElementById("auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-pin").value;
    const msgEl = document.getElementById("auth-msg");

    const res = StorageManager.loginOrRegister(u, p, state);
    msgEl.textContent = res.message;
    msgEl.className = res.ok ? "form-info" : "form-error";
    msgEl.classList.remove("hidden");

    if (res.ok) {
      state = res.progress;
      populateStageDropdown();
      renderAll();
      renderAuthModal();
    }
  });

  document.getElementById("btn-logout-guest").addEventListener("click", () => {
    state = StorageManager.logoutToGuest();
    populateStageDropdown();
    renderAll();
    renderAuthModal();
  });

  document.getElementById("btn-export-save").addEventListener("click", () => {
    StorageManager.exportBackupJSON(state);
  });

  document.getElementById("input-import-save").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    StorageManager.importBackupJSON(file, (res) => {
      const msgEl = document.getElementById("auth-msg");
      msgEl.textContent = res.message;
      msgEl.className = res.ok ? "form-info" : "form-error";
      msgEl.classList.remove("hidden");
      if (res.ok) {
        state = res.progress;
        populateStageDropdown();
        renderAll();
        renderAuthModal();
      }
    });
  });

  // ================= 偏旁字理與全 110 階總覽 =================
  function renderRadicalGuide() {
    const listEl = document.getElementById("radical-transform-list");
    listEl.innerHTML = Object.entries(RADICAL_TRANSFORMS)
      .map(
        ([base, info]) => `
        <div class="radical-item">
          <strong>${base}</strong> → ${info.desc}
        </div>
      `
      )
      .join("");
  }

  function renderAllStagesCodex() {
    const gridEl = document.getElementById("all-stages-grid");
    gridEl.innerHTML = STAGES_DATA.map((st) => {
      const unlocked = st.stage <= state.maxStageUnlocked;
      const done = st.targets.filter((t) => state.unlockedChars.includes(t.char)).length;
      return `
        <div class="stage-overview-card ${unlocked ? "unlocked" : "locked"}" data-jump-stage="${st.stage}">
          <div style="font-weight:700; font-size:0.85rem;">第 ${st.stage} 階・${st.title}</div>
          <div style="font-size:0.74rem; color:#555; margin:3px 0;">新部件：${st.components.join(" ")}</div>
          <div style="font-size:0.74rem; font-weight:700; color:${unlocked ? "#286655" : "#888"};">
            ${unlocked ? `已解鎖 ${done} / ${st.targets.length} 字` : "🔒 尚未解鎖"}
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
        populateStageDropdown();
        renderAll();
        document.getElementById("codex-modal").classList.add("hidden");
      });
    });
  }

  // ================= 事件綁定 =================
  elStageSelect.addEventListener("change", () => {
    state.activeStage = parseInt(elStageSelect.value, 10);
    persistState();
    renderAll();
  });

  document.querySelectorAll(".layout-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".layout-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentLayout = btn.dataset.layout;
      renderWorkbench();
    });
  });

  document.getElementById("btn-swap-slots").addEventListener("click", () => {
    if (slots.length >= 2) {
      [slots[0], slots[1]] = [slots[1], slots[0]];
      SoundFX.clack();
      renderWorkbench();
    }
  });

  document.getElementById("btn-clear-slots").addEventListener("click", () => {
    slots = Array(LAYOUT_CONFIG[currentLayout].count).fill("");
    SoundFX.clack();
    renderWorkbench();
  });

  document.getElementById("btn-forge").addEventListener("click", attemptForge);
  elChestBtn.addEventListener("click", openChestModal);

  document.querySelectorAll(".hint-buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => buyHint(parseInt(btn.dataset.tier, 10)));
  });

  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      renderInventory();
    });
  });

  document.getElementById("tile-search").addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderInventory();
  });

  document.getElementById("btn-clear-search").addEventListener("click", () => {
    searchQuery = "";
    document.getElementById("tile-search").value = "";
    renderInventory();
  });

  // Modals 開關
  document.getElementById("btn-open-shop").addEventListener("click", () => {
    document.getElementById("shop-modal").classList.remove("hidden");
  });
  document.getElementById("btn-open-auth").addEventListener("click", () => {
    renderAuthModal();
    document.getElementById("auth-modal").classList.remove("hidden");
  });
  document.getElementById("btn-open-radicals").addEventListener("click", () => {
    renderRadicalGuide();
    document.getElementById("radical-modal").classList.remove("hidden");
  });
  document.getElementById("btn-open-codex").addEventListener("click", () => {
    renderAllStagesCodex();
    document.getElementById("codex-modal").classList.remove("hidden");
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.close).classList.add("hidden");
    });
  });

  function renderAll() {
    updateHeaderStatus();
    renderInventory();
    renderWorkbench();
    renderStageProgressAndCodex();
  }

  populateStageDropdown();
  renderAll();
});
