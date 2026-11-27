// GachaBase agent 1431, revision D20713015. Coefficients use 1/10000 units.
const yeShunguang={name:'叶瞬光',role:'强攻 · 凛刃',element:200,ultimate:'斩妄开天',
  portrait:'https://i.gachabase.net/qOP4FbKWGmHKisIcsyNrV_ad5Tsgb-1YY3LQMEymGBA/q:50/f:webp/plain/zzz/assets/616c0377d0a2b4e78f66bd46839fe1a8.png',
  engines:[['1','云霓孤光']]};

const yeSkills=[
  {name:'终结技：逐云惊霆',type:'ult',veil:true,base:192500,step:17500,defaultCount:1},
  {name:'普通攻击：明心境·斩流光（一段）',type:'basic',veil:true,base:12070,step:1100,defaultCount:1},
  {name:'普通攻击：明心境·斩流光（二段）',type:'basic',veil:true,base:15650,step:1430,defaultCount:1},
  {name:'普通攻击：明心境·斩流光 灭（强化）',type:'basic',veil:true,base:89120,step:8110,defaultCount:1},
  {name:'普通攻击：明心境·斩流光 极',type:'basic',veil:true,base:60480,step:5500,defaultCount:1},
  {name:'强化特殊技：明心境·飞光（每段）',type:'flight',veil:true,base:105800,step:9620,divisor:6,defaultCount:4},
  {name:'连携技：明心境·掣惊雷',type:'chain',veil:true,base:90860,step:8260,defaultCount:1},
  {name:'终结技：斩妄开天',type:'finish',veil:true,base:308430,step:28040,defaultCount:1},
  {name:'登场技：照影',veil:true,base:40040,step:3640},
  {name:'强化特殊技：明心境·归尘',type:'return',veil:true,base:116110,step:10560},
  {name:'强化特殊技：定风波',base:117840,step:10720},
  {name:'连携技：斩邪祟',type:'chain',base:87160,step:7930},
  {name:'普通攻击：快剑（一段）',type:'basic',base:7940,step:730},
  {name:'普通攻击：快剑（二段）',type:'basic',base:24410,step:2220},
  {name:'普通攻击：快剑（三段）',type:'basic',base:12460,step:1140},
  {name:'普通攻击：快剑（四段）',type:'basic',base:36800,step:3350},
  {name:'普通攻击：流云剑意（每道剑气）',type:'basic',base:11670,step:1070,divisor:7},
  {name:'普通攻击：明心境·分水行（一段）',type:'basic',veil:true,base:11260,step:1030},
  {name:'普通攻击：明心境·分水行（二段）',type:'basic',veil:true,base:15590,step:1420},
  {name:'普通攻击：明心境·分水行（三段）',type:'basic',veil:true,base:21660,step:1970},
  {name:'普通攻击：明心境·扶摇势',type:'basic',veil:true,base:9100,step:830},
  {name:'普通攻击：明心境·斩流光 灭（普通）',type:'basic',veil:true,base:15990,step:1460},
  {name:'特殊技：引沧澜',base:9890,step:900},
  {name:'特殊技：引沧澜（极限闪避）',base:31590,step:2880},
  {name:'特殊技：明心境·拂衣去',veil:true,base:7100,step:650},
  {name:'冲刺攻击：如影疾行',base:10500,step:960},
  {name:'闪避反击：燕袭',base:34630,step:3150},
  {name:'快速支援：援守',base:8050,step:740},
  {name:'快速支援：明心境·策应',veil:true,base:6730,step:620},
  {name:'支援突击：止戈',base:41370,step:3770},
  {name:'支援突击：明心境·抱一',veil:true,base:43000,step:3910},
  {name:'招架支援：归去时',base:0,step:0}
];

const isYeShunguang=c=>c.main==='yeShunguang';
const yeFour={ballad:'沧浪行歌',dawn:'拂晓生花',fanged:'獠牙重金属',woodpecker:'啄木鸟电音',hormone:'激素朋克'};
const yeTwo={...yeFour,branch:'折枝剑歌',puffer:'河豚电音',astral:'静听嘉音'};
const yeInitial={set:'ballad',two:'branch',main4:'cd',main5:'auto',main6:'atk'};
const yeHasSet=(c,set)=>c.set===set || c.two===set;
const yeVeilCap=c=>c.w>=4?2:1.10;
const yeSnapshotStun=c=>c.yeVeilSnapshot==='stunned' || (c.yeVeilSnapshot!=='normal' && !!c.stun);
function yeVeilFactor(c,buffs){
  const vulnerability=buffs.stunAlways+(yeSnapshotStun(c)?c.vuln/100-1+buffs.stun:0);
  return 1+Math.min(yeVeilCap(c),vulnerability);
}
const yeReplacements=c=>c.w>=6?Math.min(c.yeM6Replacements??0,c.counts[yeSkills.findIndex(s=>s.type==='return')]):0;

