// GachaBase skill coefficients use 1/10000 units. Hit splits follow the target element of each attack.

const corin={
  name:"可琳", role:"强攻 · 物理", kind:"attack", element:200, stat:807, crit:0.05, cd:0.788, ultimate:"非、非常抱歉！", agentId:1061, slug:"corin", chainId:1061017, ultId:1061018, weaponId:13106, weaponSlug:"housekeeper",
  weaponAtk:624, weaponAtkPct:0.25,
  portrait:"https://i.gachabase.net/bIfDqrH1MzcMb_-uo9HY-9XjBl0dxBWa5BVEZ2S5VGA/q:50/f:webp/plain/zzz/assets/27161da7f41384e40069477da896bbec.png",
  engines:[['1',"家政员"]],
  skills:[
    {id:1061011, name:"强化特殊技：小心裙角（回旋斩击）", type:"ex", base:34510, step:3140, defaultCount:2},
    {id:1061012, name:"强化特殊技：小心裙角（持续斩击最大）", type:"ex", base:103520, step:9420, defaultCount:2},
    {id:1061013, name:"强化特殊技：小心裙角（爆炸）", type:"ex", base:34510, step:3140, defaultCount:2},
    {id:1061017, name:"连携技：抱歉…", type:"chain", base:68730, step:6250, defaultCount:1},
    {id:1061018, name:"终结技：非、非常抱歉！", type:"ult", base:202880, step:18450, defaultCount:1},
    {id:1061024, name:"支援突击：快速清扫", type:"other", base:54750, step:4980, defaultCount:1},
    {id:1061001, name:"普通攻击：扫除开始（一段）", type:"basic", base:8200, step:750},
    {id:1061002, name:"普通攻击：扫除开始（二段）", type:"basic", base:7660, step:700},
    {id:1061003, name:"普通攻击：扫除开始（三段）", type:"basic", base:17920, step:1630},
    {id:1061004, name:"普通攻击：扫除开始（四段）", type:"basic", base:23340, step:2130},
    {id:1061006, name:"普通攻击：扫除开始（五段）", type:"basic", base:42120, step:3830},
    {id:1061008, name:"特殊技：强力清扫（回旋斩击）", type:"other", base:6670, step:610},
    {id:1061009, name:"特殊技：强力清扫（持续斩击最大）", type:"other", base:3750, step:350},
    {id:1061010, name:"特殊技：强力清扫（爆炸）", type:"other", base:2500, step:230},
    {id:1061014, name:"冲刺攻击：[断]（最大）", type:"dash", base:9670, step:880},
    {id:1061016, name:"闪避反击：[舍]", type:"dodge", base:27120, step:2480},
    {id:1061020, name:"快速支援：应急措施", type:"other", base:21500, step:1960},
    {id:1061096, name:"六影 · 电锯充能引爆", type:"other", base:300, step:0, automatic:true}
  ]
};

