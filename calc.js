// All rates are fractions. Skill coefficients use the source's 1/10000 units.
const pct = x => (100*x).toFixed(1).replace(/\.0$/,'')+'%';
const upgradeLevel = m => 12 + 2*Number(m>=3) + 2*Number(m>=5);
// Rates above 100% determine the probability of applying the same critical multiplier twice.
function expectedSharpCrit(rate,damage){
  const first=Math.min(rate,1);
  const second=Math.min(1,Math.max(0,rate-1));
  const multiplier=1+damage;
  return (1-first)+(first-second)*multiplier+second*multiplier**2;
}
// Potential I unlocks Ju Fufu's kit changes. The team final-damage bonus starts at II.
const juChainBonus=.20, juUltimateBonus=.40;
const juPotential = [[0,0],[0,0],[.03,.08],[.047,.12],[.064,.16],[.081,.20],[.10,.25]];
const teammateSlots=['f','r'];
const defaultTeammates={f:'jufufu',r:'robin'};
const teammateSlot=(c,id)=>teammateSlots.find(slot=>(c[slot+'char']??defaultTeammates[slot])===id);
function rotation(c,stunFinisher=0) {
  let firstReady=c.w>=4, focused=false;
  const ju=!!teammateSlot(c,'jufufu');
  const [chainFinal,ultFinal]=juPotential[ju?c.potential:0] || juPotential[0];
  return skills.map((s,i)=>{
    const n=s.name, count=c.counts[i], mult=(s.base+(upgradeLevel(c.w)-1)*s.step)/10000;
    const chain=n.startsWith('连携'), ult=n.startsWith('终结');
    const final=1+(chain?chainFinal:ult?ultFinal:0);
    const category=ju && chain?juChainBonus:ju && ult?juUltimateBonus:/不灭热忱|虔志如初/.test(n)?.2:0;
    const special=/聚锋|长暗终焉|永昼之炬|此行，共赴前路|此愿，重塑万象/.test(n);
    const settle=/永昼之炬|此愿，重塑万象/.test(n);
    const ultimate=n.includes('此愿，重塑万象');
    const mark=!s.base?0:n==='毁伤'?.4:special?.6:c.w>=2?.3:0;
    if(n.includes('聚锋') && count) focused=true;
    const boosted=firstReady && focused && count && settle && c.first===(ultimate?'ult':'ex');
    const additive=c.markMode==='add';
    const markBonus=c.w>=2 && mark>0?(additive?.35:mark*.35):0;
    const autoMarkRate=mark+markBonus;
    const markRate=skillOverride(c,i,'mark',autoMarkRate);
    // M4 augments the same M2 effect for one cast. Scale its extra share with manual rate overrides.
    const firstBonus=boosted?(additive?.65:mark*.65)*markRate/autoMarkRate:0;
    const markWeight=markRate*count+firstBonus;
    if(boosted) firstReady=false;
    return {name:n,count,natural:{mult,category,final,mark,autoMarkRate,firstBonus,boosted:!!boosted},mult:skillOverride(c,i,'coefficient',mult),category:skillOverride(c,i,'skill',category+(c.stun && (chain||ult)?stunFinisher:0)),
      final:skillOverride(c,i,'final',final),source:special?'core':n==='毁伤'?'rupture':'other',markRate,markWeight,settle,ultimate};
  });
}
function skillOverride(c,index,key,fallback){
  const value=c.skillOverrides?.[index]?.[key];
  return Number.isFinite(value)?value:fallback;
}
const discRoll={def:.048,crit:.024,cd:.048,pen:9};
const statNames=['防御 %','暴击率','暴击伤害','穿透值'];
// S-rank main pools and level-15 values (GachaBase pools 401–406).
const mainLabels={
  flatHp:'生命值 +2200',flatAtk:'攻击力 +316',flatDef:'防御力 +184',
  hp:'生命值 +30%',atk:'攻击力 +30%',def:'防御力 +48%',
  crit:'暴击率 +24%',cd:'暴击伤害 +48%',proficiency:'异常精通 +92',
  pen:'穿透率 +24%',fire:'火伤 +30%',physical:'物理伤害 +30%',ice:'冰伤 +30%',
  electric:'电伤 +30%',ether:'以太伤害 +30%',wind:'风伤 +30%',
  impact:'冲击力 +18%',energy:'能量自动回复 +60%',mastery:'异常掌控 +30%'
};
const mainPools=[
  ['flatHp'],['flatAtk'],['flatDef'],
  ['crit','cd','def','atk','hp','proficiency'],
  ['fire','pen','def','atk','hp','physical','ice','electric','ether','wind'],
  ['def','atk','hp','impact','energy','mastery']
];
const blockedSubstat={def:0,crit:1,cd:2};
const twoPieceNames={inferno:'炎狱重金属',puffer:'河豚电音',woodpecker:'啄木鸟电音',rose:'荆棘玫瑰'};
// A fully upgraded S disc has up to four different initial substats and five upgrades.
// Check a candidate allocation by constructing six actual discs, respecting main exclusions.
function evenSquares(total,slots){
  if(!slots)return total===0?0:Infinity;
  const low=Math.floor(total/slots), extra=total%slots;
  return (slots-extra)*low**2+extra*(low+1)**2;
}
function discCost(rolls){
  const total=rolls.reduce((sum,n)=>sum+n,0);
  // A layout has at most 54 rolls of at most 6 per stat per slot.
  // 325 makes total-count variance take precedence over per-stat variance.
  return 325*total**2+rolls.reduce((sum,n)=>sum+n*n,0);
}
function makeDiscs(target,blocked,startingLayout=null) {
  const memo=new Map();
  let bestLayout=startingLayout;
  let bestCost=startingLayout?startingLayout.reduce((sum,row)=>sum+discCost(row),0):Infinity;
  const path=[];
  const eligible=Array.from({length:7},(_,slot)=>target.map((_,i)=>blocked.slice(slot).filter(v=>v!==i).length));
  function lowerBound(slot,need){
    const total=need.reduce((sum,n)=>sum+n,0);
    return 325*evenSquares(total,6-slot)+need.reduce((sum,n,i)=>sum+evenSquares(n,eligible[slot][i]),0);
  }
  const capacityAfter=Array(7).fill(0);
  for(let i=5;i>=0;i--)capacityAfter[i]=capacityAfter[i+1]+(blocked[i]<0?9:8);
  function fill(slot,need,cost){
    if(startingLayout && cost+lowerBound(slot,need)>=bestCost)return null;
    if(slot===6){
      if(need.some(v=>v!==0))return null;
      if(!startingLayout)return [];
      bestCost=cost;
      bestLayout=path.slice();
      return null;
    }
    const key=slot+'|'+need.join(',');
    if(cost>=(memo.get(key)??Infinity))return null;
    memo.set(key,cost);
    for(let mask=1;mask<(1<<target.length);mask++){
      let demand=0, capacity=0;
      for(let i=0;i<target.length;i++)if(mask & (1<<i))demand+=need[i];
      for(let j=slot;j<6;j++){
        let available=0;
        for(let i=0;i<target.length;i++)if((mask & (1<<i)) && blocked[j]!==i)available++;
        if(available)capacity+=5+Math.min(4,available);
      }
      if(demand>capacity)return null;
    }
    const options=[];
    const minimumHere=need.reduce((sum,v)=>sum+v,0)-capacityAfter[slot+1];
    function build(i,a,types,up,score){
      if(i===target.length){
        if(types+up<minimumHere || (types===4 && up!==5))return;
        const next=need.map((v,j)=>v-a[j]);
        const nextCost=startingLayout?cost+discCost(a):0;
        const estimate=startingLayout?nextCost+lowerBound(slot+1,next):score;
        if(estimate<bestCost)options.push({estimate,next,nextCost,rolls:a.slice()});
        return;
      }
      const remaining=eligible[slot+1][i];
      const low=Math.max(0,need[i]-remaining*6);
      const high=blocked[slot]===i?0:Math.min(need[i],6-up);
      for(let v=low;v<=high;v++){
        if(types+(v>0)>4)continue;
        a[i]=v;
        const ideal=blocked[slot]===i?0:need[i]/(remaining+1);
        build(i+1,a,types+(v>0),up+Math.max(0,v-1),score+(v-ideal)**2);
      }
    }
    build(0,[],0,0,0);
    options.sort((a,b)=>a.estimate-b.estimate);
    for(const option of options){
      if(startingLayout && option.estimate>=bestCost)break;
      path[slot]=option.rolls;
      const next=fill(slot+1,option.next,option.nextCost);
      if(next)return [option.rolls,...next];
    }
    return null;
  }
  const first=fill(0,target,0);
  return bestLayout??first;
}
function rinaBuffs(c){
  const level=c.rinaPotential??6;
  const personalPen=(c.rinaBasePen??70.4)+(level>=2?1.6:0);
  const defensePerPercent=[0,0,2.5,3.5,4.5,5.5,6.5][level];
  const defense=Math.min(468,personalPen*defensePerPercent);
  const teamPen=Math.min(.30,.12+personalPen*.0025)*(c[teammateSlot(c,'rina')]>=1?1.3:1);
  return {personalPen,defense,teamPen};
}
// Each entry is also displayed in the worked example. Keep unlike multiplier groups separate.
function partyBonuses(c,custom,assault){
  const w=c.wr-1;
  const ju=teammateSlot(c,'jufufu'), roxy=teammateSlot(c,'roxy'), norma=teammateSlot(c,'norma');
  const trigger=teammateSlot(c,'trigger'), robin=teammateSlot(c,'robin'), rina=teammateSlot(c,'rina');
  const rinaBonus=rina?rinaBuffs(c):null;
  const shadow=slot=>c[slot]??0;
  const rank=slot=>(c[slot+'r']??1)-1;
  const engine=slot=>c[slot+'e']??0;
  // The squad can only receive one copy of Bloodwing Nocturne's team bonus.
  const bloodwing=ju?'橘福福':roxy?'洛克茜':norma?'诺姆':trigger?'扳机':null;
  const entries={
    teamDef:[['知更鸟 · 守护咏叹',robin?(440+30*upgradeLevel(shadow(robin)))*(c.beat?1.25:1):0],['丽娜 · 潜能觉醒',rinaBonus?.defense]],
    teamPen:[['丽娜 · 人偶共享穿透率',rinaBonus?.teamPen]],
    sharp:[['挽昼 · 蜃炎梦火',.10+.015*w],[bloodwing+' · 赤翼夜曲',bloodwing?.08:0],['知更鸟 · 六影',shadow(robin)>=6?.15:0],['自定义锐化增伤',custom.sharp],['危局效果',assault.sharp]],
    critDmg:[['挽昼 · 基础锐暴伤害',1.50],['挽昼 · 众愿一心',bloodwing || robin?.25:0],['洛克茜 · 火浸染',roxy?.20:0],['知更鸟 · 星韵流彩',engine(robin)===1?[.15,.173,.195,.218,.24][rank(robin)]:0],['自定义锐暴伤害',custom.critDmg],['危局效果',assault.critDmg]],
    general:[['挽昼 · 蜃炎梦火（火伤）',.20+.03*w],['挽昼 · 四影',c.w>=4?.10:0],['挽昼 · 炎狱重金属',c.two==='inferno'?.10:0],['挽昼 · 荆棘玫瑰四件',c.set==='rose'?.15:0],
      ['橘福福 · 福虓炉炉',engine(ju)===1?.20+.03*rank(ju):0],['洛克茜 · 永夜辗眠',engine(roxy)===1?.20+.03*rank(roxy):0],
      ['诺姆 · 首席跟班',engine(norma)===1?2*[.125,.144,.163,.181,.20][rank(norma)]:0],['诺姆 · 嗯呢弹幕',norma?.20:0],
      ['知更鸟 · 核心技「激昂咏叹」',robin?.20:0],['知更鸟 · 雪兔梦游仙境（三层）',robin?.18:0],
      ['知更鸟 · 星韵流彩',engine(robin)===1?2*[.085,.098,.11,.123,.136][rank(robin)]:0],['知更鸟 · 奔袭獠牙',engine(robin)===2?[.18,.225,.27,.315,.36][rank(robin)]:0],
      ['丽娜 · 月光骑士颂四件',rina ? .18 : 0],
      ['丽娜 · 啜泣摇篮',engine(rina)===1?[.202,.245,.30,.355,.398][rank(rina)]:0],
      ['自定义通用增伤',custom.general],['自定义火伤',custom.fire],['危局通用增伤',assault.general],['危局火伤',assault.fire]],
    ignore:[['挽昼 · 极昼',.20],['挽昼 · 星之碑四件',c.set==='star'?.20:0],['知更鸟 · 一影重音节拍',shadow(robin)>=1 && c.beat?.20:0],['挽昼 · 六影',c.w>=6?.15:0],['扳机 · 索魂影眸',engine(trigger)===1?[.25,.2875,.325,.3625,.40][rank(trigger)]:0],['自定义无视防御',custom.ignore],['危局减防',assault.defDown]],
    resDown:[['挽昼 · 一影',c.w>=1?.15:0],['知更鸟 · 二影',shadow(robin)>=2?.15:0],['洛克茜 · 一影',shadow(roxy)>=1?.15:0],['诺姆 · 一影',shadow(norma)>=1?.15:0],['危局减抗／无视抗性',assault.resDown]],
    received:[['洛克茜 · 目标受伤',roxy?.08:0],['危局效果',assault.received]],
    stun:[['橘福福 · 一影',shadow(ju)>=1?.35:0],['洛克茜 · 基础失衡易伤',roxy?.30:0],['洛克茜 · 二影',shadow(roxy)>=2?.30:0],['诺姆 · 基础失衡易伤',norma?.30:0],['诺姆 · 二影',shadow(norma)>=2?.30:0],['危局效果',assault.stun],['自定义失衡易伤',custom.stun]],
    stunAlways:[['扳机 · 破隙幽瞳',trigger?.35:0],['扳机 · 一影',shadow(trigger)>=1?.20:0]]
  };
  const totals={};
  for(const key of Object.keys(entries)){
    entries[key]=entries[key].filter(([,value])=>value);
    totals[key]=entries[key].reduce((sum,[,value])=>sum+value,0);
  }
  return {entries,...totals};
}
function solve(c,fixedBuild=null,searchMains=null){
  const rollBudget=c.rollBudget??45;
  const tripleLimit=c.tripleRollLimit??45, pairLimit=c.pairRollLimit??30;
  const singleLimit=c.maxRollsPerStat??15;
  const lockedRolls=c.lockedRolls??[null,null,null,null];
  const minimumRolls=lockedRolls.map(n=>n??0);
  const minimumCount=minimumRolls.reduce((sum,n)=>sum+n,0);
  const custom = {
    ignore: (c.customIgnore||0)/100,
    pen: (c.customPen||0)/100,
    general: (c.customGeneral||0)/100,
    sharp: (c.customSharp||0)/100,
    fire: (c.customFire||0)/100,
    crit: (c.customCrit||0)/100,
    critDmg: (c.customCritDmg||0)/100,
    defPct: (c.customDefPct||0)/100,
    flatDef: c.customFlatDef||0,
    stun: (c.customStun||0)/100
  };
  const assault=c.assault??assaultEffects(null);
  const rows=rotation(c,assault.stunFinisher);
  const lastRelease=rows.findLastIndex(row=>row.settle && row.count);
  const w=c.wr-1;
  const buffs=partyBonuses(c,custom,assault);
  const {teamDef,critDmg,ignore}=buffs;
  const resist=1-c.res/100+buffs.resDown;
  const received=1+buffs.received;
  const stun=(c.stun?c.vuln/100+buffs.stun:1)+buffs.stunAlways;
  let best=null;
  const main4=fixedBuild?.mains[3]??c.main4, main5=fixedBuild?.mains[4]??c.main5;
  const fourth=searchMains?.main4 || main4==='auto'?['def','crit','cd']:[main4];
  const fifth=searchMains?.main5 || main5==='auto'?['def','fire','pen']:[main5];
  const sixth=searchMains?.main6?['def']:[fixedBuild?.mains[5]??c.main6];
  for(const four of fourth)for(const five of fifth)for(const six of sixth){
    const mains=['flatHp','flatAtk','flatDef',four,five,six];
    const blocked=mains.map(stat=>blockedSubstat[stat]??-1);
    const caps=lockedRolls.map((n,i)=>Math.min(n??Infinity,tripleLimit,pairLimit,singleLimit,6*blocked.filter(x=>x!==i).length));
    const capacity=Math.min(rollBudget,Math.floor(4*tripleLimit/3),2*pairLimit,54-blocked.filter(stat=>stat>=0).length,caps.reduce((sum,n)=>sum+n,0));
    if(capacity<minimumCount || minimumRolls.some((n,i)=>n>caps[i]))continue;
    const bonus=1+buffs.general+(five==='fire'?.30:0);
    // Each skill is constant, scales with crit, with defense, or with both.
    // Keep the same mark and override weights for disc optimization and the detail table.
    const weights=[0,0,0,0];
    const factors=rows.map((row,i)=>{
      const generic=skillOverride(c,i,'generic',bonus), sharpFactor=skillOverride(c,i,'sharp',1+buffs.sharp);
      const resistFactor=skillOverride(c,i,'resist',resist), stunFactor=skillOverride(c,i,'stun',stun);
      const receivedFactor=skillOverride(c,i,'received',received);
      const fixed=row.mult*(generic+row.category)*row.final*receivedFactor*sharpFactor*resistFactor*stunFactor;
      const critOverride=c.skillOverrides?.[i]?.crit, defOverride=c.skillOverrides?.[i]?.defense;
      const settled=i<=lastRelease?row.markWeight*(row.ultimate && c.w>=6?1.8:1):0;
      weights[(critOverride==null?1:0)+(defOverride==null?2:0)]+=fixed*(row.count+settled)*(critOverride??1)*(defOverride??1);
      return {fixed,generic,sharp:sharpFactor,resist:resistFactor,stun:stunFactor,received:receivedFactor};
    });
    const defMains=mains.filter(stat=>stat==='def').length;
    const setDefense=.16+(c.two==='rose' && c.set!=='rose'?.16:0);
    const initialBase=887*(1+.48+setDefense+.48*defMains+custom.defPct)+184+custom.flatDef;
    const critBase=.338+.40+.20+.02*w+(four==='crit'?.24:0)+.35*(.50+(four==='cd'?.48:0)+(c.extraInitialCritDmg??0)/100)+(c.two==='woodpecker'?.08:0)+custom.crit;
    const penRate=(five==='pen'?.24:0)+(c.two==='puffer'?.08:0)+buffs.teamPen+custom.pen;
    const remainingDef=c.enemy*(1-ignore)*(1-penRate);
    const candidates=[];
    function evaluateRolls(d,cr,cd,pen){
        // The largest triple leaves out the smallest count. The largest pair is
        // either one of these two pairs or a combination of their larger members.
        const total=d+cr+cd+pen;
        if(total>capacity || total-Math.min(d,cr,cd,pen)>tripleLimit)return;
        if(Math.max(d+cr,cd+pen,Math.max(d,cr)+Math.max(cd,pen))>pairLimit)return;
        const initial=initialBase+887*discRoll.def*d;
        const rate=critBase+discRoll.crit*cr+.35*discRoll.cd*cd+(c.set==='star'?.12:initial>=1800?.16:initial>=1000?.08:0);
        if(c.requireFullCrit && rate<2-1e-10)return;
        const crit=expectedSharpCrit(rate,critDmg);
        const defenseFactor=794/(794+Math.max(0,remainingDef-discRoll.pen*pen-(c.extraFlatPen??0)));
        const combatDef=initial*(1+assault.def)+teamDef;
        const score=combatDef*(weights[0]+weights[1]*crit+weights[2]*defenseFactor+weights[3]*crit*defenseFactor);
        if(best && score<=best.score)return;
        candidates.push({score,rolls:[d,cr,cd,pen],initial,combatDef,rate,critFactor:crit,defenseFactor});
    }
    // Visit fuller builds first. A lower roll count can win if main/substat
    // exclusions prevent extending the best allocation to the next count.
    function chooseFeasible(){
      candidates.sort((a,b)=>b.score-a.score);
      for(const candidate of candidates){
        const discs=fixedBuild?.discs??makeDiscs(candidate.rolls,blocked);
        if(discs){
          best={...candidate,discs,mains,penRate,bonus,critDmg,teamDef,ignore,factors};
          break;
        }
      }
      candidates.length=0;
    }
    if(fixedBuild){
      if(fixedBuild.rolls.some((n,i)=>n<minimumRolls[i] || n>caps[i]))continue;
      evaluateRolls(...fixedBuild.rolls);
      chooseFeasible();
      continue;
    }
    for(let count=capacity;count>=minimumCount;count--){
      for(let d=minimumRolls[0];d<=Math.min(caps[0],count);d++){
        const remaining=count-d;
        for(let cr=minimumRolls[1];cr<=Math.min(caps[1],remaining);cr++){
          const minCd=Math.max(minimumRolls[2],remaining-cr-caps[3]);
          for(let cd=minCd;cd<=Math.min(caps[2],remaining-cr-minimumRolls[3]);cd++){
            evaluateRolls(d,cr,cd,remaining-cr-cd);
          }
        }
      }
      if(candidates.length)chooseFeasible();
    }
  }
  if(!best)return null;
  let pendingMark=0;
  const details=rows.map((r,i)=>{
    const factors=best.factors[i];
    const crit=skillOverride(c,i,'crit',best.critFactor), defense=skillOverride(c,i,'defense',best.defenseFactor);
    const unit=best.combatDef*factors.fixed*crit*defense;
    const direct=unit*r.count, accrued=unit*r.markWeight;
    pendingMark+=accrued;
    let mark=0;
    if(r.settle && r.count){mark=pendingMark;pendingMark=0;if(r.ultimate&&c.w>=6)mark+=accrued*.8;}
    return {...r,unit,base:r.mult*r.count,direct,accrued,mark,display:{...factors,coefficient:r.mult,skill:r.category,final:r.final,crit,defense,mark:r.markRate}};
  });
  const direct=details.reduce((a,x)=>a+x.direct,0), mark=details.reduce((a,x)=>a+x.mark,0);
  return {...best,buffSources:buffs.entries,rows:details,direct,mark,score:direct+mark};
}

