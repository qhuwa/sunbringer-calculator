// Agent 1531, W-Engine 14153. Skill values use 1/10000 units.
const starlightBilly={name:'星徽·比利',role:'命破 · 物理',element:200,ultimate:'骑士飞踢',
  portrait:'https://i.gachabase.net/jth79Fitbamyy-AehqnC_SL0w9RtbFR8H1O9En7F7Bw/q:50/f:webp/plain/zzz/assets/42114d964bff0b5dcea4ff6f71594b85.png',
  engines:[['1','辉骑面铠']]};
const isStarlightBilly=c=>c.main==='starlightBilly';
const billyFour=yiFour;
const billyTwo={...billyFour,snowbunny:'雪兔梦游仙境',fanged:'獠牙重金属',hormone:'激素朋克',astral:'静听嘉音'};
const billyInitial={...yiInitial};
const billySkills=[
  {name:'普通攻击：骑士斗技（一段）',base:5030,step:460,defaultCount:1},
  {name:'普通攻击：骑士斗技（二段）',base:6800,step:620,defaultCount:1},
  {name:'普通攻击：骑士斗技（三段）',base:5450,step:500,defaultCount:1},
  {name:'普通攻击：骑士斗技（四段）',type:'basic4',base:20600,step:1880,defaultCount:1},
  {name:'特殊技：动力压制（单次命中）',base:5200,step:480,defaultCount:2},
  {name:'强化特殊技：孤轮特技',type:'lone',base:38970,step:3550,defaultCount:2},
  {name:'强化特殊技：摇曳步伐',type:'ex',base:95900,step:8720,defaultCount:1},
  {name:'特殊技：脱缰',base:7210,step:660,defaultCount:1},
  {name:'连携技：骑士漫步',type:'chain',base:66290,step:6030,defaultCount:1},
  {name:'普通攻击：最高马力星光',type:'starlight',base:104320,step:9490,defaultCount:1},
  {name:'终结技：骑士飞踢',type:'ult',base:159210,step:14480,defaultCount:1},
  {name:'强化特殊技：抓地轮毂',type:'ex',base:92990,step:8460},
  {name:'冲刺攻击：星-徽-惩-戒',base:4510,step:410},
  {name:'闪避反击：决斗之王',base:11950,step:1090},
  {name:'闪避反击：尾焰全旋',base:19870,step:1810},
  {name:'快速支援：星徽-羁绊之力',base:9200,step:840},
  {name:'招架支援：英雄登台',base:0,step:0},
  {name:'支援突击：反派退场',base:22960,step:2090}
];

function billyRotation(c,stunFinisher){
  const ju=teammateSlot(c,'jufufu');
  const [chainFinal,ultFinal]=juPotential[ju?c.potential:0]??juPotential[0];
  const extra=Object.keys(stunNames).concat(Object.keys(defenseNames),Object.keys(supportNames)).some(id=>teammateSlot(c,id));
  const stars=extra?(c.billyStars??2):0;
  let brilliant=c.w>=6?(c.billyBrilliant??0):0;
  return billySkills.map((skill,i)=>{
    const {type,name}=skill;
    const count=c.counts[i];
    const chain=type==='chain', ultimate=type==='ult', lone=type==='lone';
    const finisher=ultimate || type==='starlight';
    const special=lone || type==='ex';
    if(c.w>=6 && (type==='basic4' || lone || chain))brilliant=Math.min(6,brilliant+count);
    const spent=finisher?Math.min(brilliant,2*count):0;
    brilliant-=spent;
    const baseMult=(skill.base+(upgradeLevel(c.w)-1)*skill.step)/10000;
    const mult=baseMult+(count?spent/count:0);
    const turbo=c.w>=2 && lone?Math.min(count,c.billyTurboCasts??1):0;
    const critDamageBonus=count?.50*turbo/count:0;
    const categorySources=[
      ['星徽·比利 · 炽热星辉',chain || finisher || special?.20*stars:0],
      ['星徽·比利 · 二影荒原机兵',c.w>=2 && (finisher || lone)?.50:0],
      ['橘福福 · 虎啸',ju?(chain?juChainBonus:ultimate?juUltimateBonus:0):0],
      ['危局招式增伤',c.stun && (chain || ultimate)?stunFinisher:0]
    ];
    const sheerSources=[['星徽·比利 · 六影星徽骑士',c.w>=6 && finisher?.18:0]];
    const finalSources=[['橘福福 · 侠肝义胆',chain?chainFinal:ultimate?ultFinal:0]];
    const category=sumBonuses(categorySources), final=1+sumBonuses(finalSources);
    return {name,count,ultimate,critDamageBonus,source:'other',markRate:0,markWeight:0,settle:false,
      natural:{mult,baseMult,spent,category,final,categorySources,sheerSources,finalSources},
      mult:skillOverride(c,i,'coefficient',mult),category:skillOverride(c,i,'skill',category),final:skillOverride(c,i,'final',final)};
  });
}