const manato={
  name:"真斗", role:"命破 · 火", kind:"rupture", element:201, stat:755, crit:0.05, cd:0.5, ultimate:"无想荒魂", agentId:1441, slug:"manato", chainId:1441018, ultId:1441019, weaponId:13144, weaponSlug:"grill-o-wisp", hp:7724, coreHp:0.18,
  weaponAtk:624, weaponHp:0.25,
  portrait:"https://i.gachabase.net/OD7LV6Fef-BL_7VPPJ1lKvC4GJaPAr34sExkhtaTIhg/q:50/f:webp/plain/zzz/assets/4ea7a26c25b33ac7b6f1241367f839d7.png",
  engines:[['1',"燔火胧夜"]],
  skills:[
    {id:1441009, name:"普通攻击：炽风·胧切（一段）", type:"basic", base:5310, step:490, defaultCount:2},
    {id:1441010, name:"普通攻击：炽风·胧切（二段）", type:"basic", base:11120, step:1020, defaultCount:2},
    {id:1441011, name:"普通攻击：炽风·胧切（三段）", type:"basic", base:15450, step:1410, defaultCount:2},
    {id:1441012, name:"普通攻击：炽风·胧切（四段）", type:"basic", base:23780, step:2170, defaultCount:2},
    {id:1441015, name:"强化特殊技：归烬·天坠", type:"ex", base:65260, step:5940, defaultCount:2},
    {id:1441018, name:"连携技：极炽炎爆", type:"chain", base:48330, step:4400, defaultCount:1},
    {id:1441019, name:"终结技：无想荒魂", type:"ult", base:156230, step:14210, defaultCount:1},
    {id:1441025, name:"支援突击：孤影·断獠（连打最大）", type:"other", base:57010, step:5190, defaultCount:1},
    {id:1441001, name:"普通攻击：炽风斩（一段）", type:"basic", base:2870, step:270, element:"physical"},
    {id:1441003, name:"普通攻击：炽风斩（二段）", type:"basic", base:8270, step:760, element:"physical"},
    {id:1441005, name:"普通攻击：炽风斩（三段）", type:"basic", base:13460, step:1230, element:"physical"},
    {id:1441006, name:"普通攻击：炽风斩（一段（触发烬风））", type:"basic", base:6310, step:590},
    {id:1441007, name:"普通攻击：炽风斩（二段（触发烬风））", type:"basic", base:9550, step:880},
    {id:1441008, name:"普通攻击：炽风斩（三段（触发烬风））", type:"basic", base:14330, step:1310},
    {id:1441013, name:"特殊技：归烬", type:"other", base:5070, step:470},
    {id:1441014, name:"特殊技：归烬（蓄力或格挡成功）", type:"other", base:13070, step:1190},
    {id:1441016, name:"冲刺攻击：曜刃·残心", type:"dash", base:5870, step:540, element:"physical"},
    {id:1441017, name:"闪避反击：曜刃·掠阵", type:"dodge", base:19800, step:1800},
    {id:1441020, name:"快速支援：孤影·归阵", type:"other", base:9070, step:830},
    {id:1441026, name:"招架支援：孤影·岳峙", type:"other", base:4000, step:370},
    {id:1441024, name:"支援突击：孤影·断獠", type:"other", base:16670, step:1520}
  ]
};

