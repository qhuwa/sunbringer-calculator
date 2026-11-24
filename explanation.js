// Render the selected build and the very same attributed buffs used by solve().
function renderNekomataBreakdown(c,b){
  const index=b.rows.findIndex(row=>row.ultimate);
  const row=b.rows[index], d=row.display, sources=b.buffSources, stats=b.statSources;
  const [atk,cr,cd,pen]=b.rolls, fifth=b.mains[4];
  const num=x=>x.toLocaleString('zh-CN',{maximumFractionDigits:4});
  const percent=x=>num(x*100)+'%';
  const times=x=>'×'+num(x);
  const list=(entries,format=percent)=>entries.filter(([,value])=>value).map(([name,value])=>
    name+' '+(value<0?'−':'+')+format(Math.abs(value))).join('、');
  const group=(label,entries,format=percent)=>{
    const details=list(entries,format);
    return details?'<div><b>'+label+' '+format(sumBonuses(entries))+'</b>（'+details+'）</div>':'';
  };
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
    group('队友固定攻击力',sources.teamAtk,num)+
    '<div>战斗攻击力 = 调整后面板 '+num(b.initial)+' ＋ 基础攻击力 '+num(baseAtk)+' × '+percent(sumBonuses(stats.ownCombatAtkPct)+sumBonuses(sources.teamAtkPct))+' ＋ '+num(sumBonuses(sources.teamAtk))+' 固定攻击力。</div>');
  const skill=nekomataSkills[index], level=upgradeLevel(c.w);
  add('终结技倍率',percent(d.coefficient),'刃爪强袭 Lv.'+level+'，'+percent(skill.base/10000)+' ＋ '+(level-1)+' × '+percent(skill.step/10000)+'。',
    'coefficient',row.natural.mult,percent);
  const physical=[...sources.general.filter(([, ,type])=>type==='element'),['五号位物理伤害',fifth==='physical'?.30:0]];
  const ordinary=sources.general.filter(([, ,type])=>type!=='element');
  add('通用与物理增伤',times(d.generic),'<div>基础 ×1，以下加成相加。</div>'+group('普通增伤',ordinary)+group('物理增伤',physical),'generic',b.bonus);
  add('终结技专项增伤',percent(d.skill),(group('招式增伤',row.natural.categorySources)||'<div>当前为 0%。</div>')+
    '<div>与通用、物理增伤合计 '+times(d.generic+d.skill)+'。</div>','skill',row.natural.category,percent);
  add('最终倍率',times(d.final),'<div>基础 ×1。</div>'+group('最终伤害加成',row.natural.finalSources),'final',row.natural.final);

  const panelRate=[...stats.panelRate,['暴击率副词条 ×'+cr,discRoll.crit*cr]];
  const panelCd=[...stats.panelCd,['暴伤副词条 ×'+cd,discRoll.cd*cd]];
  const effectiveRate=Math.min(1,Math.max(0,b.rate));
  add('期望暴击倍率',times(d.crit),group('面板暴击率',panelRate)+group('自身战斗暴击率',stats.ownCombatRate)+group('手动暴击率',stats.rateAdjustment)+
    '<div>结算暴击率 '+percent(effectiveRate)+(b.rate!==effectiveRate?'（战斗暴击率 '+percent(b.rate)+'）':'')+'。</div>'+
    group('面板暴伤',panelCd)+group('猫又自身战斗暴伤',stats.ownCombatCd)+group('队友战斗暴伤',sources.normalCritDmg)+group('手动暴伤',stats.cdAdjustment)+
    '<div>战斗暴伤 '+percent(b.critDmg)+'，自动暴击期望 = 1 ＋ '+percent(effectiveRate)+' × '+percent(b.critDmg)+'。</div>','crit',b.critFactor);
  add('目标受伤倍率',times(d.received),'<div>基础 ×1。</div>'+group('目标受伤提升',sources.received),'received',1+sumBonuses(sources.received));

  const penetration=[['五号位穿透率',fifth==='pen'?.24:0],['河豚电音两件',c.two==='puffer'?.08:0],...sources.teamPen,
    ['自定义穿透率',c.customPen/100]];
  const flatPen=[['穿透值副词条 ×'+pen,discRoll.pen*pen],['额外固定穿透值',c.extraFlatPen??0]];
  const effectiveDef=Math.max(0,c.enemy*(1-b.ignore)*(1-b.penRate)-sumBonuses(flatPen));
  add('防御区',times(d.defense),'<div>敌方基础防御 '+num(c.enemy)+'。</div>'+group('减防／无视防御',sources.ignore)+
    group('穿透率',penetration)+group('固定穿透值',flatPen,num)+
    '<div>有效防御 = max(0, '+num(c.enemy)+' × (1 − '+percent(b.ignore)+') × (1 − '+percent(b.penRate)+') − '+num(sumBonuses(flatPen))+') = '+
    num(effectiveDef)+'。防御区 = 794 ÷ (794 ＋ '+num(effectiveDef)+')。</div>','defense',b.defenseFactor);
  const effectiveRes=c.res/100-sumBonuses(sources.resDown);
  add('物抗区',times(d.resist),'<div>敌方基础物抗 '+percent(c.res/100)+'。</div>'+group('减抗／无视物抗',sources.resDown)+
    '<div>有效物抗 '+percent(effectiveRes)+'。抗性倍率 = 1 − 有效物抗。</div>','resist',1-effectiveRes);
  const baseStun=c.stun?c.vuln/100:1;
  const stunSources=[...(c.stun?sources.stun:[]),...sources.stunAlways];
  add('失衡区',times(d.stun),'<div>'+(c.stun?'敌方基础失衡倍率 ':'非失衡基础倍率 ')+times(baseStun)+'。</div>'+
    group('失衡易伤加成',stunSources),'stun',baseStun+sumBonuses(stunSources));

  el('ultimateExample').innerHTML='<div class="tablewrap factor-table"><table><thead><tr><th>乘区</th><th>结算值</th><th>来源与计算</th></tr></thead><tbody>'+
    rows.join('')+'</tbody></table></div><p class="worked-result">单次期望伤害 <b>'+fmt(row.unit)+'</b>。本轮 '+row.count+' 次，合计 <b>'+fmt(row.direct)+'</b>。</p>';
}

