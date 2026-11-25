// All rates are fractions. Skill coefficients use the source's 1/10000 units.
const pct = x => (100*x).toFixed(1).replace(/\.0$/,'')+'%';
const sumBonuses=entries=>entries.reduce((sum,[,value])=>sum+value,0);
const upgradeLevel = m => 12 + 2*Number(m>=3) + 2*Number(m>=5);
const usesAttack=c=>isNekomata(c)||isAnby(c)||isYeShunguang(c);
const usesSharp=c=>!usesAttack(c) && !isYixuan(c);
const damageElement=c=>isYixuan(c)?'ether':isAnby(c)?'electric':usesAttack(c)?'physical':'fire';
const driveBlockedStats=c=>isYixuan(c)?yiDiscStats:usesAttack(c)?{atk:0,crit:1,cd:2}:blockedSubstat;
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
const teammateRotationLabels={dialyn:'琉音',norma:'诺姆'};
function teammateRotation(c){
  const cat=isNekomata(c), silver=isAnby(c), ye=isYeShunguang(c), yi=isYixuan(c), sharp=usesSharp(c);
  const roster=cat?nekomataSkills:silver?anbySkills:ye?yeSkills:yi?yiSkills:skills;
  const dialyn=teammateSlot(c,'dialyn'), norma=teammateSlot(c,'norma');
  const addUltimate=dialyn && (c[dialyn+'ExtraRotation']??true);
  const addChains=norma && (c[norma+'ExtraRotation']??true);
  return roster.map(s=>{
    if(addUltimate){
      // Dialyn's free cast opens Ye's veil. The follow-up ultimate requires decibels.
      const yeFollowUps=ye && s.veil && s.defaultCount && ['basic','flight'].includes(s.type);
      const count=sharp?Number(s.name.startsWith('终结技')):yeFollowUps?s.defaultCount:Number(s.type==='ult');
      if(count)return {id:'dialyn',count};
    }
    if(addChains){
      const count=sharp?Number(s.name.startsWith('连携技')):s.type==='chain' && (!ye || s.veil)?2:0;
      if(count)return {id:'norma',count};
    }
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
  const attackPerPercent=[0,0,3,4.2,5.5,6.7,8][level];
  const defense=Math.min(468,personalPen*defensePerPercent);
  const attack=Math.min(576,personalPen*attackPerPercent);
  const teamPen=Math.min(.30,.12+personalPen*.0025)*(c[teammateSlot(c,'rina')]>=1?1.3:1);
  return {personalPen,defense,attack,teamPen};
}
const supportNames={rina:'丽娜',astra:'耀嘉音',sunna:'千夏',lucia:'卢西娅',nicole:'妮可'};
const stunNames={jufufu:'橘福福',roxy:'洛克茜',norma:'诺姆',trigger:'扳机',dialyn:'琉音'};
const defenseNames={robin:'知更鸟',zhao:'照',panYinhu:'潘引壶'};
const kaboomEngine=3;
const kaboomPerStack=[.025,.028,.032,.036,.04];
const defaultTeammateDrive=id=>{
  if(Object.hasOwn(stunNames,id))return 'auto';
  if(Object.hasOwn(supportNames,id))return 'moonlight';
  return Object.hasOwn(defenseNames,id)?'snowbunny':'none';
};
const automaticStunDrive=c=>(c.main??'sunbringer')==='sunbringer'?'bloodwing':'mountain';
function equippedTeammateDrive(c,slot,id){
  const selected=c[slot+'d']??defaultTeammateDrive(id);
  return selected==='auto'?automaticStunDrive(c):selected;
}

// Each entry is also displayed in the worked example. Keep unlike multiplier groups separate.
function partyBonuses(c,custom,assault){
  const w=c.wr-1;
  const cat=isNekomata(c), silver=isAnby(c), ye=isYeShunguang(c), yi=isYixuan(c), normal=usesAttack(c), sharp=usesSharp(c);
  const ju=teammateSlot(c,'jufufu'), roxy=teammateSlot(c,'roxy'), norma=teammateSlot(c,'norma');
  const trigger=teammateSlot(c,'trigger'), robin=teammateSlot(c,'robin'), rina=teammateSlot(c,'rina');
  const astra=teammateSlot(c,'astra'), sunna=teammateSlot(c,'sunna'), dialyn=teammateSlot(c,'dialyn');
  const zhao=teammateSlot(c,'zhao'), orphie=teammateSlot(c,'orphie');
  const lucia=teammateSlot(c,'lucia'), pan=teammateSlot(c,'panYinhu');
  const nicole=teammateSlot(c,'nicole');
  const rinaBonus=rina?rinaBuffs(c):null;
  const shadow=slot=>c[slot]??0;
  const rank=slot=>(c[slot+'r']??1)-1;
  const engine=slot=>c[slot+'e']??0;
  const equipped=(slot,id)=>equippedTeammateDrive(c,slot,id);
  const stunners=Object.entries(stunNames).map(([id,name])=>({name,id,slot:teammateSlot(c,id)})).filter(s=>s.slot);
  const bloodwing=stunners.find(({slot,id})=>equipped(slot,id)==='bloodwing');
  const mountain=stunners.filter(({slot,id})=>equipped(slot,id)==='mountain')
    .map(({name,slot})=>({name,bonus:(c[slot+'MountainFull']??true)?.30:.15}))
    .sort((a,b)=>b.bonus-a.bonus)[0];
  const roxyCoverage=roxy && (cat?c.nekoRoxy:silver?c.anbyRoxy:ye?c.yeRoxy:true);
  const sunnaEngine=engine(sunna)===1;
  const back=cat && nekoBack(c);
  const supports=Object.entries(supportNames).map(([id,name])=>({id,name,slot:teammateSlot(c,id)})).filter(s=>s.slot);
  const defenders=Object.keys(defenseNames).some(id=>teammateSlot(c,id));
  const zhaoExtra=zhao && (normal || orphie || supports.length);
  const orphieExtra=orphie && (stunners.length || supports.length);
  const zhaoEngine=engine(zhao)===1;
  const zhaoEngineAtk=zhaoEngine?[.10,.115,.13,.145,.16][rank(zhao)]:0;
  const luciaEngine=engine(lucia)===1;
  const panExtra=pan && (yi || ye);
  const dialynExtra=dialyn && (normal || yi || orphie);
  const moonlight=supports.find(({slot,id})=>equipped(slot,id)==='moonlight');
  const astral=supports.find(({slot,id})=>equipped(slot,id)==='astral');
  const snowbunny=Object.entries(defenseNames).find(([id])=>{
    const slot=teammateSlot(c,id);
    return slot && equipped(slot,id)==='snowbunny';
  });
  const cannon=supports.filter(({slot})=>engine(slot)===kaboomEngine).sort((a,b)=>rank(b.slot)-rank(a.slot))[0];
  const cannonBonus=cannon?kaboomPerStack[rank(cannon.slot)]*(c.kaboomStacks??4):0;
  const entries={
    teamDef:[['知更鸟 · 守护咏叹',robin?(440+30*upgradeLevel(shadow(robin)))*(c.beat?1.25:1):0],['丽娜 · 潜能觉醒',rinaBonus?.defense]],
    teamPen:[['丽娜 · 人偶共享穿透率',rinaBonus?.teamPen]],
    teamAtk:[['耀嘉音 · 如歌的行板',astra?(shadow(astra)>=2?1600:1200):0],['千夏 · 天使协律',sunna?1050:0],['丽娜 · 潜能觉醒',rinaBonus?.attack],
      ['照 · 涌泉',zhao?1000:0],['奥菲丝&「鬼火」 · 准星聚焦',orphie?700:0]],
    teamAtkPct:[['千夏 · 二影帷幕',shadow(sunna)>=2?.10:0],['千夏 · 思络成歌',sunnaEngine?[.10,.115,.13,.145,.16][rank(sunna)]:0],
      [cannon?.name+' · 好斗的阿炮',cannonBonus],['照 · 二影',shadow(zhao)>=2?.15:0],['照 · 半糖雪兔',zhaoEngineAtk]],
    teamHp:[zhao?['照 · 涌泉',.05]:['卢西娅 · 涌泉',lucia?.05:0],['照 · 半糖雪兔',zhaoEngineAtk],
      ['卢西娅 · 铸梦炉歌',luciaEngine?[.15,.173,.195,.218,.24][rank(lucia)]:0]],
    sheerForce:[['卢西娅 · 破暗',lucia?900:0],['潘引壶 · 通窍',pan?(shadow(pan)>=6?720:540):0]],
    sheer:[['卢西娅 · 二影破暗',shadow(lucia)>=2?.15:0]],
    teamCritRate:[['妮可 · 六影侵蚀能量场',shadow(nicole)>=6?.15:0]],
    normalCritDmg:[['橘福福 · 虎啸',ju?(shadow(ju)>=2?.72:.50):0],['扳机 · 二影',shadow(trigger)>=2?.24:0],
      [mountain?.name+' · 山大王四件',mountain?.bonus],
      [silver?'洛克茜 · 电浸染':'洛克茜 · 物理浸染',normal && roxyCoverage?.40:0],['耀嘉音 · 咏叹华彩',astra?.07+upgradeLevel(shadow(astra))*.015:0],
      ['琉音 · 昨夜来电',engine(dialyn)===1?[.30,.345,.39,.435,.48][rank(dialyn)]:0],
      ['照 · 半糖雪兔',zhaoEngine?[.30,.345,.39,.435,.48][rank(zhao)]:0],
      ['卢西娅 · 长夜诗篇',lucia && (yi || stunners.length)?.30:0]],
    sharp:[['挽昼 · 蜃炎梦火',.10+.015*w],[bloodwing?.name+' · 赤翼夜曲',bloodwing?.08:0],['知更鸟 · 六影',shadow(robin)>=6?.15:0],['自定义锐化增伤',custom.sharp],['危局效果',assault.sharp]],
    critDmg:[['挽昼 · 基础锐暴伤害',1.50],['挽昼 · 众愿一心',stunners.length || defenders?.25:0],['洛克茜 · 火浸染',roxy?.20:0],['知更鸟 · 星韵流彩',engine(robin)===1?[.15,.173,.195,.218,.24][rank(robin)]:0],['自定义锐暴伤害',custom.critDmg],['危局效果',assault.critDmg]],
    general:[['挽昼 · 蜃炎梦火（火伤）',sharp?.20+.03*w:0],['挽昼 · 四影',sharp && c.w>=4?.10:0],['挽昼 · 炎狱重金属',c.two==='inferno'?.10:0],['挽昼 · 荆棘玫瑰四件',c.set==='rose'?.15:0],
      ['猫又 · 钢铁肉垫（物伤）',cat?.20+.05*w:0,'element'],['猫又 · 钢铁肉垫（背击）',back?[.25,.315,.38,.44,.50][w]:0],
      ['猫又 · 猫步迷影',cat && c.nekoCore?.60:0],['獠牙重金属两件',c.set==='fanged' || c.two==='fanged'?.10:0,'element'],
      ['猫又 · 獠牙重金属四件',c.set==='fanged' && c.nekoDiscProc?.35:0],
      ['叶瞬光 · 合道',ye?.25+(c.w>=1?.10:0):0],
      ['叶瞬光 · 云霓孤光（开启帷幕）',ye && c.yeVeilBuff?yeWeaponBonus[w]:0],
      ['沧浪行歌两件',ye && yeHasSet(c,'ballad')?.10:0,'element'],
      ['叶瞬光 · 獠牙重金属四件',ye && c.set==='fanged' && c.yeDiscProc?.35:0],
      ['零号·安比 · 电位差',silver && c.anbyMarked?.25:0],
      ['零号·安比 · 牺牲洁纯（三层电伤）',silver && c.anbyWeaponStacks===3?anbyWeaponElectric[w]:0],
      ['零号·安比 · 雷暴重金属两件',c.set==='thunder' || c.two==='thunder'?.10:0],
      ['橘福福 · 福虓炉炉',engine(ju)===1?.20+.03*rank(ju):0],['洛克茜 · 永夜辗眠',engine(roxy)===1?.20+.03*rank(roxy):0],
      ['诺姆 · 首席跟班',engine(norma)===1?2*[.125,.144,.163,.181,.20][rank(norma)]:0],['诺姆 · 嗯呢弹幕',norma?.20:0],
      ['知更鸟 · 核心技「激昂咏叹」',robin?.20:0],[snowbunny?.[1]+' · 雪兔梦游仙境（三层）',snowbunny?.18:0],
      ['知更鸟 · 星韵流彩',engine(robin)===1?2*[.085,.098,.11,.123,.136][rank(robin)]:0],['知更鸟 · 奔袭獠牙',engine(robin)===2?[.18,.225,.27,.315,.36][rank(robin)]:0],
      [moonlight?.name+' · 月光骑士颂四件',moonlight?.18:0],
      [astral?.name+' · 静听嘉音四件',astral?.08*(c.astralStacks??3):0],
      ['丽娜 · 啜泣摇篮',engine(rina)===1?[.202,.245,.30,.355,.398][rank(rina)]:0],
      ['耀嘉音 · 咏叹华彩',astra?.08+upgradeLevel(shadow(astra))*.01:0],
      ['耀嘉音 · 玲珑妆匣',engine(astra)===1?[.20,.23,.26,.29,.32][rank(astra)]:0],
      ['千夏 · 思络成歌',sunnaEngine?[.25,.286,.322,.358,.40][rank(sunna)]:0],['千夏 · 四影',shadow(sunna)>=4?.18:0],
      ['琉音 · 好评如潮',dialynExtra?.40:0],
      ['照 · 凝聚力',zhaoExtra?.40:0],['奥菲丝&「鬼火」 · 一影准星聚焦',shadow(orphie)>=1?.20:0],
      ['卢西娅 · 巡梦童谣',lucia?.20:0],['卢西娅 · 铸梦炉歌',luciaEngine?[.25,.288,.325,.363,.40][rank(lucia)]:0],
      ['自定义通用增伤',custom.general],[yi?'自定义以太伤害':silver?'自定义电伤':normal?'自定义物伤':'自定义火伤',custom.fire,'element'],
      ['危局通用增伤',assault.general],['危局火伤',sharp?assault.fire:0]],
    ignore:[['挽昼 · 极昼',sharp?.20:0],['挽昼 · 星之碑四件',c.set==='star'?.20:0],['知更鸟 · 一影重音节拍',shadow(robin)>=1 && c.beat?.20:0],['挽昼 · 六影',sharp && c.w>=6?.15:0],['扳机 · 索魂影眸',engine(trigger)===1?[.25,.2875,.325,.3625,.40][rank(trigger)]:0],
      ['妮可 · 机关箱',nicole?.40:0],
      ['叶瞬光 · 一影',ye && c.w>=1?.20:0],['千夏 · 一影（猫的凝视）',normal && shadow(sunna)>=1?.21:0],['自定义无视防御',custom.ignore],['危局减防',assault.defDown]],
    aftershockIgnore:[['奥菲丝&「鬼火」 · 熔炉所铸',orphieExtra?.25:0]],
    resDown:[['挽昼 · 一影',sharp && c.w>=1?.15:0],['猫又 · 一影背击',back && c.w>=1?.16:0],['零号·安比 · 四影银白残响',silver && c.anbyMarked && c.w>=4?.12:0],['知更鸟 · 二影',shadow(robin)>=2?.15:0],['洛克茜 · 一影',shadow(roxy)>=1?.15:0],['诺姆 · 一影',shadow(norma)>=1?.15:0],
      ['叶瞬光 · 云霓孤光',ye?yeWeaponRes[w]:0],['耀嘉音 · 一影（三层）',shadow(astra)>=1?.18:0],
      ['琉音 · 一影好评如潮',dialynExtra && shadow(dialyn)>=1?.15:0],['照 · 一影',shadow(zhao)>=1?.15:0],
      ['卢西娅 · 一影巡梦童谣',shadow(lucia)>=1?.18:0],['危局减抗／无视抗性',assault.resDown],
      ['危局无视火抗',sharp?assault.fireResDown:0]],
    received:[['洛克茜 · 目标受伤',roxyCoverage?.08:0],['琉音 · 二影恶意投诉',shadow(dialyn)>=2?.15:0],
      ['妮可 · 狡兔三窟（以太）',nicole && damageElement(c)==='ether'?.25:0],
      ['妮可 · 聚宝箱',engine(nicole)===1?[.15,.175,.20,.22,.24][rank(nicole)]:0],
      ['潘引壶 · 气绝',panExtra?.20:0],['潘引壶 · 一影',panExtra && shadow(pan)>=1?.10:0],['危局效果',assault.received],
      ['危局锐化受伤',sharp?assault.sharpReceived:0]],
    stun:[['橘福福 · 一影',shadow(ju)>=1?.35:0],['橘福福 · 额外能力',(normal || yi) && ju?.20:0],['洛克茜 · 基础失衡易伤',roxy?.30:0],['洛克茜 · 二影',shadow(roxy)>=2?.30:0],['诺姆 · 基础失衡易伤',norma?.30:0],['诺姆 · 二影',shadow(norma)>=2?.30:0],
      ['千夏 · 额外能力',normal && sunna?.30:0],['琉音 · 恶意投诉',dialyn?(shadow(dialyn)>=2?.50:.30):0],
      ['危局效果',assault.stun],['自定义失衡易伤',custom.stun]],
    stunAlways:[['扳机 · 破隙幽瞳',trigger?.35:0],['扳机 · 一影',shadow(trigger)>=1?.20:0]]
  };
  const totals={};
  for(const key of Object.keys(entries)){
    entries[key]=entries[key].filter(([,value])=>value);
    totals[key]=sumBonuses(entries[key]);
  }
  return {entries,...totals};
}
function solve(c,fixedBuild=null,searchMains=null){
  const cat=isNekomata(c), silver=isAnby(c), ye=isYeShunguang(c), yi=isYixuan(c), normal=!usesSharp(c);
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
  const extraCasts=teammateRotation(c);
  const counts=c.counts.map((count,i)=>count+(extraCasts[i]?.count??0));
  const w=c.wr-1;
  const buffs=partyBonuses(c,custom,assault);
  const {teamDef,critDmg,ignore}=buffs;
  const makeRotation=yi?yiRotation:ye?yeRotation:silver?anbyRotation:cat?nekomataRotation:rotation;
  const rows=makeRotation({...c,counts},assault.stunFinisher).map(row=>({
    ...row,extraIgnore:(row.extraIgnore??0)+(row.aftershock?buffs.aftershockIgnore:0)
  }));
  const lastRelease=rows.findLastIndex(row=>row.settle && row.count);
  const resist=1-c.res/100+buffs.resDown;
  const received=1+buffs.received;
  const stun=(c.stun?c.vuln/100+buffs.stun:1)+buffs.stunAlways;
  const veil=ye?yeVeilFactor(c,buffs):stun;
  const remainingDefense=(extraIgnore,penRate)=>yi?0:c.enemy*(1-ignore-extraIgnore)*(1-penRate);
  const defenseFactor=(def,flatPen)=>794/(794+Math.max(0,def-flatPen));
  let best=null;
  const main4=fixedBuild?.mains[3]??c.main4, main5=fixedBuild?.mains[4]??c.main5;
  const scalingStat=yi?'hp':normal?'atk':'def';
  const fourth=searchMains?.main4 || main4==='auto'?[scalingStat,'crit','cd']:[main4];
  const fifth=searchMains?.main5 || main5==='auto'?[scalingStat,damageElement(c),...(yi?[]:['pen'])]:[main5];
  const sixth=searchMains?.main6?[scalingStat]:[fixedBuild?.mains[5]??c.main6];
  const blockedStats=driveBlockedStats(c);
  for(const four of fourth)for(const five of fifth)for(const six of sixth){
    const mains=['flatHp','flatAtk','flatDef',four,five,six];
    const blocked=mains.map(stat=>blockedStats[stat]??-1);
    const caps=lockedRolls.map((n,i)=>Math.min(n??Infinity,tripleLimit,pairLimit,singleLimit,6*blocked.filter(x=>x!==i).length));
    const capacity=Math.min(rollBudget,Math.floor(4*tripleLimit/3),2*pairLimit,54-blocked.filter(stat=>stat>=0).length,caps.reduce((sum,n)=>sum+n,0));
    if(capacity<minimumCount || minimumRolls.some((n,i)=>n>caps[i]))continue;
    const attackStats=yi?yiStats(c,buffs,mains,custom):ye?yeStats(c,buffs,mains,custom):silver?anbyStats(c,buffs,mains,custom):cat?nekomataStats(c,buffs,mains,custom):null;
    const bonus=attackStats?.bonus??1+buffs.general+(five==='fire'?.30:0);
    const aftershockShare=attackStats?.aftershockCritShare??0;
    const penRate=yi?0:(five==='pen'?.24:0)+(c.two==='puffer'?.08:0)+buffs.teamPen+custom.pen;
    // Group only dynamic factors. Overrides are already part of damageWeight.
    const buckets=new Map();
    const factors=rows.map((row,i)=>{
      const generic=skillOverride(c,i,'generic',bonus), sharpFactor=normal?1:skillOverride(c,i,'sharp',1+buffs.sharp);
      const resistFactor=skillOverride(c,i,'resist',resist+(row.extraRes??0)), stunFactor=skillOverride(c,i,'stun',row.veil?veil:stun);
      const receivedFactor=skillOverride(c,i,'received',received);
      const fixed=row.mult*(generic+row.category)*row.final*receivedFactor*sharpFactor*resistFactor*stunFactor;
      const critOverride=c.skillOverrides?.[i]?.crit, defOverride=c.skillOverrides?.[i]?.defense;
      const settled=i<=lastRelease?row.markWeight*(row.ultimate && c.w>=6?1.8:1):0;
      const damageWeight=fixed*(row.count+settled)*(critOverride??1)*(defOverride??1);
      if(damageWeight){
        const defKey=defOverride==null?row.extraIgnore:null;
        if(!buckets.has(defKey))buckets.set(defKey,[0,0,0]);
        const critKey=critOverride!=null?0:row.aftershock?2:1;
        buckets.get(defKey)[critKey]+=damageWeight;
      }
      return {fixed,generic,sharp:sharpFactor,resist:resistFactor,stun:stunFactor,received:receivedFactor};
    });
    const defMains=mains.filter(stat=>stat==='def').length;
    const setDefense=.16+(c.two==='rose' && c.set!=='rose'?.16:0);
    const initialBase=attackStats?.initialBase??887*(1+.48+setDefense+.48*defMains+custom.defPct)+184+custom.flatDef;
    const critBase=attackStats?.rate??.338+.40+.20+.02*w+(four==='crit'?.24:0)+.35*(.50+(four==='cd'?.48:0)+(c.extraInitialCritDmg??0)/100)+(c.two==='woodpecker'?.08:0)+custom.crit;
    const critDamage=attackStats?.critDmg??critDmg;
    const weights=Array.from(buckets,([extraIgnore,values])=>[extraIgnore==null?null:remainingDefense(extraIgnore,penRate),values]);
    const candidates=[];
    function evaluateRolls(d,cr,cd,pen){
        // The largest triple leaves out the smallest count. The largest pair is
        // either one of these two pairs or a combination of their larger members.
        const total=d+cr+cd+pen;
        if(total>capacity || total-Math.min(d,cr,cd,pen)>tripleLimit)return;
        if(Math.max(d+cr,cd+pen,Math.max(d,cr)+Math.max(cd,pen))>pairLimit)return;
        const initial=initialBase+(yi?attackStats.hpRollForce*d+attackStats.atkRollForce*pen:
          (normal?attackStats.baseAtk*atkRoll:887*discRoll.def)*d);
        const rate=critBase+buffs.teamCritRate+discRoll.crit*cr+(normal?0:.35*discRoll.cd*cd+(c.set==='star'?.12:initial>=1800?.16:initial>=1000?.08:0));
        if(c.requireFullCrit && rate<(normal?1:2)-1e-10)return;
        const cdValue=critDamage+(normal?discRoll.cd*cd:0);
        const crit=normal?1+Math.max(0,Math.min(1,rate))*cdValue:expectedSharpCrit(rate,cdValue);
        const aftershockExtra=(crit-1)*aftershockShare;
        const flatPen=yi?0:discRoll.pen*pen+(c.extraFlatPen??0);
        const combatStat=yi?attackStats.combatWithRolls(d,pen):normal?initial+attackStats.baseAtk*attackStats.attackPct+buffs.teamAtk:initial*(1+assault.def)+teamDef;
        let weightedDamage=0;
        for(const [def,[fixed,ordinary,aftershock]] of weights){
          const defense=def==null?1:defenseFactor(def,flatPen);
          weightedDamage+=defense*(fixed+ordinary*crit+aftershock*(crit+aftershockExtra));
        }
        const score=combatStat*weightedDamage;
        if(best && score<=best.score)return;
        candidates.push({score,rolls:[d,cr,cd,pen],initial,combatStat,rate,critFactor:crit,aftershockExtra,aftershockShare,critDmg:cdValue,flatPen});
    }
    // Visit fuller builds first. A lower roll count can win if main/substat
    // exclusions prevent extending the best allocation to the next count.
    function chooseFeasible(){
      candidates.sort((a,b)=>b.score-a.score);
      for(const candidate of candidates){
        const discs=fixedBuild?.discs??makeDiscs(candidate.rolls,blocked);
        if(discs){
          best={...candidate,discs,mains,penRate,bonus,teamDef,ignore:yi?1:ignore,factors,statSources:attackStats?.statSources};
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
    const crit=skillOverride(c,i,'crit',best.critFactor+(r.aftershock?best.aftershockExtra:0));
    const automaticDefense=defenseFactor(remainingDefense(r.extraIgnore,best.penRate),best.flatPen);
    const defense=skillOverride(c,i,'defense',automaticDefense);
    const unit=best.combatStat*factors.fixed*crit*defense;
    const direct=unit*r.count, accrued=unit*r.markWeight;
    pendingMark+=accrued;
    let mark=0;
    if(r.settle && r.count){mark=pendingMark;pendingMark=0;if(r.ultimate&&c.w>=6)mark+=accrued*.8;}
    return {...r,extraCast:extraCasts[i],automaticDefense,unit,base:r.mult*r.count,direct,accrued,mark,display:{...factors,coefficient:r.mult,skill:r.category,final:r.final,crit,defense,mark:r.markRate}};
  });
  const direct=details.reduce((a,x)=>a+x.direct,0), mark=details.reduce((a,x)=>a+x.mark,0);
  const mainScore=direct+mark;
  const teammateCoefficients=teammateSlots.filter(slot=>c[slot+'char']!=='air').map(slot=>({
    slot,coefficient:c[slot+'DamageCoefficient']??0
  }));
  const teamFactor=1+teammateCoefficients.reduce((sum,{coefficient})=>sum+coefficient,0);
  const score=mainScore*teamFactor;
  return {...best,combatDef:normal?0:best.combatStat,buffSources:buffs.entries,rows:details,direct,mark,mainScore,teammateCoefficients,teamFactor,counts,score};
}

