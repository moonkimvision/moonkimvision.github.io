// 연출: 큰 글자 스플래시(스탬프·말풍선을 비켜서), 칸 물결, 판 흔들기, 토스트
import {reduceMotion,$} from './config.js';
import {NODES} from './board.js';
import {board} from './view.js';
import {recentLabelRects,area} from './labels.js';

/* ----- Splash ----- */
const splashEl=$('#splash');let splashT=null;
// team: 팀 번호, 또는 null = 윷 던지기(노란색). 큰 메시지를 비켜도 스탬프와 많이 겹치면 짧게 보여 주고 true 를 돌려준다
export function splash(kind,team,title,sub){
  splashEl.classList.remove('show');void splashEl.offsetWidth;
  splashEl.dataset.kind=kind;splashEl.dataset.team=(team===null?'y':team);
  $('#spTitle').textContent=title;$('#spSub').textContent=sub;
  const conflict=placeSplash();
  splashEl.classList.toggle('quick',conflict);
  splashEl.classList.add('show');
  clearTimeout(splashT);splashT=setTimeout(()=>splashEl.classList.remove('show'),conflict?1250:2000);
  return conflict;
}
// 큰 메시지가 스탬프·말풍선을 덮지 않도록 화면 위아래로 비켜서 띄우기
function placeSplash(){
  const H=innerHeight,W=innerWidth;let sy=H/2,ss=1,left=0;
  splashEl.style.setProperty('--sy',sy+'px');splashEl.style.setProperty('--ss',1);
  const fresh=recentLabelRects();
  if(fresh.length){
    const box=splashEl.querySelector('.box'),bw0=box.offsetWidth,bh0=box.offsetHeight;
    let best=Infinity;
    [1,.8,.62].forEach(k=>{
      const bw=bw0*k,bh=bh0*k;
      [.5,.38,.62,.28,.72,.2,.8,.12,.88].forEach(f=>{
        const top=Math.max(6,Math.min(H-bh-6,H*f-bh/2));
        const r={x0:W/2-bw/2,y0:top,x1:W/2+bw/2,y1:top+bh};
        let ov=0;fresh.forEach(l=>ov+=area(r,l));
        const sc=ov*.03+Math.abs(f-.5)*60+(1-k)*120;
        if(sc<best){best=sc;sy=top+bh/2;ss=k;left=ov;}
      });
    });
  }
  splashEl.style.setProperty('--sy',sy+'px');splashEl.style.setProperty('--ss',ss);
  return left>1500;     // 그래도 많이 겹치면 true
}
export function ringAt(nodeIdx,color){
  if(reduceMotion) return;
  const n=NODES[nodeIdx];
  [0,160].forEach(delay=>setTimeout(()=>{
    const r=document.createElement('div');r.className='ring';r.style.left=n.x+'%';r.style.top=n.y+'%';r.style.setProperty('--rc',color);
    board.appendChild(r);setTimeout(()=>r.remove(),900);
  },delay));
}
export function shakeBoard(){board.classList.remove('shake');void board.offsetWidth;board.classList.add('shake');}

/* ----- Toast ----- */
let toastT=null;
export function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2200);}
