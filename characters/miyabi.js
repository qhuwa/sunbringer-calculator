// GachaBase Listed skill multipliers use 1/10000 units. Frost is a separate gauge
// but uses the enemy's Ice resistance and the character's Ice damage bonus.
const miyabi={
  name:'星见雅',role:'异常 · 冰（烈霜）',kind:'attack',element:202,stat:880,
  ultimate:'名残雪',agentId:1091,slug:'miyabi',ultId:1091018,chainId:1091015,
  weaponId:14109,weaponSlug:'hailstorm-shrine',engines:[['1','霰落星殿']],
  portrait:'https://cdn.gachabase.net/zzz/assets/efb976ba5c7bbc8cafef8188f0fc71d7.png',
  skills:[
    {id:1091029,name:'普通攻击：霜月（三段蓄力）',type:'basic',charge:3,base:214110,step:19470,defaultCount:3},
    {id:'frostburn',name:'核心被动：霜灼·破',type:'anomaly',base:150000,step:0,defaultCount:3},
    {id:'frostDisorder',name:'霜寒被覆盖：烈霜紊乱',type:'disorder',base:60000,step:0,defaultCount:3},
    {id:1091018,name:'终结技：名残雪',type:'ult',base:238800,step:21710,defaultCount:1},
    {id:1091015,name:'连携技：春临',type:'chain',base:62800,step:5730,defaultCount:1},
    {id:1091009,name:'强化特殊技：飞雪（斩击）',type:'ex',base:39340,step:3590,defaultCount:1},
    {id:1091011,name:'强化特殊技：飞雪（追击）',type:'ex',base:48320,step:4400,defaultCount:1},
    {id:'polarity',name:'南宫羽：烈霜极性紊乱',type:'disorder',base:0,step:0,automatic:true},
    {id:'abloom',name:'南宫羽：烈霜异放',type:'anomaly',base:0,step:0,automatic:true},
    {id:'abloomM6',name:'南宫羽：烈霜异放（颤音：改）',type:'anomaly',base:0,step:0,automatic:true},
    // Raw hit table 1091035: two 50% hits per slash, with up to three slashes.
    ...[1,2,3].map(charge=>({id:'m6Slash'+charge,name:'六影：霜月追加斩击（第'+'一二三'[charge-1]+'段）',
      type:'basic',charge,base:72000,step:0,automatic:true})),
    {id:1091005,name:'普通攻击：风花（第五段）',type:'basic',kazahana:true,base:12900,step:1180},
    {id:'shatter',name:'烈霜异常：碎冰',type:'anomaly',base:50000,step:0},
    {id:1091001,name:'普通攻击：风花（第一段）',type:'basic',kazahana:true,element:'physical',base:2690,step:250},
    {id:1091002,name:'普通攻击：风花（第二段）',type:'basic',kazahana:true,element:'physical',base:2960,step:270},
    {id:1091003,name:'普通攻击：风花（第三段）',type:'basic',kazahana:true,base:6280,step:580},
    {id:1091004,name:'普通攻击：风花（第四段）',type:'basic',kazahana:true,base:9650,step:880},
    {id:1091027,name:'普通攻击：霜月（一段蓄力）',type:'basic',charge:1,base:45470,step:4140},
    {id:1091028,name:'普通攻击：霜月（二段蓄力）',type:'basic',charge:2,base:85810,step:7810},
    {id:1091008,name:'特殊技：深雪',type:'other',base:3580,step:330},
    {id:1091013,name:'冲刺攻击：冬蜂',type:'dash',element:'physical',base:2580,step:240},
    {id:1091014,name:'闪避反击：寒雀',type:'dodge',base:24590,step:2240},
    {id:1091021,name:'快速支援：花信风',type:'assist',base:10450,step:950},
    {id:1091025,name:'支援突击：花辞',type:'assist',base:33780,step:3080}
  ]
};
const isMiyabi=c=>c.main==='miyabi';
const miyabiGear={branch:'折枝剑歌',polar:'极地重金属',freedom:'自由蓝调',chaos:'混沌爵士',phaethon:'法厄同之歌',
  woodpecker:'啄木鸟电音',hormone:'激素朋克',puffer:'河豚电音'};
