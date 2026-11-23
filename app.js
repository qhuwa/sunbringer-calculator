const el=id=>document.getElementById(id);
const fmt=x=>Math.round(x).toLocaleString('zh-CN');
const options=arr=>arr.map(([value,label])=>`<option value="${value}">${label}</option>`).join('');
const numericOptions=(start,end,unit)=>options(Array.from({length:end-start+1},(_,i)=>[i+start,(i+start)+unit]));
const elementNames={200:'物理',201:'火',202:'冰',203:'电',204:'以太',205:'风'};
// Nanoka lists this elite in the 690531 boss stages.
bosses.push({id:300082,name:{text:'自律强袭单位·「提丰·破坏者型」'},def:952.8,weakness_ids:[203,205],resistance_ids:[201]});
const bossById=new Map(bosses.map(b=>[String(b.id),b]));
el('boss').insertAdjacentHTML('beforeend',bosses.map(b=>'<option value="' + b.id + '">' + b.name.text + '</option>').join(''));
const emptyTeammate={name:'空气',role:'空位',portrait:null,engines:[['0','无音擎']]};
const teammateChoices={
  f:{air:emptyTeammate,jufufu:{name:'橘福福',role:'击破 · 火',portrait:portraits[1],engines:[['1','福虓炉炉'],['0','燃狱齿轮']]},roxy:{name:'洛克茜',role:'击破 · 风',portrait:'https://i.gachabase.net/DijdTpaLWeJmg39VwoMIkRzIVyKh8cy96PpISuBx68c/q:50/f:webp/plain/zzz/assets/386b80141590c07add669b27246d96df.png',engines:[['1','永夜辗眠'],['0','其他音擎']]},norma:{name:'诺姆',role:'击破 · 火',portrait:'https://i.gachabase.net/ZCzHYreyZcNjBTh-HiFeXL7mazPZS4lVSvWEcZkklxc/q:50/f:webp/plain/zzz/assets/136be6592f54d191d26e33e3d8cd955c.png',engines:[['1','首席跟班'],['0','其他音擎']]}},
  r:{air:emptyTeammate,robin:{name:'知更鸟',role:'防护 · 以太',portrait:portraits[2],engines:[['1','星韵流彩'],['2','奔袭獠牙'],['0','仅生命主词条']]},rina:{name:'丽娜',role:'支援 · 电',portrait:'https://i.gachabase.net/Z_0BPPOC5MxvcyiogXatpCYqOMc4jknjbBs-H2d1m4g/q:50/f:webp/plain/zzz/assets/9da302acd93c121cccd36bc60aff4cf2.png',engines:[['1','啜泣摇篮'],['0','其他音擎']]}}
};
el('two').innerHTML=options(Object.entries(twoPieceNames));
el('mainSlots').innerHTML=mainPools.map((pool,i)=>{
  const choices=pool.map(stat=>[stat,mainLabels[stat]]);
  if(i===3 || i===4)choices.unshift(['auto','自动择优']);
  return `<label>${i+1} 号位${pool.length===1?' · 固定':''}<select id="main${i+1}" ${pool.length===1?'disabled':''}>${options(choices)}</select></label>`;
}).join('');
el('main4').value='crit';
const agents=[['w','挽昼','锋御 · 燎源','星之碑 / 荆棘玫瑰',['蜃炎梦火']],['f','橘福福','击破 · 火','赤翼夜曲',['福虓炉炉','燃狱齿轮']],['r','知更鸟','防护 · 以太','雪兔梦游仙境',['星韵流彩','仅生命主词条']]];
const teammateCard=(key,initial)=>{const choices=teammateChoices[key],ch=choices[initial];return `<div class="card"><div class="agent"><img id="${key}portrait" alt="" src="${ch.portrait}" onerror="this.style.display='none'"><div><h3 id="${key}name">${ch.name}</h3><small id="${key}role">${ch.role}</small></div></div><div class="fields"><label>队友<select id="${key}char">${Object.entries(choices).map(([id,v])=>`<option value="${id}"${id===initial?' selected':''}>${v.name}</option>`).join('')}</select></label><label>意象影画<select id="${key}">${numericOptions(0,6,' 影')}</select></label><label>音擎星级<select id="${key}r">${numericOptions(1,5,' 星')}</select></label><label class="wide"><span id="${key}engineLabel">专属音擎 / 其他音擎</span><select id="${key}e">${options(ch.engines)}</select></label></div><div id="${key}BuffSummary" class="team-buffs"></div></div>`};
el('cards').innerHTML=agents.slice(0,1).map(([key,name,role,disc,engines],i)=>`<div class="card"><div class="agent"><img alt="" src="${portraits[i]}" onerror="this.style.display='none'"><div><h3>${name}</h3><small>${role}</small></div></div><div class="fields"><label>意象影画<select id="${key}">${numericOptions(0,6,' 影')}</select></label><label>音擎星级<select id="${key}r">${numericOptions(1,5,' 星')}</select></label><label class="wide">音擎　·　${disc}<select id="${key}e" disabled>${options(engines.map((e,i)=>[1-i,e]))}</select></label></div></div>`).join('')+teammateCard('f','jufufu')+teammateCard('r','robin');
const teammateBuilds={};
const defaultShadows={air:0,jufufu:1,roxy:0,norma:0,robin:0,rina:1};
const potentialOptions=options(['未觉醒','I','II','III','IV','V','VI'].map((label,i)=>[i,label]));
el('fchar').closest('.fields').insertAdjacentHTML('beforeend',
  '<label class="wide" id="potentialLabel">潜能觉醒 · 侠肝义胆<select id="potential">'+
  potentialOptions+'</select></label>');