function renderAttackExample(c,b,element){
  if(isNekomata(c))return renderNekomataBreakdown(c,b);
  const row=b.rows.find(r=>r.ultimate), d=row.display;
  const sources=b.buffSources;
  const describe=(group,format=pct)=>sources[group].map(([label,value])=>label+' '+(value>0?'+':'')+format(value)).join('，');
  const withSources=(value,group)=>[value,describe(group)].filter(Boolean).join(' · ');
  const teamAttack=[describe('teamAtk',fmt),describe('teamAtkPct')].filter(Boolean).join('，');
  const wearElement=b.mains[4]===damageElement(c);
  const extraCrit=row.aftershock?b.aftershockShare*b.critDmg:0;
  const factors=[
    ['战斗攻击力',fmt(b.initial)+' 初始 ＋ '+fmt(b.combatStat-b.initial)+' 战斗加成'+(teamAttack?' · '+teamAttack:'')],
    ['终结技倍率',pct(d.coefficient)],
    ['通用倍率＋技能附加',withSources(pct(d.generic+d.skill),'general')+
      (wearElement?'，五号位'+element+'伤害 +30%':'')+(d.skill?'，招式附加 '+pct(d.skill):'')],
    ['最终倍率',pct(d.final)+(d.final>1?' · 橘福福潜能觉醒':'')],
    ['期望暴击倍率',pct(d.crit)+' · '+pct(Math.max(0,Math.min(1,b.rate)))+' 暴击率，'+pct(b.critDmg)+' 普通暴伤'+
      (extraCrit?'，电位差提供追加攻击暴伤 '+pct(extraCrit):'')+(describe('normalCritDmg')?' · '+describe('normalCritDmg'):'')],
    ['目标受伤倍率',withSources(pct(d.received),'received')],
    ['防御区',withSources(pct(d.defense),'ignore')+(describe('teamPen')?'，'+describe('teamPen'):'')],
    [(element==='物理'?'物':element)+'抗区',withSources(pct(d.resist)+' · 敌方基础'+element+'抗性 '+pct(c.res/100),'resDown')],
    ['失衡区',pct(d.stun)+' · '+[c.stun?describe('stun'):'非失衡',describe('stunAlways')].filter(Boolean).join('，')],
    ['期望伤害',fmt(row.unit)+' / 次，'+row.count+' 次合计 '+fmt(row.direct)]
  ];
  el('ultimateExample').innerHTML='<div class="tablewrap"><table><thead><tr><th>乘区</th><th>数值与来源</th></tr></thead><tbody>'+
    factors.map(([name,value])=>'<tr><td>'+name+'</td><td>'+value+'</td></tr>').join('')+'</tbody></table></div>';
}

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
  const defSources=[['蜃炎梦火',.48],[fourSet+'两件效果',.16],['荆棘玫瑰两件',c.two==='rose' && c.set!=='rose'?.16:0],...b.mains.map((main,i)=>[(i+1)+' 号位',main==='def'?.48:0]),['防御副词条 ×'+def,discRoll.def*def],['自定义防御',c.customDefPct/100]];
  const fixedDef=[['三号位',184],['自定义固定防御',c.customFlatDef]];
  add('战斗防御力',num(b.combatDef),'基础防御 887（挽昼 441 ＋ 蜃炎梦火 446）。百分比加成合计 '+percent(sum(defSources))+'（'+list(defSources)+'），固定值来自'+list(fixedDef,num)+'。初始防御 '+num(b.initial)+' × '+num(1+assault.def)+'（危局防御）'+(sources.teamDef.length?'，再加'+list(sources.teamDef,num):'')+'。');
  add('招式倍率',percent(d.coefficient),'挽昼终结技 Lv.'+upgradeLevel(c.w)+'，倍率为 '+percent(skills[index].base/10000)+' ＋ '+(upgradeLevel(c.w)-1)+' × '+percent(skills[index].step/10000)+'。','coefficient',natural.mult,percent);
  const general=[...sources.general,['挽昼 · 五号位火伤',five==='fire'?.30:0]];
  add('通用与火属性',times(d.generic),'基础 1，'+list(general)+'。','generic',b.bonus);
  const skill=[['橘福福 · 虎啸终结技',natural.category],['危局 · 失衡终结技',c.stun?assault.stunFinisher:0]];
  add('终结技增伤',percent(d.skill),(list(skill)||'当前无终结技专项增伤')+'。与通用倍率相加，本招增伤区合计 '+times(d.generic+d.skill)+'。','skill',sum(skill),percent);
  add('锐化增伤',times(d.sharp),'基础 1，'+list(sources.sharp)+'。','sharp',1+sum(sources.sharp));
  add('最终伤害',times(d.final),natural.final===1?'当前无终结技最终增伤。':'橘福福 · 潜能「侠肝义胆」使终结技最终伤害 '+signed(natural.final-1,percent)+'。','final',natural.final);
  add('目标受伤',times(d.received),(list(sources.received)||'当前无目标受伤加成')+'。','received',1+sum(sources.received));
  const initialCD=[['挽昼基础',.50],['四号位暴伤',four==='cd'?.48:0],['暴伤副词条 ×'+cd,cd*discRoll.cd],['额外初始暴伤',(c.extraInitialCritDmg??0)/100]];
  const rates=[['挽昼面板',.338],['极昼',.40],['蜃炎梦火',.20+.02*(c.wr-1)],['四号位暴击',four==='crit'?.24:0],['暴击副词条 ×'+cr,cr*discRoll.crit],['啄木鸟电音',c.two==='woodpecker'?.08:0],[fourSet+'四件',c.set==='star'?.12:b.initial>=1800?.16:b.initial>=1000?.08:0],['初始暴伤折算',.35*sum(initialCD)],['自定义暴击',c.customCrit/100]];
  add('战斗暴击率',percent(b.rate),list(rates)+'。初始暴伤合计 '+percent(sum(initialCD))+'（'+list(initialCD)+'），按 35% 折算。');
  const first=Math.min(b.rate,1), second=Math.min(1,Math.max(0,b.rate-1)), m=1+b.critDmg;
  add('期望锐暴',times(d.crit),list(sources.critDmg)+'。单暴倍率 M = '+num(m)+'，双暴倍率 M² = '+num(m*m)+'。期望 = '+percent(1-first)+' × 1 ＋ '+percent(first-second)+' × M ＋ '+percent(second)+' × M²。','crit',b.critFactor);
  const pen=[['挽昼 · 五号位',five==='pen'?.24:0],['挽昼 · 河豚电音',c.two==='puffer'?.08:0],...sources.teamPen,['自定义穿透率',c.customPen/100]];
  const flat=discRoll.pen*flatPen+(c.extraFlatPen??0), effectiveDef=Math.max(0,c.enemy*(1-b.ignore)*(1-b.penRate)-flat);
  add('敌方防御',times(d.defense),'敌防 '+num(c.enemy)+'；无视防御／减防 '+percent(b.ignore)+'（'+list(sources.ignore)+'）；穿透率 '+percent(b.penRate)+(list(pen)?'（'+list(pen)+'）':'')+'；固定穿透 '+num(flat)+'（副词条 '+flatPen+' × 9'+(c.extraFlatPen?'，额外 '+num(c.extraFlatPen):'')+'）。有效敌防 '+num(effectiveDef)+'，倍率 = 794 ÷ (794 ＋ 有效敌防)。','defense',b.defenseFactor);
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
  const team=['挽昼 '+c.w+' 影 · 蜃炎梦火 '+c.wr+' 星'];
  for(const slot of teammateSlots){
    const id=c[slot+'char'], agent=teammateChoices[id];
    if(id==='air'){team.push(agent.name);continue;}
    const engine=agent.engines.find(([key])=>Number(key)===c[slot+'e']);
    const potential=id==='jufufu'?c.potential:id==='rina'?c.rinaPotential:null;
    team.push(agent.name+' '+c[slot]+' 影'+(potential!=null?' · '+(potential?'潜能 '+['','I','II','III','IV','V','VI'][potential]:'未觉醒'):'')+
      ' · '+engine[1]+(c[slot+'e'] || id==='jufufu'?' '+c[slot+'r']+' 星':''));
  }
  const release=row.count?'此前存入 '+num(row.mark-row.accrued-ownExtra)+' ＋ 本招积攒 '+num(row.accrued)+(c.w>=6?' ＋ 六影额外结算 '+num(ownExtra):'')+' = 烬灭 '+num(row.mark)+'。':'当前释放 0 次，本行直伤、积攒和引爆均为 0。';
  el('ultimateExample').innerHTML='<p>'+team.join(' / ')+' · '+fourSet+' 4 ＋ '+twoPieceNames[c.two]+' 2</p><div class="factor-table"><table><thead><tr><th>乘区或输入</th><th>本招采用值</th><th>来源与计算</th></tr></thead><tbody>'+fields.join('')+'</tbody></table></div><p class="worked-result"><b>单次期望直伤 '+fmt(row.unit)+'</b><br>'+equation+' ≈ '+num(row.unit)+'</p><p>本轮释放 '+row.count+' 次，直伤共 '+num(row.direct)+'。'+release+'</p>';
}