const hugo={
  name:"雨果", role:"强攻 · 冰", kind:"attack", element:202, stat:919, crit:0.194, cd:0.5, ultimate:"渎神者", agentId:1291, slug:"hugo", chainId:1291015, ultId:1291018, weaponId:14129, weaponSlug:"myriad-eclipse",
  weaponAtk:713, weaponCrit:0.24,
  portrait:"https://i.gachabase.net/9P--8ENy--m1Ph_RJ37sdw1eUtdeeIxvuxxtv8pk44A/q:50/f:webp/plain/zzz/assets/0586bd6fbddf7887b57a2a9226f14149.png",
  engines:[['1',"千面日陨"]],
  skills:[
    {id:1291004, name:"普通攻击：暗渊四重奏（斩击）", type:"basic", base:14910, step:1360, defaultCount:1},
    {id:1291006, name:"普通攻击：暗渊四重奏（蓄力射击）", type:"basic", base:11800, step:1080, defaultCount:1},
    {id:1291010, name:"强化特殊技：魂狩·惩戒（终结一击）", type:"ex", base:35450, step:3230, defaultCount:1},
    {id:1291015, name:"连携技：命运戏法（斩击）", type:"chain", base:70110, step:6380, defaultCount:1},
    {id:1291018, name:"终结技：渎神者（终结一击）", type:"ult", base:152710, step:13890, split:0.8, defaultCount:1},
    {id:12910182, name:"终结技：渎神者（决算）", type:"ult", base:152710, step:13890, split:0.8, decisionOf:1291018, automatic:true},
    {id:12910102, name:"强化特殊技：魂狩·惩戒（决算）", type:"ex", base:35450, step:3230, decisionOf:1291010, automatic:true},
    {id:1291001, name:"普通攻击：暗渊四重奏（一段）", type:"basic", base:4310, step:400, element:"physical"},
    {id:1291002, name:"普通攻击：暗渊四重奏（二段）", type:"basic", base:7410, step:680, element:"physical"},
    {id:1291003, name:"普通攻击：暗渊四重奏（三段）", type:"basic", base:16960, step:1550, element:"physical"},
    {id:1291005, name:"普通攻击：暗渊四重奏（射击）", type:"basic", base:5860, step:540},
    {id:1291024, name:"普通攻击：暗渊协奏曲（斩击）", type:"basic", base:14340, step:1310},
    {id:1291025, name:"普通攻击：暗渊协奏曲（射击）", type:"basic", base:8670, step:790},
    {id:1291026, name:"普通攻击：暗渊协奏曲（蓄力射击）", type:"basic", base:17060, step:1560},
    {id:1291008, name:"特殊技：魂狩·断罪", type:"other", base:8530, step:780},
    {id:1291009, name:"强化特殊技：魂狩·惩戒（旋转斩）", type:"ex", base:1870, step:170, linkedTo:1291010, automatic:true},
    {id:1291011, name:"冲刺攻击：诡影·破", type:"dash", base:9350, step:850, element:"physical"},
    {id:1291012, name:"闪避反击：诡影·斩", type:"dodge", base:24590, step:2240},
    {id:1291013, name:"闪避反击：诡影·斩（派生射击）", type:"dodge", base:16210, step:1480},
    {id:1291014, name:"闪避反击：诡影·斩（派生蓄力射击）", type:"dodge", base:21210, step:1930},
    {id:12910181, name:"终结技：渎神者（旋转斩）", type:"ult", base:152710, step:13890, split:0.2, linkedTo:1291018, automatic:true},
    {id:1291019, name:"快速支援：葬歌", type:"other", base:10450, step:950},
    {id:1291027, name:"快速支援：葬歌（派生射击）", type:"other", base:12470, step:1140},
    {id:1291028, name:"快速支援：葬歌（派生蓄力射击）", type:"other", base:16320, step:1490},
    {id:1291023, name:"支援突击：王牌反转", type:"other", base:29170, step:2660}
  ]
};

const evelyn={
  name:"伊芙琳", role:"强攻 · 火", kind:"attack", element:201, stat:929, crit:0.194, cd:0.5, ultimate:"月辉丝·弦音", agentId:1321, slug:"evelyn", chainId:1321015, ultId:1321016, weaponId:14132, weaponSlug:"heartstring-nocturne",
  weaponAtk:713, weaponCrit:0.24,
  portrait:"https://i.gachabase.net/TUXaEMm9d7s5FfgziyN6ToRTVaVI9pg2YmG9OY5oZ8U/q:50/f:webp/plain/zzz/assets/fb6b547120bba62f4767d2dc5c694eae.png",
  engines:[['1',"心弦夜响"]],
  skills:[
    {id:1321006, name:"普通攻击：绞勒式·I型", type:"basic", base:22640, step:2060, defaultCount:2},
    {id:1321007, name:"普通攻击：绞勒式·II型", type:"basic", base:24520, step:2230, defaultCount:2},
    {id:1321011, name:"强化特殊技：束裂式·终型（缠绕）", type:"ex", base:54120, step:4920, defaultCount:1},
    {id:1321012, name:"强化特殊技：束裂式·终型（引爆）", type:"ex", base:5960, step:550, defaultCount:1},
    {id:1321015, name:"连携技：月辉丝·绊", type:"chain", base:82930, step:7540, defaultCount:3},
    {id:1321016, name:"终结技：月辉丝·弦音", type:"ult", base:198850, step:18080, defaultCount:1},
    {id:1321001, name:"普通攻击：割弦（一段）", type:"basic", base:5120, step:470, element:"physical"},
    {id:1321002, name:"普通攻击：割弦（二段）", type:"basic", base:6210, step:570, element:"physical"},
    {id:1321003, name:"普通攻击：割弦（三段）", type:"basic", base:7820, step:720, element:"physical"},
    {id:1321004, name:"普通攻击：割弦（四段）", type:"basic", base:18670, step:1700},
    {id:1321005, name:"普通攻击：割弦（五段）", type:"basic", base:22340, step:2040},
    {id:1321008, name:"特殊技：锁系控位（一段）", type:"other", base:5230, step:480},
    {id:1321009, name:"特殊技：束裂式·I型（缠绕）", type:"other", base:4040, step:370},
    {id:1321010, name:"特殊技：束裂式·I型（引爆）", type:"other", base:3400, step:310},
    {id:1321013, name:"冲刺攻击：穿梭潜袭", type:"dash", base:6050, step:550, element:"physical"},
    {id:1321014, name:"闪避反击：绞缢反制", type:"dodge", base:21020, step:1920},
    {id:13210161, name:"终结技：月辉丝·弦影", type:"ult", base:198850, step:18080},
    {id:1321017, name:"快速支援：烈锋", type:"other", base:7710, step:710},
    {id:1321021, name:"支援突击：轨迹干涉", type:"other", base:29160, step:2660},
    {id:1321096, name:"六影 · 月辉丝·弦追击（每次）", type:"chain", base:37500, step:0, automatic:true}
  ]
};