el('potential').value=6;
el('rchar').closest('.fields').insertAdjacentHTML('beforeend',
  '<div class="wide fields" id="rinaControls" hidden><label>潜能觉醒 · 完美侍奉<select id="rinaPotential">'+potentialOptions+
  '</select></label><label>丽娜觉醒前穿透率 %<input id="rinaBasePen" type="number" min="0" max="100" step="any" value="70.4"></label></div>');
el('rinaPotential').value=6;
const defaults=skills.map(s=>s.defaultCount);
const firstOptionalSkill=defaults.indexOf(0);
const multiplierFields=['coefficient','generic','skill','final','received','sharp','crit','defense','resist','stun','mark'];
let overrides=skills.map(()=>({}));
el('rows').innerHTML=skills.map((s,i)=>`${i===firstOptionalSkill?'<tr class="skill-group"><th colspan="6" scope="colgroup">补充招式 · 默认 0 次</th></tr>':''}<tr><td>${s.name}</td><td id="m${i}"></td><td><input aria-label="${s.name}次数" type="number" id="n${i}" value="${defaults[i]}" step="1" min="0" max="99"></td><td id="d${i}"></td><td id="stored${i}"></td><td id="a${i}"></td></tr>`).join('');
el('notes').innerHTML=`<p>按 Lv.60 代理人、Lv.60 音擎、核心技 F、基础技能 Lv.12 计算。影画三、五各提升两级。默认按招式明细从上到下结算。默认轮转中毁伤 3 次，不灭热忱 2 次，其余已启用招式各 1 次。下方补充招式默认 0 次，「斩棘」和「执旌」的一至四段可分别计次。「以挽昼之名」和「筑万众之梦」依次在两段终结技之前释放。消耗残痕触发的毁伤统一在「毁伤」行填写次数。毁伤沿用普攻技能等级，每消耗一层残痕触发一次。单次倍率为 80.5% ＋ (普攻等级 − 1) × 7.4%。同一招式多次发动时，表中直伤、烬痕和烬灭均为该行合计。</p>
<p>轮转按表中次序累计。¹「烬灭扣血」列记在引爆招式上，包含此前储存的烬痕。聚锋、长暗终焉、永昼之炬和两段终结技按实际伤害的 60% 积攒，毁伤为 40%。二影令其余招式按 30% 积攒。默认将各招式积攒量乘 1.35，四影指定的首次引爆改为乘 2。若选择加算假设，各招积攒率加 35 个百分点，该次四影引爆再加 65 个百分点。四影可指定给聚锋后的永昼之炬或第二段终结技。六影另结算第二段终结技自身所积攒烬痕的 80%。未引爆的烬痕不计入总伤害。</p>
<p>期望直伤 = 战斗防御力 × 招式倍率 ×（通用倍率 ＋ 招式增伤）× 锐化倍率 × 最终倍率 × 目标受伤倍率 × 期望锐暴倍率 × 防御区 × 火抗区 × 失衡倍率。挽昼和蜃炎梦火分别提供 441 和 446 基础防御，武器另加 48% 防御。基础锐暴伤害为 150%，当前生效的加成见上方算例。初始暴伤的 35% 转为暴击率，虎啸的战斗中暴伤不计入此转换。设 M = 1 ＋ 锐暴伤害，单暴乘 M，二次锐暴成功乘 M²。暴击率 100% 至 200% 时，二次锐暴概率为暴击率超出 100% 的部分；达到 200% 时，每次均乘 M²。</p>
<p>防御区 = 794 ÷ [794 ＋ max(0, 敌防 × (1 − 无视防御) × (1 − 穿透率) − 穿透值)]。火抗区倍率 = 1 − 有效火抗。有效火抗为敌方基础火抗扣除减抗和无视火抗后的数值。例如基础火抗 −20%，挽昼一影再无视 15 个百分点，火抗区倍率为 1.35。敌防 953、火抗 0%、失衡 150% 是可改的示例目标。锐化增伤独立相乘，即 (1 ＋ 通用、火属性及招式增伤之和) × (1 ＋ 锐化增伤之和)。</p>
<p>极昼及当前队伍满足条件的状态和套装按全程覆盖计算。知更鸟装备雪兔时三层为 18%，赤翼触发为 8% 锐化增伤，两件炎狱为 10% 火伤。橘福福的潜能默认 VI 阶，可单独调整。虎啸下「侠肝义胆」的连携和终结最终倍率独立相乘，两段终结分别生效，烬痕按增幅后的直伤积攒。橘福福额外能力关闭，一影的 35 个百分点失衡易伤单独生效。福虓炉炉与星韵流彩按两层。燃狱齿轮影响击破效率，本页仅统计给定状态下的挽昼输出。</p>
<p>知更鸟按 26000 初始生命吃满守护咏叹，重音节拍默认已消耗。消耗重音节拍时，防御增益 = (440 ＋ 特殊技等级 × 30) × 1.25。各音擎方案均按配装达到生命门槛计算。<a href="https://zzz.gachabase.net/w-engines/14107/tusks-of-fury/beta?lang=chs">奔袭獠牙</a>按队友触发破招或极限闪避后的 20 秒增益覆盖本轮计算，1 至 5 星分别提供 18%、22.5%、27%、31.5%、36% 通用增伤。知更鸟六影另提供 15% 锐化增伤。</p>
<p>自定义词条只作用于当前战斗条件和配置对照。无视防御、穿透率、通用增伤、锐化增伤、火属性增伤、暴击率、锐暴伤害、防御力百分比、固定防御和失衡易伤都可以填写正负百分点。它们会参与驱动盘优化，所以改变后四至六号位和副词条可能重新分配。</p>
<p>一至三号位主属性固定，四至六号位可指定。自动寻优按词条数上限比较配装。四号位比较暴击率、暴击伤害和防御力，五号位比较火伤、穿透率和防御力，六号位选择防御力。固定轮转的锐化伤害使用防御力，生命、攻击及回复等主属性对本轮输出无直接加成。河豚电音两件提供 8% 穿透率，可与五号位叠至 32%；啄木鸟电音两件提供 8% 暴击率。荆棘玫瑰两件提供 16% 防御力，与星之碑四件搭配时两套合计提供 32% 防御力。六张均为荆棘玫瑰时，该套两件效果计一次。</p>
<p>所选数量的有效副词条在防御力 ${pct(discRoll.def)}、暴击率 2.4%、暴击伤害 4.8%（折合暴击率 1.68 个百分点）和固定穿透值 9 之间分配。每张盘有四种初始副词条与五次强化机会，主属性与同盘副词条互斥。其余位置由无效词条补足。面板先确定伤害最高的主属性和副词条总数，再优先均分各盘的有效词条数，并尽量分散同类词条。任意三种副词条的数量之和最多为 X，任意两种的数量之和最多为 Y，每一种最多为 Z。总预算为上限，组合限制较紧时允许使用更少的有效词条。副词条 ×6 表示初始 1 次加上强化 5 次。</p>
<p>任一队友位可选「空气」。只有队伍中有击破或防护队友时，本页才计入挽昼「众愿一心」的 25% 锐暴伤害。队友可切换为洛克茜、诺姆或丽娜。洛克茜按火浸染、风化及专武满覆盖计算，计入锐暴伤害、受伤倍率与失衡易伤。诺姆与挽昼同阵营，技术鸿沟与首席跟班按满层计算。丽娜默认觉醒 VI 阶，觉醒前自身穿透率可改。按人偶在场、挽昼位于人偶附近计算。II 至 VI 阶增加丽娜自身穿透率 1.6 个百分点，并按各阶系数为队友提供防御力，上限 468 点。1 影的 130% 按技能归属应用于核心被动的穿透率共享。啜泣摇篮按满层普通增伤计算，与火属性和招式增伤相加。<a href="https://zzz.gachabase.net/agents/1211/rina/beta?lang=chs#potential">丽娜潜能与影画说明</a>。雪兔四件的防护职业效果仅在知更鸟上场时生效。对应角色的专属音擎星级仍可单独调节，未装备专属音擎时不计该专属效果。</p>
<p>危局强袭战使用 2026-11-23 的 Nanoka 中文快照，仅展示有效期内的期次。每个进行中的正式服或测试服期次各取一项轮转期望总伤害最高的增益。所有候选沿用同一组配装限制、Boss 区域层数和条件触发设置。条件勾选及区域层数代表整轮战斗处在该窗口。防御百分比作用于挽昼初始防御，队友固定防御另加。失衡易伤仅在失衡状态生效。固定轮转只计算挽昼输出，能量、喧响值、异常积蓄和操作得分不折算为额外招式。</p>
<p>Boss 列表和弱点、抗性取自 <a href="https://zzz.gachabase.net/enemies/notorious-boss/beta?lang=chs">GachaBase 测试服首领页</a>，首领详情中的 DEF 也会随选择同步到敌方防御力。未提供 DEF 的条目暂用 953。页面将首领列表中的火弱点映射为 −20% 火抗，将火抗性映射为 +20% 火抗，防御力仍可手动修改。数据快照取自 <a href="https://zzz.gachabase.net/agents/1601/sunbringer/beta?lang=chs">挽昼</a>、<a href="https://zzz.gachabase.net/agents/1391/ju-fufu/beta?lang=chs">橘福福</a>、<a href="https://zzz.gachabase.net/agents/1661/robin/beta?lang=chs">知更鸟</a>、<a href="https://zzz.gachabase.net/w-engines/beta?lang=chs">音擎</a>及<a href="https://zzz.gachabase.net/drive-discs/beta?lang=chs">驱动盘</a>。页面使用本地快照计算。</p>`;

