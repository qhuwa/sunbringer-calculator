// Render the selected build and the very same attributed buffs used by solve().
function factorSourceList(entries,format){
  return entries.filter(([,value])=>value).map(([name,value])=>
    name+' '+(value<0?'−':'+')+format(Math.abs(value))).join('、');
}

function factorSourceGroup(label,entries,format){
  const active=entries.filter(([,value])=>Number.isFinite(value) && value!==0);
  const details=factorSourceList(active,format);
  return details?'<div><b>'+label+' '+format(sumBonuses(active))+'</b>（'+details+'）</div>':'';
}

function attackCritRows(b,percent,extraCrit=0,extraLabel='电位差',extraRate=0){
  const stats=b.statSources, [,cr,cd]=b.rolls;
  const rate=b.rate+extraRate, effectiveRate=effectiveCritRate(rate);
  const panelRate=[...stats.panelRate,['暴击率副词条 ×'+cr,discRoll.crit*cr]];
  const panelCd=[...stats.panelCd,['暴伤副词条 ×'+cd,discRoll.cd*cd]];
  const group=(label,entries)=>factorSourceGroup(label,entries,percent);
  return [
    ['暴击率',percent(effectiveRate),group('面板暴击率',panelRate)+group('自身战斗暴击率',stats.ownCombatRate)+
      group('对目标暴击率',b.buffSources.teamCritRate)+
      group('手动暴击率',stats.rateAdjustment)+group('本招额外暴击率',[[extraLabel,extraRate]])+
      (rate!==effectiveRate?'<div>封顶前战斗暴击率 '+percent(rate)+'。</div>':'')],
    ['暴击伤害',percent(b.critDmg+extraCrit),group('面板暴伤',panelCd)+group('自身战斗暴伤',stats.ownCombatCd)+
      group('队友战斗暴伤',b.buffSources.normalCritDmg)+group('手动暴伤',stats.cdAdjustment)+
      group('本招额外暴伤',[[extraLabel,extraCrit]])]
  ];
}

function renderRuptureExample(c,b){
  const row=b.rows.find(skill=>skill.ultimate), d=row.display, s=b.statSources, sources=b.buffSources;
  const billy=isStarlightBilly(c), actor=expandedLead(c), element=elementNames[lead().element];
  const [hp, , ,atk]=b.rolls;
  const num=x=>x.toLocaleString('zh-CN',{maximumFractionDigits:4});
  const percent=x=>num(x*100)+'%';
  const times=x=>'×'+num(x);
  const group=(label,entries,format=percent)=>factorSourceGroup(label,entries,format);
  const hpBonus=[...s.panelHpPct,['生命值副词条 ×'+hp,yiHpRoll*hp]];
  const atkBonus=[...s.panelAtkPct,['攻击力副词条 ×'+atk,atkRoll*atk]];
  const panelHp=sumBonuses(s.baseHp)*(1+sumBonuses(hpBonus))+sumBonuses(s.panelHpFlat);
  const hpSources=[...sources.teamHp,...(s.ownBattleHp??[])];
  const battleHp=panelHp*(1+sumBonuses(hpSources));
  const baseAtk=sumBonuses(s.baseAtk);
  const panelAtk=baseAtk*(1+sumBonuses(atkBonus))+sumBonuses(s.panelAtkFlat);
  const battleAtk=panelAtk+baseAtk*sumBonuses(s.combatAtkPct)+sumBonuses(s.combatAtkFlat);
  const rows=[
    ['战斗贯穿力',num(b.combatStat),'<div>战斗最大生命 '+num(battleHp)+' × 10% ＋ 战斗攻击力 '+num(battleAtk)+' × 30% ＋ 固定贯穿力 '+num(sumBonuses(s.teamSheerForce))+'。</div>'+
      group('面板生命百分比',hpBonus)+group('面板固定生命',s.panelHpFlat,num)+group('战斗最大生命',hpSources)+
      group('固定贯穿力',s.teamSheerForce,num)],
    ['战斗攻击力',num(battleAtk),'<div>初始攻击力 '+num(panelAtk)+' ＋ 基础攻击力 '+num(baseAtk)+' × '+
      percent(sumBonuses(s.combatAtkPct))+' ＋ 战斗固定攻击力 '+num(sumBonuses(s.combatAtkFlat))+'。</div>'+
      group('基础攻击力',s.baseAtk,num)+group('面板攻击百分比',atkBonus)+group('面板固定攻击',s.panelAtkFlat,num)+
      group('战斗攻击百分比',s.combatAtkPct)+group('战斗固定攻击',s.combatAtkFlat,num)],
    ['招式倍率',percent(d.coefficient),lead().ultimate+' Lv.'+upgradeLevel(c.w)+
      (billy && row.natural.spent?'。基础 '+percent(row.natural.baseMult)+'，本行共消耗 '+row.natural.spent+' 层煊赫星辉，每层追加 100% 贯穿力。':'')],
    ['通用与'+element+'增伤',times(d.generic),
      group('通用增伤',[...sources.general.filter(([, ,type])=>type!=='element'),...(s.ownGeneral??[])])+
      group(element+'增伤',[...s.ownElement,...sources.general.filter(([, ,type])=>type==='element')])],
    ['招式专项增伤',percent(d.skill),group('本招附加',row.natural.categorySources)],
    ['贯穿倍率',times(d.sheer),group('全招式贯穿增伤',[...s.ownSheer,...sources.sheer])+
      group('本招贯穿增伤',row.natural.sheerSources)+
      (Number.isFinite(c.skillOverrides?.[b.rows.indexOf(row)]?.sheer)?
        '<div><strong class="override-note">手动覆盖</strong> 本招采用 '+times(d.sheer)+'。</div>':'')],
    ['最终倍率',times(d.final),group('最终伤害加成',row.natural.finalSources)],
    ...attackCritRows(b,percent),
    ['期望暴击倍率',times(d.crit),'1 ＋ 有效暴击率 × 暴击伤害。'],
    ['关卡受伤倍率',times(d.received),group('关卡受伤提升',sources.received)],
    ['防御区',times(d.defense),'贯穿伤害自动防御区为 ×1。'],
    [element+'抗性区',times(d.resist),'<div>敌方基础'+element+'抗性 '+percent(c.res/100)+'。</div>'+
      group('减抗及无视抗性',[...sources.resDown,...(s.ownRes??[]),[actor?actor.name+' · 本招':billy?'星徽·比利':'仪玄 · 二影消灾渡厄',row.extraRes]])],
    ['失衡区',times(d.stun),group('失衡易伤',[...(c.stun?sources.stun:[]),...sources.stunAlways])]
  ];
  el('ultimateExample').innerHTML='<div class="tablewrap factor-table"><table><thead><tr><th>乘区</th><th>结算值</th><th>来源与计算</th></tr></thead><tbody>'+
    rows.map(([name,value,details])=>'<tr><th scope="row">'+name+'</th><td>'+value+'</td><td>'+details+'</td></tr>').join('')+
    '</tbody></table></div><p class="worked-result">单次期望伤害 <b>'+fmt(row.unit)+'</b>。本轮 '+row.count+' 次，合计 <b>'+fmt(row.direct)+'</b>。</p>';
}

