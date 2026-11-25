const el=id=>document.getElementById(id);
const fmt=x=>Math.round(x).toLocaleString('zh-CN');
const options=arr=>arr.map(([value,label])=>`<option value="${value}">${label}</option>`).join('');
const numericOptions=(start,end,unit)=>options(Array.from({length:end-start+1},(_,i)=>[i+start,(i+start)+unit]));
const elementNames={200:'物理',201:'火',202:'冰',203:'电',204:'风',205:'以太'};
// Nanoka lists this elite in the 690531 boss stages.
bosses.push({id:300082,name:{text:'自律强袭单位·「提丰·破坏者型」'},def:952.8,weakness_ids:[203,205],resistance_ids:[201]});
const bossById=new Map(bosses.map(b=>[String(b.id),b]));
el('boss').insertAdjacentHTML('beforeend',bosses.map(b=>'<option value="' + b.id + '">' + b.name.text + '</option>').join(''));
const emptyTeammate={name:'空气',role:'空位',portrait:null,engines:[['0','无音擎']]};
const supportEngines=signature=>[['1',signature],[String(kaboomEngine),'好斗的阿炮'],['0','其他音擎']];
const teammateChoices={
  air:emptyTeammate,
  ...classicTeammates,
  ...anomalySupports,
  cissia:{...cissia,engines:[...cissia.engines,['0','其他音擎']]},
  jufufu:{name:jufufu.name,role:jufufu.role,portrait:jufufu.portrait,engines:[['1','福虓炉炉'],['0','燃狱齿轮']]},
  roxy:{name:roxy.name,role:roxy.role,portrait:roxy.portrait,weaponId:roxy.weaponId,engines:[...roxy.engines,['0','其他音擎']]},
  norma:{name:'诺姆',role:'击破 · 火',portrait:'https://i.gachabase.net/ZCzHYreyZcNjBTh-HiFeXL7mazPZS4lVSvWEcZkklxc/q:50/f:webp/plain/zzz/assets/136be6592f54d191d26e33e3d8cd955c.png',engines:[['1','首席跟班'],['0','其他音擎']]},
  trigger:{name:'扳机',role:'击破 · 电',portrait:'https://i.gachabase.net/3DKa3mJdWQ2VSLRRL2zwqJAmLmYKPbTeLw78m_sltUw/q:50/f:webp/plain/zzz/assets/0f407c34390c90ec495e3b37ab73039a.png',engines:[['1','索魂影眸'],['0','其他音擎']]},
  robin:{name:'知更鸟',role:'防护 · 以太',portrait:portraits[2],engines:[['1','星韵流彩'],['2','奔袭獠牙'],['0','仅生命主词条']]},
  zhao:{name:'照',role:'防护 · 冰',portrait:'https://i.gachabase.net/ni0iWLFUBF06XUX6BjEj3U7sGyoXikiNJDaLvfrGf3A/q:50/f:webp/plain/zzz/assets/e9aa026226f0231bad4f50777287e78c.png',engines:[['1','半糖雪兔'],['0','其他音擎']]},
  panYinhu:{name:'潘引壶',role:'防护 · 物理',portrait:'https://i.gachabase.net/8xWVRQmNMERawYFF0grDDHhPyN0_vhQq_UU_sNzeeLQ/q:50/f:webp/plain/zzz/assets/0287a5b8495d281dc40a41c27317747d.png',engines:[['1','震元奇枢'],['0','其他音擎']]},
  orphie:{name:'奥菲丝&「鬼火」',role:'强攻 · 火',portrait:'https://i.gachabase.net/N5JiSCixaGOw_s1Qmp6I75NNIK7iqCs-j4ppI6zpZ-o/q:50/f:webp/plain/zzz/assets/e1ae015914c6c5f8839b9774bab42fd7.png',engines:[['1','嚣枪喧焰'],['0','其他音擎']]},
  rina:{name:'丽娜',role:'支援 · 电',portrait:'https://i.gachabase.net/Z_0BPPOC5MxvcyiogXatpCYqOMc4jknjbBs-H2d1m4g/q:50/f:webp/plain/zzz/assets/9da302acd93c121cccd36bc60aff4cf2.png',engines:supportEngines('啜泣摇篮')},
  astra:{name:'耀嘉音',role:'支援 · 以太',portrait:'https://i.gachabase.net/G-X2Jjl6nb1Myun1UNE3YztEH262-6Wk55pEAXv_RbQ/q:50/f:webp/plain/zzz/assets/a44d064d8e864a20dbe94ed1cdc344ac.png',engines:supportEngines('玲珑妆匣')},
  sunna:{name:'千夏',role:'支援 · 物理',portrait:'https://i.gachabase.net/ooILAaJDQfZG5xnwBqwbZ3b-2LkMljqdxa5G7Qg-QFI/q:50/f:webp/plain/zzz/assets/4b4e0e6888e17718b14d7070d6624e58.png',engines:supportEngines('思络成歌')},
  lucia:{name:'卢西娅',role:'支援 · 以太',portrait:'https://i.gachabase.net/pnMd6FdGV8_vXCv2HrDoHbJiOkSd2n63ot8KRl2-Xi8/q:50/f:webp/plain/zzz/assets/fbd2b2dc05ad95d20f2721beea8e56a8.png',engines:supportEngines('铸梦炉歌')},
  nicole:{name:'妮可',role:'支援 · 以太',portrait:'https://i.gachabase.net/ovM4VCTFKeIVrGPJheczHmg65yMf7vRnomTrObhzbgU/q:50/f:webp/plain/zzz/assets/12ed5e9e25b596513a34b747e50a7280.png',engines:supportEngines('聚宝箱')},
  dialyn:{name:'琉音',role:'击破 · 物理',portrait:'https://i.gachabase.net/Eg7PbgpfnGWXdlOthq6G9Kkq2SOy7rpHNqRvasLHp6A/q:50/f:webp/plain/zzz/assets/0343c4645bf6564394a5f8e263bfca1c.png',engines:[['1','昨夜来电'],['0','其他音擎']]}
};
el('two').innerHTML=options(Object.entries(twoPieceNames));
const tunableSlots=[4,5,6];
el('mainSlots').innerHTML=mainPools.map((pool,i)=>{
  const choices=pool.map(stat=>[stat,mainLabels[stat]]);
  if(i===3 || i===4)choices.unshift(['auto','自动择优']);
  const fixed=pool.length===1;
  const label=`${i+1} 号位`;
  return `<div class="disc-field">
    <label for="main${i+1}">${label}${fixed?' · 固定':''}</label>
    <select id="main${i+1}" ${fixed?'disabled':''}>${options(choices)}</select>
    ${fixed?'':`<label class="disc-lock"><input type="checkbox" id="lockMain${i+1}" aria-label="锁定${label}主属性"></label>`}
  </div>`;
}).join('');
el('main4').value='crit';
el('rollLocks').innerHTML=statNames.map((name,i)=>`<div class="disc-field">
  <label id="rollLabel${i}" for="discRoll${i}">${name}条数</label>
  <input id="discRoll${i}" type="number" min="0" max="36" step="1" value="0" required disabled>
  <label class="disc-lock"><input type="checkbox" id="lockDiscRoll${i}" aria-label="锁定${name}条数"></label>
</div>`).join('');
const rollInputs=statNames.map((_,i)=>el('discRoll'+i));
const rollLocks=statNames.map((_,i)=>el('lockDiscRoll'+i));
const sunbringer={name:'挽昼',role:'锋御 · 燎源',element:201,ultimate:'此愿，重塑万象',portrait:portraits[0],engines:[['1','蜃炎梦火']]};
const leadChoices={sunbringer,nekomata,anby,yeShunguang,yixuan,starlightBilly,...expandedLeads};
const sunInitial={set:'star',two:'inferno',main4:'crit',main5:'auto',main6:'def'};
const sunFour={star:'星之碑',rose:'荆棘玫瑰'};
let main='sunbringer';
const lead=()=>leadChoices[main];
const leadSetup={
  sunbringer:{skills,four:sunFour,two:twoPieceNames,initial:sunInitial},
  nekomata:{skills:nekomataSkills,four:nekoFour,two:nekoTwo,initial:nekoInitial},
  anby:{skills:anbySkills,four:anbyFour,two:anbyTwo,initial:anbyInitial},
  yeShunguang:{skills:yeSkills,four:yeFour,two:yeTwo,initial:yeInitial},
  yixuan:{skills:yiSkills,four:yiFour,two:yiTwo,initial:yiInitial},
  starlightBilly:{skills:billySkills,four:billyFour,two:billyTwo,initial:billyInitial},
  ...Object.fromEntries(Object.entries(expandedLeads).map(([id,actor])=>[id,expandedDriveSetup(actor)]))
};
const activeSkills=()=>leadSetup[main].skills;
const fourPieces=()=>leadSetup[main].four;
const twoPieces=()=>leadSetup[main].two;
const defaultDiscs=()=>leadSetup[main].initial;
const leadRollNames=id=>id==='miyabi'?['攻击 %','暴击率','暴击伤害','异常精通']:usesRupture({main:id})?['生命 %','暴击率','暴击伤害','攻击 %']:
  usesSharp({main:id})?statNames:['攻击 %',...statNames.slice(1)];
function teammateCard(slot,index){
  const initial=defaultTeammates[slot];
  const choices=agentOptions(teammateChoices,initial);
  return `<div class="card team-card">${agentCardHeader(slot+'char','队友 '+(index+1),choices)}
    <div class="fields">
      <label>意象影画<select id="${slot}">${numericOptions(0,6,' 影')}</select></label>
      <label>音擎星级<select id="${slot}r">${numericOptions(1,5,' 星')}</select></label>
      ${weaponCardField(slot+'e')}<small class="wide weapon-hint" id="${slot}WeaponHint" hidden></small>
    </div>
    <details class="team-details" id="${slot}Advanced">
      <summary>驱动套装与进阶设置</summary>
      <div class="fields" id="${slot}Fields">
        <label class="wide" hidden>队友驱动套装<select id="${slot}d" disabled></select></label>
        <label class="wide roll-limit" hidden><input id="${slot}MountainFull" type="checkbox" checked disabled>山大王装备者暴击率达 50%</label>
        <label class="wide">队友伤害系数<input id="${slot}DamageCoefficient" type="number" min="0" step="any" value="0" required></label>
        <label class="wide roll-limit" hidden><input id="${slot}ExtraRotation" type="checkbox" checked disabled><span id="${slot}ExtraRotationLabel"></span></label>
      </div>
    </details>
    <details class="team-details"><summary id="${slot}BuffTitle">队友增益</summary><div id="${slot}BuffSummary" class="team-buffs"></div></details></div>`;
}
el('cards').innerHTML=`<div class="card team-card team-card-lead"><span class="lead-card-marker">主 C</span>
  ${agentCardHeader('mainAgent','主 C',agentOptions(leadChoices,'sunbringer'))}
  <div class="fields"><label>意象影画<select id="w">${numericOptions(0,6,' 影')}</select></label><label>音擎星级<select id="wr">${numericOptions(1,5,' 星')}</select></label>
  ${weaponCardField('we')}<small class="wide weapon-hint" id="leadWeaponHint" hidden></small></div>
  <details class="team-details" id="leadPotentialSettings" hidden><summary>潜能觉醒</summary><div class="fields">
    <label class="wide" data-neko hidden>猫的报恩<select id="nekoPotential"></select></label>
    <label class="wide" data-anby hidden>银白色的心<select id="anbyPotential"></select></label>
  </div></details>
  <details class="team-details"><summary>自身增益</summary><div id="leadBuffSummary" class="team-buffs"></div></details></div>`+teammateSlots.map(teammateCard).join('');