const recommendedBuffs=new Map();
function regionName(id){
  const region=assaultRegions[id];
  return id.startsWith('insight')?region.name+' · 每层锐暴伤害 +'+pct(region.effect.critDmg):region.name||'无直接增益';
}
function syncRegion(resetRegion=false,preferred=el('regionChoice').value){
  const boss=el('boss').value;
  const ids=[...new Set(activeAssaultSeasons().map(s=>s.regions[boss]).filter(Boolean))];
  const select=el('regionChoice');
  select.innerHTML=options(ids.map(id=>[id,regionName(id)]));
  if(ids.includes(preferred))select.value=preferred;
  el('regionChoiceLabel').hidden=ids.length<2;
  const region=assaultRegions[select.value];
  if(resetRegion){
    el('regionStacks').value=region?.max??0;
    el('regionExtra').checked=false;
  }
  const coverage=region?.effect?(region.max!=null?' 默认满层。':' 资料未注明层数上限，默认 0 层。')+'本轮所有招式均按填写的层数计算，0 层关闭叠层增益。':'';
  el('regionInfo').textContent=region?'区域效果 · '+region.note+coverage:'';
  el('regionStacksLabel').hidden=!region?.effect;
  el('regionStacks').disabled=!region?.effect;
  el('regionStacksName').textContent=region?.name?region.name+'层数'+(region.max!=null?'（0–'+region.max+'）':''):'';
  if(region?.max!=null)el('regionStacks').max=region.max;
  else el('regionStacks').removeAttribute('max');
  el('regionExtraLabel').hidden=!region?.extra;
}
function currentAssault(buff,region=assaultRegions[el('regionChoice').value],stacks=el('regionStacks').valueAsNumber,extra=el('regionExtra').checked){
  return assaultEffects(buff,region,el('assaultProc').checked,stacks,extra);
}
function rankAssaultBuffs(config){
  const select=el('assaultBuff'), previous=select.value;
  recommendedBuffs.clear();
  for(const season of activeAssaultSeasons()){
    let best=null, bestScore=-Infinity;
    for(const buff of season.buffs){
      const score=optimized({...config,assault:currentAssault(buff)})?.score;
      if(score!=null && score>bestScore){best=buff;bestScore=score;}
    }
    if(best)recommendedBuffs.set(season.id,best);
  }
  select.innerHTML=options([['','无'],...Array.from(recommendedBuffs,([id,buff])=>[id,buff.name])]);
  if(recommendedBuffs.has(previous))select.value=previous;
  const selected=recommendedBuffs.get(select.value);
  el('assaultInfo').textContent=selected?selected.note:'每个有效期次各取一项，按当前配置的轮转期望总伤害筛选。';
  el('assaultSource').href='https://zzz.nanoka.cc/boss'+(selected?'/'+select.value:'');
}
function getConfig(){
  const c={};
  for(const k of ['rollBudget','tripleRollLimit','pairRollLimit','maxRollsPerStat','w','f','r','wr','fr','rr','fe','re','stun','vuln','enemy','res','beat','customIgnore','customPen','customGeneral','customSharp','customFire','customCrit','customCritDmg','customDefPct','customFlatDef','customStun'])c[k]=Number(el(k).value);
  c.fchar=el('fchar').value;
  c.rchar=el('rchar').value;
  for(const k of ['set','two','main4','main5','main6','first','markMode'])c[k]=el(k).value;
  c.counts=skills.map((s,i)=>Number(el('n'+i).value));
  c.potential=Number(el('potential').value);
  if(c.rchar==='rina'){
    c.rinaPotential=Number(el('rinaPotential').value);
    c.rinaBasePen=Number(el('rinaBasePen').value);
  }
  c.assault=currentAssault(recommendedBuffs.get(el('assaultBuff').value));
  c.skillOverrides=overrides.map(row=>({...row}));
  return c;
}
function bossResistance(boss){
  if(!boss)return 0;
  if(boss.weakness_ids?.includes(201))return -20;
  if(boss.resistance_ids?.includes(201))return 20;
  return 0;
}
function syncBoss(){
  const boss=bossById.get(el('boss').value);
  if(!boss){el('res').value=0;el('bossInfo').textContent='自定义敌人。防御力和火抗可直接编辑。';return;}
  const weakness=(boss.weakness_ids||[]).map(id=>elementNames[id]||id).join('、')||'无';
  const resistance=(boss.resistance_ids||[]).map(id=>elementNames[id]||id).join('、')||'无';
  el('res').value=bossResistance(boss);
  const defense=Number.isFinite(boss.def)?boss.def:953;
  el('enemy').value=defense;
  const defenseText=Number.isFinite(boss.def)?'防御力 '+defense:'未提供防御力，暂用 953';
  el('bossInfo').textContent='弱点：'+weakness+'　抗性：'+resistance+'　'+defenseText+'　火属性抗性按列表映射为 '+bossResistance(boss)+'%。防御力仍可手动修改。';
}
const solved = new Map();
function optimized(c){
  const key=JSON.stringify({...c, fr:c.fe?c.fr:1, rr:c.re?c.rr:1});
  if(!solved.has(key)){
    if(solved.size>=96)solved.delete(solved.keys().next().value);
    solved.set(key,solve(c));
  }
  return solved.get(key);
}
function percentages(score,reference){
  if(reference==null || score==null || reference===0)return ['—','—'];
  const ratio=score/reference*100;
  const delta=Number((ratio-100).toFixed(2));
  return [ratio.toFixed(2)+'%',(delta>0?'+':'')+delta.toFixed(2)+'%'];
}
function variants(c){
  const key=el('variants').value;
  if(key==='gear'){
    const items=[];
    const fEngines=teammateChoices.f[c.fchar].engines, rEngines=teammateChoices.r[c.rchar].engines;
    for(const set of ['star','rose'])for(const two of Object.keys(twoPieceNames))for(const [fe,fName] of fEngines)for(const [re,rName] of rEngines){
      items.push({changes:{set,two,fe:Number(fe),re:Number(re)},label:[(set==='star'?'星之碑':'荆棘玫瑰')+' 4＋'+twoPieceNames[two]+' 2',fName,rName].join(' / ')});
    }
    return items;
  }
  const rank=key.length===2;
  const actor=key[0]==='f'?teammateChoices.f[c.fchar||'jufufu']:key[0]==='r'?teammateChoices.r[c.rchar||'robin']:agents.find(([id])=>id===key[0]);
  const engineId=key==='rr'?(c.re||1):1;
  const engineName=actor.engines?.find(([id])=>Number(id)===engineId)?.[1]??actor[4]?.[0];
  return Array.from({length:rank?5:7},(_,i)=>{
    const level=rank?i+1:i;
    const changes={[key]:level};
    if(key==='fr' || key==='rr')changes[key[0]+'e']=engineId;
    return {changes,label:rank?engineName+' '+level+' 星':actor.name?actor.name+' '+level+' 影':actor[1]+' '+level+' 影'};
  });
}
let revision=0, manualBaseline=null;
function showComparisons(c,build){
  const version=++revision;
  const shadowComparison=el('variants').value==='w';
  const items=variants(c);
  const baselineScore=manualBaseline?.score??optimized({...c,w:0,f:0,r:0,wr:1,fr:1,rr:1,fe:c.fchar==='air'?0:1,re:c.rchar==='air'?0:1,set:'star',two:'inferno',main4:'crit',main5:'auto',main6:'def'})?.score;
  const [ratio,delta]=percentages(build.score,baselineScore);
  const label=manualBaseline?'手动基线':'全 01';
  el('compare').textContent=`相对${label}　${ratio}　（${delta}）`;
  el('reference').textContent=`${manualBaseline?.description??'全 01 · 星之碑'}　${baselineScore==null?'该词条总数下无可行分配':fmt(baselineScore)}${baselineScore===0?'　基准伤害为零，百分比无定义':''}`;
  el('defaultBaseline').hidden=!manualBaseline;

  const reference=shadowComparison?solve({...c,w:0},build).score:baselineScore;
  el('shadowNote').hidden=!shadowComparison;
  el('baselineNote').hidden=shadowComparison || !!manualBaseline;
  el('deltaHeading').hidden=shadowComparison;
  el('previousShadowHeading').hidden=!shadowComparison;
  el('ratioHeading').textContent=shadowComparison?'较挽昼 0 影提升':'相对'+label;
  const rows=el('variantRows');
  rows.innerHTML=items.map(({changes,label})=>{
    const selected=Object.entries(changes).every(([k,v])=>c[k]===v);
    return `<tr${selected?' class="selected"':''}><td>${label}${selected?' · 当前':''}</td><td>…</td><td>…</td><td>…</td></tr>`;
  }).join('');
  function fill(i,previousScore){
    if(version!==revision)return;
    const variant={...c,...items[i].changes};
    const value=shadowComparison?(variant.w===0?reference:solve(variant,build).score):optimized(variant)?.score;
    const cells=rows.children[i].cells;
    const [ratio,delta]=percentages(value,reference);
    cells[1].textContent=value==null?'无可行分配':fmt(value);
    cells[2].textContent=shadowComparison?delta:ratio;
    cells[3].textContent=shadowComparison?percentages(value,previousScore)[1]:delta;
    if(i+1<items.length)setTimeout(()=>fill(i+1,value),0);
  }
  setTimeout(()=>fill(0),0);
}
function showBuffGains(config,build){
  const score=assault=>solve({...config,assault},build)?.score;
  const buffSelect=el('assaultBuff'), regionSelect=el('regionChoice');
  const selectedBuff=recommendedBuffs.get(buffSelect.value);
  const withoutBuff=build && score(currentAssault(null));
  for(const option of buffSelect.options){
    const buff=recommendedBuffs.get(option.value);
    if(!buff)continue;
    const withBuff=build && (option.selected?build.score:score(currentAssault(buff)));
    option.textContent=buff.name+' · '+percentages(withBuff,withoutBuff)[1];
  }
  const withoutRegion=build && score(currentAssault(selectedBuff,null));
  const regionGain=el('regionGain');
  regionGain.hidden=!regionSelect.value || regionSelect.options.length>1;
  for(const option of regionSelect.options){
    const region=assaultRegions[option.value];
    // Switching region variants applies that variant's default stacks and clears its extra condition.
    const withRegion=build && (option.selected?build.score:score(currentAssault(selectedBuff,region,region.max??0,false)));
    const gain=percentages(withRegion,withoutRegion)[1];
    option.textContent=regionName(option.value)+' · '+gain;
    if(option.selected)regionGain.textContent=(region.name||'区域效果')+' · '+gain;
  }
}
const singleRolls=[
  ['穿透率','customPen',2.4,'%'],
  ['防御力百分比','customDefPct',100*discRoll.def,'%'],
  ['普通增伤','customGeneral',3,'%'],
  ['暴击率','customCrit',2.4,'%'],
  ['初始暴击伤害','extraInitialCritDmg',4.8,'%'],
  ['固定防御','customFlatDef',15,' 点'],
  ['穿透值','extraFlatPen',9,' 点'],
  ['减防（无视防御）','customIgnore',2.4,'%'],
  ['锐化增伤','customSharp',3,'%'],
  ['火属性增伤','customFire',3,'%'],
  ['锐暴伤害','customCritDmg',4.8,'%'],
  ['失衡易伤','customStun',3,'%']
];
function renderRollGains(config,build){
  el('rollGainRows').innerHTML=singleRolls.map(([label,key,step,unit])=>{
    const modified={...config,[key]:(config[key]??0)+step};
    const added=solve(modified,build).score-build.score;
    const damage=Math.round(added);
    const gain=build.score>0?(100*added/build.score).toFixed(2)+'%':'—';
    return `<tr><td>${label}</td><td>+${step}${unit}</td><td>${damage>0?'+':''}${fmt(damage)}</td><td>${gain}</td></tr>`;
  }).join('');
}
function renderTeammateBuffs(c,sources){
  const categories={general:'普通增伤',teamDef:'固定防御力',teamPen:'穿透率',sharp:'锐化增伤',critDmg:'锐暴伤害',
    ignore:'无视防御',resDown:'减抗或无视火抗',received:'目标受伤',stun:'失衡易伤'};
  for(const slot of ['f','r']){
    const id=c[slot+'char'], name=teammateChoices[slot][id].name, prefix=name+' · ';
    const lines=[];
    for(const [group,label] of Object.entries(categories)){
      const entries=sources[group].filter(([source])=>source.startsWith(prefix));
      if(!entries.length)continue;
      const format=value=>{
        if(group==='teamDef')return Number(value.toFixed(3))+' 点';
        const amount=Number((value*100).toFixed(4));
        return amount+(group==='stun'?' 个百分点':'%');
      };
      const total=entries.reduce((sum,[,value])=>sum+value,0);
      const detail=entries.map(([source,value])=>source.slice(prefix.length)+(entries.length>1?' +'+format(value):'')).join('、');
      const condition=group==='stun' && !c.stun?'，当前未失衡':'';
      lines.push('<li><b>'+label+' +'+format(total)+'</b>（'+detail+condition+'）</li>');
    }
    if(id==='jufufu'){
      lines.push('<li><b>虎啸</b>：连携增伤 +'+pct(juChainBonus)+'，终结技增伤 +'+pct(juUltimateBonus)+'。</li>');
      const [chain,ult]=juPotential[c.potential];
      if(chain || ult)lines.push('<li><b>潜能「侠肝义胆」</b>：连携最终伤害 +'+pct(chain)+'，终结技最终伤害 +'+pct(ult)+'。</li>');
      lines.push('<li>虎啸提供 '+(c.f>=2?72:50)+'% 战斗中普通暴伤，对挽昼锐暴的贡献为 0。此配队关闭橘福福额外能力。</li>');
    }
    if(id==='rina')lines.push('<li>按丽娜自身 '+Number(rinaBuffs(c).personalPen.toFixed(3))+'% 穿透率、人偶在场且挽昼位于人偶附近计算。</li>');
    const summary=el(slot+'BuffSummary');
    if(id==='air'){summary.textContent='空位，无队友增益。';continue;}
    summary.innerHTML='<h4>对挽昼的增益</h4><ul>'+lines.join('')+'</ul>';
  }
}
function render(saveBaseline=false){
  el('multiplierStatus').textContent='';
  el('discSearchStatus').textContent='';
  const valid=[...document.querySelectorAll('input:not([data-field]):enabled')].every(x=>x.value!=='' && x.checkValidity());
  const c=valid?getConfig():null;
  if(c){
    rankAssaultBuffs(c);
    c.assault=currentAssault(recommendedBuffs.get(el('assaultBuff').value));
  }
  const b=c?optimized(c):null;
  showBuffGains(c,b);
  el('optimizeDiscs').disabled=!valid;
  el('saveBaseline').disabled=!b;
  el('refreshMultipliers').disabled=!b;
  if(!b){
    for(const id of ['fBuffSummary','rBuffSummary','markModeCompare'])el(id).replaceChildren();
    el('ultimateExample').textContent=valid?'当前配置无可行配装。':'请检查输入后查看算例。';
    revision++;
    el('total').textContent=valid?'无可行分配':'请检查输入';
    for(const id of ['split','summaryStats','compare','reference','variantRows','best','sourceRows','coreRows','markSummary','multiplierRows','rollGainRows'])el(id).replaceChildren();
    for(let i=0;i<skills.length;i++)for(const prefix of ['m','d','stored','a'])el(prefix+i).textContent='—';
    if(valid){
      el('discSearchStatus').textContent=`当前主属性无法分配 ${c.rollBudget} 条。可自动选择其他主属性，或减少词条总数。`;
      saveSettings();
    }
    return;
  }
  if(c.w>=2){
    const additive=c.markMode==='add';
    const other=solve({...c,markMode:additive?'multiply':'add'},b);
    const [mult,add]=additive?[other,b]:[b,other];
    el('markModeCompare').textContent='固定当前驱动，加算相比乘算：烬灭 '+percentages(add.mark,mult.mark)[1]+'，整轮总伤害 '+percentages(add.score,mult.score)[1]+'。';
  }else el('markModeCompare').textContent='两种算法从挽昼二影起生效。';
  renderTeammateBuffs(c,b.buffSources);
  renderUltimateExample(c,b);
  renderRollGains(c,b);
  if(saveBaseline){
    const team=['挽昼',teammateChoices.f[c.fchar].name,teammateChoices.r[c.rchar].name];
    const label=team.map((name,i)=>name==='空气'?name:name+' '+c[['w','f','r'][i]]+'影').join(' / ');
    manualBaseline={score:b.score,description:'已固定 · '+label};
  }
  const rEngines=teammateChoices.r[c.rchar].engines;
  const rankEngine=rEngines.find(([id])=>Number(id)===(c.re||1))??rEngines[0];
  if(el('variants').selectedOptions[0]?.disabled)el('variants').value='w';
  el('variants').querySelector('[value="rr"]').textContent=rankEngine[1]+'星级';
  el('rr').disabled=!c.re;el('fr').disabled=!c.fe;
  el('total').textContent=fmt(b.score);
  el('split').textContent=`直接伤害　${fmt(b.direct)}　 /　烬灭　${fmt(b.mark)}`;
  el('summaryStats').innerHTML=[['战斗防御力',fmt(b.combatDef)],['战斗暴击率',pct(b.rate)],['锐暴伤害',pct(b.critDmg)],['无视防御',pct(b.ignore)]].map(([k,v])=>`<span>${k}<b>${v}</b></span>`).join('');
  const line=(k,v)=>`<div class="metricline"><span>${k}</span><b>${v}</b></div>`;
  const balanced=makeDiscs(b.rolls,b.mains.map(stat=>blockedSubstat[stat]??-1),b.discs);
  const rollsText=rolls=>rolls.map((v,i)=>v?statNames[i]+' ×'+v:'').filter(Boolean).join('　') || '—';
  const rankedRolls=b.rolls.slice().sort((a,b)=>b-a);
  const topTwo=rankedRolls[0]+rankedRolls[1];
  el('best').innerHTML=line('有效副词条　'+b.rolls.reduce((sum,n)=>sum+n,0)+' / '+c.rollBudget,rollsText(b.rolls))+line('最多三种合计 / X',(topTwo+rankedRolls[2])+' / '+c.tripleRollLimit)+line('最多两种合计 / Y',topTwo+' / '+c.pairRollLimit)+line('单种最多 / Z',rankedRolls[0]+' / '+c.maxRollsPerStat)+line('副词条暴伤折合暴击率',pct(b.rolls[2]*discRoll.cd)+' × 0.35 = '+Number((b.rolls[2]*discRoll.cd*35).toFixed(2))+'%')+line('初始防御 ＋ 战斗加成',fmt(b.initial)+' ＋ '+fmt(b.combatDef-b.initial))+line('穿透率',pct(b.penRate))+
    `<details open><summary>每盘主属性与有效副词条</summary>${balanced.map((rolls,i)=>line((i+1)+' 号 · '+mainLabels[b.mains[i]],rolls.reduce((sum,n)=>sum+n,0)+' 条｜'+rollsText(rolls))).join('')}</details>`;
  const capped=b.rate>=2-1e-10?b:optimized({...c,requireFullCrit:true});
  el('best').insertAdjacentHTML('beforeend','<h3 class="disc-title">同条件下的 200% 暴击率对照</h3>'+
    (capped?line('最高期望方案',pct(b.rate)+' 暴击率 · '+fmt(b.score))+line('达到 200% 的最优方案',pct(capped.rate)+' 暴击率 · '+fmt(capped.score))+
      line('满暴方案词条',rollsText(capped.rolls))+line('满暴方案相对最高期望',percentages(capped.score,b.score)[1]):
      `<p>当前主属性在 ${c.rollBudget} 条预算内无法达到 200% 暴击率。</p>`));
  const groups={core:{label:'核心五招',direct:0,accrued:0},other:{label:'二影其余招式',direct:0,accrued:0},rupture:{label:'毁伤',direct:0,accrued:0}};
  b.rows.forEach((r,i)=>{
    el('m'+i).textContent=pct(r.mult)+' / '+pct(r.base);
    el('d'+i).textContent=fmt(r.direct);
    el('stored'+i).textContent=r.accrued?fmt(r.accrued)+' · '+pct(r.accrued/r.direct):'—';
    el('a'+i).textContent=r.mark?fmt(r.mark):'—';
    groups[r.source].direct+=r.direct;
    groups[r.source].accrued+=r.accrued;
  });
  el('sourceRows').innerHTML=Object.values(groups).map(g=>
    `<tr><td>${g.label}</td><td>${fmt(g.direct)}</td><td>${b.direct?pct(g.direct/b.direct):'—'}</td><td>${fmt(g.accrued)}</td></tr>`).join('');
  el('coreRows').innerHTML=b.rows.filter(r=>r.source==='core').map(r=>
    `<tr><td>${r.name}</td><td>${pct(r.mult)}</td><td>${r.count}</td><td>${fmt(r.direct)}</td><td>${fmt(r.accrued)}</td></tr>`).join('');
  el('multiplierRows').innerHTML=b.rows.map((row,i)=>{
    const cells=multiplierFields.map(field=>{
      const edited=Object.hasOwn(overrides[i],field);
      const value=edited?Number((100*overrides[i][field]).toPrecision(14)):Number((100*row.display[field]).toFixed(2));
      return `<td><input data-field="${field}" data-skill-row="${i}" class="${edited?'overridden':''}" aria-label="${row.name} ${field}" type="number" step="any" value="${value}"></td>`;
    });
    return '<tr><td>'+row.name+'</td>'+cells.join('')+'</tr>';
  }).join('');
  el('markSummary').textContent='从上到下结算。补充招式排在两段终结技之后，其直伤计入总伤害，最后一次引爆后新增的烬痕只计积攒。纯闪避、切换主控和招架支援的直伤为 0。';
  showComparisons(c,b);
  saveSettings();
}
function syncTeammate(key){
  const id=el(key+'char').value, choice=teammateChoices[key][id];
  const empty=id==='air';
  const build=teammateBuilds[id]||{};
  for(const field of [key,key+'r',key+'e']){
    const control=el(field);
    control.closest('label').hidden=empty;
    control.disabled=empty;
  }
  for(const field of [key,key+'r'])el('variants').querySelector('[value="'+field+'"]').disabled=empty;
  el(key).value=defaultShadows[id];
  restoreControl(el(key),build.shadow);
  el('potentialLabel').hidden=el('fchar').value!=='jufufu';
  el('rinaControls').hidden=el('rchar').value!=='rina';
  el('rinaBasePen').disabled=el('rinaControls').hidden;
  el('beat').disabled=el('rchar').value!=='robin';
  el('variants').querySelector('[value="'+key+'"]').textContent=choice.name+'影画';
  el('variants').querySelector('[value="'+key+'r"]').textContent=choice.engines[0][1]+'星级';
  el(key+'name').textContent=choice.name;
  el(key+'role').textContent=choice.role;
  const portrait=el(key+'portrait');
  portrait.hidden=empty;
  portrait.style.display='';
  if(empty)portrait.removeAttribute('src');
  else portrait.src=choice.portrait;
  el(key+'e').innerHTML=options(choice.engines);
  restoreControl(el(key+'e'),build.engine);
  el(key+'r').value='1';
  restoreControl(el(key+'r'),build.rank);
  el(key+'engineLabel').textContent=choice.engines.map(([,name])=>name).join(' / ');
}
el('reset').onclick=()=>{defaults.forEach((v,i)=>el('n'+i).value=v);render()};
document.addEventListener('change',event=>{
  if(event.target.id==='fchar')syncTeammate('f');
  if(event.target.id==='rchar')syncTeammate('r');
  const input=event.target;
  if(input.id==='boss')syncBoss();
  if(input.id==='boss' || input.id==='regionChoice')syncRegion(true);
  if(input.dataset.field){
    const row=overrides[Number(input.dataset.skillRow)];
    if(input.value==='')delete row[input.dataset.field];
    else row[input.dataset.field]=input.valueAsNumber/100;
  }
  el('calcStatus').textContent='';
  render();
});
el('saveBaseline').onclick=()=>render(true);
el('optimizeDiscs').onclick=()=>{
  const config=getConfig();
  const current=optimized(config);
  let best=null, bestSet=config.set, bestTwo=config.two;
  const locked=el('lockDiscSets').checked;
  const fourPieceSets=locked?[config.set]:Array.from(el('set').options,option=>option.value);
  const twoPieceSets=Object.keys(twoPieceNames);
  for(const set of fourPieceSets){
    for(const two of twoPieceSets){
      const candidate=solve({...config,set,two},null,true);
      if(candidate && (!best || candidate.score>best.score)){
        best=candidate;
        bestSet=set;
        bestTwo=two;
      }
    }
  }
  if(!best){el('discSearchStatus').textContent='当前总数和限制下没有可行方案。';return;}
  el('set').value=bestSet;
  el('two').value=bestTwo;
  for(let slot=4;slot<=6;slot++)el('main'+slot).value=best.mains[slot-1];
  render();
  if(!current){el('discSearchStatus').textContent='已应用可行的最高期望方案。';return;}
  const change=percentages(best.score,current.score)[1];
  el('discSearchStatus').textContent=best.score===current.score?'已应用当前预算内的最高期望配装。':
    `已应用最高期望方案。单轮伤害 ${fmt(current.score)} → ${fmt(best.score)}（${change}）。`;
};
el('refreshMultipliers').onclick=()=>{
  overrides=skills.map(()=>({}));
  solved.clear();
  render();
  el('multiplierStatus').textContent='已按当前配置刷新。';
};
el('defaultBaseline').onclick=()=>{manualBaseline=null;render();};
el('recalculate').onclick=()=>{
  solved.clear();
  render();
  el('calcStatus').textContent=el('saveBaseline').disabled?el('total').textContent:'已重新计算';
};
const settingsKey='sunbringer-calculator.settings.v1';
const teamFields=new Set(['fchar','rchar','f','r','fe','re','fr','rr']);
const settingsControls=Array.from(document.querySelectorAll('select[id],input[id]'))
  .filter(control=>!teamFields.has(control.id) && !control.closest('#rows'));

