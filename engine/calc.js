// All rates are fractions. Skill coefficients use the source's 1/10000 units.
const pct = x => (100*x).toFixed(1).replace(/\.0$/,'')+'%';
const sumBonuses=entries=>entries.reduce((sum,[,value])=>sum+value,0);
const upgradeLevel = m => 12 + 2*Number(m>=3) + 2*Number(m>=5);
const usesAttack=c=>isNekomata(c)||isAnby(c)||isYeShunguang(c)||expandedLead(c)?.kind==='attack';
const usesRupture=c=>isYixuan(c)||isStarlightBilly(c)||expandedLead(c)?.kind==='rupture';
const usesSharp=c=>!usesAttack(c) && !usesRupture(c);
const damageElement=c=>expandedLead(c)?({200:'physical',201:'fire',202:'ice',203:'electric',204:'wind',205:'ether'})[expandedLead(c).element]:
  isYixuan(c)?'ether':isAnby(c)?'electric':usesSharp(c)?'fire':'physical';
const elementDamageNames={fire:'火伤',physical:'物伤',electric:'电伤',ice:'冰伤',ether:'以太伤害',wind:'风伤'};
const driveBlockedStats=c=>isMiyabi(c)?{atk:0,crit:1,cd:2,proficiency:3}:usesRupture(c)?yiDiscStats:usesAttack(c)?{atk:0,crit:1,cd:2}:blockedSubstat;
// Rates above 100% determine the probability of applying the same critical multiplier twice.
function expectedSharpCrit(rate,damage){
  const first=Math.max(0,Math.min(rate,1));
  const second=Math.min(1,Math.max(0,rate-1));
  const multiplier=1+damage;
  return (1-first)+(first-second)*multiplier+second*multiplier**2;
}
const effectiveCritRate=rate=>Math.max(0,Math.min(1,rate));
const expectedNormalCrit=(rate,damage)=>1+effectiveCritRate(rate)*damage;
// Potential I unlocks Ju Fufu's kit changes. The team final-damage bonus starts at II.
const juChainBonus=.20, juUltimateBonus=.40;
const juPotential = [[0,0],[0,0],[.03,.08],[.047,.12],[.064,.16],[.081,.20],[.10,.25]];
const teammateSlots=['f','r'];
const defaultTeammates={f:'jufufu',r:'robin'};
const teammateSlot=(c,id)=>id===c.main?undefined:teammateSlots.find(slot=>(c[slot+'char']??defaultTeammates[slot])===id);
const teammateRotationLabels={dialyn:'琉音',norma:'诺姆',yuzuha:'柚叶'};
function teammateRotation(c){
  const cat=isNekomata(c), silver=isAnby(c), ye=isYeShunguang(c), yi=isYixuan(c), sharp=usesSharp(c);
  const roster=cat?nekomataSkills:silver?anbySkills:ye?yeSkills:yi?yiSkills:isStarlightBilly(c)?billySkills:skills;
  const actor=expandedLead(c);
  const dialyn=teammateSlot(c,'dialyn'), norma=teammateSlot(c,'norma');
  const addUltimate=dialyn && (c[dialyn+'ExtraRotation']??true);
  const yuzuha=teammateSlot(c,'yuzuha');
  const extraChain=!c.stun && yuzuha && c[yuzuha]>=2 && (c[yuzuha+'ExtraRotation']??true);
  const addChains=norma && (c[norma+'ExtraRotation']??true);
  const chainCast=allowYuzuha=>{
    const sources=[...(addChains?['norma']:[]),...(extraChain && allowYuzuha?['yuzuha']:[])];
    return sources.length?{id:sources[0],sources,count:(addChains?2:0)+(extraChain && allowYuzuha?1:0)}:null;
  };
  if(actor)return actor.skills.map(skill=>{
    if(addUltimate && skill.id===actor.ultId)return {id:'dialyn',count:1};
    if(skill.id===actor.chainId)return chainCast(true);
    return null;
  });
  const isChain=s=>sharp?s.name.startsWith('连携技'):s.type==='chain' && (!ye || s.veil);
  const firstChain=roster.find(isChain);
  return roster.map(s=>{
    if(addUltimate){
      // Dialyn's free cast opens Ye's veil. The follow-up ultimate requires decibels.
      const yeFollowUps=ye && s.veil && s.defaultCount && ['basic','flight'].includes(s.type);
      const count=sharp?Number(s.name.startsWith('终结技')):yeFollowUps?s.defaultCount:Number(s.type==='ult');
      if(count)return {id:'dialyn',count};
    }
    if(isChain(s))return chainCast(s===firstChain);
    return null;
  });
}
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
function solve(c,fixedBuild=null,searchMains=null){
  const cat=isNekomata(c), silver=isAnby(c), ye=isYeShunguang(c), yi=isYixuan(c), billy=isStarlightBilly(c);
  const rupture=usesRupture(c), normal=!usesSharp(c);
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
    sheer: (c.customSheer||0)/100,
    fire: (c.customFire||0)/100,
    crit: (c.customCrit||0)/100,
    critDmg: (c.customCritDmg||0)/100,
    defPct: (c.customDefPct||0)/100,
    flatDef: c.customFlatDef||0,
    stun: (c.customStun||0)/100
  };
  const assault=c.assault??assaultEffects(null);
  const extraCasts=teammateRotation(c);
  const counts=c.counts.map((count,i)=>count+(extraCasts[i]?.count??0));
  const buffs=partyBonuses(c,custom,assault);
  const {teamDef,critDmg}=buffs;
  const actor=expandedLead(c);
  const makeRotation=actor?expandedRotation:yi?yiRotation:billy?billyRotation:ye?yeRotation:silver?anbyRotation:cat?nekomataRotation:rotation;
  const leadConfig={...c,counts};
  const baseRows=isMiyabi(c)?miyabiRows(leadConfig,buffs,assault.stunFinisher):
    makeRotation(leadConfig,assault.stunFinisher);
  const weaponModel=evaluateLeadWeapon(leadConfig,baseRows);
  const {weapon,values:weaponEffects}=weaponModel;
  const weaponName=weapon?.name??'';
  const statConfig={...c,weaponModel};
  let charges=weaponModel.charges;
  const chainBonus=koledaChainBonus(c);
  const rows=baseRows.map((row,i)=>{
    const chain=row.name.startsWith('连携技'), increase=chain?chainBonus:0;
    const effect=weaponCastModifiers(c,weaponModel,row,charges), modifiers=effect.modifiers;
    charges=effect.charges;
    const hitBonus=modifiers.skill??0;
    return {...row,weaponModifiers:modifiers,extraRes:(row.extraRes??0)+(modifiers.res??0),
      extraIgnore:(row.extraIgnore??0)+(row.aftershock?buffs.aftershockIgnore:0)+(modifiers.ignore??0),
      category:skillOverride(c,i,'skill',row.category+increase+hitBonus),
      natural:{...row.natural,category:row.natural.category+increase+hitBonus,
        categorySources:[...(row.natural.categorySources??[]),['珂蕾妲 · 别小瞧我',increase],
          ...(hitBonus?[[weaponName,hitBonus]]:[])],
        sheerSources:[...(row.natural.sheerSources??[]),...(modifiers.sheer?[[weaponName,modifiers.sheer]]:[])]}};
  });
  if(weaponEffects.proc && weaponModel.charges && rows.some(row=>row.count && row.mult)){
    const mult=weaponEffects.proc;
    rows.push({name:weaponName+' · 追加伤害',weaponProc:true,count:weaponModel.charges,
      mult,category:0,final:1,extraIgnore:0,markRate:0,markWeight:0,source:'other',natural:{mult,category:0,final:1}});
  }
  const lastRelease=rows.findLastIndex(row=>row.settle && row.count);
  const resist=1-c.res/100+buffs.resDown;
  const received=1+buffs.received;
  const stun=(c.stun?c.vuln/100+buffs.stun:1)+buffs.stunAlways;
  const veil=ye?yeVeilFactor(c,buffs):stun;
  const mixed=actor?.skills.some(skill=>skill.element==='physical');
  const remainingDefense=(ignore,penRate)=>c.enemy*(1-ignore)*(1-penRate);
  const defenseFactor=(def,flatPen)=>794/(794+Math.max(0,def-flatPen));
  let best=null;
  const main4=fixedBuild?.mains[3]??c.main4, main5=fixedBuild?.mains[4]??c.main5;
  const scalingStat=rupture?'hp':normal?'atk':'def';
  const fourth=searchMains?.main4 || main4==='auto'?[scalingStat,'crit','cd',...(isMiyabi(c)?['proficiency']:[])]:[main4];
  const fifth=searchMains?.main5 || main5==='auto'?[scalingStat,damageElement(c),
    ...(actor?.skills.some(skill=>skill.element==='physical')?['physical']:[]),...(rupture?[]:['pen'])]:[main5];
  const branchMastery=(actor===banyue || billy) && c.set==='branch';
  const sixth=searchMains?.main6?(isMiyabi(c)?['atk','mastery']:actor===qingyi?['atk','impact']:
    actor===cissia || actor===roxy?['atk','energy']:branchMastery?['hp','mastery']:[scalingStat]):[fixedBuild?.mains[5]??c.main6];
  const blockedStats=driveBlockedStats(c);
  for(const four of fourth)for(const five of fifth)for(const six of sixth){
    const mains=['flatHp','flatAtk','flatDef',four,five,six];
    const blocked=mains.map(stat=>blockedStats[stat]??-1);
    const caps=lockedRolls.map((n,i)=>Math.min(n??Infinity,tripleLimit,pairLimit,singleLimit,6*blocked.filter(x=>x!==i).length));
    const capacity=Math.min(rollBudget,Math.floor(4*tripleLimit/3),2*pairLimit,54-blocked.filter(stat=>stat>=0).length,caps.reduce((sum,n)=>sum+n,0));
    if(capacity<minimumCount || minimumRolls.some((n,i)=>n>caps[i]))continue;
    const attackStats=isMiyabi(c)?miyabiStats(statConfig,buffs,mains,custom):actor===claret?claretStats(statConfig,buffs,mains,custom):actor?expandedStats(statConfig,buffs,mains,custom):yi?yiStats(statConfig,buffs,mains,custom):billy?billyStats(statConfig,buffs,mains,custom):ye?yeStats(statConfig,buffs,mains,custom):silver?anbyStats(statConfig,buffs,mains,custom):cat?nekomataStats(statConfig,buffs,mains,custom):null;
    const bonus=(attackStats?.bonus??1+buffs.general+(five==='fire'?.30:0))+(weaponEffects.damage??0);
    const aftershockShare=attackStats?.aftershockCritShare??0;
    const penRate=rupture && !mixed?0:(five==='pen'?.24:0)+(c.set==='puffer'||c.two==='puffer'?.08:0)+buffs.teamPen+custom.pen+(attackStats?.pen??0)+engineStat(weapon,'pen');
    const ignore=buffs.ignore+(attackStats?.ignore??0);
    const baseDef=attackStats?.baseDef??441+engineBase(weapon,'def');
    const weaponDef=engineStat(weapon,'def');
    const sunWeaponRate=engineStat(weapon,'crit')+(weaponEffects.crit??0);
    const sunWeaponCd=engineStat(weapon,'cd');
    const elementBonus=key=>sumBonuses(buffs.entries[key].filter(([, ,type])=>type==='element' || type==='targetElement'));
    const physicalBonus=mixed?bonus-elementBonus('general')-sumBonuses(attackStats.statSources.ownElement)+
      (five==='physical'?.30:0):bonus;
    const physicalResist=mixed?1-(c.physicalRes??0)/100+buffs.resDown-elementBonus('resDown'):resist;
    const physicalIgnore=mixed?ignore-elementBonus('ignore'):ignore;
    const physicalGeneral=mixed?buffs.physicalGeneral:0;
    const physicalCritDamage=mixed?-elementBonus('normalCritDmg'):0;
    // Group only dynamic factors. Overrides are already part of damageWeight.
    const buckets=new Map();
    const factors=rows.map((row,i)=>{
      const physical=row.element==='physical';
      const modifiers=row.weaponModifiers??{};
      const autoGeneric=(physical?physicalBonus+physicalGeneral:bonus)+(modifiers.damage??0);
      const generic=skillOverride(c,i,'generic',autoGeneric);
      const sharpFactor=normal?1:skillOverride(c,i,'sharp',1+buffs.sharp+(modifiers.sharp??0));
      const sheerDamage=rupture && !physical;
      const sheerFactor=sheerDamage?skillOverride(c,i,'sheer',
        1+attackStats.sheerBonus+sumBonuses(row.natural.sheerSources)):1;
      const resistFactor=skillOverride(c,i,'resist',(physical?physicalResist:resist+(attackStats?.res??0))+(row.extraRes??0));
      const stunFactor=skillOverride(c,i,'stun',(row.veil?veil:stun)+(row.extraStun??0));
      const remaining=sheerDamage?0:remainingDefense((physical?physicalIgnore:ignore)+row.extraIgnore,penRate+(row.extraPen??0));
      const critDamageBonus=(row.critDamageBonus??0)+(physical?physicalCritDamage:0);
      const receivedFactor=skillOverride(c,i,'received',received);
      const anomalyBonus=row.anomalyTagged?skillOverride(c,i,'anomalyBonus',1+row.anomalyBonus):1;
      const rateDamageBase=weaponEffects?.rateScale && !Number.isFinite(c.skillOverrides?.[i]?.generic)?generic+row.category:null;
      const fixed=anomalyBonus*row.mult*(row.anomalyShare!=null && row.trueAnomaly?row.anomalyShare:1)*
        (rateDamageBase==null?generic+row.category:1)*row.final*receivedFactor*sharpFactor*sheerFactor*resistFactor*stunFactor;
      const critOverride=c.skillOverrides?.[i]?.crit??(row.trueAnomaly || row.weaponProc?1:undefined), defOverride=c.skillOverrides?.[i]?.defense;
      const threshold=row.critThreshold??0;
      const bonusCoefficient=Number.isFinite(c.skillOverrides?.[i]?.coefficient)?1:row.thresholdScale??1;
      const attackScaling=rupture && physical;
      const settled=i<=lastRelease?row.markWeight*(row.ultimate && c.w>=6?1.8:1):0;
      const damageWeight=fixed*(row.count+settled)*(critOverride??1)*(defOverride??1);
      if(damageWeight){
        const def=defOverride==null && !sheerDamage?remaining:null;
        const rateBonus=row.critRateBonus??0;
        const rowCd=critOverride==null?critDamageBonus:0;
        const manualAnomaly=c.skillOverrides?.[i]?.anomaly;
        const apScaling=row.trueAnomaly && manualAnomaly==null;
        const thresholdDisorder=c.skillOverrides?.[i]?.anomalyBonus==null?row.thresholdDisorder??0:0;
        const disorderRatio=thresholdDisorder?thresholdDisorder/anomalyBonus:0;
        const key=[def,rateBonus,rowCd,attackScaling,threshold,bonusCoefficient,apScaling,disorderRatio,rateDamageBase].join('|');
        if(!buckets.has(key))buckets.set(key,{def,rateBonus,rowCd,attackScaling,threshold,bonusCoefficient,apScaling,disorderRatio,rateDamageBase,weight:[0,0,0]});
        const {weight}=buckets.get(key);
        const critKey=critOverride!=null?0:row.aftershock?2:1;
        weight[critKey]+=damageWeight*(row.trueAnomaly?(manualAnomaly??1):1);
      }
      return {fixed,remaining,critDamageBonus,attackScaling,sheerDamage,threshold,bonusCoefficient,autoGeneric,generic,rateDamageBase,sharp:sharpFactor,sheer:sheerFactor,
        resist:resistFactor,stun:stunFactor,received:receivedFactor,anomalyBonus};
    });
    const defMains=mains.filter(stat=>stat==='def').length;
    const setDefense=.16+(c.two==='rose' && c.set!=='rose'?.16:0);
    const initialBase=(attackStats?.initialBase??baseDef*(1+weaponDef+setDefense+.48*defMains+custom.defPct)+184+custom.flatDef)+
      baseDef*(weaponEffects?.initialDef??0);
    const critBase=attackStats?.rate??.338+.40+sunWeaponRate+(four==='crit'?.24:0)+.35*(.50+sunWeaponCd+(four==='cd'?.48:0)+(c.extraInitialCritDmg??0)/100)+(c.two==='woodpecker'?.08:0)+custom.crit;
    const weaponCombatDef=baseDef*(weaponEffects?.combatDef??0);
    const critDamage=attackStats?.critDmg??critDmg;
    const weights=[...buckets.values()];
    const candidates=[];
    function evaluateRolls(d,cr,cd,pen){
        // The largest triple leaves out the smallest count. The largest pair is
        // either one of these two pairs or a combination of their larger members.
        const total=d+cr+cd+pen;
        if(total>capacity || total-Math.min(d,cr,cd,pen)>tripleLimit)return;
        if(Math.max(d+cr,cd+pen,Math.max(d,cr)+Math.max(cd,pen))>pairLimit)return;
        const initial=initialBase+(rupture?attackStats.hpRollForce*d+attackStats.atkRollForce*pen:
          (normal?attackStats.baseAtk*atkRoll:baseDef*discRoll.def)*d);
        const rate=critBase+buffs.teamCritRate+discRoll.crit*cr+(normal?0:.35*discRoll.cd*cd+(c.set==='rose'?(initial>=1800?.16:initial>=1000?.08:0):actor===claret?0:.12));
        if(c.requireFullCrit && rate<(normal?1:2)-1e-10)return;
        const dynamicCd=attackStats?.combatCritSources?.(initial,rate-buffs.teamCritRate)??null;
        const cdValue=critDamage+(normal?discRoll.cd*cd:0)+(dynamicCd?sumBonuses(dynamicCd):0);
        const crit=normal?expectedNormalCrit(rate,cdValue):expectedSharpCrit(rate,cdValue);
        const aftershockExtra=(crit-1)*aftershockShare;
        const ap=(attackStats?.ap??0)+(isMiyabi(c)?9*pen:0);
        const flatPen=rupture && !mixed?0:(rupture || isMiyabi(c)?0:discRoll.pen*pen)+(c.extraFlatPen??0);
        const ownAttack=attackStats?.combatAttackBonus?.(rate-buffs.teamCritRate)??0;
        const combatStat=rupture?attackStats.combatWithRolls(d,pen):normal?initial+attackStats.baseAtk*attackStats.attackPct+buffs.teamAtk+ownAttack:initial*(1+assault.def)+teamDef+weaponCombatDef;
        const combatAttack=rupture && mixed?attackStats.combatAttackWithRolls(pen):combatStat;
        const weaponRateDamage=weaponEffects.rateScale?weaponOvercritDamage(weaponEffects.rateScale,rate):0;
        let score=0;
        for(const {def,rateBonus,rowCd,attackScaling,threshold,bonusCoefficient,apScaling,disorderRatio,rateDamageBase,weight:[fixed,ordinary,aftershock]} of weights){
          const defense=def==null?1:defenseFactor(def,flatPen);
          const rowCrit=(rateBonus || rowCd)?(normal?expectedNormalCrit(rate+rateBonus,cdValue+rowCd):
            expectedSharpCrit(rate+rateBonus,cdValue+rowCd)):crit;
          const scale=rate-buffs.teamCritRate+1e-9>=threshold?bonusCoefficient:1;
          const damageBonus=rateDamageBase==null?1:rateDamageBase+weaponRateDamage;
          score+=(attackScaling?combatAttack:combatStat)*scale*defense*damageBonus*(apScaling?2*ap/100:1)*(ap>=375?1+disorderRatio:1)*(fixed+ordinary*rowCrit+aftershock*(rowCrit+aftershockExtra));
        }
        if(best && score<=best.score)return;
        candidates.push({score,rolls:[d,cr,cd,pen],initial,combatStat,combatAttack,rate,critFactor:crit,aftershockExtra,aftershockShare,critDmg:cdValue,flatPen,ownAttack,ap,mastery:attackStats?.mastery,dynamicCd,weaponRateDamage});
    }
    // Visit fuller builds first. A lower roll count can win if main/substat
    // exclusions prevent extending the best allocation to the next count.
    function chooseFeasible(){
      candidates.sort((a,b)=>b.score-a.score);
      for(const candidate of candidates){
        const discs=fixedBuild?.discs??makeDiscs(candidate.rolls,blocked);
        if(discs){
          const {dynamicCd,...stats}=candidate;
          const statSources=attackStats?.statSources;
          best={...stats,discs,mains,penRate,bonus:bonus+stats.weaponRateDamage,teamDef,baseDef,weaponCombatDef,weaponEffects,weaponName,ignore:rupture?1:ignore,factors,
            statSources:dynamicCd?{...statSources,ownCombatCd:[...statSources.ownCombatCd,...dynamicCd]}:statSources};
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
    const rowRate=best.rate+(r.critRateBonus??0), rowCritDmg=best.critDmg+factors.critDamageBonus;
    const naturalCrit=r.trueAnomaly || r.weaponProc?1:(normal?expectedNormalCrit(rowRate,rowCritDmg):expectedSharpCrit(rowRate,rowCritDmg))+
      (r.aftershock?best.aftershockExtra:0);
    const crit=skillOverride(c,i,'crit',naturalCrit);
    const automaticDefense=factors.sheerDamage?1:defenseFactor(factors.remaining,best.flatPen);
    const defense=skillOverride(c,i,'defense',automaticDefense);
    const matchedThreshold=best.rate-buffs.teamCritRate+1e-9>=factors.threshold;
    const coefficient=r.mult*(matchedThreshold?factors.bonusCoefficient:1);
    const anomaly=r.trueAnomaly?skillOverride(c,i,'anomaly',2*best.ap/100):1;
    const anomalyBonus=r.anomalyTagged?
      skillOverride(c,i,'anomalyBonus',1+r.anomalyBonus+(best.ap>=375?(r.thresholdDisorder??0):0)):1;
    const disorderScale=factors.anomalyBonus?anomalyBonus/factors.anomalyBonus:1;
    const generic=factors.generic+(factors.rateDamageBase==null?0:best.weaponRateDamage);
    const damageBonus=factors.rateDamageBase==null?1:generic+r.category;
    const unit=(factors.attackScaling?best.combatAttack:best.combatStat)*factors.fixed*damageBonus*(matchedThreshold?factors.bonusCoefficient:1)*crit*defense*anomaly*disorderScale;
    const direct=unit*r.count, accrued=unit*r.markWeight;
    pendingMark+=accrued;
    let mark=0;
    if(r.settle && r.count){mark=pendingMark;pendingMark=0;if(r.ultimate&&c.w>=6)mark+=accrued*.8;}
    const automaticCoefficient=r.natural.mult*(matchedThreshold?(r.thresholdScale??1):1);
    return {...r,extraCast:extraCasts[i],automaticDefense,automaticCoefficient,naturalCrit,unit,base:coefficient*r.count,direct,accrued,mark,
      display:{...factors,generic,coefficient,skill:r.category,final:r.final,crit,defense,anomaly,anomalyBonus,mark:r.markRate}};
  });
  const direct=details.reduce((a,x)=>a+x.direct,0), mark=details.reduce((a,x)=>a+x.mark,0);
  const mainScore=direct+mark;
  const teammateCoefficients=teammateSlots.filter(slot=>!['air',c.main].includes(c[slot+'char']??defaultTeammates[slot])).map(slot=>({
    slot,coefficient:c[slot+'DamageCoefficient']??0
  }));
  const teamFactor=1+teammateCoefficients.reduce((sum,{coefficient})=>sum+coefficient,0);
  const score=mainScore*teamFactor;
  return {...best,combatDef:normal?0:best.combatStat,buffSources:buffs.entries,rows:details,direct,mark,mainScore,teammateCoefficients,teamFactor,counts,score};
}
