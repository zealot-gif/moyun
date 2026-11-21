/**
 * 墨韻活字工坊 - 全 110 階正體造字資料庫與偏旁字理規則
 */

const RADICAL_TRANSFORMS = {
  "水": {
    "left": "氵",
    "bottom": "灬",
    "desc": "作左偏旁時變為「氵」（三點水）"
  },
  "人": {
    "left": "亻",
    "desc": "作左偏旁時變為「亻」（單人旁）"
  },
  "手": {
    "left": "扌",
    "desc": "作左偏旁時變為「扌」（提手旁）"
  },
  "心": {
    "left": "忄",
    "desc": "作左偏旁時變為「忄」（豎心旁）"
  },
  "言": {
    "left": "訁",
    "desc": "作左偏旁時變為「訁」（言字旁）"
  },
  "金": {
    "left": "釒",
    "desc": "作左偏旁時變為「釒」（金字旁）"
  },
  "糸": {
    "left": "糹",
    "desc": "作左偏旁時變為「糹」（絞絲旁）"
  },
  "示": {
    "left": "礻",
    "desc": "作左偏旁時變為「礻」（示字旁）"
  },
  "衣": {
    "left": "衤",
    "desc": "作左偏旁時變為「衤」（衣字旁）"
  },
  "犬": {
    "left": "犬",
    "desc": "作左偏旁時變為「犭」（反犬旁）"
  },
  "牛": {
    "left": "牜",
    "desc": "作左偏旁時變為「牜」（牛字旁）"
  },
  "食": {
    "left": "飠",
    "desc": "作左偏旁時變為「飠」（食字旁）"
  },
  "足": {
    "left": "⻊",
    "desc": "作左偏旁時變為「⻊」（足字旁）"
  },
  "刀": {
    "right": "刂",
    "desc": "作右偏旁時常變為「刂」（立刀旁）"
  },
  "邑": {
    "right": "阝",
    "desc": "作右偏旁時變為「阝」（右耳旁）"
  },
  "阜": {
    "left": "阝",
    "desc": "作左偏旁時變為「阝」（左耳旁）"
  },
  "艸": {
    "top": "艹",
    "desc": "作字頭時變為「艹」（草字頭）"
  },
  "竹": {
    "top": "⺮",
    "desc": "作字頭時變為「⺮」（竹字頭）"
  },
  "爪": {
    "top": "爫",
    "desc": "作字頭時變為「爫」（爪字頭）"
  },
  "西": {
    "top": "覀",
    "desc": "作字頭時變為「覀」（西字頭）"
  },
  "乙": {
    "right": "乚",
    "bottom": "乚",
    "desc": "作右或底部部件時舒展為「乚」（豎彎鉤）"
  },
  "火": {
    "bottom": "灬",
    "desc": "作字底時常變為「灬」（四點底）"
  },
  "冰": {
    "left": "冫",
    "desc": "作左偏旁時為「冫」（兩點水）"
  },
  "肉": {
    "left": "月",
    "bottom": "月",
    "desc": "作偏旁時常寫作「月」（肉月旁）"
  }
};