const soldier11={
  name:"「11号」", role:"强攻 · 火", kind:"attack", element:201, stat:888, crit:0.194, cd:0.5, ultimate:"轰鸣烈焰", agentId:1041, slug:"soldier-11", chainId:1041016, ultId:1041017, weaponId:14104, weaponSlug:"the-brimstone",
  weaponAtk:684, weaponAtkPct:0.3,
  portrait:"https://i.gachabase.net/z2er5IJOgHVOm43NJH4PZYZ-Zm6NpbZT-vUw809B2k0/q:50/f:webp/plain/zzz/assets/cfb6bc2550d1ae9676166b3ad40bb631.png",
  engines:[['1',"硫磺石"]],
  skills:[
    {id:1041002, name:"普通攻击：火力镇压（一段）", type:"basic", base:5510, step:510, defaultCount:2},
    {id:1041004, name:"普通攻击：火力镇压（二段）", type:"basic", base:5720, step:520, defaultCount:2},
    {id:1041006, name:"普通攻击：火力镇压（三段）", type:"basic", base:13200, step:1200, defaultCount:2},
    {id:1041008, name:"普通攻击：火力镇压（四段）", type:"basic", base:34070, step:3100, defaultCount:2},
    {id:1041011, name:"强化特殊技：盛燃烈火", type:"ex", base:67500, step:6140, defaultCount:2},
    {id:1041016, name:"连携技：昂扬烈焰", type:"chain", base:63250, step:5750, defaultCount:1},
    {id:1041017, name:"终结技：轰鸣烈焰", type:"ult", base:210300, step:19120, defaultCount:1},
    {id:1041001, name:"普通攻击：热身火花（一段）", type:"basic", base:3440, step:320, element:"physical"},
    {id:1041003, name:"普通攻击：热身火花（二段）", type:"basic", base:4120, step:380, element:"physical"},
    {id:1041005, name:"普通攻击：热身火花（三段）", type:"basic", base:10280, step:940, element:"physical"},
    {id:1041007, name:"普通攻击：热身火花（四段）", type:"basic", base:21340, step:1940, element:"physical"},
    {id:1041024, name:"普通攻击：火力镇压（五段）", type:"basic", base:44170, step:4020, minPotential:1},
    {id:1041025, name:"普通攻击：火力镇压（强化普攻第五段）", type:"basic", base:44170, step:4020, minPotential:1},
    {id:1041026, name:"普通攻击：火力镇压（强化普攻第五段额外）", type:"basic", base:8280, step:760, minPotential:1, automatic:true},
    {id:1041027, name:"普通攻击：火力迸发", type:"basic", base:9410, step:860, minPotential:1},
    {id:1041010, name:"特殊技：烈火", type:"other", base:5260, step:480},
    {id:1041012, name:"冲刺攻击：炽火", type:"dash", base:6830, step:630, element:"physical"},
    {id:1041013, name:"冲刺攻击：火力镇压", type:"dash", base:7880, step:720},
    {id:1041015, name:"闪避反击：逆火", type:"dodge", base:26200, step:2390},
    {id:1041019, name:"快速支援：火力掩护", type:"other", base:12080, step:1100},
    {id:1041023, name:"支援突击：重燃", type:"other", base:38370, step:3490}
  ]
};

