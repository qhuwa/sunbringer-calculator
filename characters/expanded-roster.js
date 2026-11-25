const expandedLeads={miyabi,cissia,seed,sigrid,banyue,yidhari,pyrois,severian,claret,...classicLeads,...stunLeads};
const expandedLead=c=>expandedLeads[c.main];
const isSunbringer=c=>(c.main??'sunbringer')==='sunbringer';
const partyHas=(c,ids)=>ids.some(id=>teammateSlot(c,id));
const hasSupportOrStun=c=>partyHas(c,[...Object.keys(supportNames),...Object.keys(stunNames)]);
const hasElectricAlly=c=>partyHas(c,['rina','trigger','cissia']);
const hasAttackAlly=c=>partyHas(c,['orphie','cissia']);
const elementSet={
  200:['fanged','獠牙重金属'],201:['inferno','炎狱重金属'],202:['polar','极地重金属'],203:['thunder','雷暴重金属'],
  204:['windMetal','呼啸沙龙'],205:['chaoticMetal','混沌重金属']
};

function expandedDriveSetup(actor){
  if(Object.hasOwn(stunLeads,actor.slug.replaceAll('-','')))return stunLeadDriveSetup(actor);
  if(actor===miyabi)return {skills:miyabi.skills,
    four:Object.fromEntries(['branch','polar','chaos','phaethon','woodpecker','hormone'].map(id=>[id,miyabiGear[id]])),
    two:miyabiGear,initial:{set:'branch',two:'woodpecker',main4:'auto',main5:'auto',main6:'atk'}};
  const [key,label]=elementSet[actor.element];
  const elemental={[key]:label};
  if(actor.kind==='sharp')return {skills:actor.skills,four:{rose:'荆棘玫瑰',star:'星之碑'},
    two:{...twoPieceNames,...elemental},initial:{set:'rose',two:'woodpecker',main4:'auto',main5:'auto',main6:'def'}};
  if(actor.kind==='rupture')return {skills:actor.skills,four:yiFour,two:{...yiTwo,...elemental},
    initial:{...yiInitial}};
  const attackFour={dawn:'拂晓生花',woodpecker:'啄木鸟电音',hormone:'激素朋克'};
  const keyForGear=actor.slug.replaceAll('-','');
  const four={...(actor===pyrois?{chronicle:'拂晓行纪'}:classicGear[keyForGear]),...attackFour};
  const two={...four,...elemental,puffer:'河豚电音',branch:'折枝剑歌',astral:'静听嘉音'};
  if(actor===cissia)two.swing='摇摆爵士';
  return {skills:actor.skills,four,two,initial:{
    set:actor===pyrois?'chronicle':classicDefaults[keyForGear]??'dawn',two:actor===sigrid || actor===severian?'puffer':'woodpecker',
    main4:'auto',main5:'auto',main6:'atk'
  }};
}

// Keys stay stable across releases so saved controls follow their character.
const expandedControls={
  miyabi:miyabiControls,
  cissia:[['core','毒素覆盖'],['weapon','鳞齿寻踪无视防御覆盖'],['m4','四影特殊蚀骨次数',0,99,2],['m6','六影特殊蚀骨次数',0,99,2]],
  seed:[['core','强袭与围杀覆盖（需要强攻队友）'],['weapon','机巧心种层数',0,2,2],['energy','二影衔接消耗能量',0,120,120]],
  sigrid:[['core','破阵暴击与失衡加成覆盖'],['infusion','浸染覆盖',false],['weapon','骁骑礼赞兵锋层数',0,2,2],['m1','一影溢出强化的敛枪式次数',0,99,1]],
  banyue:[['core','核心技贯穿力与伤害覆盖'],['shiver','战栗覆盖'],['stacks','明王层数',0,3,3],['weapon','怒目金刚层数',0,2,2]],
  yidhari:[['low','低于 50% 生命的满额增益覆盖'],['veil','以太帷幕·涌泉覆盖'],['weapon','海妖摇篮层数',0,3,3],['m6','六影启谛覆盖'],['followup','蓄力后衔接碎惘沉击第三段 +30%',false]],
  pyrois:[['flare','耀斑覆盖',false],['sun','阳炎覆盖',false],['infusion','浸染覆盖',false],['weapon','日蚀覆盖'],['m6','六影曜锋覆盖次数',0,99,1]],
  severian:[['weapon','禁罪囚笼普攻触发效果覆盖'],['m1','一影登场技换成连携'],['m2','二影穿透率覆盖']],
  claret:[['core','猩红铭刻覆盖'],['blade','残锋覆盖（需满足额外能力）'],['weapon','猩红渴望锐化增伤覆盖'],['dodge','锻星／伏钺极限闪避后增伤覆盖',false]],
  ...classicControls,
  ...stunLeadControls
};
for(const [id,fields] of Object.entries(expandedControls)){
  if(id!=='severian' && id!=='miyabi' && id!=='roxy')fields.push(['roxy','洛克茜同属性浸染与风化覆盖',false]);
}
const expandedOption=(c,key)=>c.expanded?.[key]??(expandedControls[c.main]?.find(field=>field[0]===key)?.at(-1)??true);
function cissiaDefenseIgnore(regen,mindscape){
  const gain=Math.max(0,Math.min(19,Math.floor((regen-1.4+1e-9)/.12)));
  return (.06+.01*gain)*(mindscape>=1?1.4:1);
}

