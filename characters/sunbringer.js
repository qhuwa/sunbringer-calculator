const skills = [
  {
    "name": "毁伤",
    "base": 8050,
    "step": 740,
    "defaultCount": 3
  },
  {
    "name": "普通攻击：执旌·聚锋",
    "base": 98060,
    "step": 8920,
    "defaultCount": 1
  },
  {
    "name": "强化特殊技：焚夜·长暗终焉",
    "base": 96150,
    "step": 8750,
    "defaultCount": 1
  },
  {
    "name": "强化特殊技：焚夜·曦生（改）",
    "base": 71160,
    "step": 6470,
    "defaultCount": 1
  },
  {
    "name": "强化特殊技：燃灯·永昼之炬",
    "base": 84150,
    "step": 7650,
    "defaultCount": 1
  },
  {
    "name": "强化特殊技：燃灯·晦尽（改）",
    "base": 76230,
    "step": 6930,
    "defaultCount": 1
  },
  {
    "name": "支援突击：不灭热忱",
    "base": 52760,
    "step": 4800,
    "defaultCount": 2
  },
  {
    "name": "反制支援：希望堡垒",
    "base": 84210,
    "step": 7660,
    "defaultCount": 1
  },
  {
    "name": "连携技：「以挽昼之名」",
    "base": 89550,
    "step": 8150,
    "defaultCount": 1
  },
  {
    "name": "连携技：「筑万众之梦」",
    "base": 89550,
    "step": 8150,
    "defaultCount": 1
  },
  {
    "name": "终结技：「此行，共赴前路」",
    "base": 141740,
    "step": 12890,
    "defaultCount": 1
  },
  {
    "name": "终结技：「此愿，重塑万象」",
    "base": 115370,
    "step": 10490,
    "defaultCount": 1
  },
  {
    "name": "普通攻击：斩棘（一段）",
    "base": 8310,
    "step": 760,
    "defaultCount": 0
  },
  {
    "name": "普通攻击：斩棘（二段）",
    "base": 9500,
    "step": 870,
    "defaultCount": 0
  },
  {
    "name": "普通攻击：斩棘（三段）",
    "base": 17020,
    "step": 1550,
    "defaultCount": 0
  },
  {
    "name": "普通攻击：斩棘（四段）",
    "base": 31060,
    "step": 2830,
    "defaultCount": 0
  },
  {
    "name": "普通攻击：执旌（一段）",
    "base": 5350,
    "step": 490,
    "defaultCount": 0
  },
  {
    "name": "普通攻击：执旌（二段）",
    "base": 9700,
    "step": 890,
    "defaultCount": 0
  },
  {
    "name": "普通攻击：执旌（三段）",
    "base": 12470,
    "step": 1140,
    "defaultCount": 0
  },
  {
    "name": "普通攻击：执旌（四段）",
    "base": 16230,
    "step": 1480,
    "defaultCount": 0
  },
  {
    "name": "普通攻击：掷光",
    "base": 8250,
    "step": 750,
    "defaultCount": 0
  },
  {
    "name": "特殊技：焚夜",
    "base": 5470,
    "step": 500,
    "defaultCount": 0
  },
  {
    "name": "强化特殊技：焚夜·曦生",
    "base": 70190,
    "step": 6390,
    "defaultCount": 0
  },
  {
    "name": "特殊技：燃灯",
    "base": 5560,
    "step": 510,
    "defaultCount": 0
  },
  {
    "name": "强化特殊技：燃灯·晦尽",
    "base": 69110,
    "step": 6290,
    "defaultCount": 0
  },
  {
    "name": "闪避：相位折叠",
    "base": 0,
    "step": 0,
    "defaultCount": 0
  },
  {
    "name": "冲刺攻击：虚空斩进",
    "base": 3450,
    "step": 320,
    "defaultCount": 0
  },
  {
    "name": "闪避反击：潜火渐炽",
    "base": 37170,
    "step": 3380,
    "defaultCount": 0
  },
  {
    "name": "闪避：空间重构",
    "base": 0,
    "step": 0,
    "defaultCount": 0
  },
  {
    "name": "冲刺攻击：虚实逆转",
    "base": 3650,
    "step": 340,
    "defaultCount": 0
  },
  {
    "name": "闪避：巡征",
    "base": 0,
    "step": 0,
    "defaultCount": 0
  },
  {
    "name": "冲刺攻击：巡征·影域穿袭",
    "base": 13030,
    "step": 1190,
    "defaultCount": 0
  },
  {
    "name": "闪避反击：冷焰凝锋",
    "base": 33930,
    "step": 3090,
    "defaultCount": 0
  },
  {
    "name": "切换主控：一体同心",
    "base": 0,
    "step": 0,
    "defaultCount": 0
  },
  {
    "name": "快速支援：无畏驰援",
    "base": 9880,
    "step": 900,
    "defaultCount": 0
  },
  {
    "name": "快速支援：锋芒所向",
    "base": 8630,
    "step": 790,
    "defaultCount": 0
  },
  {
    "name": "支援突击：虔志如初",
    "base": 48200,
    "step": 4390,
    "defaultCount": 0
  },
  {
    "name": "招架支援：坚守之誓",
    "base": 0,
    "step": 0,
    "defaultCount": 0
  },
  {
    "name": "支援突击：灯塔，立于苍穹",
    "base": 16900,
    "step": 1540,
    "defaultCount": 0
  }
];
const portraits = ["https://i.gachabase.net/BpbgbWSIJnhNutGIWAC8UGDxLIAG8sWc4Tymho2PF0E/q:50/f:webp/plain/zzz/assets/bd3575aca33e7935e3631b50b2781435.png", "https://i.gachabase.net/U2Sg6BM_ebEXQqP98ihbfbLCSRXrBAygsNKvZAuWxac/q:50/f:webp/plain/zzz/assets/eaffd2b3bc19122ccdf10c4bf516a288.png", "https://i.gachabase.net/Kqtwopikv_PF_ha9aITgx5K2mNhneMBRCU6wACKu6mA/q:50/f:webp/plain/zzz/assets/0cbeab1bc0949f02bcbeac87635c4fca.png"];