const STAGES_DATA = [
  {
    "stage": 1,
    "title": "萬物之始",
    "subtitle": "自然六象",
    "components": [
      "日",
      "月",
      "木",
      "水",
      "火",
      "土"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 60,
    "targets": [
      {
        "char": "明",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "月"
          ]
        ],
        "twin": "朙",
        "hint": "日月齊輝，光明磊落（左右並列）"
      },
      {
        "char": "朙",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "月"
          ]
        ],
        "twin": "明",
        "hint": "「明」的古字，日上月下（上下疊放）"
      },
      {
        "char": "林",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "木"
          ]
        ],
        "hint": "雙木成林"
      },
      {
        "char": "森",
        "layout": "tri",
        "recipes": [
          [
            "木",
            "木",
            "木"
          ],
          [
            "林",
            "木"
          ]
        ],
        "hint": "三木成森，或林中再添一木"
      },
      {
        "char": "炎",
        "layout": "tb",
        "recipes": [
          [
            "火",
            "火"
          ]
        ],
        "twin": "炏",
        "hint": "雙火上下相疊，熾熱無比"
      },
      {
        "char": "炏",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "火"
          ]
        ],
        "twin": "炎",
        "hint": "雙火左右並排，火光閃耀"
      },
      {
        "char": "焱",
        "layout": "tri",
        "recipes": [
          [
            "火",
            "火",
            "火"
          ],
          [
            "炎",
            "火"
          ]
        ],
        "hint": "三火成焱，火花四射"
      },
      {
        "char": "圭",
        "layout": "tb",
        "recipes": [
          [
            "土",
            "土"
          ]
        ],
        "hint": "雙土上下相疊，古代玉器名"
      },
      {
        "char": "垚",
        "layout": "tri",
        "recipes": [
          [
            "土",
            "土",
            "土"
          ],
          [
            "圭",
            "土"
          ]
        ],
        "hint": "三土成垚，山高之貌"
      },
      {
        "char": "杳",
        "layout": "tb",
        "recipes": [
          [
            "木",
            "日"
          ]
        ],
        "twin": "杲",
        "hint": "日落木下，昏暗幽遠（木上日下）"
      },
      {
        "char": "杲",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "木"
          ]
        ],
        "twin": "杳",
        "hint": "日升木上，明亮高遠（日上木下）"
      },
      {
        "char": "沐",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "木"
          ]
        ],
        "hint": "以水潤木，洗髮沐浴"
      },
      {
        "char": "焚",
        "layout": "tb",
        "recipes": [
          [
            "林",
            "火"
          ],
          [
            "木",
            "木",
            "火"
          ]
        ],
        "hint": "林下起火，焚燒山林"
      },
      {
        "char": "淼",
        "layout": "tri",
        "recipes": [
          [
            "水",
            "水",
            "水"
          ]
        ],
        "hint": "三水成淼，水勢浩大"
      },
      {
        "char": "㵘",
        "layout": "quad",
        "recipes": [
          [
            "水",
            "水",
            "水",
            "水"
          ],
          [
            "淼",
            "水"
          ]
        ],
        "hint": "四水成㵘，大水漫漫"
      },
      {
        "char": "晶",
        "layout": "tri",
        "recipes": [
          [
            "日",
            "日",
            "日"
          ]
        ],
        "hint": "三日成晶，光輝璀璨"
      }
    ]
  },
  {
    "stage": 2,
    "title": "人類與身體",
    "subtitle": "自我覺察",
    "components": [
      "人",
      "口",
      "手",
      "心",
      "女"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 70,
    "targets": [
      {
        "char": "休",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "木"
          ]
        ],
        "hint": "人倚木旁，歇息片刻"
      },
      {
        "char": "從",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "人"
          ]
        ],
        "hint": "一人隨一人，跟從相隨"
      },
      {
        "char": "眾",
        "layout": "tri",
        "recipes": [
          [
            "人",
            "人",
            "人"
          ],
          [
            "從",
            "人"
          ]
        ],
        "hint": "三人成眾，人群聚集"
      },
      {
        "char": "吅",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "口"
          ]
        ],
        "hint": "雙口並排，喧嘩之聲"
      },
      {
        "char": "品",
        "layout": "tri",
        "recipes": [
          [
            "口",
            "口",
            "口"
          ],
          [
            "吅",
            "口"
          ]
        ],
        "hint": "三口成品，品茗評鑑"
      },
      {
        "char": "杏",
        "layout": "tb",
        "recipes": [
          [
            "木",
            "口"
          ]
        ],
        "twin": "呆",
        "hint": "木上口下，春日杏花"
      },
      {
        "char": "呆",
        "layout": "tb",
        "recipes": [
          [
            "口",
            "木"
          ]
        ],
        "twin": "杏",
        "hint": "口上木下，發愣出神"
      },
      {
        "char": "扣",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "口"
          ]
        ],
        "hint": "以手相扣，扣門詢問"
      },
      {
        "char": "如",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "口"
          ]
        ],
        "hint": "女子從口，順從相似"
      },
      {
        "char": "伙",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "火"
          ]
        ],
        "hint": "人與火伴，同伴伙計"
      },
      {
        "char": "淡",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "炎"
          ],
          [
            "水",
            "火",
            "火"
          ]
        ],
        "hint": "水克炎火，清淡平靜"
      },
      {
        "char": "沁",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "心"
          ]
        ],
        "hint": "水入心脾，沁人心肺"
      }
    ]
  },
  {
    "stage": 3,
    "title": "居所與邊界",
    "subtitle": "文明萌芽",
    "components": [
      "宀",
      "門",
      "囗",
      "田",
      "石"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 80,
    "targets": [
      {
        "char": "安",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "女"
          ]
        ],
        "hint": "家中有女，歲月靜安"
      },
      {
        "char": "悶",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "心"
          ]
        ],
        "hint": "心鎖門內，煩悶鬱結"
      },
      {
        "char": "問",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "口"
          ]
        ],
        "hint": "口在門中，叩門請問"
      },
      {
        "char": "間",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "日"
          ]
        ],
        "hint": "日照門縫，時間空間"
      },
      {
        "char": "閃",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "人"
          ]
        ],
        "hint": "人在門中一晃而過"
      },
      {
        "char": "囚",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "人"
          ]
        ],
        "hint": "人困四壁之中"
      },
      {
        "char": "困",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "木"
          ]
        ],
        "hint": "木受方框圍困"
      },
      {
        "char": "回",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "口"
          ]
        ],
        "hint": "大口包小口，迂迴返回"
      },
      {
        "char": "畑",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "田"
          ]
        ],
        "hint": "火耕旱田"
      },
      {
        "char": "思",
        "layout": "tb",
        "recipes": [
          [
            "田",
            "心"
          ]
        ],
        "hint": "心念田野，深沉思索"
      },
      {
        "char": "磊",
        "layout": "tri",
        "recipes": [
          [
            "石",
            "石",
            "石"
          ]
        ],
        "hint": "三石成磊，光明磊落"
      }
    ]
  },
  {
    "stage": 4,
    "title": "空間與觀察",
    "subtitle": "移動凝視",
    "components": [
      "辶",
      "山",
      "目",
      "少",
      "白"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 80,
    "targets": [
      {
        "char": "相",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "目"
          ]
        ],
        "hint": "目視林木，相互觀察"
      },
      {
        "char": "想",
        "layout": "tb",
        "recipes": [
          [
            "相",
            "心"
          ],
          [
            "木",
            "目",
            "心"
          ]
        ],
        "hint": "心中有相，思念想像"
      },
      {
        "char": "省",
        "layout": "tb",
        "recipes": [
          [
            "少",
            "目"
          ]
        ],
        "hint": "少目細察，反省節省"
      },
      {
        "char": "沙",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "少"
          ]
        ],
        "hint": "水少石現，細沙如塵"
      },
      {
        "char": "吵",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "少"
          ]
        ],
        "hint": "口舌爭執，喧鬧吵雜"
      },
      {
        "char": "砂",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "少"
          ]
        ],
        "hint": "細小碎石，砂礫成堆"
      },
      {
        "char": "炒",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "少"
          ]
        ],
        "hint": "少火快翻，烹飪翻炒"
      },
      {
        "char": "妙",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "少"
          ]
        ],
        "hint": "少女靈動，巧妙絕倫"
      },
      {
        "char": "抄",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "少"
          ]
        ],
        "hint": "手錄少許，謄寫抄錄"
      },
      {
        "char": "怕",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "白"
          ]
        ],
        "hint": "心驚面色發白，畏懼害怕"
      },
      {
        "char": "拍",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "白"
          ]
        ],
        "hint": "手掌相擊，拍打節奏"
      },
      {
        "char": "迫",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "白"
          ]
        ],
        "hint": "急步逼近，緊迫從容"
      },
      {
        "char": "仙",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "山"
          ]
        ],
        "hint": "人在山中修道成仙"
      },
      {
        "char": "岩",
        "layout": "tb",
        "recipes": [
          [
            "山",
            "石"
          ]
        ],
        "hint": "山崖巨石，岩石峭壁"
      }
    ]
  },
  {
    "stage": 5,
    "title": "語言與大小",
    "subtitle": "社交誕生",
    "components": [
      "言",
      "子",
      "大",
      "小",
      "天"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 90,
    "targets": [
      {
        "char": "好",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "子"
          ]
        ],
        "hint": "女子抱子，美好安好"
      },
      {
        "char": "字",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "子"
          ]
        ],
        "hint": "屋簷下育子，孳乳文字"
      },
      {
        "char": "李",
        "layout": "tb",
        "recipes": [
          [
            "木",
            "子"
          ]
        ],
        "hint": "木上結子，桃李滿門"
      },
      {
        "char": "信",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "言"
          ]
        ],
        "hint": "人言為信，誠實守信"
      },
      {
        "char": "誩",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "言"
          ]
        ],
        "hint": "雙言並立，競相爭辯"
      },
      {
        "char": "尖",
        "layout": "tb",
        "recipes": [
          [
            "小",
            "大"
          ]
        ],
        "hint": "上小下大，銳利尖端"
      },
      {
        "char": "因",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "大"
          ]
        ],
        "hint": "大在框中，因果緣由"
      },
      {
        "char": "吞",
        "layout": "tb",
        "recipes": [
          [
            "天",
            "口"
          ]
        ],
        "hint": "天在口上，吞吐天地（注意「天」非「夭」）"
      },
      {
        "char": "保",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "呆"
          ],
          [
            "人",
            "口",
            "木"
          ]
        ],
        "hint": "人護稚子，保護守衛"
      },
      {
        "char": "這",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "言"
          ]
        ],
        "hint": "正體字「這」，由辵部與言組成"
      }
    ]
  },
  {
    "stage": 6,
    "title": "植物與農耕",
    "subtitle": "生命繁衍",
    "components": [
      "艹",
      "世",
      "禾",
      "竹",
      "雨"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 90,
    "targets": [
      {
        "char": "葉",
        "layout": "tri",
        "recipes": [
          [
            "艹",
            "世",
            "木"
          ]
        ],
        "hint": "草字頭下「世」與「木」，枝葉繁茂"
      },
      {
        "char": "苗",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "田"
          ]
        ],
        "hint": "田間初生之草，禾苗茁壯"
      },
      {
        "char": "茶",
        "layout": "tri",
        "recipes": [
          [
            "艹",
            "人",
            "木"
          ]
        ],
        "hint": "人在草木之間，採茶品茗"
      },
      {
        "char": "秋",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "火"
          ]
        ],
        "hint": "禾穀成熟如火，金秋時節"
      },
      {
        "char": "和",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "口"
          ]
        ],
        "twin": "咊",
        "hint": "禾左口右，和諧相應"
      },
      {
        "char": "咊",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "禾"
          ]
        ],
        "twin": "和",
        "hint": "口左禾右，「和」之異體古字"
      },
      {
        "char": "香",
        "layout": "tb",
        "recipes": [
          [
            "禾",
            "日"
          ]
        ],
        "hint": "禾穀沐日，散發芬芳"
      },
      {
        "char": "雷",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "田"
          ]
        ],
        "hint": "雨落田野，春雷震響"
      },
      {
        "char": "霜",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "相"
          ],
          [
            "雨",
            "木",
            "目"
          ]
        ],
        "hint": "雨氣凝於草木之上，秋霜皎潔"
      }
    ]
  },
  {
    "stage": 7,
    "title": "動物與生態",
    "subtitle": "形聲初成",
    "components": [
      "虫",
      "魚",
      "鳥",
      "馬",
      "羊"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 100,
    "targets": [
      {
        "char": "鮮",
        "layout": "lr",
        "recipes": [
          [
            "魚",
            "羊"
          ]
        ],
        "hint": "魚與羊同烹，滋味鮮美"
      },
      {
        "char": "鳴",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "鳥"
          ]
        ],
        "hint": "鳥張口而啼，鳥鳴清脆"
      },
      {
        "char": "島",
        "layout": "enc",
        "recipes": [
          [
            "鳥",
            "山"
          ]
        ],
        "hint": "海中高山，飛鳥棲息"
      },
      {
        "char": "媽",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "馬"
          ]
        ],
        "hint": "女旁馬聲，慈愛母親"
      },
      {
        "char": "嗎",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "馬"
          ]
        ],
        "hint": "口旁馬聲，疑問語氣"
      },
      {
        "char": "闖",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "馬"
          ]
        ],
        "hint": "駿馬衝入門內，勇闖天涯"
      },
      {
        "char": "洋",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "羊"
          ]
        ],
        "hint": "水勢廣大，汪洋大海"
      },
      {
        "char": "美",
        "layout": "tb",
        "recipes": [
          [
            "羊",
            "大"
          ]
        ],
        "hint": "羊大為美，甘美華麗"
      },
      {
        "char": "閩",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "虫"
          ]
        ],
        "hint": "門中有虫，八閩大地"
      },
      {
        "char": "蠱",
        "layout": "tri",
        "recipes": [
          [
            "虫",
            "虫",
            "虫"
          ]
        ],
        "hint": "三虫相聚，神秘巫蠱"
      }
    ]
  },
  {
    "stage": 8,
    "title": "度量與黏著",
    "subtitle": "萬用字根",
    "components": [
      "寸",
      "力",
      "工",
      "干",
      "十"
    ],
    "unlockThreshold": 8,
    "chestRewardCoins": 100,
    "targets": [
      {
        "char": "村",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "寸"
          ]
        ],
        "hint": "林木聚落，鄉村田園"
      },
      {
        "char": "寺",
        "layout": "tb",
        "recipes": [
          [
            "土",
            "寸"
          ]
        ],
        "hint": "土下有寸，古剎佛寺"
      },
      {
        "char": "時",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "寺"
          ],
          [
            "日",
            "土",
            "寸"
          ]
        ],
        "hint": "日照古寺，光陰流轉"
      },
      {
        "char": "守",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "寸"
          ]
        ],
        "hint": "屋下法度，堅守守護"
      },
      {
        "char": "討",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "寸"
          ]
        ],
        "hint": "以言論法度，探討征討"
      },
      {
        "char": "男",
        "layout": "tb",
        "recipes": [
          [
            "田",
            "力"
          ]
        ],
        "hint": "田間出力耕作，男子漢"
      },
      {
        "char": "功",
        "layout": "lr",
        "recipes": [
          [
            "工",
            "力"
          ]
        ],
        "hint": "百工盡力，功績成就"
      },
      {
        "char": "加",
        "layout": "lr",
        "recipes": [
          [
            "力",
            "口"
          ]
        ],
        "twin": "另",
        "hint": "力左口右，增添附加"
      },
      {
        "char": "另",
        "layout": "tb",
        "recipes": [
          [
            "口",
            "力"
          ]
        ],
        "twin": "加",
        "hint": "口上力下，另外其他"
      },
      {
        "char": "虹",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "工"
          ]
        ],
        "hint": "雨後長虹，如龍飲水"
      },
      {
        "char": "江",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "工"
          ]
        ],
        "hint": "大水奔流，長江大河"
      },
      {
        "char": "汗",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "干"
          ]
        ],
        "hint": "勞作流出的水珠"
      },
      {
        "char": "旱",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "干"
          ]
        ],
        "twin": "旰",
        "hint": "日上干下，久晴無雨"
      },
      {
        "char": "旰",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "干"
          ]
        ],
        "twin": "旱",
        "hint": "日左干右，日暮晚景"
      },
      {
        "char": "早",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "十"
          ]
        ],
        "hint": "日出於十，清晨早起"
      },
      {
        "char": "古",
        "layout": "tb",
        "recipes": [
          [
            "十",
            "口"
          ]
        ],
        "hint": "十口相傳，遠古歷史"
      },
      {
        "char": "苦",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "古"
          ],
          [
            "艹",
            "十",
            "口"
          ]
        ],
        "hint": "古老草藥，味苦良藥"
      },
      {
        "char": "計",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "十"
          ]
        ],
        "hint": "言語計算，謀略計畫"
      }
    ]
  },
  {
    "stage": 9,
    "title": "色彩與工具",
    "subtitle": "二階合成",
    "components": [
      "青",
      "欠",
      "金",
      "糸",
      "合"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 110,
    "targets": [
      {
        "char": "清",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "青"
          ]
        ],
        "hint": "水色青瑩，清澈透明"
      },
      {
        "char": "晴",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "青"
          ]
        ],
        "hint": "青天白日，雨過天晴"
      },
      {
        "char": "情",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "青"
          ]
        ],
        "hint": "心中真意，情感深厚"
      },
      {
        "char": "請",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "青"
          ]
        ],
        "hint": "出言相邀，禮貌請求"
      },
      {
        "char": "吹",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "欠"
          ]
        ],
        "hint": "張口吐氣，吹拂風聲"
      },
      {
        "char": "砍",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "欠"
          ]
        ],
        "hint": "以石斧劈砍"
      },
      {
        "char": "針",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "十"
          ]
        ],
        "hint": "金屬細如十字針尖"
      },
      {
        "char": "紅",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "工"
          ]
        ],
        "hint": "絲織染成赤紅之色"
      },
      {
        "char": "細",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "田"
          ]
        ],
        "hint": "絲縷微細如田紋"
      },
      {
        "char": "給",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "合"
          ]
        ],
        "hint": "絲線相合，供給給予"
      },
      {
        "char": "哈",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "合"
          ]
        ],
        "hint": "張口而笑，哈哈大笑"
      },
      {
        "char": "拿",
        "layout": "tb",
        "recipes": [
          [
            "合",
            "手"
          ]
        ],
        "hint": "合手抓取，掌握拿取"
      }
    ]
  },
  {
    "stage": 10,
    "title": "萬象歸一",
    "subtitle": "初階宗師",
    "components": [
      "鬼",
      "示",
      "衣",
      "戈",
      "云"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 150,
    "targets": [
      {
        "char": "魂",
        "layout": "lr",
        "recipes": [
          [
            "云",
            "鬼"
          ]
        ],
        "hint": "雲氣與鬼神相合，靈魂飄渺"
      },
      {
        "char": "雲",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "云"
          ]
        ],
        "hint": "雨氣上騰為云，化作彩雲"
      },
      {
        "char": "魄",
        "layout": "lr",
        "recipes": [
          [
            "白",
            "鬼"
          ]
        ],
        "hint": "月白之光，魂魄氣魄"
      },
      {
        "char": "社",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "土"
          ]
        ],
        "hint": "祭祀土地之神，社稷村社"
      },
      {
        "char": "找",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "戈"
          ]
        ],
        "hint": "手持干戈，尋找追尋"
      },
      {
        "char": "伐",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "戈"
          ]
        ],
        "hint": "人持戈矛，征伐砍伐"
      },
      {
        "char": "戔",
        "layout": "tb",
        "recipes": [
          [
            "戈",
            "戈"
          ]
        ],
        "hint": "雙戈相疊，微少精巧"
      },
      {
        "char": "淺",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "戔"
          ],
          [
            "水",
            "戈",
            "戈"
          ]
        ],
        "hint": "水少而淺，深淺清淺"
      },
      {
        "char": "錢",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "戔"
          ],
          [
            "金",
            "戈",
            "戈"
          ]
        ],
        "hint": "金屬鑄幣，金錢財富"
      },
      {
        "char": "泉",
        "layout": "tb",
        "recipes": [
          [
            "白",
            "水"
          ]
        ],
        "hint": "清白之水湧出，甘泉清泉"
      },
      {
        "char": "線",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "泉"
          ],
          [
            "糸",
            "白",
            "水"
          ]
        ],
        "hint": "絲縷如泉水綿延，針線絲線"
      }
    ]
  },
  {
    "stage": 11,
    "title": "方位與上下",
    "subtitle": "空間座標",
    "components": [
      "上",
      "下",
      "中",
      "左",
      "右"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 80,
    "targets": [
      {
        "char": "卡",
        "layout": "tb",
        "recipes": [
          [
            "上",
            "下"
          ]
        ],
        "hint": "不上不下，卡在中間"
      },
      {
        "char": "忠",
        "layout": "tb",
        "recipes": [
          [
            "中",
            "心"
          ]
        ],
        "hint": "心存中正，忠誠不二"
      },
      {
        "char": "忐",
        "layout": "tb",
        "recipes": [
          [
            "上",
            "心"
          ]
        ],
        "hint": "心浮於上，忐忑不安"
      },
      {
        "char": "忑",
        "layout": "tb",
        "recipes": [
          [
            "下",
            "心"
          ]
        ],
        "hint": "心沉於下，忐忑難安"
      },
      {
        "char": "仲",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "中"
          ]
        ],
        "hint": "排行居中，伯仲之間"
      },
      {
        "char": "沖",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "中"
          ]
        ],
        "hint": "水流湧動，沖刷向前"
      },
      {
        "char": "种",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "中"
          ]
        ],
        "hint": "禾苗初生，姓氏「种」"
      },
      {
        "char": "佐",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "左"
          ]
        ],
        "hint": "人在左側輔助，佐助"
      },
      {
        "char": "佑",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "右"
          ]
        ],
        "hint": "人在右側護持，保佑"
      },
      {
        "char": "祐",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "右"
          ]
        ],
        "hint": "神明庇護，福祐吉祥"
      },
      {
        "char": "若",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "右"
          ]
        ],
        "hint": "草木順從，宛若倘若"
      }
    ]
  },
  {
    "stage": 12,
    "title": "筆畫與符號",
    "subtitle": "點劃生輝",
    "components": [
      "一",
      "二",
      "三",
      "八",
      "丶"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 80,
    "targets": [
      {
        "char": "王",
        "layout": "tb",
        "recipes": [
          [
            "干",
            "一"
          ],
          [
            "一",
            "土"
          ]
        ],
        "hint": "三橫貫通天地人，王者風範"
      },
      {
        "char": "玉",
        "layout": "enc",
        "recipes": [
          [
            "王",
            "丶"
          ]
        ],
        "hint": "王者腰間佩美玉"
      },
      {
        "char": "主",
        "layout": "tb",
        "recipes": [
          [
            "丶",
            "王"
          ]
        ],
        "hint": "燈火一點居王上，一家之主"
      },
      {
        "char": "注",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "主"
          ]
        ],
        "hint": "水流灌注，專注精神"
      },
      {
        "char": "住",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "主"
          ]
        ],
        "hint": "人有安身之主，居住停留"
      },
      {
        "char": "柱",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "主"
          ]
        ],
        "hint": "支撐屋宇的主幹木柱"
      },
      {
        "char": "駐",
        "layout": "lr",
        "recipes": [
          [
            "馬",
            "主"
          ]
        ],
        "hint": "駿馬停駐，駐守紮營"
      },
      {
        "char": "太",
        "layout": "tb",
        "recipes": [
          [
            "大",
            "丶"
          ]
        ],
        "hint": "大下添一點，太極至大（注意與「犬」點位不同）"
      },
      {
        "char": "犬",
        "layout": "enc",
        "recipes": [
          [
            "大",
            "丶"
          ]
        ],
        "hint": "大旁右上添一點，忠犬獵犬"
      },
      {
        "char": "旦",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "一"
          ]
        ],
        "hint": "紅日躍出地平線，元旦破曉"
      },
      {
        "char": "但",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "旦"
          ]
        ],
        "hint": "人立於破曉，但是轉折"
      },
      {
        "char": "仁",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "二"
          ]
        ],
        "hint": "二人相親，仁愛之心"
      },
      {
        "char": "叭",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "八"
          ]
        ],
        "hint": "口左八右，喇叭聲響"
      },
      {
        "char": "只",
        "layout": "tb",
        "recipes": [
          [
            "口",
            "八"
          ]
        ],
        "hint": "口上八下，只有一隻"
      }
    ]
  },
  {
    "stage": 13,
    "title": "五官與形體",
    "subtitle": "感官覺醒",
    "components": [
      "耳",
      "舌",
      "牙",
      "皮",
      "毛"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 80,
    "targets": [
      {
        "char": "聞",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "耳"
          ]
        ],
        "hint": "耳貼門扉，聽聞消息"
      },
      {
        "char": "恥",
        "layout": "lr",
        "recipes": [
          [
            "耳",
            "心"
          ]
        ],
        "hint": "耳聞過失而心愧，知恥"
      },
      {
        "char": "聶",
        "layout": "tri",
        "recipes": [
          [
            "耳",
            "耳",
            "耳"
          ]
        ],
        "hint": "三耳相聚，附耳低語"
      },
      {
        "char": "話",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "舌"
          ]
        ],
        "hint": "動舌而言，說話談話"
      },
      {
        "char": "活",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "舌"
          ]
        ],
        "hint": "舌有津液水潤，生機活潑"
      },
      {
        "char": "恬",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "舌"
          ]
        ],
        "hint": "心安口淡，恬靜淡泊"
      },
      {
        "char": "芽",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "牙"
          ]
        ],
        "hint": "草木初萌如嫩牙"
      },
      {
        "char": "呀",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "牙"
          ]
        ],
        "hint": "張口驚呼，哎呀一聲"
      },
      {
        "char": "鴉",
        "layout": "lr",
        "recipes": [
          [
            "牙",
            "鳥"
          ]
        ],
        "hint": "烏鴉啼鳴，牙旁鳥形"
      },
      {
        "char": "波",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "皮"
          ]
        ],
        "hint": "水面皺起如皮紋，波浪"
      },
      {
        "char": "破",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "皮"
          ]
        ],
        "hint": "石裂皮開，破碎突破"
      },
      {
        "char": "被",
        "layout": "lr",
        "recipes": [
          [
            "衣",
            "皮"
          ]
        ],
        "hint": "披覆身軀的衣被"
      },
      {
        "char": "披",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "皮"
          ]
        ],
        "hint": "以手披衣，披荊斬棘"
      },
      {
        "char": "坡",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "皮"
          ]
        ],
        "hint": "大地起伏的山坡"
      },
      {
        "char": "毳",
        "layout": "tri",
        "recipes": [
          [
            "毛",
            "毛",
            "毛"
          ]
        ],
        "hint": "三毛相疊，鳥獸細毛"
      }
    ]
  },
  {
    "stage": 14,
    "title": "行走與視聽",
    "subtitle": "步履不停",
    "components": [
      "止",
      "走",
      "立",
      "見",
      "頁"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 80,
    "targets": [
      {
        "char": "正",
        "layout": "tb",
        "recipes": [
          [
            "一",
            "止"
          ]
        ],
        "hint": "止於一線，端正正直"
      },
      {
        "char": "是",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "正"
          ],
          [
            "日",
            "一",
            "止"
          ]
        ],
        "hint": "日下端正，是非真理"
      },
      {
        "char": "証",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "正"
          ]
        ],
        "hint": "正言為証，憑據證明"
      },
      {
        "char": "步",
        "layout": "tb",
        "recipes": [
          [
            "止",
            "少"
          ]
        ],
        "hint": "雙足前後交替，邁步向前"
      },
      {
        "char": "趕",
        "layout": "enc",
        "recipes": [
          [
            "走",
            "旱"
          ]
        ],
        "hint": "急走追趕，趕路赴約"
      },
      {
        "char": "位",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "立"
          ]
        ],
        "hint": "人所站立之處，位置職位"
      },
      {
        "char": "泣",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "立"
          ]
        ],
        "hint": "無聲落淚，低聲哭泣"
      },
      {
        "char": "音",
        "layout": "tb",
        "recipes": [
          [
            "立",
            "日"
          ]
        ],
        "hint": "言中含一（立下有日），聲音音樂"
      },
      {
        "char": "暗",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "音"
          ]
        ],
        "hint": "日無光而晦暗"
      },
      {
        "char": "意",
        "layout": "tb",
        "recipes": [
          [
            "音",
            "心"
          ]
        ],
        "hint": "心中有音，心意想法"
      },
      {
        "char": "視",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "見"
          ]
        ],
        "hint": "神明昭示所見，注視觀察"
      },
      {
        "char": "現",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "見"
          ]
        ],
        "hint": "美玉光澤顯現，現在出現"
      },
      {
        "char": "項",
        "layout": "lr",
        "recipes": [
          [
            "工",
            "頁"
          ]
        ],
        "hint": "頸項項目，工旁頁形"
      },
      {
        "char": "題",
        "layout": "enc",
        "recipes": [
          [
            "是",
            "頁"
          ]
        ],
        "hint": "額頭題目，是旁頁形"
      }
    ]
  },
  {
    "stage": 15,
    "title": "門戶與器皿",
    "subtitle": "日用百器",
    "components": [
      "戶",
      "方",
      "皿",
      "瓦",
      "缶"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 90,
    "targets": [
      {
        "char": "房",
        "layout": "enc",
        "recipes": [
          [
            "戶",
            "方"
          ]
        ],
        "hint": "門戶之旁，房屋廂房"
      },
      {
        "char": "妒",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "戶"
          ]
        ],
        "hint": "女子守戶生猜忌，嫉妒"
      },
      {
        "char": "芳",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "方"
          ]
        ],
        "hint": "花草芬芳，芳華絕代"
      },
      {
        "char": "訪",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "方"
          ]
        ],
        "hint": "出言詢問，拜訪探訪"
      },
      {
        "char": "紡",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "方"
          ]
        ],
        "hint": "紡織絲線，紡紗織布"
      },
      {
        "char": "枋",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "方"
          ]
        ],
        "hint": "方形木材，門枋樑枋"
      },
      {
        "char": "孟",
        "layout": "tb",
        "recipes": [
          [
            "子",
            "皿"
          ]
        ],
        "hint": "子居器皿之上，孟春長子"
      },
      {
        "char": "盒",
        "layout": "tb",
        "recipes": [
          [
            "合",
            "皿"
          ]
        ],
        "hint": "器皿上下相合，錦盒木盒"
      },
      {
        "char": "盅",
        "layout": "tb",
        "recipes": [
          [
            "中",
            "皿"
          ]
        ],
        "hint": "小巧酒杯，茶盅酒盅"
      },
      {
        "char": "缸",
        "layout": "lr",
        "recipes": [
          [
            "缶",
            "工"
          ]
        ],
        "hint": "陶製大器，水缸米缸"
      }
    ]
  },
  {
    "stage": 16,
    "title": "刀斤車矢",
    "subtitle": "工巧利器",
    "components": [
      "刀",
      "斤",
      "又",
      "矢",
      "車"
    ],
    "unlockThreshold": 9,
    "chestRewardCoins": 90,
    "targets": [
      {
        "char": "分",
        "layout": "tb",
        "recipes": [
          [
            "八",
            "刀"
          ]
        ],
        "hint": "以刀剖物成兩半，分別分享"
      },
      {
        "char": "初",
        "layout": "lr",
        "recipes": [
          [
            "衣",
            "刀"
          ]
        ],
        "hint": "裁衣之始，當初初心"
      },
      {
        "char": "份",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "分"
          ]
        ],
        "hint": "人人有份，身份份額"
      },
      {
        "char": "紛",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "分"
          ]
        ],
        "hint": "絲線雜亂，紛紛擾擾"
      },
      {
        "char": "所",
        "layout": "lr",
        "recipes": [
          [
            "戶",
            "斤"
          ]
        ],
        "hint": "伐木之聲聞於戶，處所所以"
      },
      {
        "char": "祈",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "斤"
          ]
        ],
        "hint": "向神明祈求福澤"
      },
      {
        "char": "近",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "斤"
          ]
        ],
        "hint": "行路不遠，親近附近"
      },
      {
        "char": "折",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "斤"
          ]
        ],
        "hint": "以手斷物如斧斤，折斷轉折"
      },
      {
        "char": "取",
        "layout": "lr",
        "recipes": [
          [
            "耳",
            "又"
          ]
        ],
        "hint": "手執左耳，獲取奪取"
      },
      {
        "char": "奴",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "又"
          ]
        ],
        "hint": "女子勞作，奴僕"
      },
      {
        "char": "怒",
        "layout": "tb",
        "recipes": [
          [
            "奴",
            "心"
          ]
        ],
        "hint": "心火中燒，憤怒發怒"
      },
      {
        "char": "努",
        "layout": "tb",
        "recipes": [
          [
            "奴",
            "力"
          ]
        ],
        "hint": "竭盡全力，努力奮發"
      },
      {
        "char": "支",
        "layout": "tb",
        "recipes": [
          [
            "十",
            "又"
          ]
        ],
        "hint": "手持竹枝，支持分支"
      },
      {
        "char": "枝",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "支"
          ]
        ],
        "hint": "樹木分叉，樹枝花枝"
      },
      {
        "char": "知",
        "layout": "lr",
        "recipes": [
          [
            "矢",
            "口"
          ]
        ],
        "hint": "出口如箭中靶，知識知道"
      },
      {
        "char": "智",
        "layout": "tb",
        "recipes": [
          [
            "知",
            "日"
          ]
        ],
        "hint": "日日累積所知，智慧明智"
      },
      {
        "char": "軒",
        "layout": "lr",
        "recipes": [
          [
            "車",
            "干"
          ]
        ],
        "hint": "華美高車，氣宇軒昂"
      },
      {
        "char": "轟",
        "layout": "tri",
        "recipes": [
          [
            "車",
            "車",
            "車"
          ]
        ],
        "hint": "三車齊鳴，轟隆巨響"
      }
    ]
  },
  {
    "stage": 17,
    "title": "廠房山崖",
    "subtitle": "建築遮蔽",
    "components": [
      "广",
      "厂",
      "穴",
      "尸",
      "冖"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 90,
    "targets": [
      {
        "char": "床",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "木"
          ]
        ],
        "hint": "屋下木榻，眠床"
      },
      {
        "char": "庫",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "車"
          ]
        ],
        "hint": "停放兵車之屋，倉庫寶庫"
      },
      {
        "char": "座",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "從",
            "土"
          ]
        ],
        "hint": "屋下二人坐於土上，座位"
      },
      {
        "char": "反",
        "layout": "enc",
        "recipes": [
          [
            "厂",
            "又"
          ]
        ],
        "hint": "手在崖下翻轉，反正反覆"
      },
      {
        "char": "灰",
        "layout": "enc",
        "recipes": [
          [
            "厂",
            "火"
          ]
        ],
        "hint": "火熄餘燼可手捧，灰燼"
      },
      {
        "char": "返",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "反"
          ]
        ],
        "hint": "行而復回，返回往返"
      },
      {
        "char": "板",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "反"
          ]
        ],
        "hint": "鋸木成片，木板黑板"
      },
      {
        "char": "空",
        "layout": "tb",
        "recipes": [
          [
            "穴",
            "工"
          ]
        ],
        "hint": "鑿穴成洞，天空空曠"
      },
      {
        "char": "穿",
        "layout": "tb",
        "recipes": [
          [
            "穴",
            "牙"
          ]
        ],
        "hint": "獸牙穿穴，貫穿穿著"
      },
      {
        "char": "尾",
        "layout": "enc",
        "recipes": [
          [
            "尸",
            "毛"
          ]
        ],
        "hint": "身後長毛，尾巴首尾"
      },
      {
        "char": "居",
        "layout": "enc",
        "recipes": [
          [
            "尸",
            "古"
          ]
        ],
        "hint": "安身之所，居住安居"
      },
      {
        "char": "軍",
        "layout": "tb",
        "recipes": [
          [
            "冖",
            "車"
          ]
        ],
        "hint": "戰車環繞成營，軍隊"
      },
      {
        "char": "運",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "軍"
          ]
        ],
        "hint": "軍隊移動，運輸命運"
      }
    ]
  },
  {
    "stage": 18,
    "title": "氣象川谷",
    "subtitle": "風雲氣韻",
    "components": [
      "風",
      "气",
      "川",
      "谷",
      "夕"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 90,
    "targets": [
      {
        "char": "楓",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "風"
          ]
        ],
        "hint": "秋風吹紅之木，楓葉"
      },
      {
        "char": "嵐",
        "layout": "tb",
        "recipes": [
          [
            "山",
            "風"
          ]
        ],
        "hint": "山間霧氣隨風，山嵐"
      },
      {
        "char": "汽",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "气"
          ]
        ],
        "hint": "水受熱化為蒸氣（水 + 气 = 汽）"
      },
      {
        "char": "氛",
        "layout": "enc",
        "recipes": [
          [
            "气",
            "分"
          ]
        ],
        "hint": "雲氣瀰漫，氣氛氛圍"
      },
      {
        "char": "順",
        "layout": "lr",
        "recipes": [
          [
            "川",
            "頁"
          ]
        ],
        "hint": "順流而下，順利順從"
      },
      {
        "char": "訓",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "川"
          ]
        ],
        "hint": "言如川流教導，訓誡訓練"
      },
      {
        "char": "州",
        "layout": "quad",
        "recipes": [
          [
            "川",
            "丶",
            "丶",
            "丶"
          ]
        ],
        "hint": "川流之中沙洲點點（川 + 三點），九州神州"
      },
      {
        "char": "洲",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "州"
          ],
          [
            "水",
            "川",
            "丶",
            "丶",
            "丶"
          ]
        ],
        "hint": "水中陸地（氵 + 州），沙洲大洲"
      },
      {
        "char": "裕",
        "layout": "lr",
        "recipes": [
          [
            "衣",
            "谷"
          ]
        ],
        "hint": "衣物豐足如深谷，富裕寬裕"
      },
      {
        "char": "浴",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "谷"
          ]
        ],
        "hint": "山谷清泉沐浴"
      },
      {
        "char": "俗",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "谷"
          ]
        ],
        "hint": "人間風土習俗"
      },
      {
        "char": "容",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "谷"
          ]
        ],
        "hint": "屋宇寬廣如山谷，包容容貌"
      },
      {
        "char": "多",
        "layout": "tb",
        "recipes": [
          [
            "夕",
            "夕"
          ]
        ],
        "hint": "重夕相疊，數量眾多"
      },
      {
        "char": "移",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "多"
          ]
        ],
        "hint": "禾苗隨風擺動，移動轉移"
      },
      {
        "char": "名",
        "layout": "tb",
        "recipes": [
          [
            "夕",
            "口"
          ]
        ],
        "hint": "暮色暗中以口自報姓名"
      },
      {
        "char": "銘",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "名"
          ]
        ],
        "hint": "刻名於金屬器物，銘記"
      }
    ]
  },
  {
    "stage": 19,
    "title": "占卜宗親",
    "subtitle": "家族源流",
    "components": [
      "卜",
      "占",
      "父",
      "母",
      "兄"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 90,
    "targets": [
      {
        "char": "外",
        "layout": "lr",
        "recipes": [
          [
            "夕",
            "卜"
          ]
        ],
        "hint": "夜晚占卜非常例，內外"
      },
      {
        "char": "扑",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "卜"
          ]
        ],
        "hint": "以手輕擊，撲打"
      },
      {
        "char": "朴",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "卜"
          ]
        ],
        "hint": "木質樸素，樸實無華"
      },
      {
        "char": "店",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "占"
          ]
        ],
        "hint": "屋下設攤占據，商店客店"
      },
      {
        "char": "站",
        "layout": "lr",
        "recipes": [
          [
            "立",
            "占"
          ]
        ],
        "hint": "站立定位，車站站立"
      },
      {
        "char": "沾",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "占"
          ]
        ],
        "hint": "水滴浸潤，沾染沾光"
      },
      {
        "char": "斧",
        "layout": "tb",
        "recipes": [
          [
            "父",
            "斤"
          ]
        ],
        "hint": "父執斤斧，利斧砍柴"
      },
      {
        "char": "姆",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "母"
          ]
        ],
        "hint": "女師保姆，慈母"
      },
      {
        "char": "祝",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "兄"
          ]
        ],
        "hint": "長兄跪拜神明祈福，祝福"
      },
      {
        "char": "咒",
        "layout": "tri",
        "recipes": [
          [
            "口",
            "口",
            "兄"
          ]
        ],
        "hint": "口中唸唸有詞，咒語"
      },
      {
        "char": "兌",
        "layout": "tb",
        "recipes": [
          [
            "八",
            "兄"
          ]
        ],
        "hint": "喜悅言笑，兌換"
      },
      {
        "char": "說",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "兌"
          ]
        ],
        "hint": "言辭令人喜悅，說話解說"
      },
      {
        "char": "閱",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "兌"
          ]
        ],
        "hint": "在門內檢視，閱讀閱歷"
      },
      {
        "char": "稅",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "兌"
          ]
        ],
        "hint": "繳納田禾賦稅"
      }
    ]
  },
  {
    "stage": 20,
    "title": "財貨文斗",
    "subtitle": "文明交易",
    "components": [
      "貝",
      "文",
      "斗",
      "尺",
      "片"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 100,
    "targets": [
      {
        "char": "貼",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "占"
          ]
        ],
        "hint": "以財物抵押黏貼"
      },
      {
        "char": "販",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "反"
          ]
        ],
        "hint": "買賣貨財，小販販賣"
      },
      {
        "char": "員",
        "layout": "tb",
        "recipes": [
          [
            "口",
            "貝"
          ]
        ],
        "hint": "以口清點貝幣，人員成員"
      },
      {
        "char": "圓",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "員"
          ]
        ],
        "hint": "方框之中有圓貝，圓滿圓形"
      },
      {
        "char": "損",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "員"
          ]
        ],
        "hint": "手取去財物，損害損失"
      },
      {
        "char": "貧",
        "layout": "tb",
        "recipes": [
          [
            "分",
            "貝"
          ]
        ],
        "hint": "財貝分散，貧窮清貧"
      },
      {
        "char": "貞",
        "layout": "tb",
        "recipes": [
          [
            "卜",
            "貝"
          ]
        ],
        "hint": "占卜問吉凶，堅貞貞潔"
      },
      {
        "char": "偵",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "貞"
          ]
        ],
        "hint": "暗中察探，偵探偵查"
      },
      {
        "char": "紋",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "文"
          ]
        ],
        "hint": "絲織花紋，波紋指紋"
      },
      {
        "char": "蚊",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "文"
          ]
        ],
        "hint": "夏夜飛蟲，蚊子"
      },
      {
        "char": "科",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "斗"
          ]
        ],
        "hint": "以斗量禾，科學科目"
      },
      {
        "char": "抖",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "斗"
          ]
        ],
        "hint": "手持斗篩震動，發抖抖動"
      },
      {
        "char": "咫",
        "layout": "enc",
        "recipes": [
          [
            "尺",
            "只"
          ]
        ],
        "hint": "八寸為咫，咫尺天涯"
      },
      {
        "char": "版",
        "layout": "lr",
        "recipes": [
          [
            "片",
            "反"
          ]
        ],
        "hint": "木片反覆刻字，出版版面"
      }
    ]
  },
  {
    "stage": 21,
    "title": "天干前半",
    "subtitle": "甲乙丙丁",
    "components": [
      "甲",
      "乙",
      "丙",
      "丁",
      "戊"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 100,
    "targets": [
      {
        "char": "頂",
        "layout": "lr",
        "recipes": [
          [
            "丁",
            "頁"
          ]
        ],
        "hint": "頭頂最高處，頂尖"
      },
      {
        "char": "打",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "丁"
          ]
        ],
        "hint": "以手擊釘，敲打打擊"
      },
      {
        "char": "訂",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "丁"
          ]
        ],
        "hint": "立言為約，訂立預訂"
      },
      {
        "char": "盯",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "丁"
          ]
        ],
        "hint": "雙目緊盯不放"
      },
      {
        "char": "押",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "甲"
          ]
        ],
        "hint": "以手按壓畫押，押韻抵押"
      },
      {
        "char": "鴨",
        "layout": "lr",
        "recipes": [
          [
            "甲",
            "鳥"
          ]
        ],
        "hint": "水禽家鴨，甲旁鳥形"
      },
      {
        "char": "閘",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "甲"
          ]
        ],
        "hint": "水門開關，水閘閘門"
      },
      {
        "char": "扎",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "乙"
          ]
        ],
        "hint": "手握如鉤（乙=乚），扎根掙扎"
      },
      {
        "char": "札",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "乙"
          ]
        ],
        "hint": "古代書寫木簡（乙=乚），信札"
      },
      {
        "char": "柄",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "丙"
          ]
        ],
        "hint": "器物木把，把柄權柄"
      },
      {
        "char": "茂",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "戊"
          ]
        ],
        "hint": "草木繁盛，茂密風華"
      }
    ]
  },
  {
    "stage": 22,
    "title": "天干後半",
    "subtitle": "己庚辛壬",
    "components": [
      "己",
      "庚",
      "辛",
      "壬",
      "癸"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 100,
    "targets": [
      {
        "char": "記",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "己"
          ]
        ],
        "hint": "銘記於言，記憶筆記"
      },
      {
        "char": "紀",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "己"
          ]
        ],
        "hint": "理絲頭緒，紀律世紀"
      },
      {
        "char": "忌",
        "layout": "tb",
        "recipes": [
          [
            "己",
            "心"
          ]
        ],
        "hint": "心懷畏懼猜忌，禁忌"
      },
      {
        "char": "妃",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "己"
          ]
        ],
        "hint": "帝王配偶，王妃"
      },
      {
        "char": "親",
        "layout": "tri",
        "recipes": [
          [
            "辛",
            "八",
            "見"
          ]
        ],
        "hint": "正體「親」：辛 + 八 + 見，親近雙親"
      },
      {
        "char": "新",
        "layout": "tri",
        "recipes": [
          [
            "辛",
            "八",
            "斤"
          ]
        ],
        "hint": "正體「新」：辛 + 八 + 斤，日新又新"
      },
      {
        "char": "薪",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "新"
          ]
        ],
        "hint": "新伐草木柴火，薪水薪火"
      },
      {
        "char": "任",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "壬"
          ]
        ],
        "hint": "人擔重任，信任任務"
      },
      {
        "char": "妊",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "壬"
          ]
        ],
        "hint": "女子懷孕，妊娠"
      },
      {
        "char": "賃",
        "layout": "tb",
        "recipes": [
          [
            "任",
            "貝"
          ]
        ],
        "hint": "以財貝租借，租賃"
      },
      {
        "char": "葵",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "癸"
          ]
        ],
        "hint": "向日之花，向日葵"
      }
    ]
  },
  {
    "stage": 23,
    "title": "地支前半",
    "subtitle": "丑寅卯辰巳",
    "components": [
      "丑",
      "寅",
      "卯",
      "辰",
      "巳"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 100,
    "targets": [
      {
        "char": "起",
        "layout": "enc",
        "recipes": [
          [
            "走",
            "巳"
          ]
        ],
        "hint": "正體「起」：走 + 巳（非己），起身起飛"
      },
      {
        "char": "扭",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "丑"
          ]
        ],
        "hint": "以手轉動，扭轉扭曲"
      },
      {
        "char": "鈕",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "丑"
          ]
        ],
        "hint": "金屬扣鈕，按鈕"
      },
      {
        "char": "紐",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "丑"
          ]
        ],
        "hint": "絲線結扣，樞紐紐約"
      },
      {
        "char": "羞",
        "layout": "tb",
        "recipes": [
          [
            "羊",
            "丑"
          ]
        ],
        "hint": "進獻美味，害羞羞恥"
      },
      {
        "char": "演",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "寅"
          ]
        ],
        "hint": "水脈流長，演變表演"
      },
      {
        "char": "柳",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "卯"
          ]
        ],
        "hint": "春日垂柳，柳暗花明"
      },
      {
        "char": "聊",
        "layout": "lr",
        "recipes": [
          [
            "耳",
            "卯"
          ]
        ],
        "hint": "耳邊閒談，聊天無聊"
      },
      {
        "char": "貿",
        "layout": "tb",
        "recipes": [
          [
            "卯",
            "貝"
          ]
        ],
        "hint": "互通有無，貿易商貿"
      },
      {
        "char": "震",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "辰"
          ]
        ],
        "hint": "雷雨震動，地震震撼"
      },
      {
        "char": "晨",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "辰"
          ]
        ],
        "hint": "星辰隱去日出，清晨"
      },
      {
        "char": "振",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "辰"
          ]
        ],
        "hint": "揮手奮起，振興振作"
      },
      {
        "char": "唇",
        "layout": "enc",
        "recipes": [
          [
            "辰",
            "口"
          ]
        ],
        "hint": "口邊雙唇，唇齒相依"
      },
      {
        "char": "祀",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "巳"
          ]
        ],
        "hint": "祭祀祖先神明"
      }
    ]
  },
  {
    "stage": 24,
    "title": "地支後半",
    "subtitle": "午未申酉亥",
    "components": [
      "午",
      "未",
      "申",
      "酉",
      "亥"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 100,
    "targets": [
      {
        "char": "許",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "午"
          ]
        ],
        "hint": "出言應允，允許期許"
      },
      {
        "char": "忤",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "午"
          ]
        ],
        "hint": "心意違逆，忤逆"
      },
      {
        "char": "味",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "未"
          ]
        ],
        "hint": "口嘗滋味，味道品味"
      },
      {
        "char": "妹",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "未"
          ]
        ],
        "hint": "年幼女子，妹妹姐妹"
      },
      {
        "char": "魅",
        "layout": "enc",
        "recipes": [
          [
            "鬼",
            "未"
          ]
        ],
        "hint": "山林精怪，魅力迷人"
      },
      {
        "char": "神",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "申"
          ]
        ],
        "hint": "天地神明，精神神奇"
      },
      {
        "char": "伸",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "申"
          ]
        ],
        "hint": "人舒展身軀，伸展延伸"
      },
      {
        "char": "呻",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "申"
          ]
        ],
        "hint": "口中低吟，呻吟"
      },
      {
        "char": "紳",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "申"
          ]
        ],
        "hint": "束腰大帶，士紳紳士"
      },
      {
        "char": "酒",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "酉"
          ]
        ],
        "hint": "酉為酒樽，佳釀美酒"
      },
      {
        "char": "配",
        "layout": "lr",
        "recipes": [
          [
            "酉",
            "己"
          ]
        ],
        "hint": "斟酒相配，配合分配"
      },
      {
        "char": "該",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "亥"
          ]
        ],
        "hint": "言當如此，應該"
      },
      {
        "char": "孩",
        "layout": "lr",
        "recipes": [
          [
            "子",
            "亥"
          ]
        ],
        "hint": "幼小稚子，孩童孩子"
      },
      {
        "char": "刻",
        "layout": "lr",
        "recipes": [
          [
            "亥",
            "刀"
          ]
        ],
        "hint": "以刀雕刻，時刻深刻"
      },
      {
        "char": "核",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "亥"
          ]
        ],
        "hint": "果中堅核，核心審核"
      }
    ]
  },
  {
    "stage": 25,
    "title": "城邑山阜",
    "subtitle": "疆域成敗",
    "components": [
      "邑",
      "阜",
      "亡",
      "成",
      "半"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 110,
    "targets": [
      {
        "char": "邪",
        "layout": "lr",
        "recipes": [
          [
            "牙",
            "邑"
          ]
        ],
        "hint": "古邑地名（邑在右作阝），正邪"
      },
      {
        "char": "付",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "寸"
          ]
        ],
        "hint": "以手交予，交付付出"
      },
      {
        "char": "附",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "付"
          ]
        ],
        "hint": "依傍山阜（阜在左作阝），附近依附"
      },
      {
        "char": "府",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "付"
          ]
        ],
        "hint": "官署府第，政府學府"
      },
      {
        "char": "符",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "付"
          ]
        ],
        "hint": "竹製兵符信物，符合符號"
      },
      {
        "char": "陣",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "車"
          ]
        ],
        "hint": "戰車列隊，陣地陣容"
      },
      {
        "char": "忙",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "亡"
          ]
        ],
        "hint": "心無暇顧，忙碌急忙"
      },
      {
        "char": "忘",
        "layout": "tb",
        "recipes": [
          [
            "亡",
            "心"
          ]
        ],
        "hint": "心神消亡，遺忘忘記"
      },
      {
        "char": "盲",
        "layout": "tb",
        "recipes": [
          [
            "亡",
            "目"
          ]
        ],
        "hint": "目失光明，盲目"
      },
      {
        "char": "妄",
        "layout": "tb",
        "recipes": [
          [
            "亡",
            "女"
          ]
        ],
        "hint": "心無所主，妄想狂妄"
      },
      {
        "char": "城",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "成"
          ]
        ],
        "hint": "築土成垣，城市長城"
      },
      {
        "char": "誠",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "成"
          ]
        ],
        "hint": "言出必成，誠實真誠"
      },
      {
        "char": "盛",
        "layout": "tb",
        "recipes": [
          [
            "成",
            "皿"
          ]
        ],
        "hint": "器皿滿載，盛大豐盛"
      },
      {
        "char": "判",
        "layout": "lr",
        "recipes": [
          [
            "半",
            "刀"
          ]
        ],
        "hint": "以刀剖半，判斷評判"
      },
      {
        "char": "叛",
        "layout": "lr",
        "recipes": [
          [
            "半",
            "反"
          ]
        ],
        "hint": "背離反叛，叛逆"
      }
    ]
  },
  {
    "stage": 26,
    "title": "生機穀米",
    "subtitle": "五穀豐登",
    "components": [
      "生",
      "丰",
      "瓜",
      "豆",
      "米"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 110,
    "targets": [
      {
        "char": "氣",
        "layout": "enc",
        "recipes": [
          [
            "气",
            "米"
          ]
        ],
        "hint": "雲氣與稻米之精氣，正體「氣」"
      },
      {
        "char": "星",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "生"
          ]
        ],
        "hint": "萬物之精上生為星，星辰"
      },
      {
        "char": "姓",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "生"
          ]
        ],
        "hint": "母系氏族血脈，姓名百姓"
      },
      {
        "char": "性",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "生"
          ]
        ],
        "hint": "與生俱來之心性，性格天性"
      },
      {
        "char": "醒",
        "layout": "lr",
        "recipes": [
          [
            "酉",
            "星"
          ]
        ],
        "hint": "酒醉復明如見星辰，清醒覺醒"
      },
      {
        "char": "邦",
        "layout": "lr",
        "recipes": [
          [
            "丰",
            "邑"
          ]
        ],
        "hint": "草木繁茂之邦國，聯邦"
      },
      {
        "char": "孤",
        "layout": "lr",
        "recipes": [
          [
            "子",
            "瓜"
          ]
        ],
        "hint": "幼子無依如單瓜，孤獨孤單"
      },
      {
        "char": "頭",
        "layout": "lr",
        "recipes": [
          [
            "豆",
            "頁"
          ]
        ],
        "hint": "首級頭顱，開頭領頭"
      },
      {
        "char": "短",
        "layout": "lr",
        "recipes": [
          [
            "矢",
            "豆"
          ]
        ],
        "hint": "箭矢與禮器皆短，長短"
      },
      {
        "char": "逗",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "豆"
          ]
        ],
        "hint": "行而小住，逗留逗趣"
      },
      {
        "char": "迷",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "米"
          ]
        ],
        "hint": "行路迷失方向，迷路入迷"
      },
      {
        "char": "謎",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "迷"
          ]
        ],
        "hint": "令人迷惑之言，謎語猜謎"
      },
      {
        "char": "粉",
        "layout": "lr",
        "recipes": [
          [
            "米",
            "分"
          ]
        ],
        "hint": "研米成細末，粉末花粉"
      },
      {
        "char": "粒",
        "layout": "lr",
        "recipes": [
          [
            "米",
            "立"
          ]
        ],
        "hint": "米粒顆粒，粒粒皆辛苦"
      },
      {
        "char": "精",
        "layout": "lr",
        "recipes": [
          [
            "米",
            "青"
          ]
        ],
        "hint": "精選潔白好米，精神精密"
      }
    ]
  },
  {
    "stage": 27,
    "title": "飲食甘麻",
    "subtitle": "百味人生",
    "components": [
      "食",
      "甘",
      "鹵",
      "麥",
      "麻"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 110,
    "targets": [
      {
        "char": "飯",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "反"
          ]
        ],
        "hint": "每日三餐米飯"
      },
      {
        "char": "飲",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "欠"
          ]
        ],
        "hint": "張口喝水，飲食飲料"
      },
      {
        "char": "蝕",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "虫"
          ]
        ],
        "hint": "蟲蛀侵蝕，日蝕月蝕"
      },
      {
        "char": "甜",
        "layout": "lr",
        "recipes": [
          [
            "舌",
            "甘"
          ]
        ],
        "hint": "舌嘗甘美，甜蜜甘甜"
      },
      {
        "char": "柑",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "甘"
          ]
        ],
        "hint": "木左甘右，甘美柑橘"
      },
      {
        "char": "某",
        "layout": "tb",
        "recipes": [
          [
            "甘",
            "木"
          ]
        ],
        "hint": "甘上木下，某人某事"
      },
      {
        "char": "煤",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "某"
          ]
        ],
        "hint": "地底黑金燃火，煤炭"
      },
      {
        "char": "媒",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "某"
          ]
        ],
        "hint": "撮合姻緣，媒介媒體"
      },
      {
        "char": "謀",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "某"
          ]
        ],
        "hint": "商議計策，謀略參謀"
      },

      {
        "char": "磨",
        "layout": "enc",
        "recipes": [
          [
            "麻",
            "石"
          ]
        ],
        "hint": "以石研物，磨練研磨"
      },
      {
        "char": "魔",
        "layout": "enc",
        "recipes": [
          [
            "麻",
            "鬼"
          ]
        ],
        "hint": "迷人心智之鬼，魔法惡魔"
      },
      {
        "char": "摩",
        "layout": "enc",
        "recipes": [
          [
            "麻",
            "手"
          ]
        ],
        "hint": "以手撫觸，摩擦按摩"
      }
    ]
  },
  {
    "stage": 28,
    "title": "布帛皮革",
    "subtitle": "衣冠彩繪",
    "components": [
      "巾",
      "韋",
      "革",
      "色",
      "黃"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 110,
    "targets": [
      {
        "char": "帖",
        "layout": "lr",
        "recipes": [
          [
            "巾",
            "占"
          ]
        ],
        "hint": "帛書名帖，請帖字帖"
      },
      {
        "char": "冒",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "目"
          ]
        ],
        "hint": "覆蓋頭目，冒險感冒"
      },
      {
        "char": "帽",
        "layout": "lr",
        "recipes": [
          [
            "巾",
            "冒"
          ]
        ],
        "hint": "布製頭飾，帽子"
      },
      {
        "char": "偉",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "韋"
          ]
        ],
        "hint": "人中豪傑，偉大宏偉"
      },
      {
        "char": "圍",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "韋"
          ]
        ],
        "hint": "四面環繞，包圍周圍"
      },
      {
        "char": "違",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "韋"
          ]
        ],
        "hint": "背道而馳，違背違反"
      },
      {
        "char": "緯",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "韋"
          ]
        ],
        "hint": "織布橫線，經緯緯度"
      },
      {
        "char": "鞋",
        "layout": "lr",
        "recipes": [
          [
            "革",
            "圭"
          ]
        ],
        "hint": "皮革製履，鞋子"
      },
      {
        "char": "勒",
        "layout": "lr",
        "recipes": [
          [
            "革",
            "力"
          ]
        ],
        "hint": "馬絡頭用力收緊，勾勒勒令"
      },
      {
        "char": "絕",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "色"
          ]
        ],
        "hint": "斷絕絲線，絕對絕妙"
      },
      {
        "char": "廣",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "黃"
          ]
        ],
        "hint": "屋宇寬大，廣場廣闊"
      },
      {
        "char": "橫",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "黃"
          ]
        ],
        "hint": "門前橫木，縱橫橫跨"
      },
      {
        "char": "磺",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "黃"
          ]
        ],
        "hint": "黃色礦石，硫磺"
      }
    ]
  },
  {
    "stage": 29,
    "title": "兵器禮樂",
    "subtitle": "弦歌不輟",
    "components": [
      "矛",
      "盾",
      "樂",
      "氏",
      "令"
    ],
    "unlockThreshold": 8,
    "chestRewardCoins": 110,
    "targets": [
      {
        "char": "茅",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "矛"
          ]
        ],
        "hint": "草葉銳利如矛，茅草茅廬"
      },
      {
        "char": "柔",
        "layout": "tb",
        "recipes": [
          [
            "矛",
            "木"
          ]
        ],
        "hint": "木質柔韌可彎，溫柔柔軟"
      },
      {
        "char": "揉",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "柔"
          ]
        ],
        "hint": "以手搓揉，揉捏"
      },
      {
        "char": "遁",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "盾"
          ]
        ],
        "hint": "持盾隱退，逃遁隱遁"
      },
      {
        "char": "藥",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "樂"
          ]
        ],
        "hint": "草木治病使人康樂，良藥"
      },
      {
        "char": "爍",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "樂"
          ]
        ],
        "hint": "火光閃動，閃爍"
      },
      {
        "char": "鑠",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "樂"
          ]
        ],
        "hint": "熔金閃耀，眾口鑠金"
      },
      {
        "char": "紙",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "氏"
          ]
        ],
        "hint": "絲絮造紙，紙張"
      },
      {
        "char": "氐",
        "layout": "tb",
        "recipes": [
          [
            "氏",
            "一"
          ]
        ],
        "hint": "氏下加一，根本基礎"
      },
      {
        "char": "低",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "氐"
          ]
        ],
        "hint": "人俯身向下，高低低頭"
      },
      {
        "char": "底",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "氐"
          ]
        ],
        "hint": "屋下最深處，底部徹底"
      },
      {
        "char": "抵",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "氐"
          ]
        ],
        "hint": "以手相抗，抵達抵抗"
      },
      {
        "char": "零",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "令"
          ]
        ],
        "hint": "細雨飄落，零星歸零"
      },
      {
        "char": "鈴",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "令"
          ]
        ],
        "hint": "金屬響鈴，風鈴鈴鐺"
      },
      {
        "char": "領",
        "layout": "lr",
        "recipes": [
          [
            "令",
            "頁"
          ]
        ],
        "hint": "頸項衣領，領袖帶領"
      },
      {
        "char": "鄰",
        "layout": "lr",
        "recipes": [
          [
            "令",
            "邑"
          ]
        ],
        "hint": "比鄰而居，鄰居鄰里"
      }
    ]
  },
  {
    "stage": 30,
    "title": "百獸羽翼",
    "subtitle": "飛禽走獸",
    "components": [
      "犬",
      "牛",
      "虎",
      "羽",
      "角"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 120,
    "targets": [
      {
        "char": "狂",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "王"
          ]
        ],
        "hint": "狂犬奔走，瘋狂狂熱"
      },
      {
        "char": "狐",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "瓜"
          ]
        ],
        "hint": "狡黠靈狐，狐狸"
      },
      {
        "char": "猜",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "青"
          ]
        ],
        "hint": "心存疑慮，猜測猜謎"
      },
      {
        "char": "件",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "牛"
          ]
        ],
        "hint": "人牽牛隻，物件事件"
      },
      {
        "char": "牢",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "牛"
          ]
        ],
        "hint": "屋下關牛，牢籠牢固"
      },
      {
        "char": "牲",
        "layout": "lr",
        "recipes": [
          [
            "牛",
            "生"
          ]
        ],
        "hint": "飼養牛羊，犧牲牲畜"
      },
      {
        "char": "犇",
        "layout": "tri",
        "recipes": [
          [
            "牛",
            "牛",
            "牛"
          ]
        ],
        "hint": "三牛奔馳，同「奔」"
      },
      {
        "char": "唬",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "虎"
          ]
        ],
        "hint": "虎嘯威嚇，嚇唬"
      },
      {
        "char": "琥",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "虎"
          ]
        ],
        "hint": "虎形美玉，琥珀"
      },
      {
        "char": "扇",
        "layout": "enc",
        "recipes": [
          [
            "戶",
            "羽"
          ]
        ],
        "hint": "門扉如羽翼開合，扇子"
      },
      {
        "char": "習",
        "layout": "tb",
        "recipes": [
          [
            "羽",
            "白"
          ]
        ],
        "hint": "雛鳥反覆振翅學飛，學習練習"
      },
      {
        "char": "翔",
        "layout": "lr",
        "recipes": [
          [
            "羊",
            "羽"
          ]
        ],
        "hint": "展翅高飛，翱翔飛翔"
      },
      {
        "char": "解",
        "layout": "tri",
        "recipes": [
          [
            "角",
            "刀",
            "牛"
          ]
        ],
        "hint": "以刀剖解牛角，理解解決"
      }
    ]
  },
  {
    "stage": 31,
    "title": "水澤舟楫",
    "subtitle": "冰清玉潔",
    "components": [
      "舟",
      "冫",
      "永",
      "泉",
      "井"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 120,
    "targets": [
      {
        "char": "船",
        "layout": "tri",
        "recipes": [
          [
            "舟",
            "八",
            "口"
          ]
        ],
        "hint": "水上行舟，帆船船隻"
      },
      {
        "char": "舢",
        "layout": "lr",
        "recipes": [
          [
            "舟",
            "山"
          ]
        ],
        "hint": "小舟舢舨"
      },
      {
        "char": "冰",
        "layout": "lr",
        "recipes": [
          [
            "冫",
            "水"
          ]
        ],
        "hint": "水凝成冰，冰雪聰明"
      },
      {
        "char": "冷",
        "layout": "lr",
        "recipes": [
          [
            "冫",
            "令"
          ]
        ],
        "hint": "寒冰凜冽，寒冷冷靜"
      },
      {
        "char": "次",
        "layout": "lr",
        "recipes": [
          [
            "冫",
            "欠"
          ]
        ],
        "hint": "依次排列，次數其次"
      },
      {
        "char": "泳",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "永"
          ]
        ],
        "hint": "水中潛行，游泳泳池"
      },
      {
        "char": "詠",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "永"
          ]
        ],
        "hint": "拉長聲調吟唱，歌詠吟詠"
      },
      {
        "char": "阱",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "井"
          ]
        ],
        "hint": "掘地為坑，陷阱"
      },
      {
        "char": "丼",
        "layout": "enc",
        "recipes": [
          [
            "井",
            "丶"
          ]
        ],
        "hint": "物落井中聲，丼飯"
      }
    ]
  },
  {
    "stage": 32,
    "title": "山丘城郭",
    "subtitle": "高亭市集",
    "components": [
      "丘",
      "高",
      "京",
      "亭",
      "市"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 120,
    "targets": [
      {
        "char": "岳",
        "layout": "tb",
        "recipes": [
          [
            "丘",
            "山"
          ]
        ],
        "hint": "高大名山，五岳山岳"
      },
      {
        "char": "兵",
        "layout": "tb",
        "recipes": [
          [
            "丘",
            "八"
          ]
        ],
        "hint": "手持兵器，士兵兵法"
      },
      {
        "char": "搞",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "高"
          ]
        ],
        "hint": "動手操作，搞定"
      },
      {
        "char": "稿",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "高"
          ]
        ],
        "hint": "禾稈草稿，文稿原稿"
      },
      {
        "char": "涼",
        "layout": "lr",
        "recipes": [
          [
            "冫",
            "京"
          ]
        ],
        "hint": "秋風微寒，清涼涼爽"
      },
      {
        "char": "景",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "京"
          ]
        ],
        "hint": "日光映照高台，風景景色"
      },
      {
        "char": "鯨",
        "layout": "lr",
        "recipes": [
          [
            "魚",
            "京"
          ]
        ],
        "hint": "海中巨獸，鯨魚"
      },
      {
        "char": "停",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "亭"
          ]
        ],
        "hint": "人憩於長亭，停止停留"
      },
      {
        "char": "鬧",
        "layout": "enc",
        "recipes": [
          [
            "門",
            "市"
          ]
        ],
        "hint": "門內如市集喧囂，熱鬧"
      },
      {
        "char": "柿",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "市"
          ]
        ],
        "hint": "秋日紅柿，柿子"
      }
    ]
  },
  {
    "stage": 33,
    "title": "光陰變易",
    "subtitle": "往昔今朝",
    "components": [
      "光",
      "易",
      "昔",
      "久",
      "乃"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 120,
    "targets": [
      {
        "char": "晃",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "光"
          ]
        ],
        "hint": "日光閃耀，晃動搖晃"
      },
      {
        "char": "恍",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "光"
          ]
        ],
        "hint": "心神不定，恍惚恍然"
      },
      {
        "char": "輝",
        "layout": "lr",
        "recipes": [
          [
            "光",
            "軍"
          ]
        ],
        "hint": "光芒四射，光輝輝煌"
      },
      {
        "char": "場",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "易"
          ]
        ],
        "hint": "平坦空地，廣場場所"
      },
      {
        "char": "揚",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "易"
          ]
        ],
        "hint": "舉手高揚，飛揚表揚"
      },
      {
        "char": "湯",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "易"
          ]
        ],
        "hint": "滾燙熱水，湯圓湯水"
      },
      {
        "char": "陽",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "易"
          ]
        ],
        "hint": "山南向日處，陽光太陽"
      },
      {
        "char": "借",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "昔"
          ]
        ],
        "hint": "向人借貸，借用"
      },
      {
        "char": "惜",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "昔"
          ]
        ],
        "hint": "心懷愛憐，珍惜可惜"
      },
      {
        "char": "錯",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "昔"
          ]
        ],
        "hint": "交錯磨礪，錯誤交錯"
      },
      {
        "char": "鵲",
        "layout": "lr",
        "recipes": [
          [
            "昔",
            "鳥"
          ]
        ],
        "hint": "報喜靈鳥，喜鵲"
      },
      {
        "char": "玖",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "久"
          ]
        ],
        "hint": "黑色美玉，大寫九「玖」"
      },
      {
        "char": "奶",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "乃"
          ]
        ],
        "hint": "哺育之乳，牛奶奶奶"
      }
    ]
  },
  {
    "stage": 34,
    "title": "本末果實",
    "subtitle": "束縛辛辣",
    "components": [
      "本",
      "末",
      "東",
      "束",
      "果"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 120,
    "targets": [
      {
        "char": "笨",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "本"
          ]
        ],
        "hint": "竹木粗笨，愚笨"
      },
      {
        "char": "抹",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "末"
          ]
        ],
        "hint": "以手擦拭，塗抹抹去"
      },
      {
        "char": "沫",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "末"
          ]
        ],
        "hint": "水面浮泡，泡沫唾沫"
      },
      {
        "char": "棟",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "東"
          ]
        ],
        "hint": "屋頂正樑，棟樑"
      },
      {
        "char": "陳",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "東"
          ]
        ],
        "hint": "列陣陳設，陳述陳列"
      },
      {
        "char": "凍",
        "layout": "lr",
        "recipes": [
          [
            "冫",
            "東"
          ]
        ],
        "hint": "天寒結凍，冰凍冷凍"
      },
      {
        "char": "速",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "束"
          ]
        ],
        "hint": "快步疾行，速度迅速"
      },
      {
        "char": "辣",
        "layout": "lr",
        "recipes": [
          [
            "辛",
            "束"
          ]
        ],
        "hint": "辛味刺激（注意中間為封閉「束」），麻辣"
      },
      {
        "char": "課",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "果"
          ]
        ],
        "hint": "言論考核，功課課程"
      },
      {
        "char": "顆",
        "layout": "lr",
        "recipes": [
          [
            "果",
            "頁"
          ]
        ],
        "hint": "圓粒狀物，一顆星"
      },
      {
        "char": "棵",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "果"
          ]
        ],
        "hint": "計算植物量詞，一棵樹"
      }
    ]
  },
  {
    "stage": 35,
    "title": "田園農作",
    "subtitle": "採摘豐收",
    "components": [
      "甫",
      "由",
      "曲",
      "農",
      "采"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 130,
    "targets": [
      {
        "char": "捕",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "甫"
          ]
        ],
        "hint": "伸手捉拿，捕捉捕獲"
      },
      {
        "char": "鋪",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "甫"
          ]
        ],
        "hint": "門環店鋪，鋪設店鋪"
      },
      {
        "char": "浦",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "甫"
          ]
        ],
        "hint": "水濱河口，黃浦江"
      },
      {
        "char": "補",
        "layout": "lr",
        "recipes": [
          [
            "衣",
            "甫"
          ]
        ],
        "hint": "縫補衣裳，補充彌補"
      },
      {
        "char": "油",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "由"
          ]
        ],
        "hint": "液態油脂，石油加油"
      },
      {
        "char": "抽",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "由"
          ]
        ],
        "hint": "伸手拔出，抽取抽空"
      },
      {
        "char": "袖",
        "layout": "lr",
        "recipes": [
          [
            "衣",
            "由"
          ]
        ],
        "hint": "衣袖袖手，領袖"
      },
      {
        "char": "笛",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "由"
          ]
        ],
        "hint": "竹製管樂，笛子長笛"
      },
      {
        "char": "濃",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "農"
          ]
        ],
        "hint": "露水厚重，濃厚濃郁"
      },
      {
        "char": "採",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "采"
          ]
        ],
        "hint": "以手摘取，採集採用"
      },
      {
        "char": "菜",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "采"
          ]
        ],
        "hint": "可採食之草蔬，蔬菜"
      }
    ]
  },
  {
    "stage": 36,
    "title": "丹青玄黃",
    "subtitle": "五色斑斕",
    "components": [
      "丹",
      "玄",
      "黑",
      "赤",
      "朱"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 130,
    "targets": [
      {
        "char": "畜",
        "layout": "tb",
        "recipes": [
          [
            "玄",
            "田"
          ]
        ],
        "hint": "田間飼養牲畜，畜牧"
      },
      {
        "char": "蓄",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "畜"
          ]
        ],
        "hint": "積聚儲備，儲蓄蓄水"
      },
      {
        "char": "牽",
        "layout": "tri",
        "recipes": [
          [
            "玄",
            "冖",
            "牛"
          ]
        ],
        "hint": "牽引牛繩，牽掛牽手"
      },
      {
        "char": "墨",
        "layout": "tb",
        "recipes": [
          [
            "黑",
            "土"
          ]
        ],
        "hint": "黑煙與膠土製成書畫之墨"
      },
      {
        "char": "默",
        "layout": "lr",
        "recipes": [
          [
            "黑",
            "犬"
          ]
        ],
        "hint": "犬潛行無聲，沉默默契"
      },
      {
        "char": "點",
        "layout": "lr",
        "recipes": [
          [
            "黑",
            "占"
          ]
        ],
        "hint": "黑色小斑，點滴重點"
      },
      {
        "char": "赫",
        "layout": "lr",
        "recipes": [
          [
            "赤",
            "赤"
          ]
        ],
        "hint": "雙赤並立，顯赫赫然"
      },
      {
        "char": "珠",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "朱"
          ]
        ],
        "hint": "圓潤珍珠，珠寶"
      },
      {
        "char": "株",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "朱"
          ]
        ],
        "hint": "露土樹根，守株待兔"
      },
      {
        "char": "蛛",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "朱"
          ]
        ],
        "hint": "結網之蟲，蜘蛛"
      }
    ]
  },
  {
    "stage": 37,
    "title": "君臣士民",
    "subtitle": "家國人倫",
    "components": [
      "君",
      "臣",
      "民",
      "士",
      "夫"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 130,
    "targets": [
      {
        "char": "郡",
        "layout": "lr",
        "recipes": [
          [
            "君",
            "邑"
          ]
        ],
        "hint": "君王所治地方，郡縣"
      },
      {
        "char": "群",
        "layout": "lr",
        "recipes": [
          [
            "君",
            "羊"
          ]
        ],
        "hint": "羊群聚集，群體人群"
      },
      {
        "char": "裙",
        "layout": "lr",
        "recipes": [
          [
            "衣",
            "君"
          ]
        ],
        "hint": "下裳衣裙，裙子"
      },
      {
        "char": "臥",
        "layout": "lr",
        "recipes": [
          [
            "臣",
            "人"
          ]
        ],
        "hint": "人俯身休息，臥室臥倒"
      },
      {
        "char": "堅",
        "layout": "tri",
        "recipes": [
          [
            "臣",
            "又",
            "土"
          ]
        ],
        "hint": "土質剛硬，堅強堅定"
      },
      {
        "char": "眠",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "民"
          ]
        ],
        "hint": "閉目而睡，睡眠冬眠"
      },
      {
        "char": "吉",
        "layout": "tb",
        "recipes": [
          [
            "士",
            "口"
          ]
        ],
        "hint": "賢士出吉言，吉祥吉利"
      },
      {
        "char": "志",
        "layout": "tb",
        "recipes": [
          [
            "士",
            "心"
          ]
        ],
        "hint": "士人心中抱負，志向意志"
      },
      {
        "char": "結",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "吉"
          ]
        ],
        "hint": "絲線打結，團結結果"
      },
      {
        "char": "扶",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "夫"
          ]
        ],
        "hint": "伸手攙扶，扶持扶助"
      },
      {
        "char": "規",
        "layout": "lr",
        "recipes": [
          [
            "夫",
            "見"
          ]
        ],
        "hint": "丈量法度，規矩規則"
      },
      {
        "char": "替",
        "layout": "tri",
        "recipes": [
          [
            "夫",
            "夫",
            "日"
          ]
        ],
        "hint": "雙夫並立於日上，代替替換"
      },
      {
        "char": "麩",
        "layout": "lr",
        "recipes": [
          [
            "麥",
            "夫"
          ]
        ],
        "hint": "小麥磨粉外皮（麥 + 夫），麥麩"
      }
    ]
  },
  {
    "stage": 38,
    "title": "身骨血肉",
    "subtitle": "血脈相連",
    "components": [
      "身",
      "骨",
      "血",
      "肉",
      "自"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 130,
    "targets": [
      {
        "char": "射",
        "layout": "lr",
        "recipes": [
          [
            "身",
            "寸"
          ]
        ],
        "hint": "身持弓矢發射，射箭"
      },
      {
        "char": "謝",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "射"
          ]
        ],
        "hint": "謙辭致意，感謝謝謝"
      },
      {
        "char": "滑",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "骨"
          ]
        ],
        "hint": "水潤如骨，光滑滑行"
      },
      {
        "char": "恤",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "血"
          ]
        ],
        "hint": "心懷憂憐，體恤撫恤"
      },
      {
        "char": "腐",
        "layout": "enc",
        "recipes": [
          [
            "府",
            "肉"
          ],
          [
            "广",
            "付",
            "肉"
          ]
        ],
        "hint": "肉藏府庫久而變質，豆腐腐敗"
      },
      {
        "char": "息",
        "layout": "tb",
        "recipes": [
          [
            "自",
            "心"
          ]
        ],
        "hint": "鼻息與心相通，休息消息"
      },
      {
        "char": "臭",
        "layout": "tb",
        "recipes": [
          [
            "自",
            "犬"
          ]
        ],
        "hint": "犬鼻靈敏嗅氣味，氣味"
      },
      {
        "char": "咱",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "自"
          ]
        ],
        "hint": "口稱自己，咱們"
      }
    ]
  },
  {
    "stage": 39,
    "title": "手勢偏旁",
    "subtitle": "造字部首",
    "components": [
      "攵",
      "殳",
      "廾",
      "爪",
      "卩"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 130,
    "targets": [
      {
        "char": "政",
        "layout": "lr",
        "recipes": [
          [
            "正",
            "攵"
          ]
        ],
        "hint": "執鞭匡正，政治政策"
      },
      {
        "char": "故",
        "layout": "lr",
        "recipes": [
          [
            "古",
            "攵"
          ]
        ],
        "hint": "往昔舊事，故事緣故"
      },
      {
        "char": "做",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "故"
          ]
        ],
        "hint": "人有所作為，做事"
      },
      {
        "char": "放",
        "layout": "lr",
        "recipes": [
          [
            "方",
            "攵"
          ]
        ],
        "hint": "驅趕釋放，放心開放"
      },
      {
        "char": "牧",
        "layout": "lr",
        "recipes": [
          [
            "牛",
            "攵"
          ]
        ],
        "hint": "手持鞭放牧牛羊"
      },
      {
        "char": "設",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "殳"
          ]
        ],
        "hint": "籌劃陳設，設計建設"
      },
      {
        "char": "沒",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "殳"
          ]
        ],
        "hint": "沉入水中，淹沒沒有"
      },
      {
        "char": "投",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "殳"
          ]
        ],
        "hint": "揮手擲出，投入投票"
      },
      {
        "char": "般",
        "layout": "lr",
        "recipes": [
          [
            "舟",
            "殳"
          ]
        ],
        "hint": "旋舟而行，一般這般"
      },
      {
        "char": "弄",
        "layout": "tb",
        "recipes": [
          [
            "王",
            "廾"
          ]
        ],
        "hint": "雙手捧玩美玉，擺弄"
      },
      {
        "char": "戒",
        "layout": "enc",
        "recipes": [
          [
            "戈",
            "廾"
          ]
        ],
        "hint": "雙手持戈警備，戒備戒律"
      },
      {
        "char": "采",
        "layout": "tb",
        "recipes": [
          [
            "爪",
            "木"
          ]
        ],
        "hint": "手爪採摘樹果，風采"
      },
      {
        "char": "妥",
        "layout": "tb",
        "recipes": [
          [
            "爪",
            "女"
          ]
        ],
        "hint": "手撫安頓，妥當妥善"
      },
      {
        "char": "叩",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "卩"
          ]
        ],
        "hint": "叩首詢問，叩門（標準豎筆單耳旁卩）"
      },
      {
        "char": "印",
        "layout": "lr",
        "recipes": [
          [
            "爪",
            "卩"
          ]
        ],
        "hint": "手按符節成印信，印章印象"
      }
    ]
  },
  {
    "stage": 40,
    "title": "道路街巷",
    "subtitle": "四通八達",
    "components": [
      "彳",
      "廴",
      "行",
      "向",
      "各"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 140,
    "targets": [
      {
        "char": "往",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "主"
          ]
        ],
        "hint": "邁步向前，往來前往"
      },
      {
        "char": "徒",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "走"
          ]
        ],
        "hint": "步行而走，徒步學徒"
      },
      {
        "char": "待",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "寺"
          ]
        ],
        "hint": "佇立等候，等待對待"
      },
      {
        "char": "持",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "寺"
          ]
        ],
        "hint": "手握把持，堅持支持"
      },
      {
        "char": "廷",
        "layout": "enc",
        "recipes": [
          [
            "廴",
            "壬"
          ]
        ],
        "hint": "朝廷議政之所"
      },
      {
        "char": "庭",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "廷"
          ]
        ],
        "hint": "屋宇前院，家庭庭院"
      },
      {
        "char": "挺",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "廷"
          ]
        ],
        "hint": "伸直挺立，挺拔"
      },
      {
        "char": "街",
        "layout": "tri",
        "recipes": [
          [
            "行",
            "圭"
          ]
        ],
        "hint": "大道交會處，街道大街"
      },
      {
        "char": "衍",
        "layout": "lr",
        "recipes": [
          [
            "行",
            "水"
          ]
        ],
        "hint": "水入大道順流，繁衍衍生"
      },
      {
        "char": "餉",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "向"
          ]
        ],
        "hint": "軍糧薪俸，軍餉"
      },
      {
        "char": "客",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "各"
          ]
        ],
        "hint": "遠方來賓入屋，客人作客"
      },
      {
        "char": "洛",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "各"
          ]
        ],
        "hint": "古水名，洛陽"
      },
      {
        "char": "落",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "洛"
          ],
          [
            "艹",
            "水",
            "各"
          ]
        ],
        "hint": "草木葉落，降落落葉"
      },
      {
        "char": "格",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "各"
          ]
        ],
        "hint": "木條交錯成框，格子風格"
      }
    ]
  },
  {
    "stage": 41,
    "title": "足跡出入",
    "subtitle": "往返至止",
    "components": [
      "足",
      "去",
      "出",
      "入",
      "至"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 140,
    "targets": [
      {
        "char": "路",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "各"
          ]
        ],
        "hint": "人人足跡踏出道路"
      },
      {
        "char": "捉",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "足"
          ]
        ],
        "hint": "手腳並用捕獲，捕捉"
      },
      {
        "char": "促",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "足"
          ]
        ],
        "hint": "緊跟腳步，催促促進"
      },
      {
        "char": "法",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "去"
          ]
        ],
        "hint": "平如水面去不直，法律方法"
      },
      {
        "char": "劫",
        "layout": "lr",
        "recipes": [
          [
            "去",
            "力"
          ]
        ],
        "hint": "以力脅迫奪去，劫難"
      },
      {
        "char": "卻",
        "layout": "lr",
        "recipes": [
          [
            "去",
            "卩"
          ]
        ],
        "hint": "退卻推辭，忘卻"
      },
      {
        "char": "腳",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "卻"
          ]
        ],
        "hint": "人身下肢，腳步雙腳"
      },
      {
        "char": "屈",
        "layout": "enc",
        "recipes": [
          [
            "尸",
            "出"
          ]
        ],
        "hint": "彎曲伸展，屈服委屈"
      },
      {
        "char": "掘",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "屈"
          ]
        ],
        "hint": "動手挖掘，發掘"
      },
      {
        "char": "全",
        "layout": "tb",
        "recipes": [
          [
            "入",
            "王"
          ]
        ],
        "hint": "純玉無瑕，完全全部"
      },
      {
        "char": "到",
        "layout": "lr",
        "recipes": [
          [
            "至",
            "刀"
          ]
        ],
        "hint": "抵達終點，到達來到"
      },
      {
        "char": "致",
        "layout": "lr",
        "recipes": [
          [
            "至",
            "攵"
          ]
        ],
        "hint": "送達招致，精緻一致"
      },
      {
        "char": "室",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "至"
          ]
        ],
        "hint": "人所至止之屋，教室卧室"
      },
      {
        "char": "屋",
        "layout": "enc",
        "recipes": [
          [
            "尸",
            "至"
          ]
        ],
        "hint": "遮蔽風雨之居所，房屋"
      }
    ]
  },
  {
    "stage": 42,
    "title": "鼓樂篇章",
    "subtitle": "金石之聲",
    "components": [
      "鼓",
      "聲",
      "竟",
      "章",
      "童"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 140,
    "targets": [
      {
        "char": "瞽",
        "layout": "tb",
        "recipes": [
          [
            "鼓",
            "目"
          ]
        ],
        "hint": "目盲樂師，瞽者"
      },
      {
        "char": "馨",
        "layout": "tb",
        "recipes": [
          [
            "聲",
            "香"
          ]
        ],
        "hint": "香氣遠播如聲，溫馨"
      },
      {
        "char": "境",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "竟"
          ]
        ],
        "hint": "疆土邊界，環境境界"
      },
      {
        "char": "鏡",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "竟"
          ]
        ],
        "hint": "金屬磨光映照，鏡子"
      },
      {
        "char": "障",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "章"
          ]
        ],
        "hint": "山阜阻隔，障礙保障"
      },
      {
        "char": "撞",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "童"
          ]
        ],
        "hint": "用力碰擊，碰撞撞見"
      },
      {
        "char": "鐘",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "童"
          ]
        ],
        "hint": "金屬樂器與時鐘，鐘聲"
      }
    ]
  },
  {
    "stage": 43,
    "title": "弓矢長宗",
    "subtitle": "源遠流長",
    "components": [
      "弓",
      "弗",
      "弟",
      "長",
      "且"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 140,
    "targets": [
      {
        "char": "張",
        "layout": "lr",
        "recipes": [
          [
            "弓",
            "長"
          ]
        ],
        "hint": "拉開長弓，張開主張"
      },
      {
        "char": "帳",
        "layout": "lr",
        "recipes": [
          [
            "巾",
            "長"
          ]
        ],
        "hint": "布帛帷幕，帳篷蚊帳"
      },
      {
        "char": "費",
        "layout": "tb",
        "recipes": [
          [
            "弗",
            "貝"
          ]
        ],
        "hint": "耗費財貝，費用消費"
      },
      {
        "char": "佛",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "弗"
          ]
        ],
        "hint": "覺悟者，彷彿佛陀"
      },
      {
        "char": "第",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "弟"
          ]
        ],
        "hint": "竹簡編次順序，第一次第"
      },
      {
        "char": "梯",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "弟"
          ]
        ],
        "hint": "木製階梯，樓梯梯子"
      },
      {
        "char": "組",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "且"
          ]
        ],
        "hint": "編織絲帶，組織小組"
      },
      {
        "char": "祖",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "且"
          ]
        ],
        "hint": "祭祀先祖，祖先祖國"
      },
      {
        "char": "助",
        "layout": "lr",
        "recipes": [
          [
            "且",
            "力"
          ]
        ],
        "hint": "增添氣力，幫助協助"
      },
      {
        "char": "姐",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "且"
          ]
        ],
        "hint": "家中長女，姐姐姐妹"
      }
    ]
  },
  {
    "stage": 44,
    "title": "錦帛系冬",
    "subtitle": "四季交匯",
    "components": [
      "帛",
      "系",
      "索",
      "冬",
      "交"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 140,
    "targets": [
      {
        "char": "錦",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "帛"
          ]
        ],
        "hint": "華麗絲織品，錦繡前程"
      },
      {
        "char": "棉",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "帛"
          ]
        ],
        "hint": "木棉柔軟如帛，棉花"
      },
      {
        "char": "孫",
        "layout": "lr",
        "recipes": [
          [
            "子",
            "系"
          ]
        ],
        "hint": "子之子血脈相系，子孫"
      },
      {
        "char": "係",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "系"
          ]
        ],
        "hint": "人與人相聯結，關係"
      },
      {
        "char": "緊",
        "layout": "tri",
        "recipes": [
          [
            "臣",
            "又",
            "系"
          ]
        ],
        "hint": "絲線纏緊，緊張緊急"
      },
      {
        "char": "終",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "冬"
          ]
        ],
        "hint": "絲線盡頭如歲末，終於終點"
      },
      {
        "char": "佟",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "冬"
          ]
        ],
        "hint": "姓氏「佟」"
      },
      {
        "char": "校",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "交"
          ]
        ],
        "hint": "木欄交錯，學校校對"
      },
      {
        "char": "較",
        "layout": "lr",
        "recipes": [
          [
            "車",
            "交"
          ]
        ],
        "hint": "兩車相並比高低，比較"
      },
      {
        "char": "效",
        "layout": "lr",
        "recipes": [
          [
            "交",
            "攵"
          ]
        ],
        "hint": "仿效致力，效果效率"
      },
      {
        "char": "郊",
        "layout": "lr",
        "recipes": [
          [
            "交",
            "邑"
          ]
        ],
        "hint": "城外近郊，郊遊"
      }
    ]
  },
  {
    "stage": 45,
    "title": "堂室同周",
    "subtitle": "四海一家",
    "components": [
      "尚",
      "台",
      "同",
      "周",
      "局"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 150,
    "targets": [
      {
        "char": "堂",
        "layout": "tb",
        "recipes": [
          [
            "尚",
            "土"
          ]
        ],
        "hint": "高大殿堂，禮堂堂皇"
      },
      {
        "char": "常",
        "layout": "tb",
        "recipes": [
          [
            "尚",
            "巾"
          ]
        ],
        "hint": "下裳旗幟，常常平常"
      },
      {
        "char": "當",
        "layout": "tb",
        "recipes": [
          [
            "尚",
            "田"
          ]
        ],
        "hint": "田畝價值相當，應當當時"
      },
      {
        "char": "賞",
        "layout": "tb",
        "recipes": [
          [
            "尚",
            "貝"
          ]
        ],
        "hint": "賜予財貝，獎賞欣賞"
      },
      {
        "char": "掌",
        "layout": "tb",
        "recipes": [
          [
            "尚",
            "手"
          ]
        ],
        "hint": "手心掌管，手掌掌握"
      },
      {
        "char": "始",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "台"
          ]
        ],
        "hint": "萬物之初，開始原始"
      },
      {
        "char": "治",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "台"
          ]
        ],
        "hint": "疏通水流，治理治療"
      },
      {
        "char": "抬",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "台"
          ]
        ],
        "hint": "舉手向上，抬頭抬起"
      },
      {
        "char": "胎",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "台"
          ]
        ],
        "hint": "母腹孕育，胎兒輪胎"
      },
      {
        "char": "洞",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "同"
          ]
        ],
        "hint": "水流貫通，山洞洞察"
      },
      {
        "char": "銅",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "同"
          ]
        ],
        "hint": "赤色金屬，青銅銅牌"
      },
      {
        "char": "週",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "周"
          ]
        ],
        "hint": "循環一圈，週末週期"
      },
      {
        "char": "調",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "周"
          ]
        ],
        "hint": "言辭和諧，調整調查"
      },
      {
        "char": "稠",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "周"
          ]
        ],
        "hint": "禾苗密植，濃稠稠密"
      }
    ]
  },
  {
    "stage": 46,
    "title": "烹煮包句",
    "subtitle": "煙火人間",
    "components": [
      "者",
      "前",
      "勺",
      "包",
      "句"
    ],
    "unlockThreshold": 8,
    "chestRewardCoins": 150,
    "targets": [
      {
        "char": "都",
        "layout": "lr",
        "recipes": [
          [
            "者",
            "邑"
          ]
        ],
        "hint": "天子所居大邑，都市全都"
      },
      {
        "char": "豬",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "者"
          ]
        ],
        "hint": "家畜肥豬"
      },
      {
        "char": "煮",
        "layout": "tb",
        "recipes": [
          [
            "者",
            "火"
          ]
        ],
        "hint": "以火烹煮食物"
      },
      {
        "char": "暑",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "者"
          ]
        ],
        "hint": "烈日當空，暑假酷暑"
      },
      {
        "char": "著",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "者"
          ]
        ],
        "hint": "草木顯現，著名著作"
      },
      {
        "char": "緒",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "者"
          ]
        ],
        "hint": "絲頭端緒，情緒思緒"
      },
      {
        "char": "剪",
        "layout": "tb",
        "recipes": [
          [
            "前",
            "刀"
          ]
        ],
        "hint": "以刀裁斷，剪刀剪裁"
      },
      {
        "char": "煎",
        "layout": "tb",
        "recipes": [
          [
            "前",
            "火"
          ]
        ],
        "hint": "以火慢煎，煎熬"
      },
      {
        "char": "箭",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "前"
          ]
        ],
        "hint": "竹製箭桿，弓箭"
      },
      {
        "char": "釣",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "勺"
          ]
        ],
        "hint": "金屬魚鉤，釣魚"
      },
      {
        "char": "芍",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "勺"
          ]
        ],
        "hint": "草本名花，芍藥"
      },
      {
        "char": "抱",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "包"
          ]
        ],
        "hint": "張臂環抱，懷抱擁抱"
      },
      {
        "char": "跑",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "包"
          ]
        ],
        "hint": "邁足疾奔，跑步奔跑"
      },
      {
        "char": "飽",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "包"
          ]
        ],
        "hint": "腹中滿食，飽滿溫飽"
      },
      {
        "char": "泡",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "包"
          ]
        ],
        "hint": "水中氣泡，浸泡"
      },
      {
        "char": "狗",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "句"
          ]
        ],
        "hint": "忠誠家犬，小狗"
      },
      {
        "char": "夠",
        "layout": "lr",
        "recipes": [
          [
            "句",
            "多"
          ],
          [
            "句",
            "夕",
            "夕"
          ]
        ],
        "hint": "數量充足（句 + 多 或 句 + 夕 + 夕），足夠能夠"
      }
    ]
  },
  {
    "stage": 47,
    "title": "耕耘播種",
    "subtitle": "共襄盛舉",
    "components": [
      "耒",
      "番",
      "畢",
      "異",
      "共"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 150,
    "targets": [
      {
        "char": "耕",
        "layout": "lr",
        "recipes": [
          [
            "耒",
            "井"
          ]
        ],
        "hint": "執犁耕作井田，耕耘"
      },
      {
        "char": "耗",
        "layout": "lr",
        "recipes": [
          [
            "耒",
            "毛"
          ]
        ],
        "hint": "消耗減損，耗費"
      },
      {
        "char": "翻",
        "layout": "lr",
        "recipes": [
          [
            "番",
            "羽"
          ]
        ],
        "hint": "飛鳥翻飛，翻閱翻譯"
      },
      {
        "char": "審",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "番"
          ]
        ],
        "hint": "屋內詳察，審判審查"
      },
      {
        "char": "播",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "番"
          ]
        ],
        "hint": "揮手撒種，播種廣播"
      },
      {
        "char": "潘",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "番"
          ]
        ],
        "hint": "淘米水，姓氏「潘」"
      },
      {
        "char": "翼",
        "layout": "tb",
        "recipes": [
          [
            "羽",
            "異"
          ]
        ],
        "hint": "鳥之雙翅，羽翼翼護"
      },
      {
        "char": "供",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "共"
          ]
        ],
        "hint": "雙手奉獻，提供供應"
      },
      {
        "char": "洪",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "共"
          ]
        ],
        "hint": "大水奔湧，洪水洪亮"
      },
      {
        "char": "恭",
        "layout": "tb",
        "recipes": [
          [
            "共",
            "心"
          ]
        ],
        "hint": "心懷敬意，恭敬恭喜"
      },
      {
        "char": "巷",
        "layout": "tb",
        "recipes": [
          [
            "共",
            "巳"
          ]
        ],
        "hint": "里中通道，街巷小巷"
      }
    ]
  },
  {
    "stage": 48,
    "title": "百獸龍鹿",
    "subtitle": "瑞獸呈祥",
    "components": [
      "豕",
      "豸",
      "鹿",
      "龍",
      "龜"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 150,
    "targets": [
      {
        "char": "家",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "豕"
          ]
        ],
        "hint": "屋下養豕，家庭家園"
      },
      {
        "char": "逐",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "豕"
          ]
        ],
        "hint": "追趕野豬，追逐逐步"
      },
      {
        "char": "隊",
        "layout": "tri",
        "recipes": [
          [
            "阜",
            "八",
            "豕"
          ]
        ],
        "hint": "山坡行軍行列，隊伍團隊"
      },
      {
        "char": "豹",
        "layout": "lr",
        "recipes": [
          [
            "豸",
            "勺"
          ]
        ],
        "hint": "斑紋猛獸，獵豹金錢豹"
      },
      {
        "char": "塵",
        "layout": "tb",
        "recipes": [
          [
            "鹿",
            "土"
          ]
        ],
        "hint": "群鹿奔跑揚起塵土，灰塵"
      },
      {
        "char": "襲",
        "layout": "tb",
        "recipes": [
          [
            "龍",
            "衣"
          ]
        ],
        "hint": "龍袍加身，沿襲襲擊"
      },
      {
        "char": "籠",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "龍"
          ]
        ],
        "hint": "竹編鳥籠，籠罩"
      },
      {
        "char": "聾",
        "layout": "tb",
        "recipes": [
          [
            "龍",
            "耳"
          ]
        ],
        "hint": "耳失聽覺，耳聾"
      },
      {
        "char": "龐",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "龍"
          ]
        ],
        "hint": "高大宏偉，龐大臉龐"
      }
    ]
  },
  {
    "stage": 49,
    "title": "繁花暮色",
    "subtitle": "單雙對映",
    "components": [
      "華",
      "莫",
      "央",
      "單",
      "雙"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 150,
    "targets": [
      {
        "char": "嘩",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "華"
          ]
        ],
        "hint": "眾口喧鬧，喧嘩"
      },
      {
        "char": "樺",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "華"
          ]
        ],
        "hint": "白樺林木"
      },
      {
        "char": "摸",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "莫"
          ]
        ],
        "hint": "伸手暗中探尋，撫摸摸索"
      },
      {
        "char": "膜",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "莫"
          ]
        ],
        "hint": "體內薄皮，薄膜視網膜"
      },
      {
        "char": "漠",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "莫"
          ]
        ],
        "hint": "無水沙海，沙漠冷漠"
      },
      {
        "char": "暮",
        "layout": "tb",
        "recipes": [
          [
            "莫",
            "日"
          ]
        ],
        "hint": "日落草莽之中，黃昏日暮"
      },
      {
        "char": "墓",
        "layout": "tb",
        "recipes": [
          [
            "莫",
            "土"
          ]
        ],
        "hint": "安葬之土丘，墳墓"
      },
      {
        "char": "幕",
        "layout": "tb",
        "recipes": [
          [
            "莫",
            "巾"
          ]
        ],
        "hint": "覆蓋帷帳，螢幕開幕"
      },
      {
        "char": "英",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "央"
          ]
        ],
        "hint": "花草精華，英雄英文"
      },
      {
        "char": "映",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "央"
          ]
        ],
        "hint": "日光照射，倒映反映"
      },
      {
        "char": "泱",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "央"
          ]
        ],
        "hint": "水深廣大，泱泱大國"
      },
      {
        "char": "戰",
        "layout": "lr",
        "recipes": [
          [
            "單",
            "戈"
          ]
        ],
        "hint": "持戈交鋒，戰鬥挑戰"
      },
      {
        "char": "彈",
        "layout": "lr",
        "recipes": [
          [
            "弓",
            "單"
          ]
        ],
        "hint": "拉弓發彈，彈琴子彈"
      },
      {
        "char": "蟬",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "單"
          ]
        ],
        "hint": "夏日鳴蟲，蟬鳴"
      }
    ]
  },
  {
    "stage": 50,
    "title": "四季四方",
    "subtitle": "天地輪轉",
    "components": [
      "春",
      "夏",
      "西",
      "南",
      "北"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 160,
    "targets": [
      {
        "char": "蠢",
        "layout": "tri",
        "recipes": [
          [
            "春",
            "虫",
            "虫"
          ]
        ],
        "hint": "春日萬蟲蠕動，愚蠢"
      },
      {
        "char": "廈",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "夏"
          ]
        ],
        "hint": "高大屋宇，大廈廈門"
      },
      {
        "char": "晒",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "西"
          ]
        ],
        "hint": "日偏西時曝曬，日晒"
      },
      {
        "char": "票",
        "layout": "tb",
        "recipes": [
          [
            "西",
            "示"
          ]
        ],
        "hint": "火光飛躍（西字頭+示），車票選票"
      },
      {
        "char": "楠",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "南"
          ]
        ],
        "hint": "南方珍木，楠木"
      },
      {
        "char": "獻",
        "layout": "lr",
        "recipes": [
          [
            "南",
            "犬"
          ]
        ],
        "hint": "祭祀奉獻，貢獻文獻"
      },
      {
        "char": "背",
        "layout": "tb",
        "recipes": [
          [
            "北",
            "肉"
          ]
        ],
        "hint": "人體背部，背誦背後"
      },
      {
        "char": "敗",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "攵"
          ]
        ],
        "hint": "毀壞財貝，失敗勝敗"
      }
    ]
  },
  {
    "stage": 51,
    "title": "冊典言說",
    "subtitle": "經史流芳",
    "components": [
      "冊",
      "典",
      "吾",
      "咸",
      "唐"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 160,
    "targets": [
      {
        "char": "刪",
        "layout": "lr",
        "recipes": [
          [
            "冊",
            "刀"
          ]
        ],
        "hint": "以刀削去竹簡錯字，刪除"
      },
      {
        "char": "語",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "吾"
          ]
        ],
        "hint": "吾口所言，語言詞語"
      },
      {
        "char": "悟",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "吾"
          ]
        ],
        "hint": "吾心通達，領悟覺悟"
      },
      {
        "char": "梧",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "吾"
          ]
        ],
        "hint": "鳳凰棲息之樹，梧桐"
      },
      {
        "char": "感",
        "layout": "tb",
        "recipes": [
          [
            "咸",
            "心"
          ]
        ],
        "hint": "心有所動，感動感謝"
      },
      {
        "char": "喊",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "咸"
          ]
        ],
        "hint": "張口大聲呼喚，喊叫"
      },
      {
        "char": "減",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "咸"
          ]
        ],
        "hint": "水勢退減，減少加減"
      },
      {
        "char": "鹹",
        "layout": "lr",
        "recipes": [
          [
            "鹵",
            "咸"
          ]
        ],
        "hint": "海鹽之味，鹹淡"
      },
      {
        "char": "糖",
        "layout": "lr",
        "recipes": [
          [
            "米",
            "唐"
          ]
        ],
        "hint": "米麥熬製甜品，糖果"
      },
      {
        "char": "塘",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "唐"
          ]
        ],
        "hint": "築土蓄水，池塘魚塘"
      }
    ]
  },
  {
    "stage": 52,
    "title": "今念會捨",
    "subtitle": "當下轉念",
    "components": [
      "今",
      "念",
      "會",
      "余",
      "舍"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 160,
    "targets": [
      {
        "char": "含",
        "layout": "tb",
        "recipes": [
          [
            "今",
            "口"
          ]
        ],
        "hint": "口中含物，包含含蓄"
      },
      {
        "char": "吟",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "今"
          ]
        ],
        "hint": "低聲詠唱，吟詩"
      },
      {
        "char": "念",
        "layout": "tb",
        "recipes": [
          [
            "今",
            "心"
          ]
        ],
        "hint": "心繫當下，思念想念"
      },
      {
        "char": "捻",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "念"
          ],
          [
            "手",
            "今",
            "心"
          ]
        ],
        "hint": "以指搓轉（手 + 念 或 手 + 今 + 心），拿捻"
      },
      {
        "char": "琴",
        "layout": "tri",
        "recipes": [
          [
            "王",
            "王",
            "今"
          ]
        ],
        "hint": "雙玉弦音，鋼琴古琴"
      },
      {
        "char": "繪",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "會"
          ]
        ],
        "hint": "五彩絲繡，繪畫描繪"
      },
      {
        "char": "檜",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "會"
          ]
        ],
        "hint": "高山神木，紅檜扁柏"
      },
      {
        "char": "除",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "余"
          ]
        ],
        "hint": "台階除去雜物，掃除除了"
      },
      {
        "char": "途",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "余"
          ]
        ],
        "hint": "行經之路，路途前途"
      },
      {
        "char": "徐",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "余"
          ]
        ],
        "hint": "緩步而行，清風徐來"
      },
      {
        "char": "敘",
        "layout": "lr",
        "recipes": [
          [
            "余",
            "攵"
          ]
        ],
        "hint": "條理陳述，敘述敘舊"
      },
      {
        "char": "捨",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "舍"
          ]
        ],
        "hint": "放手施予，捨得取捨"
      }
    ]
  },
  {
    "stage": 53,
    "title": "良善既即",
    "subtitle": "故鄉明月",
    "components": [
      "良",
      "既",
      "即",
      "鄉",
      "朗"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 160,
    "targets": [
      {
        "char": "郎",
        "layout": "lr",
        "recipes": [
          [
            "良",
            "邑"
          ]
        ],
        "hint": "良善男子（良 + 邑作右耳旁），新郎少年郎"
      },
      {
        "char": "廊",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "郎"
          ]
        ],
        "hint": "屋宇兩側走廊，長廊畫廊"
      },
      {
        "char": "浪",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "良"
          ]
        ],
        "hint": "水波翻湧，波浪浪漫"
      },
      {
        "char": "狼",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "良"
          ]
        ],
        "hint": "荒野群狼，狼煙"
      },
      {
        "char": "娘",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "良"
          ]
        ],
        "hint": "善良女子，姑娘新娘"
      },
      {
        "char": "概",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "既"
          ]
        ],
        "hint": "平斗木棒，大概概念"
      },
      {
        "char": "慨",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "既"
          ]
        ],
        "hint": "心懷激昂，慷慨感概"
      },
      {
        "char": "節",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "即"
          ]
        ],
        "hint": "竹節分明，季節禮節"
      },
      {
        "char": "響",
        "layout": "tb",
        "recipes": [
          [
            "鄉",
            "音"
          ]
        ],
        "hint": "回音傳遍四鄉，音響響亮"
      }
    ]
  },
  {
    "stage": 54,
    "title": "宗廟帝皇",
    "subtitle": "王者氣度",
    "components": [
      "宗",
      "帝",
      "皇",
      "侯",
      "爵"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 160,
    "targets": [
      {
        "char": "棕",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "宗"
          ]
        ],
        "hint": "棕櫚之木，棕色"
      },
      {
        "char": "綜",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "宗"
          ]
        ],
        "hint": "織機總匯絲線，綜合綜藝"
      },
      {
        "char": "蹄",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "帝"
          ]
        ],
        "hint": "獸足馬蹄，蹄聲"
      },
      {
        "char": "締",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "帝"
          ]
        ],
        "hint": "絲線結緊，締結取締"
      },
      {
        "char": "煌",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "皇"
          ]
        ],
        "hint": "火光燦爛，輝煌"
      },
      {
        "char": "惶",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "皇"
          ]
        ],
        "hint": "心中驚恐，惶恐惶惑"
      },
      {
        "char": "徨",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "皇"
          ]
        ],
        "hint": "徘徊猶豫，彷徨"
      },
      {
        "char": "猴",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "侯"
          ]
        ],
        "hint": "靈巧猿猴，猴子"
      },
      {
        "char": "喉",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "侯"
          ]
        ],
        "hint": "咽喉要道，喉嚨"
      }
    ]
  },
  {
    "stage": 55,
    "title": "朋輩比並",
    "subtitle": "和諧並進",
    "components": [
      "友",
      "朋",
      "比",
      "並",
      "皆"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 170,
    "targets": [
      {
        "char": "棚",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "朋"
          ]
        ],
        "hint": "木架搭棚，棚架"
      },
      {
        "char": "崩",
        "layout": "tb",
        "recipes": [
          [
            "山",
            "朋"
          ]
        ],
        "hint": "山石坍塌，山崩崩潰"
      },
      {
        "char": "硼",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "朋"
          ]
        ],
        "hint": "礦物元素，硼砂"
      },
      {
        "char": "批",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "比"
          ]
        ],
        "hint": "用手排比評點，批評批准"
      },
      {
        "char": "屁",
        "layout": "enc",
        "recipes": [
          [
            "尸",
            "比"
          ]
        ],
        "hint": "身後排氣"
      },
      {
        "char": "昆",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "比"
          ]
        ],
        "hint": "日光普照眾生，昆蟲崑崙"
      },
      {
        "char": "混",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "昆"
          ]
        ],
        "hint": "水流交融，混合混亂"
      },
      {
        "char": "普",
        "layout": "tb",
        "recipes": [
          [
            "並",
            "日"
          ]
        ],
        "hint": "日光並照大地，普遍普通"
      },
      {
        "char": "譜",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "普"
          ]
        ],
        "hint": "記錄世系樂曲，樂譜食譜"
      },
      {
        "char": "碰",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "並"
          ]
        ],
        "hint": "兩石相擊，碰撞碰面"
      },
      {
        "char": "階",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "皆"
          ]
        ],
        "hint": "山坡台階，階梯階段"
      },
      {
        "char": "諧",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "皆"
          ]
        ],
        "hint": "眾言皆同，和諧幽默"
      }
    ]
  },
  {
    "stage": 56,
    "title": "面首需眉",
    "subtitle": "眉目如畫",
    "components": [
      "面",
      "首",
      "而",
      "眉",
      "顏"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 170,
    "targets": [
      {
        "char": "緬",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "面"
          ]
        ],
        "hint": "遙遠思念，緬懷緬甸"
      },
      {
        "char": "麵",
        "layout": "lr",
        "recipes": [
          [
            "麥",
            "面"
          ]
        ],
        "hint": "小麥磨粉製麵，麵條麵包"
      },
      {
        "char": "道",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "首"
          ]
        ],
        "hint": "人所行之正途，道路道理"
      },
      {
        "char": "導",
        "layout": "tb",
        "recipes": [
          [
            "道",
            "寸"
          ]
        ],
        "hint": "循道指引，引導指導"
      },
      {
        "char": "需",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "而"
          ]
        ],
        "hint": "遇雨待晴，需要需求"
      },
      {
        "char": "儒",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "需"
          ]
        ],
        "hint": "溫文博學之士，儒家儒雅"
      },
      {
        "char": "濡",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "需"
          ]
        ],
        "hint": "水氣浸潤，耳濡目染"
      },
      {
        "char": "媚",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "眉"
          ]
        ],
        "hint": "眉目含情，明媚嫵媚"
      }
    ]
  },
  {
    "stage": 57,
    "title": "思慮專注",
    "subtitle": "勿忘初心",
    "components": [
      "必",
      "勿",
      "乍",
      "專",
      "愛"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 170,
    "targets": [
      {
        "char": "秘",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "必"
          ]
        ],
        "hint": "神禾珍貴，秘密神秘"
      },
      {
        "char": "泌",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "必"
          ]
        ],
        "hint": "泉水細流，分泌"
      },
      {
        "char": "密",
        "layout": "tri",
        "recipes": [
          [
            "宀",
            "必",
            "山"
          ]
        ],
        "hint": "深山屋宇幽靜，秘密緊密"
      },
      {
        "char": "蜜",
        "layout": "tri",
        "recipes": [
          [
            "宀",
            "必",
            "虫"
          ]
        ],
        "hint": "蜂釀甜汁，甜蜜蜂蜜"
      },
      {
        "char": "忽",
        "layout": "tb",
        "recipes": [
          [
            "勿",
            "心"
          ]
        ],
        "hint": "心不在焉（勿 + 心），忽略忽然"
      },
      {
        "char": "吻",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "勿"
          ]
        ],
        "hint": "雙唇相合，親吻吻合"
      },
      {
        "char": "物",
        "layout": "lr",
        "recipes": [
          [
            "牛",
            "勿"
          ]
        ],
        "hint": "天地萬物，物品動物"
      },
      {
        "char": "作",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "乍"
          ]
        ],
        "hint": "人初起身勞作，工作作品"
      },
      {
        "char": "昨",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "乍"
          ]
        ],
        "hint": "剛過去的一日，昨天昨日"
      },
      {
        "char": "怎",
        "layout": "tb",
        "recipes": [
          [
            "乍",
            "心"
          ]
        ],
        "hint": "心中突然疑問，怎麼怎樣"
      },
      {
        "char": "炸",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "乍"
          ]
        ],
        "hint": "火勢猛烈迸發，爆炸油炸"
      },
      {
        "char": "轉",
        "layout": "lr",
        "recipes": [
          [
            "車",
            "專"
          ]
        ],
        "hint": "車輪旋轉，轉動轉變"
      },
      {
        "char": "傳",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "專"
          ]
        ],
        "hint": "人際相傳，傳遞傳說"
      },
      {
        "char": "磚",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "專"
          ]
        ],
        "hint": "燒土成石塊，磚塊"
      },
      {
        "char": "團",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "專"
          ]
        ],
        "hint": "圓聚一處，團結團體"
      }
    ]
  },
  {
    "stage": 58,
    "title": "几案凡丸",
    "subtitle": "憑欄猶思",
    "components": [
      "几",
      "凡",
      "丸",
      "酉",
      "亢"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 170,
    "targets": [
      {
        "char": "馮",
        "layout": "lr",
        "recipes": [
          [
            "冫",
            "馬"
          ]
        ],
        "hint": "駿馬疾馳（冰+馬），姓氏「馮」"
      },
      {
        "char": "憑",
        "layout": "tb",
        "recipes": [
          [
            "馮",
            "心"
          ],
          [
            "冫",
            "馬",
            "心"
          ]
        ],
        "hint": "正體「憑」：馮 + 心（或 冫 + 馬 + 心），憑藉文憑"
      },
      {
        "char": "酋",
        "layout": "tb",
        "recipes": [
          [
            "八",
            "酉"
          ]
        ],
        "hint": "釀酒陳熟，酋長"
      },
      {
        "char": "猶",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "酋"
          ],
          [
            "犬",
            "八",
            "酉"
          ]
        ],
        "hint": "正體「猶」：犭 + 酋（或 犭 + 八 + 酉），猶豫猶如"
      },
      {
        "char": "肌",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "几"
          ]
        ],
        "hint": "身軀肌肉，肌膚"
      },
      {
        "char": "飢",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "几"
          ]
        ],
        "hint": "腹中缺食，飢餓"
      },
      {
        "char": "帆",
        "layout": "lr",
        "recipes": [
          [
            "巾",
            "凡"
          ]
        ],
        "hint": "船上風帆，一帆風順"
      },
      {
        "char": "汎",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "凡"
          ]
        ],
        "hint": "水波浮動，廣泛"
      },
      {
        "char": "航",
        "layout": "lr",
        "recipes": [
          [
            "舟",
            "亢"
          ]
        ],
        "hint": "方舟遠航，航空航海"
      },
      {
        "char": "抗",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "亢"
          ]
        ],
        "hint": "舉手抵禦，抵抗反抗"
      },
      {
        "char": "坑",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "亢"
          ]
        ],
        "hint": "地面凹陷，土坑坑洞"
      },
      {
        "char": "杭",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "亢"
          ]
        ],
        "hint": "渡船方舟，杭州"
      }
    ]
  },
  {
    "stage": 59,
    "title": "數字進位",
    "subtitle": "四五六七九",
    "components": [
      "四",
      "五",
      "六",
      "七",
      "九"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 170,
    "targets": [
      {
        "char": "泗",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "四"
          ]
        ],
        "hint": "古水名，涕泗縱橫"
      },
      {
        "char": "伍",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "五"
          ]
        ],
        "hint": "五人為伍，隊伍"
      },
      {
        "char": "切",
        "layout": "lr",
        "recipes": [
          [
            "七",
            "刀"
          ]
        ],
        "hint": "以刀切斷，切磋親切"
      },
      {
        "char": "砌",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "切"
          ]
        ],
        "hint": "堆疊石磚，砌牆雕砌"
      },
      {
        "char": "究",
        "layout": "tb",
        "recipes": [
          [
            "穴",
            "九"
          ]
        ],
        "hint": "深入洞穴探尋，研究究竟"
      },
      {
        "char": "鳩",
        "layout": "lr",
        "recipes": [
          [
            "九",
            "鳥"
          ]
        ],
        "hint": "斑鳩飛鳥"
      },
      {
        "char": "軌",
        "layout": "lr",
        "recipes": [
          [
            "車",
            "九"
          ]
        ],
        "hint": "車輪行駛之跡，軌道軌跡"
      },
      {
        "char": "仇",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "九"
          ]
        ],
        "hint": "對立怨恨，仇恨報仇"
      }
    ]
  },
  {
    "stage": 60,
    "title": "百千萬幸",
    "subtitle": "厚德載物",
    "components": [
      "百",
      "千",
      "萬",
      "幸",
      "厚"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 180,
    "targets": [
      {
        "char": "陌",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "百"
          ]
        ],
        "hint": "田間小路，陌生阡陌"
      },
      {
        "char": "佰",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "百"
          ]
        ],
        "hint": "百人之長，大寫百「佰」"
      },
      {
        "char": "宿",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "佰"
          ],
          [
            "宀",
            "人",
            "百"
          ]
        ],
        "hint": "百人同居屋下（宀 + 佰 或 宀 + 人 + 百），住宿星宿"
      },
      {
        "char": "邁",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "萬"
          ]
        ],
        "hint": "大步遠行，邁進豪邁"
      },
      {
        "char": "勵",
        "layout": "tri",
        "recipes": [
          [
            "厂",
            "萬",
            "力"
          ]
        ],
        "hint": "磨礪勉力，鼓勵激勵"
      },
      {
        "char": "執",
        "layout": "lr",
        "recipes": [
          [
            "幸",
            "丸"
          ]
        ],
        "hint": "手持捕具，執行執著"
      },
      {
        "char": "墊",
        "layout": "tb",
        "recipes": [
          [
            "執",
            "土"
          ]
        ],
        "hint": "鋪土填平，鋪墊坐墊"
      },
      {
        "char": "報",
        "layout": "tri",
        "recipes": [
          [
            "幸",
            "卩",
            "又"
          ]
        ],
        "hint": "奉上回報，報告報答"
      }
    ]
  },
  {
    "stage": 61,
    "title": "亭台郭敦",
    "subtitle": "敦厚淳樸",
    "components": [
      "享",
      "孰",
      "尞",
      "冓",
      "豪"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 180,
    "targets": [
      {
        "char": "郭",
        "layout": "lr",
        "recipes": [
          [
            "享",
            "邑"
          ]
        ],
        "hint": "外城城郭（享 + 邑），姓氏「郭」"
      },
      {
        "char": "廓",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "郭"
          ]
        ],
        "hint": "開闊外城，輪廓開廓"
      },
      {
        "char": "敦",
        "layout": "lr",
        "recipes": [
          [
            "享",
            "攵"
          ]
        ],
        "hint": "厚道誠懇（享 + 攵），敦厚敦煌"
      },
      {
        "char": "墩",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "敦"
          ]
        ],
        "hint": "厚實土堆，橋墩土墩"
      },
      {
        "char": "燉",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "敦"
          ]
        ],
        "hint": "文火慢煮，清燉"
      },
      {
        "char": "醇",
        "layout": "lr",
        "recipes": [
          [
            "酉",
            "享"
          ]
        ],
        "hint": "美酒濃厚，香醇醇厚"
      },
      {
        "char": "淳",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "享"
          ]
        ],
        "hint": "水清質樸，淳樸"
      },
      {
        "char": "熟",
        "layout": "tb",
        "recipes": [
          [
            "孰",
            "火"
          ]
        ],
        "hint": "火候已到，成熟熟悉"
      },
      {
        "char": "壕",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "豪"
          ]
        ],
        "hint": "護城深溝，戰壕壕溝"
      }
    ]
  },
  {
    "stage": 62,
    "title": "祭祀巫靈",
    "subtitle": "天地靈氣",
    "components": [
      "祭",
      "豐",
      "巫",
      "兆",
      "宣"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 180,
    "targets": [
      {
        "char": "霝",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "品"
          ],
          [
            "雨",
            "口",
            "口",
            "口"
          ]
        ],
        "hint": "雨落如珠（雨 + 品），「靈」之聲旁"
      },
      {
        "char": "靈",
        "layout": "tb",
        "recipes": [
          [
            "霝",
            "巫"
          ],
          [
            "雨",
            "品",
            "巫"
          ]
        ],
        "hint": "巫祝祈雨降神（霝 + 巫），靈魂心靈"
      },
      {
        "char": "察",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "祭"
          ]
        ],
        "hint": "屋內明察秋毫，觀察警察"
      },
      {
        "char": "際",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "祭"
          ]
        ],
        "hint": "山崖交界處，邊際國際"
      },
      {
        "char": "擦",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "察"
          ]
        ],
        "hint": "以手摩擦拭淨，擦拭"
      },
      {
        "char": "禮",
        "layout": "tri",
        "recipes": [
          [
            "示",
            "曲",
            "豆"
          ]
        ],
        "hint": "祭器盛玉行禮，禮貌禮儀"
      },
      {
        "char": "桃",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "兆"
          ]
        ],
        "hint": "春日桃花，桃李"
      },
      {
        "char": "逃",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "兆"
          ]
        ],
        "hint": "急步逃離，逃跑逃避"
      },
      {
        "char": "跳",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "兆"
          ]
        ],
        "hint": "雙足躍起，跳躍跳舞"
      },
      {
        "char": "挑",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "兆"
          ]
        ],
        "hint": "肩挑手選，挑選挑戰"
      },
      {
        "char": "喧",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "宣"
          ]
        ],
        "hint": "大聲喧嘩，喧鬧"
      },
      {
        "char": "渲",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "宣"
          ]
        ],
        "hint": "水墨暈染，渲染"
      }
    ]
  },
  {
    "stage": 63,
    "title": "武器威戎",
    "subtitle": "剛柔並濟",
    "components": [
      "戌",
      "武",
      "戎",
      "斬",
      "斯"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 180,
    "targets": [
      {
        "char": "威",
        "layout": "enc",
        "recipes": [
          [
            "戌",
            "女"
          ]
        ],
        "hint": "威嚴莊重，威力威風"
      },
      {
        "char": "滅",
        "layout": "tri",
        "recipes": [
          [
            "水",
            "戌",
            "火"
          ]
        ],
        "hint": "以水熄滅烈火，消滅熄滅"
      },
      {
        "char": "賦",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "武"
          ]
        ],
        "hint": "徵收財賦，天賦詩賦"
      },
      {
        "char": "絨",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "戎"
          ]
        ],
        "hint": "細軟絲毛，絨毛羽絨"
      },
      {
        "char": "漸",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "斬"
          ]
        ],
        "hint": "水勢漸進浸潤，逐漸漸進"
      },
      {
        "char": "暫",
        "layout": "tb",
        "recipes": [
          [
            "斬",
            "日"
          ]
        ],
        "hint": "短暫時日，暫時"
      },
      {
        "char": "慚",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "斬"
          ]
        ],
        "hint": "心中愧疚，慚愧"
      },
      {
        "char": "撕",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "斯"
          ]
        ],
        "hint": "以手扯裂，撕開撕裂"
      },
      {
        "char": "嘶",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "斯"
          ]
        ],
        "hint": "馬鳴聲啞，嘶吼"
      }
    ]
  },
  {
    "stage": 64,
    "title": "其斯甚堪",
    "subtitle": "博大精深",
    "components": [
      "其",
      "甚",
      "匹",
      "區",
      "巨"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 180,
    "targets": [
      {
        "char": "期",
        "layout": "lr",
        "recipes": [
          [
            "其",
            "月"
          ]
        ],
        "hint": "日月循環週期，期待日期"
      },
      {
        "char": "欺",
        "layout": "lr",
        "recipes": [
          [
            "其",
            "欠"
          ]
        ],
        "hint": "欺騙欺負"
      },
      {
        "char": "棋",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "其"
          ]
        ],
        "hint": "木製棋盤，圍棋象棋"
      },
      {
        "char": "基",
        "layout": "tb",
        "recipes": [
          [
            "其",
            "土"
          ]
        ],
        "hint": "牆腳地基，基礎基本"
      },
      {
        "char": "勘",
        "layout": "lr",
        "recipes": [
          [
            "甚",
            "力"
          ]
        ],
        "hint": "竭力查核，勘察校勘"
      },
      {
        "char": "堪",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "甚"
          ]
        ],
        "hint": "地勢高突可承重，堪稱難堪"
      },
      {
        "char": "斟",
        "layout": "lr",
        "recipes": [
          [
            "甚",
            "斗"
          ]
        ],
        "hint": "以斗酌酒，斟酌"
      },
      {
        "char": "歐",
        "layout": "lr",
        "recipes": [
          [
            "區",
            "欠"
          ]
        ],
        "hint": "歌唱聲區，歐洲"
      },
      {
        "char": "驅",
        "layout": "lr",
        "recipes": [
          [
            "馬",
            "區"
          ]
        ],
        "hint": "策馬奔馳，驅動先驅"
      },
      {
        "char": "樞",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "區"
          ]
        ],
        "hint": "門軸中心，樞紐中樞"
      },
      {
        "char": "嘔",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "區"
          ]
        ],
        "hint": "張口嘔吐"
      },
      {
        "char": "距",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "巨"
          ]
        ],
        "hint": "兩足跨度，距離差距"
      },
      {
        "char": "拒",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "巨"
          ]
        ],
        "hint": "伸手阻擋，拒絕抗拒"
      },
      {
        "char": "矩",
        "layout": "lr",
        "recipes": [
          [
            "矢",
            "巨"
          ]
        ],
        "hint": "畫方之器，規矩矩形"
      }
    ]
  },
  {
    "stage": 65,
    "title": "尊長孝道",
    "subtitle": "敬老尊賢",
    "components": [
      "耂",
      "匕",
      "亞",
      "匚",
      "醫"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 190,
    "targets": [
      {
        "char": "老",
        "layout": "tb",
        "recipes": [
          [
            "耂",
            "匕"
          ]
        ],
        "hint": "長者拄杖，老人老師"
      },
      {
        "char": "比",
        "layout": "lr",
        "recipes": [
          [
            "匕",
            "匕"
          ]
        ],
        "hint": "二人並肩比較，比喻比賽"
      },
      {
        "char": "孝",
        "layout": "tb",
        "recipes": [
          [
            "耂",
            "子"
          ]
        ],
        "hint": "子承老者，孝順孝道"
      },
      {
        "char": "教",
        "layout": "lr",
        "recipes": [
          [
            "孝",
            "攵"
          ]
        ],
        "hint": "督促子弟學習，教育教學"
      },
      {
        "char": "惡",
        "layout": "tb",
        "recipes": [
          [
            "亞",
            "心"
          ]
        ],
        "hint": "心存厭惡邪惡，善惡"
      },
      {
        "char": "啞",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "亞"
          ]
        ],
        "hint": "口不能言，啞巴沙啞"
      },
      {
        "char": "匠",
        "layout": "enc",
        "recipes": [
          [
            "匚",
            "斤"
          ]
        ],
        "hint": "木匠執斧斤，工匠匠心"
      }
    ]
  },
  {
    "stage": 66,
    "title": "絲織純粹",
    "subtitle": "曉風殘月",
    "components": [
      "堯",
      "俞",
      "卒",
      "率",
      "素"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 190,
    "targets": [
      {
        "char": "燒",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "堯"
          ]
        ],
        "hint": "烈火焚燒，燃燒發燒"
      },
      {
        "char": "曉",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "堯"
          ]
        ],
        "hint": "天色破曉，知曉春曉"
      },
      {
        "char": "澆",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "堯"
          ]
        ],
        "hint": "以水灌溉，澆花澆水"
      },
      {
        "char": "繞",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "堯"
          ]
        ],
        "hint": "絲線纏繞，環繞圍繞"
      },
      {
        "char": "偷",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "俞"
          ]
        ],
        "hint": "暗中竊取，小偷偷閒"
      },
      {
        "char": "輸",
        "layout": "lr",
        "recipes": [
          [
            "車",
            "俞"
          ]
        ],
        "hint": "車載運送，運輸輸贏"
      },
      {
        "char": "愉",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "俞"
          ]
        ],
        "hint": "心中喜悅，愉快愉悅"
      },
      {
        "char": "愈",
        "layout": "tb",
        "recipes": [
          [
            "俞",
            "心"
          ]
        ],
        "hint": "病痛漸好，痊愈愈發"
      },
      {
        "char": "醉",
        "layout": "lr",
        "recipes": [
          [
            "酉",
            "卒"
          ]
        ],
        "hint": "飲酒過量而醉，陶醉醉意"
      },
      {
        "char": "碎",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "卒"
          ]
        ],
        "hint": "石破成細塊，破碎心碎"
      },
      {
        "char": "翠",
        "layout": "tb",
        "recipes": [
          [
            "羽",
            "卒"
          ]
        ],
        "hint": "翠鳥碧羽，翠綠翡翠"
      },
      {
        "char": "摔",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "率"
          ]
        ],
        "hint": "用力擲落，摔倒"
      }
    ]
  },
  {
    "stage": 67,
    "title": "金石真純",
    "subtitle": "百煉成鋼",
    "components": [
      "段",
      "真",
      "彔",
      "屯",
      "班"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 190,
    "targets": [
      {
        "char": "鍛",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "段"
          ]
        ],
        "hint": "錘鍊金屬，鍛鍊鍛造"
      },
      {
        "char": "緞",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "段"
          ]
        ],
        "hint": "光滑絲織品，綢緞錦緞"
      },
      {
        "char": "鎮",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "真"
          ]
        ],
        "hint": "金屬重器壓陣，鎮定城鎮"
      },
      {
        "char": "填",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "真"
          ]
        ],
        "hint": "以土充實，填寫填充"
      },
      {
        "char": "慎",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "真"
          ]
        ],
        "hint": "心懷真誠敬畏，謹慎慎重"
      },
      {
        "char": "綠",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "彔"
          ]
        ],
        "hint": "青黃相間絲色（糸 + 彔），綠色綠葉"
      },
      {
        "char": "碌",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "彔"
          ]
        ],
        "hint": "多石貌（石 + 彔），忙碌庸碌"
      },
      {
        "char": "祿",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "彔"
          ]
        ],
        "hint": "神賜福祿（示 + 彔），俸祿福祿"
      },
      {
        "char": "錄",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "彔"
          ]
        ],
        "hint": "刻於金屬（金 + 彔），記錄目錄"
      },
      {
        "char": "淥",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "彔"
          ]
        ],
        "hint": "水清澈（水 + 彔），淥水"
      },
      {
        "char": "純",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "屯"
          ]
        ],
        "hint": "純淨無雜絲線，純潔單純"
      },
      {
        "char": "頓",
        "layout": "lr",
        "recipes": [
          [
            "屯",
            "頁"
          ]
        ],
        "hint": "低頭叩首，頓時停頓"
      }
    ]
  },
  {
    "stage": 68,
    "title": "宮室官館",
    "subtitle": "海濱賓客",
    "components": [
      "官",
      "宜",
      "宛",
      "賓",
      "寬"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 190,
    "targets": [
      {
        "char": "管",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "官"
          ]
        ],
        "hint": "竹製樂管，管理血管"
      },
      {
        "char": "館",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "官"
          ]
        ],
        "hint": "客舍餐館，博物館圖書館"
      },
      {
        "char": "棺",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "官"
          ]
        ],
        "hint": "木製棺槨，棺材"
      },
      {
        "char": "誼",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "宜"
          ]
        ],
        "hint": "言辭相宜，友誼情誼"
      },
      {
        "char": "碗",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "宛"
          ]
        ],
        "hint": "石製盛器，飯碗碗筷"
      },
      {
        "char": "婉",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "宛"
          ]
        ],
        "hint": "女子柔順，委婉婉約"
      },
      {
        "char": "濱",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "賓"
          ]
        ],
        "hint": "水邊海岸，海濱濱海"
      },
      {
        "char": "檳",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "賓"
          ]
        ],
        "hint": "南國棕櫚，檳榔"
      },
      {
        "char": "髖",
        "layout": "lr",
        "recipes": [
          [
            "骨",
            "寬"
          ]
        ],
        "hint": "骨盆大骨，髖關節"
      }
    ]
  },
  {
    "stage": 69,
    "title": "車輪是非",
    "subtitle": "旅途旋舞",
    "components": [
      "非",
      "侖",
      "旅",
      "族",
      "旋"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 190,
    "targets": [
      {
        "char": "排",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "非"
          ]
        ],
        "hint": "以手推擠排列，安排排隊"
      },
      {
        "char": "菲",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "非"
          ]
        ],
        "hint": "草木芳菲，菲薄"
      },
      {
        "char": "悲",
        "layout": "tb",
        "recipes": [
          [
            "非",
            "心"
          ]
        ],
        "hint": "心違所願，悲傷慈悲"
      },
      {
        "char": "啡",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "非"
          ]
        ],
        "hint": "香濃飲品，咖啡"
      },
      {
        "char": "輪",
        "layout": "lr",
        "recipes": [
          [
            "車",
            "侖"
          ]
        ],
        "hint": "車輪滾滾，輪流輪船"
      },
      {
        "char": "論",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "侖"
          ]
        ],
        "hint": "條理分明之言，討論理論"
      },
      {
        "char": "倫",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "侖"
          ]
        ],
        "hint": "人際倫常，倫理無與倫比"
      },
      {
        "char": "淪",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "侖"
          ]
        ],
        "hint": "水波下沉，淪陷沉淪"
      },
      {
        "char": "膂",
        "layout": "tb",
        "recipes": [
          [
            "旅",
            "肉"
          ]
        ],
        "hint": "脊梁骨肉（旅 + 肉），膂力過人"
      },
      {
        "char": "簇",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "族"
          ]
        ],
        "hint": "竹叢聚集，花團錦簇"
      },
      {
        "char": "漩",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "旋"
          ]
        ],
        "hint": "水流旋轉，漩渦"
      }
    ]
  },
  {
    "stage": 70,
    "title": "善義書律",
    "subtitle": "法理筆墨",
    "components": [
      "善",
      "義",
      "聿",
      "罒",
      "开"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 200,
    "targets": [
      {
        "char": "膳",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "善"
          ]
        ],
        "hint": "佳餚美食，膳食膳宿"
      },
      {
        "char": "議",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "義"
          ]
        ],
        "hint": "商議大義，會議議論"
      },
      {
        "char": "儀",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "義"
          ]
        ],
        "hint": "端莊禮儀，儀式儀器"
      },
      {
        "char": "蟻",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "義"
          ]
        ],
        "hint": "群居小蟲，螞蟻"
      },
      {
        "char": "筆",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "聿"
          ]
        ],
        "hint": "竹管毛毫，毛筆筆記"
      },
      {
        "char": "書",
        "layout": "tb",
        "recipes": [
          [
            "聿",
            "日"
          ]
        ],
        "hint": "執筆記述日常，書籍書法"
      },
      {
        "char": "律",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "聿"
          ]
        ],
        "hint": "行為準則，法律規律"
      },
      {
        "char": "建",
        "layout": "enc",
        "recipes": [
          [
            "廴",
            "聿"
          ]
        ],
        "hint": "樹立制度，建設建築"
      },
      {
        "char": "罪",
        "layout": "tb",
        "recipes": [
          [
            "罒",
            "非"
          ]
        ],
        "hint": "觸犯法網為非，罪過"
      },
      {
        "char": "刑",
        "layout": "lr",
        "recipes": [
          [
            "开",
            "刀"
          ]
        ],
        "hint": "法刀懲戒，刑法刑罰"
      },
      {
        "char": "研",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "开"
          ]
        ],
        "hint": "磨石細究，研究鑽研"
      }
    ]
  },
  {
    "stage": 71,
    "title": "內外門戶",
    "subtitle": "迴避兩全",
    "components": [
      "內",
      "兩",
      "爾",
      "辟",
      "免"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 200,
    "targets": [
      {
        "char": "納",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "內"
          ]
        ],
        "hint": "絲線收入，接納納涼"
      },
      {
        "char": "吶",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "內"
          ]
        ],
        "hint": "大聲吶喊"
      },
      {
        "char": "訥",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "內"
          ]
        ],
        "hint": "言辭謹慎，木訥"
      },
      {
        "char": "輛",
        "layout": "lr",
        "recipes": [
          [
            "車",
            "兩"
          ]
        ],
        "hint": "車有兩輪，車輛"
      },
      {
        "char": "倆",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "兩"
          ]
        ],
        "hint": "兩人同行，哥兒倆"
      },
      {
        "char": "彌",
        "layout": "lr",
        "recipes": [
          [
            "弓",
            "爾"
          ]
        ],
        "hint": "長弓滿張，彌補彌漫"
      },
      {
        "char": "璽",
        "layout": "tb",
        "recipes": [
          [
            "爾",
            "玉"
          ]
        ],
        "hint": "帝王玉印，玉璽"
      },
      {
        "char": "避",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "辟"
          ]
        ],
        "hint": "轉身躲開，避免逃避"
      },
      {
        "char": "壁",
        "layout": "tb",
        "recipes": [
          [
            "辟",
            "土"
          ]
        ],
        "hint": "土砌牆垣，牆壁懸崖峭壁"
      },
      {
        "char": "臂",
        "layout": "tb",
        "recipes": [
          [
            "辟",
            "肉"
          ]
        ],
        "hint": "人身手臂，臂膀"
      },
      {
        "char": "劈",
        "layout": "tb",
        "recipes": [
          [
            "辟",
            "刀"
          ]
        ],
        "hint": "以刀剖開，劈開"
      },
      {
        "char": "晚",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "免"
          ]
        ],
        "hint": "日落時分，夜晚晚安"
      },
      {
        "char": "挽",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "免"
          ]
        ],
        "hint": "伸手牽引，挽留挽回"
      },
      {
        "char": "勉",
        "layout": "enc",
        "recipes": [
          [
            "免",
            "力"
          ]
        ],
        "hint": "竭力而為，勉勵勤勉"
      },
      {
        "char": "逸",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "免"
          ]
        ],
        "hint": "奔逃安閒，安逸飄逸"
      }
    ]
  },
  {
    "stage": 72,
    "title": "言談辯爭",
    "subtitle": "平心靜氣",
    "components": [
      "責",
      "爭",
      "平",
      "乎",
      "受"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 200,
    "targets": [
      {
        "char": "債",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "責"
          ]
        ],
        "hint": "人所負欠，債務債券"
      },
      {
        "char": "積",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "責"
          ]
        ],
        "hint": "禾穀堆積，累積積極"
      },
      {
        "char": "績",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "責"
          ]
        ],
        "hint": "紡織成果，成績績效"
      },
      {
        "char": "漬",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "責"
          ]
        ],
        "hint": "水浸染污，水漬醃漬"
      },
      {
        "char": "靜",
        "layout": "lr",
        "recipes": [
          [
            "青",
            "爭"
          ]
        ],
        "hint": "色彩青雅安寧，安靜平靜"
      },
      {
        "char": "淨",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "爭"
          ]
        ],
        "hint": "水洗潔淨，乾淨純淨"
      },
      {
        "char": "睜",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "爭"
          ]
        ],
        "hint": "張開雙目，睜眼"
      },
      {
        "char": "掙",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "爭"
          ]
        ],
        "hint": "用力擺脫，掙扎掙錢"
      },
      {
        "char": "評",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "平"
          ]
        ],
        "hint": "言辭公正評論，批評評價"
      },
      {
        "char": "坪",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "平"
          ]
        ],
        "hint": "平坦地面，草坪坪數"
      },
      {
        "char": "秤",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "平"
          ]
        ],
        "hint": "衡器稱重，天秤"
      },
      {
        "char": "苹",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "平"
          ]
        ],
        "hint": "水草浮萍，蘋果"
      },
      {
        "char": "呼",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "乎"
          ]
        ],
        "hint": "張口吐氣，呼吸呼喚"
      },
      {
        "char": "授",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "受"
          ]
        ],
        "hint": "親手交付，教授授權"
      },
      {
        "char": "綬",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "受"
          ]
        ],
        "hint": "繫印絲帶，綬帶"
      }
    ]
  },
  {
    "stage": 73,
    "title": "山川原野",
    "subtitle": "佳偶天成",
    "components": [
      "原",
      "隹",
      "奇",
      "喬",
      "奚"
    ],
    "unlockThreshold": 9,
    "chestRewardCoins": 200,
    "targets": [
      {
        "char": "雞",
        "layout": "lr",
        "recipes": [
          [
            "奚",
            "隹"
          ]
        ],
        "hint": "正體「雞」：奚 + 隹（短尾鳥），公雞母雞"
      },
      {
        "char": "誰",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "隹"
          ]
        ],
        "hint": "出言發問，是誰"
      },
      {
        "char": "推",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "隹"
          ]
        ],
        "hint": "伸手向前推動，推廣推理"
      },
      {
        "char": "堆",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "隹"
          ]
        ],
        "hint": "土石聚積，堆積土堆"
      },
      {
        "char": "集",
        "layout": "tb",
        "recipes": [
          [
            "隹",
            "木"
          ]
        ],
        "hint": "群鳥棲息木上，集合收集"
      },
      {
        "char": "進",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "隹"
          ]
        ],
        "hint": "鳥飛只進不退，前進進步"
      },
      {
        "char": "準",
        "layout": "tri",
        "recipes": [
          [
            "水",
            "隹",
            "十"
          ]
        ],
        "hint": "水準測量精確，準備標準"
      },
      {
        "char": "源",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "原"
          ]
        ],
        "hint": "水流發源處，源頭資源"
      },
      {
        "char": "願",
        "layout": "lr",
        "recipes": [
          [
            "原",
            "頁"
          ]
        ],
        "hint": "心中期盼，願望願意"
      },
      {
        "char": "愿",
        "layout": "tb",
        "recipes": [
          [
            "原",
            "心"
          ]
        ],
        "hint": "謹慎誠懇，心愿"
      },
      {
        "char": "騎",
        "layout": "lr",
        "recipes": [
          [
            "馬",
            "奇"
          ]
        ],
        "hint": "跨坐駿馬，騎馬騎士"
      },
      {
        "char": "寄",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "奇"
          ]
        ],
        "hint": "暫居屋下，寄託郵寄"
      },
      {
        "char": "椅",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "奇"
          ]
        ],
        "hint": "木製靠背坐具，椅子"
      },
      {
        "char": "崎",
        "layout": "lr",
        "recipes": [
          [
            "山",
            "奇"
          ]
        ],
        "hint": "山路險峻，崎嶇"
      },
      {
        "char": "橋",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "喬"
          ]
        ],
        "hint": "架木跨水，橋樑"
      },
      {
        "char": "僑",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "喬"
          ]
        ],
        "hint": "旅居他鄉之人，華僑僑胞"
      },
      {
        "char": "嬌",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "喬"
          ]
        ],
        "hint": "女子柔美，嬌嫩撒嬌"
      },
      {
        "char": "驕",
        "layout": "lr",
        "recipes": [
          [
            "馬",
            "喬"
          ]
        ],
        "hint": "駿馬高昂，驕傲"
      },
      {
        "char": "溪",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "奚"
          ]
        ],
        "hint": "山間流水，溪流小溪"
      }
    ]
  },
  {
    "stage": 74,
    "title": "登高望遠",
    "subtitle": "金鑑華麗",
    "components": [
      "登",
      "發",
      "監",
      "嚴",
      "麗"
    ],
    "unlockThreshold": 8,
    "chestRewardCoins": 200,
    "targets": [
      {
        "char": "燈",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "登"
          ]
        ],
        "hint": "燃火照明，燈火電燈"
      },
      {
        "char": "證",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "登"
          ]
        ],
        "hint": "言辭確鑿，證明證據"
      },
      {
        "char": "澄",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "登"
          ]
        ],
        "hint": "水清見底，澄清澄澈"
      },
      {
        "char": "凳",
        "layout": "tb",
        "recipes": [
          [
            "登",
            "几"
          ]
        ],
        "hint": "無靠背坐具，板凳"
      },
      {
        "char": "廢",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "發"
          ]
        ],
        "hint": "屋宇傾頹，廢棄廢物"
      },
      {
        "char": "潑",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "發"
          ]
        ],
        "hint": "傾水灑出，活潑潑水"
      },
      {
        "char": "撥",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "發"
          ]
        ],
        "hint": "以手撥動，撥打點撥"
      },
      {
        "char": "藍",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "監"
          ]
        ],
        "hint": "蓼藍染青，藍色藍天"
      },
      {
        "char": "籃",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "監"
          ]
        ],
        "hint": "竹編提籃，籃球"
      },
      {
        "char": "鑑",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "監"
          ]
        ],
        "hint": "銅鏡映照，鑑賞借鑑"
      },
      {
        "char": "檻",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "監"
          ]
        ],
        "hint": "門下橫木，門檻"
      },
      {
        "char": "艦",
        "layout": "lr",
        "recipes": [
          [
            "舟",
            "監"
          ]
        ],
        "hint": "大型戰船，軍艦艦隊"
      },
      {
        "char": "濫",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "監"
          ]
        ],
        "hint": "洪水氾濫，濫用"
      },
      {
        "char": "儼",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "嚴"
          ]
        ],
        "hint": "莊重威嚴，儼然"
      },
      {
        "char": "灑",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "麗"
          ]
        ],
        "hint": "水珠飄落，瀟灑灑脫"
      },
      {
        "char": "曬",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "麗"
          ]
        ],
        "hint": "日光曝曬，防曬"
      }
    ]
  },
  {
    "stage": 75,
    "title": "環珮珍寶",
    "subtitle": "散漫從容",
    "components": [
      "睘",
      "㐱",
      "曼",
      "散",
      "敢"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 210,
    "targets": [
      {
        "char": "環",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "睘"
          ]
        ],
        "hint": "圓形玉環，環境循環"
      },
      {
        "char": "還",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "睘"
          ]
        ],
        "hint": "歸還返回，還是"
      },
      {
        "char": "懷",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "睘"
          ]
        ],
        "hint": "心藏思念，懷抱懷念"
      },
      {
        "char": "壞",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "睘"
          ]
        ],
        "hint": "土牆崩壞，破壞好壞"
      },
      {
        "char": "珍",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "㐱"
          ]
        ],
        "hint": "稀世美玉，珍貴珍珠"
      },
      {
        "char": "診",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "㐱"
          ]
        ],
        "hint": "望聞問切診病，診斷門診"
      },
      {
        "char": "趁",
        "layout": "enc",
        "recipes": [
          [
            "走",
            "㐱"
          ]
        ],
        "hint": "趁勢追趕，趁早"
      },
      {
        "char": "慢",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "曼"
          ]
        ],
        "hint": "性情舒緩，緩慢慢慢"
      },
      {
        "char": "漫",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "曼"
          ]
        ],
        "hint": "大水無邊，浪漫漫畫"
      },
      {
        "char": "蔓",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "曼"
          ]
        ],
        "hint": "藤蔓蔓延"
      },
      {
        "char": "饅",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "曼"
          ]
        ],
        "hint": "麵食蒸餅，饅頭"
      },
      {
        "char": "撒",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "散"
          ]
        ],
        "hint": "揮手散播，撒嬌撒種"
      },
      {
        "char": "橄",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "敢"
          ]
        ],
        "hint": "橄欖果樹"
      },
      {
        "char": "瞰",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "敢"
          ]
        ],
        "hint": "居高下望，鳥瞰俯瞰"
      }
    ]
  },
  {
    "stage": 76,
    "title": "疾病痛癢",
    "subtitle": "懸壺濟世",
    "components": [
      "疒",
      "艮",
      "甬",
      "尞",
      "叟"
    ],
    "unlockThreshold": 10,
    "chestRewardCoins": 210,
    "targets": [
      {
        "char": "病",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "丙"
          ]
        ],
        "hint": "臥床生病，疾病生病"
      },
      {
        "char": "疾",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "矢"
          ]
        ],
        "hint": "如箭傷身，疾病疾風"
      },
      {
        "char": "症",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "正"
          ]
        ],
        "hint": "疾病徵兆，症狀病症"
      },
      {
        "char": "疼",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "冬"
          ]
        ],
        "hint": "寒冬痛楚，疼痛心疼"
      },
      {
        "char": "疲",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "皮"
          ]
        ],
        "hint": "身體倦怠，疲勞疲倦"
      },
      {
        "char": "痕",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "艮"
          ]
        ],
        "hint": "傷癒印記，痕跡淚痕"
      },
      {
        "char": "痛",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "甬"
          ]
        ],
        "hint": "劇烈疼痛，痛苦痛快"
      },
      {
        "char": "療",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "尞"
          ]
        ],
        "hint": "醫治病痛，治療醫療"
      },
      {
        "char": "瘦",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "叟"
          ]
        ],
        "hint": "身形消瘦，瘦弱"
      },
      {
        "char": "搜",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "叟"
          ]
        ],
        "hint": "伸手探尋，搜尋搜索"
      },
      {
        "char": "銀",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "艮"
          ]
        ],
        "hint": "白銀金屬，銀行銀河"
      },
      {
        "char": "根",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "艮"
          ]
        ],
        "hint": "樹木根基，根本樹根"
      },
      {
        "char": "眼",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "艮"
          ]
        ],
        "hint": "明亮雙眼，眼睛眼光"
      },
      {
        "char": "很",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "艮"
          ]
        ],
        "hint": "程度甚深，很好很多"
      },
      {
        "char": "恨",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "艮"
          ]
        ],
        "hint": "心懷怨憤，悔恨怨恨"
      },
      {
        "char": "跟",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "艮"
          ]
        ],
        "hint": "足後腳跟，跟隨"
      },
      {
        "char": "通",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "甬"
          ]
        ],
        "hint": "道路暢通，通過交通"
      },
      {
        "char": "勇",
        "layout": "tb",
        "recipes": [
          [
            "甬",
            "力"
          ]
        ],
        "hint": "氣力過人，勇敢勇氣"
      },
      {
        "char": "湧",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "甬"
          ]
        ],
        "hint": "泉水上湧，湧現洶湧"
      },
      {
        "char": "桶",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "甬"
          ]
        ],
        "hint": "木製圓桶，水桶"
      }
    ]
  },
  {
    "stage": 77,
    "title": "商賈買賣",
    "subtitle": "羅網千尋",
    "components": [
      "要",
      "買",
      "羅",
      "罷",
      "賈"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 210,
    "targets": [
      {
        "char": "腰",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "要"
          ]
        ],
        "hint": "身軀中段，腰部彎腰"
      },
      {
        "char": "漂",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "票"
          ]
        ],
        "hint": "隨水漂浮，漂亮漂流"
      },
      {
        "char": "標",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "票"
          ]
        ],
        "hint": "木梢記號，標準目標"
      },
      {
        "char": "飄",
        "layout": "lr",
        "recipes": [
          [
            "票",
            "風"
          ]
        ],
        "hint": "隨風飛揚，飄揚飄落"
      },
      {
        "char": "賣",
        "layout": "tb",
        "recipes": [
          [
            "士",
            "買"
          ]
        ],
        "hint": "出貨物換財，買賣販賣"
      },
      {
        "char": "讀",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "賣"
          ]
        ],
        "hint": "誦讀詩書，閱讀讀書"
      },
      {
        "char": "續",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "賣"
          ]
        ],
        "hint": "絲線相接，繼續連續"
      },
      {
        "char": "贖",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "賣"
          ]
        ],
        "hint": "以財贖回，救贖"
      },
      {
        "char": "蘿",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "羅"
          ]
        ],
        "hint": "藤蔓植物，蘿蔔藤蘿"
      },
      {
        "char": "鑼",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "羅"
          ]
        ],
        "hint": "銅製響器，敲鑼打鼓"
      },
      {
        "char": "邏",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "羅"
          ]
        ],
        "hint": "巡察周遭，邏輯巡邏"
      },
      {
        "char": "擺",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "罷"
          ]
        ],
        "hint": "陳設搖動，擺設搖擺"
      }
    ]
  },
  {
    "stage": 78,
    "title": "窗牖屋宇",
    "subtitle": "聰慧貫通",
    "components": [
      "囱",
      "奧",
      "貫",
      "寒",
      "賽"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 210,
    "targets": [
      {
        "char": "窗",
        "layout": "tb",
        "recipes": [
          [
            "穴",
            "囱"
          ]
        ],
        "hint": "屋壁透光之孔，窗戶"
      },
      {
        "char": "總",
        "layout": "tri",
        "recipes": [
          [
            "糸",
            "囱",
            "心"
          ]
        ],
        "hint": "匯聚絲縷與心意，總是總統"
      },
      {
        "char": "聰",
        "layout": "tri",
        "recipes": [
          [
            "耳",
            "囱",
            "心"
          ]
        ],
        "hint": "耳聞心通，聰明聰穎"
      },
      {
        "char": "蔥",
        "layout": "tri",
        "recipes": [
          [
            "艹",
            "囱",
            "心"
          ]
        ],
        "hint": "青翠香辛蔬菜，青蔥蔥鬱"
      },
      {
        "char": "澳",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "奧"
          ]
        ],
        "hint": "深水海灣，澳門澳洲"
      },
      {
        "char": "懊",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "奧"
          ]
        ],
        "hint": "心中悔恨，懊惱懊悔"
      },
      {
        "char": "慣",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "貫"
          ]
        ],
        "hint": "心習成自然，習慣"
      },
      {
        "char": "實",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "貫"
          ]
        ],
        "hint": "屋內財貨充盈，誠實果實"
      }
    ]
  },
  {
    "stage": 79,
    "title": "山峰相逢",
    "subtitle": "秦時明月",
    "components": [
      "夆",
      "奉",
      "奏",
      "泰",
      "秦"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 210,
    "targets": [
      {
        "char": "逢",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "夆"
          ]
        ],
        "hint": "行路相遇，相逢重逢"
      },
      {
        "char": "峰",
        "layout": "lr",
        "recipes": [
          [
            "山",
            "夆"
          ]
        ],
        "hint": "高聳山頂，山峰高峰"
      },
      {
        "char": "鋒",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "夆"
          ]
        ],
        "hint": "刀劍銳尖，先鋒鋒利"
      },
      {
        "char": "蜂",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "夆"
          ]
        ],
        "hint": "採蜜飛蟲，蜜蜂"
      },
      {
        "char": "縫",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "夆"
          ]
        ],
        "hint": "針線縫合，縫紉縫隙"
      },
      {
        "char": "棒",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "奉"
          ]
        ],
        "hint": "木棍棒槌，棒球隊"
      },
      {
        "char": "捧",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "奉"
          ]
        ],
        "hint": "雙手托舉，捧場追捧"
      },
      {
        "char": "俸",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "奉"
          ]
        ],
        "hint": "官吏薪俸，俸祿"
      },
      {
        "char": "湊",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "奏"
          ]
        ],
        "hint": "水流匯聚，湊巧拼湊"
      },
      {
        "char": "揍",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "奏"
          ]
        ],
        "hint": "揮拳毆打，挨揍"
      },
      {
        "char": "臻",
        "layout": "lr",
        "recipes": [
          [
            "至",
            "秦"
          ]
        ],
        "hint": "到達至善之境，日臻完善"
      },
      {
        "char": "蓁",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "秦"
          ]
        ],
        "hint": "草木茂盛貌，蓁蓁"
      },
      {
        "char": "榛",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "秦"
          ]
        ],
        "hint": "落葉灌木，榛果榛子"
      },
      {
        "char": "溱",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "秦"
          ]
        ],
        "hint": "古水名，溱洧"
      }
    ]
  },
  {
    "stage": 80,
    "title": "雲霧霞光",
    "subtitle": "商敵嫡傳",
    "components": [
      "奄",
      "務",
      "叚",
      "啇",
      "霸"
    ],
    "unlockThreshold": 9,
    "chestRewardCoins": 220,
    "targets": [
      {
        "char": "霍",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "隹"
          ]
        ],
        "hint": "雨中群鳥疾飛（雨 + 隹），霍然揮霍"
      },
      {
        "char": "適",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "啇"
          ]
        ],
        "hint": "正體「適」：辶 + 啇（內含古），適合舒適"
      },
      {
        "char": "滴",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "啇"
          ]
        ],
        "hint": "水珠下滴（水 + 啇），水滴點滴"
      },
      {
        "char": "摘",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "啇"
          ]
        ],
        "hint": "伸手採摘（手 + 啇），摘錄摘要"
      },
      {
        "char": "敵",
        "layout": "lr",
        "recipes": [
          [
            "啇",
            "攵"
          ]
        ],
        "hint": "旗鼓相當之對手（啇 + 攵），敵人無敵"
      },
      {
        "char": "嫡",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "啇"
          ]
        ],
        "hint": "正室所出（女 + 啇），嫡傳嫡系"
      },
      {
        "char": "淹",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "奄"
          ]
        ],
        "hint": "大水漫過，淹沒"
      },
      {
        "char": "掩",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "奄"
          ]
        ],
        "hint": "伸手遮蓋，掩護遮掩"
      },
      {
        "char": "俺",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "奄"
          ]
        ],
        "hint": "北方自稱，俺們"
      },
      {
        "char": "庵",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "奄"
          ]
        ],
        "hint": "圓形草屋小廟，尼庵"
      },
      {
        "char": "霧",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "務"
          ]
        ],
        "hint": "水氣瀰漫如煙，雲霧迷霧"
      },
      {
        "char": "露",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "路"
          ]
        ],
        "hint": "夜氣凝結路旁草葉，露水顯露"
      },
      {
        "char": "假",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "叚"
          ]
        ],
        "hint": "借用虛假，真假假期"
      },
      {
        "char": "蝦",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "叚"
          ]
        ],
        "hint": "水中節肢動物，龍蝦蝦仁"
      },
      {
        "char": "霞",
        "layout": "tb",
        "recipes": [
          [
            "雨",
            "叚"
          ]
        ],
        "hint": "日出日落彩雲，朝霞晚霞"
      },
      {
        "char": "暇",
        "layout": "lr",
        "recipes": [
          [
            "日",
            "叚"
          ]
        ],
        "hint": "閒暇空閒，目不暇給"
      },
      {
        "char": "瑕",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "叚"
          ]
        ],
        "hint": "美玉斑點，瑕疵無瑕"
      },
      {
        "char": "藿",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "霍"
          ]
        ],
        "hint": "芳香草藥，藿香"
      }
    ]
  },
  {
    "stage": 81,
    "title": "樽酒酸甜",
    "subtitle": "謙謙君子",
    "components": [
      "尊",
      "奠",
      "夋",
      "兼",
      "廉"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 220,
    "targets": [
      {
        "char": "遵",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "尊"
          ]
        ],
        "hint": "循道而行，遵守遵從"
      },
      {
        "char": "樽",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "尊"
          ]
        ],
        "hint": "木製酒器，酒樽"
      },
      {
        "char": "蹲",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "尊"
          ]
        ],
        "hint": "屈膝下蹲，蹲下"
      },
      {
        "char": "鄭",
        "layout": "lr",
        "recipes": [
          [
            "奠",
            "邑"
          ]
        ],
        "hint": "古國名，鄭重"
      },
      {
        "char": "酸",
        "layout": "lr",
        "recipes": [
          [
            "酉",
            "夋"
          ]
        ],
        "hint": "酒酵變酸，酸甜心酸"
      },
      {
        "char": "俊",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "夋"
          ]
        ],
        "hint": "才貌出眾，英俊俊俏"
      },
      {
        "char": "峻",
        "layout": "lr",
        "recipes": [
          [
            "山",
            "夋"
          ]
        ],
        "hint": "山勢高險，險峻嚴峻"
      },
      {
        "char": "梭",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "夋"
          ]
        ],
        "hint": "織布木梭，穿梭"
      },
      {
        "char": "竣",
        "layout": "lr",
        "recipes": [
          [
            "立",
            "夋"
          ]
        ],
        "hint": "工程完畢，竣工"
      },
      {
        "char": "謙",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "兼"
          ]
        ],
        "hint": "言辭謙遜，謙虛謙讓"
      },
      {
        "char": "賺",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "兼"
          ]
        ],
        "hint": "獲利生財，賺錢"
      },
      {
        "char": "嫌",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "兼"
          ]
        ],
        "hint": "心生猜忌厭惡，嫌棄嫌疑"
      },
      {
        "char": "廉",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "兼"
          ]
        ],
        "hint": "清廉儉樸，廉潔物美價廉"
      },
      {
        "char": "鐮",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "廉"
          ]
        ],
        "hint": "收割農具，鐮刀"
      },
      {
        "char": "簾",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "廉"
          ]
        ],
        "hint": "竹編門簾，窗簾"
      }
    ]
  },
  {
    "stage": 82,
    "title": "星宿商旅",
    "subtitle": "熱力之熵",
    "components": [
      "參",
      "商",
      "晉",
      "晝",
      "夜"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 220,
    "targets": [
      {
        "char": "熵",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "商"
          ]
        ],
        "hint": "熱力學混亂度指標（火 + 商），熵增"
      },
      {
        "char": "慘",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "參"
          ]
        ],
        "hint": "心中悲痛，悲慘慘烈"
      },
      {
        "char": "滲",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "參"
          ]
        ],
        "hint": "水液緩緩透入，滲透"
      },
      {
        "char": "摻",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "參"
          ]
        ],
        "hint": "伸手攙扶混雜，摻雜"
      },
      {
        "char": "液",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "夜"
          ]
        ],
        "hint": "流動液體，血液汁液"
      },
      {
        "char": "腋",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "夜"
          ]
        ],
        "hint": "手臂之下，腋窩"
      }
    ]
  },
  {
    "stage": 83,
    "title": "蘭菊蓮荷",
    "subtitle": "花中君子",
    "components": [
      "闌",
      "匊",
      "連",
      "可",
      "司"
    ],
    "unlockThreshold": 8,
    "chestRewardCoins": 220,
    "targets": [
      {
        "char": "蘭",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "闌"
          ]
        ],
        "hint": "幽谷香草，蘭花君子"
      },
      {
        "char": "爛",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "闌"
          ]
        ],
        "hint": "火光燦爛，爛漫腐爛"
      },
      {
        "char": "欄",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "闌"
          ]
        ],
        "hint": "木製圍欄，欄杆專欄"
      },
      {
        "char": "攔",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "闌"
          ]
        ],
        "hint": "伸手阻擋，攔截"
      },
      {
        "char": "菊",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "匊"
          ]
        ],
        "hint": "秋日傲霜之花，菊花"
      },
      {
        "char": "掬",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "匊"
          ]
        ],
        "hint": "雙手捧起，笑容可掬"
      },
      {
        "char": "鞠",
        "layout": "lr",
        "recipes": [
          [
            "革",
            "匊"
          ]
        ],
        "hint": "古代皮球與彎腰行禮，鞠躬"
      },
      {
        "char": "蓮",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "連"
          ]
        ],
        "hint": "出淤泥而不染，蓮花蓮蓬"
      },
      {
        "char": "鏈",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "連"
          ]
        ],
        "hint": "金屬環扣相連，項鏈鎖鏈"
      },
      {
        "char": "河",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "可"
          ]
        ],
        "hint": "奔流大川，黃河河流"
      },
      {
        "char": "何",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "可"
          ]
        ],
        "hint": "疑問代詞，為何如何"
      },
      {
        "char": "荷",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "何"
          ]
        ],
        "hint": "夏日荷花，負荷荷包"
      },
      {
        "char": "哥",
        "layout": "tb",
        "recipes": [
          [
            "可",
            "可"
          ]
        ],
        "hint": "雙可相疊，兄長哥哥"
      },
      {
        "char": "歌",
        "layout": "lr",
        "recipes": [
          [
            "哥",
            "欠"
          ]
        ],
        "hint": "放聲高歌，歌曲詩歌"
      },
      {
        "char": "阿",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "可"
          ]
        ],
        "hint": "山丘曲折，阿姨剛正不阿"
      },
      {
        "char": "詞",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "司"
          ]
        ],
        "hint": "言辭詩詞，歌詞詞彙"
      },
      {
        "char": "飼",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "司"
          ]
        ],
        "hint": "餵養禽畜，飼養飼料"
      }
    ]
  },
  {
    "stage": 84,
    "title": "奇禽異獸",
    "subtitle": "祥瑞麒麟",
    "components": [
      "禽",
      "獸",
      "粦",
      "鳳",
      "凰"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 220,
    "targets": [
      {
        "char": "擒",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "禽"
          ]
        ],
        "hint": "伸手捉拿，擒拿"
      },
      {
        "char": "鄰",
        "layout": "lr",
        "recipes": [
          [
            "粦",
            "邑"
          ]
        ],
        "hint": "比鄰而居，鄰居鄰近"
      },
      {
        "char": "憐",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "粦"
          ]
        ],
        "hint": "心生愛惜同情，可憐愛憐"
      },
      {
        "char": "鱗",
        "layout": "lr",
        "recipes": [
          [
            "魚",
            "粦"
          ]
        ],
        "hint": "魚身甲片，魚鱗鱗片"
      },
      {
        "char": "磷",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "粦"
          ]
        ],
        "hint": "非金屬元素，磷火"
      },
      {
        "char": "麟",
        "layout": "lr",
        "recipes": [
          [
            "鹿",
            "粦"
          ]
        ],
        "hint": "祥瑞神獸，麒麟"
      }
    ]
  },
  {
    "stage": 85,
    "title": "思慮疑懼",
    "subtitle": "慈悲為懷",
    "components": [
      "虍",
      "應",
      "疑",
      "恐",
      "茲"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 230,
    "targets": [
      {
        "char": "慮",
        "layout": "enc",
        "recipes": [
          [
            "虍",
            "思"
          ]
        ],
        "hint": "深思熟慮，考慮憂慮"
      },
      {
        "char": "濾",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "慮"
          ]
        ],
        "hint": "澄清水質，過濾濾鏡"
      },
      {
        "char": "凝",
        "layout": "lr",
        "recipes": [
          [
            "冫",
            "疑"
          ]
        ],
        "hint": "水寒凝結，凝視凝聚"
      },
      {
        "char": "擬",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "疑"
          ]
        ],
        "hint": "比劃揣摩，模擬草擬"
      },
      {
        "char": "癡",
        "layout": "enc",
        "recipes": [
          [
            "疒",
            "疑"
          ]
        ],
        "hint": "神思迷戀，癡情癡迷"
      },
      {
        "char": "慈",
        "layout": "tb",
        "recipes": [
          [
            "茲",
            "心"
          ]
        ],
        "hint": "心懷仁愛，慈悲慈祥"
      },
      {
        "char": "磁",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "茲"
          ]
        ],
        "hint": "吸鐵之石，磁鐵磁場"
      },
      {
        "char": "滋",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "茲"
          ]
        ],
        "hint": "雨水潤澤，滋味滋養"
      }
    ]
  },
  {
    "stage": 86,
    "title": "法度刑罰",
    "subtitle": "規矩方圓",
    "components": [
      "制",
      "疋",
      "肅",
      "曾",
      "獄"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 230,
    "targets": [
      {
        "char": "罰",
        "layout": "tri",
        "recipes": [
          [
            "罒",
            "言",
            "刀"
          ]
        ],
        "hint": "正體「罰」：罒 + 言 + 刂，懲罰罰款"
      },
      {
        "char": "則",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "刀"
          ]
        ],
        "hint": "正體「則」：貝 + 刂，法則原則"
      },
      {
        "char": "獄",
        "layout": "tri",
        "recipes": [
          [
            "犬",
            "言",
            "犬"
          ]
        ],
        "hint": "雙犬守言訟之所，監獄地嶽"
      },
      {
        "char": "側",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "則"
          ]
        ],
        "hint": "人在一旁，側面側重"
      },
      {
        "char": "測",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "則"
          ]
        ],
        "hint": "測量水深，測試預測"
      },
      {
        "char": "廁",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "則"
          ]
        ],
        "hint": "屋旁淨室，廁所"
      },
      {
        "char": "鍘",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "則"
          ]
        ],
        "hint": "切草金屬刀，鍘刀"
      },
      {
        "char": "製",
        "layout": "tb",
        "recipes": [
          [
            "制",
            "衣"
          ]
        ],
        "hint": "裁剪縫製，製造製作"
      },
      {
        "char": "楚",
        "layout": "tb",
        "recipes": [
          [
            "林",
            "疋"
          ]
        ],
        "hint": "荊楚林木，清楚楚楚"
      },
      {
        "char": "蕭",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "肅"
          ]
        ],
        "hint": "秋風蕭瑟，姓氏「蕭」"
      },
      {
        "char": "嘯",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "肅"
          ]
        ],
        "hint": "長聲呼嘯，海嘯虎嘯"
      },
      {
        "char": "增",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "曾"
          ]
        ],
        "hint": "培土加高，增加增長"
      },
      {
        "char": "贈",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "曾"
          ]
        ],
        "hint": "以財物相送，贈送禮贈"
      }
    ]
  },
  {
    "stage": 87,
    "title": "將帥師旅",
    "subtitle": "千軍萬馬",
    "components": [
      "將",
      "帥",
      "師",
      "旗",
      "衛"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 230,
    "targets": [
      {
        "char": "輩",
        "layout": "tb",
        "recipes": [
          [
            "非",
            "車"
          ]
        ],
        "hint": "戰車排比成行，前輩輩分"
      },
      {
        "char": "獎",
        "layout": "tb",
        "recipes": [
          [
            "將",
            "大"
          ]
        ],
        "hint": "勉勵讚許，獎勵獎牌"
      },
      {
        "char": "漿",
        "layout": "tb",
        "recipes": [
          [
            "將",
            "水"
          ]
        ],
        "hint": "濃稠液體，豆漿岩漿"
      },
      {
        "char": "醬",
        "layout": "tb",
        "recipes": [
          [
            "將",
            "酉"
          ]
        ],
        "hint": "發酵調味，醬油果醬"
      },
      {
        "char": "蔣",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "將"
          ]
        ],
        "hint": "水草名，姓氏「蔣」"
      },
      {
        "char": "獅",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "師"
          ]
        ],
        "hint": "百獸之王，獅子"
      },
      {
        "char": "篩",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "師"
          ]
        ],
        "hint": "竹編篩網，篩選"
      }
    ]
  },
  {
    "stage": 88,
    "title": "農桑陶冶",
    "subtitle": "巧奪天工",
    "components": [
      "桑",
      "匋",
      "壽",
      "藝",
      "丂"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 230,
    "targets": [
      {
        "char": "巧",
        "layout": "lr",
        "recipes": [
          [
            "工",
            "丂"
          ]
        ],
        "hint": "技藝精妙（工 + 丂），巧妙巧合"
      },
      {
        "char": "朽",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "丂"
          ]
        ],
        "hint": "木頭腐爛（木 + 丂），不朽枯朽"
      },
      {
        "char": "考",
        "layout": "tb",
        "recipes": [
          [
            "耂",
            "丂"
          ]
        ],
        "hint": "長者稽考（耂 + 丂），考試思考"
      },
      {
        "char": "烤",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "考"
          ]
        ],
        "hint": "以火烘烤，燒烤烤肉"
      },
      {
        "char": "拷",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "考"
          ]
        ],
        "hint": "拷問拷貝"
      },
      {
        "char": "嗓",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "桑"
          ]
        ],
        "hint": "咽喉發聲，嗓音嗓子"
      },
      {
        "char": "搡",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "桑"
          ]
        ],
        "hint": "用力推搡"
      },
      {
        "char": "陶",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "匋"
          ]
        ],
        "hint": "燒製陶器，陶冶陶醉"
      },
      {
        "char": "淘",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "匋"
          ]
        ],
        "hint": "用水沖洗，淘汰淘氣"
      },
      {
        "char": "萄",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "匋"
          ]
        ],
        "hint": "藤蔓美果，葡萄"
      },
      {
        "char": "掏",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "匋"
          ]
        ],
        "hint": "伸手探取，掏心"
      },
      {
        "char": "籌",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "壽"
          ]
        ],
        "hint": "竹製算籌，籌備籌碼"
      },
      {
        "char": "鑄",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "壽"
          ]
        ],
        "hint": "熔金鑄造，鑄劍"
      },
      {
        "char": "濤",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "壽"
          ]
        ],
        "hint": "巨浪波濤，松濤"
      },
      {
        "char": "禱",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "壽"
          ]
        ],
        "hint": "向神明祈禱，禱告"
      }
    ]
  },
  {
    "stage": 89,
    "title": "水脈橋樑",
    "subtitle": "堅韌不拔",
    "components": [
      "巠",
      "刃",
      "築",
      "嗇",
      "陛"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 230,
    "targets": [
      {
        "char": "梁",
        "layout": "tri",
        "recipes": [
          [
            "水",
            "刃",
            "木"
          ]
        ],
        "hint": "架木跨水成橋（氵 + 刃 + 木），橋梁棟梁"
      },
      {
        "char": "粱",
        "layout": "tri",
        "recipes": [
          [
            "水",
            "刃",
            "米"
          ]
        ],
        "hint": "優質穀米（氵 + 刃 + 米），高粱黃粱一夢"
      },
      {
        "char": "樑",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "梁"
          ]
        ],
        "hint": "屋頂大樑，棟樑"
      },
      {
        "char": "忍",
        "layout": "tb",
        "recipes": [
          [
            "刃",
            "心"
          ]
        ],
        "hint": "心頭一把刀，忍耐堅忍"
      },
      {
        "char": "認",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "忍"
          ]
        ],
        "hint": "出言辨識，認識認真"
      },
      {
        "char": "韌",
        "layout": "lr",
        "recipes": [
          [
            "韋",
            "刃"
          ]
        ],
        "hint": "皮革柔而難斷，堅韌韌性"
      },
      {
        "char": "經",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "巠"
          ]
        ],
        "hint": "織布縱線，經典經過"
      },
      {
        "char": "輕",
        "layout": "lr",
        "recipes": [
          [
            "車",
            "巠"
          ]
        ],
        "hint": "輕快戰車，輕盈輕鬆"
      },
      {
        "char": "徑",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "巠"
          ]
        ],
        "hint": "山間小路，途徑直徑"
      },
      {
        "char": "頸",
        "layout": "lr",
        "recipes": [
          [
            "巠",
            "頁"
          ]
        ],
        "hint": "頭身相連處，頸部瓶頸"
      },
      {
        "char": "勁",
        "layout": "lr",
        "recipes": [
          [
            "巠",
            "力"
          ]
        ],
        "hint": "氣力剛健，強勁幹勁"
      },
      {
        "char": "涇",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "巠"
          ]
        ],
        "hint": "古水名，涇渭分明"
      },
      {
        "char": "牆",
        "layout": "lr",
        "recipes": [
          [
            "片",
            "嗇"
          ]
        ],
        "hint": "院落高牆，牆壁"
      },
      {
        "char": "薔",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "嗇"
          ]
        ],
        "hint": "帶刺名花，薔薇"
      }
    ]
  },
  {
    "stage": 90,
    "title": "風雅頌歌",
    "subtitle": "書畫傳世",
    "components": [
      "公",
      "雅",
      "頌",
      "籍",
      "畫"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 240,
    "targets": [
      {
        "char": "松",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "公"
          ]
        ],
        "hint": "歲寒不凋之木，松樹松柏"
      },
      {
        "char": "頌",
        "layout": "lr",
        "recipes": [
          [
            "公",
            "頁"
          ]
        ],
        "hint": "讚美歌頌，詩經雅頌"
      },
      {
        "char": "訟",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "公"
          ]
        ],
        "hint": "公堂爭辯，訴訟"
      },
      {
        "char": "翁",
        "layout": "tb",
        "recipes": [
          [
            "公",
            "羽"
          ]
        ],
        "hint": "鳥頸毛羽與老翁，漁翁"
      },
      {
        "char": "蚣",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "公"
          ]
        ],
        "hint": "多足之蟲，蜈蚣"
      },
      {
        "char": "劃",
        "layout": "lr",
        "recipes": [
          [
            "畫",
            "刀"
          ]
        ],
        "hint": "以刀刻劃，規劃計劃"
      }
    ]
  },
  {
    "stage": 91,
    "title": "林木鳥鳴",
    "subtitle": "千錘百鍊",
    "components": [
      "喿",
      "更",
      "芻",
      "僉",
      "敖"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 240,
    "targets": [
      {
        "char": "操",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "喿"
          ]
        ],
        "hint": "手持操練，操場操守"
      },
      {
        "char": "燥",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "喿"
          ]
        ],
        "hint": "火烤乾燥，枯燥燥熱"
      },
      {
        "char": "噪",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "喿"
          ]
        ],
        "hint": "群鳥齊鳴如喧鬧，噪音"
      },
      {
        "char": "澡",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "喿"
          ]
        ],
        "hint": "沐浴洗滌，洗澡"
      },
      {
        "char": "便",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "更"
          ]
        ],
        "hint": "人有所更易則安適，方便便利"
      },
      {
        "char": "硬",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "更"
          ]
        ],
        "hint": "石質堅固，堅硬硬朗"
      },
      {
        "char": "雛",
        "layout": "lr",
        "recipes": [
          [
            "芻",
            "隹"
          ]
        ],
        "hint": "初生幼鳥，雛鳥雛形"
      },
      {
        "char": "皺",
        "layout": "lr",
        "recipes": [
          [
            "芻",
            "皮"
          ]
        ],
        "hint": "皮膚褶皺，皺紋"
      },
      {
        "char": "趨",
        "layout": "enc",
        "recipes": [
          [
            "走",
            "芻"
          ]
        ],
        "hint": "快步向前，趨勢趨向"
      },
      {
        "char": "劍",
        "layout": "lr",
        "recipes": [
          [
            "僉",
            "刀"
          ]
        ],
        "hint": "雙刃利器，寶劍劍客"
      },
      {
        "char": "險",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "僉"
          ]
        ],
        "hint": "山勢陡峭，危險冒險"
      },
      {
        "char": "檢",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "僉"
          ]
        ],
        "hint": "書函封檢，檢查檢討"
      },
      {
        "char": "驗",
        "layout": "lr",
        "recipes": [
          [
            "馬",
            "僉"
          ]
        ],
        "hint": "考驗駿馬，實驗經驗"
      },
      {
        "char": "傲",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "敖"
          ]
        ],
        "hint": "神態高傲，驕傲傲骨"
      },
      {
        "char": "熬",
        "layout": "tb",
        "recipes": [
          [
            "敖",
            "火"
          ]
        ],
        "hint": "文火久煮，熬夜煎熬"
      }
    ]
  },
  {
    "stage": 92,
    "title": "田里疆域",
    "subtitle": "舉重若輕",
    "components": [
      "里",
      "予",
      "重",
      "垂",
      "乘"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 240,
    "targets": [
      {
        "char": "理",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "里"
          ]
        ],
        "hint": "治玉條理，道理理解"
      },
      {
        "char": "裡",
        "layout": "lr",
        "recipes": [
          [
            "衣",
            "里"
          ]
        ],
        "hint": "衣物內層，裡面表裡"
      },
      {
        "char": "野",
        "layout": "lr",
        "recipes": [
          [
            "里",
            "予"
          ]
        ],
        "hint": "郊外田野，野外視野"
      },
      {
        "char": "預",
        "layout": "lr",
        "recipes": [
          [
            "予",
            "頁"
          ]
        ],
        "hint": "事先籌劃，預習預防"
      },
      {
        "char": "序",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "予"
          ]
        ],
        "hint": "東西廂房次序，順序秩序"
      },
      {
        "char": "舒",
        "layout": "lr",
        "recipes": [
          [
            "舍",
            "予"
          ]
        ],
        "hint": "伸展寬鬆，舒服舒暢"
      },
      {
        "char": "懂",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "重"
          ]
        ],
        "hint": "心中明白，懂事懂得"
      },
      {
        "char": "種",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "重"
          ]
        ],
        "hint": "播下禾種，種子種類"
      },
      {
        "char": "腫",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "重"
          ]
        ],
        "hint": "肌肉浮腫，紅腫"
      },
      {
        "char": "動",
        "layout": "lr",
        "recipes": [
          [
            "重",
            "力"
          ]
        ],
        "hint": "出力移動，運動感動"
      },
      {
        "char": "睡",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "垂"
          ]
        ],
        "hint": "眼皮下垂而眠，睡覺"
      },
      {
        "char": "錘",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "垂"
          ]
        ],
        "hint": "金屬重錘，千錘百鍊"
      },
      {
        "char": "郵",
        "layout": "lr",
        "recipes": [
          [
            "垂",
            "邑"
          ]
        ],
        "hint": "邊陲驛站傳書，郵局郵票"
      },
      {
        "char": "剩",
        "layout": "lr",
        "recipes": [
          [
            "乘",
            "刀"
          ]
        ],
        "hint": "分割餘下，剩餘"
      }
    ]
  },
  {
    "stage": 93,
    "title": "幽微幾微",
    "subtitle": "延年益壽",
    "components": [
      "幺",
      "幾",
      "憂",
      "康",
      "延"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 240,
    "targets": [
      {
        "char": "幼",
        "layout": "lr",
        "recipes": [
          [
            "幺",
            "力"
          ]
        ],
        "hint": "年少力微，幼小幼稚"
      },
      {
        "char": "機",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "幾"
          ]
        ],
        "hint": "織布木機，機會機器"
      },
      {
        "char": "饑",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "幾"
          ]
        ],
        "hint": "五穀不熟，饑荒"
      },
      {
        "char": "磯",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "幾"
          ]
        ],
        "hint": "水邊岩石，磯釣"
      },
      {
        "char": "譏",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "幾"
          ]
        ],
        "hint": "出言諷刺，譏笑"
      },
      {
        "char": "優",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "憂"
          ]
        ],
        "hint": "從容出眾，優秀優雅"
      },
      {
        "char": "擾",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "憂"
          ]
        ],
        "hint": "動手干擾，打擾困擾"
      },
      {
        "char": "慷",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "康"
          ]
        ],
        "hint": "心胸開闊，慷慨"
      },
      {
        "char": "糠",
        "layout": "lr",
        "recipes": [
          [
            "米",
            "康"
          ]
        ],
        "hint": "稻穀外皮，米糠"
      },
      {
        "char": "誕",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "延"
          ]
        ],
        "hint": "言辭誇大與誕生，聖誕誕生"
      },
      {
        "char": "筵",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "延"
          ]
        ],
        "hint": "竹編席墊，筵席盛宴"
      },
      {
        "char": "健",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "建"
          ]
        ],
        "hint": "人強壯有力，健康健全"
      },
      {
        "char": "鍵",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "建"
          ]
        ],
        "hint": "門閂琴鍵，關鍵鍵盤"
      }
    ]
  },
  {
    "stage": 94,
    "title": "嘉禮喜慶",
    "subtitle": "神采飛揚",
    "components": [
      "喜",
      "壴",
      "彡",
      "惠",
      "彗"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 240,
    "targets": [
      {
        "char": "彭",
        "layout": "lr",
        "recipes": [
          [
            "壴",
            "彡"
          ]
        ],
        "hint": "鼓聲澎湃（壴 + 彡），姓氏「彭」"
      },
      {
        "char": "膨",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "彭"
          ]
        ],
        "hint": "肌肉脹大，膨脹"
      },
      {
        "char": "澎",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "彭"
          ]
        ],
        "hint": "波濤洶湧，澎湃澎湖"
      },
      {
        "char": "囍",
        "layout": "lr",
        "recipes": [
          [
            "喜",
            "喜"
          ]
        ],
        "hint": "雙喜臨門，大喜之日"
      },
      {
        "char": "嘻",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "喜"
          ]
        ],
        "hint": "笑語嘻嘻，嘻笑"
      },
      {
        "char": "禧",
        "layout": "lr",
        "recipes": [
          [
            "示",
            "喜"
          ]
        ],
        "hint": "神賜吉祥，新禧福禧"
      },
      {
        "char": "嬉",
        "layout": "lr",
        "recipes": [
          [
            "女",
            "喜"
          ]
        ],
        "hint": "女子嬉戲，嬉鬧"
      },
      {
        "char": "樹",
        "layout": "tri",
        "recipes": [
          [
            "木",
            "壴",
            "寸"
          ]
        ],
        "hint": "植木成林，樹木樹立"
      },
      {
        "char": "廚",
        "layout": "tri",
        "recipes": [
          [
            "广",
            "壴",
            "寸"
          ]
        ],
        "hint": "烹調之屋，廚房"
      },
      {
        "char": "穗",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "惠"
          ]
        ],
        "hint": "稻禾結穗，稻穗"
      },
      {
        "char": "慧",
        "layout": "tb",
        "recipes": [
          [
            "彗",
            "心"
          ]
        ],
        "hint": "心如掃帚拂塵而明，智慧聰慧"
      }
    ]
  },
  {
    "stage": 95,
    "title": "舟車勝景",
    "subtitle": "悠然自得",
    "components": [
      "朕",
      "冓",
      "亶",
      "扁",
      "攸"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 250,
    "targets": [
      {
        "char": "勝",
        "layout": "lr",
        "recipes": [
          [
            "朕",
            "力"
          ]
        ],
        "hint": "力量超越，勝利名勝"
      },
      {
        "char": "騰",
        "layout": "lr",
        "recipes": [
          [
            "朕",
            "馬"
          ]
        ],
        "hint": "駿馬奔騰，飛騰沸騰"
      },
      {
        "char": "購",
        "layout": "lr",
        "recipes": [
          [
            "貝",
            "冓"
          ]
        ],
        "hint": "以財買入，購買採購"
      },
      {
        "char": "講",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "冓"
          ]
        ],
        "hint": "言辭條理講解，演講講話"
      },
      {
        "char": "壇",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "亶"
          ]
        ],
        "hint": "築土高台，花壇論壇"
      },
      {
        "char": "顫",
        "layout": "lr",
        "recipes": [
          [
            "亶",
            "頁"
          ]
        ],
        "hint": "身體抖動，顫抖"
      },
      {
        "char": "篇",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "扁"
          ]
        ],
        "hint": "竹簡成篇，篇章篇幅"
      },
      {
        "char": "偏",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "扁"
          ]
        ],
        "hint": "側向一旁，偏心偏偏"
      },
      {
        "char": "修",
        "layout": "tri",
        "recipes": [
          [
            "人",
            "攸",
            "彡"
          ]
        ],
        "hint": "修飾美好（亻 + 攸 + 彡），修養修理"
      },
      {
        "char": "悠",
        "layout": "tb",
        "recipes": [
          [
            "攸",
            "心"
          ]
        ],
        "hint": "心緒長遠（攸 + 心），悠久悠閒"
      },
      {
        "char": "條",
        "layout": "tb",
        "recipes": [
          [
            "攸",
            "木"
          ]
        ],
        "hint": "細長木枝（攸 + 木），條件麵條"
      },
      {
        "char": "影",
        "layout": "lr",
        "recipes": [
          [
            "景",
            "彡"
          ]
        ],
        "hint": "日光物影（景 + 彡），影子電影"
      }
    ]
  },
  {
    "stage": 96,
    "title": "玉器方圓",
    "subtitle": "匯聚群英",
    "components": [
      "耑",
      "疌",
      "翏",
      "盍",
      "匚"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 250,
    "targets": [
      {
        "char": "端",
        "layout": "lr",
        "recipes": [
          [
            "立",
            "耑"
          ]
        ],
        "hint": "站立端正，端莊開端"
      },
      {
        "char": "瑞",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "耑"
          ]
        ],
        "hint": "祥瑞玉器，瑞雪祥瑞"
      },
      {
        "char": "喘",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "耑"
          ]
        ],
        "hint": "急促呼吸，喘氣"
      },
      {
        "char": "揣",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "耑"
          ]
        ],
        "hint": "懷藏揣摩，揣測"
      },
      {
        "char": "捷",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "疌"
          ]
        ],
        "hint": "動作敏捷，快捷捷報"
      },
      {
        "char": "睫",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "疌"
          ]
        ],
        "hint": "眼瞼毛髮，睫毛"
      },
      {
        "char": "膠",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "翏"
          ]
        ],
        "hint": "黏合之物，膠水橡膠"
      },
      {
        "char": "謬",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "翏"
          ]
        ],
        "hint": "荒唐錯誤，荒謬謬論"
      },
      {
        "char": "蓋",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "盍"
          ]
        ],
        "hint": "茅草覆屋，蓋子覆蓋"
      },
      {
        "char": "磕",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "盍"
          ]
        ],
        "hint": "石頭相碰，磕頭"
      },
      {
        "char": "匪",
        "layout": "enc",
        "recipes": [
          [
            "匚",
            "非"
          ]
        ],
        "hint": "行為非正，匪徒"
      },
      {
        "char": "匡",
        "layout": "enc",
        "recipes": [
          [
            "匚",
            "王"
          ]
        ],
        "hint": "方正器具，匡正"
      },
      {
        "char": "框",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "匡"
          ]
        ],
        "hint": "木製邊框，相框畫框"
      },
      {
        "char": "匯",
        "layout": "tri",
        "recipes": [
          [
            "匚",
            "水",
            "隹"
          ]
        ],
        "hint": "水流匯聚（匚 + 氵 + 隹），匯合匯率"
      },
      {
        "char": "璧",
        "layout": "tb",
        "recipes": [
          [
            "辟",
            "玉"
          ]
        ],
        "hint": "圓形美玉，完璧歸趙"
      }
    ]
  },
  {
    "stage": 97,
    "title": "陵谷險阻",
    "subtitle": "莊嚴院落",
    "components": [
      "夌",
      "危",
      "臽",
      "元",
      "袁"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 250,
    "targets": [
      {
        "char": "陵",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "夌"
          ]
        ],
        "hint": "高大丘陵，山陵"
      },
      {
        "char": "凌",
        "layout": "lr",
        "recipes": [
          [
            "冫",
            "夌"
          ]
        ],
        "hint": "冰雪凜冽，凌雲凌晨"
      },
      {
        "char": "菱",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "夌"
          ]
        ],
        "hint": "水中菱角，菱形"
      },
      {
        "char": "稜",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "夌"
          ]
        ],
        "hint": "方木邊角，稜角"
      },
      {
        "char": "脆",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "危"
          ]
        ],
        "hint": "易碎易斷，清脆脆弱"
      },
      {
        "char": "跪",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "危"
          ]
        ],
        "hint": "雙膝跪地，下跪"
      },
      {
        "char": "詭",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "危"
          ]
        ],
        "hint": "言辭奇異，詭異詭計"
      },
      {
        "char": "桅",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "危"
          ]
        ],
        "hint": "船上高桿，桅杆"
      },
      {
        "char": "陷",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "臽"
          ]
        ],
        "hint": "墜入坑阱，陷落陷阱"
      },
      {
        "char": "焰",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "臽"
          ]
        ],
        "hint": "火光升騰，火焰氣焰"
      },
      {
        "char": "完",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "元"
          ]
        ],
        "hint": "屋宇完整，完成完全"
      },
      {
        "char": "院",
        "layout": "lr",
        "recipes": [
          [
            "阜",
            "完"
          ]
        ],
        "hint": "圍牆院落，學院醫院"
      },
      {
        "char": "遠",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "袁"
          ]
        ],
        "hint": "路途遙遠，永遠遠方"
      },
      {
        "char": "園",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "袁"
          ]
        ],
        "hint": "圍牆花圃，花園公園"
      },
      {
        "char": "巖",
        "layout": "tb",
        "recipes": [
          [
            "山",
            "嚴"
          ]
        ],
        "hint": "高峻山崖，岩石巖石"
      }
    ]
  },
  {
    "stage": 98,
    "title": "光陰照耀",
    "subtitle": "歷久彌新",
    "components": [
      "召",
      "旬",
      "歹",
      "歲",
      "暴"
    ],
    "unlockThreshold": 9,
    "chestRewardCoins": 250,
    "targets": [
      {
        "char": "秝",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "禾"
          ]
        ],
        "hint": "雙禾並立，稀疏均勻（「曆、歷」之字心）"
      },
      {
        "char": "曆",
        "layout": "enc",
        "recipes": [
          [
            "厂",
            "禾",
            "禾",
            "日"
          ],
          [
            "厂",
            "秝",
            "日"
          ]
        ],
        "hint": "觀象授時（厂 + 禾 + 禾 + 日），日曆歷史"
      },
      {
        "char": "歷",
        "layout": "enc",
        "recipes": [
          [
            "厂",
            "禾",
            "禾",
            "止"
          ],
          [
            "厂",
            "秝",
            "止"
          ]
        ],
        "hint": "邁步經過（厂 + 禾 + 禾 + 止），經歷歷史"
      },
      {
        "char": "招",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "召"
          ]
        ],
        "hint": "揮手呼喚，招呼招待"
      },
      {
        "char": "照",
        "layout": "tri",
        "recipes": [
          [
            "日",
            "召",
            "火"
          ]
        ],
        "hint": "日光火光照耀，照顧照片"
      },
      {
        "char": "紹",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "召"
          ]
        ],
        "hint": "相繼傳承，介紹"
      },
      {
        "char": "超",
        "layout": "enc",
        "recipes": [
          [
            "走",
            "召"
          ]
        ],
        "hint": "躍步超越，超過超級"
      },
      {
        "char": "詢",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "旬"
          ]
        ],
        "hint": "出言探問，詢問諮詢"
      },
      {
        "char": "筍",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "旬"
          ]
        ],
        "hint": "十日成竹之嫩芽，竹筍"
      },
      {
        "char": "死",
        "layout": "lr",
        "recipes": [
          [
            "歹",
            "匕"
          ]
        ],
        "hint": "生命終結，生死"
      },
      {
        "char": "列",
        "layout": "lr",
        "recipes": [
          [
            "歹",
            "刀"
          ]
        ],
        "hint": "分解排列，列車排列"
      },
      {
        "char": "烈",
        "layout": "tb",
        "recipes": [
          [
            "列",
            "火"
          ]
        ],
        "hint": "火勢猛烈，熱烈烈士"
      },
      {
        "char": "裂",
        "layout": "tb",
        "recipes": [
          [
            "列",
            "衣"
          ]
        ],
        "hint": "裁衣破開，分裂裂開"
      },
      {
        "char": "殘",
        "layout": "lr",
        "recipes": [
          [
            "歹",
            "戔"
          ]
        ],
        "hint": "毀傷餘留，殘缺殘忍"
      },
      {
        "char": "殊",
        "layout": "lr",
        "recipes": [
          [
            "歹",
            "朱"
          ]
        ],
        "hint": "與眾不同，特殊殊榮"
      },
      {
        "char": "爆",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "暴"
          ]
        ],
        "hint": "火裂迸發，爆發爆炸"
      },
      {
        "char": "瀑",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "暴"
          ]
        ],
        "hint": "飛流直下，瀑布"
      },
      {
        "char": "穢",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "歲"
          ]
        ],
        "hint": "田間荒草，污穢"
      }
    ]
  },
  {
    "stage": 99,
    "title": "鼎鼐烹調",
    "subtitle": "萬物歸屬",
    "components": [
      "鼎",
      "亨",
      "告",
      "蜀",
      "禺"
    ],
    "unlockThreshold": 8,
    "chestRewardCoins": 250,
    "targets": [
      {
        "char": "屬",
        "layout": "tri",
        "recipes": [
          [
            "尸",
            "水",
            "蜀"
          ]
        ],
        "hint": "正體「屬」：尸 + 水 + 蜀，屬於家屬"
      },
      {
        "char": "囑",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "屬"
          ]
        ],
        "hint": "叮嚀囑咐"
      },
      {
        "char": "獨",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "蜀"
          ]
        ],
        "hint": "單獨獨立，孤獨"
      },
      {
        "char": "觸",
        "layout": "lr",
        "recipes": [
          [
            "角",
            "蜀"
          ]
        ],
        "hint": "以角相抵，接觸觸動"
      },
      {
        "char": "燭",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "蜀"
          ]
        ],
        "hint": "照明燈燭，蠟燭燭光"
      },
      {
        "char": "濁",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "蜀"
          ]
        ],
        "hint": "水不清澈，混濁濁流"
      },
      {
        "char": "鼐",
        "layout": "tb",
        "recipes": [
          [
            "乃",
            "鼎"
          ]
        ],
        "hint": "大鼎重器，鼎鼐"
      },
      {
        "char": "烹",
        "layout": "tb",
        "recipes": [
          [
            "亨",
            "火"
          ]
        ],
        "hint": "架火烹煮，烹飪"
      },
      {
        "char": "造",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "告"
          ]
        ],
        "hint": "行而創建，創造造字"
      },
      {
        "char": "靠",
        "layout": "tb",
        "recipes": [
          [
            "告",
            "非"
          ]
        ],
        "hint": "相背依傍，依靠靠近"
      },
      {
        "char": "酷",
        "layout": "lr",
        "recipes": [
          [
            "酉",
            "告"
          ]
        ],
        "hint": "酒味濃厚，殘酷冷酷"
      },
      {
        "char": "浩",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "告"
          ]
        ],
        "hint": "水勢浩大，浩瀚"
      },
      {
        "char": "偶",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "禺"
          ]
        ],
        "hint": "木偶偶爾，偶像偶然"
      },
      {
        "char": "遇",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "禺"
          ]
        ],
        "hint": "不期而遇，遇見機遇"
      },
      {
        "char": "寓",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "禺"
          ]
        ],
        "hint": "寄居屋宇，公寓寓言"
      },
      {
        "char": "愚",
        "layout": "tb",
        "recipes": [
          [
            "禺",
            "心"
          ]
        ],
        "hint": "心智未開，愚昧大智若愚"
      }
    ]
  },
  {
    "stage": 100,
    "title": "百階里程碑",
    "subtitle": "聖賢哲思",
    "components": [
      "悳",
      "龺",
      "乞",
      "虛",
      "叔"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 260,
    "targets": [
      {
        "char": "乾",
        "layout": "lr",
        "recipes": [
          [
            "龺",
            "乞"
          ]
        ],
        "hint": "正體「乾」：龺 + 乞，乾坤乾燥"
      },
      {
        "char": "韓",
        "layout": "lr",
        "recipes": [
          [
            "龺",
            "韋"
          ]
        ],
        "hint": "古國名，姓氏「韓」"
      },
      {
        "char": "吃",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "乞"
          ]
        ],
        "hint": "張口進食，吃飯"
      },
      {
        "char": "迄",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "乞"
          ]
        ],
        "hint": "至今為止，迄今"
      },
      {
        "char": "德",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "悳"
          ]
        ],
        "hint": "正道直心，道德品德"
      },
      {
        "char": "聽",
        "layout": "tri",
        "recipes": [
          [
            "耳",
            "壬",
            "悳"
          ]
        ],
        "hint": "耳聞心領，聆聽聽覺"
      },
      {
        "char": "墟",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "虛"
          ]
        ],
        "hint": "荒廢土丘，廢墟"
      },
      {
        "char": "噓",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "虛"
          ]
        ],
        "hint": "輕聲吹氣，噓寒問暖"
      },
      {
        "char": "寂",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "叔"
          ]
        ],
        "hint": "屋內無聲，寂靜寂寞"
      },
      {
        "char": "督",
        "layout": "tb",
        "recipes": [
          [
            "叔",
            "目"
          ]
        ],
        "hint": "察視監督，督促總督"
      },
      {
        "char": "淑",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "叔"
          ]
        ],
        "hint": "水清性善，賢淑淑女"
      },
      {
        "char": "椒",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "叔"
          ]
        ],
        "hint": "辛香果實，辣椒花椒"
      }
    ]
  },
  {
    "stage": 101,
    "title": "百工技藝",
    "subtitle": "爐火純青",
    "components": [
      "呂",
      "盧",
      "柬",
      "匽",
      "并"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 260,
    "targets": [
      {
        "char": "侶",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "呂"
          ]
        ],
        "hint": "同行伴侶，情侶"
      },
      {
        "char": "鋁",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "呂"
          ]
        ],
        "hint": "輕盈金屬，鋁合金"
      },
      {
        "char": "宮",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "呂"
          ]
        ],
        "hint": "屋宇連綿，宮殿迷宮"
      },
      {
        "char": "爐",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "盧"
          ]
        ],
        "hint": "盛火器具，火爐香爐"
      },
      {
        "char": "廬",
        "layout": "enc",
        "recipes": [
          [
            "广",
            "盧"
          ]
        ],
        "hint": "簡陋草屋，茅廬"
      },
      {
        "char": "蘆",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "盧"
          ]
        ],
        "hint": "水邊蘆葦，葫蘆"
      },
      {
        "char": "練",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "柬"
          ]
        ],
        "hint": "煮絲使白熟，練習訓練"
      },
      {
        "char": "煉",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "柬"
          ]
        ],
        "hint": "以火冶煉，修煉煉丹"
      },
      {
        "char": "鍊",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "柬"
          ]
        ],
        "hint": "冶煉金屬，千錘百鍊"
      },
      {
        "char": "揀",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "柬"
          ]
        ],
        "hint": "挑選揀選"
      },
      {
        "char": "堰",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "匽"
          ]
        ],
        "hint": "擋水土壩，都江堰"
      },
      {
        "char": "併",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "并"
          ]
        ],
        "hint": "相並合流，合併併購"
      },
      {
        "char": "餅",
        "layout": "lr",
        "recipes": [
          [
            "食",
            "并"
          ]
        ],
        "hint": "麵製圓餅，月餅餅乾"
      },
      {
        "char": "屏",
        "layout": "enc",
        "recipes": [
          [
            "尸",
            "并"
          ]
        ],
        "hint": "遮蔽屏風，屏幕"
      },
      {
        "char": "瓶",
        "layout": "lr",
        "recipes": [
          [
            "并",
            "瓦"
          ]
        ],
        "hint": "陶製盛器，花瓶瓶子"
      }
    ]
  },
  {
    "stage": 102,
    "title": "關津要塞",
    "subtitle": "一夫當關",
    "components": [
      "度",
      "庶",
      "塞",
      "關",
      "卸"
    ],
    "unlockThreshold": 4,
    "chestRewardCoins": 260,
    "targets": [
      {
        "char": "渡",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "度"
          ]
        ],
        "hint": "過河渡江，渡口過渡"
      },
      {
        "char": "鍍",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "度"
          ]
        ],
        "hint": "金屬表面覆金，鍍金"
      },
      {
        "char": "遮",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "庶"
          ]
        ],
        "hint": "遮蔽阻擋，遮風擋雨"
      },
      {
        "char": "御",
        "layout": "lr",
        "recipes": [
          [
            "彳",
            "卸"
          ]
        ],
        "hint": "駕馭車馬，御風"
      },
      {
        "char": "禦",
        "layout": "tb",
        "recipes": [
          [
            "御",
            "示"
          ]
        ],
        "hint": "抵禦外侮，防禦抵禦"
      },
      {
        "char": "津",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "聿"
          ]
        ],
        "hint": "渡口津液，天津津津有味"
      }
    ]
  },
  {
    "stage": 103,
    "title": "本草經絡",
    "subtitle": "濟世良方",
    "components": [
      "𠂢",
      "曷",
      "畺",
      "之",
      "齊"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 260,
    "targets": [
      {
        "char": "派",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "𠂢"
          ]
        ],
        "hint": "水流分支，派別派遣"
      },
      {
        "char": "脈",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "𠂢"
          ]
        ],
        "hint": "血脈經絡，山脈脈搏"
      },
      {
        "char": "渴",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "曷"
          ]
        ],
        "hint": "思飲水漿，口渴渴望"
      },
      {
        "char": "喝",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "曷"
          ]
        ],
        "hint": "張口飲水，喝水喝采"
      },
      {
        "char": "葛",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "曷"
          ]
        ],
        "hint": "藤本植物，葛藤諸葛"
      },
      {
        "char": "歇",
        "layout": "lr",
        "recipes": [
          [
            "曷",
            "欠"
          ]
        ],
        "hint": "止息氣喘，歇息停歇"
      },
      {
        "char": "疆",
        "layout": "tri",
        "recipes": [
          [
            "弓",
            "土",
            "畺"
          ]
        ],
        "hint": "弓丈田界，疆域邊疆"
      },
      {
        "char": "薑",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "畺"
          ]
        ],
        "hint": "辛香根莖，生薑薑茶"
      },
      {
        "char": "僵",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "畺"
          ]
        ],
        "hint": "身體僵硬，僵局"
      },
      {
        "char": "芝",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "之"
          ]
        ],
        "hint": "瑞草靈芝，芝麻"
      },
      {
        "char": "濟",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "齊"
          ]
        ],
        "hint": "渡河相助，經濟濟世"
      },
      {
        "char": "劑",
        "layout": "lr",
        "recipes": [
          [
            "齊",
            "刀"
          ]
        ],
        "hint": "調配藥劑，一劑良藥"
      },
      {
        "char": "擠",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "齊"
          ]
        ],
        "hint": "推擠擁擠"
      },
      {
        "char": "灸",
        "layout": "tb",
        "recipes": [
          [
            "久",
            "火"
          ]
        ],
        "hint": "艾火久灼穴位，針灸"
      }
    ]
  },
  {
    "stage": 104,
    "title": "音韻律呂",
    "subtitle": "余音繞樑",
    "components": [
      "夬",
      "厶",
      "黽",
      "能",
      "巤"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 260,
    "targets": [
      {
        "char": "快",
        "layout": "lr",
        "recipes": [
          [
            "心",
            "夬"
          ]
        ],
        "hint": "心懷暢快，快樂快速"
      },
      {
        "char": "決",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "夬"
          ]
        ],
        "hint": "水決堤口，決定堅決"
      },
      {
        "char": "缺",
        "layout": "lr",
        "recipes": [
          [
            "缶",
            "夬"
          ]
        ],
        "hint": "陶器破損，缺少缺點"
      },
      {
        "char": "訣",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "夬"
          ]
        ],
        "hint": "口傳秘訣，訣別秘訣"
      },
      {
        "char": "弘",
        "layout": "lr",
        "recipes": [
          [
            "弓",
            "厶"
          ]
        ],
        "hint": "弓聲宏大，弘揚弘大"
      },
      {
        "char": "私",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "厶"
          ]
        ],
        "hint": "個人所有，自私隱私"
      },
      {
        "char": "蠅",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "黽"
          ]
        ],
        "hint": "飛蟲蒼蠅"
      },
      {
        "char": "繩",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "黽"
          ]
        ],
        "hint": "絞股粗線，繩索繩子"
      },
      {
        "char": "熊",
        "layout": "tb",
        "recipes": [
          [
            "能",
            "火"
          ]
        ],
        "hint": "猛獸黑熊，熊貓"
      },
      {
        "char": "態",
        "layout": "tb",
        "recipes": [
          [
            "能",
            "心"
          ]
        ],
        "hint": "心意形於外，態度姿態"
      },
      {
        "char": "獵",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "巤"
          ]
        ],
        "hint": "帶犬打獵，獵人狩獵"
      },
      {
        "char": "蠟",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "巤"
          ]
        ],
        "hint": "蜂蠟燭光，蠟燭"
      },
      {
        "char": "韻",
        "layout": "lr",
        "recipes": [
          [
            "音",
            "員"
          ]
        ],
        "hint": "和諧音律，韻味詩韻"
      },
      {
        "char": "韶",
        "layout": "lr",
        "recipes": [
          [
            "音",
            "召"
          ]
        ],
        "hint": "舜帝雅樂，韶光年華"
      }
    ]
  },
  {
    "stage": 105,
    "title": "經史子集",
    "subtitle": "譯古通今",
    "components": [
      "彖",
      "乂",
      "睪",
      "舀",
      "舄"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 270,
    "targets": [
      {
        "char": "緣",
        "layout": "lr",
        "recipes": [
          [
            "糸",
            "彖"
          ]
        ],
        "hint": "衣邊與緣分，緣故因緣"
      },
      {
        "char": "篆",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "彖"
          ]
        ],
        "hint": "古代書體，篆書印篆"
      },
      {
        "char": "艾",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "乂"
          ]
        ],
        "hint": "藥草艾葉，方興未艾"
      },
      {
        "char": "刈",
        "layout": "lr",
        "recipes": [
          [
            "乂",
            "刀"
          ]
        ],
        "hint": "割草收割，刈草"
      },
      {
        "char": "譯",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "睪"
          ]
        ],
        "hint": "傳譯言語，翻譯口譯"
      },
      {
        "char": "釋",
        "layout": "lr",
        "recipes": [
          [
            "采",
            "睪"
          ]
        ],
        "hint": "解開釋放，解釋釋懷"
      },
      {
        "char": "澤",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "睪"
          ]
        ],
        "hint": "水草匯聚，光澤恩澤"
      },
      {
        "char": "擇",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "睪"
          ]
        ],
        "hint": "挑選抉擇，選擇"
      },
      {
        "char": "稻",
        "layout": "lr",
        "recipes": [
          [
            "禾",
            "舀"
          ]
        ],
        "hint": "水田稻穀，水稻稻香"
      },
      {
        "char": "蹈",
        "layout": "lr",
        "recipes": [
          [
            "足",
            "舀"
          ]
        ],
        "hint": "頓足起舞，舞蹈循規蹈矩"
      },
      {
        "char": "滔",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "舀"
          ]
        ],
        "hint": "大水漫流，滔滔不絕"
      },
      {
        "char": "韜",
        "layout": "lr",
        "recipes": [
          [
            "韋",
            "舀"
          ]
        ],
        "hint": "劍套兵法，韜光養晦"
      },
      {
        "char": "寫",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "舄"
          ]
        ],
        "hint": "屋下書寫，寫字描寫"
      },
      {
        "char": "瀉",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "寫"
          ]
        ],
        "hint": "水勢傾瀉，一瀉千里"
      }
    ]
  },
  {
    "stage": 106,
    "title": "兵法謀略",
    "subtitle": "俠骨丹心",
    "components": [
      "夾",
      "來",
      "昜",
      "卑",
      "厲"
    ],
    "unlockThreshold": 6,
    "chestRewardCoins": 270,
    "targets": [
      {
        "char": "俠",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "夾"
          ]
        ],
        "hint": "扶弱抑強，武俠俠義"
      },
      {
        "char": "峽",
        "layout": "lr",
        "recipes": [
          [
            "山",
            "夾"
          ]
        ],
        "hint": "兩山夾水，三峽海峽"
      },
      {
        "char": "狹",
        "layout": "lr",
        "recipes": [
          [
            "犬",
            "夾"
          ]
        ],
        "hint": "窄小狹隘，狹窄"
      },
      {
        "char": "萊",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "來"
          ]
        ],
        "hint": "蓬萊仙島，萊茵河"
      },
      {
        "char": "暢",
        "layout": "lr",
        "recipes": [
          [
            "申",
            "昜"
          ]
        ],
        "hint": "通達舒暢，順暢流暢"
      },
      {
        "char": "腸",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "昜"
          ]
        ],
        "hint": "消化器官，腸胃心腸"
      },
      {
        "char": "牌",
        "layout": "lr",
        "recipes": [
          [
            "片",
            "卑"
          ]
        ],
        "hint": "木片告示，招牌金牌"
      },
      {
        "char": "碑",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "卑"
          ]
        ],
        "hint": "刻字石碑，口碑里程碑"
      },
      {
        "char": "脾",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "卑"
          ]
        ],
        "hint": "五臟之一，脾氣脾胃"
      },
      {
        "char": "勵",
        "layout": "lr",
        "recipes": [
          [
            "厲",
            "力"
          ]
        ],
        "hint": "勉力奮發，鼓勵獎勵"
      },
      {
        "char": "礪",
        "layout": "lr",
        "recipes": [
          [
            "石",
            "厲"
          ]
        ],
        "hint": "磨刀石，磨礪砥礪"
      },
      {
        "char": "蠣",
        "layout": "lr",
        "recipes": [
          [
            "虫",
            "厲"
          ]
        ],
        "hint": "海中貝類，牡蠣"
      }
    ]
  },
  {
    "stage": 107,
    "title": "宇宙星象",
    "subtitle": "日月昇華",
    "components": [
      "于",
      "升",
      "詹",
      "冥",
      "屰"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 270,
    "targets": [
      {
        "char": "宇",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "于"
          ]
        ],
        "hint": "屋簷天地，宇宙氣宇"
      },
      {
        "char": "芋",
        "layout": "tb",
        "recipes": [
          [
            "艹",
            "于"
          ]
        ],
        "hint": "塊莖作物，芋頭"
      },
      {
        "char": "昇",
        "layout": "tb",
        "recipes": [
          [
            "日",
            "升"
          ]
        ],
        "hint": "紅日東昇，昇華"
      },
      {
        "char": "陞",
        "layout": "tri",
        "recipes": [
          [
            "阜",
            "升",
            "土"
          ]
        ],
        "hint": "登高晉級（阜 + 升 + 土），陞官"
      },
      {
        "char": "擔",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "詹"
          ]
        ],
        "hint": "肩挑承擔，擔心擔任"
      },
      {
        "char": "膽",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "詹"
          ]
        ],
        "hint": "膽量勇氣，肝膽相照"
      },
      {
        "char": "瞻",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "詹"
          ]
        ],
        "hint": "仰望向前，瞻仰高瞻遠矚"
      },
      {
        "char": "簷",
        "layout": "tb",
        "recipes": [
          [
            "竹",
            "詹"
          ]
        ],
        "hint": "屋頂邊緣，屋簷"
      },
      {
        "char": "瞑",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "冥"
          ]
        ],
        "hint": "閉目沉思，瞑目"
      },
      {
        "char": "溟",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "冥"
          ]
        ],
        "hint": "幽深大海，北溟"
      },
      {
        "char": "朔",
        "layout": "lr",
        "recipes": [
          [
            "屰",
            "月"
          ]
        ],
        "hint": "農曆初一，朔風撲面"
      },
      {
        "char": "塑",
        "layout": "tb",
        "recipes": [
          [
            "朔",
            "土"
          ]
        ],
        "hint": "揉土成形，雕塑塑造"
      },
      {
        "char": "溯",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "朔"
          ]
        ],
        "hint": "逆流而上，追溯回溯"
      },
      {
        "char": "宙",
        "layout": "tb",
        "recipes": [
          [
            "宀",
            "由"
          ]
        ],
        "hint": "古往今來，宇宙"
      }
    ]
  },
  {
    "stage": 108,
    "title": "邦國禮制",
    "subtitle": "家國天下",
    "components": [
      "或",
      "贊",
      "襄",
      "嬰",
      "帶"
    ],
    "unlockThreshold": 5,
    "chestRewardCoins": 270,
    "targets": [
      {
        "char": "國",
        "layout": "enc",
        "recipes": [
          [
            "囗",
            "或"
          ]
        ],
        "hint": "執戈守土疆域，國家祖國"
      },
      {
        "char": "惑",
        "layout": "tb",
        "recipes": [
          [
            "或",
            "心"
          ]
        ],
        "hint": "心生疑慮，迷惑困惑"
      },
      {
        "char": "域",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "或"
          ]
        ],
        "hint": "邦國疆土，領域區域"
      },
      {
        "char": "讚",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "贊"
          ]
        ],
        "hint": "出言稱美，讚美稱讚"
      },
      {
        "char": "鑽",
        "layout": "lr",
        "recipes": [
          [
            "金",
            "贊"
          ]
        ],
        "hint": "金剛堅硬，鑽石鑽研"
      },
      {
        "char": "讓",
        "layout": "lr",
        "recipes": [
          [
            "言",
            "襄"
          ]
        ],
        "hint": "言辭謙遜，禮讓讓步"
      },
      {
        "char": "壤",
        "layout": "lr",
        "recipes": [
          [
            "土",
            "襄"
          ]
        ],
        "hint": "鬆軟肥土，土壤天壤之別"
      },
      {
        "char": "釀",
        "layout": "lr",
        "recipes": [
          [
            "酉",
            "襄"
          ]
        ],
        "hint": "發酵造酒，醞釀佳釀"
      },
      {
        "char": "櫻",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "嬰"
          ]
        ],
        "hint": "春日櫻花，櫻桃"
      },
      {
        "char": "鸚",
        "layout": "lr",
        "recipes": [
          [
            "嬰",
            "鳥"
          ]
        ],
        "hint": "學舌飛鳥，鸚鵡"
      },
      {
        "char": "滯",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "帶"
          ]
        ],
        "hint": "水流阻滯，停滯呆滯"
      }
    ]
  },
  {
    "stage": 109,
    "title": "文心雕龍",
    "subtitle": "明辨是非",
    "components": [
      "曹",
      "蒙",
      "奐",
      "舜",
      "离"
    ],
    "unlockThreshold": 8,
    "chestRewardCoins": 270,
    "targets": [
      {
        "char": "槽",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "曹"
          ]
        ],
        "hint": "木製盛器，水槽跳槽"
      },
      {
        "char": "遭",
        "layout": "enc",
        "recipes": [
          [
            "辶",
            "曹"
          ]
        ],
        "hint": "途中相遇，遭遇遭逢"
      },
      {
        "char": "糟",
        "layout": "lr",
        "recipes": [
          [
            "米",
            "曹"
          ]
        ],
        "hint": "酒渣糟粕，糟糕"
      },
      {
        "char": "嘈",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "曹"
          ]
        ],
        "hint": "聲音雜亂，嘈雜"
      },
      {
        "char": "漕",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "曹"
          ]
        ],
        "hint": "水道運糧，漕運"
      },
      {
        "char": "朦",
        "layout": "lr",
        "recipes": [
          [
            "肉",
            "蒙"
          ]
        ],
        "hint": "月色微明，朦朧"
      },
      {
        "char": "濛",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "蒙"
          ]
        ],
        "hint": "細雨迷濛，濛濛細雨"
      },
      {
        "char": "換",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "奐"
          ]
        ],
        "hint": "以手相易，交換變換"
      },
      {
        "char": "喚",
        "layout": "lr",
        "recipes": [
          [
            "口",
            "奐"
          ]
        ],
        "hint": "大聲呼喊，呼喚喚醒"
      },
      {
        "char": "煥",
        "layout": "lr",
        "recipes": [
          [
            "火",
            "奐"
          ]
        ],
        "hint": "火光明亮，煥然一新"
      },
      {
        "char": "瞬",
        "layout": "lr",
        "recipes": [
          [
            "目",
            "舜"
          ]
        ],
        "hint": "眨眼之間，瞬間瞬息萬變"
      },
      {
        "char": "離",
        "layout": "lr",
        "recipes": [
          [
            "离",
            "隹"
          ]
        ],
        "hint": "飛鳥離巢，離開分離"
      },
      {
        "char": "璃",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "离"
          ]
        ],
        "hint": "晶瑩琉璃，玻璃"
      },
      {
        "char": "辯",
        "layout": "tri",
        "recipes": [
          [
            "辛",
            "言",
            "辛"
          ]
        ],
        "hint": "雙辛夾言爭理，辯論明辨"
      },
      {
        "char": "辨",
        "layout": "tri",
        "recipes": [
          [
            "辛",
            "刀",
            "辛"
          ]
        ],
        "hint": "雙辛夾刀分明，辨別分辨"
      },
      {
        "char": "辦",
        "layout": "tri",
        "recipes": [
          [
            "辛",
            "力",
            "辛"
          ]
        ],
        "hint": "雙辛夾力做事，辦法辦理"
      },
      {
        "char": "瓣",
        "layout": "tri",
        "recipes": [
          [
            "辛",
            "瓜",
            "辛"
          ]
        ],
        "hint": "雙辛夾瓜分瓣，花瓣豆瓣"
      }
    ]
  },
  {
    "stage": 110,
    "title": "造字宗師",
    "subtitle": "萬象歸一",
    "components": [
      "雚",
      "菐",
      "臼",
      "鬯",
      "鼠"
    ],
    "unlockThreshold": 7,
    "chestRewardCoins": 280,
    "targets": [
      {
        "char": "僕",
        "layout": "lr",
        "recipes": [
          [
            "人",
            "菐"
          ]
        ],
        "hint": "侍從僕役（人 + 菐），僕人風塵僕僕"
      },
      {
        "char": "撲",
        "layout": "lr",
        "recipes": [
          [
            "手",
            "菐"
          ]
        ],
        "hint": "伸手前撲（手 + 菐），撲滅撲面"
      },
      {
        "char": "樸",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "菐"
          ]
        ],
        "hint": "未雕琢原木（木 + 菐），樸實純樸"
      },
      {
        "char": "璞",
        "layout": "lr",
        "recipes": [
          [
            "王",
            "菐"
          ]
        ],
        "hint": "蘊玉之石（王 + 菐），璞玉渾金"
      },
      {
        "char": "業",
        "layout": "tb",
        "recipes": [
          [
            "菐",
            "木"
          ]
        ],
        "hint": "菐下加木，事業學業"
      },
      {
        "char": "觀",
        "layout": "lr",
        "recipes": [
          [
            "雚",
            "見"
          ]
        ],
        "hint": "細心察看，觀察觀點"
      },
      {
        "char": "歡",
        "layout": "lr",
        "recipes": [
          [
            "雚",
            "欠"
          ]
        ],
        "hint": "喜悅歡呼，歡樂歡迎"
      },
      {
        "char": "勸",
        "layout": "lr",
        "recipes": [
          [
            "雚",
            "力"
          ]
        ],
        "hint": "勉力規勸，勸告勸說"
      },
      {
        "char": "權",
        "layout": "lr",
        "recipes": [
          [
            "木",
            "雚"
          ]
        ],
        "hint": "秤錘權衡，權利權威"
      },
      {
        "char": "灌",
        "layout": "lr",
        "recipes": [
          [
            "水",
            "雚"
          ]
        ],
        "hint": "引水澆灌，灌溉灌注"
      },
      {
        "char": "罐",
        "layout": "lr",
        "recipes": [
          [
            "缶",
            "雚"
          ]
        ],
        "hint": "陶製圓罐，罐頭"
      },
      {
        "char": "舊",
        "layout": "tri",
        "recipes": [
          [
            "艹",
            "隹",
            "臼"
          ]
        ],
        "hint": "昔日故舊，懷舊新舊"
      },
      {
        "char": "舅",
        "layout": "tb",
        "recipes": [
          [
            "臼",
            "男"
          ]
        ],
        "hint": "母之兄弟，舅舅"
      },
      {
        "char": "鬱",
        "layout": "quin",
        "recipes": [
          [
            "林",
            "缶",
            "冖",
            "鬯",
            "彡"
          ]
        ],
        "hint": "五元終極神字（林 + 缶 + 冖 + 鬯 + 彡），鬱鬱蔥蔥"
      }
    ]
  }
];