function restoreControl(control,value){
  if(control.type==='checkbox'){
    if(typeof value==='boolean')control.checked=value;
  }else if(typeof value==='string'){
    if(control.tagName==='SELECT'){
      if(Array.from(control.options).some(option=>option.value===value))control.value=value;
    }else{
      const original=control.value;
      control.value=value;
      if(!Number.isFinite(control.valueAsNumber) || !control.validity.valid)control.value=original;
    }
  }
}
function saveSettings(){
  const fields={};
  for(const control of settingsControls){
    if(control.type==='number' && (!Number.isFinite(control.valueAsNumber)||!control.validity.valid))return;
    fields[control.id]=control.type==='checkbox'?control.checked:control.value;
  }
  const rotation={};
  for(const [i,skill] of skills.entries()){
    const count=el('n'+i);
    if(!Number.isFinite(count.valueAsNumber)||!count.validity.valid)return;
    rotation[skill.name]={count:count.value,overrides:overrides[i]};
  }
  for(const slot of ['f','r']){
    const character=el(slot+'char').value;
    fields[slot+'char']=character;
    teammateBuilds[character]={shadow:el(slot).value,engine:el(slot+'e').value,rank:el(slot+'r').value};
  }
  try{
    localStorage.setItem(settingsKey,JSON.stringify({fields,teammateBuilds,rotation,manualBaseline}));
  }catch{
    el('storageWarning').hidden=false;
  }
}
function restoreSettings(){
  let saved;
  try{saved=JSON.parse(localStorage.getItem(settingsKey));}catch{}
  const fields=saved?.fields||{};
  for(const slot of ['f','r']){
    for(const character of Object.keys(teammateChoices[slot])){
      const build=saved?.teammateBuilds?.[character];
      if(build && typeof build==='object')teammateBuilds[character]=build;
    }
    restoreControl(el(slot+'char'),fields[slot+'char']);
    syncTeammate(slot);
  }
  restoreControl(el('boss'),fields.boss);
  syncBoss();
  const legacySeason=assaultSeasons.find(s=>s.id===fields.assaultSeason);
  const preferredRegion=fields.regionChoice??legacySeason?.regions[fields.boss];
  syncRegion(true,preferredRegion);
  // Restore the selected recommendation by its stable season ID before ranking the saved build.
  const active=activeAssaultSeasons();
  el('assaultBuff').innerHTML=options([['','无'],...active.map(s=>[s.id,''])]);
  const selectedId=fields.assaultSeason!==undefined?(fields.assaultBuff?fields.assaultSeason:''):fields.assaultBuff;
  restoreControl(el('assaultBuff'),selectedId);
  for(const control of settingsControls){
    if(['assaultBuff','regionChoice'].includes(control.id))continue;
    if((control.id==='regionStacks' || control.id==='regionExtra') &&
      (fields.boss!==el('boss').value || preferredRegion!==el('regionChoice').value))continue;
    restoreControl(control,fields[control.id]);
  }
  skills.forEach((skill,i)=>{
    const row=saved?.rotation?.[skill.name];
    restoreControl(el('n'+i),row?.count);
    for(const field of multiplierFields){
      const value=row?.overrides?.[field];
      if(Number.isFinite(value))overrides[i][field]=value;
    }
  });
  const baseline=saved?.manualBaseline;
  if(Number.isFinite(baseline?.score) && typeof baseline.description==='string')manualBaseline=baseline;
}
// A valid numeric edit may still have focus when the user closes the tab.
document.addEventListener('input',({target})=>{
  if(target.type!=='number' || !target.validity.valid)return;
  if(target.dataset.field){
    const row=overrides[Number(target.dataset.skillRow)];
    if(target.value==='')delete row[target.dataset.field];
    else row[target.dataset.field]=target.valueAsNumber/100;
  }
  saveSettings();
});
restoreSettings();
render();

let activeSeasonIds=activeAssaultSeasons().map(s=>s.id).join(',');
function refreshSeasonDates(){
  const ids=activeAssaultSeasons().map(s=>s.id).join(',');
  if(ids===activeSeasonIds)return;
  activeSeasonIds=ids;
  const previous=el('regionChoice').value;
  syncRegion();
  if(previous!==el('regionChoice').value)syncRegion(true);
  render();
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshSeasonDates();});
function scheduleSeasonChange(){
  const now=Date.now();
  const boundary=Math.min(...assaultSeasons.flatMap(s=>[s.begin,s.end])
    .map(day=>Date.parse(day+'T04:00:00+08:00')).filter(t=>t>now));
  if(Number.isFinite(boundary))setTimeout(()=>{
    refreshSeasonDates();
    scheduleSeasonChange();
  },Math.min(boundary-now,2147483647));
}
scheduleSeasonChange();








