// 효과음(Web Audio로 직접 합성 — 음원 파일 없음)과 소리 켜기/끄기
import {STORE,$} from './config.js';

let soundOn=true,ac=null;
const rnd=(a,b)=>a+Math.random()*(b-a);
export function ctxA(){if(!ac){try{ac=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}if(ac&&ac.state==='suspended')ac.resume();return ac;}
function tone(freq,dur,type,vol,when,slideTo){
  const a=ctxA();if(!a)return;const t=a.currentTime+(when||0);
  const o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(freq,t);
  if(slideTo)o.frequency.exponentialRampToValueAtTime(slideTo,t+dur);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||.2,t+.01);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g).connect(a.destination);o.start(t);o.stop(t+dur+.05);
}
function noise(dur,vol,when){
  const a=ctxA();if(!a)return;const t=a.currentTime+(when||0);
  const b=a.createBuffer(1,a.sampleRate*dur,a.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
  const s=a.createBufferSource(),g=a.createGain(),f=a.createBiquadFilter();f.type='lowpass';f.frequency.value=1400;
  s.buffer=b;g.gain.value=vol||.3;s.connect(f).connect(g).connect(a.destination);s.start(t);
}
export function sfx(kind){
  if(!soundOn) return;
  if(kind==='capture'){noise(.35,.5);tone(160,.4,'square',.18,0,50);tone(90,.5,'sine',.35,.02,40);}
  else if(kind==='stack'){tone(440,.12,'triangle',.2);tone(660,.14,'triangle',.2,.09);tone(880,.2,'triangle',.18,.18);}
  else if(kind==='backdo'){tone(700,.45,'sawtooth',.08,0,180);tone(350,.3,'triangle',.12,.1,120);}
  else if(kind==='goal'){[523,659,784,1047].forEach((f,i)=>tone(f,.35,'triangle',.18,i*.09));tone(1568,.6,'sine',.1,.38);}
  else if(kind==='pop'){noise(.18,.18);tone(rnd(900,1400),.25,'sine',.06,0,rnd(300,500));}
  else if(kind==='yut'){tone(300,.08,'square',.06);tone(360,.08,'square',.06,.05);}
}

const soundBtn=$('#soundBtn');
export function setSound(on){soundOn=on;soundBtn.setAttribute('aria-pressed',on?'true':'false');soundBtn.textContent=on?'소리 켜짐':'소리 꺼짐';try{localStorage.setItem(STORE+'-sound',on?'1':'0');}catch(e){}}
soundBtn.addEventListener('click',()=>{setSound(!soundOn);if(soundOn)ctxA();});