function yeRotation(c,stunFinisher){
  const ju=teammateSlot(c,'jufufu');
  const [chainFinal,ultFinal]=juPotential[ju?c.potential:0]??juPotential[0];
  const replacements=yeReplacements(c);
  return yeSkills.map((skill,i)=>{
    const chain=skill.type==='chain', ultimate=['ult','finish'].includes(skill.type);
    const basic=skill.type==='basic';
    const count=c.counts[i]+(skill.type==='finish'?replacements:skill.type==='return'?-replacements:0);
    const m6=c.w>=6 && ['return','finish'].includes(skill.type)?15:0;
    const mult=(skill.base+(upgradeLevel(c.w)-1)*skill.step)/(10000*(skill.divisor??1))+m6;
    const categorySources=[
      ['橘福福 · 虎啸',ju?(chain?juChainBonus:ultimate?juUltimateBonus:0):0],
      ['危局招式增伤',c.stun && (chain || ultimate)?stunFinisher:0],
      ['拂晓生花两件',basic && yeHasSet(c,'dawn')?.15:0],
      ['拂晓生花四件',basic && c.set==='dawn'?.20+(c.yeDiscProc?.20:0):0]
    ];
    const finalSources=[['橘福福 · 侠肝义胆',chain?chainFinal:ultimate?ultFinal:0]];
    const category=sumBonuses(categorySources), final=1+sumBonuses(finalSources);
    const extraIgnore=c.w>=2 && ['flight','finish'].includes(skill.type)?.40:0;
    return {name:skill.name,count,ultimate:skill.type==='finish',veil:!!skill.veil,extraIgnore,
      natural:{mult,category,final,categorySources,finalSources,m6},
      mult:skillOverride(c,i,'coefficient',mult),category:skillOverride(c,i,'skill',category),final:skillOverride(c,i,'final',final),
      source:'other',markRate:0,markWeight:0,settle:false};
  });
}

function yeStats(c,buffs,mains,custom){
  const fourth=mains[3], fifth=mains[4];
  const ballad=c.set==='ballad' && c.yeVeilBuff;
  const statSources={
    baseAtk:[['叶瞬光（Lv.60，核心技 F）',938],['云霓孤光（Lv.60）',743]],
    panelAtkPct:[['驱动盘攻击力主属性',.30*mains.filter(stat=>stat==='atk').length],
      ['激素朋克两件',yeHasSet(c,'hormone')?.10:0],['静听嘉音两件',yeHasSet(c,'astral')?.10:0]],
    panelAtkFlat:[['二号位主属性',316]],
    atkPctAdjustment:[['自定义攻击力百分比',(c.customAtkPct||0)/100]],
    atkFlatAdjustment:[['自定义固定攻击力',c.customFlatAtk||0]],
    ownCombatAtkPct:[['沧浪行歌四件',ballad?.10:0],['啄木鸟电音四件',woodpeckerAttackBonus(c)],
      ['激素朋克四件',c.set==='hormone' && c.yeDiscProc?.25:0]],
    panelRate:[['基础暴击率',.05],['核心技强化',.144],['四号位主属性',fourth==='crit'?.24:0],
      ['啄木鸟电音两件',yeHasSet(c,'woodpecker')?.08:0]],
    ownCombatRate:[['合道',.30],['沧浪行歌四件',ballad?.20:0]],
    rateAdjustment:[['自定义暴击率',custom.crit]],
    panelCd:[['基础暴伤',.50],['云霓孤光副属性',.48],['四号位主属性',fourth==='cd'?.48:0],
      ['折枝剑歌两件',yeHasSet(c,'branch')?.16:0]],
    ownCombatCd:[],
    cdAdjustment:[['自定义普通暴伤',(c.customNormalCd||0)/100]]
  };
  applyLeadEngineStats(c,statSources,'云霓孤光');
  const sum=key=>sumBonuses(statSources[key]??[]);
  const baseAtk=sum('baseAtk');
  const initialBase=baseAtk*(1+sum('panelAtkPct')+sum('atkPctAdjustment'))+sum('panelAtkFlat')+sum('atkFlatAdjustment');
  const attackPct=buffs.teamAtkPct+sum('ownCombatAtkPct');
  const rate=sum('panelRate')+sum('ownCombatRate')+sum('rateAdjustment');
  const critDmg=sum('panelCd')+sum('ownCombatCd')+sum('cdAdjustment')+buffs.normalCritDmg;
  return {baseAtk,initialBase,attackPct,rate,critDmg,statSources,bonus:1+buffs.general+(fifth==='physical'?.30:0)+sum('ownGeneral')+sum('ownElement')};
}