const teammateBuilds={}, leadWeaponRanks={};
// Ju Fufu's zero-ID option is an actual W-Engine. Other zero-ID options are placeholders.
const hasEngineRank=(character,engine)=>engine!==0 || character==='jufufu';
function savedEngineRank(character,engine){
  const rank=Number(teammateBuilds[character]?.engineRanks?.[engine]);
  return Number.isInteger(rank) && rank>=1 && rank<=5?rank:1;
}
el('kaboomStacks').innerHTML=numericOptions(0,4,' 层');
el('kaboomStacks').value='4';
for(const id of ['astralStacks','snowbunnyStacks']){
  el(id).innerHTML=numericOptions(0,maxDiscStacks,' 层');
  el(id).value=String(maxDiscStacks);
}
el('leadDiscStacks').innerHTML=Object.entries(leadDiscStackRules).map(([key,{name}])=>
  `<label>${name}层数<input id="${key}Stacks" type="number" min="0" max="${maxDiscStacks}" step="1" value="${maxDiscStacks}"></label>`).join('');
const defaultShadows={jufufu:1,rina:1};
const defaultLeadShadows={sunbringer:2};
setupAgentPicker({mainAgent:leadChoices,fchar:teammateChoices,rchar:teammateChoices});
const potentialOptions=options(['未觉醒','I','II','III','IV','V','VI'].map((label,i)=>[i,label]));
for(const id of ['nekoPotential','anbyPotential']){
  el(id).innerHTML=potentialOptions;
  el(id).value=6;
}
el('fFields').insertAdjacentHTML('beforeend',
  '<label class="wide" id="potentialLabel">潜能觉醒 · 侠肝义胆<select id="potential">'+
  potentialOptions+'</select></label>');
el('potential').value=6;
el('rFields').insertAdjacentHTML('beforeend',
  '<div class="wide fields" id="rinaControls" hidden><label>潜能觉醒 · 完美侍奉<select id="rinaPotential">'+potentialOptions+
  '</select></label><label>丽娜觉醒前穿透率 %（以专武为基准）<input id="rinaBasePen" type="number" min="0" max="100" step="any" value="70.4"></label></div>');
el('rinaPotential').value=6;
el('rFields').insertAdjacentHTML('beforeend',
  '<label class="wide" id="cissiaRegenLabel" hidden>希希芙初始能量自动回复<input id="cissiaRegen" type="number" min="0" step="any" value="3.68" disabled></label>');
const extraTeamFields={
  koleda:['珂蕾妲',`<label>潜能觉醒 · 爆破作业<select id="koledaPotential">${potentialOptions}</select></label>
    <label>连携增伤层数<input type="number" id="koledaStacks" min="0" max="2" value="2"></label>`],
  lycaon:['莱卡恩','<label class="roll-limit"><input type="checkbox" id="lycaonAwakened" checked>潜能觉醒 · 掠冰</label>'],
  lighter:['莱特',`<label>莱特战斗冲击力（含音擎和士气）<input type="number" id="lighterImpact" min="0" step="any" value="270"></label>
    <label>昂扬层数<input type="number" id="lighterMoraleStacks" min="0" max="20" step="1" value="20"></label>
    <label>焰心桂冠 · 萎靡层数<input type="number" id="lighterLaurelStacks" min="0" max="20" step="1" value="20"></label>`],
  yuzuha:['柚叶','<label>六影紊乱倍率层数<input type="number" id="yuzuhaDisorderStacks" min="0" max="3" value="3"></label>'],
  nangongYu:['南宫羽',`<label>失衡后极性紊乱次数<input type="number" id="nangongPolar" min="0" max="2" value="2"></label>
    <label class="roll-limit"><input type="checkbox" id="nangongM2Polar" checked>二影连携触发极性紊乱</label>
    <label>结算异放的颤音层数<input type="number" id="nangongTremolo" min="0" max="4" value="4"></label>
    <label>六影失衡前颤音：改层数<input type="number" id="nangongTremoloM6" min="0" max="4" value="4"></label>`]
};
for(const [id,[name,content]] of Object.entries(extraTeamFields)){
  el('fFields').insertAdjacentHTML('beforeend',`<div class="wide fields" id="${id}Controls" aria-label="${name}战斗设置" hidden>${content}</div>`);
}
el('koledaPotential').value='6';
const expandedFieldId=(id,key)=>'lead-'+id+'-'+key;
el('expandedSettings').innerHTML=Object.entries(expandedControls).map(([id,fields])=>
  '<div class="fields" data-expanded-role="'+id+'" hidden>'+fields.map(([key,label,min,max,value])=>{
    const input=expandedFieldId(id,key);
    return max===undefined?'<label class="roll-limit"><input id="'+input+'" type="checkbox" '+(min===false?'':'checked')+' disabled>'+label+'</label>':
      '<label>'+label+'<input id="'+input+'" type="number" min="'+min+'" max="'+max+'" step="1" value="'+value+'" disabled></label>';
  }).join('')+'</div>'
).join('');
const multiplierFields=['coefficient','generic','skill','final','received','sharp','sheer','crit','anomaly','anomalyBonus','defense','resist','stun','mark'];
const activeMultiplierFields=()=>multiplierFields.filter(f=>(f!=='sharp' || usesSharp({main})) &&
  (f!=='sheer' || usesRupture({main})) && (f!=='mark' || main==='sunbringer') && (!['anomaly','anomalyBonus'].includes(f) || main==='miyabi'));
