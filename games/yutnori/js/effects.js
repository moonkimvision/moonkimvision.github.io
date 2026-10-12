// 연출: 큰 글자 스플래시, 칸 물결, 판 흔들기, 꽃가루·불꽃(캔버스), 토스트
import {TEAM_COLORS,reduceMotion,$} from './config.js';
import {NODES} from './board.js';
import {board,goalTray} from './view.js';
import {sfx} from './sound.js';

/* ----- Splash ----- */
const splashEl=$('#splash');let splashT=null;
export function splash(kind,team,title,sub){
  splashEl.classList.remove('show');void splashEl.offsetWidth;
  splashEl.dataset.kind=kind;splashEl.dataset.team=team;
  $('#spTitle').textContent=title;$('#spSub').textContent=sub;
  splashEl.classList.add('show');
  clearTimeout(splashT);splashT=setTimeout(()=>splashEl.classList.remove('show'),2000);
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

/* ----- Particles (confetti + fireworks) ----- */
const fx=$('#fx'),ctx=fx.getContext('2d');let parts=[],running=false,dpr=1;
export function sizeFx(){dpr=Math.min(window.devicePixelRatio||1,2);fx.width=innerWidth*dpr;fx.height=innerHeight*dpr;}
sizeFx();
const rnd=(a,b)=>a+Math.random()*(b-a);
function palette(team){return TEAM_COLORS[team].slice(0,2).concat(['#FFD86B','#FFF6DE','#F2B84B','#FFFFFF']);}
function cannon(x,y,angle,n,colors){
  for(let i=0;i<n;i++){
    const a=(angle+rnd(-22,22))*Math.PI/180,sp=rnd(11,24);
    parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,g:.32,drag:.985,life:rnd(110,170),age:0,
      w:rnd(7,13),h:rnd(4,8),rot:rnd(0,6.3),vr:rnd(-.3,.3),tilt:rnd(0,6.3),vt:rnd(.08,.25),
      c:colors[(Math.random()*colors.length)|0],type:Math.random()<.18?'ribbon':'rect'});
  }
}
function firework(x,y,colors){
  const c=colors[(Math.random()*colors.length)|0],n=70;
  for(let i=0;i<n;i++){
    const a=i/n*Math.PI*2+rnd(-.05,.05),sp=rnd(3.5,8.5);
    parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,g:.07,drag:.965,life:rnd(55,85),age:0,r:rnd(1.8,3.2),c,type:'spark',px:x,py:y});
  }
  parts.push({x,y,vx:0,vy:0,g:0,drag:1,life:14,age:0,r:60,c:'#FFF6DE',type:'bloom'});
}
function fountain(x,y,colors,n){
  for(let i=0;i<n;i++){
    const a=(-90+rnd(-35,35))*Math.PI/180,sp=rnd(6,13);
    parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,g:.25,drag:.99,life:rnd(60,100),age:0,r:rnd(1.6,3),c:colors[(Math.random()*colors.length)|0],type:'spark',px:x,py:y});
  }
}
function loop(){
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,innerWidth,innerHeight);
  parts=parts.filter(p=>p.age<p.life&&p.y<innerHeight+60);
  for(const p of parts){
    p.age++;p.px=p.x;p.py=p.y;p.vx*=p.drag;p.vy=p.vy*p.drag+p.g;p.x+=p.vx;p.y+=p.vy;
    const fade=Math.min(1,(p.life-p.age)/25);
    ctx.globalAlpha=Math.max(0,fade);
    if(p.type==='rect'||p.type==='ribbon'){
      p.rot+=p.vr;p.tilt+=p.vt;
      if(p.vy>2){p.vx+=Math.sin(p.age*.12)*.12;p.vy*=.96;}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.scale(1,Math.cos(p.tilt));
      ctx.fillStyle=p.c;
      if(p.type==='ribbon') ctx.fillRect(-p.w,-1.5,p.w*2,3); else ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
    }else if(p.type==='spark'){
      ctx.strokeStyle=p.c;ctx.lineWidth=p.r;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(p.px-p.vx*2,p.py-p.vy*2);ctx.lineTo(p.x,p.y);ctx.stroke();
      if(Math.random()<.3){ctx.fillStyle='#FFF';ctx.fillRect(p.x,p.y,1.5,1.5);}
    }else if(p.type==='bloom'){
      const k=p.age/p.life,g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*(0.5+k));
      g.addColorStop(0,'rgba(255,246,222,'+(0.9*(1-k))+')');g.addColorStop(1,'rgba(255,246,222,0)');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r*(0.5+k),0,7);ctx.fill();
    }
  }
  ctx.globalAlpha=1;
  if(parts.length) requestAnimationFrame(loop); else {running=false;ctx.clearRect(0,0,innerWidth,innerHeight);}
}
function kick(){if(!running){running=true;requestAnimationFrame(loop);}}
export function celebrate(team,big){
  if(reduceMotion) return;
  const col=palette(team),W=innerWidth,H=innerHeight;
  const waves=big?4:2;
  for(let w=0;w<waves;w++){
    setTimeout(()=>{
      cannon(0,H*0.95,-58,big?110:80,col);
      cannon(W,H*0.95,-122,big?110:80,col);
      kick();
    },w*520);
  }
  const fwCount=big?9:4;
  for(let i=0;i<fwCount;i++){
    setTimeout(()=>{firework(rnd(W*.15,W*.85),rnd(H*.12,H*.45),col);if(i%2===0)sfx('pop');kick();},180+i*(big?260:230));
  }
  const gr=goalTray.getBoundingClientRect();
  if(gr.width){setTimeout(()=>{fountain(gr.left+gr.width/2,gr.top+20,col,big?90:60);kick();},120);}
  if(big){
    setTimeout(()=>{for(let i=0;i<160;i++){parts.push({x:rnd(0,W),y:rnd(-200,-10),vx:rnd(-1,1),vy:rnd(1,4),g:.05,drag:.995,life:rnd(200,300),age:0,w:rnd(7,12),h:rnd(4,7),rot:rnd(0,6.3),vr:rnd(-.2,.2),tilt:rnd(0,6.3),vt:rnd(.08,.2),c:col[(Math.random()*col.length)|0],type:'rect'});}kick();},900);
  }
}

/* ----- Toast ----- */
let toastT=null;
export function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2200);}
