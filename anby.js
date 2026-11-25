// GachaBase beta agent 1381 and W-Engine 14138. Coefficients use 1/10000 units.
const anby={name:'零号·安比',role:'强攻 · 电',element:203,ultimate:'斩空掠电',
  portrait:'https://i.gachabase.net/_U4boq_w29Z5nl9mn-3-0emboSlVbWduRMFa_U_cJf8/q:50/f:webp/plain/zzz/assets/468a5aea6346e2be13517e6e117cac69.png',
  engines:[['1','牺牲洁纯']]};

const anbySkills=[
  {name:'强化特殊技：极雷断空',type:'ex',base:37960,step:3460,defaultCount:3},
  {name:'终结技：斩空掠电',type:'ult',base:173490,step:15780,defaultCount:1},
  {name:'三连特殊技：苍光 ×3',type:'triple',base:3*4300,step:3*400,defaultCount:6},
  {name:'追加攻击：白雷',type:'white',base:16720,step:1520,aftershock:true,automatic:true},
  {name:'特殊技：雷殛',type:'thunder',base:18810,step:1710,aftershock:true,automatic:true},
  {name:'特殊技：苍光·临界',type:'finisher',base:24940,step:2270,aftershock:true,automatic:true},
  {name:'连携技：疾跃落雷',type:'chain',base:56380,step:5130,defaultCount:2},
  {name:'六影：电磁涡流',type:'vortex',base:100000,step:0,aftershock:true,automatic:true},
  {name:'普通攻击：电击穿（一段）',base:3270,step:300},
  {name:'普通攻击：电击穿（二段）',base:6220,step:570},
  {name:'普通攻击：电击穿（三段）',base:8010,step:730,potentialBase:10010,potentialStep:910},
  {name:'普通攻击：电击穿（三段终结）',base:3990,step:370},
  {name:'普通攻击：电击穿（四段）',base:15450,step:1410},
  {name:'普通攻击：电击穿（五段）',base:14850,step:1350},
  {name:'特殊技：星雷',base:5960,step:550},
  {name:'冲刺攻击：奔流',type:'dash',base:8250,step:750},
  {name:'闪避反击：地闪回击',base:25060,step:2280},
  {name:'快速支援：云闪',base:10820,step:990},
  {name:'支援突击：直击先导',base:40710,step:3710},
  {name:'闪避：频闪',base:0,step:0},
  {name:'招架支援：逆极反袭',base:0,step:0},
  {name:'千夏：猫的凝视（零号·安比触发）',type:'gaze',base:30000,step:0}
];

const isAnby=c=>c.main==='anby';
const anbyFour={shadow:'如影相随',thunder:'雷暴重金属',woodpecker:'啄木鸟电音',hormone:'激素朋克'};
const anbyTwo={...anbyFour,puffer:'河豚电音',astral:'静听嘉音'};
const anbyInitial={set:'shadow',two:'thunder',main4:'crit',main5:'auto',main6:'atk'};
const anbyWeaponElectric=[.20,.23,.26,.29,.32];
const anbyExtra=c=>['jufufu','roxy','norma','trigger','dialyn',...Object.keys(supportNames)].some(id=>teammateSlot(c,id));

function anbyCircuit(c){
  const ex=c.counts[anbySkills.findIndex(s=>s.type==='ex')];
  const ult=c.counts[anbySkills.findIndex(s=>s.type==='ult')];
  const manual=c.counts[anbySkills.findIndex(s=>s.type==='triple')];
  const m1=c.w>=1?ex:0, m2=c.w>=2?2*ult:0;
  return {manual,m1,m2,groups:manual+m1+m2};
}