function expandedRotation(c,stunFinisher){
  const actor=expandedLead(c), m=c.w;
  const ju=teammateSlot(c,'jufufu');
  const [chainFinal,ultFinal]=juPotential[ju?c.potential:0]??juPotential[0];
  const option=key=>expandedOption(c,key);
  const weapon=c.wr-1;
  const counts=new Map(actor.skills.map((skill,i)=>[skill.id,c.counts[i]]));
  const classic=Object.hasOwn(classicLeads,c.main)?classicRotationRules(c,actor,counts):null;
  const stunKit=Object.hasOwn(stunLeads,c.main)?stunLeadRotation(c,counts):null;
  const pyroInfusion=actor===pyrois && (option('infusion') || option('roxy') && partyHas(c,['roxy']));
  let sigridOverflow=actor===sigrid && m>=1?option('m1'):0;
  let pyroBlade=actor===pyrois && m>=6?option('m6'):0;
  return actor.skills.map((skill,i)=>{
    const {id,type,name}=skill;
    const chain=type==='chain', ult=type==='ult', basic=type==='basic', ex=type==='ex';
    let count=c.counts[i], available=true, extraIgnore=0, extraRes=0, extraPen=0, extraStun=0, critDamageBonus=0, critRateBonus=0;
    let bonusMult=0, coeffScalar=1, critThreshold=0, thresholdScale=1;
    const categorySources=[
      ['橘福福 · 虎啸',ju?(chain?juChainBonus:ult?juUltimateBonus:0):0],
      ['危局招式增伤',c.stun && (chain || ult)?stunFinisher:0]
    ];
    const sheerSources=[];
    const finalSources=[['橘福福 · 侠肝义胆',chain?chainFinal:ult?ultFinal:0]];
    if(c.set==='dawn' || c.two==='dawn'){
      categorySources.push(['拂晓生花两件',basic?.15:0],['拂晓生花四件',basic && c.set==='dawn'?.40:0]);
    }
    if(classic)({count,available,bonusMult,extraRes,extraIgnore,critDamageBonus,critRateBonus,critThreshold,thresholdScale}=classic(skill,count,categorySources));
    if(stunKit){
      ({count,coeffScalar,available=true,critDamageBonus=0}=stunKit(skill,count,categorySources,finalSources));
      if(basic && stunLeadEngine(c,14114)){
        categorySources.push(['拘缚者 · 普攻增伤',(c.expanded?.restraint??5)*(.06+.015*weaponRankIndex(c.wr))]);
      }
    }
    if(actor===cissia){
      if(id===1521019){
        bonusMult=3.35;
        const awakening=Math.min(3*(counts.get(1521006)??0), (counts.get(1521009)??0)+(counts.get(1521012)??0)+(counts.get(1521013)??0));
        count+=(m>=4?Math.min(option('m4'),awakening):0)+(m>=6?option('m6'):0);
        extraRes=m>=1?.10:0;
      }
      categorySources.push(['希希芙 · 二影蛇吻',m>=2 && id===1521006?.35:0]);
      extraIgnore=leadSignature(c) && option('weapon')?[.28,.315,.35,.385,.42][weapon]:0;
    }
    if(actor===seed){
      const ally=hasAttackAlly(c);
      const specialBasic=[1461006,1461007,1461008,1461096].includes(id);
      const collapse=[1461007,1461008].includes(id);
      categorySources.push(['「席德」 · 额外能力',ally && (specialBasic || ult)?.30:0],
        ['「席德」 · 二影铁萼雨幕衔接',m>=2 && id===1461006 && count?option('energy')/100/count:0],
        ['「席德」 · 四影围杀',m>=4 && ally && option('core') && ult?.20:0]);
      critDamageBonus=m>=1 && collapse?.30:0;
      extraRes=ally && (specialBasic || ult)?.25:0;
      extraIgnore=(m>=2 && ally && option('core')?.20:0)+(leadSignature(c) && option('weapon')===2 && (basic || ult)?.20+.03*weapon:0);
      if(id===1461096)available=m>=6 && counts.get(1461006)>0;
    }
    if(actor===sigrid){
      const windup=[1591007,1591008,1591022].indexOf(id);
      const thrust=[1591005,1591011,1591012,1591021,1591015,1591016,1591014].includes(id);
      if(windup>=0 && count){
        const overflow=Math.min(count,sigridOverflow);
        sigridOverflow-=overflow;
        bonusMult=overflow/count+(m>=6?[.80,.90,1][windup]:0);
      }
      extraStun=c.stun && option('core')?.20:0;
      extraPen=m>=2 && (thrust || windup>=0)?.24:0;
    }
    if(actor===banyue){
      const affected=[1471014,1471016,1471012,1471017,1471009,1471010].includes(id);
      const anger=[1471016,1471017,1471009,1471010].includes(id);
      sheerSources.push(['般岳 · 一影战栗',m>=1 && option('shiver') && affected?.10:0]);
      categorySources.push(['般岳 · 四影',m>=4 && anger?.30:0]);
      if(m>=6 && id===1471010)bonusMult=6;
    }
    if(actor===yidhari){
      if(ult)available=option('veil');
      extraRes=m>=1 && (basic || ex || id===1051026 || id===1051024)?.20:0;
      categorySources.push(['伊德海莉 · 蓄力衔接',id===1051003 && option('followup')?.30:0]);
      if(id===1051024)available=option('veil') && hasSupportOrStun(c);
      if(id===1051025 && !option('veil'))bonusMult=((57270-62990)+(upgradeLevel(m)-1)*(5210-5730))/10000;
    }
    if(actor===pyrois){
      if(id===1551013 && pyroInfusion)bonusMult+=9+(m>=6?10:0);
      if(id===1551016 && c.stun)bonusMult+=22.5;
      if((id===1551013 || id===1551007) && count){
        const hits=Math.min(count,pyroBlade);
        pyroBlade-=hits;
        bonusMult+=5.10*hits/count;
      }
      critDamageBonus=ult && c.stun && option('sun')?.40:0;
    }
    if(actor===severian){
      const replace=m>=1 && option('m1') && counts.get(1631019)>0;
      if(id===1631019 && replace)count--;
      if(id===1631012 && replace)count++;
      if(id===1631006 && m>=6)bonusMult=3.50;
    }
    if(actor===claret){
      const marked=option('core') || chain || ult || /支援突击|反制支援/.test(name) || id===1611096;
      critRateBonus=!option('core') && marked?.30:0;
      extraRes=m>=2 && marked?.18:0;
      if([1611013,1611015,1611096].includes(id))coeffScalar=m>=1?1.30:1;
      if(id===1611096)count=m>=6?(counts.get(actor.ultId)??0)+(counts.get(actor.chainId)??0):0;
      categorySources.push(['克拉蕾 · 四影',m>=4 && (chain || ult || [1611007,1611029].includes(id))?.20:0],
        ['克拉蕾 · 极限闪避余段',option('dodge') && [1611005,1611006,1611007,1611029,1611008].includes(id)?.15:0]);
    }
    if(!available)count=0;
    const baseMult=(skill.base+(upgradeLevel(m)-1)*skill.step)/10000*(skill.split??1);
    const mult=(baseMult+bonusMult)*coeffScalar;
    const category=sumBonuses(categorySources), final=1+sumBonuses(finalSources);
    return {name,count,available,element:skill.element,aftershock:skill.aftershock,ultimate:id===actor.ultId,source:'other',markRate:0,markWeight:0,settle:false,
      extraIgnore,extraRes,extraPen,extraStun,critDamageBonus,critRateBonus,critThreshold,thresholdScale,
      natural:{mult,baseMult,category,final,categorySources,sheerSources,finalSources,
        critSources:actor===qingyi && critDamageBonus?[['青衣 · 六影醉花月云转',critDamageBonus]]:[]},
      mult:skillOverride(c,i,'coefficient',mult),category:skillOverride(c,i,'skill',category),final:skillOverride(c,i,'final',final)};
  });
}

