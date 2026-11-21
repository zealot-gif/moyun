/**
 * 墨韻活字工坊 - 主應用程式控制器 (app.js)
 */

(() => {
  // 1. 載入初始進度狀態
  let state = StorageManager.loadProgress();
  let selectedSlots = [null, null];
  let currentCollectionTab = "current";
  let lastUnlockedResult = null;
  let selectedPackage = { coins: 100, price: 30 };

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
  const elRadicalSearch = document.getElementById("radical-search");
  const elRadicalsContainer = document.getElementById("radicals-container");
  const elSlotA = document.getElementById("slot-a");
  const elSlotB = document.getElementById("slot-b");
  const elSlotAName = document.getElementById("slot-a-name");
  const elSlotBName = document.getElementById("slot-b-name");
  const elFeedback = document.getElementById("forge-feedback");
  const elResultEmpty = document.getElementById("result-empty");
  const elResultContent = document.getElementById("result-content");
  const elChestGrid = document.getElementById("chest-grid");
  const elCollectionContainer = document.getElementById("collection-container");
  const elSyncDot = document.getElementById("sync-dot");
  const elSyncStatusTag = document.getElementById("sync-status-tag");

  // 監聽雲端同步狀態燈號
  StorageManager.setSyncStatusListener((status, text) => {
    if (elSyncStatusTag) elSyncStatusTag.textContent = text;
    if (elSyncDot) {
      elSyncDot.className = "status-dot " + (status === "synced" || status === "local" ? "online" : "offline");
    }
  });

  function persistState(options = {}) {
    StorageManager.saveProgress(state, options);
    updateHeaderStatus();
  }

  function updateHeaderStatus() {
    const activeStage = state.activeStage;
    const stageChars = GameDataHelpers.getCharactersByStage(activeStage);
    const unlockedInStage = stageChars.filter((c) => state.unlockedChars.includes(c.char));

    document.getElementById("header-stage-label").textContent = `第 ${activeStage} 階（最高 ${state.maxStageUnlocked} 階）`;
    document.getElementById("header-stage-progress").textContent = `${unlockedInStage.length} / ${stageChars.length}`;
    document.getElementById("header-coins").textContent = state.coins;
    document.getElementById("total-unlocked-badge").textContent = `總解鎖：${state.unlockedChars.length} / ${CHARACTER_RECIPES.length} 字`;

    const user = StorageManager.getActiveUsername();
    document.getElementById("header-username").textContent = user ? user : "訪客模式";
    if (!user) {
      document.getElementById("sync-status-tag").textContent = "本機暫存";
    }
  }

  function setFeedback(message, type = "neutral") {
    elFeedback.textContent = message;
    elFeedback.className = "feedback-banner";
    if (type === "success") elFeedback.classList.add("success");
    if (type === "error") elFeedback.classList.add("error");
  }

  function populateStageDropdown() {
    elStageSelect.innerHTML = "";
    STAGE_CONFIG.forEach((st) => {
      const opt = document.createElement("option");
      const locked = st.stage > state.maxStageUnlocked;
      opt.value = st.stage;
      opt.disabled = locked;
      opt.textContent = locked
        ? `🔒 第 ${st.stage} 階：${st.title}（未解鎖）`
        : `第 ${st.stage} 階：${st.title}`;
      if (st.stage === state.activeStage) opt.selected = true;
      elStageSelect.appendChild(opt);
    });
  }

  function renderRadicals() {
    const keyword = elRadicalSearch.value.trim();
    const availableRadicals = GameDataHelpers.getRadicalsUpToStage(state.maxStageUnlocked);
    const filtered = availableRadicals.filter((r) => {
      if (!keyword) return true;
      return (
        r.char.includes(keyword) ||
        r.name.includes(keyword) ||
        r.meaning.includes(keyword) ||
        `第${r.stage}階`.includes(keyword)
      );
    });

    elRadicalsContainer.innerHTML = "";

    const byStage = {};
    filtered.forEach((r) => {
      if (!byStage[r.stage]) byStage[r.stage] = [];
      byStage[r.stage].push(r);
    });

    const stageNums = Object.keys(byStage).map(Number).sort((a, b) => a - b);
    if (stageNums.length === 0) {
      elRadicalsContainer.innerHTML = `<div class="empty-hint-msg">找不到符合「${keyword}」的已解鎖偏旁。</div>`;
      return;
    }

    stageNums.forEach((stNum) => {
      const stInfo = GameDataHelpers.getStageInfo(stNum);
      const groupDiv = document.createElement("div");
      groupDiv.className = "radical-stage-group";
      groupDiv.innerHTML = `<div class="group-title">第 ${stNum} 階部首・${stInfo ? stInfo.title : ""}</div>`;

      const grid = document.createElement("div");
      grid.className = "radical-grid";

      byStage[stNum].forEach((rad) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "radical-tile";
        card.draggable = true;
        if (selectedSlots[0] === rad.char || selectedSlots[1] === rad.char) {
          card.classList.add("in-use");
        }
        card.innerHTML = `
          <span class="rad-char">${rad.char}</span>
          <span class="rad-name">${rad.name}</span>
          <span class="rad-meaning">${rad.meaning}</span>
        `;

        card.addEventListener("click", () => {
          SoundFX.click();
          placeRadicalInSlot(rad.char);
        });

        card.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", rad.char);
        });

        grid.appendChild(card);
      });

      groupDiv.appendChild(grid);
      elRadicalsContainer.appendChild(groupDiv);
    });
  }

  function placeRadicalInSlot(radChar) {
    if (!selectedSlots[0]) {
      selectedSlots[0] = radChar;
    } else if (!selectedSlots[1]) {
      selectedSlots[1] = radChar;
    } else {
      selectedSlots[0] = selectedSlots[1];
      selectedSlots[1] = radChar;
    }
    renderSlots();
    renderRadicals();
  }

  function renderSlots() {
    [elSlotA, elSlotB].forEach((slotEl, idx) => {
      const val = selectedSlots[idx];
      const captionEl = idx === 0 ? elSlotAName : elSlotBName;
      if (val) {
        const info = GameDataHelpers.getRadicalInfo(val);
        slotEl.classList.add("filled");
        slotEl.innerHTML = `<span class="slot-char">${val}</span>`;
        captionEl.textContent = info ? `${info.name}（${info.meaning}）` : val;
      } else {
        slotEl.classList.remove("filled");
        slotEl.innerHTML = `<span class="slot-placeholder">${idx === 0 ? "偏旁一" : "偏旁二"}</span>`;
        captionEl.textContent = idx === 0 ? "點擊左側部首放入" : "點擊第二個部首";
      }
    });
  }

  [elSlotA, elSlotB].forEach((slotEl, idx) => {
    slotEl.addEventListener("click", () => {
      if (selectedSlots[idx]) {
        selectedSlots[idx] = null;
        SoundFX.click();
        renderSlots();
        renderRadicals();
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
      const radChar = e.dataTransfer.getData("text/plain");
      if (radChar) {
        selectedSlots[idx] = radChar;
        SoundFX.click();
        renderSlots();
        renderRadicals();
      }
    });
  });

  function executeForge() {
    const [a, b] = selectedSlots;
    if (!a || !b) {
      SoundFX.error();
      setFeedback("⚠️ 請先放入兩個偏旁部首再進行拼合！", "error");
      return;
    }

    const recipe = GameDataHelpers.findRecipe(a, b);
    if (!recipe) {
      SoundFX.error();
      setFeedback(`❌ 「${a}」與「${b}」目前無法組成有效漢字，試試交換其他偏旁或查看提示！`, "error");
      return;
    }

    if (recipe.stage > state.maxStageUnlocked) {
      SoundFX.error();
      setFeedback(`🔒 此組合屬於「第 ${recipe.stage} 階」高階漢字，請先完成目前階級並開啟通關寶箱解鎖！`, "error");
      return;
    }

    const isFirstTime = !state.unlockedChars.includes(recipe.char);
    if (isFirstTime) {
      state.unlockedChars.push(recipe.char);
      state.coins += 10;
      SoundFX.success();
      setFeedback(`🎉 造字成功！解鎖新漢字「${recipe.char}」（${recipe.pinyin}），獲得 +10 🪙 金幣！`, "success");
    } else {
      SoundFX.click();
      setFeedback(`📜 「${recipe.char}」（${recipe.pinyin}）已在您的典籍中，以下為詳細字義與成語典故。`, "neutral");
    }

    lastUnlockedResult = recipe;
    showResultCard(recipe);
    persistState();
    renderAll();
  }

  function showResultCard(recipe) {
    elResultEmpty.classList.add("hidden");
    elResultContent.classList.remove("hidden");

    document.getElementById("res-char").textContent = recipe.char;
    document.getElementById("res-title").textContent = recipe.char;
    document.getElementById("res-pinyin").textContent = recipe.pinyin;
    document.getElementById("res-stage-badge").textContent = `第 ${recipe.stage} 階`;
    document.getElementById("res-formula").textContent = `組合公式：${recipe.components[0]} + ${recipe.components[1]}`;
    document.getElementById("res-meaning").textContent = recipe.meaning;
    document.getElementById("res-idiom").textContent = recipe.idiom;
    document.getElementById("res-idiom-desc").textContent = recipe.idiomDesc;
  }

  function renderChests() {
    elChestGrid.innerHTML = "";
    STAGE_CONFIG.forEach((st) => {
      const stageChars = GameDataHelpers.getCharactersByStage(st.stage);
      const unlockedCount = stageChars.filter((c) => state.unlockedChars.includes(c.char)).length;
      const isComplete = unlockedCount === stageChars.length && stageChars.length > 0;
      const isOpened = state.openedChests.includes(st.stage);
      const isLockedStage = st.stage > state.maxStageUnlocked;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chest-card";

      let icon = "🔒";
      let statusText = `${unlockedCount}/${stageChars.length}`;
      if (isOpened) {
        btn.classList.add("opened");
        icon = "📭";
        statusText = "已領取";
      } else if (isComplete && !isLockedStage) {
        btn.classList.add("ready");
        icon = "🎁";
        statusText = "可開啟！";
      } else if (!isLockedStage) {
        icon = "🧰";
      }

      btn.innerHTML = `
        <span class="chest-icon">${icon}</span>
        <span class="chest-stage">第 ${st.stage} 階</span>
        <span class="chest-status">${statusText}</span>
      `;

      btn.addEventListener("click", () => {
        if (isLockedStage) {
          setFeedback(`🔒 尚未解鎖第 ${st.stage} 階，請先完成前置階級！`, "error");
          return;
        }
        if (isOpened) {
          setFeedback(`📦 第 ${st.stage} 階通關寶箱已經開啟過囉！`, "neutral");
          return;
        }
        if (!isComplete) {
          setFeedback(`🧰 第 ${st.stage} 階尚有 ${stageChars.length - unlockedCount} 個漢字未合成，集滿即可開啟寶箱！`, "neutral");
          return;
        }
        openStageChest(st);
      });

      elChestGrid.appendChild(btn);
    });
  }

  function openStageChest(stageCfg) {
    state.openedChests.push(stageCfg.stage);
    state.coins += stageCfg.chestCoins;

    let unlockedNextMsg = "";
    if (stageCfg.stage < STAGE_CONFIG.length && state.maxStageUnlocked === stageCfg.stage) {
      state.maxStageUnlocked = stageCfg.stage + 1;
      state.activeStage = state.maxStageUnlocked;
      unlockedNextMsg = `並正式解鎖「第 ${state.maxStageUnlocked} 階」全新偏旁部首與高難度字庫！`;
    } else {
      unlockedNextMsg = "您已完成全部 8 階漢字造字大師試煉！";
    }

    SoundFX.chest();
    // 開啟寶箱屬於重要進度節點，立即強制上雲同步
    persistState({ immediate: true });
    populateStageDropdown();
    renderAll();

    document.getElementById("chest-modal-title").textContent = `🎉 第 ${stageCfg.stage} 階通關寶箱開啟！`;
    document.getElementById("chest-modal-subtitle").textContent =
      `您已集滿「${stageCfg.title}」全部漢字，${unlockedNextMsg}`;
    document.getElementById("chest-reward-box").innerHTML = `
      <div class="reward-item">🪙 寶箱金幣獎勵：<strong>+${stageCfg.chestCoins} 金幣</strong></div>
      <div class="reward-item">🔓 解鎖權限：<strong>${stageCfg.stage < 8 ? `開放第 ${stageCfg.stage + 1} 階偏旁與漢字` : "全圖鑑制霸榮譽"}</strong></div>
    `;
    document.getElementById("chest-modal").classList.remove("hidden");
  }

  function renderCollection() {
    elCollectionContainer.innerHTML = "";

    let list = [];
    if (currentCollectionTab === "current") {
      list = GameDataHelpers.getCharactersByStage(state.activeStage).filter((c) =>
        state.unlockedChars.includes(c.char)
      );
    } else {
      list = CHARACTER_RECIPES.filter((c) => state.unlockedChars.includes(c.char));
    }

    if (list.length === 0) {
      elCollectionContainer.innerHTML = `
        <div class="empty-hint-msg">
          此分類尚無已合成的漢字。<br/>快在中間造字台拼合偏旁，點亮您的漢字典籍吧！
        </div>`;
      return;
    }

    if (currentCollectionTab === "idioms") {
      list.forEach((item) => {
        const div = document.createElement("div");
        div.className = "idiom-collection-card";
        div.innerHTML = `
          <div class="idiom-card-top">
            <span class="mini-char">${item.char}</span>
            <strong>${item.idiom}</strong>
            <span class="stage-mini">第 ${item.stage} 階</span>
          </div>
          <p>${item.idiomDesc}</p>
        `;
        div.addEventListener("click", () => {
          showResultCard(item);
          SoundFX.click();
        });
        elCollectionContainer.appendChild(div);
      });
      return;
    }

    const grid = document.createElement("div");
    grid.className = "char-collection-grid";
    list.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "char-card";
      if (lastUnlockedResult && lastUnlockedResult.char === item.char) {
        btn.classList.add("active");
      }
      btn.innerHTML = `
        <span class="c-char">${item.char}</span>
        <span class="c-pinyin">${item.pinyin}</span>
        <span class="c-formula">${item.components[0]}+${item.components[1]}</span>
      `;
      btn.addEventListener("click", () => {
        lastUnlockedResult = item;
        showResultCard(item);
        renderCollection();
        SoundFX.click();
      });
      grid.appendChild(btn);
    });
    elCollectionContainer.appendChild(grid);
  }

  function renderHintModal() {
    const stageNum = state.activeStage;
    const stageChars = GameDataHelpers.getCharactersByStage(stageNum);
    const unlockedHints = state.purchasedHints[stageNum] || [];
    const lockedChars = stageChars.filter((c) => !state.unlockedChars.includes(c.char));

    const elHintList = document.getElementById("hint-list");
    const elBuyBtn = document.getElementById("btn-buy-hint");
    const elGotoShop = document.getElementById("btn-goto-shop-from-hint");

    elHintList.innerHTML = "";

    if (unlockedHints.length === 0) {
      elHintList.innerHTML = `<div class="empty-hint-msg">本階級尚未購買任何提示。點擊下方按鈕花費 25 🪙 獲取線索！</div>`;
    } else {
      unlockedHints.forEach((charKey) => {
        const rec = CHARACTER_RECIPES.find((r) => r.char === charKey);
        if (!rec) return;
        const isSolved = state.unlockedChars.includes(rec.char);
        const div = document.createElement("div");
        div.className = "hint-item" + (isSolved ? " solved" : "");
        div.innerHTML = `
          <div class="hint-head">
            <span>${isSolved ? `✅ 已合成：<strong>${rec.char}</strong>（${rec.pinyin}）` : `🔍 目標漢字線索（讀音：${rec.pinyin}）`}</span>
            <span>公式提示：<strong>${rec.components[0]}</strong> + ？</span>
          </div>
          <p class="hint-body">字義提示：${rec.meaning}（成語：${rec.idiom}）</p>
        `;
        elHintList.appendChild(div);
      });
    }

    const unhintedLocked = lockedChars.filter((c) => !unlockedHints.includes(c.char));
    if (lockedChars.length === 0) {
      elBuyBtn.disabled = true;
      elBuyBtn.textContent = "本階級漢字已全部解鎖！";
      elGotoShop.classList.add("hidden");
    } else if (unhintedLocked.length === 0) {
      elBuyBtn.disabled = true;
      elBuyBtn.textContent = "本階級所有未解鎖字提示皆已開啟";
      elGotoShop.classList.add("hidden");
    } else if (state.coins < 25) {
      elBuyBtn.disabled = true;
      elBuyBtn.textContent = `金幣不足（目前 ${state.coins} 🪙，需要 25 🪙）`;
      elGotoShop.classList.remove("hidden");
    } else {
      elBuyBtn.disabled = false;
      elBuyBtn.textContent = `花費 25 🪙 獲取新提示（剩餘 ${unhintedLocked.length} 條）`;
      elGotoShop.classList.add("hidden");
    }
  }

  document.getElementById("btn-buy-hint").addEventListener("click", () => {
    const stageNum = state.activeStage;
    const stageChars = GameDataHelpers.getCharactersByStage(stageNum);
    if (!state.purchasedHints[stageNum]) state.purchasedHints[stageNum] = [];

    const candidates = stageChars.filter(
      (c) => !state.unlockedChars.includes(c.char) && !state.purchasedHints[stageNum].includes(c.char)
    );
    if (candidates.length === 0 || state.coins < 25) return;

    const target = candidates[Math.floor(Math.random() * candidates.length)];
    state.coins -= 25;
    state.purchasedHints[stageNum].push(target.char);
    SoundFX.coin();
    persistState();
    renderHintModal();
  });

  document.getElementById("btn-goto-shop-from-hint").addEventListener("click", () => {
    document.getElementById("hint-modal").classList.add("hidden");
    openShopModal();
  });

  function openShopModal() {
    const activeUser = StorageManager.getActiveUsername();
    const noticeEl = document.getElementById("shop-target-user");
    if (noticeEl) {
      noticeEl.textContent = activeUser
        ? `${activeUser}（儲值後自動同步至雲端，跨裝置通用）`
        : "訪客模式（建議先登入雲端帳號，以免更換裝置遺失金幣）";
    }
    document.getElementById("shop-modal").classList.remove("hidden");
  }

  // 儲值商城與信用卡邏輯
  const elCcNumber = document.getElementById("cc-number");
  const elCcName = document.getElementById("cc-name");
  const elCcExpiry = document.getElementById("cc-expiry");
  const elCcCvv = document.getElementById("cc-cvv");
  const elDetectedNet = document.getElementById("detected-network");
  const elCcError = document.getElementById("cc-error");
  const elSubmitPayBtn = document.getElementById("btn-submit-payment");

  document.querySelectorAll(".package-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".package-card").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedPackage = {
        coins: parseInt(btn.dataset.coins, 10),
        price: parseInt(btn.dataset.price, 10)
      };
      elSubmitPayBtn.textContent = `確認刷卡付款 NT$ ${selectedPackage.price}`;
      SoundFX.click();
    });
  });

  elCcNumber.addEventListener("input", () => {
    elCcNumber.value = PaymentManager.formatCardNumber(elCcNumber.value);
    const info = PaymentManager.detectCardNetwork(elCcNumber.value);
    elDetectedNet.textContent = info.label;

    document.getElementById("badge-visa").classList.toggle("active", info.network === "VISA");
    document.getElementById("badge-mc").classList.toggle("active", info.network === "MASTERCARD");
    document.getElementById("badge-jcb").classList.toggle("active", info.network === "JCB");
  });

  elCcExpiry.addEventListener("input", () => {
    elCcExpiry.value = PaymentManager.formatExpiry(elCcExpiry.value);
  });

  document.querySelectorAll("[data-fill-card]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sample = PaymentManager.TEST_CARDS[btn.dataset.fillCard];
      if (!sample) return;
      elCcNumber.value = sample.number;
      elCcName.value = sample.name;
      elCcExpiry.value = sample.exp;
      elCcCvv.value = sample.cvv;
      elCcNumber.dispatchEvent(new Event("input"));
      elCcError.classList.add("hidden");
      SoundFX.click();
    });
  });

  document.getElementById("credit-card-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    elCcError.classList.add("hidden");
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

    updateHeaderStatus();
    SoundFX.coin();

    document.getElementById("shop-modal").classList.add("hidden");
    setFeedback(
      `💳 ${res.receipt.network} 末四碼 ${res.receipt.last4} 刷卡成功！已儲值 ${res.receipt.coinsAdded} 🪙 金幣並同步雲端。`,
      "success"
    );
  });

  // 帳號與跨裝置雲端存檔管理彈窗
  function renderAuthModal() {
    const activeUser = StorageManager.getActiveUsername();
    document.getElementById("auth-active-user").textContent = activeUser
      ? `${activeUser}（已登入雲端帳號，支援跨裝置同步）`
      : "訪客（僅本機裝置暫存）";
    document.getElementById("auth-stats-summary").textContent =
      `已解鎖 ${state.unlockedChars.length} 字・最高第 ${state.maxStageUnlocked} 階・${state.coins} 🪙`;

    const accounts = StorageManager.listSavedAccounts();
    const listEl = document.getElementById("saved-accounts-list");
    if (accounts.length === 0) {
      listEl.innerHTML = `<div class="empty-hint-msg">此裝置尚無登入紀錄，在上方輸入帳號與密碼即可登入或註冊！</div>`;
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
        <button type="button" class="mini-btn" data-fill-user="${acc.username}">填入帳號登入</button>
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
        const msgEl = document.getElementById("auth-msg");
        msgEl.textContent = `已填入帳號「${btn.dataset.fillUser}」，請輸入密碼後點擊「登入帳號」。`;
        msgEl.className = "form-info";
        msgEl.classList.remove("hidden");
      });
    });
  }

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
      populateStageDropdown();
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
    btn.textContent = "註冊新帳號（上傳目前進度）";

    msgEl.textContent = res.message;
    msgEl.className = res.ok ? "form-info" : "form-error";
    msgEl.classList.remove("hidden");

    if (res.ok) {
      state = res.progress;
      populateStageDropdown();
      renderAll();
      renderAuthModal();
      setFeedback(`☁️ 雲端帳號「${res.username}」建立成功！`, "success");
    }
  });

  document.getElementById("btn-logout-guest").addEventListener("click", () => {
    state = StorageManager.logoutToGuest();
    populateStageDropdown();
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
        populateStageDropdown();
        renderAll();
        renderAuthModal();
      }
    });
  });

  // 頁面關閉或切換分頁前，若已登入雲端帳號則立即推送最新狀態
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && StorageManager.isCloudLoggedIn()) {
      StorageManager.saveCloudDataNow(state);
    }
  });

  // 全域按鈕綁定
  document.getElementById("btn-forge").addEventListener("click", executeForge);
  document.getElementById("btn-swap").addEventListener("click", () => {
    selectedSlots = [selectedSlots[1], selectedSlots[0]];
    SoundFX.click();
    renderSlots();
  });
  document.getElementById("btn-clear-slots").addEventListener("click", () => {
    selectedSlots = [null, null];
    SoundFX.click();
    renderSlots();
    renderRadicals();
  });

  elStageSelect.addEventListener("change", () => {
    state.activeStage = parseInt(elStageSelect.value, 10);
    persistState();
    renderAll();
  });

  elRadicalSearch.addEventListener("input", renderRadicals);
  document.getElementById("btn-clear-search").addEventListener("click", () => {
    elRadicalSearch.value = "";
    renderRadicals();
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCollectionTab = btn.dataset.filter;
      renderCollection();
      SoundFX.click();
    });
  });

  document.getElementById("btn-open-hint").addEventListener("click", () => {
    renderHintModal();
    document.getElementById("hint-modal").classList.remove("hidden");
  });
  document.getElementById("btn-open-shop").addEventListener("click", openShopModal);
  document.getElementById("btn-open-auth").addEventListener("click", () => {
    renderAuthModal();
    document.getElementById("auth-modal").classList.remove("hidden");
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.close).classList.add("hidden");
    });
  });

  function renderAll() {
    updateHeaderStatus();
    renderRadicals();
    renderSlots();
    renderChests();
    renderCollection();
  }

  // 初始化畫面
  populateStageDropdown();
  renderAll();

  // 開機時自動向雲端拉取最新進度（跨裝置同步）
  StorageManager.syncFromCloudOnBoot().then((cloudState) => {
    if (cloudState) {
      state = cloudState;
      populateStageDropdown();
      renderAll();
    }
  });
})();
