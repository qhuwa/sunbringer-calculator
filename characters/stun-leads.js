// GachaBase skill coefficients are stored in units of 1/10000.
const roxy={
  name:'洛克茜',role:'击破 · 风',kind:'attack',element:204,
  stat:741,crit:.194,cd:.50,ultimate:'葬夜安魂曲',
  agentId:1621,slug:'roxy',weaponId:14162,weaponSlug:'14162',ultId:1621012,chainId:1621011,
  portrait:'https://i.gachabase.net/DijdTpaLWeJmg39VwoMIkRzIVyKh8cy96PpISuBx68c/q:50/f:webp/plain/zzz/assets/386b80141590c07add669b27246d96df.png',
  engines:[['1',weaponCatalog.get(14162).name]],
  skills:[
    {id:1621007,name:'强化特殊技：小心风寒 · 滑行',type:'ex',base:1370,step:130,defaultCount:1},
    {id:1621008,name:'强化特殊技：小心风寒 · 自旋（秒）',type:'ex',base:130400,step:11860,defaultCount:2,countStep:.1},
    {id:1621023,name:'强化特殊技：敬请安息 · 风炮',type:'ex',base:3190,step:290,automatic:true},
    {id:1621021,name:'强化特殊技：敬请安息 · 额外爆炸',type:'ex',base:2610,step:240,defaultCount:3},
    {id:1621005,name:'特殊技：恕不远送',type:'special',base:25000,step:2280,defaultCount:1},
    {id:1621022,name:'风眼 · 爆鸣',type:'special',base:5210,step:480,defaultCount:3},
    {id:1621020,name:'风眼 · 巨型风旋',type:'special',base:20840,step:1900,defaultCount:1},
    {id:1621096,name:'六影 · 余响巨型风旋',type:'special',base:20840,step:1900,automatic:true},
    {id:1621011,name:'连携技：葬风巨锤',type:'chain',base:90220,step:8210,defaultCount:1},
    {id:1621012,name:'终结技：葬夜安魂曲',type:'ult',base:213150,step:19380,defaultCount:1},
    {id:1621001,name:'普通攻击：烦请留步 · 一段',type:'basic',base:5240,step:480},
    {id:1621002,name:'普通攻击：烦请留步 · 二段',type:'basic',base:10790,step:990},
    {id:1621003,name:'普通攻击：烦请留步 · 三段',type:'basic',base:17240,step:1570},
    {id:1621004,name:'普通攻击：烦请留步 · 四段',type:'basic',base:19250,step:1750},
    {id:1621006,name:'特殊技：劳驾',type:'special',base:5090,step:470},
    {id:1621019,name:'风眼 · 微型风旋',type:'special',base:5210,step:480},
    {id:1621009,name:'冲刺攻击：失礼',type:'dash',base:3560,step:330},
    {id:1621010,name:'闪避反击：礼尚往来',type:'dodge',base:39200,step:3570},
    {id:1621013,name:'快速支援：听凭差遣',type:'assist',base:10080,step:920},
    {id:1621017,name:'支援突击：午夜守则',type:'assist',base:61160,step:5560},
    {id:1621018,name:'支援技：还要加班？',type:'basic',base:3900,step:360}
  ]
};