function expandedStats(c,buffs,mains,custom){
  const actor=expandedLead(c), r=c.wr-1, m=c.w;
  const rank=(value,step)=>value+step*r;
  const option=key=>expandedOption(c,key);
  const has=set=>c.set===set || c.two===set;
  const fourth=mains[3], fifth=mains[4], count=stat=>mains.filter(x=>x===stat).length;
  const weapon=actor.engines[0][1], name=actor.name;
  const rupture=actor.kind==='rupture';
  const yunkui=rupture?yiSetStacks(c):0;
  const branch=c.set==='branch' && c.yiFrozen;
  const supportOrStun=hasSupportOrStun(c);
  const yidhariVeil=actor===yidhari && option('veil');
  const bloom=actor===seed && hasAttackAlly(c) && option('core');
  const element=damageElement(c);
  const ownElement=[['五号位主属性',fifth===element?.30:0],
    [elementSet[actor.element][1]+'两件',actor.element!==200 && has(elementSet[actor.element][0])?.10:0],
    ['拂晓行纪两件',has('chronicle')?.10:0]];
  const statSources={
    baseAtk:[[name,actor.stat],[weapon,actor.weaponAtk??713]],
    panelAtkPct:[['驱动盘主属性',.30*count('atk')],[weapon,actor.weaponAtkPct??(actor===pyrois?.30:0)],
      ['激素朋克两件',has('hormone')?.10:0],['静听嘉音两件',has('astral')?.10:0]],
    panelAtkFlat:[['二号位主属性',316]],
    atkPctAdjustment:[['手动攻击力百分比',(c.customAtkPct??0)/100]],
    atkFlatAdjustment:[['手动固定攻击力',c.customFlatAtk??0]],
    ownCombatAtkPct:[[name+' · 影画',actor===sigrid && m>=1?.25:actor===severian && m>=4?.10:0],
      ['激素朋克四件',c.set==='hormone'?.25:0],['啄木鸟电音四件',woodpeckerAttackBonus(c)],
      ['拂晓行纪四件',c.set==='chronicle'?.10:0],[weapon,actor===severian && option('weapon')?rank(.10,.015):0]],
    ownCombatAtkFlat:[[name+' · 核心被动',bloom?1000:0],[name+' · 额外能力',actor===sigrid && supportOrStun?840:0]],
    panelRate:[['角色面板（含核心技强化）',actor.crit],['四号位主属性',fourth==='crit'?.24:0],
      ['啄木鸟电音两件',has('woodpecker')?.08:0],[weapon,actor.weaponCrit??(actor===seed || actor===severian?.24:0)]],
    panelCd:[['角色面板（含核心技强化）',actor.cd],['四号位主属性',fourth==='cd'?.48:0],
      ['折枝剑歌两件',has('branch')?.16:0],[weapon,actor.weaponCd??(actor===sigrid?.48:0)]],
    ownCombatRate:[['云岿如我四件',.04*yunkui],['折枝剑歌四件',branch?.12:0],
      [name+' · 核心被动',actor===sigrid && option('core')?.66:0],[name+' · 一影',actor===pyrois && m>=1?.08:0]],
    ownCombatCd:[['折枝剑歌四件',c.set==='branch' && actor===banyue && mains[5]==='mastery'?.30:0],['拂晓行纪四件',c.set==='chronicle'?.30:0]],
    rateAdjustment:[['手动暴击率',custom.crit]],
    cdAdjustment:[['手动暴击伤害',(c.customNormalCd??0)/100]],
    ownElement,
    ownGeneral:[],
    ownSheer:[['云岿如我四件',yunkui===3?.10:0]],
    ownRes:[],
    ownPen:[],
    ownIgnore:[]
  };
  const {ownCombatRate,ownCombatCd,ownGeneral,ownSheer,ownRes,ownPen,ownCombatAtkFlat}=statSources;
  if(Object.hasOwn(classicLeads,c.main))classicStatSources(c,actor,statSources);
  if(actor===cissia){
    const regen=1.56*(1+(leadSignature(c)?.60:engineStat(alternateLeadWeapon(c),'energy'))+(has('swing')?.20:0)+(mains[5]==='energy'?.60:0));
    ownCombatRate.push([weapon,[.25,.288,.325,.363,.40][r]]);
    if(option('core')){
      statSources.ownIgnore.push(['希希芙 · 生物毒素',cissiaDefenseIgnore(regen,m)]);
      ownRes.push(['希希芙 · 一影',m>=1?.05:0]);
    }
    ownCombatCd.push(['希希芙 · 额外能力',option('core') && (hasElectricAlly(c) || partyHas(c,Object.keys(stunNames)))?.50:0]);
  }
  if(actor===seed){
    ownCombatRate.push([weapon,rank(.15,.02)]);
    ownCombatCd.push(['「席德」 · 强袭',bloom?.30:0],['「席德」 · 六影',m>=6?.50:0]);
    ownGeneral.push(['「席德」 · 围杀',bloom?.25:0]);
    ownElement.push([weapon,option('weapon')*rank(.125,.02)]);
  }
  if(actor===sigrid){
    ownCombatCd.push([weapon,option('weapon')*rank(.32,.048)]);
    ownRes.push([weapon,option('weapon')===2?rank(.20,.03):0]);
    ownGeneral.push(['希格莉德 · 浸染',supportOrStun && (option('infusion') || option('roxy') && partyHas(c,['roxy']))?.15:0],
      ['希格莉德 · 四影巡空枪势',m>=4 && option('core')?.18:0]);
  }
  if(actor===banyue){
    ownCombatRate.push([weapon,rank(.20,.03)]);
    ownCombatCd.push(['般岳 · 核心被动',option('core')?.36+(m>=2?.15:0):0]);
    ownElement.push(['般岳 · 核心被动',option('core')?.36+(m>=2?.15:0):0],
      ['般岳 · 明王',supportOrStun?option('stacks')*(m>=6?.13:.05):0]);
    ownSheer.push([weapon,option('weapon')*rank(.09,.0135)]);
    ownRes.push(['般岳 · 一影战栗',m>=1 && option('shiver')?.10:0]);
  }
  if(actor===yidhari){
    ownCombatRate.push([weapon,option('low')?rank(.20,.03):0]);
    ownCombatCd.push(['伊德海莉 · 额外能力',supportOrStun && option('low')?.30:0],['伊德海莉 · 二影',m>=2?.40:0]);
    ownGeneral.push(['伊德海莉 · 低生命核心增伤',option('low')?1:0]);
    ownSheer.push([weapon,option('weapon')*rank(.06,.01)],['伊德海莉 · 六影启谛',m>=6 && yidhariVeil && option('m6')?.25:0]);
  }
  if(actor===pyrois){
    ownCombatRate.push([weapon,.20]);
    ownCombatCd.push(['佩洛伊斯 · 额外能力',supportOrStun?.40:0]);
    ownGeneral.push(['佩洛伊斯 · 耀斑',option('flare')?.40:0]);
    ownRes.push([weapon,option('weapon')?rank(.16,.015):0]);
  }
  if(actor===severian){
    ownCombatRate.push([weapon,rank(.20,.03)]);
    ownCombatCd.push(['赛维里安 · 核心被动',.60]);
    ownGeneral.push(['赛维里安 · 核心被动',.25],['赛维里安 · 风属性队友',partyHas(c,['roxy'])?.30:0]);
    ownRes.push([weapon,option('weapon')?[.15,.173,.195,.218,.24][r]:0],['赛维里安 · 一影',m>=1?.15:0]);
    ownPen.push(['赛维里安 · 二影',m>=2 && option('m2')?.20:0]);
  }
  if(rupture){
    statSources.baseHp=[[name,actor.hp]];
    statSources.panelHpPct=[[weapon,actor.weaponHp??.30],[name+' · 核心技强化',actor.coreHp??0],
      [name+' · 四影',actor===manato && m>=4?.08:0],['驱动盘主属性',.30*count('hp')],
      ['云岿如我两件',has('yunkui')?.10:0],['雪兔梦游仙境两件',has('snowbunny')?.10:0],
      ['手动生命值百分比',(c.customHpPct??0)/100]];
    statSources.panelHpFlat=[['一号位主属性',2200],['手动固定生命值',c.customFlatHp??0]];
    statSources.panelAtkPct.push(...statSources.atkPctAdjustment);
    statSources.panelAtkFlat.push(...statSources.atkFlatAdjustment);
    statSources.teamSheerForce=[...buffs.entries.sheerForce,
      ['般岳 · 核心被动',actor===banyue && option('core')?300:0],['手动固定贯穿力',c.customSheerForce??0]];
    const otherVeil=partyHas(c,['zhao','lucia']);
    statSources.ownBattleHp=[['伊德海莉 · 以太帷幕·涌泉',yidhariVeil && !otherVeil?.05:0],
      ['伊德海莉 · 四影涌泉',yidhariVeil && m>=4?.05:0]];
    applyLeadEngineStats(c,statSources,weapon);
    return {...ruptureStats({...buffs,teamHp:buffs.teamHp+sumBonuses(statSources.ownBattleHp)},statSources),res:sumBonuses(ownRes)};
  }
  applyLeadEngineStats(c,statSources,weapon);
  const combatCritSources=Object.hasOwn(stunLeads,c.main)?stunLeadStats(c,buffs,mains,statSources):undefined;
  const baseAtk=sumBonuses(statSources.baseAtk);
  const initialBase=baseAtk*(1+sumBonuses(statSources.panelAtkPct)+sumBonuses(statSources.atkPctAdjustment))+
    sumBonuses(statSources.panelAtkFlat)+sumBonuses(statSources.atkFlatAdjustment);
  const rate=sumBonuses(statSources.panelRate)+sumBonuses(ownCombatRate)+sumBonuses(statSources.rateAdjustment);
  const critDmg=sumBonuses(statSources.panelCd)+sumBonuses(ownCombatCd)+sumBonuses(statSources.cdAdjustment)+buffs.normalCritDmg;
  const attackPct=buffs.teamAtkPct+sumBonuses(statSources.ownCombatAtkPct);
  const severianExtra=actor===severian && (supportOrStun || partyHas(c,['cissia']));
  const combatAttackBonus=rate=>sumBonuses(ownCombatAtkFlat)+(severianExtra?850*Math.max(0,Math.min(1,rate)):0);
  return {baseAtk,initialBase,rate,critDmg,attackPct,statSources,combatAttackBonus,combatCritSources,
    bonus:1+buffs.general+sumBonuses(ownElement)+sumBonuses(ownGeneral),
    res:sumBonuses(ownRes), ignore:sumBonuses(statSources.ownIgnore),pen:sumBonuses(ownPen)};
}