function renderDetailedAttackBreakdown(c,b){
  const ye=isYeShunguang(c), actor=expandedLead(c), element=elementNames[lead().element];
  const chosen=b.rows.findIndex(row=>row.ultimate && row.count);
  const index=chosen<0?b.rows.findIndex(row=>row.ultimate):chosen;
  const row=b.rows[index], d=row.display, sources=b.buffSources, stats=b.statSources;
  const [atk,,,pen]=b.rolls, fifth=b.mains[4];
  const num=x=>x.toLocaleString('zh-CN',{maximumFractionDigits:4});
  const percent=x=>num(x*100)+'%';
  const times=x=>'×'+num(x);
  const list=(entries,format=percent)=>factorSourceList(entries,format);
  const group=(label,entries,format=percent)=>factorSourceGroup(label,entries,format);
  const rows=[];
  function add(label,value,details,key,automatic,format=times){
    const edited=Number.isFinite(c.skillOverrides?.[index]?.[key]);
    const override=edited?'<div><strong class="override-note">手动覆盖</strong> 自动值 '+format(automatic)+'，本招采用 '+value+'。</div>':'';
    rows.push('<tr><th scope="row">'+label+'</th><td>'+value+'</td><td>'+override+details+'</td></tr>');
  }

  const panelAtkPct=[...stats.panelAtkPct,['攻击力副词条 ×'+atk,atkRoll*atk]];
  const baseAtk=sumBonuses(stats.baseAtk);
  const panelAtk=baseAtk*(1+sumBonuses(panelAtkPct))+sumBonuses(stats.panelAtkFlat);
  const adjustedAtk=baseAtk*sumBonuses(stats.atkPctAdjustment)+sumBonuses(stats.atkFlatAdjustment);
  add('战斗攻击力',num(b.combatStat),'<div><b>面板攻击力 '+num(panelAtk)+'</b></div>'+
    group('基础攻击力',stats.baseAtk,num)+group('面板攻击力百分比',panelAtkPct)+group('面板固定攻击力',stats.panelAtkFlat,num)+
    (adjustedAtk?'<div><b>自定义攻击力变化 '+num(adjustedAtk)+'</b>（'+
      [list(stats.atkPctAdjustment),list(stats.atkFlatAdjustment,num)].filter(Boolean).join('、')+'）</div>':'')+
    group('自身战斗攻击力',stats.ownCombatAtkPct)+group('队友攻击力百分比',sources.teamAtkPct)+
    group('队友固定攻击力',sources.teamAtk,num)+group('自身固定攻击力',[
      ...(stats.ownCombatAtkFlat??[]),['赛维里安 · 暴击率转化',(b.ownAttack??0)-sumBonuses(stats.ownCombatAtkFlat??[])]
    ],num)+
    '<div>战斗攻击力 = 调整后面板 '+num(b.initial)+' ＋ 基础攻击力 '+num(baseAtk)+' × '+percent(sumBonuses(stats.ownCombatAtkPct)+sumBonuses(sources.teamAtkPct))+' ＋ '+num(sumBonuses(sources.teamAtk)+(b.ownAttack??0))+' 固定攻击力。</div>');
  const skill=(actor?.skills??(ye?yeSkills:nekomataSkills))[index], level=upgradeLevel(c.w);
  const extraMult=actor?row.natural.mult-row.natural.baseMult:row.natural.m6;
  const extra=extraMult?'<div>本招附属倍率 '+percent(extraMult)+'。</div>':'';
  const threshold=row.critThreshold?'<div>自身战斗暴击率达到 '+percent(row.critThreshold)+' 时，倍率 ×'+row.thresholdScale+'。</div>':'';
  add('终结技倍率',percent(d.coefficient),skill.name.split('：')[1]+' Lv.'+level+'，'+percent(skill.base/10000*(skill.split??1))+' ＋ '+
    (level-1)+' × '+percent(skill.step/10000*(skill.split??1))+'。'+extra+threshold,'coefficient',row.automaticCoefficient,percent);
  const elemental=[...sources.general.filter(([, ,type])=>type==='element'),...(stats.ownElement??[['五号位物理伤害',fifth==='physical'?.30:0]])];
  const ordinary=[...sources.general.filter(([, ,type])=>type!=='element'),...(stats.ownGeneral??[])];
  add('通用与'+element+'增伤',times(d.generic),'<div>基础 ×1，以下加成相加。</div>'+group('普通增伤',ordinary)+group(element+'增伤',elemental),'generic',b.bonus);
  add('终结技专项增伤',percent(d.skill),(group('招式增伤',row.natural.categorySources)||'<div>当前为 0%。</div>')+
    '<div>与其他普通增伤合计 '+times(d.generic+d.skill)+'。</div>','skill',row.natural.category,percent);
  add('最终倍率',times(d.final),'<div>基础 ×1。</div>'+group('最终伤害加成',row.natural.finalSources),'final',row.natural.final);

  const critRows=attackCritRows(b,percent,row.critDamageBonus,(isMiyabi(c)?'霜寒':actor?.name+' · 本招'),row.critRateBonus);
  critRows.forEach(row=>add(...row));
  add('期望暴击倍率',times(d.crit),'1 ＋ '+critRows[0][1]+' × '+critRows[1][1]+'。','crit',row.naturalCrit);
  add('关卡受伤倍率',times(d.received),'<div>基础 ×1。</div>'+group('关卡受伤提升',sources.received),'received',1+sumBonuses(sources.received));

  const penetration=[['五号位穿透率',fifth==='pen'?.24:0],['河豚电音两件',c.two==='puffer'?.08:0],...sources.teamPen,
    ['自定义穿透率',c.customPen/100],[alternateLeadWeapon(c)?.name,engineStat(alternateLeadWeapon(c),'pen')],...(stats.ownPen??[]),[actor?.name+' · 本招',row.extraPen]];
  const flatPen=[['穿透值副词条 ×'+pen,isMiyabi(c)?0:discRoll.pen*pen],['额外固定穿透值',c.extraFlatPen??0]];
  const ignoreSources=[...sources.ignore,...(stats.ownIgnore??[]),[actor?actor.name+' · 本招及音擎':'叶瞬光 · 二影（飞光／斩妄开天）',row.extraIgnore??0]];
  const ignore=b.ignore+(row.extraIgnore??0);
  const effectivePen=b.penRate+(row.extraPen??0);
  const effectiveDef=Math.max(0,c.enemy*(1-ignore)*(1-effectivePen)-sumBonuses(flatPen));
  add('防御区',times(d.defense),'<div>敌方基础防御 '+num(c.enemy)+'。</div>'+group('减防／无视防御',ignoreSources)+
    group('穿透率',penetration)+group('固定穿透值',flatPen,num)+
    '<div>有效防御 = max(0, '+num(c.enemy)+' × (1 − '+percent(ignore)+') × (1 − '+percent(effectivePen)+') − '+num(sumBonuses(flatPen))+') = '+
    num(effectiveDef)+'。防御区 = 794 ÷ (794 ＋ '+num(effectiveDef)+')。</div>','defense',row.automaticDefense);
  const resSources=[...sources.resDown,...(stats.ownRes??[]),[actor?.name+' · 本招',row.extraRes??0]];
  const effectiveRes=c.res/100-sumBonuses(resSources);
  add(element+'抗性区',times(d.resist),'<div>敌方基础'+element+'抗性 '+percent(c.res/100)+'。</div>'+group('减抗／无视抗性',resSources)+
    '<div>有效抗性 '+percent(effectiveRes)+'。抗性倍率 = 1 − 有效抗性。</div>','resist',1-effectiveRes);
  const snapshot=ye?yeSnapshotStun(c):!!c.stun;
  const baseStun=snapshot?c.vuln/100:1;
  const stunSources=[...(snapshot?sources.stun:[]),...sources.stunAlways,[actor?.name+' · 失衡易伤',row.extraStun??0]];
  const veilNote=ye?'<div>决裁以开启时的失衡易伤为快照，当前快照加成 '+percent(baseStun-1+sumBonuses(stunSources))+
    '，帷幕易伤加成上限 '+percent(yeVeilCap(c))+'。本招仅应用一次帷幕倍率。</div>':'';
  const automaticStun=ye?1+Math.min(yeVeilCap(c),baseStun-1+sumBonuses(stunSources)):baseStun+sumBonuses(stunSources);
  add(ye?'帷幕区':'失衡区',times(d.stun),'<div>'+(snapshot?'敌方基础失衡倍率 ':'非失衡基础倍率 ')+times(baseStun)+'。</div>'+
    group('失衡易伤加成',stunSources)+veilNote,'stun',automaticStun);

  el('ultimateExample').innerHTML='<div class="tablewrap factor-table"><table><thead><tr><th>乘区</th><th>结算值</th><th>来源与计算</th></tr></thead><tbody>'+
    rows.join('')+'</tbody></table></div><p class="worked-result">单次期望伤害 <b>'+fmt(row.unit)+'</b>。本轮 '+row.count+' 次，合计 <b>'+fmt(row.direct)+'</b>。</p>';
}

