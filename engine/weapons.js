const alternateLeadWeapon=c=>weaponCatalog.get(c.we);
const leadDefaultWeapons={sunbringer:14160,nekomata:14102,anby:14138,yeShunguang:14143,yixuan:14137,starlightBilly:14153};
const defaultLeadWeapon=c=>weaponCatalog.get(expandedLead(c)?.weaponId??leadDefaultWeapons[c.main??'sunbringer']);
const equippedLeadWeapon=c=>alternateLeadWeapon(c)??defaultLeadWeapon(c);
const leadSignature=c=>!alternateLeadWeapon(c) || c.we===defaultLeadWeapon(c)?.id;
const weaponRankIndex=rank=>Math.max(0,Math.min(4,(rank??1)-1));
const engineStat=(weapon,stat)=>weapon?.stat===stat?weapon.value:0;
const engineBase=(weapon,type)=>weapon?.baseType===type?weapon.base:0;
const modeledTeamEngines=new Set([13113,13115,14107,14116,14121,14125,14139,14141,14151,14162,13103,14002]);
const modeledLeadEngines=new Set([14114,14125,...Object.keys(weaponPassives).map(Number)]);
const leadWeaponRole=c=>expandedLead(c)?.role.split(' · ')[0]??(usesSharp(c)?'锋御':usesRupture(c)?'命破':'强攻');

const weaponSkillTypes=[['basic','普通攻击'],['ex','强化特殊技'],['special','特殊技'],['chain','连携技'],
  ['ult','终结技'],['dash','冲刺攻击'],['dodge','闪避反击'],['quick','快速支援']];
const weaponSkillType=row=>weaponSkillTypes.find(([type,prefix])=>row.type===type || row.name.startsWith(prefix))?.[0];

// Preserve controls saved before the weapon rules were moved out of the agent kits.
function legacyWeaponOptions(c,weapon){
  if(!leadSignature(c))return {};
  const option=key=>expandedOption(c,key);
  switch(weapon.id){
    case 14102:return {back:nekoBack(c)};
    case 14138:return {stacks:c.anbyWeaponStacks??3};
    case 14143:return {veil:c.yeVeilBuff??true};
    case 14137:return {stacks:c.yiWeaponStacks??2};
    case 14153:return {stacks:c.billyWeaponStacks??2};
    case 14159:case 14146:case 14147:case 14104:case 14124:case 14119:case 13106:return {stacks:option('weapon')};
    case 14132:return {stacks:option('strings')};
    case 14105:return {stacks:option('weapon'),selfLow:option('low')};
    case 14163:case 14155:case 14152:case 14129:case 14161:return {coverage:option('weapon')};
    case 13144:return {hpLost:option('hpCost')};
    case 13108:return {far:option('weapon')};
    case 14120:return {stunOrAnomaly:c.stun || option('anomaly')};
    default:return {};
  }
}

function leadWeaponRuleOptions(c,weapon,rows){
  const previous=legacyWeaponOptions(c,weapon);
  const active=rows.filter(row=>row.count>0);
  const matchingElement=(row,element)=>(row.element??damageElement(c))===element;
  const has=(...types)=>active.some(row=>types.includes(weaponSkillType(row)));
  const ex=(c.weaponExActive??true) && has('ex');
  const stacks=Math.max(0,c.weaponStacks??previous.stacks??(weapon.id===14001?0:weaponPassiveStacks[weapon.id]??0));
  const anomaly=Boolean(c.weaponAnomaly);
  const basicHit=previous.stacks!==undefined?stacks>=1:has('basic');
  const iceDash=previous.stacks!==undefined?stacks>=2 && damageElement(c)==='ice':
    active.some(row=>weaponSkillType(row)==='dash' && matchingElement(row,'ice'));
  const fireAftershock=active.some(row=>row.aftershock && matchingElement(row,'fire'));
  return {stacks,ex,basicHit,iceDash,fireAftershock,chainOrEx:ex || has('chain'),chainOrExAnomaly:anomaly && (ex || has('chain')),
    chainOrUlt:has('chain','ult'),dodgeOrQuick:has('dodge','quick'),stunOrAnomaly:previous.stunOrAnomaly??(c.stun || anomaly),
    coverage:c.weaponCoverage??previous.coverage??true,targetLow:c.weaponLowHp??false,selfLow:c.weaponSelfLow??previous.selfLow??false,
    hpLost:c.weaponHpLost??previous.hpLost??false,back:c.weaponBack??previous.back??false,far:c.weaponFar??previous.far??false,
    veil:c.weaponVeil??previous.veil??false,offField:c.weaponOffField??false};
}