const zhuyuan={
  name:"朱鸢", role:"强攻 · 以太", kind:"attack", element:205, stat:919, crit:0.05, cd:0.788, ultimate:"歼灭模式MAX", agentId:1241, slug:"zhu-yuan", chainId:1241022, ultId:1241023, weaponId:14124, weaponSlug:"riot-suppressor-mark-vi",
  weaponAtk:713, weaponCd:0.48,
  portrait:"https://i.gachabase.net/zcHfjp63-hf37xmX4ZLUknJbr5iSlD-60olZwVvmi3k/q:50/f:webp/plain/zzz/assets/047944013ad775f2f13eb367e4ba4f2c.png",
  engines:[['1',"防暴者Ⅵ型"]],
  skills:[
    {id:1241010, name:"普通攻击：请勿抵抗（一段（以太））", type:"basic", base:13590, step:1240, defaultCount:2},
    {id:1241011, name:"普通攻击：请勿抵抗（二段（以太））", type:"basic", base:13590, step:1240, defaultCount:2},
    {id:1241012, name:"普通攻击：请勿抵抗（三段（以太））", type:"basic", base:40770, step:3710, defaultCount:2},
    {id:1241016, name:"强化特殊技：全弹连射", type:"ex", base:58740, step:5340, defaultCount:2},
    {id:1241022, name:"连携技：歼灭模式", type:"chain", base:58750, step:5350, defaultCount:1},
    {id:1241023, name:"终结技：歼灭模式MAX", type:"ult", base:197760, step:17980, defaultCount:1},
    {id:1241001, name:"普通攻击：不许动！（一段）", type:"basic", base:4310, step:400, element:"physical"},
    {id:1241002, name:"普通攻击：不许动！（二段）", type:"basic", base:12640, step:1150},
    {id:1241003, name:"普通攻击：不许动！（三段）", type:"basic", base:13730, step:1250, element:"physical"},
    {id:1241004, name:"普通攻击：不许动！（四段）（以太部分）", type:"basic", base:9060, step:828},
    {id:12410048, name:"普通攻击：不许动！（四段）（物理部分）", type:"basic", base:6040, step:552, element:"physical", linkedTo:1241004, automatic:true},
    {id:1241005, name:"普通攻击：不许动！（五段）（以太部分）", type:"basic", base:10543, step:962},
    {id:12410058, name:"普通攻击：不许动！（五段）（物理部分）", type:"basic", base:5677, step:518, element:"physical", linkedTo:1241005, automatic:true},
    {id:1241006, name:"普通攻击：请勿抵抗（一段（物理））", type:"basic", base:5370, step:490, element:"physical"},
    {id:1241007, name:"普通攻击：请勿抵抗（二段（物理））", type:"basic", base:5370, step:490, element:"physical"},
    {id:1241008, name:"普通攻击：请勿抵抗（三段（物理））", type:"basic", base:16090, step:1470, element:"physical"},
    {id:1241015, name:"特殊技：鹿弹射击", type:"other", base:1840, step:170},
    {id:1241017, name:"冲刺攻击：火力奇袭", type:"dash", base:5510, step:510},
    {id:1241018, name:"冲刺攻击：火力压制（物理）", type:"dash", base:5370, step:490, element:"physical"},
    {id:1241019, name:"冲刺攻击：火力压制（以太）", type:"dash", base:13590, step:1240},
    {id:1241020, name:"闪避反击：火力震爆", type:"dodge", base:17680, step:1610},
    {id:1241024, name:"快速支援：掩护射击", type:"other", base:5140, step:470},
    {id:1241025, name:"支援突击：自卫还击（以太部分）", type:"other", base:17790, step:1620},
    {id:12410258, name:"支援突击：自卫还击（物理部分）", type:"other", base:17790, step:1620, element:"physical", linkedTo:1241025, automatic:true},
    {id:1241027, name:"六影 · 以太余温（四枚）", type:"ex", base:88000, step:0, automatic:true}
  ]
};