function renderAttackExample(c,b,element){
  if(isNekomata(c)||isYeShunguang(c)||expandedLead(c))return renderDetailedAttackBreakdown(c,b);
  const index=b.rows.findIndex(r=>r.ultimate);
  const row=b.rows[index], d=row.display;
  const sources=b.buffSources;
  const describe=(group,format=pct)=>sources[group].map(([label,value])=>label+' '+(value>0?'+':'')+format(value)).join('，');
  const withSources=(value,group)=>[value,describe(group)].filter(Boolean).join(' · ');
  const teamAttack=[describe('teamAtk',fmt),describe('teamAtkPct')].filter(Boolean).join('，');
  const wearElement=b.mains[4]===damageElement(c);
  const extraCrit=row.aftershock?b.aftershockShare*b.critDmg:0;
  const percent=value=>(100*value).toLocaleString('zh-CN',{maximumFractionDigits:4})+'%';
  const critRows=attackCritRows(b,percent,extraCrit);
  const manualCrit=Number.isFinite(c.skillOverrides?.[index]?.crit)?
    ' <strong class="override-note">手动覆盖</strong> 自动值 '+percent(b.critFactor+(row.aftershock?b.aftershockExtra:0))+'。':'';
  const factors=[
    ['战斗攻击力',fmt(b.initial)+' 初始 ＋ '+fmt(b.combatStat-b.initial)+' 战斗加成'+(teamAttack?' · '+teamAttack:'')],
    ['终结技倍率',pct(d.coefficient)],
    ['通用倍率＋技能附加',withSources(pct(d.generic+d.skill),'general')+
      (wearElement?'，五号位'+element+'伤害 +30%':'')+(d.skill?'，招式附加 '+pct(d.skill):'')],
    ['最终倍率',pct(d.final)+(d.final>1?' · 橘福福潜能觉醒':'')],
    ...critRows.map(([label,value,details])=>[label,'<b>'+value+'</b>'+details]),
    ['期望暴击倍率',percent(d.crit)+' · 1 ＋ '+critRows[0][1]+' × '+critRows[1][1]+'。'+manualCrit],
    ['关卡受伤倍率',withSources(pct(d.received),'received')],
    ['防御区',[withSources(pct(d.defense),'ignore'),row.aftershock?describe('aftershockIgnore'):'',describe('teamPen')].filter(Boolean).join('，')],
    [(element==='物理'?'物':element)+'抗区',withSources(pct(d.resist)+' · 敌方基础'+element+'抗性 '+pct(c.res/100),'resDown')],
    ['失衡区',pct(d.stun)+' · '+[c.stun?describe('stun'):'非失衡',describe('stunAlways')].filter(Boolean).join('，')],
    ['期望伤害',fmt(row.unit)+' / 次，'+row.count+' 次合计 '+fmt(row.direct)]
  ];
  el('ultimateExample').innerHTML='<div class="tablewrap"><table><thead><tr><th>乘区</th><th>数值与来源</th></tr></thead><tbody>'+
    factors.map(([name,value])=>'<tr><td>'+name+'</td><td>'+value+'</td></tr>').join('')+'</tbody></table></div>';
}

