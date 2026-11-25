const anomalySupports={
  koleda:{name:'珂蕾妲',role:'击破 · 火',faction:3,agentId:1101,slug:'koleda',weaponId:14110,portrait:'9f0b4ef5db83ca9fb4284d3c683e69c6'},
  lycaon:{name:'莱卡恩',role:'击破 · 冰',faction:2,agentId:1141,slug:'lycaon',weaponId:14114,portrait:'e88c0535734d31e0548f04280cf27378'},
  soukaku:{name:'苍角',role:'支援 · 冰',faction:6,agentId:1131,slug:'soukaku',weaponId:13113,portrait:'a4c42f6261a3ca6fbb231fbaf81213ca'},
  lucy:{name:'露西',role:'支援 · 火',faction:4,agentId:1151,slug:'lucy',weaponId:13115,portrait:'57f3ff545ee0b1809fb8898a61f38a33'},
  yuzuha:{name:'柚叶',role:'支援 · 物理',faction:11,agentId:1411,slug:'yuzuha',weaponId:14141,portrait:'975e4ba2e4161a6e6f841b8679cb838f'},
  nangongYu:{name:'南宫羽',role:'击破 · 以太',faction:13,agentId:1511,slug:'nangong-yu',weaponId:14151,portrait:'596023bce0874c4b19d151b45866f3a7'}
};
for(const actor of Object.values(anomalySupports)){
  actor.portrait='https://cdn.gachabase.net/zzz/assets/'+actor.portrait+'.png';
  actor.engines=[['1',weaponCatalog.get(actor.weaponId).name]];
}

const sharedFactions=[
  ['lycaon','corin','ellen','rina'],
  ['qingyi','zhuyuan','seth','jane'],
  ['miyabi','soukaku','harumasa'],
  ['lucy','caesar','lighter'],
  ['yuzuha','manato','yidhari'],
  ['nangongYu','sunna']
];
const allyGroups={
  fire:['jufufu','norma','orphie','koleda','lucy','lighter'],
  ice:['zhao','lycaon','soukaku'],
  anomaly:['miyabi']
};
function otherPartyMembers(c,exclude){
  return [c.main??'sunbringer',...teammateSlots.map(slot=>c[slot+'char']??defaultTeammates[slot])].filter(id=>id!==exclude && id!=='air');
}
function sameFaction(first,second){
  return sharedFactions.some(group=>group.includes(first) && group.includes(second));
}
function partyMatches(c,exclude,{element,anomaly=false,faction=true}={}){
  return otherPartyMembers(c,exclude).some(id=>
    (faction && sameFaction(exclude,id)) || (anomaly && allyGroups.anomaly.includes(id)) ||
    (element && (id===(c.main??'sunbringer')?damageElement(c)===element:allyGroups[element]?.includes(id))));
}

const koledaCrit=[0,0,.11,.17,.23,.29,.35];
const koledaSharpCrit=[0,0,.04,.06,.08,.10,.12];
const koledaChainBonus=c=>{
  const slot=teammateSlot(c,'koleda');
  const allowed=partyMatches(c,'koleda',{element:'fire'}) || usesRupture(c) || ((c.koledaPotential??6)>=1 && usesSharp(c));
  return slot && allowed && c.stun ? .35*(c.koledaStacks??2) : 0;
};
