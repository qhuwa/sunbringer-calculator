/* Nanoka 危局强袭战，2026-11-23 中文快照。数值为小数，仅记录影响挽昼单轮伤害的部分。 */
const assaultSeasons=[
  {id:'690501',server:'正式服',begin:'2026-11-20',end:'2026-12-02',buffs:[
    {name:'掠霜',note:'提升风伤及风抗无视，强攻角色另获暴伤和普攻加成；本轮燎源锐化伤害收益为零。'},
    {name:'奔霆',note:'防御力 +10%，锐化伤害 +15%。特殊技等招式触发的电、风增伤对本轮收益为零。',base:{def:.10,sharp:.15}},
    {name:'极魄',note:'影响异常角色、异常积蓄、异常伤害和能量；本轮直接伤害收益为零。'}
  ],regions:{40009:'chaos',40010:'insight20',30052:'noDirect',40005:'noDirect'}},
  {id:'690511',server:'测试服',begin:'2026-10-21',end:'2026-12-18',buffs:[
    {name:'淬火',note:'锋御防御力 +8%、火伤 +35%。暴击后 5 秒内锐暴伤害再提升 10%。',base:{def:.08,fire:.35},condition:'暴击后 5 秒',proc:{critDmg:.10}},
    {name:'环缭',note:'提升异常角色的攻击、冰伤、以太伤、紊乱和异放伤害；本轮收益为零。'},
    {name:'炽灭',note:'火伤 +20%。异常积蓄及异常暴击后的队伍异常增伤不影响本轮直伤。',base:{fire:.20}}
  ],regions:{40018:'insight5',40013:'core',40005:'noDirect',40012:'noDirect'}},
  {id:'690521',server:'测试服',begin:'2026-10-21',end:'2026-12-18',buffs:[
    {name:'攻砭',note:'锋御火伤 +20%、锐化伤害 +20%。命中后 10 秒内失衡易伤 +15 个百分点；毁伤回复喧响值。',base:{fire:.20,sharp:.20},condition:'命中后 10 秒',proc:{stun:.15}},
    {name:'墟湮',note:'挽昼发动终结技后，自身增伤 +30%，持续 30 秒。战斗中获得的普通暴伤不参与初始暴伤转换。',condition:'挽昼发动终结技后 30 秒',proc:{general:.30}},
    {name:'逆涌',note:'影响异常队伍攻击及异常触发后的能量；本轮收益为零。'}
  ],regions:{40014:'erosion',40013:'core',30042:'sacrifice',40006:'wound'}},
  {id:'690531',server:'测试服',begin:'2026-10-21',end:'2026-12-18',buffs:[
    {name:'尖峰',note:'防御力 +10%，命中时无视 10% 火抗。锋御暴击后 15 秒内锐化伤害再提升 10%。',base:{def:.10,resDown:.10},condition:'锋御暴击后 15 秒',proc:{sharp:.10}},
    {name:'电离',note:'施加电属性异常后的 15 秒内，目标减防 25%、全属性减抗 10%。',condition:'已施加电属性异常且在 15 秒内',proc:{defDown:.25,resDown:.10}},
    {name:'焰绽',note:'影响异常积蓄、异常伤害和能量；本轮收益为零。'}
  ],regions:{40014:'erosion',40010:'insight15',300082:'assist',40012:'noDirect'}}
];

const assaultRegions={
  noDirect:{note:'该区域效果仅影响操作得分、异常、普通暴伤或资源，当前轮转无直接增益。'},
  chaos:{name:'紊相',max:1,note:'积累 10 点紊相值进入 10 秒窗口，目标受到的锐化伤害 +65%，锐暴伤害 +25%。',effect:{received:.65,critDmg:.25}},
  insight20:{name:'识破',max:4,note:'招架指定攻击或使目标失衡叠层，每层目标受到的锐暴伤害 +20%。',effect:{critDmg:.20}},
  insight5:{name:'识破',max:4,note:'招架指定攻击或使目标失衡叠层，每层锐化伤害 +15%、锐暴伤害 +5%。',effect:{sharp:.15,critDmg:.05}},
  insight15:{name:'识破',max:4,note:'招架指定攻击或使目标失衡叠层，每层目标受到的锐暴伤害 +15%。',effect:{critDmg:.15}},
  core:{name:'裂核',max:2,note:'招架破除首领强化部位或击破其分身时获得 1 层裂核，上限 2 层。每层全队锐化伤害 +15%，首领失衡时易伤再加 10 个百分点。',effect:{sharp:.15,stun:.10}},
  erosion:{name:'残痕移除增益',max:2,note:'毁伤移除残痕时，每层锐化伤害 +40%。部位破坏或完美反制后 15 秒内另有锐暴伤害 +15%。',effect:{sharp:.40},extra:{critDmg:.15}},
  sacrifice:{name:'舍身',max:3,note:'索贝克与魇缚者交替上场叠层，每层降低目标防御 8%。',effect:{defDown:.08}},
  wound:{name:'裂伤',max:5,note:'目标失衡时由残翳转为裂伤，每层失衡易伤 +10 个百分点。',effect:{stun:.10}},
  assist:{name:'难敌四手',note:'招架支援命中叠层，累计三次触发破坏并额外叠三层；失衡期间每层连携和终结技增伤 +10%。按实际层数填写。',effect:{stunFinisher:.10}}
};
function activeAssaultSeasons(now=Date.now()){
  return assaultSeasons.filter(s=>Date.parse(s.begin+'T04:00:00+08:00')<=now && now<Date.parse(s.end+'T04:00:00+08:00'));
}
function assaultEffects(optional,area,triggered,stacks,extra){
  const rates={def:0,fire:0,sharp:0,critDmg:0,stun:0,general:0,resDown:0,defDown:0,received:0,stunFinisher:0};
  function add(effect,count=1){
    for(const [key,value] of Object.entries(effect||{}))rates[key]+=value*count;
  }
  add(optional?.base);
  if(triggered)add(optional?.proc);
  add(area?.effect,Math.min(area?.max??Infinity,Math.max(0,Math.trunc(stacks)||0)));
  if(extra)add(area?.extra);
  return rates;
}