document.getElementById('yiNotes').innerHTML=`
<p>仪玄按 Lv.60、核心技 F、Lv.60 青溟笼舍和基础技能 Lv.12 计算。默认轮转含玄墨迅击、青溟云影、符法千重、玄墨极阵及青溟震击、满蓄凝云术及墨烬影消，以及满蓄墨痕化形连段。两种附招分别列出，可调整各自次数。闪能、术法值与落雷次数按所填轮转结算。</p>
<p>贯穿力 = 战斗攻击力 × 30% ＋ 战斗最大生命值 × 10% ＋ 固定贯穿力。战斗最大生命值按面板生命乘全队生命增益计算。玄墨伤害采用以太增伤与以太抗性，自动防御区为 ×1。普通增伤、以太增伤和招式普通增伤相加，再乘贯穿增伤倍率。驱动优化在生命值百分比、暴击率、暴击伤害与攻击力百分比之间分配副词条，固定生命值可手动输入。</p>
<p>二影的 15% 无视以太抗性仅用于强化特殊技及终结技，每次符法千重按消耗一次聚墨计一次 1200% 追击。四影静心按优先消耗在本轮第一组凝云术及墨烬影消计算。六影在有青溟云影时，默认按 30 秒内额外一次符法千重，并在凝神覆盖时计入 20% 贯穿增伤。额外获得玄墨值后接的普攻可手动填写。琉音默认额外增加一次青溟云影，诺姆额外增加两次玄墨迅击。</p>
<p>数据来源见 <a href="https://zzz.gachabase.net/agents/1371/yixuan/beta?lang=chs">仪玄</a>、<a href="https://zzz.gachabase.net/w-engines/14137/qingming-birdcage/beta?lang=chs">青溟笼舍</a>和<a href="https://zzz.gachabase.net/drive-discs/33100/yunkui-tales/beta?lang=chs">云岿如我</a>。</p>`;

document.getElementById('billyNotes').innerHTML=`
<p>星徽·比利按 Lv.60、核心技 F、Lv.60 辉骑面铠计算。技能默认 Lv.12，三影和五影分别加两级。贯穿力 = 战斗攻击力 × 30% ＋ 战斗最大生命值 × 10% ＋ 固定贯穿力。物理贯穿伤害使用普通暴击、物理抗性，自动防御区为 ×1。普通增伤、物理增伤和招式普通增伤相加，再乘贯穿增伤倍率。</p>
<p>默认轴包含一组骑士斗技、动力压制命中两次、孤轮特技两次、摇曳步伐、脱缰、骑士漫步、最高马力星光和骑士飞踢各一次。轴为可编辑的单轮示例，闪能、决意与招式衔接由玩家按实战填写。骑士决心的 90% 暴伤及一影的 18% 物理无视抗性默认按整轮覆盖，炽热星辉与辉骑面铠默认满层。炽热星辉需要击破、防护或支援队友。</p>
<p>二影涡轮暴伤只作用于填入的孤轮特技次数。六影按表格顺序累计和消耗煊赫星辉，最高马力星光及骑士飞踢每次最多消耗两层，本行额外倍率以所有发动次数平均。琉音追加一次骑士飞踢，诺姆追加两次骑士漫步。</p>
<p>数据来源见 <a href="https://zzz.gachabase.net/agents/1531/starlight-billy/beta?lang=chs">星徽·比利</a>、<a href="https://wiki.biligame.com/zzz/星徽·比利">各级招式倍率</a>与<a href="https://wiki.biligame.com/zzz/辉骑面铠">辉骑面铠各星级数值</a>。</p>`;

