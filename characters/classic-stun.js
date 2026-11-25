// GachaBase skill coefficients use units of 1/10000.
const qingyi={
  ...classicTeammates.qingyi,kind:'attack',element:203,stat:758,crit:.05,cd:.50,impact:136,
  ultimate:'八声甘州',agentId:1251,slug:'qingyi',weaponId:14125,weaponSlug:'ice-jade-teapot',
  ultId:1251015,chainId:1251014,
  engines:[['1','玉壶青冰'],['14110','燃狱齿轮']],
  skills:[
    {id:1251004,name:'普通攻击：一煞 · 三段连打',type:'basic',base:1760,step:160,defaultCount:10},
    {id:1251006,name:'普通攻击：一煞 · 强化四段',type:'basic',base:23440,step:2140,defaultCount:2},
    {id:1251008,name:'普通攻击：醉花月云转 · 完整突进',type:'basic',base:44870,step:4080,defaultCount:2},
    {id:1251009,name:'普通攻击：醉花月云转 · 终结一击',type:'basic',base:39440,step:3590,defaultCount:2},
    {id:1251011,name:'强化特殊技：月上海棠',type:'ex',base:60280,step:5490,defaultCount:2},
    {id:1251014,name:'连携技：太平令',type:'chain',base:64790,step:5890,defaultCount:1},
    {id:1251015,name:'终结技：八声甘州',type:'ult',base:167070,step:15190,defaultCount:1},
    {id:1251001,name:'普通攻击：一煞 · 一段',type:'basic',element:'physical',base:4720,step:430},
    {id:1251002,name:'普通攻击：一煞 · 一段派生',type:'basic',element:'physical',base:11030,step:1010},
    {id:1251003,name:'普通攻击：一煞 · 二段',type:'basic',element:'physical',base:12210,step:1110},
    {id:1251005,name:'普通攻击：一煞 · 四段',type:'basic',base:10640,step:970},
    {id:1251007,name:'普通攻击：醉花云',type:'basic',base:8560,step:780},
    {id:1251010,name:'特殊技：昼锦堂',type:'special',base:6240,step:570},
    {id:1251012,name:'冲刺攻击：入破',type:'dash',element:'physical',base:4950,step:450},
    {id:1251013,name:'闪避反击：意不尽',type:'dodge',base:28400,step:2590},
    {id:1251016,name:'快速支援：风入松',type:'assist',base:13390,step:1220},
    {id:1251020,name:'支援突击：清江引',type:'assist',base:37640,step:3430}
  ]
};

const lycaon={
  ...anomalySupports.lycaon,kind:'attack',element:202,stat:728,crit:.05,cd:.50,weaponAtk:684,
  ultimate:'不辱使命',weaponSlug:'the-restrained',ultId:1141021,chainId:1141020,
  skills:[
    {id:1141002,name:'普通攻击：狩月舞步 · 一段蓄力',type:'basic',base:3710,step:340,defaultCount:2},
    {id:1141004,name:'普通攻击：狩月舞步 · 二段蓄力',type:'basic',base:5640,step:520,defaultCount:2},
    {id:1141006,name:'普通攻击：狩月舞步 · 三段蓄力',type:'basic',base:9950,step:910,defaultCount:2},
    {id:1141008,name:'普通攻击：狩月舞步 · 四段蓄力',type:'basic',base:21090,step:1920,defaultCount:2},
    {id:1141011,name:'普通攻击：狩月舞步 · 五段二级蓄力',type:'basic',base:35570,step:3240,defaultCount:2},
    {id:1141017,name:'强化特殊技：狂猎时刻 · 蓄力',type:'ex',base:78950,step:7190,defaultCount:2},
    {id:1141027,name:'支援突击：复仇反扑·冰舞',type:'assist',base:41070,step:3740,defaultCount:1},
    {id:1141020,name:'连携技：遵命',type:'chain',base:63780,step:5800,defaultCount:1},
    {id:1141021,name:'终结技：不辱使命',type:'ult',base:169410,step:15410,defaultCount:1},
    {id:1141001,name:'普通攻击：狩月舞步 · 一段',type:'basic',element:'physical',base:2920,step:270},
    {id:1141003,name:'普通攻击：狩月舞步 · 二段',type:'basic',element:'physical',base:3490,step:320},
    {id:1141005,name:'普通攻击：狩月舞步 · 三段',type:'basic',element:'physical',base:5840,step:540},
    {id:1141007,name:'普通攻击：狩月舞步 · 四段',type:'basic',element:'physical',base:15200,step:1390},
    {id:1141009,name:'普通攻击：狩月舞步 · 五段',type:'basic',element:'physical',base:18070,step:1650},
    {id:1141010,name:'普通攻击：狩月舞步 · 五段一级蓄力',type:'basic',base:27760,step:2530},
    {id:1141013,name:'特殊技：追猎时刻',type:'special',base:7710,step:710},
    {id:1141014,name:'特殊技：追猎时刻 · 蓄力',type:'special',base:13310,step:1220},
    {id:1141016,name:'强化特殊技：狂猎时刻',type:'ex',base:53430,step:4870},
    {id:1141018,name:'冲刺攻击：保持清洁',type:'dash',element:'physical',base:4730,step:430},
    {id:1141019,name:'闪避反击：礼仪教导',type:'dodge',base:18700,step:1700},
    {id:1141022,name:'快速支援：狼群',type:'assist',base:6310,step:580},
    {id:1141026,name:'支援突击：复仇反扑',type:'assist',base:28830,step:2630}
  ]
};

