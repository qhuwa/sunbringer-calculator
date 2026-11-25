function rinaBuffs(c){
  const level=c.rinaPotential??6;
  const weapon=weaponCatalog.get(c[teammateSlot(c,'rina')+'e']);
  const personalPen=Math.max(0,(c.rinaBasePen??70.4)+(weapon?100*engineStat(weapon,'pen')-24:0))+(level>=2?1.6:0);
  const defensePerPercent=[0,0,2.5,3.5,4.5,5.5,6.5][level];
  const attackPerPercent=[0,0,3,4.2,5.5,6.7,8][level];
  const defense=Math.min(468,personalPen*defensePerPercent);
  const attack=Math.min(576,personalPen*attackPerPercent);
  const teamPen=Math.min(.30,.12+personalPen*.0025)*(c[teammateSlot(c,'rina')]>=1?1.3:1);
  return {personalPen,defense,attack,teamPen};
}
const supportNames={rina:'丽娜',astra:'耀嘉音',sunna:'千夏',lucia:'卢西娅',nicole:'妮可',soukaku:'苍角',lucy:'露西',yuzuha:'柚叶'};
const stunNames={jufufu:'橘福福',roxy:'洛克茜',norma:'诺姆',trigger:'扳机',dialyn:'琉音',qingyi:'青衣',koleda:'珂蕾妲',lycaon:'莱卡恩',nangongYu:'南宫羽'};
const defenseNames={robin:'知更鸟',zhao:'照',panYinhu:'潘引壶',caesar:'凯撒'};
const evasiveAgents=new Set(['zhuyuan','billy','rina','astra','air']);
const kaboomEngine=3;
const kaboomPerStack=[.025,.028,.032,.036,.04];
const defaultTeammateDrive=id=>{
  if(Object.hasOwn(stunNames,id))return 'auto';
  if(Object.hasOwn(supportNames,id))return 'moonlight';
  return Object.hasOwn(defenseNames,id)?'snowbunny':'none';
};
const automaticStunDrive=c=>usesSharp(c)?'bloodwing':'mountain';
function equippedTeammateDrive(c,slot,id){
  const selected=c[slot+'d']??defaultTeammateDrive(id);
  return selected==='auto'?automaticStunDrive(c):selected;
}