document.getElementById('yeNotes').innerHTML=`
<p>叶瞬光按 Lv.60、核心技 F、Lv.60 云霓孤光、基础技能 Lv.12 计算，三影和五影各提高两级。默认轴为逐云惊霆 → 两段斩流光 → 强化斩流光 灭 → 斩流光 极 → 飞光 4 段 → 掣惊雷 → 斩妄开天。其余招式默认 0 次。飞光每段为六段总倍率的六分之一，流云剑意按每道剑气填写。</p>
<p>明心境的凛刃伤害沿用物理增伤与敌方物抗。逐云惊霆和照影按开幕后命中处理。帷幕招式使用开启时快照的易伤加成，0 至 3 影最多 +110%，4 影起最多 +200%。可在战斗条件中单独选择帷幕开启时的目标状态。帷幕内只应用这一项易伤倍率。云霓孤光与沧浪行歌默认覆盖本轮，可关闭覆盖。</p>
<p>一影将合道增伤从 25% 提高到 35%，并无视 20% 防御。二影的额外 40% 无视防御只用于飞光和斩妄开天。六影让归尘和斩妄开天额外造成 1500% 攻击力伤害，可在六影手动填入归尘的替换次数。青溟剑势、观止、明灯愿和喧响值采用手动轮转口径。对比影画时，额外资源能带来的出手机会请自行调整次数。</p>
<p>数据来源见 <a href="https://zzz.gachabase.net/agents/1431/ye-shunguang/beta?lang=chs">叶瞬光</a>、<a href="https://zzz.gachabase.net/w-engines/14143/cloudcleave-radiance/beta?lang=chs">云霓孤光</a>、<a href="https://zzz.gachabase.net/drive-discs/33500/white-water-ballad/beta?lang=chs">沧浪行歌</a>和 <a href="https://zzz.gachabase.net/drive-discs/32700/branch-blade-song/beta?lang=chs">折枝剑歌</a>。</p>`;

document.getElementById('nekoNotes').innerHTML=`<p>猫又按 Lv.60、核心技 F、Lv.60 钢铁肉垫计算。技能默认 Lv.12，三影和五影分别提高两级。默认潜能 VI 阶，猫步迷影、肉球突袭按覆盖本轮计算。未觉醒时，轴内的绒爪穿刺自动改为虚影双刺。赤色之刃和猫猫爪刺五段按每次三连斩折算失衡期倍率，未觉醒则按 1/3 概率触发三连斩计算期望。</p>
<p>猫又按战斗攻击力和普通暴击结算，暴击率上限 100%。肉球突袭与一影的失衡条件视为背击，可触发钢铁肉垫的背击增伤及一影物抗无视。四影、六影、利爪超载、套装触发与叠层可按本轮实际覆盖修改。强击本身的异常伤害不计入，超凶爪印和千夏的猫的凝视默认 0 次。耀嘉音、琉音自身的追加伤害不计入主 C 伤害。</p>
<p>默认用 4 獠牙重金属＋2 啄木鸟电音。四件套触发条件按整轮覆盖处理。调优在百分比攻击力、暴击率、暴击伤害、固定穿透值之间分配有效副词条，固定攻击力可在自定义词条中输入。</p>
<p>资料来源见 <a href="https://zzz.gachabase.net/agents/1021/nekomata/beta?lang=chs">猫又</a>、<a href="https://zzz.gachabase.net/w-engines/14102/steel-cushion/beta?lang=chs">钢铁肉垫</a>、<a href="https://zzz.gachabase.net/drive-discs/beta?lang=chs">驱动盘</a>。</p>`;

document.getElementById('anbyNotes').innerHTML=`<p>零号·安比按 Lv.60、核心技 F、Lv.60 牺牲洁纯计算。技能默认 Lv.12，三影、五影分别提高两级。默认潜能 VI 阶，银星按覆盖整轮计算。默认轴包含强化特殊技 3 次、终结技 1 次、手动三连 6 组及连携技 2 次。</p>
<p>一组三连计入苍光 3 次、白雷 3 次、雷殛 1 次。潜能 I 起再计苍光·临界 1 次。依照本页指定口径，一影每次强化特殊技追加一整组，二影每次终结技的 6 层电鸣追加两整组。六影每累计 6 次白雷追加一次电磁涡流。</p>
<p>白雷、雷殛、苍光·临界和电磁涡流为追加攻击。队伍中有击破或支援角色时，电极化提供 10% 暴击率，提高对银星目标的追加攻击增伤。此时潜能 I 起，连携和终结技也按追加攻击结算。银星目标的追加攻击暴伤额外增加零号·安比暴伤的 30%，潜能 I 起改为 35%。四影对银星目标无视 12% 电抗。</p>
<p>驱动默认 4 如影相随＋2 雷暴重金属。如影相随和牺牲洁纯的层数默认各为三层，会按所填层数覆盖本轮。感电状态用于雷暴重金属四件套的攻击力加成。</p>
<p>资料来源见 <a href="https://zzz.gachabase.net/agents/1381/soldier-0-anby/beta?lang=chs">零号·安比</a>、<a href="https://zzz.gachabase.net/w-engines/14138/severed-innocence/beta?lang=chs">牺牲洁纯</a>、<a href="https://zzz.gachabase.net/drive-discs/beta?lang=chs">驱动盘</a>。</p>`;