const ellen={
  name:"艾莲", role:"强攻 · 冰", kind:"attack", element:202, stat:938, crit:0.194, cd:0.5, ultimate:"永冬狂宴", agentId:1191, slug:"ellen", chainId:1191016, ultId:1191017, weaponId:14119, weaponSlug:"deep-sea-visitor",
  weaponAtk:713, weaponCrit:0.24,
  portrait:"https://i.gachabase.net/HEwFkNYywaQzlSXJyedHlAQSMcFFGG2785NQM8GKjbI/q:50/f:webp/plain/zzz/assets/9b50c3cc0f91f0d08740d78849628234.png",
  engines:[['1',"深海访客"]],
  skills:[
    {id:1191004, name:"普通攻击：急冻修剪法（一段）", type:"basic", base:9960, step:910, defaultCount:2},
    {id:1191005, name:"普通攻击：急冻修剪法（二段）", type:"basic", base:18400, step:1680, defaultCount:2},
    {id:1191006, name:"普通攻击：急冻修剪法（三段）", type:"basic", base:49620, step:4520, defaultCount:2},
    {id:1191011, name:"强化特殊技：横扫", type:"ex", base:37720, step:3430, defaultCount:1},
    {id:1191012, name:"强化特殊技：鲨卷风", type:"ex", base:55330, step:5030, defaultCount:1},
    {id:1191007, name:"冲刺攻击：冰渊潜袭（回旋斩击）", type:"dash", base:6230, step:570, defaultCount:1},
    {id:1191009, name:"冲刺攻击：冰渊潜袭（蓄力剪击）", type:"dash", base:15820, step:1440, defaultCount:1},
    {id:1191016, name:"连携技：雪崩", type:"chain", base:79460, step:7230, defaultCount:1},
    {id:1191017, name:"终结技：永冬狂宴", type:"ult", base:189080, step:17190, defaultCount:1},
    {id:1191001, name:"普通攻击：利齿修剪法（一段）", type:"basic", base:4880, step:450, element:"physical"},
    {id:1191002, name:"普通攻击：利齿修剪法（二段）", type:"basic", base:11110, step:1010, element:"physical"},
    {id:1191003, name:"普通攻击：利齿修剪法（三段）", type:"basic", base:29730, step:2710, element:"physical"},
    {id:1191029, name:"普通攻击：冰刃浪（一段）", type:"basic", base:23020, step:2100, minPotential:1},
    {id:1191030, name:"普通攻击：冰刃浪（二段）", type:"basic", base:14680, step:1340, minPotential:1},
    {id:1191027, name:"普通攻击：霜锋（对小体型敌人）", type:"basic", base:18120, step:1650, minPotential:1},
    {id:1191028, name:"普通攻击：霜锋（对中体型敌人）", type:"basic", base:22020, step:2010, minPotential:1},
    {id:11910281, name:"普通攻击：霜锋（对大体型敌人）", type:"basic", base:25920, step:2370, minPotential:1},
    {id:1191010, name:"特殊技：摆尾", type:"other", base:5050, step:460},
    {id:1191008, name:"冲刺攻击：冰渊潜袭（快速剪击）", type:"dash", base:12760, step:1160},
    {id:1191013, name:"冲刺攻击：骇浪", type:"dash", base:7700, step:700, element:"physical"},
    {id:1191014, name:"冲刺攻击：寒潮", type:"dash", base:14570, step:1330},
    {id:1191015, name:"闪避反击：暗礁", type:"dodge", base:15260, step:1390},
    {id:1191018, name:"快速支援：护卫鲛", type:"other", base:12110, step:1110},
    {id:1191022, name:"支援突击：巡洋鲨", type:"other", base:43790, step:3990}
  ]
};