const classicStunControls={
  qingyi:[['voltage','醉花月云转 · 闪络电压 %',75,100,100],['subjugation','羁服层数',0,20,20],
    ['tea','玉壶青冰 · 茶劲层数',0,30,30],['m1','一影减防与对目标暴击覆盖'],['m6','六影全抗降低覆盖']],
  lycaon:[['awakened','潜能觉醒（围猎、冰舞与非冰增伤）'],['core','金属狼足减抗／增伤覆盖'],
    ['m6','六影冷酷猎手层数',0,5,5],['restraint','拘缚者 · 普攻增伤层数',0,5,5],['frozen','冻结／碎冰后极地重金属覆盖',false]]
};

const stunLeadEngine=(c,id)=>Object.hasOwn(stunLeads,c.main) && (leadSignature(c)?stunLeads[c.main].weaponId===id:c.we===id);
const teaStacks=c=>c.expanded?.tea??30;
const qingyiFirst=c=>c.main==='qingyi' && c.w>=1 && expandedOption(c,'voltage')===100 && expandedOption(c,'m1');
const lycaonLeadAwake=c=>c.main==='lycaon' && expandedOption(c,'awakened');
const lycaonLeadCore=c=>c.main==='lycaon' && expandedOption(c,'core');

function qingyiImpact(c,mains){
  const rank=weaponRankIndex(c.wr);
  const weapon=leadSignature(c)?.18:engineStat(alternateLeadWeapon(c),'impact');
  const tea=stunLeadEngine(c,14125)?[.007,.0088,.0105,.0122,.014][rank]*teaStacks(c):0;
  const gears=c.we===14110?(c.weaponStacks??2)*(.10+.025*rank):0;
  return qingyi.impact*(1+weapon+(mains[5]==='impact'?.18:0)+(c.two==='shockstar'?.06:0)+tea+gears);
}

function classicStunRotation(c,skill,category){
  const {id,type}=skill, basic=type==='basic';
  const option=key=>expandedOption(c,key);
  if(c.main==='lycaon' && c.set==='polar' && (basic || type==='dash')){
    category.push(['极地重金属四件',option('frozen')?.40:.20]);
  }
  const empowered=id===1251008 || id===1251009;
  if(empowered)category.push(['青衣 · 闪络电压',(option('voltage')-75)/100]);
  if(id===qingyi.chainId)category.push(['青衣 · 太平令（羁服）',option('subjugation')*.03]);
  return {available:id!==1141027 || lycaonLeadAwake(c),critDamageBonus:empowered && c.w>=6?1:0};
}