function renderUltimateExample(c,b){
  const index=b.rows.findIndex(row=>row.ultimate);
  const row=b.rows[index], d=row.display, natural=row.natural;
  const sources=b.buffSources, assault=c.assault;
  const num=x=>x.toLocaleString('zh-CN',{maximumFractionDigits:4});
  const percent=x=>num(100*x)+'%';
  const times=x=>'×'+num(x);
  const signed=(x,format)=> (x<0?'−':'+')+format(Math.abs(x));
  const list=(items,format=percent)=>items.filter(([,value])=>value).map(([label,value])=>label+' '+signed(value,format)).join('，');
  const sum=items=>items.reduce((total,[,v])=>total+v,0);
  const fields=[];
  function add(title,value,detail,key,automatic,format=times){
    const edited=Number.isFinite(c.skillOverrides?.[index]?.[key]);
    const note=edited?'<strong class="override-note">手动覆盖</strong> 自动值 '+format(automatic)+'，本招采用 '+value+'。 ':'';
    fields.push('<tr><th scope="row">'+title+'</th><td>'+value+'</td><td>'+note+detail+'</td></tr>');
  }
  const fourSet=c.set==='star'?'星之碑':'荆棘玫瑰';
  const [def,cr,cd,flatPen]=b.rolls;
  const [four,five]=b.mains.slice(3);
  const alt=alternateLeadWeapon(c);
  const name=alt?.name??'蜃炎梦火';
  const defSources=[[name,alt?engineStat(alt,'def'):.48],[fourSet+'两件效果',.16],['荆棘玫瑰两件',c.two==='rose' && c.set!=='rose'?.16:0],...b.mains.map((main,i)=>[(i+1)+' 号位',main==='def'?.48:0]),['防御副词条 ×'+def,discRoll.def*def],['自定义防御',c.customDefPct/100]];
  const fixedDef=[['三号位',184],['自定义固定防御',c.customFlatDef]];
  add('战斗防御力',num(b.combatDef),'基础防御 441 ＋ '+(alt?engineBase(alt,'def'):446)+'（'+name+'）。百分比加成合计 '+percent(sum(defSources))+'（'+list(defSources)+'），固定值来自'+list(fixedDef,num)+'。初始防御 '+num(b.initial)+' × '+num(1+assault.def)+'（危局防御）'+(sources.teamDef.length?'，再加'+list(sources.teamDef,num):'')+'。');
  add('招式倍率',percent(d.coefficient),'挽昼终结技 Lv.'+upgradeLevel(c.w)+'，倍率为 '+percent(skills[index].base/10000)+' ＋ '+(upgradeLevel(c.w)-1)+' × '+percent(skills[index].step/10000)+'。','coefficient',natural.mult,percent);
  const general=[...sources.general,['挽昼 · 五号位火伤',five==='fire'?.30:0]];
  add('通用与火属性',times(d.generic),'基础 1，'+list(general)+'。','generic',b.bonus);
  const skill=[['橘福福 · 虎啸终结技',natural.category],['危局 · 失衡终结技',c.stun?assault.stunFinisher:0]];
  add('终结技增伤',percent(d.skill),(list(skill)||'当前无终结技专项增伤')+'。与通用倍率相加，本招增伤区合计 '+times(d.generic+d.skill)+'。','skill',sum(skill),percent);
  add('锐化增伤',times(d.sharp),'基础 1，'+list(sources.sharp)+'。','sharp',1+sum(sources.sharp));
  add('最终伤害',times(d.final),natural.final===1?'当前无终结技最终增伤。':'橘福福 · 潜能「侠肝义胆」使终结技最终伤害 '+signed(natural.final-1,percent)+'。','final',natural.final);
  add('关卡受伤倍率',times(d.received),(list(sources.received)||'当前无关卡受伤加成')+'。','received',1+sum(sources.received));
  const initialCD=[['挽昼基础',.50],[name,engineStat(alt,'cd')],['四号位暴伤',four==='cd'?.48:0],['暴伤副词条 ×'+cd,cd*discRoll.cd],['额外初始暴伤',(c.extraInitialCritDmg??0)/100]];
  const rates=[['挽昼基础暴击率',.05],['核心技强化',.288],['极昼',.40],[name,alt?engineStat(alt,'crit'):.20+.02*(c.wr-1)],['四号位暴击',four==='crit'?.24:0],['暴击副词条 ×'+cr,cr*discRoll.crit],['啄木鸟电音',c.two==='woodpecker'?.08:0],[fourSet+'四件',c.set==='star'?.12:b.initial>=1800?.16:b.initial>=1000?.08:0],['初始暴伤折算',.35*sum(initialCD)],['自定义暴击',c.customCrit/100]];
  add('战斗暴击率',percent(b.rate),list([...rates,...sources.teamCritRate])+'。初始暴伤合计 '+percent(sum(initialCD))+'（'+list(initialCD)+'），按 35% 折算。');
  add('锐暴伤害',percent(b.critDmg),list(sources.critDmg)+'。');
  const first=Math.max(0,Math.min(b.rate,1)), second=Math.min(1,Math.max(0,b.rate-1)), m=1+b.critDmg;
  add('期望锐暴',times(d.crit),'单暴倍率 M = '+num(m)+'，双暴倍率 M² = '+num(m*m)+'。期望 = '+percent(1-first)+' × 1 ＋ '+percent(first-second)+' × M ＋ '+percent(second)+' × M²。','crit',b.critFactor+Math.max(0,Math.min(1,b.rate))*(row.critDamageBonus??0));
  const pen=[['挽昼 · 五号位',five==='pen'?.24:0],['挽昼 · 河豚电音',c.two==='puffer'?.08:0],...sources.teamPen,['自定义穿透率',c.customPen/100]];
  const flat=discRoll.pen*flatPen+(c.extraFlatPen??0), effectiveDef=Math.max(0,c.enemy*(1-b.ignore)*(1-b.penRate)-flat);
  add('敌方防御',times(d.defense),'敌防 '+num(c.enemy)+'；无视防御／减防 '+percent(b.ignore)+'（'+list(sources.ignore)+'）；穿透率 '+percent(b.penRate)+(list(pen)?'（'+list(pen)+'）':'')+'；固定穿透 '+num(flat)+'（副词条 '+flatPen+' × 9'+(c.extraFlatPen?'，额外 '+num(c.extraFlatPen):'')+'）。有效敌防 '+num(effectiveDef)+'，倍率 = 794 ÷ (794 ＋ 有效敌防)。','defense',row.automaticDefense);
  const resistance=c.res/100-sum(sources.resDown);
  add('火抗',times(d.resist),'敌方基础火抗 '+percent(c.res/100)+'，减抗／无视抗性合计 '+percent(sum(sources.resDown))+(sources.resDown.length?'（'+list(sources.resDown)+'）':'')+'。有效火抗 '+percent(resistance)+'，倍率 = 1 − 有效火抗。','resist',1-resistance);
  const stunBase=c.stun?c.vuln/100:1;
  const stunSources=c.stun?[...sources.stun,...sources.stunAlways]:sources.stunAlways;
  add('失衡',times(d.stun),(c.stun?'敌方基础失衡倍率 ':'敌人未失衡，基础倍率 ')+percent(stunBase)+
    (stunSources.length?'，另加'+list(stunSources):'')+'。','stun',stunBase+sum(stunSources));
  const ownExtra=row.ultimate && c.w>=6?row.accrued*.8:0;
  const markFormula=c.w<2?'':c.markMode==='add'?' ＋ 35 个百分点（二影加算假设）':' × 1.35（二影）';
  add('烬痕积攒率',percent(d.mark),'挽昼核心 '+percent(natural.mark)+markFormula+'。'+(natural.boosted?'本次命中四影指定的首次引爆，额外积攒 '+percent(natural.firstBonus)+' 的单次直伤。':''),'mark',natural.autoMarkRate,percent);
  const equation=[b.combatDef,d.coefficient,d.generic+d.skill,d.sharp,d.final,d.received,d.crit,d.defense,d.resist,d.stun].map(num).join(' × ');
  const team=['挽昼 '+c.w+' 影 · '+name+' '+c.wr+' 星'];
  for(const slot of teammateSlots){
    const id=c[slot+'char'], agent=teammateChoices[id];
    if(id==='air'){team.push(agent.name);continue;}
    const engine=[c[slot+'e'],weaponOptionLabel(agent,c[slot+'e'])];
    const potential=id==='jufufu'?c.potential:id==='rina'?c.rinaPotential:null;
    team.push(agent.name+' '+c[slot]+' 影'+(potential!=null?' · '+(potential?'潜能 '+['','I','II','III','IV','V','VI'][potential]:'未觉醒'):'')+
      ' · '+engine[1]+(c[slot+'e'] || id==='jufufu'?' '+c[slot+'r']+' 星':''));
  }
  const release=row.count?'此前存入 '+num(row.mark-row.accrued-ownExtra)+' ＋ 本招积攒 '+num(row.accrued)+(c.w>=6?' ＋ 六影额外结算 '+num(ownExtra):'')+' = 烬灭 '+num(row.mark)+'。':'当前释放 0 次，本行直伤、积攒和引爆均为 0。';
  el('ultimateExample').innerHTML='<p>'+team.join(' / ')+' · '+fourSet+' 4 ＋ '+twoPieceNames[c.two]+' 2</p><div class="factor-table"><table><thead><tr><th>乘区或输入</th><th>本招采用值</th><th>来源与计算</th></tr></thead><tbody>'+fields.join('')+'</tbody></table></div><p class="worked-result"><b>单次期望直伤 '+fmt(row.unit)+'</b><br>'+equation+' ≈ '+num(row.unit)+'</p><p>本轮释放 '+row.count+' 次，直伤共 '+num(row.direct)+'。'+release+'</p>';
}