// Each entry is also displayed in the worked example. Keep unlike multiplier groups separate.
function partyBonuses(c,custom,assault){
  const w=c.wr-1;
  const cat=isNekomata(c), silver=isAnby(c), ye=isYeShunguang(c), billy=isStarlightBilly(c), rupture=usesRupture(c), normal=usesAttack(c) && !isMiyabi(c), sharp=usesSharp(c);
  const ju=teammateSlot(c,'jufufu'), roxy=teammateSlot(c,'roxy'), norma=teammateSlot(c,'norma');
  const trigger=teammateSlot(c,'trigger'), robin=teammateSlot(c,'robin'), rina=teammateSlot(c,'rina');
  const astra=teammateSlot(c,'astra'), sunna=teammateSlot(c,'sunna'), dialyn=teammateSlot(c,'dialyn');
  const zhao=teammateSlot(c,'zhao'), orphie=teammateSlot(c,'orphie');
  const lucia=teammateSlot(c,'lucia'), pan=teammateSlot(c,'panYinhu');
  const nicole=teammateSlot(c,'nicole'), cissiaSlot=c.main==='cissia'?null:teammateSlot(c,'cissia');
  const qingyi=teammateSlot(c,'qingyi'), caesar=teammateSlot(c,'caesar');
  const koleda=teammateSlot(c,'koleda'), koledaLevel=koleda?(c.koledaPotential??6):0;
  const lycaon=teammateSlot(c,'lycaon'), lycaonAwakened=lycaon && (c.lycaonAwakened??true);
  const soukaku=teammateSlot(c,'soukaku'), lucy=teammateSlot(c,'lucy');
  const yuzuha=teammateSlot(c,'yuzuha'), nangong=teammateSlot(c,'nangongYu');
  const soukakuExtra=soukaku && partyMatches(c,'soukaku',{element:'ice'});
  const yuzuhaExtra=yuzuha && partyMatches(c,'yuzuha',{anomaly:true});
  const extraAnomaly=yuzuhaExtra?(c[yuzuha]>=1?.26:.20):0;
  const lycaonExtra=lycaon && partyMatches(c,'lycaon',{element:'ice',anomaly:lycaonAwakened});
  const nangongExtra=nangong && partyMatches(c,'nangongYu',{anomaly:true});
  const rinaBonus=rina?rinaBuffs(c):null;
  const shadow=slot=>c[slot]??0;
  const rank=slot=>(c[slot+'r']??1)-1;
  const engine=slot=>c[slot+'e']??0;

  const caesarExtra=caesar && (!evasiveAgents.has(c.main) ||
    teammateSlots.some(slot=>slot!==caesar && !evasiveAgents.has(c[slot+'char']??defaultTeammates[slot])));
  const equipped=(slot,id)=>equippedTeammateDrive(c,slot,id);
  const stunners=Object.entries(stunNames).map(([id,name])=>({name,id,slot:teammateSlot(c,id)})).filter(s=>s.slot);
  const bloodwing=stunners.find(({slot,id})=>equipped(slot,id)==='bloodwing');
  const mountain=stunners.filter(({slot,id})=>equipped(slot,id)==='mountain')
    .map(({name,slot})=>({name,bonus:(c[slot+'MountainFull']??true)?.30:.15}))
    .sort((a,b)=>b.bonus-a.bonus)[0];
  const roxyCoverage=roxy && (c.main==='severian' || (isMiyabi(c)?false:expandedLead(c)?expandedOption(c,'roxy'):cat?c.nekoRoxy:silver?c.anbyRoxy:ye?c.yeRoxy:billy?c.billyRoxy:true));
  const sunnaEngine=engine(sunna)===1;
  const back=cat && nekoBack(c);
  const supports=Object.entries(supportNames).map(([id,name])=>({id,name,slot:teammateSlot(c,id)})).filter(s=>s.slot);
  const defenders=Object.keys(defenseNames).some(id=>teammateSlot(c,id));
  const zhaoExtra=zhao && (normal || isMiyabi(c) || orphie || supports.length);
  const orphieExtra=orphie && (stunners.length || supports.length);
  const zhaoEngine=engine(zhao)===1;
  const zhaoEngineAtk=zhaoEngine?[.10,.115,.13,.145,.16][rank(zhao)]:0;
  const luciaEngine=engine(lucia)===1;
  const panExtra=pan && (rupture || ye);
  const dialynExtra=dialyn && (normal || rupture || orphie || cissiaSlot);
  const moonlight=supports.find(({slot,id})=>equipped(slot,id)==='moonlight');
  const astral=supports.find(({slot,id})=>equipped(slot,id)==='astral');
  const snowbunny=Object.entries(defenseNames).find(([id])=>{
    const slot=teammateSlot(c,id);
    return slot && equipped(slot,id)==='snowbunny';
  });
  const strongest=(team,predicate)=>team.filter(({id,slot})=>predicate(id,engine(slot))).sort((a,b)=>rank(b.slot)-rank(a.slot))[0];
  const teapot=strongest(stunners,(id,value)=>value===14125 || id==='qingyi' && value===1);
  const laurel=strongest(stunners,(_id,value)=>value===14116);
  const cannon=strongest(supports,(id,value)=>value===kaboomEngine || value===13115 || id==='lucy' && value===1);
  const bashful=strongest(supports,(id,value)=>value===13113 || id==='soukaku' && value===1);
  const metanuki=strongest(supports,(id,value)=>id==='yuzuha' && (value===1 || value===14141));
  const cradle=strongest(supports,(id,value)=>value===14121 || id==='rina' && value===1);
  const vault=strongest(supports,(id,value)=>id==='nicole' && (value===1 || value===13103) ||
    ['astra','lucia'].includes(id) && value===13103);
  const neon=strongest(stunners,(id,value)=>id==='nangongYu' && (value===1 || value===14151));
  const shield=strongest(Object.entries(defenseNames).map(([id,name])=>({id,name,slot:teammateSlot(c,id)})).filter(s=>s.slot),
    (id,value)=>id==='caesar' && value===1 || id==='robin' && value===2 || value===14107);
  const furNace=strongest(stunners,(id,value)=>value===14139 || id==='jufufu' && value===1);
  const supportElements={rina:203,astra:205,sunna:200,lucia:205,nicole:205,soukaku:202,lucy:201,yuzuha:200};
  const gameBall=strongest(supports,(id,value)=>value===14002 && c.enemyWeakness?.includes(supportElements[id]));
  const cannonBonus=cannon?kaboomPerStack[rank(cannon.slot)]*(c.kaboomStacks??4):0;
  const sun=isSunbringer(c), element=damageElement(c);
  const signature=leadSignature(c);
  const cissiaCrit=cissiaSlot && (element==='electric' || stunners.length);
  const entries={
    teamAP:[[metanuki?.name+' · 狸法七变化',metanuki?[60,69,78,87,96][rank(metanuki.slot)]:0]],
    anomalyDamage:[['柚叶 · 人多乐趣大',extraAnomaly]],
    disorderDamage:[['柚叶 · 人多乐趣大',extraAnomaly]],
    disorderBase:[['柚叶 · 六影落地生根',shadow(yuzuha)>=6?1.05*(c.yuzuhaDisorderStacks??3):0]],
    physicalGeneral:[['莱卡恩 · 掠冰（非冰伤）',lycaonAwakened && element==='ice'?.30:0]],
    teamDef:[['知更鸟 · 守护咏叹',robin?(440+30*upgradeLevel(shadow(robin)))*(c.beat?1.25:1):0],['丽娜 · 潜能觉醒',rinaBonus?.defense]],
    teamPen:[['丽娜 · 人偶共享穿透率',rinaBonus?.teamPen]],
    teamAtk:[['耀嘉音 · 如歌的行板',astra?(shadow(astra)>=2?1600:1200):0],['千夏 · 天使协律',sunna?1050:0],['丽娜 · 潜能觉醒',rinaBonus?.attack],
      ['苍角 · 展旗',soukaku?1000:0],['露西 · 加油！',lucy?600:0],['柚叶 · 狸之愿',yuzuha?1200:0],
      ['照 · 涌泉',zhao?1000:0],['奥菲丝&「鬼火」 · 准星聚焦',orphie?700:0],['凯撒 · 荣光之盾',caesar?(shadow(caesar)>=2?1500:1000):0]],
    teamAtkPct:[['千夏 · 二影帷幕',shadow(sunna)>=2?.10:0],['千夏 · 思络成歌',sunnaEngine?[.10,.115,.13,.145,.16][rank(sunna)]:0],
      [cannon?.name+' · 好斗的阿炮',cannonBonus],
      [bashful?.name+' · 含羞恶面',bashful?4*[.02,.023,.026,.029,.032][rank(bashful.slot)]:0],['照 · 二影',shadow(zhao)>=2?.15:0],['照 · 半糖雪兔',zhaoEngineAtk]],
    teamHp:[zhao?['照 · 涌泉',.05]:['卢西娅 · 涌泉',lucia?.05:0],['照 · 半糖雪兔',zhaoEngineAtk],
      ['卢西娅 · 铸梦炉歌',luciaEngine?[.15,.173,.195,.218,.24][rank(lucia)]:0]],
    sheerForce:[['卢西娅 · 破暗',lucia?900:0],['潘引壶 · 通窍',pan?(shadow(pan)>=6?720:540):0]],
    sheer:[['卢西娅 · 二影破暗',shadow(lucia)>=2?.15:0],['自定义贯穿增伤',custom.sheer]],
    teamCritRate:[[gameBall?.name+' · 逍遥游球',gameBall?[.12,.135,.155,.175,.20][rank(gameBall.slot)]:0],['妮可 · 六影侵蚀能量场',shadow(nicole)>=6?.15:0]],
    normalCritDmg:[[laurel?.name+' · 焰心桂冠',laurel && (element==='ice' || element==='fire')?20*[.015,.0172,.0195,.0217,.024][rank(laurel.slot)]:0,'element'],['珂蕾妲 · 爆破作业',koledaCrit[koledaLevel]],['露西 · 四影',shadow(lucy)>=4?.10:0],['希希芙 · 额外能力',cissiaCrit?.40:0],['橘福福 · 虎啸',ju?(shadow(ju)>=2?.72:.50):0],['扳机 · 二影',shadow(trigger)>=2?.24:0],
      [mountain?.name+' · 山大王四件',mountain?.bonus],
      ['洛克茜 · 同属性浸染',(normal || billy || rupture && expandedLead(c)) && roxyCoverage?.40:0,'element'],['耀嘉音 · 咏叹华彩',astra?.07+upgradeLevel(shadow(astra))*.015:0],
      ['琉音 · 昨夜来电',engine(dialyn)===1?[.30,.345,.39,.435,.48][rank(dialyn)]:0],
      ['照 · 半糖雪兔',zhaoEngine?[.30,.345,.39,.435,.48][rank(zhao)]:0],
      ['卢西娅 · 长夜诗篇',lucia && (rupture || stunners.length)?.30:0]],
    sharp:[['挽昼 · 蜃炎梦火',sun && signature?.10+.015*w:0],[bloodwing?.name+' · 赤翼夜曲',bloodwing?.08:0],['知更鸟 · 六影',shadow(robin)>=6?.15:0],['自定义锐化增伤',custom.sharp],['危局效果',assault.sharp]],
    critDmg:[['珂蕾妲 · 爆破作业',koledaSharpCrit[koledaLevel]],['挽昼 · 基础锐暴伤害',sun?1.50:0],['挽昼 · 众愿一心',sun && (stunners.length || defenders)?.25:0],['洛克茜 · 同属性浸染',sharp && roxyCoverage?.20:0,'element'],['知更鸟 · 星韵流彩',engine(robin)===1?[.15,.173,.195,.218,.24][rank(robin)]:0],['自定义锐暴伤害',custom.critDmg],['危局效果',assault.critDmg]],
    general:[['莱卡恩 · 掠冰（非冰伤）',lycaonAwakened && element!=='ice'?.30:0],
      ['苍角 · 额外能力（冰伤）',soukakuExtra && element==='ice'?.20:0,'element'],
      ['柚叶 · 狸之愿',yuzuha?.15:0],['柚叶 · 二影',shadow(yuzuha)>=2?.15:0],
      ['南宫羽 · 天才偶像',nangong?.25:0],[neon?.name+' · 霓虹妄想',neon?2*[.15,.17,.195,.21,.24][rank(neon.slot)]:0],
      ['挽昼 · 蜃炎梦火（火伤）',sun && signature?.20+.03*w:0],['挽昼 · 四影',sun && c.w>=4?.10:0],['挽昼 · 炎狱重金属',sun && c.two==='inferno'?.10:0],['挽昼 · 荆棘玫瑰四件',sun && c.set==='rose'?.15:0],
      ['猫又 · 钢铁肉垫（物伤）',cat && signature?.20+.05*w:0,'element'],['猫又 · 钢铁肉垫（背击）',back && signature?[.25,.315,.38,.44,.50][w]:0],
      ['猫又 · 猫步迷影',cat && c.nekoCore?.60:0],['獠牙重金属两件',c.set==='fanged' || c.two==='fanged'?.10:0,'element'],
      ['猫又 · 獠牙重金属四件',c.set==='fanged' && c.nekoDiscProc?.35:0],
      ['叶瞬光 · 合道',ye?.25+(c.w>=1?.10:0):0],
      ['叶瞬光 · 云霓孤光（开启帷幕）',ye && signature && c.yeVeilBuff?yeWeaponBonus[w]:0],
      ['沧浪行歌两件',ye && yeHasSet(c,'ballad')?.10:0,'element'],
      ['叶瞬光 · 獠牙重金属四件',ye && c.set==='fanged' && c.yeDiscProc?.35:0],
      ['零号·安比 · 电位差',silver && c.anbyMarked?.25:0],
      ['零号·安比 · 牺牲洁纯（三层电伤）',silver && signature && c.anbyWeaponStacks===3?anbyWeaponElectric[w]:0],
      ['零号·安比 · 雷暴重金属两件',silver && (c.set==='thunder' || c.two==='thunder')?.10:0],
      [furNace?.name+' · 福虓炉炉',furNace?.20+.03*rank(furNace.slot):0],['洛克茜 · 永夜辗眠',engine(roxy)===1?.20+.03*rank(roxy):0],
      ['诺姆 · 首席跟班',engine(norma)===1?2*[.125,.144,.163,.181,.20][rank(norma)]:0],['诺姆 · 嗯呢弹幕',norma?.20:0],
      ['知更鸟 · 核心技「激昂咏叹」',robin?.20:0],[snowbunny?.[1]+' · 雪兔梦游仙境（三层）',snowbunny?.18:0],
      ['知更鸟 · 星韵流彩',engine(robin)===1?2*[.085,.098,.11,.123,.136][rank(robin)]:0],
      [shield?.name+' · 奔袭獠牙',shield?[.18,.225,.27,.315,.36][rank(shield.slot)]:0],
      ['凯撒 · 战意激昂',caesarExtra?.25:0],[teapot?.name+' · 玉壶青冰',teapot?.20+.03*rank(teapot.slot):0],
      [moonlight?.name+' · 月光骑士颂四件',moonlight?.18:0],
      [astral?.name+' · 静听嘉音四件',astral?.08*(c.astralStacks??3):0],
      [cradle?.name+' · 啜泣摇篮',cradle?[.202,.245,.30,.355,.398][rank(cradle.slot)]:0],
      ['耀嘉音 · 咏叹华彩',astra?.08+upgradeLevel(shadow(astra))*.01:0],
      ['耀嘉音 · 玲珑妆匣',engine(astra)===1?[.20,.23,.26,.29,.32][rank(astra)]:0],
      ['千夏 · 思络成歌',sunnaEngine?[.25,.286,.322,.358,.40][rank(sunna)]:0],['千夏 · 四影',shadow(sunna)>=4?.18:0],
      ['琉音 · 好评如潮',dialynExtra?.40:0],
      ['照 · 凝聚力',zhaoExtra?.40:0],['奥菲丝&「鬼火」 · 一影准星聚焦',shadow(orphie)>=1?.20:0],
      ['卢西娅 · 巡梦童谣',lucia?.20:0],['卢西娅 · 铸梦炉歌',luciaEngine?[.25,.288,.325,.363,.40][rank(lucia)]:0],
      ['洛克茜 · 风化与浸染',roxyCoverage?.08:0,'targetElement'],['琉音 · 二影恶意投诉',shadow(dialyn)>=2?.15:0],
      ['妮可 · 狡兔三窟（以太）',nicole && element==='ether'?.25:0,'element'],
      [vault?.name+' · 聚宝箱',vault?[.15,.175,.20,.22,.24][rank(vault.slot)]:0],
      ['潘引壶 · 气绝',panExtra?.20:0],['潘引壶 · 一影',panExtra && shadow(pan)>=1?.10:0],
      ['自定义通用增伤',custom.general],['自定义'+elementDamageNames[element],custom.fire,'element'],
      ['危局通用增伤',assault.general],['危局火伤',element==='fire'?assault.fire:0,'element']],
    ignore:[['挽昼 · 极昼',sun?.20:0],['挽昼 · 星之碑四件',sun && c.set==='star'?.20:0],['知更鸟 · 一影重音节拍',shadow(robin)>=1 && c.beat?.20:0],['挽昼 · 六影',sun && c.w>=6?.15:0],
      ['希希芙 · 生物毒素',cissiaSlot && element==='electric'?cissiaDefenseIgnore(c.cissiaRegen??3.68,shadow(cissiaSlot)):0,'element'],['扳机 · 索魂影眸',engine(trigger)===1?[.25,.2875,.325,.3625,.40][rank(trigger)]:0],
      ['妮可 · 机关箱',nicole?.40:0],['青衣 · 一影',shadow(qingyi)>=1?.15:0],
      ['叶瞬光 · 一影',ye && c.w>=1?.20:0],['千夏 · 一影（猫的凝视）',normal && shadow(sunna)>=1?.21:0],['自定义无视防御',custom.ignore],['危局减防',assault.defDown]],
    aftershockIgnore:[['奥菲丝&「鬼火」 · 熔炉所铸',orphieExtra?.25:0]],
    resDown:[['莱卡恩 · 掠冰（冰抗）',lycaon && element==='ice'?.25:0,'element'],
      ['苍角 · 四影（冰抗）',shadow(soukaku)>=4 && element==='ice'?.10:0,'element'],
      ['柚叶 · 一影',shadow(yuzuha)>=1?.10:0],['南宫羽 · 一影',shadow(nangong)>=1?.18:0],
      ['挽昼 · 一影',sun && c.w>=1?.15:0],['希希芙 · 一影',cissiaSlot && element==='electric' && shadow(cissiaSlot)>=1?.05:0,'element'],['猫又 · 一影背击',back && c.w>=1?.16:0],['零号·安比 · 四影银白残响',silver && c.anbyMarked && c.w>=4?.12:0],['星徽·比利 · 一影英雄登场',billy && c.w>=1 && c.billyM1Active!==false?.18:0],['知更鸟 · 二影',shadow(robin)>=2?.15:0],['洛克茜 · 一影',shadow(roxy)>=1?.15:0],['诺姆 · 一影',shadow(norma)>=1?.15:0],
      ['叶瞬光 · 云霓孤光',ye && signature?yeWeaponRes[w]:0],['耀嘉音 · 一影（三层）',shadow(astra)>=1?.18:0],
      ['琉音 · 一影好评如潮',dialynExtra && shadow(dialyn)>=1?.15:0],['照 · 一影',shadow(zhao)>=1?.15:0],
      ['卢西娅 · 一影巡梦童谣',shadow(lucia)>=1?.18:0],['青衣 · 六影',shadow(qingyi)>=6?.20:0],
      ['凯撒 · 一影荣光之盾',shadow(caesar)>=1?.15:0],['危局减抗／无视抗性',assault.resDown],
      ['危局无视火抗',element==='fire'?assault.fireResDown:0,'element']],
    received:[['危局效果',assault.received],['危局锐化受伤',sharp?assault.sharpReceived:0]],
    stun:[['莱卡恩 · 额外能力',lycaonExtra?.35:0],['南宫羽 · 天使队长',nangongExtra?(shadow(nangong)>=2?.60:.30):0],['橘福福 · 一影',shadow(ju)>=1?.35:0],['橘福福 · 额外能力',(normal || rupture || orphie || cissiaSlot) && ju?.20:0],['洛克茜 · 基础失衡易伤',roxy?.30:0],['洛克茜 · 二影',shadow(roxy)>=2?.30:0],['诺姆 · 基础失衡易伤',norma?.30:0],['诺姆 · 二影',shadow(norma)>=2?.30:0],
      ['千夏 · 额外能力',normal && sunna?.30:0],['琉音 · 恶意投诉',dialyn?(shadow(dialyn)>=2?.50:.30):0],
      ['青衣 · 羁服',qingyi?(shadow(qingyi)>=2?1.08:.80):0],
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
