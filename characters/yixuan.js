// GachaBase agent 1371 and W-Engine 14137, revision D20713015.
const yixuan={name:'仪玄',role:'命破 · 玄墨',element:205,ultimate:'符法千重',
  portrait:'https://i.gachabase.net/xWHq3TyMM3MfW3RFBN5wFM1SxaCvXL4UNbBQkjWw76k/q:50/f:webp/plain/zzz/assets/36a78e2f51878ad77b54ca973b5a7a18.png',
  engines:[['1','青溟笼舍']]};
const isYixuan=c=>c.main==='yixuan';
const yiFour={yunkui:'云岿如我',woodpecker:'啄木鸟电音',branch:'折枝剑歌'};
const yiTwo={...yiFour,snowbunny:'雪兔梦游仙境',chaoticMetal:'混沌重金属',hormone:'激素朋克',astral:'静听嘉音'};
const yiInitial={set:'yunkui',two:'branch',main4:'auto',main5:'auto',main6:'hp'};
const yiDiscStats={hp:0,crit:1,cd:2,atk:3};
const yiHpRoll=.03;
const yiHpConversion=.10;
const yiAtkConversion=.30;

// Coefficients are in 1/10000 units. Full-channel hits exclude the linked finishing move.
const yiSkills=[
  {name:'连携技：玄墨迅击',type:'chain',base:53310,step:4850,defaultCount:1},
  {name:'终结技：青溟云影',type:'ult',base:185340,step:16850,defaultCount:1},
  {name:'终结技：符法千重',type:'adrenalineUlt',base:146620,step:13330,defaultCount:1},
  {name:'普通攻击：玄墨极阵',type:'array',base:30520,step:2780,defaultCount:1},
  {name:'普通攻击：青溟震击',type:'array',base:11060,step:1010,defaultCount:1},
  {name:'强化特殊技：凝云术',type:'charge',base:67180,step:6110,defaultCount:1},
  {name:'强化特殊技：墨烬影消',type:'charge',base:23430,step:2130,defaultCount:1},
  {name:'强化特殊技：墨痕化形',type:'ex',base:30030,step:2730,defaultCount:1},
  {name:'强化特殊技：墨痕化形（蓄力追加）',type:'ex',base:14960,step:1360,defaultCount:1},
  {name:'强化特殊技：霄云迅击-破',type:'ex',base:37060,step:3370,defaultCount:1},
  {name:'强化特殊技：青溟震击-破',type:'ex',base:42640,step:3880,defaultCount:1},
  {name:'二影强化特殊技：符法千重-破',type:'ex',base:120000,step:0,automatic:true},
  {name:'普通攻击：霄云劲（一段）',base:4580,step:420},
  {name:'普通攻击：霄云劲（二段）',base:6550,step:600},
  {name:'普通攻击：霄云劲（三段）',base:8710,step:800},
  {name:'普通攻击：霄云劲（四段）',base:10480,step:960},
  {name:'普通攻击：霄云劲（五段）',base:11370,step:1040},
  {name:'普通攻击：墨影凝云',base:23470,step:2140},
  {name:'特殊技：烬影诀',base:5210,step:480},
  {name:'冲刺攻击：凌云破',base:4990,step:460},
  {name:'闪避反击：除祟一击',base:21960,step:2000},
  {name:'快速支援：流云影身',base:10120,step:920},
  {name:'招架支援：清霄劲',base:0,step:0},
  {name:'支援突击：霄云迅击',type:'assist',base:29700,step:2700},
  {name:'额外能力：极限支援换下落雷',type:'assistLightning',base:22500,step:0},
  {name:'一影落雷',type:'shadowLightning',base:5000,step:0}
];
const yiExtra=c=>[...Object.keys(stunNames),...Object.keys(supportNames),...Object.keys(defenseNames)].some(id=>teammateSlot(c,id));
const yiSet=(c,set)=>c.set===set || c.two===set;
const yiWeaponRank=c=>c.wr-1;
const yiWeaponStacks=c=>c.yiWeaponStacks??2;
const yiSetStacks=c=>c.set==='yunkui'?(c.yiSetStacks??3):0;
const yiFocused=c=>(c.yiFocused??true) && yiExtra(c);

function yiRotation(c,stunFinisher){
  const ju=teammateSlot(c,'jufufu');
  const [chainFinal,ultFinal]=juPotential[ju?c.potential:0]??juPotential[0];
  const countOf=type=>c.counts[yiSkills.findIndex(s=>s.type===type)]??0;
  const freeUltimate=c.w>=6 && countOf('ult')>0?1:0;
  const technicalUltimate=countOf('adrenalineUlt')+freeUltimate;
  const chargeCasts=countOf('charge');
  const meditation=c.w>=4 && chargeCasts?Math.min(2,countOf('ult')+technicalUltimate):0;
  return yiSkills.map((s,i)=>{
    const chain=s.type==='chain', ultimate=s.type==='ult'||s.type==='adrenalineUlt';
    const charge=s.type==='charge';
    const ex=s.type==='ex'||charge;
    const coreBoost=ex||ultimate||chain||s.type==='array'||s.type==='assist';
    const available=s.type==='shadowLightning'?c.w>=1:s.type==='assistLightning'?yiExtra(c):true;
    const count=!available?0:s.automatic?(c.w>=2?technicalUltimate:0):s.type==='adrenalineUlt'?technicalUltimate:c.counts[i];
    const mult=(s.base+(upgradeLevel(c.w)-1)*s.step)/10000;
    const categorySources=[
      ['仪玄 · 术法宗师',coreBoost?.60:0],
      ['仪玄 · 玄墨暗涌',charge && c.stun && yiExtra(c)?.30:0],
      ['仪玄 · 四影静心（本行平均）',charge && c.counts[i]?.30*meditation/c.counts[i]:0],
      ['青溟笼舍 · 特殊技／终结技以太贯穿伤害',(ex||ultimate)?yiWeaponStacks(c)*(.10+.015*yiWeaponRank(c)):0],
      ['橘福福 · 虎啸',ju?(chain?juChainBonus:ultimate?juUltimateBonus:0):0],
      ['危局招式增伤',c.stun && (chain||ultimate)?stunFinisher:0]
    ];
    const finalSources=[['橘福福 · 侠肝义胆',chain?chainFinal:ultimate?ultFinal:0]];
    const category=sumBonuses(categorySources), final=1+sumBonuses(finalSources);
    const extraRes=c.w>=2 && (ex||ultimate)?.15:0;
    return {name:s.name,count,available,extraRes,extraM6:s.type==='adrenalineUlt'?freeUltimate:0,
      ultimate:s.type==='adrenalineUlt',natural:{mult,category,final,categorySources,finalSources},
      mult:skillOverride(c,i,'coefficient',mult),category:skillOverride(c,i,'skill',category),final:skillOverride(c,i,'final',final),
      source:'other',markRate:0,markWeight:0,settle:false};
  });
}