const expandedRotationNote={
  miyabi:'默认轮转为三次满蓄霜月、三次霜灼·破、三次烈霜紊乱、一次名残雪、一次春临，以及飞雪斩击与追击各一次。碎冰等补充招式默认 0 次。风花前两段和冲刺为物理，其他攻击为烈霜，使用冰伤和冰抗。碎冰、霜灼·破、烈霜紊乱各行独立计数。烈霜积蓄归属、霜寒剩余时间和冰抗无视覆盖可在本轮增益中调节。南宫羽的极性紊乱及异放由队友卡片设置控制。',
  cissia:'蚀骨输入框填基础触发次数。四影、六影额外触发由增益选项补计；毒牙的基础倍率含首轮三段与收招，延长攻击填在额外打击行。',
  seed:'落霰风暴为电伤。霜蕊轮舞前两段、磁陨轮舞为物理伤害，使用独立的物理抗性输入。崩坠一、二式分行。二影能量增伤按一次衔接重戮分摊，六影激光每次填一组三道，按实际触发次数填写。',
  sigrid:'敛枪式各段分行。可填写一影溢出强化次数；未指定单独段数时，从有计次的敛枪式第一段起分配。',
  banyue:'明王、专武与战栗可单独调整。怒相循环、嗔火回复和延长的失衡持续时间通过填写实际招式次数体现。',
  yidhari:'蓄力下砸、旋转和触手各自计次。涌泉与低生命增益按所选状态覆盖；关闭涌泉后，默认连携行回到普通倍率。',
  pyrois:'四条终结技分支独立计次。浸染、耀斑与阳炎按本轮状态设置，六影曜锋额外伤害默认只计一次。',
  severian:'极限闪避成功的第四段与普通第四段分开计次。一影开启时，每轮第一次清场时刻换为连携技。',
  claret:'两种派生的毁伤次数按实际触发填写。葬血强袭最多连续触发三次毁伤。六影连携技和终结技的单体毁伤自动追加，按同一毁伤倍率计算。',
  ...classicRotationNote
};
function renderExpandedNotes(actor){
  const source='https://zzz.gachabase.net';
  el('expandedNotes').innerHTML='<p>'+expandedRotationNote[actor.slug.replaceAll('-','')]+'</p>'+
    (actor===miyabi?'<p>核心 F 霜灼·破按战斗攻击力 × 15 计算，可进行普通暴击。四影的 30% 加到招式增伤。霜寒覆盖时增加 10% 暴击伤害。碎冰的系数为 5。由星见雅先施加霜寒、再被另一种异常覆盖时，烈霜紊乱系数为 6 ＋ 0.75 × 剩余秒数（0–20 秒）。碎冰与紊乱乘战斗异常精通 ÷ 100，再乘 60 级异常系数 2 和积蓄归属，通常不暴击。另一属性被烈霜覆盖时，结算归属该属性的施加者。积蓄触发和参与比例由手动设置。六影追加斩击依据原始命中表 1091035，将每次拔刀的两次 50% 命中合为 720%，按当次消耗的落霜折算阶段次数。</p><p>柚叶额外能力的异常／紊乱专属倍率单列，六影每层将紊乱基础系数加 1.05。南宫羽的极性紊乱按对应紊乱结算的 25%，不移除霜寒。颤音异放按原碎冰系数和异放比例算；每次失衡最多结算一次常规颤音，六影颤音：改可在进入失衡时另结算。</p><p><a href="https://github.com/frzyc/genshin-optimizer/blob/master/libs/zzz/formula/src/data/char/util.ts">烈霜紊乱系数与异常伤害计算</a></p>':'')+
    '<p>按 60 级角色、60 级音擎、核心技 F 和默认 12 级主动技能计算。三、五影各增加 2 级。默认轴用于比较同条件下的伤害，消耗、冷却和触发间隔由技能次数与覆盖选项体现。</p>'+
    '<p>角色对目标造成伤害提升与通用及属性增伤相加。关卡受伤、明确的失衡易伤和锐化伤害按各自区域结算。</p>'+
    '<p><a href="'+source+'/agents/'+actor.agentId+'/'+actor.slug+'/beta?lang=chs">角色技能数据</a> · '+
    '<a href="'+source+'/w-engines/'+actor.weaponId+'/'+actor.weaponSlug+'/beta?lang=chs">专属音擎数据</a> · '+
    '<a href="'+source+'/drive-discs/beta?lang=chs">驱动盘数据</a></p>';
}

