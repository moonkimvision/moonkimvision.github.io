// 화면 만들기(팀 줄·골인 줄·칸·말)와 상태 → 화면 그리기, 말 이동 애니메이션(FLIP)
import {MAX_TEAMS,PER_TEAM,DEFAULT_NAMES,reduceMotion,$} from './config.js';
import {NODES} from './board.js';
import {pieces,state,history,announced,save,active,nameOf,goalCount} from './state.js';

export const board=$('#board'),goalTray=$('#goalTray');
const boardLayer=$('#boardLayer'),nodeLayer=$('#nodeLayer');
const waitSlots=[],goalSlots=[],teamRowEls=[],nameInputs=[];
export const goalRowEls=[];
for(let t=0;t<MAX_TEAMS;t++){
  const row=document.createElement('div'); row.className='team-row'; row.dataset.team=t;
  row.innerHTML='<input class="team-name" maxlength="8" aria-label="'+(t+1)+'번째 팀 이름"><div class="slots"></div>';
  $('#teamRows').appendChild(row); teamRowEls.push(row);
  const inp=row.querySelector('input'); nameInputs.push(inp);
  inp.addEventListener('input',()=>{ state.names[t]=inp.value.trim()||DEFAULT_NAMES[t]; render(); });
  inp.addEventListener('blur',()=>{ inp.value=state.names[t]; });
  const g=document.createElement('div'); g.className='goal-row'; g.dataset.team=t;
  g.innerHTML='<div class="goal-label"></div><div class="slots"></div><div class="goal-count">0/4</div>';
  $('#goalRows').appendChild(g); goalRowEls.push(g);
  waitSlots[t]=[];goalSlots[t]=[];
  for(let k=0;k<PER_TEAM;k++){
    const a=document.createElement('div');a.className='slot';row.querySelector('.slots').appendChild(a);waitSlots[t].push(a);
    const b=document.createElement('div');b.className='slot';g.querySelector('.slots').appendChild(b);goalSlots[t].push(b);
  }
}
export const nodeEls=NODES.map(n=>{
  const d=document.createElement('div');d.className='node'+(n.big?' big':'');
  d.style.left=n.x+'%';d.style.top=n.y+'%';nodeLayer.appendChild(d);return d;
});
export const pieceEls={};
pieces.forEach(p=>{
  const el=document.createElement('div');el.className='piece';el.dataset.id=p.id;
  el.innerHTML='<div class="token t'+p.team+'"><span class="mark"></span></div>';
  pieceEls[p.id]=el;
});

/* ----- Render + FLIP ----- */
export const tokenOf=id=>pieceEls[id].querySelector('.token');
export function captureRects(){const m={};pieces.forEach(p=>{if(pieceEls[p.id].isConnected)m[p.id]=tokenOf(p.id).getBoundingClientRect();});return m;}
export function flip(first,slowIds){
  if(reduceMotion||!first) return;
  pieces.forEach(p=>{
    const a=first[p.id]; if(!a||!pieceEls[p.id].isConnected) return;
    const tok=tokenOf(p.id);
    tok.style.transition='none';tok.style.translate='';tok.style.transform='';
    const b=tok.getBoundingClientRect(); if(!b.width) return;
    const dx=(a.left+a.width/2)-(b.left+b.width/2),dy=(a.top+a.height/2)-(b.top+b.height/2),s=a.width/b.width;
    if(Math.abs(dx)<1&&Math.abs(dy)<1&&Math.abs(s-1)<.02) return;
    tok.style.translate=dx+'px '+dy+'px';tok.style.transform='scale('+s+')';tok.getBoundingClientRect();
    const slow=slowIds&&slowIds.has(p.id);
    const dur=slow?'.75s':'.26s',ease=slow?'cubic-bezier(.2,.8,.2,1)':'cubic-bezier(.3,1.35,.5,1)';
    requestAnimationFrame(()=>{
      tok.style.transition='translate '+dur+' '+ease+',transform '+dur+' '+ease+',scale .22s cubic-bezier(.3,1.7,.5,1)';
      tok.style.translate='';tok.style.transform='';
    });
  });
}
// 말 토큰에 한 번만 도는 애니메이션 클래스(land·hop·flinch·spin-home)를 붙인다
export function playAnim(tok,cls,delay){
  if(reduceMotion||!tok) return;
  tok.classList.remove(cls);void tok.offsetWidth;
  tok.style.animationDelay=(delay||0)+'s';tok.classList.add(cls);
  const done=()=>{tok.classList.remove(cls);tok.style.animationDelay='';tok.removeEventListener('animationend',done);};
  tok.addEventListener('animationend',done);
}
export function render(first,slowIds){
  for(let t=0;t<MAX_TEAMS;t++){
    teamRowEls[t].hidden=!active(t); goalRowEls[t].hidden=!active(t);
    if(document.activeElement!==nameInputs[t]) nameInputs[t].value=nameOf(t);
    goalRowEls[t].querySelector('.goal-label').textContent=nameOf(t);
  }
  document.querySelectorAll('#teamSeg button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.n===state.teamCount?'true':'false'));
  const byNode={};
  pieces.forEach(p=>{const loc=state.locs[p.id];if(active(p.team)&&typeof loc==='number')(byNode[loc]=byNode[loc]||[]).push(p);});
  Object.values(byNode).forEach(a=>a.sort((x,y)=>x.team-y.team||x.idx-y.idx));
  pieces.forEach(p=>{
    const el=pieceEls[p.id],loc=state.locs[p.id];
    el.removeAttribute('data-count');el.style.removeProperty('left');el.style.removeProperty('top');el.style.removeProperty('--i');
    el.querySelector('.mark').textContent=(nameOf(p.team)||'').trim().charAt(0)||String(p.team+1);
    el.setAttribute('aria-label',nameOf(p.team)+' 말 '+(p.idx+1));
    if(!active(p.team)){el.remove();return;}
    if(loc==='wait') waitSlots[p.team][p.idx].appendChild(el);
    else if(loc==='goal') goalSlots[p.team][p.idx].appendChild(el);
    else{
      const stack=byNode[loc],i=stack.indexOf(p),n=NODES[loc];
      el.style.left=n.x+'%';el.style.top=n.y+'%';el.style.setProperty('--i',i);
      if(i===stack.length-1&&stack.length>1) el.dataset.count=stack.length;
      if(el.parentNode!==boardLayer) boardLayer.appendChild(el);
    }
  });
  for(let t=0;t<MAX_TEAMS;t++){
    const c=goalCount(t);
    goalRowEls[t].querySelector('.goal-count').textContent=c+'/'+PER_TEAM;
    if(c<PER_TEAM) announced[t]=false;
  }
  $('#undoBtn').disabled=!history.length;
  flip(first,slowIds);
  save();
}
export function checkWin(){
  for(let t=0;t<state.teamCount;t++){
    if(goalCount(t)===PER_TEAM&&!announced[t]){announced[t]=true;return t;}
  }
  return -1;
}
