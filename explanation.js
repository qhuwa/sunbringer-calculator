// Render the selected build and the very same attributed buffs used by solve().
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
