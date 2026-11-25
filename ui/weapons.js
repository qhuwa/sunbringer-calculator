const weaponStatLabels={atk:'攻击力',def:'防御力',hp:'生命值',crit:'暴击率',cd:'暴击伤害',pen:'穿透率',
  ap:'异常精通',mastery:'异常掌控',energy:'能量自动回复',impact:'冲击力'};
const agentRole=actor=>actor.role.split(' · ')[0];
const catalogOption='catalog';
function agentOptions(actors,selected){
  const byProfession=new Map();
  let empty='';
  for(const [id,actor] of Object.entries(actors)){
    const option=`<option value="${id}"${selected===id?' selected':''}>${actor.name}</option>`;
    if(id==='air'){empty=option;continue;}
    const role=agentRole(actor);
    byProfession.set(role,(byProfession.get(role)??'')+option);
  }
  return empty+['强攻','异常','命破','锋御','击破','支援','防护'].filter(role=>byProfession.has(role)).map(role=>
    `<optgroup label="${role}">${byProfession.get(role)}</optgroup>`).join('');
}

function weaponOptions(actor,selected){
  const extra=weaponCatalog.get(Number(selected));
  const choices=extra?[...actor.engines,[String(extra.id),extra.name]]:actor.engines;
  return choices.map(([id,label])=>[id,label==='其他音擎'?'仅角色增益':label]);
}
function setWeaponSelect(select,actor,selected){
  const choices=weaponOptions(actor,selected);
  select.innerHTML=options(actor===emptyTeammate?choices:[...choices,[catalogOption,'其他音擎…']]);
  select.value=choices.some(([id])=>id===String(selected))?String(selected):choices[0][0];
  select.dataset.applied=select.value;
}
function weaponOptionLabel(actor,id){
  return weaponCatalog.get(Number(id))?.name??actor.engines.find(([key])=>key===String(id))?.[1]??actor.engines[0][1];
}
function setupWeaponPicker(onChoose){
  const dialog=el('weaponPicker'), search=el('weaponSearch'), results=el('weaponResults');
  let current=null;
  const normalized=text=>text.normalize('NFKC').toLowerCase().trim();
  function filter(){
    const terms=normalized(search.value).split(/\s+/).filter(Boolean);
    const choices=[...weaponCatalog.values()].filter(weapon=>{
      const value=normalized([weapon.name,weapon.role,weapon.slug,weapon.id].join(' '));
      return terms.every(term=>value.includes(term));
    }).sort((a,b)=>Number(b.role===current.role)-Number(a.role===current.role));
    const fragment=document.createDocumentFragment();
    for(const weapon of choices){
      const button=document.createElement('button');
      button.type='button';
      button.dataset.weapon=weapon.id;
      const name=document.createElement('strong'), stats=document.createElement('small');
      name.textContent=weapon.name;
      const value=weapon.stat==='ap'?weapon.value:Number((weapon.value*100).toFixed(2))+'%';
      stats.textContent=`${weapon.role} · 基础${weaponStatLabels[weapon.baseType]} ${weapon.base} · ${weaponStatLabels[weapon.stat]} ${value}`;
      button.append(name,stats);
      fragment.append(button);
    }
    results.replaceChildren(fragment);
    results.scrollTop=0;
    el('weaponResultCount').textContent=choices.length?choices.length+' 个音擎':'没有匹配的音擎';
  }
  search.addEventListener('input',filter);
  search.addEventListener('keydown',event=>{
    if(event.key==='Enter' && results.childElementCount===1){
      event.preventDefault();
      results.firstElementChild.click();
    }
  });
  results.addEventListener('click',event=>{
    const button=event.target.closest('[data-weapon]');
    if(!button)return;
    const weapon=weaponCatalog.get(Number(button.dataset.weapon));
    const preset=current.actor.engines.find(([,name])=>name===weapon.name);
    const {slot,actor,select}=current;
    setWeaponSelect(select,actor,preset?.[0]??weapon.id);
    dialog.close();
    onChoose(slot);
  });
  el('closeWeaponPicker').addEventListener('click',()=>dialog.close());
  return (slot,actor,select)=>{
    select.value=select.dataset.applied;
    current={slot,actor,select,role:agentRole(actor)};
    el('weaponPickerTitle').textContent=actor.name+' · 选择音擎';
    search.value='';
    filter();
    dialog.showModal();
    search.focus();
  };
}
