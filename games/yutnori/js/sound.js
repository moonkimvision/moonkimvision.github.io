// 효과음(Web Audio로 직접 합성 — 음원 파일 없음)과 소리 켜기/끄기
// 원인: 오디오 엔진을 첫 효과음 순간에 만들고 깨우느라(비동기) 소리가 늦게 났어요.
// 해결: 첫 터치 때 미리 깨워 두고, 효과음을 화면 작업보다 먼저 재생해요.
import {STORE,$,rnd} from './config.js';

let soundOn=true,ac=null,noiseBuf=null;
function initAudio(){
  if(!ac){
    try{ac=new (window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});}catch(e){return null;}
    noiseBuf=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);
    const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    const s=ac.createBufferSource();s.buffer=ac.createBuffer(1,1,ac.sampleRate);s.connect(ac.destination);s.start(0); // iOS unlock
  }
  if(ac.state!=='running') ac.resume();
  return ac;
}
['pointerdown','touchstart','keydown'].forEach(ev=>window.addEventListener(ev,()=>{if(soundOn)initAudio();},{capture:true,passive:true}));
function tone(freq,dur,type,vol,when,slideTo){
  const a=ac;if(!a)return;const t=a.currentTime+(when||0);
  const o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(freq,t);
  if(slideTo)o.frequency.exponentialRampToValueAtTime(slideTo,t+dur);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||.2,t+.005);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g).connect(a.destination);o.start(t);o.stop(t+dur+.05);
}
function noise(dur,vol,when,freq){
  const a=ac;if(!a||!noiseBuf)return;const t=a.currentTime+(when||0);
  const s=a.createBufferSource(),g=a.createGain(),f=a.createBiquadFilter();f.type='lowpass';f.frequency.value=freq||1400;
  s.buffer=noiseBuf;g.gain.setValueAtTime(vol||.3,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  s.connect(f).connect(g).connect(a.destination);s.start(t,Math.random()*.4);s.stop(t+dur+.02);
}
function play(kind){
  if(kind==='capture'){noise(.35,.55);tone(160,.4,'square',.18,0,50);tone(90,.5,'sine',.35,0,40);}
  else if(kind==='stack'){tone(440,.12,'triangle',.2);tone(660,.14,'triangle',.2,.08);tone(880,.2,'triangle',.18,.16);}
  else if(kind==='nuk'){[440,554,659,880].forEach((f,i)=>tone(f,.16,'triangle',.2,i*.07));tone(1320,.5,'sine',.12,.3);}
  else if(kind==='backdo'){tone(700,.45,'sawtooth',.08,0,180);tone(350,.3,'triangle',.12,.08,120);}
  else if(kind==='goal'){[523,659,784,1047].forEach((f,i)=>tone(f,.35,'triangle',.18,i*.08));tone(1568,.6,'sine',.1,.34);}
  else if(kind==='pop'){noise(.18,.18,0,3000);tone(rnd(900,1400),.25,'sine',.06,0,rnd(300,500));}
  else if(kind.startsWith('tap')){const n=+kind.slice(3);for(let i=0;i<n;i++){noise(.05,.3,i*.08,1800);tone(520+i*70,.07,'triangle',.12,i*.08);}if(n>=4)play('again');}
  else if(kind==='yut'){tone(300,.08,'square',.06);tone(360,.08,'square',.06,.05);}
  else if(kind==='again'){[659,784,988,1319].forEach((f,i)=>tone(f,.18,'square',.07,i*.06));}
  else if(kind==='r-clap'){for(let i=0;i<8;i++)noise(.06,.35,i*.09+rnd(0,.03),2500);}
  else if(kind==='r-fire'){noise(.7,.3,0,900);tone(120,.7,'sawtooth',.06,0,400);}
  else if(kind==='r-shock'){tone(900,.5,'triangle',.12,0,300);}
  else if(kind==='pick'){tone(520,.09,'triangle',.1,0,880);tone(1320,.05,'sine',.05,.06);}
  else if(kind==='boing'){tone(210,.22,'sine',.22,0,520);tone(620,.08,'triangle',.07,.07,420);noise(.06,.08,0,900);}
  else if(kind==='tick'){tone(1100,.035,'triangle',.04);}
  else if(kind==='phew'){noise(.55,.12,0,700);tone(620,.55,'sine',.09,.02,300);tone(930,.18,'triangle',.05,.5,1100);}
  else if(kind==='r-laugh'){[0,.12,.24,.36].forEach((w,i)=>tone(520-i*30,.1,'square',.07,w,420-i*30));}
}
export function sfx(kind){
  if(!soundOn) return;
  const a=initAudio();if(!a) return;
  if(a.state==='running') play(kind);
  else a.resume().then(()=>play(kind)).catch(()=>{});
}

const soundBtn=$('#soundBtn');
export function setSound(on){soundOn=on;soundBtn.setAttribute('aria-pressed',on?'true':'false');soundBtn.textContent=on?'소리 켜짐':'소리 꺼짐';try{localStorage.setItem(STORE+'-sound',on?'1':'0');}catch(e){}}
soundBtn.addEventListener('click',()=>{setSound(!soundOn);if(soundOn)initAudio();});