const harumasa={
  name:"悠真", role:"强攻 · 电", kind:"attack", element:203, stat:915, crit:0.194, cd:0.5, ultimate:"残心", agentId:1201, slug:"harumasa", chainId:1201013, ultId:1201014, weaponId:14120, weaponSlug:"zanshin-herb-case",
  weaponAtk:713, weaponCd:0.48,
  portrait:"https://i.gachabase.net/mses99lnbMUacDqpur-IBl8j7TWJiT5bBVRA7Yd7Sks/q:50/f:webp/plain/zzz/assets/a1979673f097e96eec0b2f20eb513ef6.png",
  engines:[['1',"残心青囊"]],
  skills:[
    {id:1201007, name:"普通攻击：落羽", type:"basic", base:10540, step:960, defaultCount:2},
    {id:1201008, name:"普通攻击：甲乙矢", type:"basic", base:1590, step:150, defaultCount:12},
    {id:1201010, name:"强化特殊技：地网", type:"ex", base:44930, step:4090, defaultCount:1},
    {id:1201020, name:"冲刺攻击：飞弦·斩（一段）", type:"dash", base:16230, step:1480, defaultCount:2},
    {id:1201021, name:"冲刺攻击：飞弦·斩（二段）", type:"dash", base:16660, step:1520, defaultCount:2},
    {id:1201022, name:"冲刺攻击：飞弦·斩（三段）", type:"dash", base:18960, step:1730, defaultCount:2},
    {id:1201013, name:"连携技：会·离", type:"chain", base:51760, step:4710, defaultCount:1},
    {id:1201014, name:"终结技：残心", type:"ult", base:195390, step:17770, defaultCount:1},
    {id:1201001, name:"普通攻击：穿云（一段）", type:"basic", base:4240, step:390, element:"physical"},
    {id:1201002, name:"普通攻击：穿云（二段）", type:"basic", base:3980, step:370, element:"physical"},
    {id:1201003, name:"普通攻击：穿云（三段）", type:"basic", base:7090, step:650, element:"physical"},
    {id:1201004, name:"普通攻击：穿云（四段）", type:"basic", base:9010, step:820},
    {id:1201005, name:"普通攻击：穿云（五段）", type:"basic", base:13290, step:1210},
    {id:1201006, name:"普通攻击：穿云·移形", type:"basic", base:6950, step:640, element:"physical"},
    {id:1201009, name:"特殊技：天罗", type:"other", base:5230, step:480},
    {id:1201023, name:"强化特殊技：地网·巡弋", type:"ex", base:51310, step:4670, minPotential:1},
    {id:1201011, name:"冲刺攻击：飞弦", type:"dash", base:8070, step:740, element:"physical"},
    {id:1201012, name:"闪避反击：藏锋", type:"dodge", base:21960, step:2000},
    {id:1201025, name:"逐雷（额外）", type:"other", base:4120, step:380, minPotential:1, automatic:true},
    {id:1201024, name:"残心·散华", type:"ult", base:23650, step:2150, minPotential:1, automatic:true},
    {id:1201015, name:"快速支援：穿弦", type:"other", base:8430, step:770},
    {id:1201019, name:"支援突击：构身·斩", type:"other", base:30710, step:2800},
    {id:1201096, name:"六影 · 电磁爆炸", type:"other", base:150000, step:0, automatic:true}
  ]
};