// Equipment stats apply across specialties. Passive rules can target the build, the element, or the individual cast.
function evaluateLeadWeapon(c,rows=[]){
  const weapon=equippedLeadWeapon(c), values={}, castRules=[];
  if(!weapon || weapon.role!==leadWeaponRole(c) || !weaponPassives[weapon.id])return {weapon,values,castRules};
  // These alternate-weapon rules coexist with the pre-existing specialty kit for its own signature.
  if(weapon.id===14162 && leadSignature(c))return {weapon,values,castRules};
  const options=leadWeaponRuleOptions(c,weapon,rows);
  const rank=weaponRankIndex(c.wr);
  for(const [stat,amount,rule={}] of weaponPassives[weapon.id]){
    if(rule.when && !options[rule.when] || rule.agent && rule.agent!==c.main || options.stacks<(rule.minStacks??0))continue;
    const value=(Array.isArray(amount)?amount[rank]:amount)*(rule.stacked?options.stacks:1);
    if(!value)continue;
    if(rule.element || rule.skills)castRules.push({stat,value,...rule});
    else values[stat]=(values[stat]??0)+value;
  }
  return {weapon,values,castRules,charges:options.stacks};
}

function weaponCastModifiers(c,model,row,charges){
  const type=weaponSkillType(row), element=row.element??damageElement(c);
  const modifiers={};
  for(const rule of model.castRules){
    if(rule.element && rule.element!==element || rule.skills && !rule.skills.includes(type))continue;
    let value=rule.value;
    if(rule.charges){
      if(!row.count)continue;
      const used=Math.min(charges,row.count);
      charges-=used;
      value*=used/row.count;
    }
    modifiers[rule.stat]=(modifiers[rule.stat]??0)+value;
  }
  return {modifiers,charges};
}

const weaponOvercritDamage=(scale,rate)=>scale*Math.max(0,Math.min(.50,rate-1));

function leadWeaponEffects(c){
  const {values,castRules}=c.weaponModel??evaluateLeadWeapon(c);
  const element=damageElement(c);
  const matching=stat=>castRules.filter(rule=>rule.stat===stat && rule.element===element && !rule.skills)
    .reduce((sum,rule)=>sum+rule.value,0);
  return {atk:values.atk??0,ap:values.ap??0,general:values.damage??0,element:matching('damage'),crit:values.crit??0,
    cd:values.cd??0,res:matching('res'),disorder:values.disorder??0};
}

function applyLeadEngineStats(c,sources,signatureName){
  const model=c.weaponModel??evaluateLeadWeapon(c);
  const {weapon,values}=model;
  if(!weapon || (!alternateLeadWeapon(c) && !weaponPassives[weapon.id]) || weapon.id===14162 && leadSignature(c))return;
  for(const entries of Object.values(sources)){
    const remaining=entries.filter(([name])=>!name.startsWith(signatureName));
    entries.splice(0,entries.length,...remaining);
  }
  const insert=(key,value)=>{if(value)(sources[key]??=[]).push([weapon.name,value]);};
  insert('baseAtk',engineBase(weapon,'atk'));
  insert('panelAtkPct',engineStat(weapon,'atk'));
  insert('panelHpPct',engineStat(weapon,'hp'));
  insert('panelRate',engineStat(weapon,'crit'));
  insert('panelCd',engineStat(weapon,'cd'));
  insert('ownCombatAtkPct',values.atk);
  insert('ownCombatRate',values.crit);
  insert('ownCombatCd',values.cd);
  insert('teamSheerForce',values.force);
}