const jufufu={
  name:'橘福福',role:'击破 · 火',kind:'attack',element:201,
  stat:765,crit:.194,cd:.50,weaponAtkPct:.30,ultimate:'猛虎炸开花',
  agentId:1391,slug:'ju-fufu',weaponId:14139,weaponSlug:'roaring-fur-nace',ultId:1391014,chainId:1391012,
  portrait:portraits[1],
  engines:[['1','福虓炉炉'],['14110','燃狱齿轮']],
  skills:[
    {id:1391007,name:'强化特殊技：恶虎七式改·下山猛虎',type:'ex',base:52650,step:4790,defaultCount:2},
    {id:1391005,name:'普通攻击：「虎威」',type:'basic',base:9240,step:840,defaultCount:2},
    {id:1391010,name:'冲刺攻击：恶虎七式·山君鼎戏 · 威势旋转',type:'dash',base:1920,step:180,defaultCount:6},
    {id:1391020,name:'连携技伤害：六影旋转爆米花（三颗）',type:'chain',base:48000,step:0,automatic:true},
    {id:1391012,name:'连携技：虎釜崩',type:'chain',base:66810,step:6080,defaultCount:1},
    {id:1391013,name:'连携技：虎釜震煞',type:'chain',base:35450,step:3230,defaultCount:2,aftershock:true},
    {id:1391014,name:'终结技：恶虎七式·猛虎炸开花',type:'ult',base:166380,step:15130,defaultCount:1},
    {id:1391001,name:'普通攻击：恶虎七式·燎身爪 · 一段',type:'basic',element:'physical',base:4250,step:390},
    {id:1391002,name:'普通攻击：恶虎七式·燎身爪 · 二段',type:'basic',element:'physical',base:4520,step:420},
    {id:1391003,name:'普通攻击：恶虎七式·燎身爪 · 三段',type:'basic',element:'physical',base:3150,step:290},
    {id:1391004,name:'普通攻击：恶虎七式·燎身爪 · 四段',type:'basic',base:21840,step:1990},
    {id:1391006,name:'特殊技：恶虎七式·下山虎',type:'special',base:6610,step:610},
    {id:1391008,name:'冲刺攻击：恶虎七式·虎奔',type:'dash',element:'physical',base:3680,step:340},
    {id:1391009,name:'冲刺攻击：恶虎七式·山君鼎戏 · 普通旋转',type:'dash',element:'physical',base:1840,step:170},
    {id:1391022,name:'冲刺攻击：恶虎七式·山君鼎戏 · 投掷「虎威」',type:'dash',base:9240,step:840},
    {id:1391011,name:'闪避反击：恶虎七式·离火回峰',type:'dodge',base:20780,step:1890},
    {id:1391015,name:'快速支援：恶虎七式·怒决蹯',type:'assist',base:7530,step:690},
    {id:1391019,name:'支援突击：恶虎七式·彪形焰颌',type:'assist',base:40720,step:3710}
  ]
};

const stunLeads={roxy,jufufu,qingyi,lycaon};
const stunLeadControls={
  roxy:[['infusion','浸染／净化暴伤覆盖'],['weathering','自身风化覆盖'],['m1','一影敬请安息减抗覆盖'],
    ['m2','二影小心风寒失衡易伤覆盖'],['m6','每次巨型风旋的余响命中次数',0,2,2]],
  jufufu:[['core','虎啸覆盖'],['potential','潜能觉醒阶数（0–6）',0,6,6],['weapon','福虓炉炉增伤层数',0,2,2],
    ['m1','一影连携命中失衡敌人的易伤覆盖']],
  ...classicStunControls
};
const roxyWeaponRes=[.15,.173,.195,.218,.24];
const roxyHeart=c=>hasAttackAlly(c);
const juLeadPotential=c=>expandedOption(c,'potential');

function stunLeadDriveSetup(actor){
  const [element,label]=elementSet[actor.element];
  const four={mountain:'山大王',bloodwing:'赤翼夜曲',woodpecker:'啄木鸟电音',hormone:'激素朋克'};
  const two={[element]:label,puffer:'河豚电音',branch:'折枝剑歌',woodpecker:'啄木鸟电音',hormone:'激素朋克'};
  if(actor===roxy || actor===lycaon)four[element]=label;
  if(actor===roxy)Object.assign(two,{bloodwing:'赤翼夜曲',swing:'摇摆爵士'});
  if(actor===qingyi)two.shockstar='震星迪斯科';
  return {skills:actor.skills,four,two,
    initial:{set:'mountain',two:element,main4:'auto',main5:'auto',main6:actor===roxy?'energy':'atk'}};
}