function yiStats(c,buffs,mains,custom){
  const fourth=mains[3], fifth=mains[4];
  const statSources={
    baseHp:[['仪玄（Lv.60，核心技 F）',8373]],
    panelHpPct:[['青溟笼舍',.30],['生命值主属性',.30*mains.filter(stat=>stat==='hp').length],
      ['云岿如我两件',yiSet(c,'yunkui')?.10:0],['雪兔梦游仙境两件',yiSet(c,'snowbunny')?.10:0],
      ['手动生命值百分比',(c.customHpPct??0)/100]],
    panelHpFlat:[['一号位主属性',2200],['手动固定生命值',c.customFlatHp??0]],
    baseAtk:[['仪玄（Lv.60，核心技 F）',872],['青溟笼舍（Lv.60）',743]],
    panelAtkPct:[['攻击力主属性',.30*mains.filter(stat=>stat==='atk').length],['激素朋克两件',yiSet(c,'hormone')?.10:0],
      ['静听嘉音两件',yiSet(c,'astral')?.10:0],['手动攻击力百分比',(c.customAtkPct??0)/100]],
    panelAtkFlat:[['二号位主属性',316],['手动固定攻击力',c.customFlatAtk??0]],
    panelRate:[['基础暴击率',.05],['核心技强化',.144],['青溟笼舍',.20+.03*yiWeaponRank(c)],
      ['四号位主属性',fourth==='crit'?.24:0],['啄木鸟电音两件',yiSet(c,'woodpecker')?.08:0]],
    ownCombatRate:[['云岿如我四件',.04*yiSetStacks(c)],['一影清灵道心',c.w>=1?.10:0],
      ['折枝剑歌四件（冻结或碎冰）',c.set==='branch' && c.yiFrozen?.12:0]],
    rateAdjustment:[['手动暴击率',custom.crit]],
    panelCd:[['基础暴击伤害',.50],['四号位主属性',fourth==='cd'?.48:0],['折枝剑歌两件',yiSet(c,'branch')?.16:0]],
    ownCombatCd:[['玄墨暗涌 · 凝神',yiFocused(c)?.40:0]],
    cdAdjustment:[['手动暴击伤害',(c.customNormalCd??0)/100]],
    ownElement:[['五号位主属性',fifth==='ether'?.30:0],['青溟笼舍 · 以太伤害',yiWeaponStacks(c)*(.08+.012*yiWeaponRank(c))],
      ['混沌重金属两件',yiSet(c,'chaoticMetal')?.10:0]],
    ownSheer:[['云岿如我四件满层',yiSetStacks(c)===3?.10:0],['六影 · 凝神',c.w>=6 && yiFocused(c)?.20:0]],
    teamSheerForce:[...buffs.entries.sheerForce,['手动固定贯穿力',c.customSheerForce??0]]
  };
  return ruptureStats(buffs,statSources);
}

function ruptureStats(buffs,statSources){
  const baseHp=sumBonuses(statSources.baseHp), baseAtk=sumBonuses(statSources.baseAtk);
  const panelHp=baseHp*(1+sumBonuses(statSources.panelHpPct))+sumBonuses(statSources.panelHpFlat);
  const panelAtk=baseAtk*(1+sumBonuses(statSources.panelAtkPct))+sumBonuses(statSources.panelAtkFlat);
  const hpMultiplier=1+buffs.teamHp;
  const fixedForce=sumBonuses(statSources.teamSheerForce);
  const initialBase=yiHpConversion*panelHp+yiAtkConversion*panelAtk;
  const hpRollForce=yiHpConversion*baseHp*yiHpRoll, atkRollForce=yiAtkConversion*baseAtk*atkRoll;
  const rate=sumBonuses(statSources.panelRate)+sumBonuses(statSources.ownCombatRate)+sumBonuses(statSources.rateAdjustment);
  const critDmg=sumBonuses(statSources.panelCd)+sumBonuses(statSources.ownCombatCd)+sumBonuses(statSources.cdAdjustment)+buffs.normalCritDmg;
  return {initialBase,hpRollForce,atkRollForce,rate,critDmg,statSources,
    bonus:1+buffs.general+buffs.sheer+sumBonuses(statSources.ownElement)+sumBonuses(statSources.ownSheer),
    combatWithRolls:(hp,atk)=>(yiHpConversion*panelHp+hpRollForce*hp)*hpMultiplier+
      yiAtkConversion*panelAtk+atkRollForce*atk+fixedForce};
}