const miyabiControls=[
  ['frostbite','霜寒覆盖（直伤获得 10% 暴伤）'],
  ['frostTime','普通紊乱结算时霜寒剩余时间（秒）',0,20,10],
  ['polarityTime','极性紊乱结算时霜寒剩余时间（秒）',0,20,10],
  ['anomalyShare','烈霜积蓄归属星见雅的比例 %',0,100,100],
  ['flatAP','额外异常精通（点）',0,1000,0],
  ['weapon','霰落星殿增伤层数',0,2,2],
  ['ultimate','终结技冰伤 +30% 覆盖'],
  ['disorder','霜月享受紊乱后的冰抗无视'],
  ['freeze','冻结或碎冰触发套装效果'],
  ['chaos','混沌爵士从后场切入后的增益覆盖'],
  ['phaethon','法厄同强化特殊技异常精通覆盖'],
  ['m6','计入六影自动拔刀斩击']
];

function miyabiStats(c,buffs,mains,custom){
  const weapon=alternateLeadWeapon(c)??weaponCatalog.get(miyabi.weaponId);
  const rank=weaponRankIndex(c.wr), effect=leadWeaponEffects(c);
  const signature=leadSignature(c), has=set=>c.set===set || c.two===set;
  const mainCount=stat=>mains.filter(value=>value===stat).length;
  const buildAP=238+engineStat(weapon,'ap')+92*mainCount('proficiency')+(has('freedom')?30:0)+(has('chaos')?30:0);
  const mastery=116*(1+engineStat(weapon,'mastery')+.30*mainCount('mastery')+(has('phaethon')?.08:0));
  const statSources={
    baseAtk:[['星见雅 · 基础（核心 F）',miyabi.stat],[weapon.name,engineBase(weapon,'atk')]],
    panelAtkPct:[[weapon.name,engineStat(weapon,'atk')],['驱动盘主词条',.30*mainCount('atk')],['激素朋克两件',has('hormone')?.10:0]],
    panelAtkFlat:[['二号位主词条',316]],
    panelRate:[['基础暴击率',.05],[weapon.name,engineStat(weapon,'crit')],['驱动盘主词条',mains[3]==='crit'?.24:0],['啄木鸟电音两件',has('woodpecker')?.08:0]],
    panelCd:[['基础暴击伤害',.50],[weapon.name,engineStat(weapon,'cd')],['驱动盘主词条',mains[3]==='cd'?.48:0],['折枝剑歌两件',has('branch')?.16:0]],
    ownCombatRate:[['星见雅 · 二影',c.w>=2?.15:0],['折枝剑歌四件',c.set==='branch' && expandedOption(c,'freeze')?.12:0],[weapon.name,effect.crit]],
    ownCombatCd:[[weapon.name,signature?[.50,.57,.65,.72,.80][rank]:effect.cd],['折枝剑歌四件',c.set==='branch' && mastery>=115?.30:0]],
    ownCombatAtkPct:[[weapon.name,effect.atk],['激素朋克四件',c.set==='hormone'?.25:0],['啄木鸟电音四件',woodpeckerAttackBonus(c)]],
    ownCombatAtkFlat:[],
    ownGeneral:[],
    ownElement:[['驱动盘五号位冰伤',mains[4]==='ice'?.30:0],['极地重金属两件',has('polar')?.10:0],
      ['星见雅 · 名残雪',expandedOption(c,'ultimate')?.30:0],
      [weapon.name,signature?[.20,.23,.26,.29,.32][rank]*expandedOption(c,'weapon'):effect.element]],
    rateAdjustment:[['自定义暴击率',custom.crit]],
    cdAdjustment:[['自定义暴伤',(c.customNormalCd??0)/100]],
    atkPctAdjustment:[['自定义百分比攻击力',(c.customAtkPct??0)/100]],
    atkFlatAdjustment:[['自定义固定攻击力',c.customFlatAtk??0]]
  };
  const baseAtk=sumBonuses(statSources.baseAtk);
  return {
    baseAtk,statSources,
    initialBase:baseAtk*(1+sumBonuses(statSources.panelAtkPct)+sumBonuses(statSources.atkPctAdjustment))+
      sumBonuses(statSources.panelAtkFlat)+sumBonuses(statSources.atkFlatAdjustment),
    rate:sumBonuses(statSources.panelRate)+sumBonuses(statSources.ownCombatRate)+custom.crit,
    critDmg:sumBonuses(statSources.panelCd)+sumBonuses(statSources.ownCombatCd)+sumBonuses(statSources.cdAdjustment)+buffs.normalCritDmg,
    attackPct:buffs.teamAtkPct+sumBonuses(statSources.ownCombatAtkPct),
    bonus:1+buffs.general+sumBonuses(statSources.ownGeneral)+sumBonuses(statSources.ownElement),
    ap:buildAP+effect.ap+buffs.teamAP+expandedOption(c,'flatAP')+(c.set==='phaethon' && expandedOption(c,'phaethon')?45:0),
    mastery
  };
}

