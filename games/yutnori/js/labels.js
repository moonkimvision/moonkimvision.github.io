// 판 위 표시: 도착 칸의 도·개·걸·윷·모 스탬프, 지나쳐 간 상대 말의 안도 말풍선
// 겹침 없는 배치 계산 — 판 좌표(%)로 말·스탬프·말풍선의 상자를 만들고, 후보 자리 중 겹침이 가장 적은 곳을 골라요.
import {reduceMotion,pick} from './config.js';
import {NODES,THROW_NAME} from './board.js';
import {pieces,state,active,nameOf} from './state.js';
import {board,tokenOf,playAnim} from './view.js';
import {palette,fountainAt} from './fx.js';

const REPLAY_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 1 0 8 8" fill="none" stroke="#2B150C" stroke-width="3" stroke-linecap="round"/><path d="M12 0.5l5 3.5-5 3.5z" fill="#2B150C"/></svg>';
let placed=[],obstacles=[],labelVp=[],labelTime=0;
const PIECE_R=4.4;
function pieceObstacles(){
  const byNode={},out=[];
  pieces.forEach(p=>{const loc=state.locs[p.id];if(active(p.team)&&typeof loc==='number')(byNode[loc]=byNode[loc]||[]).push(p);});
  Object.keys(byNode).forEach(loc=>{
    const n=NODES[+loc];
    byNode[loc].forEach((p,i)=>{const cx=n.x+i*1.9,cy=n.y-i*1.9;out.push({x0:cx-PIECE_R,y0:cy-PIECE_R,x1:cx+PIECE_R,y1:cy+PIECE_R,node:+loc});});
  });
  return out;
}
export function labelsReset(){
  board.querySelectorAll('.stamp').forEach(e=>e.remove());
  // 아직 떠 있는 말풍선은 지우지 않고 피해 가요
  placed=[...board.querySelectorAll('.relief')].map(e=>e._rect).filter(Boolean);
  obstacles=pieceObstacles();labelVp=[];labelTime=Date.now();
}
// 방금 자리를 잡은 스탬프·말풍선의 화면 좌표(px) 상자 — 큰 메시지가 이걸 피해서 뜬다
export const recentLabelRects=()=>Date.now()-labelTime<600?labelVp:[];
export const area=(a,b)=>Math.max(0,Math.min(a.x1,b.x1)-Math.max(a.x0,b.x0))*Math.max(0,Math.min(a.y1,b.y1)-Math.max(a.y0,b.y0));
function measureBox(el,extraSel,inset){
  el.classList.add('measuring');el.style.left='50%';el.style.top='50%';board.appendChild(el);
  const br=board.getBoundingClientRect(),u=br.width/100,cx=br.left+br.width/2,cy=br.top+br.height/2;
  const r=el.getBoundingClientRect(),ins=(inset||0)*r.width;let x0=r.left+ins,y0=r.top+ins,x1=r.right-ins,y1=r.bottom-ins;
  if(extraSel) el.querySelectorAll(extraSel).forEach(c=>{const q=c.getBoundingClientRect();x0=Math.min(x0,q.left);y0=Math.min(y0,q.top);x1=Math.max(x1,q.right);y1=Math.max(y1,q.bottom);});
  el.classList.remove('measuring');
  return {x0:(x0-cx)/u,y0:(y0-cy)/u,x1:(x1-cx)/u,y1:(y1-cy)/u};
}
// cands: [{x,y,side}] = 상자 중심 후보. protect: 특히 가리면 안 되는 칸들
function chooseSpot(box,cands,protect,prefer){
  let best=null,bs=Infinity;
  for(const c of cands){
    // 판 밖으로 나가지 않게 밀어 넣기
    let x=c.x,y=c.y;
    x=Math.min(99-box.x1,Math.max(1-box.x0,x));y=Math.min(99-box.y1,Math.max(1-box.y0,y));
    const r={x0:x+box.x0,y0:y+box.y0,x1:x+box.x1,y1:y+box.y1};
    let sc=0;
    placed.forEach(p=>sc+=area(r,p)*30);
    obstacles.forEach(o=>sc+=area(r,o)*(protect.includes(o.node)?22:9));
    sc+=Math.hypot(x-c.x,y-c.y)*1.5;                    // 밀려난 만큼 감점
    if(prefer) sc+=Math.hypot(x-prefer.x,y-prefer.y)*.12;
    sc+=(c.pen||0);
    if(sc<bs){bs=sc;best={x,y,side:c.side,rect:r};}
  }
  placed.push(best.rect);
  const br=board.getBoundingClientRect(),u=br.width/100;
  labelVp.push({x0:br.left+best.rect.x0*u,y0:br.top+best.rect.y0*u,x1:br.left+best.rect.x1*u,y1:br.top+best.rect.y1*u});
  return best;
}