function anbyRotation(c,stunFinisher){
  const ju=teammateSlot(c,'jufufu'), sunna=teammateSlot(c,'sunna');
  const [chainFinal,ultFinal]=juPotential[ju?c.potential:0]??juPotential[0];
  const awake=c.anbyPotential>=1, extra=anbyExtra(c);
  const {groups}=anbyCircuit(c);
  const counts={triple:groups,white:groups*3,thunder:groups,finisher:awake?groups:0,
    vortex:c.w>=6?Math.floor(groups*3/6):0};
  const aftershockBonus=extra && c.anbyMarked?[.25,.25,.34,.38,.42,.46,.50][c.anbyPotential]:0;
  const twoPiece=c.set==='shadow' || c.two==='shadow';
  return anbySkills.map((s,i)=>{
    const chain=s.type==='chain', ultimate=s.type==='ult';
    const aftershock=!!(s.aftershock || (awake && extra && (chain || ultimate)));
    const gaze=s.type==='gaze';
    const available=(!gaze || !!sunna) && (s.type!=='finisher' || awake) && (s.type!=='vortex' || c.w>=6);
    const count=available?(counts[s.type]??c.counts[i]):0;
    const base=awake?(s.potentialBase??s.base):s.base, step=awake?(s.potentialStep??s.step):s.step;
    const mult=(base+(upgradeLevel(c.w)-1)*step+(gaze && c[sunna]>=2?20000:0))/10000;
    const category=(ju && chain?juChainBonus:ju && ultimate?juUltimateBonus:0)+(c.stun && (chain || ultimate)?stunFinisher:0)+
      (aftershock?aftershockBonus:0)+(twoPiece && (aftershock || s.type==='dash')?.15:0)+(gaze && c[sunna]>=6?.50:0);
    const final=1+(chain?chainFinal:ultimate?ultFinal:0);
    return {name:s.name,count,available,aftershock,natural:{mult,category,final},
      mult:skillOverride(c,i,'coefficient',mult),category:skillOverride(c,i,'skill',category),final:skillOverride(c,i,'final',final),
      source:'other',markRate:0,markWeight:0,settle:false,ultimate};
  });
}

function anbyStats(c,buffs,mains,custom){
  const baseAtk=929+713;
  const [fourth,fifth]=mains.slice(3,5);
  const atkMains=mains.filter(stat=>stat==='atk').length;
  const has=set=>c.set===set || c.two===set;
  const initialBase=baseAtk*(1+.30*atkMains+(has('hormone')?.10:0)+(has('astral')?.10:0)+(c.customAtkPct||0)/100)+316+(c.customFlatAtk||0);
  const shadowStacks=c.set==='shadow'?c.anbySetStacks:0;
  const attackPct=buffs.teamAtkPct+.04*shadowStacks+
    (c.set==='thunder' && c.anbyShock?.28:0)+(c.set==='woodpecker'?.09*c.anbyWoodStacks:0)+(c.set==='hormone' && c.anbyDiscProc?.25:0);
  const weaponCritPerStack=[.10,.115,.13,.145,.16][c.wr-1];
  const statSources={
    panelRate:[['零号·安比基础暴击率',.05],['核心技强化',.144],
      ['四号位主属性',fourth==='crit'?.24:0],['啄木鸟电音两件',has('woodpecker')?.08:0]],
    ownCombatRate:[['如影相随四件 · '+shadowStacks+' 层',.04*shadowStacks],
      ['二影「冗余协议」',c.w>=2?.12:0],['额外能力「电极化」',anbyExtra(c)?.10:0]],
    rateAdjustment:[['自定义暴击率',custom.crit]],
    panelCd:[['基础暴伤',.50],['牺牲洁纯副属性',.48],['四号位主属性',fourth==='cd'?.48:0]],
    ownCombatCd:[['牺牲洁纯 · 固定暴伤',3*weaponCritPerStack],
      ['牺牲洁纯 · '+c.anbyWeaponStacks+' 层',c.anbyWeaponStacks*weaponCritPerStack]],
    cdAdjustment:[['自定义普通暴伤',(c.customNormalCd||0)/100]]
  };
  const rate=sumBonuses(statSources.panelRate)+sumBonuses(statSources.ownCombatRate)+sumBonuses(statSources.rateAdjustment);
  const critDmg=sumBonuses(statSources.panelCd)+sumBonuses(statSources.ownCombatCd)+sumBonuses(statSources.cdAdjustment)+buffs.normalCritDmg;
  return {baseAtk,initialBase,attackPct,rate,critDmg,statSources,bonus:1+buffs.general+(fifth==='electric'?.30:0),
    aftershockCritShare:c.anbyMarked?(c.anbyPotential>=1?.35:.30):0};
}