function claretStats(c,buffs,mains,custom){
  const r=c.wr-1, weapon=claret.engines[0][1], has=set=>c.set===set || c.two===set;
  const alternate=alternateLeadWeapon(c);
  const name=alternate?.name??weapon;
  const baseDef=claret.stat+(alternate?engineBase(alternate,'def'):431);
  const initialEntries=[[name,alternate?engineStat(alternate,'def'):.48],['防御主属性',.48*mains.filter(stat=>stat==='def').length],
    ['荆棘玫瑰两件',has('rose')?.16:0],['星之碑两件',has('star')?.16:0],['手动防御百分比',custom.defPct]];
  const initialBase=baseDef*(1+sumBonuses(initialEntries))+184+custom.flatDef;
  const sharpCdSources=[['克拉蕾 · 基础锐暴伤害',1.50],
    ['克拉蕾 · 残锋',expandedOption(c,'blade') && (partyHas(c,Object.keys(stunNames)) || hasElectricAlly(c))?.25:0],
    ...buffs.entries.critDmg];
  const panelRate=[['克拉蕾 · 面板暴击率',claret.crit],[name,alternate?engineStat(alternate,'crit'):.25+.025*r],
    ['四号位主属性',mains[3]==='crit'?.24:0],['啄木鸟电音两件',has('woodpecker')?.08:0],['星之碑四件',c.set==='star'?.12:0]];
  const panelCd=[['基础暴伤',claret.cd],['四号位主属性',mains[3]==='cd'?.48:0],
    [name,engineStat(alternate,'cd')],['额外初始暴伤',(c.extraInitialCritDmg??0)/100]];
  const coreRate=expandedOption(c,'core')?.30:0;
  const rate=sumBonuses(panelRate)+.35*sumBonuses(panelCd)+coreRate+custom.crit;
  const ownElement=[[name,alternate?0:.15+.025*r],['五号位电伤主属性',mains[4]==='electric'?.30:0],['雷暴重金属两件',has('thunder')?.10:0]];
  const ownGeneral=[['荆棘玫瑰四件',c.set==='rose'?.15:0]];
  const ownSharp=[[name,!alternate && expandedOption(c,'weapon')?.10+.015*r:0]];
  return {baseDef,initialBase,rate,critDmg:sumBonuses(sharpCdSources),
    bonus:1+buffs.general+sumBonuses(ownElement)+sumBonuses(ownGeneral),sharp:sumBonuses(ownSharp),
    statSources:{initialEntries,sharpCdSources,panelRate,panelCd,coreRate,ownElement,ownGeneral,ownSharp}};
}