const billy={
  name:"比利", role:"强攻 · 物理", kind:"attack", element:200, stat:787, crit:0.194, cd:0.5, ultimate:"星徽在此闪耀", agentId:1081, slug:"billy", chainId:1081018, ultId:1081019, weaponId:13108, weaponSlug:"starlight-engine-replica",
  weaponAtk:624, weaponAtkPct:0.25,
  portrait:"https://i.gachabase.net/KZhIz6_lp2qROzXXI4tM16F8_0XQS2UZM8SZ1yvPqtU/q:50/f:webp/plain/zzz/assets/3ecb79f698995c3ece15fe8d1675d6c0.png",
  engines:[['1',"仿制星徽引擎"]],
  skills:[
    {id:1081004, name:"普通攻击：火力全开（蹲姿开火）", type:"basic", base:6180, step:570, defaultCount:1},
    {id:1081007, name:"普通攻击：火力全开（蹲姿子弹）", type:"basic", base:1270, step:120, defaultCount:8},
    {id:1081008, name:"普通攻击：火力全开（终结射击）", type:"basic", base:4950, step:450, defaultCount:1},
    {id:1081013, name:"强化特殊技：清场时间", type:"ex", base:54380, step:4950, defaultCount:2},
    {id:1081017, name:"闪避反击：公平决斗", type:"dodge", base:22140, step:2020, defaultCount:1},
    {id:1081018, name:"连携技：星徽荣耀幻影", type:"chain", base:73520, step:6690, defaultCount:2},
    {id:1081019, name:"终结技：星徽在此闪耀", type:"ult", base:159770, step:14530, defaultCount:1},
    {id:1081002, name:"普通攻击：火力全开（站姿开火）", type:"basic", base:6800, step:620},
    {id:1081003, name:"普通攻击：火力全开（站姿子弹）", type:"basic", base:760, step:70},
    {id:10810041, name:"普通攻击：火力全开（翻滚射击）", type:"basic", base:6180, step:570},
    {id:1081010, name:"特殊技：乖乖站好（一段）", type:"other", base:2420, step:220},
    {id:1081011, name:"特殊技：乖乖站好（二段）", type:"other", base:5170, step:470},
    {id:1081012, name:"特殊技：乖乖站好（三段）", type:"other", base:5010, step:460},
    {id:1081016, name:"冲刺攻击：星-徽-制-裁（周身射击）", type:"dash", base:6300, step:580},
    {id:1081014, name:"冲刺攻击：星-徽-制-裁（直线射击）", type:"dash", base:3900, step:360},
    {id:1081020, name:"快速支援：星徽-同伴之力", type:"other", base:9340, step:850},
    {id:1081021, name:"支援突击：要害射击", type:"other", base:38880, step:3540}
  ]
};

const classicLeads={corin,manato,hugo,evelyn,soldier11,zhuyuan,ellen,harumasa,billy};

const classicTeammates={
  qingyi:{name:"青衣", role:"击破 · 电", portrait:"https://i.gachabase.net/sVeh8XHO9xo4mgSQlSCSpEAPO1o8MJv7qLT9FfKiwW8/q:50/f:webp/plain/zzz/assets/1ff4b563898be891e3b7a3902618853d.png", engines:[['1',"玉壶青冰"],['0','其他音擎']]},
  caesar:{name:"凯撒", role:"防护 · 物理", portrait:"https://i.gachabase.net/YYjRbkW4CNBEznNWaQN5-RUACMUZKpCqvJRmzqUuBBE/q:50/f:webp/plain/zzz/assets/64c690c95deaf0b2ae87c41991e5a5ec.png", engines:[['1',"奔袭獠牙"],['0','其他音擎']]}
};
