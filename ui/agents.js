const normalizePickerSearch=value=>value.normalize('NFKC').toLowerCase().replace(/[·・•‧]/g,'').trim();

function wirePickerNavigation(search,results){
  const buttons=()=>[...results.querySelectorAll('button')];
  search.addEventListener('keydown',event=>{
    if(event.isComposing || !['ArrowDown','Enter'].includes(event.key))return;
    const first=buttons()[0];
    if(!first || event.key==='Enter' && !normalizePickerSearch(search.value))return;
    event.preventDefault();
    if(event.key==='ArrowDown')first.focus();
    else first.click();
  });
  results.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowUp'].includes(event.key))return;
    const options=buttons(), index=options.indexOf(event.target);
    if(index<0)return;
    event.preventDefault();
    const next=event.key==='ArrowDown'?options[index+1]:(options[index-1]??search);
    next?.focus();
  });
}

function agentCardHeader(id,label,choices){
  return `<div class="agent" data-label="${label}">
    <button type="button" id="${id}Avatar" class="agent-portrait" aria-haspopup="dialog" aria-controls="agentPicker"><img alt="" hidden></button>
    <button type="button" id="${id}Picker" class="agent-picker-trigger" aria-haspopup="dialog" aria-controls="agentPicker">
      <span class="agent-picker-copy"><strong></strong><small></small></span>
    </button>
    <select id="${id}" hidden>${choices}</select>
  </div>`;
}

function syncAgentCard(select,actor){
  const header=select.closest('.agent');
  const button=el(select.id+'Picker'), avatar=el(select.id+'Avatar');
  const portrait=avatar.firstElementChild;
  const label='更换'+header.dataset.label+' · '+actor.name;
  header.closest('.team-card').dataset.agent=select.value;
  button.querySelector('strong').textContent=actor.name;
  button.querySelector('small').textContent=actor.role;
  button.setAttribute('aria-label',label);
  avatar.setAttribute('aria-label',label+'头像');
  portrait.hidden=!actor.portrait;
  if(actor.portrait)portrait.src=actor.portrait;
  else portrait.removeAttribute('src');
}

function setupAgentPicker(rosters){
  const dialog=el('agentPicker'), search=el('agentSearch'), results=el('agentResults');
  let select=null;
  function updateResults(){
    const query=normalizePickerSearch(search.value).split(/\s+/).filter(Boolean);
    const groups=new Map();
    let count=0;
    for(const option of select.options){
      if(option.disabled)continue;
      const actor=rosters[select.id][option.value];
      const content=normalizePickerSearch([actor.name,actor.role,actor.slug,actor.agentId].join(' '));
      if(!query.every(term=>content.includes(term)))continue;
      const role=option.parentElement.label||'空位';
      if(!groups.has(role))groups.set(role,[]);
      groups.get(role).push({option,actor});
      count++;
    }

    const fragment=document.createDocumentFragment();
    for(const [role,actors] of groups){
      const section=document.createElement('section'), heading=document.createElement('h3');
      const entries=document.createElement('div');
      section.className='agent-result-group';
      heading.textContent=role;
      entries.className='agent-result-options';
      for(const {option,actor} of actors){
        const button=document.createElement('button'), name=document.createElement('span');
        button.type='button';
        button.dataset.agent=option.value;
        if(option.selected)button.setAttribute('aria-current','true');
        if(actor.portrait){
          const avatar=document.createElement('img');
          avatar.alt='';
          avatar.loading='lazy';
          avatar.src=actor.portrait;
          avatar.addEventListener('error',()=>avatar.remove(),{once:true});
          button.append(avatar);
        }
        name.textContent=actor.name;
        button.append(name);
        entries.append(button);
      }
      section.append(heading,entries);
      fragment.append(section);
    }
    results.replaceChildren(fragment);
    results.scrollTop=0;
    el('agentResultCount').textContent=count?count+' 位代理人':'没有匹配的代理人';
  }

  for(const id of Object.keys(rosters)){
    const avatar=el(id+'Avatar');
    avatar.firstElementChild.addEventListener('error',event=>{event.target.hidden=true;});
    const openPicker=()=>{
      select=el(id);
      el('agentPickerTitle').textContent='选择'+select.closest('.agent').dataset.label;
      search.value='';
      updateResults();
      dialog.showModal();
      search.focus();
    };
    el(id+'Picker').addEventListener('click',openPicker);
    avatar.addEventListener('click',openPicker);
  }
  el('closeAgentPicker').addEventListener('click',()=>dialog.close());
  search.addEventListener('input',updateResults);
  wirePickerNavigation(search,results);
  results.addEventListener('click',event=>{
    const button=event.target.closest('[data-agent]');
    if(!button)return;
    dialog.close();
    if(select.value===button.dataset.agent)return;
    select.value=button.dataset.agent;
    select.dispatchEvent(new Event('change',{bubbles:true}));
  });
}
