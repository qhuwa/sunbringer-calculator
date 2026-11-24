// GachaBase beta agent 1021 and W-Engine 14102. Coefficients use 1/10000 units.
const nekomata={name:'猫又',role:'强攻 · 物理',element:200,ultimate:'刃爪强袭',
  portrait:'https://i.gachabase.net/cksCoaalFoihp6Z2vOTVkEiUOXb7yjpfB6YyNW2pX6I/q:50/f:webp/plain/zzz/assets/d90a2e97c1d53f49ba2aa78958cb6bc5.png',
  engines:[['1','钢铁肉垫']]};

const nekomataSkills=[
  {name:'终结技：刃爪强袭',type:'ult',base:157110,step:14290,defaultCount:1},
  {name:'强化特殊技：超～凶奇袭！',type:'ex',base:53970,step:4910,defaultCount:4},
  {name:'强化普攻：赤色之刃',repeat:true,base:7180,step:660,defaultCount:4},
  {name:'连携技：刃爪挥击',type:'chain',base:53620,step:4880,defaultCount:2},
  {name:'支援突击：迅影',base:30040,step:2740,defaultCount:2},
  {name:'闪避反击：绒爪穿刺',type:'counter',awakened:true,base:126390,step:11490,defaultCount:2},
  {name:'普通攻击：猫猫爪刺（一段）',base:5520,step:510},
  {name:'普通攻击：猫猫爪刺（二段）',base:6260,step:570},
  {name:'普通攻击：猫猫爪刺（三段）',base:7270,step:670},
  {name:'普通攻击：猫猫爪刺（四段）',base:17020,step:1550},
  {name:'普通攻击：猫猫爪刺（五段）',repeat:true,base:12360,step:1130},
  {name:'特殊技：奇袭',base:4730,step:430},
  {name:'冲刺攻击：你在看哪边？',base:3510,step:320},
  {name:'闪避反击：虚影双刺',type:'counter',base:22790,step:2080},
  {name:'快速支援：借用猫爪',base:9450,step:860},
  {name:'闪避：打不着喵～',base:0,step:0},
  {name:'闪避：尾巴失踪术',base:0,step:0},
  {name:'招架支援：应激防御',base:0,step:0},
  {name:'核心被动：超凶爪印',type:'paw',base:3000,step:0},
  {name:'千夏：猫的凝视（猫又触发）',type:'gaze',base:30000,step:0}
];

const isNekomata=c=>c.main==='nekomata';
const atkRoll=.03;
const nekoFour={fanged:'獠牙重金属',woodpecker:'啄木鸟电音',hormone:'激素朋克'};
const nekoTwo={...nekoFour,puffer:'河豚电音',astral:'静听嘉音'};
const nekoInitial={set:'fanged',two:'woodpecker',main4:'crit',main5:'auto',main6:'atk'};
const nekoBack=c=>c.nekoBack || (c.nekoPotential>=1 && c.nekoProwl) || (c.stun && c.w>=1);
const nekoExtra=c=>['rina','astra','sunna','dialyn'].some(id=>teammateSlot(c,id));