let overrides=[];
function buildRotation(){
  const roster=activeSkills(), normal=main!=='sunbringer';
  const firstOptional=roster.findIndex(s=>!s.defaultCount && !s.automatic);
  overrides=roster.map(()=>({}));
  el('rows').innerHTML=roster.map((s,i)=>`${i===firstOptional?`<tr class="skill-group"><th colspan="${normal?5:7}" scope="colgroup">补充招式 · 默认 0 次</th></tr>`:''}<tr><td id="skillName${i}">${s.name}</td><td id="m${i}"></td><td>${s.automatic?`<output id="n${i}">0</output>`:`<input aria-label="${s.name}次数" type="number" id="n${i}" value="${s.defaultCount??0}" step="${s.countStep??1}" min="0" max="99"><small id="extraCast${i}" class="extra-cast" hidden></small>`}</td><td id="d${i}"></td><td id="stored${i}" ${normal?'hidden':''}></td><td id="a${i}" ${normal?'hidden':''}></td><td id="share${i}"></td></tr>`).join('');
}
el('notes').innerHTML=`<p>按 Lv.60 代理人、Lv.60 音擎、核心技 F、基础技能 Lv.12 计算。影画三、五各提升两级。默认按招式明细从上到下结算。默认轮转中毁伤 3 次，不灭热忱 2 次，其余已启用招式各 1 次。下方补充招式默认 0 次，「斩棘」和「执旌」的一至四段可分别计次。「以挽昼之名」和「筑万众之梦」依次在两段终结技之前释放。消耗残痕触发的毁伤统一在「毁伤」行填写次数。毁伤沿用普攻技能等级，每消耗一层残痕触发一次。单次倍率为 80.5% ＋ (普攻等级 − 1) × 7.4%。同一招式多次发动时，表中直伤、烬痕和烬灭均为该行合计。</p>
<p>轮转按表中次序累计。¹「烬灭扣血」列记在引爆招式上，包含此前储存的烬痕。聚锋、长暗终焉、永昼之炬和两段终结技按实际伤害的 60% 积攒，毁伤为 40%。二影令其余招式按 30% 积攒。默认将各招式积攒量乘 1.35，四影指定的首次引爆改为乘 2。若选择加算假设，各招积攒率加 35 个百分点，该次四影引爆再加 65 个百分点。四影可指定给聚锋后的永昼之炬或第二段终结技。六影另结算第二段终结技自身所积攒烬痕的 80%。未引爆的烬痕不计入总伤害。</p>
<p>期望直伤 = 战斗防御力 × 招式倍率 ×（通用倍率 ＋ 招式增伤）× 锐化倍率 × 最终倍率 × 关卡受伤倍率 × 期望锐暴倍率 × 防御区 × 火抗区 × 失衡倍率。挽昼和蜃炎梦火分别提供 441 和 446 基础防御，武器另加 48% 防御。基础锐暴伤害为 150%，当前生效的加成见上方算例。初始暴伤的 35% 转为暴击率，虎啸的战斗中暴伤不计入此转换。设 M = 1 ＋ 锐暴伤害，单暴乘 M，二次锐暴成功乘 M²。暴击率 100% 至 200% 时，二次锐暴概率为暴击率超出 100% 的部分；达到 200% 时，每次均乘 M²。</p>
<p>防御区 = 794 ÷ [794 ＋ max(0, 敌防 × (1 − 无视防御) × (1 − 穿透率) − 穿透值)]。火抗区倍率 = 1 − 有效火抗。有效火抗为敌方基础火抗扣除减抗和无视火抗后的数值。例如基础火抗 −20%，挽昼一影再无视 15 个百分点，火抗区倍率为 1.35。敌防 953、火抗 0%、失衡 150% 是可改的示例目标。锐化增伤独立相乘，即 (1 ＋ 通用、火属性及招式增伤之和) × (1 ＋ 锐化增伤之和)。</p>
<p>极昼及当前队伍满足条件的状态和套装按全程覆盖计算。知更鸟装备雪兔时三层为 18%。击破队友默认使用赤翼夜曲，触发后为队伍提供 8% 锐化增伤，同队只计一次。两件炎狱为 10% 火伤。橘福福的潜能默认 VI 阶，可单独调整。虎啸下「侠肝义胆」的连携和终结最终倍率独立相乘，两段终结分别生效，烬痕按增幅后的直伤积攒。橘福福额外能力关闭，一影的 35 个百分点失衡易伤单独生效。福虓炉炉与星韵流彩按两层。燃狱齿轮影响击破效率，本页仅统计给定状态下的挽昼输出。</p>
<p><a href="https://zzz.gachabase.net/agents/1361/trigger/beta?lang=chs">扳机</a>的核心技 F 提供 35 个百分点失衡易伤，一影额外增加 20 个百分点，两项在未失衡时也计入。<a href="https://zzz.gachabase.net/w-engines/14136/spectral-gaze/beta?lang=chs">索魂影眸</a>由电属性追加攻击触发，1 至 5 星分别降低敌方防御力 25%、28.75%、32.5%、36.25%、40%，计入同一减防区。核心技与专武的 5 秒效果均按持续覆盖计算。二影满层提供 24% 战斗中普通暴伤，对挽昼锐暴的贡献为 0；扳机的自身伤害和击破效率不纳入挽昼轮转。</p>
<p>知更鸟按 26000 初始生命吃满守护咏叹，重音节拍默认已消耗。消耗重音节拍时，防御增益 = (440 ＋ 特殊技等级 × 30) × 1.25。各音擎方案均按配装达到生命门槛计算。<a href="https://zzz.gachabase.net/w-engines/14107/tusks-of-fury/beta?lang=chs">奔袭獠牙</a>按队友触发破招或极限闪避后的 20 秒增益覆盖本轮计算，1 至 5 星分别提供 18%、22.5%、27%、31.5%、36% 通用增伤。知更鸟六影另提供 15% 锐化增伤。</p>
<p>自定义词条只作用于当前战斗条件和配置对照。无视防御、穿透率、通用增伤、锐化增伤、火属性增伤、暴击率、锐暴伤害、防御力百分比、固定防御和失衡易伤都可以填写正负百分点。它们会参与驱动盘优化，所以改变后四至六号位和副词条可能重新分配。</p>
<p>一至三号位主属性固定，四至六号位可指定。自动寻优按词条数上限比较配装。四号位比较暴击率、暴击伤害和防御力，五号位比较火伤、穿透率和防御力，六号位选择防御力。固定轮转的锐化伤害使用防御力，生命、攻击及回复等主属性对本轮输出无直接加成。河豚电音两件提供 8% 穿透率，可与五号位叠至 32%；啄木鸟电音两件提供 8% 暴击率。荆棘玫瑰两件提供 16% 防御力，与星之碑四件搭配时两套合计提供 32% 防御力。六张均为荆棘玫瑰时，该套两件效果计一次。</p>
<p>所选数量的有效副词条在防御力 ${pct(discRoll.def)}、暴击率 2.4%、暴击伤害 4.8%（折合暴击率 1.68 个百分点）和固定穿透值 9 之间分配。每张盘有四种初始副词条与五次强化机会，主属性与同盘副词条互斥。其余位置由无效词条补足。面板先确定伤害最高的主属性和副词条总数，再优先均分各盘的有效词条数，并尽量分散同类词条。任意三种副词条的数量之和最多为 X，任意两种的数量之和最多为 Y，每一种最多为 Z。总预算为上限，组合限制较紧时允许使用更少的有效词条。副词条 ×6 表示初始 1 次加上强化 5 次。</p>
<p>任一队友位可选「空气」。只有队伍中有击破或防护队友时，本页才计入挽昼「众愿一心」的 25% 锐暴伤害。队友可切换为洛克茜、诺姆或丽娜。洛克茜按火浸染、风化及专武满覆盖计算，计入锐暴伤害、普通增伤与失衡易伤。诺姆与挽昼同阵营，技术鸿沟与首席跟班按满层计算。丽娜默认觉醒 VI 阶，觉醒前自身穿透率可改。按人偶在场、挽昼位于人偶附近计算。II 至 VI 阶增加丽娜自身穿透率 1.6 个百分点，并按各阶系数为队友提供防御力，上限 468 点。1 影的 130% 按技能归属应用于核心被动的穿透率共享。啜泣摇篮按满层普通增伤计算，与火属性和招式增伤相加。<a href="https://zzz.gachabase.net/agents/1211/rina/beta?lang=chs#potential">丽娜潜能与影画说明</a>。防护队友装备雪兔四件时，按队伍配置中所选层数覆盖本轮。对应角色的专属音擎星级仍可单独调节，未装备专属音擎时不计该专属效果。</p>
<p>潘引壶气绝、琉音二影、妮可聚宝箱等角色对目标造成的伤害提升，与通用、技能及属性增伤相加。关卡规定的受伤倍率在独立栏显示。</p>
<p>危局强袭战使用 2026-11-23 的 Nanoka 中文快照，仅展示有效期内的期次。每个进行中的正式服或测试服期次各取一项轮转期望总伤害最高的增益。所有候选沿用同一组配装限制、Boss 区域层数和条件触发设置。条件勾选及区域层数代表整轮战斗处在该窗口。防御百分比作用于挽昼初始防御，队友固定防御另加。失衡易伤仅在失衡状态生效。主 C 按招式轴计算，队友自身输出可用各自的伤害系数估算。额外出招采用队友卡片中的预设次数。</p>
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
  const previousBuff=recommendedBuffs.get(previous);
  recommendedBuffs.clear();
  for(const season of activeAssaultSeasons()){
    let best=null, bestScore=-Infinity;
    for(const buff of season.buffs){
      const score=optimized({...config,assault:currentAssault(buff)})?.score;
      if(score!=null && score>bestScore){best=buff;bestScore=score;}
    }
    if(best)recommendedBuffs.set(season.id,best);
    else if(season.id===previous)recommendedBuffs.set(season.id,previousBuff??season.buffs[0]);
  }
  select.innerHTML=options([['','无'],...Array.from(recommendedBuffs,([id,buff])=>[id,buff.name])]);
  if(recommendedBuffs.has(previous))select.value=previous;
  const selected=recommendedBuffs.get(select.value);
  el('assaultInfo').textContent=selected?selected.note:'每个有效期次各取一项，按当前配置的轮转期望总伤害筛选。';
  el('assaultSource').href='https://zzz.nanoka.cc/boss'+(selected?'/'+select.value:'');
}
function getConfig(){
  const c={main};
  for(const k of ['rollBudget','tripleRollLimit','pairRollLimit','maxRollsPerStat','w','f','r','wr','fr','rr','we','fe','re','stun','vuln','enemy','res','beat','customIgnore','customPen','customGeneral','customSharp','customFire','customCrit','customCritDmg','customDefPct','customFlatDef','customStun'])c[k]=Number(el(k).value);
  c.enemyWeakness=bossById.get(el('boss').value)?.weakness_ids??[];
  c.fchar=el('fchar').value;
  c.rchar=el('rchar').value;
  c.physicalRes=expandedLeads[main]?.skills.some(skill=>skill.element)?el('physicalRes').valueAsNumber:0;
  c.cissiaRegen=el('cissiaRegen').valueAsNumber;
  if(expandedLeads[main])c.expanded=Object.fromEntries(expandedControls[main].map(([key])=>{
    const input=el(expandedFieldId(main,key));
    return [key,input.type==='checkbox'?input.checked:input.valueAsNumber];
  }));
  for(const [id] of Object.entries(extraTeamFields)){
    if(!teammateSlot(c,id))continue;
    for(const input of el(id+'Controls').querySelectorAll('input,select')){
      c[input.id]=input.type==='checkbox'?input.checked:Number(input.value);
    }
  }
  const stacks=el('leadWeaponStacks');
  if(!stacks.disabled)c.weaponStacks=stacks.valueAsNumber;
  c.kaboomStacks=Number(el('kaboomStacks').value);
  c.astralStacks=Number(el('astralStacks').value);
  c.snowbunnyStacks=Number(el('snowbunnyStacks').value);
  c.driveStacks=Object.fromEntries(Object.keys(leadDiscStackRules).map(key=>[key,el(key+'Stacks').valueAsNumber]));
  for(const slot of teammateSlots){
    c[slot+'d']=el(slot+'d').value;
    c[slot+'MountainFull']=el(slot+'MountainFull').checked;
    c[slot+'DamageCoefficient']=el(slot+'DamageCoefficient').valueAsNumber;
    c[slot+'ExtraRotation']=el(slot+'ExtraRotation').checked;
  }
  for(const k of ['set','two','main4','main5','main6','first','markMode'])c[k]=el(k).value;
  c.counts=activeSkills().map((s,i)=>s.automatic?0:Number(el('n'+i).value));
  if(!usesSharp(c))for(const k of ['customAtkPct','customFlatAtk','customNormalCd'])c[k]=Number(el(k).value);
  if(usesRupture(c)){
    for(const k of ['customHpPct','customFlatHp','customSheerForce','customSheer'])c[k]=Number(el(k).value);
    c.yiFrozen=el('yiFrozen').checked;
  }
  if(isYixuan(c)){
    c.yiWeaponStacks=Number(el('yiWeaponStacks').value);
    c.yiFocused=el('yiFocused').checked;
  }
  if(isStarlightBilly(c)){
    for(const k of ['billyWeaponStacks','billyStars','billyM4Stacks','billyTurboCasts','billyBrilliant'])c[k]=Number(el(k).value);
    for(const k of ['billyCore','billyM1Active','billyRoxy'])c[k]=el(k).checked;
  }
  if(main==='nekomata'){
    for(const k of ['nekoPotential','nekoExtraStacks','nekoM4Stacks','nekoM6Stacks'])c[k]=Number(el(k).value);
    for(const k of ['nekoCore','nekoProwl','nekoBack','nekoDiscProc','nekoRoxy'])c[k]=el(k).checked;
  }
  if(isAnby(c)){
    for(const k of ['anbyPotential','anbyWeaponStacks'])c[k]=Number(el(k).value);
    for(const k of ['anbyMarked','anbyShock','anbyDiscProc','anbyRoxy'])c[k]=el(k).checked;
  }
  if(isYeShunguang(c)){
    c.yeVeilSnapshot=el('yeVeilSnapshot').value;
    c.yeM6Replacements=Number(el('yeM6Replacements').value);
    for(const k of ['yeVeilBuff','yeDiscProc','yeRoxy'])c[k]=el(k).checked;
  }
  c.lockedRolls=rollInputs.map((input,i)=>rollLocks[i].checked?input.valueAsNumber:null);
  c.potential=Number(el('potential').value);
  if(teammateSlot(c,'rina')){
    c.rinaPotential=Number(el('rinaPotential').value);
    c.rinaBasePen=Number(el('rinaBasePen').value);
  }
  c.assault=currentAssault(recommendedBuffs.get(el('assaultBuff').value));
  c.skillOverrides=overrides.map(row=>({...row}));
  return c;
}
function bossResistance(boss,attribute=lead().element){
  if(!boss)return 0;
  if(boss.weakness_ids?.includes(attribute))return -20;
  if(boss.resistance_ids?.includes(attribute))return 20;
  return 0;
}
function syncBoss(){
  const boss=bossById.get(el('boss').value);
  const attribute=elementNames[lead().element];
  el('physicalRes').value=bossResistance(boss,200);
  if(!boss){el('res').value=0;el('bossInfo').textContent='自定义敌人。防御力和'+attribute+'抗可直接编辑。';return;}
  const weakness=(boss.weakness_ids||[]).map(id=>elementNames[id]||id).join('、')||'无';
  const resistance=(boss.resistance_ids||[]).map(id=>elementNames[id]||id).join('、')||'无';
  el('res').value=bossResistance(boss);
  const defense=Number.isFinite(boss.def)?boss.def:953;
  el('enemy').value=defense;
  const defenseText=Number.isFinite(boss.def)?'防御力 '+defense:'未提供防御力，暂用 953';
  el('bossInfo').textContent='弱点：'+weakness+'　抗性：'+resistance+'　'+defenseText+'　'+attribute+'抗性按列表映射为 '+bossResistance(boss)+'%。防御力仍可手动修改。';
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
    const fEngines=weaponOptions(teammateChoices[c.fchar],c.fe), rEngines=weaponOptions(teammateChoices[c.rchar],c.re);
    for(const [set,setName] of Object.entries(fourPieces()))for(const [two,twoName] of Object.entries(twoPieces()))for(const [fe,fName] of fEngines)for(const [re,rName] of rEngines){
      const fEngine=Number(fe), rEngine=Number(re);
      const fr=fEngine===c.fe?c.fr:savedEngineRank(c.fchar,fEngine);
      const rr=rEngine===c.re?c.rr:savedEngineRank(c.rchar,rEngine);
      const fLabel=fName+(hasEngineRank(c.fchar,fEngine)?' '+fr+' 星':'');
      const rLabel=rName+(hasEngineRank(c.rchar,rEngine)?' '+rr+' 星':'');
      items.push({changes:{set,two,fe:fEngine,re:rEngine,fr,rr},label:[setName+' 4＋'+twoName+' 2',fLabel,rLabel].join(' / ')});
    }
    return items;
  }
  const rank=key.length===2;
  const slot=key[0];
  const actor=slot==='w'?lead():teammateChoices[c[slot+'char']];
  const selectedEngine=c[slot+'e']??1;
  const engineId=hasEngineRank(c[slot+'char'],selectedEngine)?selectedEngine:1;
  const engineName=weaponOptionLabel(actor,engineId);
  return Array.from({length:rank?5:7},(_,i)=>{
    const level=rank?i+1:i;
    const changes={[key]:level};
    if(rank && slot!=='w')changes[slot+'e']=engineId;
    return {changes,label:rank?engineName+' '+level+' 星':actor.name+' '+level+' 影'};
  });
}
let revision=0, manualBaseline=null;
const baselineVersion=()=>usesRupture({main})?5:3;
const signatureOption=actor=>Number(actor.engines[0][0]);
function baselineActorLabel(c,slot,actor){
  if(slot!=='w' && c[slot+'char']==='air')return actor.name;
  const equipped=c[slot+'e'], signature=signatureOption(actor);
  const weapon=weaponForOption(actor,equipped);
  const isSignature=equipped===signature || (weapon && weapon.id===weaponForOption(actor,signature)?.id);
  return actor.name+' '+c[slot]+'影'+(isSignature?c[slot+'r']+'精':'');
}
function showComparisons(c,build,discLocked){
  const version=++revision;
  const shadowComparison=el('variants').value==='w';
  const items=variants(c);
  const discs=defaultDiscs();
  const baselineScore=manualBaseline?.score??optimized({...c,w:0,f:0,r:0,wr:1,fr:1,rr:1,we:signatureOption(lead()),
    fe:signatureOption(teammateChoices[c.fchar]),re:signatureOption(teammateChoices[c.rchar]),...discs})?.score;
  const [ratio,delta]=percentages(build.score,baselineScore);
  const label=manualBaseline?'手动基线':'全 01';
  el('compare').textContent=`相对${label}　${ratio}　（${delta}）`;
  el('reference').textContent=`${manualBaseline?.description??'全 01 · '+fourPieces()[discs.set]}　${baselineScore==null?'当前词条限制下无可行分配':fmt(baselineScore)}${baselineScore===0?'　基准伤害为零，百分比无定义':''}`;
  el('defaultBaseline').hidden=!manualBaseline;

  const reference=shadowComparison?solve({...c,w:0},build).score:baselineScore;
  el('shadowNote').hidden=!shadowComparison;
  el('baselineNote').hidden=shadowComparison || !!manualBaseline;
  el('deltaHeading').hidden=shadowComparison;
  el('previousShadowHeading').hidden=!shadowComparison;
  el('ratioHeading').textContent=shadowComparison?'较'+lead().name+' 0 影提升':'相对'+label;
  const rows=el('variantRows');
  rows.innerHTML=items.map(({changes,label})=>{
    const selected=Object.entries(changes).every(([k,v])=>c[k]===v);
    return `<tr${selected?' class="selected"':''}><td>${label}${selected?' · 当前':''}</td><td>…</td><td>…</td><td>…</td></tr>`;
  }).join('');
  function fill(i,previousScore){
    if(version!==revision)return;
    const variant={...c,...items[i].changes};
    const value=shadowComparison && variant.w===0?reference:
      (shadowComparison || discLocked?solve(variant,build):optimized(variant))?.score;
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
  const rupture=usesRupture(config);
  const ordinaryRolls=!usesSharp(config)?[
    ['攻击力百分比','customAtkPct',3,'%'],['固定攻击力','customFlatAtk',19,' 点'],['普通暴击伤害','customNormalCd',4.8,'%'],
    ...singleRolls.filter(([,key])=>!['customDefPct','customFlatDef','customSharp','customCritDmg','extraInitialCritDmg'].includes(key))
      .map(row=>row[1]==='customFire'?[elementNames[lead().element]+'属性增伤',...row.slice(1)]:row)
  ]:singleRolls;
  const rolls=isMiyabi(config)?[['异常精通','flatAP',9,' 点'],...ordinaryRolls]:rupture?[
    ['生命值百分比','customHpPct',3,'%'],['固定生命值','customFlatHp',112,' 点'],
    ...ordinaryRolls.filter(([,key])=>!['customIgnore','customPen','extraFlatPen'].includes(key))
  ]:ordinaryRolls;
  el('rollGainRows').innerHTML=rolls.map(([label,key,step,unit])=>{
    const modified=key==='flatAP'?{...config,expanded:{...config.expanded,flatAP:config.expanded.flatAP+step}}:
      {...config,[key]:(config[key]??0)+step};
    const added=solve(modified,build).score-build.score;
    const damage=Math.round(added);
    const gain=build.score>0?(100*added/build.score).toFixed(2)+'%':'—';
    return `<tr><td>${label}</td><td>+${step}${unit}</td><td>${damage>0?'+':''}${fmt(damage)}</td><td>${gain}</td></tr>`;
  }).join('');
}
function renderTeammateBuffs(c,sources){
  const normal=usesAttack(c), rupture=usesRupture(c);
  const categories={general:'普通增伤',teamCritRate:'对目标暴击率',...(rupture?{}:{teamPen:'穿透率',ignore:'无视防御／减防'}),resDown:'减抗或无视抗性',
    stun:'失衡易伤',stunAlways:'失衡易伤',physicalGeneral:'非冰伤增伤',
    ...(isMiyabi(c)?{teamAP:'异常精通',anomalyDamage:'异常增益倍率',disorderDamage:'紊乱增益倍率',disorderBase:'紊乱基础倍率'}:{}),...(isAnby(c)?{aftershockIgnore:'追加攻击无视防御'}:{}),
    ...(rupture?{teamHp:'最大生命值',teamAtk:'战斗固定攻击力',teamAtkPct:'战斗攻击百分比',
      sheerForce:'固定贯穿力',sheer:'贯穿增伤',normalCritDmg:'普通暴击伤害'}:
      normal?{teamAtk:'固定攻击力',teamAtkPct:'攻击力百分比',normalCritDmg:'普通暴击伤害'}:
      {teamDef:'固定防御力',sharp:'锐化增伤',critDmg:'锐暴伤害'})};
  for(const slot of teammateSlots){
    const id=c[slot+'char'], name=teammateChoices[id].name, prefix=name+' · ';
    const drive=equippedTeammateDrive(c,slot,id);
    const lines=[];
    for(const [group,label] of Object.entries(categories)){
      const entries=sources[group].filter(([source])=>source.startsWith(prefix));
      if(!entries.length)continue;
      const format=value=>{
        if(['teamDef','teamAtk','sheerForce','teamAP'].includes(group))return Number(value.toFixed(3))+' 点';
        const amount=Number((value*100).toFixed(4));
        return amount+(group.startsWith('stun')?' 个百分点':'%');
      };
      const total=entries.reduce((sum,[,value])=>sum+value,0);
      const detail=entries.map(([source,value])=>source.slice(prefix.length)+(entries.length>1?' +'+format(value):'')).join('、');
      const condition=group==='stunAlways'?'，非失衡也生效':group==='stun' && !c.stun?'，当前未失衡':'';
      lines.push('<li><b>'+label+' +'+format(total)+'</b>（'+detail+condition+'）</li>');
    }
    if(rupture && [...sources.teamAtk,...sources.teamAtkPct].some(([label])=>label.startsWith(prefix)))
      lines.push('<li>战斗攻击力增益按 30% 转为贯穿力。</li>');
    if(id==='jufufu'){
      lines.push('<li><b>虎啸</b>：连携增伤 +'+pct(juChainBonus)+'，终结技增伤 +'+pct(juUltimateBonus)+'。</li>');
      const [chain,ult]=juPotential[c.potential];
      if(chain || ult)lines.push('<li><b>潜能「侠肝义胆」</b>：连携最终伤害 +'+pct(chain)+'，终结技最终伤害 +'+pct(ult)+'。</li>');
      if(usesSharp(c))lines.push('<li>虎啸提供 '+(c[slot]>=2?72:50)+'% 战斗中普通暴伤，对'+lead().name+'锐暴的贡献为 0。'+(sources.stun.some(([label])=>label==='橘福福 · 额外能力')?'':'当前未满足橘福福额外能力的入队条件。')+'</li>');
    }
    if(id==='koleda')lines.push('<li>连携技对失衡敌人增伤 '+pct(koledaChainBonus(c))+'。需要同属性、同阵营或觉醒后有命破／锋御队友。</li>');
    if(id==='lycaon')lines.push('<li>冰抗降低 25%。失衡易伤需要冰、同阵营或觉醒后的异常队友。</li>');
    if(id==='lighter'){
      lines.push('<li>溃败使失衡延长 '+(c[slot]>=1?5:3)+' 秒，按手动填写的招式次数结算。</li>');
      if(!lighterExtra(c))lines.push('<li>昂扬需要强攻或卡吕冬之子队友，只提升火／冰伤害。</li>');
      if(usesSharp(c)){
        const laurel=sources.normalCritDmg.find(([label])=>label.startsWith(prefix+'焰心桂冠'));
        if(laurel)lines.push('<li>焰心桂冠提供 '+pct(laurel[1])+' 火／冰普通暴伤。'+lead().name+'使用锐暴伤害。</li>');
      }
      if(c[slot]>=4)lines.push('<li>四影：莱特在后场时前场角色能量自动回复效率 +10%，进入士气喷发时为后场角色回复 4 点能量。</li>');
    }
    if(id==='soukaku')lines.push('<li>展旗按满额并传递给主 C 计算。冰伤增益需要同属性或对空六课队友。</li>');
    if(id==='lucy')lines.push('<li>加油！按 600 点攻击力上限覆盖计算。</li>');
    if(id==='yuzuha')lines.push('<li>狸之愿按 3,000 初始攻击力及 200 异常掌控计算。二影强制连携见招式明细。</li>');
    if(id==='nangongYu')lines.push('<li>失衡积蓄与持续时间由技能提供。星见雅的烈霜极性紊乱和异放单独列在招式明细。</li>');
    if(id==='roxy' && expandedLead(c) && !isMiyabi(c))lines.push('<li>同属性浸染与风化按主 C 的覆盖选项结算。赛维里安默认按风化覆盖。</li>');
    if(id==='rina')lines.push('<li>按丽娜自身 '+Number(rinaBuffs(c).personalPen.toFixed(3))+'% 穿透率、人偶在场且'+lead().name+'位于人偶附近计算。</li>');
    if(id==='trigger'){
      lines.push('<li>破隙幽瞳及索魂影眸按追加攻击命中后持续覆盖计算。</li>');
      if(usesSharp(c) && c[slot]>=2)lines.push('<li>二影「猎眸」满层提供 24% 战斗中普通暴伤，对'+lead().name+'锐暴的贡献为 0。</li>');
    }
    if(id==='astra')lines.push('<li>按咏叹华彩在场、核心攻击力增益达上限计算。</li>');
    if(id==='sunna' && normal)lines.push('<li>攻击增益与帷幕按覆盖本轮计算。'+
      (expandedLead(c)?'':'猫的凝视可在补充招式单独填写。')+'</li>');
    if(id==='dialyn')lines.push('<li>好评达标后可让主 C 以终结技入场。额外次数在招式明细标出。</li>');
    if(id==='norma')lines.push('<li>勾选追加连携时，按预热膛温满足两次触发条件计算。技术鸿沟的失衡持续时间延长与琉音同类效果不可叠加。</li>');
    if(id==='zhao'){
      if(!rupture)lines.push('<li>涌泉及半糖雪兔的生命增益可提高命破代理人的贯穿力。</li>');
      lines.push(sources.general.some(([label])=>label==='照 · 凝聚力')
        ?'<li>凝聚力按帷幕覆盖、初始生命达到 27,000 计算。</li>'
        :'<li>凝聚力需要强攻、异常或支援队友。</li>');
      if(usesSharp(c))lines.push('<li>涌泉提供 1,000 点固定攻击力。'+lead().name+'按防御力和锐暴结算。</li>');
    }
    if(id==='orphie'){
      lines.push('<li>准星聚焦按初始能量自动回复达到 3.7 点且覆盖本轮计算。</li>');
      if(usesSharp(c))lines.push('<li>准星聚焦提供 700 点固定攻击力。'+lead().name+'按防御力结算。</li>');
      if(!sources.aftershockIgnore.length)lines.push('<li>熔炉所铸需要击破或支援队友。</li>');
      else if(!isAnby(c))lines.push('<li>熔炉所铸为追加攻击提供 25% 无视防御。当前主 C 轮转无追加攻击。</li>');
      if(c[slot+'e']===1)lines.push('<li>嚣枪喧焰的暴击率与无视防御属于奥菲丝自身。</li>');
    }
    if(id==='lucia'){
      lines.push('<li>破暗按 24,000 初始生命吃满。巡梦童谣及所选音擎增益按覆盖本轮。</li>');
      if(!rupture)lines.push('<li>贯穿力和最大生命值可提高命破代理人的输出。</li>');
    }
    if(id==='cissia'){
      lines.push('<li>按毒素覆盖本轮计算。初始能量自动回复为 '+c.cissiaRegen+'，电伤无视防御在 3.68 达到上限。一影把该减防效果乘 1.4，并增加 5% 电抗无视。</li>');
      if(c[slot+'e']===1)lines.push('<li>鳞齿寻踪的能量自动回复计入卡片所填总值。音擎的暴击率和无视防御属于希希芙自身。</li>');
    }
    if(id==='panYinhu'){
      lines.push('<li>通窍按初始攻击力达到 3,000 点，通过快速支援或连携入场计算。</li>');
      if(!sources.general.some(([label])=>label==='潘引壶 · 气绝'))lines.push('<li>气绝需要命破或云岿山队友。</li>');
    }
    if(id==='nicole'){
      lines.push('<li>机关箱、狡兔三窟和聚宝箱按效果覆盖本轮计算。六影暴击率按十层计。</li>');
      if(rupture)lines.push('<li>机关箱提供 40% 减防。贯穿伤害自动无视防御。</li>');
    }
    const moonlight=sources.general.find(([label])=>label.endsWith(' · 月光骑士颂四件'));
    if(drive==='moonlight' && moonlight && !moonlight[0].startsWith(prefix)){
      lines.push('<li>月光骑士颂四件效果由'+moonlight[0].split(' · ')[0]+'提供。</li>');
    }
    if(drive==='astral' || drive==='snowbunny'){
      const name=drive==='astral'?'静听嘉音':'雪兔梦游仙境';
      const active=sources.general.find(([label])=>label.endsWith(' · '+name+'四件'));
      if(active && !active[0].startsWith(prefix))lines.push('<li>'+name+'四件效果由'+active[0].split(' · ')[0]+'提供。</li>');
      else if(!active)lines.push('<li>'+name+'当前为 0 层。</li>');
    }
    if(drive==='mountain'){
      const mountain=sources.normalCritDmg.find(([label])=>label.endsWith(' · 山大王四件'));
      if(mountain && !mountain[0].startsWith(prefix))lines.push('<li>山大王四件效果由'+mountain[0].split(' · ')[0]+'提供。</li>');
      else if(mountain && usesSharp(c))lines.push('<li>山大王四件提供 '+pct(mountain[1])+' 全队普通暴伤。'+lead().name+'终结技使用锐暴伤害。</li>');
    }
    if(isCannonSelected(id,c[slot+'e'])){
      const cannon=sources.teamAtkPct.find(([label])=>label.endsWith(' · 好斗的阿炮'));
      if(cannon && !cannon[0].startsWith(prefix))lines.push('<li>好斗的阿炮增益由'+cannon[0].split(' · ')[0]+'提供。</li>');
      else if(cannon && usesSharp(c))lines.push('<li>好斗的阿炮提供 '+pct(cannon[1])+' 全队攻击力。'+lead().name+'按防御力结算。</li>');
    }
    const summary=el(slot+'BuffSummary');
    if(id==='air'){summary.textContent='空位，无队友增益。';continue;}
    summary.innerHTML=lines.length?'<ul>'+lines.join('')+'</ul>':'当前配置无队友增益。';
  }
}
const discLimitFields=['rollBudget','tripleRollLimit','pairRollLimit','maxRollsPerStat'];
let renderedDiscBuild=null;
function render(saveBaseline=false,tuneDiscs=false){
  const silver=main==='anby', ye=main==='yeShunguang', yi=main==='yixuan', billy=main==='starlightBilly';
  const sun=main==='sunbringer', normal=!usesSharp({main}), rupture=usesRupture({main});
  el('yeM6Replacements').disabled=!ye || Number(el('w').value)<6;
  const roster=activeSkills();
  const statTitle=rupture?'贯穿力':normal?'攻击力':'防御力';
  const critCap=normal?1:2;
  const critTitle=normal?'暴击伤害':'锐暴伤害';
  el('multiplierStatus').textContent='';
  const discLocked=el('lockEntireBuild').checked;
  el('discSearchStatus').textContent=discLocked?'整套驱动盘已锁定。':'';
  el('kaboomOptions').hidden=!teammateSlots.some(slot=>isCannonSelected(el(slot+'char').value,Number(el(slot+'e').value)));
  el('astralOptions').hidden=!teammateSlots.some(slot=>el(slot+'d').value==='astral');
  el('snowbunnyOptions').hidden=!teammateSlots.some(slot=>el(slot+'d').value==='snowbunny');
  for(const slot of teammateSlots){
    const character=el(slot+'char').value, actor=teammateChoices[character];
    const selectedEngine=el(slot+'e').value;
    syncTeammateWeaponHint(slot,actor,Number(selectedEngine));
    const ranked=hasEngineRank(character,Number(selectedEngine));
    el(slot+'r').disabled=!ranked;
    el('variants').querySelector(`[value="${slot}r"]`).textContent=weaponOptionLabel(actor,ranked?selectedEngine:'1')+'星级';
    const drive=el(slot+'d'), auto=drive.querySelector('option[value="auto"]');
    if(auto)auto.textContent='自动 · '+(automaticStunDrive({main})==='mountain'?'山大王':'赤翼夜曲')+'四件套';
    const mountain=el(slot+'MountainFull');
    mountain.disabled=equippedTeammateDrive({main,[slot+'d']:drive.value},slot,el(slot+'char').value)!=='mountain';
    mountain.closest('label').hidden=mountain.disabled;
  }
  for(const id of ['set','two','lockDiscSets','lockTwo',...discLimitFields])el(id).disabled=discLocked;
  for(const slot of tunableSlots){
    const input=el('main'+slot), lock=el('lockMain'+slot);
    input.disabled=discLocked;
    lock.disabled=discLocked || input.value==='auto';
    if(input.value==='auto')lock.checked=false;
  }
  rollInputs.forEach((input,i)=>{
    rollLocks[i].disabled=discLocked;
    input.disabled=discLocked || !rollLocks[i].checked;
  });
  syncNangongOptions();
  const lighter=teammateSlots.find(slot=>el(slot+'char').value==='lighter');
  const laurelStacks=el('lighterLaurelStacks');
  laurelStacks.disabled=!lighter || Number(el(lighter+'e').value)!==14116;
  laurelStacks.closest('label').hidden=laurelStacks.disabled;
  const valid=[...document.querySelectorAll('input[type=number]:not([data-field]):enabled')].every(x=>x.value!=='' && x.checkValidity());
  const c=valid?getConfig():null;
  let b=null;
  if(c){
    const active={...c,lockedRolls:discLocked?rollInputs.map(input=>input.valueAsNumber):c.lockedRolls};
    rankAssaultBuffs(active);
    c.assault=currentAssault(recommendedBuffs.get(el('assaultBuff').value));
    active.assault=c.assault;
    b=tuneDiscs && !discLocked?optimizeDiscSelection(c):optimized(active);
  }
  renderedDiscBuild=b;
  showBuffGains(c,b);
  el('optimizeDiscs').disabled=discLocked || !valid;
  el('toggleDiscLock').disabled=!discLocked && !b;
  el('toggleDiscLock').setAttribute('aria-pressed',String(discLocked));
  el('saveBaseline').disabled=!b;
  el('refreshMultipliers').disabled=!b;
  if(!b){
    for(const id of ['leadBuffSummary','fBuffSummary','rBuffSummary'])el(id).textContent=valid?'当前无可行配装。':'请检查输入后查看增益。';
    el('markModeCompare').replaceChildren();
    el('ultimateExample').textContent=valid?'当前配置无可行配装。':'请检查输入后查看算例。';
    revision++;
    el('total').textContent=valid?'无可行分配':'请检查输入';
    for(const id of ['split','summaryStats','compare','reference','variantRows','best','sourceRows','coreRows','markSummary','multiplierRows','rollGainRows'])el(id).replaceChildren();
    for(let i=0;i<roster.length;i++){
      for(const prefix of ['m','d','stored','a','share'])el(prefix+i).textContent='—';
      if(!roster[i].automatic)el('extraCast'+i).hidden=true;
    }
    if(valid){
      if(!tuneDiscs && !discLocked)el('discSearchStatus').textContent='当前主属性与词条限制下无可行分配。可尝试自动寻优，或调整锁定条数与上限。';
      saveSettings();
    }
    return;
  }
  rollInputs.forEach((input,i)=>{if(!discLocked && !rollLocks[i].checked)input.value=b.rolls[i];});
  if(sun && c.w>=2){
    const additive=c.markMode==='add';
    const other=solve({...c,markMode:additive?'multiply':'add'},b);
    const [mult,add]=additive?[other,b]:[b,other];
    el('markModeCompare').textContent='固定当前驱动，加算相比乘算：烬灭 '+percentages(add.mark,mult.mark)[1]+'，整轮总伤害 '+percentages(add.score,mult.score)[1]+'。';
  }else el('markModeCompare').textContent='两种算法从挽昼二影起生效。';
  renderLeadBuffs(c,b);
  renderTeammateBuffs(c,b.buffSources);
  if(rupture)renderRuptureExample(c,b);
  else if(normal)renderAttackExample(c,b,elementNames[lead().element]);
  else if(sun)renderUltimateExample(c,b);
  else renderClaretExample(c,b);
  renderRollGains(c,b);
  if(saveBaseline){
    const label=[baselineActorLabel(c,'w',lead()),...teammateSlots.map(slot=>
      baselineActorLabel(c,slot,teammateChoices[c[slot+'char']]))].join(' / ');
    manualBaseline={version:baselineVersion(),score:b.score,description:'已固定 · '+label};
  }
  if(el('variants').selectedOptions[0]?.disabled)el('variants').value='w';
  el('total').textContent=fmt(b.score);
  const hasTeammateDamage=b.teamFactor!==1;
  el('summaryTitle').textContent=(hasTeammateDamage?'全队':lead().name)+'单轮期望伤害';
  const aftershock= silver?b.rows.reduce((sum,row)=>sum+(row.aftershock?row.direct:0),0):0;
  const breakdown=!sun?(silver?'（追加攻击 '+fmt(aftershock)+'）':''):`（直伤 ${fmt(b.direct)} ＋ 烬灭 ${fmt(b.mark)}）`;
  const displayFactor=value=>value.toLocaleString('zh-CN',{maximumFractionDigits:6});
  const teamParts=b.teammateCoefficients.filter(({coefficient})=>coefficient!==0).map(({slot,coefficient})=>
    teammateChoices[c[slot+'char']].name+' +'+displayFactor(coefficient*100)+'%');
  el('split').textContent=hasTeammateDamage?[lead().name+' '+fmt(b.mainScore)+breakdown,...teamParts,'合计 ×'+displayFactor(b.teamFactor)].join('　 /　'):
    '直接伤害　'+fmt(b.direct)+(silver?'　 /　其中追加攻击　'+fmt(aftershock):!sun?'':'　 /　烬灭　'+fmt(b.mark));
  el('summaryStats').innerHTML=[['战斗'+statTitle,fmt(b.combatStat)],['战斗暴击率',pct(normal?Math.min(1,Math.max(0,b.rate)):b.rate)],[critTitle,pct(b.critDmg)],[rupture?'贯穿伤害防御区':'无视防御／减防',rupture?'×1':pct(b.ignore)]].map(([k,v])=>`<span>${k}<b>${v}</b></span>`).join('');
  const line=(k,v)=>`<div class="metricline"><span>${k}</span><b>${v}</b></div>`;
  const blocked=driveBlockedStats(c);
  const balanced=makeDiscs(b.rolls,b.mains.map(stat=>blocked[stat]??-1),b.discs);
  const names=leadRollNames(main);
  const rollsText=rolls=>rolls.map((v,i)=>v?names[i]+' ×'+v:'').filter(Boolean).join('　') || '—';
  const rankedRolls=b.rolls.slice().sort((a,b)=>b-a);
  const topTwo=rankedRolls[0]+rankedRolls[1];
  el('best').innerHTML=line('有效副词条　'+b.rolls.reduce((sum,n)=>sum+n,0)+' / '+c.rollBudget,rollsText(b.rolls))+line('最多三种合计 / X',(topTwo+rankedRolls[2])+' / '+c.tripleRollLimit)+line('最多两种合计 / Y',topTwo+' / '+c.pairRollLimit)+line('单种最多 / Z',rankedRolls[0]+' / '+c.maxRollsPerStat)+(normal?'':line('副词条暴伤折合暴击率',pct(b.rolls[2]*discRoll.cd)+' × 0.35 = '+Number((b.rolls[2]*discRoll.cd*35).toFixed(2))+'%'))+line('初始'+statTitle+' ＋ 战斗加成',fmt(b.initial)+' ＋ '+fmt(b.combatStat-b.initial))+line('穿透率',pct(b.penRate))+(isMiyabi(c)?line('战斗异常精通 / 异常掌控',fmt(b.ap)+' / '+Number(b.mastery.toFixed(1))):'')+
    `<details open><summary>每盘主属性与有效副词条</summary>${balanced.map((rolls,i)=>line((i+1)+' 号 · '+mainLabels[b.mains[i]],rolls.reduce((sum,n)=>sum+n,0)+' 条｜'+rollsText(rolls))).join('')}</details>`;
  const capped=b.rate>=critCap-1e-10?b:optimized({...c,requireFullCrit:true});
  el('best').insertAdjacentHTML('beforeend','<h3 class="disc-title">同条件下的 '+pct(critCap)+' 暴击率对照</h3>'+
    (capped?line(discLocked?'当前锁定配装':'最高期望方案',pct(Math.min(critCap,b.rate))+' 暴击率 · '+fmt(b.score))+line('达到 '+pct(critCap)+' 的最优方案',pct(Math.min(critCap,capped.rate))+' 暴击率 · '+fmt(capped.score))+
      line('满暴方案词条',rollsText(capped.rolls))+line(discLocked?'满暴方案相对锁定配装':'满暴方案相对最高期望',percentages(capped.score,b.score)[1]):
      `<p>当前主属性在 ${c.rollBudget} 条预算内无法达到 ${pct(critCap)} 暴击率。</p>`));
  const groups={core:{label:'核心五招',direct:0,accrued:0},other:{label:'二影其余招式',direct:0,accrued:0},rupture:{label:'毁伤',direct:0,accrued:0}};
  b.rows.forEach((r,i)=>{
    el('skillName'+i).textContent=r.name+(r.element==='physical'?'（物理伤害）':'');
    const count=el('n'+i);
    if(roster[i].automatic){
      count.value=r.count;
      count.title=main==='miyabi'?(String(roster[i].id).startsWith('m6Slash')?'按霜月的蓄力段数和六影开关计算':'按南宫羽队友设置与失衡条件计算'):main==='claret'?'六影每次连携技或终结技自动追加一次':yi?'根据符法千重次数与当前影画自动计算':
        main==='roxy'?(roster[i].id===1621023?'每次小心风寒滑行自动衔接一次风炮':'按巨型风旋次数、影画与余响设置计算'):
        main==='jufufu'?'六影每次威势旋转自动追加三颗爆米花':
        Object.hasOwn(classicLeads,main)?'按前置招式次数与当前条件自动计算':'根据三连组数与当前影画、潜能自动计算';
    }else{
      count.setAttribute('aria-label',r.name+(roster[i].type==='triple'?'手动组数':'次数'));
      count.disabled=r.available===false;
      count.title=count.disabled?'当前配置未满足触发条件':'';
      const extra=el('extraCast'+i);
      extra.hidden=!r.extraCast && !r.extraM6;
      if(r.extraCast)extra.textContent='+'+r.extraCast.count+' '+(r.extraCast.sources??[r.extraCast.id]).map(id=>teammateRotationLabels[id]).join('＋')+' · 共 '+r.count;
      else if(r.extraM6)extra.textContent='+1 六影调息 · 共 '+r.count;
    }
    el('m'+i).textContent=pct(r.display.coefficient)+' / '+pct(r.base);
    el('d'+i).textContent=fmt(r.direct);
    el('stored'+i).textContent=r.accrued?fmt(r.accrued)+' · '+pct(r.accrued/r.direct):'—';
    el('a'+i).textContent=r.mark?fmt(r.mark):'—';
    el('share'+i).textContent=b.score>0?(100*(r.direct+r.mark)/b.score).toFixed(2)+'%':'—';
    groups[r.source].direct+=r.direct;
    groups[r.source].accrued+=r.accrued;
  });
  el('sourceRows').innerHTML=Object.values(groups).map(g=>
    `<tr><td>${g.label}</td><td>${fmt(g.direct)}</td><td>${b.direct?pct(g.direct/b.direct):'—'}</td><td>${fmt(g.accrued)}</td></tr>`).join('');
  el('coreRows').innerHTML=b.rows.filter(r=>r.source==='core').map(r=>
    `<tr><td>${r.name}</td><td>${pct(r.mult)}</td><td>${r.count}</td><td>${fmt(r.direct)}</td><td>${fmt(r.accrued)}</td></tr>`).join('');
  el('multiplierRows').innerHTML=b.rows.map((row,i)=>{
    const cells=activeMultiplierFields().map(field=>{
      if(field==='sheer' && !row.display.sheerDamage || field==='anomaly' && !row.trueAnomaly || field==='anomalyBonus' && !row.anomalyTagged)return '<td>—</td>';
      const edited=Object.hasOwn(overrides[i],field);
      const value=edited?Number((100*overrides[i][field]).toPrecision(14)):Number((100*row.display[field]).toFixed(2));
      return `<td><input data-field="${field}" data-skill-row="${i}" class="${edited?'overridden':''}" aria-label="${row.name} ${field}" type="number" step="any" value="${value}"></td>`;
    });
    return '<tr><td>'+row.name+'</td>'+cells.join('')+'</tr>';
  }).join('');
  if(silver){
    const {manual,m1,m2,groups}=anbyCircuit({...c,counts:b.counts});
    el('markSummary').textContent=`三连组数 ${groups} 组 · 手动 ${manual} ＋ 一影强化特殊技 ${m1} ＋ 二影终结技 ${m2}。苍光的输入框只填手动组数。白雷、雷殛、苍光·临界和六影跟随组数自动结算。`;
  }else if(yi){
    el('markSummary').textContent='凝云术和墨烬影消各计一行。符法千重后可接玄墨极阵与青溟震击。独立于默认轴获得的术法值、玄墨值和落雷可按实际触发调整。';
  }else if(billy){
    el('markSummary').textContent='动力压制填实际命中数，其余每行填该招式的发动次数。二影涡轮暴伤与六影额外倍率按本行次数加权平均。六影层数按表格顺序获得和消耗。';
  }else if(ye){
    const replacements=yeReplacements(c);
    el('markSummary').textContent='飞光按斩击段数填写。标注明心境的招式及开幕攻击按帷幕易伤结算。'+
      (replacements?' 六影把 '+replacements+' 次归尘计为斩妄开天。':'');
  }else if(expandedLeads[main])el('markSummary').textContent=expandedRotationNote[main];
  else el('markSummary').textContent=normal?'次数按发动次数填写。赤色之刃、猫猫爪刺五段的重复斩击已计入单次倍率。超凶爪印与猫的凝视可按实际触发次数单独填写。':
    '从上到下结算。伤害占比包含该招式的直伤和引爆结算的烬灭。最后一次引爆后新增的烬痕只计积攒。纯闪避、切换主控和招架支援的直伤为 0。';
  if(b.rows.some(row=>row.extraCast))el('markSummary').append(' 输入框填写基础次数，旁边的队友次数自动叠加。');
  if(hasTeammateDamage)el('markSummary').append(' 伤害占比以全队总伤为分母。');
  showComparisons(c,b,discLocked);
  saveSettings();
}
function syncTeammate(key){
  const select=el(key+'char');
  const id=select.value, choice=teammateChoices[id];
  select.dataset.character=id;
  syncAgentCard(select,choice);
  const empty=id==='air';
  el(key+'Advanced').hidden=empty;
  const build=teammateBuilds[id]||{};
  for(const field of [key,key+'r',key+'DamageCoefficient']){
    const control=el(field);
    control.closest('label').hidden=empty;
    control.disabled=empty;
  }
  for(const field of [key,key+'r'])el('variants').querySelector('[value="'+field+'"]').disabled=empty;
  el(key).value=defaultShadows[id]??0;
  restoreControl(el(key),build.shadow);
  el('variants').querySelector('[value="'+key+'"]').textContent=choice.name+'影画';
  const weaponSelect=el(key+'e');
  weaponSelect.closest('.weapon-field').hidden=empty;
  weaponSelect.disabled=empty;
  setWeaponSelect(weaponSelect,choice,build.engine);
  restoreTeammateEngineRank(key);
  const drive=el(key+'d');
  const defaultDrive=defaultTeammateDrive(id);
  const driveOptions={
    moonlight:[['moonlight','月光骑士颂 · 四件套'],['astral','静听嘉音 · 四件套'],['none','无队伍增益']],
    auto:[['auto','自动'],['bloodwing','赤翼夜曲 · 四件套'],['mountain','山大王 · 四件套']],
    snowbunny:[['snowbunny','雪兔梦游仙境 · 四件套'],['noSetBonus','无队伍增益']],
    none:[['none','无队伍增益']]
  };
  drive.innerHTML=options(driveOptions[defaultDrive]);
  drive.disabled=defaultDrive==='none';
  drive.closest('label').hidden=drive.disabled;
  drive.value=defaultDrive;
  // Older defense builds used a disabled placeholder value, which is absent from their new options.
  restoreControl(drive,build.driveMode??(id==='rina' && build.drive==='none'?'none':undefined));
  const mountain=el(key+'MountainFull');
  mountain.checked=mountain.defaultChecked;
  restoreControl(mountain,build.mountainFull);
  const coefficient=el(key+'DamageCoefficient');
  coefficient.value=coefficient.defaultValue;
  restoreControl(coefficient,build.damageCoefficient);
  const extraRotation=el(key+'ExtraRotation');
  extraRotation.disabled=!Object.hasOwn(teammateRotationLabels,id);
  extraRotation.closest('label').hidden=extraRotation.disabled;
  extraRotation.checked=extraRotation.defaultChecked;
  restoreControl(extraRotation,build.extraRotation);
  el(key+'ExtraRotationLabel').textContent=id==='dialyn'?'追加一次终结技及附招':id==='yuzuha'?'二影在未失衡时追加一次连携技':'追加两次连携技';
}
function syncTeamControls(){
  const config={fchar:el('fchar').value,rchar:el('rchar').value};
  for(const [id,character] of [['potentialLabel','jufufu'],['rinaControls','rina'],...Object.keys(extraTeamFields).map(id=>[id+'Controls',id])]){
    const control=el(id), slot=teammateSlot(config,character);
    control.hidden=!slot;
    for(const input of control.querySelectorAll('input,select'))input.disabled=!slot;
    if(slot && control.parentElement!==el(slot+'Fields'))el(slot+'Fields').append(control);
  }
  const cissiaSlot=teammateSlot(config,'cissia');
  el('cissiaRegenLabel').hidden=!cissiaSlot;
  el('cissiaRegen').disabled=!cissiaSlot;
  if(cissiaSlot && el('cissiaRegenLabel').parentElement!==el(cissiaSlot+'Fields'))
    el(cissiaSlot+'Fields').append(el('cissiaRegenLabel'));
  el('rinaBasePen').disabled=el('rinaControls').hidden;
  el('beat').disabled=!teammateSlot(config,'robin');
}
const isCannonSelected=(id,engine)=>engine===kaboomEngine || engine===13115 || id==='lucy' && engine===1;
function syncNangongOptions(){
  const slot=teammateSlots.find(key=>el(key+'char').value==='nangongYu');
  if(!slot)return;
  const m=Number(el(slot).value);
  for(const [id,level] of [['nangongM2Polar',2],['nangongTremoloM6',6]]){
    el(id).disabled=m<level;
    el(id).closest('label').hidden=m<level;
  }
}
function syncTeammateWeaponHint(slot,actor,engine){
  const info=el(slot+'WeaponHint'), weapon=weaponCatalog.get(engine);
  info.hidden=!weapon;
  info.textContent=weapon && (weapon.role!==agentRole(actor)?'职业不符，被动不生效。':
    modeledTeamEngines.has(engine)?'已收录的队伍增益见卡片下方。':'此音擎未录入队伍被动，队友角色增益仍按卡片条件计算。');
}
function syncLeadEngine(){
  const select=el('we'), weapon=weaponCatalog.get(Number(select.value));
  const rank=leadWeaponRanks[main]?.[select.value];
  el('wr').value=rank??1;
  el('variants').querySelector('[value="wr"]').textContent=weaponOptionLabel(lead(),select.value)+'星级';
  const info=el('leadWeaponHint'), stacks=el('leadWeaponStacks');
  const qingyiGears=main==='qingyi' && weapon?.id===14110;
  const maxStacks=qingyiGears?2:weaponPassiveStacks[weapon?.id];
  info.hidden=!weapon;
  info.textContent=weapon && (weapon.role!==agentRole(lead())?'职业不符，只有基础与副属性生效。':
    qingyiGears || modeledLeadEngines.has(weapon.id)?'按下方设置结算已收录的被动。':'当前按基础与副属性计算，此音擎被动尚未建模。');
  stacks.disabled=maxStacks===undefined || weapon.role!==agentRole(lead());
  stacks.closest('label').hidden=stacks.disabled;
  if(!stacks.disabled){
    stacks.max=maxStacks;
    stacks.value=leadProfiles[main]?.weaponStacks?.[weapon.id]??stacks.max;
  }
}
function applyWeaponChange(slot){
  if(slot==='w')syncLeadEngine();
  else restoreTeammateEngineRank(slot);
}
setupWeaponPicker(id=>id==='we'?lead():teammateChoices[el(id[0]+'char').value]);
function rememberTeammate(slot){
  const character=el(slot+'char').dataset.character;
  if(!character || character==='air')return;
  const engine=el(slot+'e').value;
  const engineRanks={...teammateBuilds[character]?.engineRanks};
  if(hasEngineRank(character,Number(engine)))engineRanks[engine]=el(slot+'r').value;
  const coefficient=el(slot+'DamageCoefficient');
  teammateBuilds[character]={
    shadow:el(slot).value,engine,engineRanks,driveMode:el(slot+'d').value,mountainFull:el(slot+'MountainFull').checked,
    damageCoefficient:coefficient.validity.valid?coefficient.value:teammateBuilds[character]?.damageCoefficient,
    extraRotation:el(slot+'ExtraRotation').checked
  };
}
function restoreTeammateEngineRank(slot){
  const character=el(slot+'char').dataset.character, engine=Number(el(slot+'e').value);
  el(slot+'r').value=hasEngineRank(character,engine)?savedEngineRank(character,engine):1;
}
el('reset').onclick=()=>{
  activeSkills().forEach((s,i)=>{if(!s.automatic)el('n'+i).value=s.defaultCount??0;});
  render();
};
document.addEventListener('change',event=>{
  const input=event.target;
  if(['appTheme','backgroundOpacity','weaponSearch','agentSearch'].includes(input.id))return;
  const weaponSlot=['w',...teammateSlots].find(slot=>input.id===slot+'e');
  if(weaponSlot)applyWeaponChange(weaponSlot);
  if(input.id==='wr')(leadWeaponRanks[main]??={})[el('we').value]=input.value;
  if(input.id==='mainAgent'){
    saveSettings();
    configureLead(input.value);
    syncBoss();
    restoreLeadProfile(leadProfiles[main]);
    syncTeamControls();
  }
  const slot=teammateSlots.find(key=>input.id===key+'char');
  const changedTeammate=Boolean(slot && input.value!==input.dataset.character);
  if(slot){
    teammateSlots.forEach(rememberTeammate);
    const other=teammateSlots.find(key=>key!==slot);
    if(input.value!=='air' && input.value===el(other+'char').value){
      el(other+'char').value=input.dataset.character;
      syncTeammate(other);
    }
    syncTeammate(slot);
    syncTeamControls();
  }
  const rankSlot=teammateSlots.find(key=>input.id===key+'r');
  if(rankSlot)rememberTeammate(rankSlot);
  if(input.id==='boss')syncBoss();
  if(input.id==='boss' || input.id==='regionChoice')syncRegion(true);
  if(input.dataset.field){
    const row=overrides[Number(input.dataset.skillRow)];
    if(input.value==='')delete row[input.dataset.field];
    else row[input.dataset.field]=input.valueAsNumber/100;
  }
  el('calcStatus').textContent='';
  render(false,changedTeammate);
});
el('saveBaseline').onclick=()=>render(true);
function useDiscMains(build){
  for(const slot of tunableSlots){
    el('main'+slot).value=build.mains[slot-1];
    el('lockMain'+slot).disabled=false;
  }
}
function optimizeDiscSelection(config){
  const current=optimized(config);
  let best=null, bestSet=config.set, bestTwo=config.two;
  const fourPieceSets=el('lockDiscSets').checked?[config.set]:Array.from(el('set').options,option=>option.value);
  const twoPieceSets=el('lockTwo').checked?[config.two]:Object.keys(twoPieces());
  const searchMains=Object.fromEntries(tunableSlots.map(slot=>['main'+slot,!el('lockMain'+slot).checked]));
  for(const set of fourPieceSets){
    for(const two of twoPieceSets){
      const candidate=solve({...config,set,two},null,searchMains);
      if(candidate && (!best || candidate.score>best.score)){
        best=candidate;
        bestSet=set;
        bestTwo=two;
      }
    }
  }
  if(!best){
    el('discSearchStatus').textContent='当前锁定与词条限制冲突，未找到可行方案。可调整锁定条数、上限或主属性。';
    return current;
  }
  el('set').value=config.set=bestSet;
  el('two').value=config.two=bestTwo;
  useDiscMains(best);
  for(const slot of tunableSlots)config['main'+slot]=best.mains[slot-1];
  el('discSearchStatus').textContent=current && best.score>current.score?
    `已应用最高期望方案。单轮伤害 ${fmt(current.score)} → ${fmt(best.score)}（${percentages(best.score,current.score)[1]}）。`:
    '已应用当前预算内的最高期望配装。';
  return best;
}
el('optimizeDiscs').onclick=()=>render(false,true);
el('toggleDiscLock').onclick=()=>{
  const lock=el('lockEntireBuild');
  if(!lock.checked){
    if(!renderedDiscBuild)return;
    useDiscMains(renderedDiscBuild);
    rollInputs.forEach((input,i)=>{input.value=renderedDiscBuild.rolls[i];});
  }
  lock.checked=!lock.checked;
  render();
};
el('refreshMultipliers').onclick=()=>{
  overrides=activeSkills().map(()=>({}));
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
const teamFields=new Set(teammateSlots.flatMap(slot=>['char','','e','r','d','MountainFull','DamageCoefficient','ExtraRotation'].map(key=>slot+key)));
const settingsControls=Array.from(document.querySelectorAll('select[id],input[id]'))
  .filter(control=>!teamFields.has(control.id) && !['mainAgent','appTheme','backgroundOpacity','weaponSearch','agentSearch'].includes(control.id));
const leadProfiles={};
const discLimitPreset=2;
const previousDiscLimits=['45','45','30','15'];
const miyabiRotationPreset=3;
const previousMiyabiCounts={
  1:{1091015:1,1091018:1,1091029:2,1091009:1,1091011:1,1091005:1,shatter:2,frostburn:2,frostDisorder:1},
  2:{1091018:1,1091029:3,frostburn:3,frostDisorder:3}
};
const leadFields=new Set(['w','we','wr','leadWeaponStacks','set','two','main4','main5','main6','res','physicalRes','rollBudget','tripleRollLimit','pairRollLimit','maxRollsPerStat',
  'lockDiscSets','lockTwo','lockMain4','lockMain5','lockMain6','lockEntireBuild','customFire','customCritDmg','customDefPct','customFlatDef','customSharp',
  ...Object.keys(leadDiscStackRules).map(key=>key+'Stacks'),
  ...rollInputs.map(x=>x.id),...rollLocks.map(x=>x.id),
  ...settingsControls.filter(x=>x.closest('[data-neko],[data-anby],[data-ye],[data-yi],[data-billy],[data-rupture],[data-normal],[data-expanded]')).map(x=>x.id)]);

function configureLead(id){
  main=id;
  document.body.dataset.main=id;
  const normal=!usesSharp({main:id}), actor=lead(), element=elementNames[actor.element];
  const mixed=actor.skills?.some(skill=>skill.element);
  for(const slot of teammateSlots){
    const select=el(slot+'char');
    for(const option of select.options)option.disabled=option.value===id;
    if(select.value===id){
      select.value='air';
      syncTeammate(slot);
    }
  }
  el('mainAgent').value=id;
  syncAgentCard(el('mainAgent'),actor);
  el('leadPotentialSettings').hidden=id!=='nekomata' && id!=='anby';
  for(const slot of teammateSlots)el(slot+'BuffTitle').textContent='对'+actor.name+'的增益';
  for(const [field,text] of Object.entries({
    summaryTitle:actor.name+'单轮期望伤害',discHeading:actor.name+'驱动盘',skillHeading:actor.name+'招式',
    resLabel:'敌方'+element+'抗性 %',resColumn:mixed?'招式属性抗性区':(element==='物理'?'物':element)+'抗区',critColumn:normal?'期望暴击倍率':'锐暴倍率',
    customElementLabel:element+'属性增伤',exampleHeading:'终结技「'+actor.ultimate+'」乘区拆解',
    stunColumn:id==='yeShunguang'?'失衡／帷幕区':'失衡区'
  }))el(field).textContent=text;
  for(const [selector,shown] of [['[data-miyabi]',id==='miyabi'],['[data-sun]',id==='sunbringer'],['[data-sharp]',!normal],['[data-normal]',normal],['[data-attack]',usesAttack({main:id})],
    ['[data-neko]',id==='nekomata'],['[data-anby]',id==='anby'],['[data-ye]',id==='yeShunguang'],['[data-yi]',id==='yixuan'],
    ['[data-billy]',id==='starlightBilly'],['[data-rupture]',usesRupture({main:id})]]){
    for(const node of document.querySelectorAll(selector)){
      node.hidden=!shown;
      for(const input of node.querySelectorAll('input'))input.disabled=!shown;
    }
  }
  const expanded=Boolean(expandedLeads[id]);
  el('physicalRes').disabled=!mixed;
  el('physicalRes').closest('label').hidden=el('physicalRes').disabled;
  for(const node of document.querySelectorAll('[data-expanded]'))node.hidden=!expanded;
  for(const node of document.querySelectorAll('[data-expanded-role]')){
    node.hidden=node.dataset.expandedRole!==id;
    for(const input of node.querySelectorAll('input'))input.disabled=node.hidden;
  }
  if(expanded)renderExpandedNotes(actor);
  setWeaponSelect(el('we'),actor,actor.engines[0][0]);
  el('variants').querySelector('[value="w"]').textContent=actor.name+'影画';
  syncLeadEngine();
  el('shadowNote').textContent='仅改变'+actor.name+'影画。各档沿用当前队友、音擎、驱动主副词条、轮转和战斗条件，分别与 0 影及上一影比较整轮期望伤害。';
  const discs=defaultDiscs();
  const fourth=discs.main4==='auto'?'自动择优':mainLabels[discs.main4].split(' +')[0];
  el('baselineNote').textContent='全 01 基准沿用当前队伍和空位，出战角色均为 0 影、各带 1 星专武。'+actor.name+'使用 4 '+fourPieces()[discs.set]+'＋2 '+twoPieces()[discs.two]+'，四号位'+fourth+'、五号位自动择优、六号位'+mainLabels[discs.main6].split(' +')[0]+'。各配置沿用相同战斗条件和手动招式次数，在所选词条预算内独立优化。';
  el('set').innerHTML=options(Object.entries(fourPieces()));
  el('two').innerHTML=options(Object.entries(twoPieces()));
  for(const [key,{sets}] of Object.entries(leadDiscStackRules)){
    const input=el(key+'Stacks');
    input.disabled=!sets.some(set=>Object.hasOwn(fourPieces(),set));
    input.closest('label').hidden=input.disabled;
  }
  el('leadDiscStackOptions').hidden=!el('leadDiscStacks').querySelector('input:enabled');
  leadRollNames(id).forEach((name,i)=>{
    el('rollLabel'+i).textContent=name+'条数';
    rollLocks[i].setAttribute('aria-label','锁定'+name+'条数');
  });
  for(const control of settingsControls){
    if(!leadFields.has(control.id) || ['res','physicalRes','we','wr','leadWeaponStacks'].includes(control.id))continue;
    if(control.type==='checkbox')control.checked=control.defaultChecked;
    else if(control.id==='w')control.value=defaultLeadShadows[id]??0;
    else if(control.tagName==='SELECT')control.value=discs[control.id]??(control.id.endsWith('Potential')?'6':control.options[0].value);
    else control.value=control.defaultValue;
  }
  manualBaseline=null;
  buildRotation();
}

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
    if(control.type==='number' && !control.disabled && (!Number.isFinite(control.valueAsNumber)||!control.validity.valid))return;
    fields[control.id]=control.type==='checkbox'?control.checked:control.value;
  }
  const rotation={};
  if(teammateSlots.some(slot=>!el(slot+'DamageCoefficient').checkValidity()))return;
  for(const [i,skill] of activeSkills().entries()){
    const count=el('n'+i);
    if(!skill.automatic && (!Number.isFinite(count.valueAsNumber)||!count.validity.valid))return;
    rotation[skill.name]={count:skill.automatic?undefined:count.value,overrides:overrides[i]};
  }
  const weaponId=el('we').value;
  const weaponStacks={...leadProfiles[main]?.weaponStacks};
  if(!el('leadWeaponStacks').disabled)weaponStacks[weaponId]=el('leadWeaponStacks').value;
  (leadWeaponRanks[main]??={})[weaponId]=el('wr').value;
  leadProfiles[main]={weaponStacks,fields:Object.fromEntries(Object.entries(fields).filter(([id])=>leadFields.has(id))),
    rotation,manualBaseline,boss:fields.boss,discLimitPreset,
    ...(main==='miyabi'?{rotationPreset:miyabiRotationPreset}:{})};
  for(const slot of teammateSlots){
    fields[slot+'char']=el(slot+'char').value;
    rememberTeammate(slot);
  }
  try{
    localStorage.setItem(settingsKey,JSON.stringify({fields,teammateBuilds,main,leadProfiles,leadWeaponRanks}));
  }catch{
    el('storageWarning').hidden=false;
  }
}
function restoreLeadProfile(profile){
  setWeaponSelect(el('we'),lead(),profile?.fields?.we);
  syncLeadEngine();
  const fields=profile?.fields;
  const oldStackFields={
    woodpeckerStacks:({nekomata:'nekoWoodStacks',anby:'anbyWoodStacks',yeShunguang:'yeWoodStacks',miyabi:'lead-miyabi-wood'})[main]??(usesRupture({main})?'yiWoodStacks':undefined),
    shadowStacks:({anby:'anbySetStacks',harumasa:'lead-harumasa-shadow'})[main],
    yunkuiStacks:'yiSetStacks'
  };
  // Old profiles saved the defaults along with edited values. Keep custom limits and locked builds.
  const useNewDiscLimits=fields && profile.discLimitPreset===undefined && !fields.lockEntireBuild &&
    !rollLocks.some(lock=>fields[lock.id]) && discLimitFields.every((id,i)=>fields[id]===previousDiscLimits[i]);
  for(const control of settingsControls){
    if(!leadFields.has(control.id) || ['we','leadWeaponStacks'].includes(control.id) || (['res','physicalRes'].includes(control.id) && profile?.boss!==el('boss').value))continue;
    if(useNewDiscLimits && discLimitFields.includes(control.id))continue;
    restoreControl(control,fields?.[control.id]??fields?.[oldStackFields[control.id]]);
  }
  // Older profiles also saved untouched counts, so migrate only matching presets.
  const previousCounts=main==='miyabi'?previousMiyabiCounts[profile?.rotationPreset??1]:null;
  const updateMiyabiPreset=previousCounts && activeSkills().every(skill=>skill.automatic ||
    profile?.rotation?.[skill.name]?.count===String(previousCounts[skill.id]??0));
  activeSkills().forEach((skill,i)=>{
    const row=profile?.rotation?.[skill.name];
    if(!skill.automatic && !updateMiyabiPreset)restoreControl(el('n'+i),row?.count);
    for(const field of activeMultiplierFields()){
      const value=row?.overrides?.[field];
      if(Number.isFinite(value))overrides[i][field]=value;
    }
  });
  const baseline=profile?.manualBaseline;
  // Saved baselines contain only the previous score, so a formula change invalidates them.
  if(baseline?.version===baselineVersion() && Number.isFinite(baseline.score) && typeof baseline.description==='string')manualBaseline=baseline;
}
function restoreSettings(){
  let saved;
  try{saved=JSON.parse(localStorage.getItem(settingsKey));}catch{}
  const fields=saved?.fields||{};
  Object.assign(leadWeaponRanks,saved?.leadWeaponRanks);
  for(const id of Object.keys(leadChoices)){
    const profile=saved?.leadProfiles?.[id];
    if(profile && typeof profile==='object')leadProfiles[id]=profile;
  }
  if(saved && !saved.leadProfiles)leadProfiles.sunbringer={fields,rotation:saved.rotation,manualBaseline:saved.manualBaseline,boss:fields.boss};
  configureLead(Object.hasOwn(leadChoices,saved?.main)?saved.main:'sunbringer');
  for(const character of Object.keys(teammateChoices)){
    const build=saved?.teammateBuilds?.[character];
    if(build && typeof build==='object'){
      const {rank,...savedBuild}=build;
      const engineRanks={...build.engineRanks};
      if(rank!==undefined && build.engine!==undefined && !Object.hasOwn(engineRanks,build.engine)){
        engineRanks[build.engine]=rank;
      }
      teammateBuilds[character]={...savedBuild,engineRanks};
    }
  }
  for(const slot of teammateSlots){
    restoreControl(el(slot+'char'),fields[slot+'char']);
    if(el(slot+'char').value===main)el(slot+'char').value='air';
  }
  if(el('fchar').value===el('rchar').value)el('rchar').value='air';
  teammateSlots.forEach(syncTeammate);
  syncTeamControls();
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
    if(leadFields.has(control.id) || ['assaultBuff','regionChoice'].includes(control.id))continue;
    if((control.id==='regionStacks' || control.id==='regionExtra') &&
      (fields.boss!==el('boss').value || preferredRegion!==el('regionChoice').value))continue;
    restoreControl(control,fields[control.id]);
  }
  restoreLeadProfile(leadProfiles[main]);
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
const backgroundOpacity=el('backgroundOpacity');
const backgroundOpacityKey='sunbringer-calculator.background-opacity';
const appTheme=el('appTheme');
const appThemeKey='sunbringer-calculator.theme';
function applyBackgroundOpacity(){
  document.body.style.setProperty('--background-opacity',backgroundOpacity.valueAsNumber/100);
  el('backgroundOpacityValue').value=backgroundOpacity.value+'%';
}
try{
  const savedOpacity=localStorage.getItem(backgroundOpacityKey);
  if(savedOpacity!==null && /^\d{1,3}$/.test(savedOpacity) && Number(savedOpacity)<=100)backgroundOpacity.value=savedOpacity;
  const savedTheme=localStorage.getItem(appThemeKey);
  if([...appTheme.options].some(option=>option.value===savedTheme))appTheme.value=savedTheme;
}catch{}
applyBackgroundOpacity();
document.body.dataset.theme=appTheme.value;
appTheme.addEventListener('change',()=>{
  document.body.dataset.theme=appTheme.value;
  try{localStorage.setItem(appThemeKey,appTheme.value);}
  catch{el('storageWarning').hidden=false;}
});
backgroundOpacity.addEventListener('input',()=>{
  applyBackgroundOpacity();
  try{localStorage.setItem(backgroundOpacityKey,backgroundOpacity.value);}
  catch{el('storageWarning').hidden=false;}
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