function miyabiRows(c,buffs,stunFinisher){
  const m=c.w, option=key=>expandedOption(c,key), leadDisorder=leadWeaponEffects(c).disorder;
  const extra=partyMatches(c,'miyabi',{anomaly:true}) || Object.keys(supportNames).some(id=>teammateSlot(c,id));
  const [juChain,juUlt]=juPotential[teammateSlot(c,'jufufu')?c.potential:0]??juPotential[0];
  const nangong=teammateSlot(c,'nangongYu'), nangongM=c[nangong]??0;
  const nangongExtra=nangong && partyMatches(c,'nangongYu',{anomaly:true});
  const hasChain=c.counts[miyabi.skills.findIndex(s=>s.type==='chain')]>0;
  return miyabi.skills.map((skill,i)=>{
    const {id,name,type,charge,element}=skill;
    const chargeSlash=typeof id==='string' && id.startsWith('m6Slash');
    const chain=type==='chain', ult=type==='ult';
    const anomalyTagged=type==='disorder' || type==='anomaly';
    const trueAnomaly=anomalyTagged && id!=='frostburn';
    const anomalyBonus=type==='disorder'?buffs.disorderDamage:type==='anomaly'?buffs.anomalyDamage:0;
    const categorySources=[
      ['危局招式增伤',c.stun && (chain || ult)?stunFinisher:0],
      ['橘福福 · 虎啸',teammateSlot(c,'jufufu')?(chain?juChainBonus:ult?juUltimateBonus:0):0],
      ['星见雅 · 同沐霜雪',extra && charge?.60:0],
      ['星见雅 · 二影',m>=2 && (skill.kazahana || type==='dodge')?.30:0],
      ['星见雅 · 四影皲裂',m>=4 && id==='frostburn'?.30:0],
      ['星见雅 · 六影极意',m>=6 && charge?.30:0],
      ['极地重金属四件',c.set==='polar' && (type==='basic' || type==='dash')?(option('freeze')?.40:.20):0],
      ['混沌爵士四件',c.set==='chaos' && (type==='ex' || id===1091025 || id===1091021) && option('chaos')?.20:0]
    ];
    const finalSources=[['橘福福 · 侠肝义胆',chain?juChain:ult?juUlt:0]];
    let mult=(skill.base+(upgradeLevel(m)-1)*skill.step)/10000, count=c.counts[i];
    if(chargeSlash)count=m>=6 && option('m6')?miyabi.skills.reduce((total,entry,j)=>
      total+(Number.isInteger(entry.id) && (entry.charge??0)>=charge?c.counts[j]:0),0):0;
    if(id==='frostDisorder')mult+=.75*option('frostTime')+buffs.disorderBase;
    if(id==='polarity'){
      mult=(6+.75*option('polarityTime')+buffs.disorderBase)*.25;
      count=c.stun?(nangongExtra?(c.nangongPolar??2):0)+(nangongM>=2 && hasChain && (c.nangongM2Polar??true)?1:0):0;
    }
    if(id==='abloom'){
      mult=5*(.90+(.25+(nangongM>=2?.10:0))*(c.nangongTremolo??4));
      count=c.stun && nangong && (c.nangongTremolo??4)>0?1:0;
    }
    if(id==='abloomM6'){
      mult=5*(1+.25*(c.nangongTremoloM6??4));
      count=c.stun && nangongM>=6 && (c.nangongTremoloM6??4)>0?1:0;
    }
    const baseMult=mult, category=sumBonuses(categorySources), final=1+sumBonuses(finalSources);
    return {name,count,element,ultimate:ult,trueAnomaly,anomalyTagged,anomalyBonus,thresholdDisorder:type==='disorder'?leadDisorder:0,source:'other',markRate:0,markWeight:0,settle:false,
      anomalyShare:option('anomalyShare')/100,extraIgnore:m>=1 && charge?.12*charge:0,
      extraRes:charge && extra && option('disorder')?.30:0,critDamageBonus:option('frostbite')?.10:0,
      natural:{mult,baseMult,category,final,categorySources,finalSources},
      mult:skillOverride(c,i,'coefficient',mult),category:skillOverride(c,i,'skill',category),final:skillOverride(c,i,'final',final)};
  });
}