let stampSeq=0;
// 자리를 지금 계산해 두고(숨긴 채), 보여 줄 함수를 돌려줘요
export function stampAt(nodeIdx,d,team){
  const n=NODES[nodeIdx],el=document.createElement('div');
  const special=d>=4;
  el.className='stamp'+(special?' special':'');el.dataset.n=d;el.dataset.team=team;
  if(special){
    const id='orb'+(++stampSeq);
    const sparks=[[8,20],[90,14],[96,62],[6,70],[50,-4],[74,92]]
      .map(([x,y],i)=>'<i class="spark" style="left:'+x+'%;top:'+y+'%;animation-delay:'+(i*0.17)+'s"></i>').join('');
    el.innerHTML='<div class="st-rays"></div>'
      +'<svg class="st-orbit" viewBox="0 0 100 100" aria-hidden="true"><defs><path id="'+id+'" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>'
      +'<circle class="track" cx="50" cy="50" r="38"/><circle class="rim" cx="50" cy="50" r="44.4"/><circle class="rim" cx="50" cy="50" r="31.6"/>'
      +'<text dy="3.3"><textPath href="#'+id+'" textLength="236" lengthAdjust="spacing">한 번 더 ★ 한 번 더 ★ 한 번 더 ★ </textPath></text></svg>'
      +'<div class="st-core"><b>'+THROW_NAME[d]+'</b><small>'+d+'칸</small></div>'
      +'<div class="st-ribbon">'+REPLAY_SVG+'한 번 더 던지세요!</div>'+sparks;
    el.setAttribute('role','status');el.setAttribute('aria-label',THROW_NAME[d]+', '+d+'칸. 한 번 더 던지세요');
  }else{
    el.innerHTML='<b>'+THROW_NAME[d]+'</b><small>'+d+'칸</small>';
  }
  // 겹침 계산은 반짝이·햇살을 뺀 본체(+리본) 기준으로
  const box=measureBox(el,special?'.st-ribbon':null,special?.06:0);
  const hw=(box.x1-box.x0)/2,hh=(box.y1-box.y0)/2,R=Math.max(hw,hh)+PIECE_R-1;
  let tcx=50-n.x,tcy=50-n.y;const tl=Math.hypot(tcx,tcy)||1;tcx/=tl;tcy/=tl;
  const cands=[];
  for(let k=0;k<16;k++){
    const a=k/16*Math.PI*2,ux=Math.cos(a),uy=Math.sin(a);
    [R,R+5,R+11,R+18,R+26].forEach((rr,j)=>cands.push({x:n.x+ux*rr,y:n.y+uy*rr,pen:j*2.5-(ux*tcx+uy*tcy)*4}));
  }
  const spot=chooseSpot(box,cands,[nodeIdx],null);
  el.style.left=spot.x+'%';el.style.top=spot.y+'%';
  el.classList.add('wait');
  return ()=>{
    if(!el.isConnected) return;
    el.classList.remove('wait');void el.offsetWidth;
    setTimeout(()=>el.remove(),special?3500:2100);
    if(special&&!reduceMotion){
      const r=board.getBoundingClientRect();
      fountainAt(r.left+r.width*spot.x/100,r.top+r.height*spot.y/100,palette(team).concat(['#FFD86B','#FFE29A']),40);
    }
  };
}