function stunLeadRotation(c,counts){
  if(c.main==='qingyi' || c.main==='lycaon'){
    return (skill,count,category)=>({count,coeffScalar:1,...classicStunRotation(c,skill,category)});
  }
  const m=c.w, option=key=>expandedOption(c,key);
  const roar=c.main==='jufufu' && option('core');
  const [chainFinal,ultFinal]=juPotential[roar?juLeadPotential(c):0];
  return (skill,count,category,final)=>{
    const {id,type}=skill;
    if(c.main==='roxy'){
      if(type==='ult' && m>=4)category.push(['洛克茜 · 四影 R.I.P.',.20]);
      if(id===1621023)count=counts.get(1621007);
      if(id===1621096)count=m>=6?counts.get(1621020)*option('m6'):0;
      return {count,coeffScalar:m>=6 && (id===1621020 || id===1621096)?2.5:1};
    }
    if(type==='chain'){
      if(roar)category.push(['橘福福 · 虎啸（连携）',juChainBonus]);
      if(m>=6)category.push(['橘福福 · 六影连携',.30]);
      if(chainFinal)final.push(['橘福福 · 侠肝义胆（连携）',chainFinal]);
    }
    if(type==='ult' && roar){
      category.push(['橘福福 · 虎啸（终结）',juUltimateBonus]);
      if(ultFinal)final.push(['橘福福 · 侠肝义胆（终结）',ultFinal]);
    }
    if(id===1391020)count=m>=6?counts.get(1391010):0;
    return {count,coeffScalar:1};
  };
}

function stunLeadStats(c,buffs,mains,sources){
  const wind=c.main==='roxy', m=c.w, option=key=>expandedOption(c,key);
  const has=set=>c.set===set || c.two===set;
  if(c.set==='bloodwing')sources.ownCombatCd.push(['赤翼夜曲四件',.30]);
  if(wind){
    const signature=leadSignature(c), r=weaponRankIndex(c.wr);
    const regen=1.2*(1+(signature?.60:engineStat(alternateLeadWeapon(c),'energy'))+
      (mains[5]==='energy'?.60:0)+(has('bloodwing')?.20:0)+(has('swing')?.20:0));
    sources.ownCombatAtkFlat.push(['洛克茜 · 热夜初拥（初始能量回复 '+Number(regen.toFixed(2))+'）',
      Math.min(960,5*Math.floor((regen-1.2+1e-9)/.01))]);
    if(signature){
      const name=roxy.engines[0][1];
      sources.ownCombatRate.push([name,.24+.02*r]);
      sources.ownRes.push([name,roxyWeaponRes[r]]);
    }
    if(m>=1){
      sources.ownCombatCd.push(['洛克茜 · 一影全能执事',.40]);
      if(option('m1'))sources.ownRes.push(['洛克茜 · 一影全抗降低',.15]);
    }
    if(m>=6)sources.ownRes.push(['洛克茜 · 六影风抗无视',.15]);
    if(roxyHeart(c)){
      sources.ownGeneral.push(['洛克茜 · 辉金心脏',.80]);
      if(option('weathering'))sources.ownElement.push(['洛克茜 · 风化直伤',.08]);
    }
    if(c.set==='windMetal' && option('weathering'))sources.ownGeneral.push(['呼啸沙龙四件',.18]);
  }else if(c.main==='jufufu'){
    if(m>=1)sources.ownCombatRate.push(['橘福福 · 一影',.12]);
    if(option('core'))sources.ownCombatCd.push(['橘福福 · 二影虎啸',m>=2?.22:0],['橘福福 · 四影虎啸',m>=4?.35:0]);
  }else if(c.main==='qingyi' && (hasAttackAlly(c) || partyMatches(c,'qingyi'))){
    const impact=qingyiImpact(c,mains);
    sources.ownCombatAtkFlat.push(['青衣 · 阳关三叠（冲击力 '+Number(impact.toFixed(2))+'）',Math.max(0,Math.min(600,6*(impact-120)))]);
  }else if(c.main==='lycaon' && m>=6){
    sources.ownGeneral.push(['莱卡恩 · 六影冷酷猎手',.10*option('m6')]);
  }
  const mountain=c.set==='mountain';
  const teamMountain=buffs.entries.normalCritDmg.find(([label])=>label.endsWith(' · 山大王四件'))?.[1]??0;
  const core=wind?option('infusion'):c.main==='jufufu' && option('core');
  if(!mountain && !core)return;
  return (initial,rate)=>{
    const entries=[];
    if(mountain)entries.push(['山大王四件',Math.max(0,(rate+1e-9>=.50?.30:.15)-teamMountain)]);
    if(core)entries.push(wind?['洛克茜 · 同属性浸染／净化',.40*effectiveCritRate(rate)]:
      ['橘福福 · 虎啸',.20+.05*Math.max(0,Math.min(6,Math.floor((initial-2800+1e-9)/100)))]);
    return entries;
  };
}