function nekomataRotation(c,stunFinisher){
  const ju=teammateSlot(c,'jufufu'), sunna=teammateSlot(c,'sunna');
  const [chainFinal,ultFinal]=juPotential[ju?c.potential:0]??juPotential[0];
  const awake=c.nekoPotential>=1;
  // Each input counts a cast. Repeated slashes are part of the same cast.
  const repetitions=awake?(c.stun?3:1):1+2/3;
  return nekomataSkills.map((s,i)=>{
    const chain=s.type==='chain', ultimate=s.type==='ult';
    const gaze=s.type==='gaze';
    const available=(!s.awakened || awake) && (s.type!=='paw' || (awake && c.nekoProwl)) && (!gaze || sunna);
    const fallback=!awake && s.awakened;
    const skill=fallback?nekomataSkills.find(s=>s.name.includes('虚影双刺')):s;
    const name=fallback?'闪避反击：虚影双刺（轴内）':s.name;
    const count=available || fallback?c.counts[i]:0;
    const mult=(skill.base+(upgradeLevel(c.w)-1)*skill.step+(gaze && c[sunna]>=2?20000:0))/10000*(s.repeat?repetitions:1);
    const categorySources=[
      ['橘福福 · 虎啸',ju && chain?juChainBonus:ju && ultimate?juUltimateBonus:0],
      ['猫又 · 利爪超载',nekoExtra(c) && (s.type==='ex' || (awake && s.type==='counter'))?.35*c.nekoExtraStacks:0],
      ['危局 · 失衡期间招式增伤',c.stun && (chain||ultimate)?stunFinisher:0],
      ['千夏 · 六影',gaze && c[sunna]>=6?.50:0]
    ];
    const finalSources=[['橘福福 · 潜能觉醒「侠肝义胆」',chain?chainFinal:ultimate?ultFinal:0]];
    const category=sumBonuses(categorySources), final=1+sumBonuses(finalSources);
    return {name,count,available:!!(available || fallback),natural:{mult,category,final,categorySources,finalSources},mult:skillOverride(c,i,'coefficient',mult),
      category:skillOverride(c,i,'skill',category),final:skillOverride(c,i,'final',final),
      source:'other',markRate:0,markWeight:0,settle:false,ultimate};
  });
}

function nekomataStats(c,buffs,mains,custom){
  const fourth=mains[3], fifth=mains[4];
  const has=set=>c.set===set || c.two===set;
  const statSources={
    baseAtk:[['猫又基础攻击',835],['核心技强化',75],['钢铁肉垫基础攻击',684]],
    panelAtkPct:[...mains.flatMap((stat,i)=>stat==='atk'?[[(i+1)+' 号位主属性',.30]]:[]),
      ['激素朋克两件',has('hormone')?.10:0],['静听嘉音两件',has('astral')?.10:0]],
    panelAtkFlat:[['二号位主属性',316]],
    atkPctAdjustment:[['自定义攻击力百分比',(c.customAtkPct||0)/100]],
    atkFlatAdjustment:[['自定义固定攻击力',c.customFlatAtk||0]],
    ownCombatAtkPct:[['啄木鸟电音四件 · '+c.nekoWoodStacks+' 层',c.set==='woodpecker'?.09*c.nekoWoodStacks:0],
      ['激素朋克四件',c.set==='hormone' && c.nekoDiscProc?.25:0]],
    panelRate:[['猫又基础暴击率',.05],['核心技强化',.144],['钢铁肉垫副属性',.24],
      ['四号位主属性',fourth==='crit'?.24:0],['啄木鸟电音两件',has('woodpecker')?.08:0]],
    ownCombatRate:[['猫又四影 · '+c.nekoM4Stacks+' 层',c.w>=4?.07*c.nekoM4Stacks:0]],
    rateAdjustment:[['自定义暴击率',custom.crit]],
    panelCd:[['基础暴伤',.50],['四号位主属性',fourth==='cd'?.48:0]],
    ownCombatCd:[['猫又 · 潜能觉醒「夜行习性」',c.nekoProwl?[0,0,.20,.30,.40,.50,.60][c.nekoPotential]:0],
      ['猫又六影 · '+c.nekoM6Stacks+' 层',c.w>=6?.18*c.nekoM6Stacks:0]],
    cdAdjustment:[['自定义普通暴伤',(c.customNormalCd||0)/100]]
  };
  const baseAtk=sumBonuses(statSources.baseAtk);
  const initialBase=baseAtk*(1+sumBonuses(statSources.panelAtkPct)+sumBonuses(statSources.atkPctAdjustment))+
    sumBonuses(statSources.panelAtkFlat)+sumBonuses(statSources.atkFlatAdjustment);
  const attackPct=buffs.teamAtkPct+sumBonuses(statSources.ownCombatAtkPct);
  const rate=sumBonuses(statSources.panelRate)+sumBonuses(statSources.ownCombatRate)+sumBonuses(statSources.rateAdjustment);
  const critDmg=sumBonuses(statSources.panelCd)+sumBonuses(statSources.ownCombatCd)+sumBonuses(statSources.cdAdjustment)+buffs.normalCritDmg;
  return {baseAtk,initialBase,attackPct,rate,critDmg,statSources,bonus:1+buffs.general+(fifth==='physical'?.30:0)};
}