function renderClaretExample(c,b){
  const row=b.rows.find(skill=>skill.ultimate), d=row.display, stats=b.statSources, sources=b.buffSources;
  const [def,cr,cd,pen]=b.rolls;
  const num=x=>x.toLocaleString('zh-CN',{maximumFractionDigits:4});
  const times=x=>'×'+num(x);
  const defPct=[...stats.initialEntries,['防御副词条 ×'+def,discRoll.def*def]];
  const panelCd=[...stats.panelCd,['暴伤副词条 ×'+cd,discRoll.cd*cd]];
  const rose=c.set==='rose'?(b.initial>=1800?.16:b.initial>=1000?.08:0):0;
  const rateEntries=[...stats.panelRate,['暴击率副词条 ×'+cr,discRoll.crit*cr],['荆棘玫瑰四件',rose],
    ['初始暴伤折合暴击率',sumBonuses(panelCd)*.35],['猩红铭刻／终结技',stats.coreRate+row.critRateBonus],
    ...sources.teamCritRate,['手动暴击率',c.customCrit/100]];
  const group=(label,entries,format=pct)=>factorSourceGroup(label,entries,format);
  const rows=[
    ['战斗防御力',num(b.combatStat),'<div>872 基础防御 ×（1 ＋ 防御百分比）＋ 184 三号位防御 ＋ 手动固定防御。</div>'+
      group('初始防御百分比',defPct)+group('关卡防御百分比',[['关卡',c.assault.def]])+group('队友固定防御',sources.teamDef,num)],
    ['终结技倍率',pct(d.coefficient),'技能 Lv.'+upgradeLevel(c.w)+'。'],
    ['通用与电属性增伤',times(d.generic),group('普通增伤',[...sources.general.filter(([, ,type])=>type!=='element'),...stats.ownGeneral])+
      group('电属性增伤',[...sources.general.filter(([, ,type])=>type==='element'),...stats.ownElement])],
    ['终结技专项增伤',pct(d.skill),group('招式增伤',row.natural.categorySources)],
    ['最终倍率',times(d.final),group('最终伤害加成',row.natural.finalSources)],
    ['关卡受伤倍率',times(d.received),group('关卡受伤提升',sources.received)],
    ['锐化倍率',times(d.sharp),group('锐化伤害加成',[...stats.ownSharp,...sources.sharp])],
    ['暴击率',pct(b.rate+row.critRateBonus),group('暴击率来源',rateEntries)+group('参与转化的初始暴伤',panelCd)],
    ['锐暴伤害',pct(b.critDmg),group('锐暴伤害来源',stats.sharpCdSources)],
    ['期望锐暴倍率',times(d.crit),'一次锐暴乘 1 ＋ 锐暴伤害，两次锐暴乘其平方。'],
    ['防御区',times(d.defense),'<div>敌方基础防御 '+num(c.enemy)+'。</div>'+group('无视防御／减防',sources.ignore)+
      group('穿透率',[['穿透率合计',b.penRate]])+group('固定穿透',[['副词条 ×'+pen,discRoll.pen*pen]],num)],
    ['电抗区',times(d.resist),'<div>敌方基础电抗 '+pct(c.res/100)+'。</div>'+group('电抗削减及无视',[...sources.resDown,['克拉蕾 · 二影',row.extraRes]])],
    ['失衡区',times(d.stun),group('失衡易伤',[...(c.stun?sources.stun:[]),...sources.stunAlways])]
  ];
  el('ultimateExample').innerHTML='<div class="tablewrap factor-table"><table><thead><tr><th>乘区</th><th>结算值</th><th>来源与计算</th></tr></thead><tbody>'+
    rows.map(([name,value,details])=>'<tr><th scope="row">'+name+'</th><td>'+value+'</td><td>'+details+'</td></tr>').join('')+
    '</tbody></table></div><p class="worked-result">单次期望伤害 <b>'+fmt(row.unit)+'</b>。本轮 '+row.count+' 次，合计 <b>'+fmt(row.direct)+'</b>。</p>';
}
