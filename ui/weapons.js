const weaponStatLabels={atk:'攻击力',def:'防御力',hp:'生命值',crit:'暴击率',cd:'暴击伤害',pen:'穿透率',
  ap:'异常精通',mastery:'异常掌控',energy:'能量自动回复',impact:'冲击力'};
const agentRole=actor=>actor.role.split(' · ')[0];
const professionOrder=['锋御','强攻','异常','命破','击破','支援','防护'];
const weaponsByName=new Map([...weaponCatalog.values()].map(weapon=>[weapon.name,weapon]));
const weaponIconTiles=new Map(weaponIconIds.map((id,index)=>[id,index]));
const weaponIconRows=Math.ceil(weaponIconIds.length/weaponIconColumns);
function agentOptions(actors,selected){
  const byProfession=new Map();
  let empty='';
  for(const [id,actor] of Object.entries(actors)){
    const option=`<option value="${id}"${selected===id?' selected':''}>${actor.name}</option>`;
    if(id==='air'){empty=option;continue;}
    const role=agentRole(actor);
    byProfession.set(role,(byProfession.get(role)??'')+option);
  }
  return empty+professionOrder.filter(role=>byProfession.has(role)).map(role=>
    `<optgroup label="${role}">${byProfession.get(role)}</optgroup>`).join('');
}

function weaponOptions(actor,selected){
  const extra=weaponCatalog.get(Number(selected));
  const choices=extra && !actor.engines.some(([id])=>Number(id)===extra.id)?
    [...actor.engines,[String(extra.id),extra.name]]:actor.engines;
  return choices.map(([id,label])=>[id,label==='其他音擎'?'仅角色增益':label]);
}
function setWeaponSelect(select,actor,selected){
  const choices=weaponOptions(actor,selected);
  select.innerHTML=options(choices);
  select.value=choices.some(([id])=>id===String(selected))?String(selected):choices[0][0];
  syncWeaponCard(select,actor);
}
function weaponOptionLabel(actor,id){
  return weaponCatalog.get(Number(id))?.name??actor.engines.find(([key])=>key===String(id))?.[1]??actor.engines[0][1];
}
function weaponForOption(actor,id){
  return weaponCatalog.get(Number(id))??(String(id)==='1'?weaponCatalog.get(actor.weaponId):undefined)??
    weaponsByName.get(actor.engines.find(([value])=>value===String(id))?.[1]);
}

function paintWeaponIcon(element,weapon){
  const tile=weaponIconTiles.get(weapon?.id);
  element.toggleAttribute('data-art',tile!==undefined);
  if(tile===undefined)return;
  const x=100*(tile%weaponIconColumns)/(weaponIconColumns-1);
  const y=100*Math.floor(tile/weaponIconColumns)/(weaponIconRows-1);
  element.style.backgroundSize=`${weaponIconColumns*100}% ${weaponIconRows*100}%`;
  element.style.backgroundPosition=`${x}% ${y}%`;
}

function weaponCardField(id){
  return `<div class="wide weapon-field">
    <span class="weapon-field-label">音擎</span>
    <button type="button" id="${id}Picker" class="agent-picker-trigger weapon-card-trigger"
      data-weapon-picker="${id}" aria-haspopup="dialog" aria-controls="weaponPicker">
      <span class="weapon-icon" aria-hidden="true"></span>
      <span class="agent-picker-copy"><strong></strong><small hidden></small></span>
    </button>
    <select id="${id}" hidden></select>
  </div>`;
}

function syncWeaponCard(select,actor){
  const trigger=el(select.id+'Picker'), weapon=weaponForOption(actor,select.value);
  const name=select.selectedOptions[0]?.textContent??weaponOptionLabel(actor,select.value);
  const role=trigger.querySelector('small');
  trigger.querySelector('strong').textContent=name;
  role.textContent=weapon?.role??'';
  role.hidden=!weapon;
  trigger.setAttribute('aria-label','更换音擎 · '+name);
  trigger.title=name;
  paintWeaponIcon(trigger.querySelector('.weapon-icon'),weapon);
}

function weaponStatsText(weapon){
  const value=weapon.stat==='ap'?weapon.value:Number((weapon.value*100).toFixed(2))+'%';
  return `基础${weaponStatLabels[weapon.baseType]} ${weapon.base} · ${weaponStatLabels[weapon.stat]} ${value}`;
}

function setupWeaponPicker(actorFor){
  const dialog=el('weaponPicker'), search=el('weaponSearch'), results=el('weaponResults');
  let select,actor;
  function updateResults(){
    const terms=normalizePickerSearch(search.value).split(/\s+/).filter(Boolean);
    const matches=({name,weapon})=>{
      const text=normalizePickerSearch([name,weapon?.name,weapon?.role,weapon?.slug,weapon?.id].join(' '));
      return terms.every(term=>text.includes(term));
    };
    const common=weaponOptions(actor,select.value).map(([value,name])=>({value,name,weapon:weaponForOption(actor,value)}));
    const pinned=new Set(common.map(({weapon})=>weapon?.id));
    const role=agentRole(actor);
    const groups=new Map([['常用音擎',common.filter(matches)]]);
    for(const item of new Set([role,...professionOrder]))groups.set(item,[]);
    for(const weapon of weaponCatalog.values()){
      const choice={value:String(weapon.id),name:weapon.name,weapon};
      if(!pinned.has(weapon.id) && matches(choice))groups.get(weapon.role).push(choice);
    }
    const fragment=document.createDocumentFragment();
    let count=0;
    for(const [label,choices] of groups){
      if(!choices.length)continue;
      const section=document.createElement('section'), heading=document.createElement('h3'), tiles=document.createElement('div');
      section.className='agent-result-group';
      heading.textContent=label;
      tiles.className='agent-result-options weapon-result-options';
      for(const {value,name,weapon} of choices){
        const button=document.createElement('button'), icon=document.createElement('span');
        const text=document.createElement('span'), title=document.createElement('strong');
        button.type='button';
        button.dataset.weapon=value;
        if(select.value===value)button.setAttribute('aria-current','true');
        icon.className='weapon-icon';
        icon.setAttribute('aria-hidden','true');
        paintWeaponIcon(icon,weapon);
        text.className='weapon-option-copy';
        title.textContent=name;
        text.append(title);
        if(weapon){
          const stats=document.createElement('small');
          stats.textContent=weaponStatsText(weapon);
          text.append(stats);
        }
        button.append(icon,text);
        tiles.append(button);
      }
      count+=choices.length;
      section.append(heading,tiles);
      fragment.append(section);
    }
    results.replaceChildren(fragment);
    results.scrollTop=0;
    el('weaponResultCount').textContent=count?count+' 个选项':'没有匹配的音擎';
  }
  search.addEventListener('input',updateResults);
  wirePickerNavigation(search,results);
  results.addEventListener('click',event=>{
    const button=event.target.closest('[data-weapon]');
    if(!button)return;
    dialog.close();
    if(select.value===button.dataset.weapon)return;
    setWeaponSelect(select,actor,button.dataset.weapon);
    select.dispatchEvent(new Event('change',{bubbles:true}));
  });
  el('closeWeaponPicker').addEventListener('click',()=>dialog.close());
  for(const trigger of document.querySelectorAll('[data-weapon-picker]'))trigger.addEventListener('click',()=>{
    select=el(trigger.dataset.weaponPicker);
    actor=actorFor(select.id);
    el('weaponPickerTitle').textContent=actor.name+' · 选择音擎';
    search.value='';
    updateResults();
    dialog.showModal();
    search.focus();
  });
}