function billyStats(c,buffs,mains,custom){
  const fourth=mains[3], fifth=mains[4], rank=c.wr-1;
  const hasSet=set=>yiSet(c,set);
  const weaponStacks=c.billyWeaponStacks??2;
  const setStacks=yiSetStacks(c);
  const frozen=c.set==='branch' && c.yiFrozen;
  const statSources={
    baseHp:[['星徽·比利（Lv.60）',8497]],
    panelHpPct:[['辉骑面铠',.30],['生命值主属性',.30*mains.filter(stat=>stat==='hp').length],
      ['云岿如我两件',hasSet('yunkui')?.10:0],['雪兔梦游仙境两件',hasSet('snowbunny')?.10:0],
      ['手动生命值百分比',(c.customHpPct??0)/100]],
    panelHpFlat:[['一号位主属性',2200],['手动固定生命值',c.customFlatHp??0]],
    baseAtk:[['星徽·比利（Lv.60，核心技 F）',859],['辉骑面铠（Lv.60）',713]],
    panelAtkPct:[['攻击力主属性',.30*mains.filter(stat=>stat==='atk').length],['激素朋克两件',hasSet('hormone')?.10:0],
      ['静听嘉音两件',hasSet('astral')?.10:0],['手动攻击力百分比',(c.customAtkPct??0)/100]],
    panelAtkFlat:[['二号位主属性',316],['手动固定攻击力',c.customFlatAtk??0]],
    ownCombatAtkPct:[['啄木鸟电音四件',woodpeckerAttackBonus(c,c.yiWoodStacks??3)]],
    panelRate:[['基础暴击率',.05],['核心技强化',.144],['辉骑面铠',.20+.03*rank],
      ['四号位主属性',fourth==='crit'?.24:0],['啄木鸟电音两件',hasSet('woodpecker')?.08:0]],
    ownCombatRate:[['云岿如我四件',.04*setStacks],['折枝剑歌四件（冻结或碎冰）',frozen?.12:0]],
    rateAdjustment:[['手动暴击率',custom.crit]],
    panelCd:[['基础暴击伤害',.50],['四号位主属性',fourth==='cd'?.48:0],['折枝剑歌两件',hasSet('branch')?.16:0]],
    ownCombatCd:[['骑士决心（动力压制）',c.billyCore!==false?.90:0],['四影审判底火',c.w>=4?.08*(c.billyM4Stacks??2):0],
      ['折枝剑歌四件（异常掌控达标）',c.set==='branch' && mains[5]==='mastery'?.30:0]],
    cdAdjustment:[['手动暴击伤害',(c.customNormalCd??0)/100]],
    ownElement:[['五号位主属性',fifth==='physical'?.30:0]],
    ownSheer:[['辉骑面铠 · 骑士气势',weaponStacks*(.10+.015*rank)],['云岿如我四件满层',setStacks===3?.10:0]],
    teamSheerForce:[...buffs.entries.sheerForce,['手动固定贯穿力',c.customSheerForce??0]]
  };
  applyLeadEngineStats(c,statSources,'辉骑面铠');
  return ruptureStats(buffs,statSources);
}