const RELIEF=[
  '휴, 안 잡혔다!','어이구 다행이야','나이스! 살았다','십년감수했네','심장 떨어질 뻔!','휴~ 비켜갔다',
  '아슬아슬했다!','하마터면 잡힐 뻔','살았다 살았다!','오늘 운 좋네','그냥 지나가 주는 거야?','깜짝이야!',
  '고마워, 그냥 가줘서','휴우… 식은땀 났다'
];
const RELIEF_MANY=['업은 말 다 살았다!','다 같이 살았다!','휴, 식구들 무사해!'];
const RELIEF_FACE=['😮‍💨','😅','😌','🥲','😆','🙏'];
// e = {node, team, count}: 지나쳐 간 칸에 있던 상대 말. 자리를 지금 계산해 두고(숨긴 채), 보여 줄 함수를 돌려줘요
export function reliefAt(e,mover,moverNode){
  const n=NODES[e.node],el=document.createElement('div');
  el.className='relief wait';el.dataset.team=e.team;
  const line=e.count>1&&Math.random()<.6?pick(RELIEF_MANY):pick(RELIEF);
  el.innerHTML='<span class="rf-face">'+pick(RELIEF_FACE)+'</span><span class="rf-txt"><small>'+nameOf(e.team)+'</small>'+line+'</span>';
  const box=measureBox(el);
  const hw=(box.x1-box.x0)/2,hh=(box.y1-box.y0)/2,gapV=PIECE_R+2.2,gapH=PIECE_R+2.4;
  const top=n.y-(e.count-1)*1.9;                    // 업힌 말 맨 위
  const cands=[
    {x:n.x,y:top-gapV-hh,side:'above',pen:0},
    {x:n.x+hw*.55,y:top-gapV-hh,side:'above',pen:1.5},
    {x:n.x-hw*.55,y:top-gapV-hh,side:'above',pen:1.5},
    {x:n.x,y:n.y+gapV+hh,side:'below',pen:2},
    {x:n.x+hw*.55,y:n.y+gapV+hh,side:'below',pen:3},
    {x:n.x-hw*.55,y:n.y+gapV+hh,side:'below',pen:3},
    {x:n.x+gapH+hw,y:n.y,side:'right',pen:3},
    {x:n.x-gapH-hw,y:n.y,side:'left',pen:3},
    {x:n.x+gapH+hw,y:n.y-hh*.9,side:'right',pen:4},
    {x:n.x+gapH+hw,y:n.y+hh*.9,side:'right',pen:4},
    {x:n.x-gapH-hw,y:n.y-hh*.9,side:'left',pen:4},
    {x:n.x-gapH-hw,y:n.y+hh*.9,side:'left',pen:4},
    {x:n.x+hw*.9,y:top-gapV-hh,side:'above',pen:4},
    {x:n.x-hw*.9,y:top-gapV-hh,side:'above',pen:4},
    {x:n.x+hw*.9,y:n.y+gapV+hh,side:'below',pen:5},
    {x:n.x-hw*.9,y:n.y+gapV+hh,side:'below',pen:5},
    {x:n.x,y:top-gapV-hh-7,side:'above',pen:6},
    {x:n.x,y:n.y+gapV+hh+7,side:'below',pen:7},
    {x:n.x+gapH+hw,y:n.y-hh*2.1,side:'right',pen:6},
    {x:n.x+gapH+hw,y:n.y+hh*2.1,side:'right',pen:6},
    {x:n.x-gapH-hw,y:n.y-hh*2.1,side:'left',pen:6},
    {x:n.x-gapH-hw,y:n.y+hh*2.1,side:'left',pen:6},
    {x:n.x+gapH+hw+6,y:n.y,side:'right',pen:7},
    {x:n.x-gapH-hw-6,y:n.y,side:'left',pen:7}
  ];
  const spot=chooseSpot(box,cands,[e.node,moverNode],{x:n.x,y:n.y});el._rect=spot.rect;
  el.dataset.side=spot.side;
  el.style.left=spot.x+'%';el.style.top=spot.y+'%';
  // 꼬리가 말을 가리키도록
  if(spot.side==='above'||spot.side==='below') el.style.setProperty('--tx',Math.min(86,Math.max(14,(n.x-(spot.x-hw))/(2*hw)*100))+'%');
  else el.style.setProperty('--ty',Math.min(80,Math.max(20,(n.y-(spot.y-hh))/(2*hh)*100))+'%');
  return ()=>{
    if(!el.isConnected) return;
    el.classList.remove('wait');void el.offsetWidth;
    setTimeout(()=>el.remove(),3000);
    pieces.forEach(p=>{if(p.team===e.team&&state.locs[p.id]===e.node) playAnim(tokenOf(p.id),'flinch',0);});
  };
}
