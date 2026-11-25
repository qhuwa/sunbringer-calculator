const alternateLeadWeapon=c=>weaponCatalog.get(c.we);
const leadSignature=c=>!alternateLeadWeapon(c);
const weaponRankIndex=rank=>Math.max(0,Math.min(4,(rank??1)-1));
const engineStat=(weapon,stat)=>weapon?.stat===stat?weapon.value:0;
const engineBase=(weapon,type)=>weapon?.baseType===type?weapon.base:0;
const modeledTeamEngines=new Set([13113,13115,14107,14116,14121,14125,14139,14141,14151,14162,13103,14002]);
const modeledLeadEngines=new Set([14114,14118,14125,13008,13009,13003,14104,14119,14122,14162,12011]);
const weaponPassiveStacks={14118:3,13008:4,13003:10,14104:8};
const leadWeaponRole=c=>expandedLead(c)?.role.split(' · ')[0]??(usesSharp(c)?'锋御':usesRupture(c)?'命破':'强攻');

// The catalog supplies base and advanced stats across specialties. Passives require a specialty match.
function leadWeaponEffects(c){
  const weapon=alternateLeadWeapon(c);
  const result={atk:0,ap:0,general:0,element:0,crit:0,cd:0,res:0,disorder:0};
  if(!weapon || weapon.role!==leadWeaponRole(c))return result;
  const r=weaponRankIndex(c.wr), stacks=c.weaponStacks??weaponPassiveStacks[weapon.id]??0;
  const element=damageElement(c);
  switch(weapon.id){
    case 14122: // Timeweaver. The Disorder bonus also requires 375 AP.
      result.ap=[75,85,95,105,115][r];
      result.disorder=[.25,.275,.30,.325,.35][r];
      break;
    case 12011: // Magnetic Storm – Bravo
      result.ap=[25,28,32,36,40][r];
      break;
    case 14118: // Fusion Compiler
      result.atk=.12+.015*r;
      result.ap=stacks*[25,28,32,36,40][r];
      break;
    case 13008: // Weeping Gemini
      result.ap=stacks*[30,34,38,42,46][r];
      break;
    case 13009: // Electro-Lip Gloss, target afflicted
      result.atk=.10+.015*r;
      result.general=.15+.025*r;
      break;
    case 13003: // Rainforest Gourmet
      result.atk=stacks*[.025,.028,.032,.036,.04][r];
      break;
    case 14104: // The Brimstone
      result.atk=stacks*[.035,.044,.052,.06,.07][r];
      break;
    case 14119: // Deep Sea Visitor, normal hit and ice dash hit
      result.element=element==='ice'?[.25,.315,.38,.44,.50][r]:0;
      result.crit=element==='ice'?2*(.10+.025*r):(.10+.025*r);
      break;
    case 14162: // Everlasting Slumber
      result.crit=.24+.02*r;
      result.res=element==='wind'?roxyWeaponRes[r]:0;
      break;
  }
  return result;
}

function applyLeadEngineStats(c,sources,signatureName){
  const weapon=alternateLeadWeapon(c);
  if(!weapon)return;
  for(const [key,entries] of Object.entries(sources)){
    const remaining=entries.filter(([name])=>!name.startsWith(signatureName));
    entries.splice(0,entries.length,...remaining);
  }
  const effects=leadWeaponEffects(c);
  const insert=(key,value)=>{if(value)(sources[key]??=[]).push([weapon.name,value]);};
  insert('baseAtk',engineBase(weapon,'atk'));
  insert('panelAtkPct',engineStat(weapon,'atk'));
  insert('panelHpPct',engineStat(weapon,'hp'));
  insert('panelRate',engineStat(weapon,'crit'));
  insert('panelCd',engineStat(weapon,'cd'));
  insert('ownCombatAtkPct',effects.atk);
  insert('ownCombatRate',effects.crit);
  insert('ownCombatCd',effects.cd);
  insert('ownElement',effects.element);
  insert('ownGeneral',effects.general);
  insert('ownRes',effects.res);
}
