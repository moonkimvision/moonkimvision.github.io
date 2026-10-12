// 말 끌어 놓기(마우스·터치 공통 Pointer Events) — 가까운 칸에 붙이고, 골인 칸·대기 줄에도 놓을 수 있다
import {NODES} from './board.js';
import {pieces,state} from './state.js';
import {board,goalTray,nodeEls,pieceEls,tokenOf,captureRects,render} from './view.js';
import {moveGroup} from './moves.js';

let drag=null;
function onDown(e){
  if(e.button!==undefined&&e.button!==0) return;
  const id=e.currentTarget.dataset.id,p=pieces.find(q=>q.id===id),loc=state.locs[id];
  const group=typeof loc==='number'?pieces.filter(q=>q.team===p.team&&state.locs[q.id]===loc):[p];
  drag={p,group,sx:e.clientX,sy:e.clientY,active:false,ghost:null,hot:-1};
  e.preventDefault();
  window.addEventListener('pointermove',onMove);window.addEventListener('pointerup',onUp);window.addEventListener('pointercancel',onCancel);
}
function startDrag(){
  const g=document.createElement('div');g.className='ghost';
  const ref=tokenOf(drag.p.id).getBoundingClientRect();
  drag.offX=drag.sx-ref.left;drag.offY=drag.sy-ref.top;
  drag.group.forEach(q=>{
    const r=tokenOf(q.id).getBoundingClientRect(),c=tokenOf(q.id).cloneNode(true);
    c.style.width=r.width+'px';c.style.height=r.height+'px';c.style.left=(r.left-ref.left)+'px';c.style.top=(r.top-ref.top)+'px';
    c.style.transform='';c.style.transition='';c.dataset.id=q.id;g.appendChild(c);pieceEls[q.id].classList.add('lifted');
  });
  document.body.appendChild(g);drag.ghost=g;drag.active=true;document.body.style.cursor='grabbing';
}
function nearestNode(x,y){
  const r=board.getBoundingClientRect();
  if(x<r.left-20||x>r.right+20||y<r.top-20||y>r.bottom+20) return -1;
  const th=r.width*0.075;let best=-1,bd=Infinity;
  NODES.forEach(n=>{const d=Math.hypot(r.left+r.width*n.x/100-x,r.top+r.height*n.y/100-y);if(d<bd){bd=d;best=n.i;}});
  return bd<=th?best:-1;
}
function onMove(e){
  if(!drag) return;
  if(!drag.active){if(Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)<5)return;startDrag();}
  drag.ghost.style.transform='translate('+(e.clientX-drag.offX)+'px,'+(e.clientY-drag.offY)+'px)';
  const n=nearestNode(e.clientX,e.clientY);
  if(n!==drag.hot){if(drag.hot>=0)nodeEls[drag.hot].classList.remove('hot');if(n>=0)nodeEls[n].classList.add('hot');drag.hot=n;}
  const el=document.elementFromPoint(e.clientX,e.clientY);
  goalTray.classList.toggle('drop-ok',!!(el&&el.closest('#goalTray')));
}
function endDrag(){
  window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onUp);window.removeEventListener('pointercancel',onCancel);
  if(drag&&drag.hot>=0) nodeEls[drag.hot].classList.remove('hot');
  goalTray.classList.remove('drop-ok');document.body.style.cursor='';
}
function releaseGhost(d){
  const first=captureRects();
  if(d.ghost){d.ghost.querySelectorAll('.token').forEach(c=>first[c.dataset.id]=c.getBoundingClientRect());d.ghost.remove();}
  d.group.forEach(q=>pieceEls[q.id].classList.remove('lifted'));
  return first;
}
function onCancel(){if(!drag)return;endDrag();const d=drag;drag=null;render(releaseGhost(d));}
function onUp(e){
  if(!drag) return;
  endDrag();const d=drag;drag=null;if(!d.active) return;
  const first=releaseGhost(d);
  const x=e.clientX,y=e.clientY,n=nearestNode(x,y),el=document.elementFromPoint(x,y);
  let target=null;
  if(n>=0) target=n;
  else if(el&&el.closest('#goalTray')) target='goal';
  else if(el&&el.closest('.team-row')) target='wait';
  if(target===null){render(first);return;}
  moveGroup(d.group,target,first);
}

Object.values(pieceEls).forEach(el=>el.addEventListener('pointerdown',onDown));
