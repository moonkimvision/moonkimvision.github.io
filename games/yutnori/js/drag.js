// 말 끌어 놓기(마우스·터치 공통 Pointer Events) — 가까운 칸에 붙이고, 골인 칸·대기 줄에도 놓을 수 있다
import {reduceMotion,rnd} from './config.js';
import {NODES} from './board.js';
import {pieces,state} from './state.js';
import {board,goalTray,nodeEls,pieceEls,tokenOf,captureRects,render,playAnim} from './view.js';
import {dragSpark} from './fx.js';
import {moveGroup} from './moves.js';
import {sfx} from './sound.js';

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
  drag.offX=drag.sx-ref.left;drag.offY=drag.sy-ref.top;drag.px=drag.sx;drag.py=drag.sy;
  const order=[drag.p].concat(drag.group.filter(q=>q!==drag.p));
  drag.kids=order.map((q,i)=>{
    const r=tokenOf(q.id).getBoundingClientRect(),c=tokenOf(q.id).cloneNode(true);
    c.classList.remove('land','hop','flinch','spin-home');
    c.style.cssText='width:'+r.width+'px;height:'+r.height+'px;z-index:'+(10-i);
    c.dataset.id=q.id;
    c.style.translate=r.left+'px '+r.top+'px';
    if(!reduceMotion){c.style.animationDelay=(i*0.05)+'s';c.classList.add('pick');}
    g.appendChild(c);pieceEls[q.id].classList.add('lifted');
    return {el:c,rx:r.left-ref.left,ry:r.top-ref.top,x:r.left,y:r.top,vx:0,vy:0,k:i===0?.62:Math.max(.2,.42-i*.07)};
  });
  document.body.appendChild(g);drag.ghost=g;drag.active=true;document.body.style.cursor='grabbing';
  sfx('pick');
  drag.raf=requestAnimationFrame(ghostLoop);
}
// 손가락을 졸졸 따라오는 말랑한 말: 스프링으로 따라가고, 빠르게 움직이면 늘어나요
function ghostLoop(){
  if(!drag||!drag.active) return;
  drag.kids.forEach((k,i)=>{
    const tx=drag.px-drag.offX+k.rx,ty=drag.py-drag.offY+k.ry;
    const kk=reduceMotion?1:k.k;
    const nx=k.x+(tx-k.x)*kk,ny=k.y+(ty-k.y)*kk;
    k.vx=k.vx*.55+(nx-k.x)*.45;k.vy=k.vy*.55+(ny-k.y)*.45;k.x=nx;k.y=ny;
    k.el.style.translate=k.x+'px '+k.y+'px';
    if(!reduceMotion){
      const sp=Math.hypot(k.vx,k.vy),st=Math.min(.3,sp*.016),a=Math.atan2(k.vy,k.vx);
      k.el.style.transform='rotate('+a+'rad) scale('+(1+st)+','+(1-st*.65)+') rotate('+(-a)+'rad) scale(1.12)';
      if(i===0&&sp>14&&Math.random()<.5){
        const w=k.el.offsetWidth;
        dragSpark(k.x+w/2+rnd(-6,6),k.y+w/2+rnd(-6,6),-k.vx*.08+rnd(-.6,.6),-k.vy*.08+rnd(-.6,.6),drag.p.team);
      }
    }else k.el.style.transform='scale(1.12)';
  });
  drag.raf=requestAnimationFrame(ghostLoop);
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
  drag.px=e.clientX;drag.py=e.clientY;
  const n=nearestNode(e.clientX,e.clientY);
  if(n!==drag.hot){if(drag.hot>=0)nodeEls[drag.hot].classList.remove('hot');if(n>=0){nodeEls[n].classList.add('hot');sfx('tick');}drag.hot=n;}
  const el=document.elementFromPoint(e.clientX,e.clientY);
  goalTray.classList.toggle('drop-ok',!!(el&&el.closest('#goalTray')));
}
function endDrag(){
  if(drag&&drag.raf) cancelAnimationFrame(drag.raf);
  window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onUp);window.removeEventListener('pointercancel',onCancel);
  if(drag&&drag.hot>=0) nodeEls[drag.hot].classList.remove('hot');
  goalTray.classList.remove('drop-ok');document.body.style.cursor='';
}
function releaseGhost(d){
  const first=captureRects();
  if(d.ghost){
    d.ghost.querySelectorAll('.token').forEach(c=>{
      c.style.transform='';c.classList.remove('pick');         // 늘어난 모양 말고 제 크기로 재기
      first[c.dataset.id]=c.getBoundingClientRect();
    });
    d.ghost.remove();
  }
  d.group.forEach(q=>pieceEls[q.id].classList.remove('lifted'));
  return first;
}
function onCancel(){if(!drag)return;endDrag();const d=drag;drag=null;render(releaseGhost(d));d.group.forEach(q=>playAnim(tokenOf(q.id),'land',.2));}
function onUp(e){
  if(!drag) return;
  endDrag();const d=drag;drag=null;if(!d.active) return;
  const first=releaseGhost(d);
  const x=e.clientX,y=e.clientY,n=nearestNode(x,y),el=document.elementFromPoint(x,y);
  let target=null;
  if(n>=0) target=n;
  else if(el&&el.closest('#goalTray')) target='goal';
  else if(el&&el.closest('.team-row')) target='wait';
  if(target===null){render(first);d.group.forEach((q,i)=>playAnim(tokenOf(q.id),'land',.2+i*.04));sfx('boing');return;}
  moveGroup(d.group,target,first);
}

Object.values(pieceEls).forEach(el=>el.addEventListener('pointerdown',onDown));
