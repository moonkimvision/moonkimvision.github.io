// 윷 던지기: 막대 네 개 애니메이션, 결과(도·개·걸·윷·모·빽도), 한 번 더 버튼, 최근 기록
import {reduceMotion,$} from './config.js';
import {sfx} from './sound.js';
import {splash} from './effects.js';
import {fountainAt} from './fx.js';
import {twinsSay} from './twins.js';

const sticksEl=$('#sticks');
const sticks=[0,1,2,3].map(i=>{
  const s=document.createElement('div');s.className='stick flat';
  s.innerHTML=i===0?'<span>✕</span><span class="bk">빽</span><span>✕</span>':'<span>✕</span><span>✕</span><span>✕</span>';
  sticksEl.appendChild(s);return s;
});
const RESULTS={'도':'1칸 앞으로','개':'2칸 앞으로','걸':'3칸 앞으로','윷':'4칸 앞으로, 한 번 더 던지기','모':'5칸 앞으로, 한 번 더 던지기','빽도':'1칸 뒤로'};
let tossing=false,log=[];const throwBtn=$('#throwBtn');
export function setAgain(on){throwBtn.classList.toggle('again',on);throwBtn.textContent=on?'한 번 더 던지기!':'윷 던지기';}
throwBtn.addEventListener('click',()=>{
  if(tossing)return;tossing=true;throwBtn.disabled=true;setAgain(false);sfx('yut');
  const flat=[0,1,2,3].map(()=>Math.random()<0.55);
  sticks.forEach((s,i)=>{s.classList.remove('toss');void s.offsetWidth;
    s.style.setProperty('--r',(Math.random()*720-360).toFixed(0));s.style.setProperty('--r2',(Math.random()*16-8).toFixed(0));
    s.style.setProperty('--d',(i*0.05)+'s');s.classList.add('toss');});
  setTimeout(()=>sticks.forEach((s,i)=>{s.classList.toggle('flat',flat[i]);s.classList.toggle('round',!flat[i]);}),reduceMotion?0:380);
  setTimeout(()=>{
    const n=flat.filter(Boolean).length;
    const name=n===0?'모':(n===1&&flat[0])?'빽도':['','도','개','걸','윷'][n];
    const r=$('#result');r.classList.remove('pop');void r.offsetWidth;r.classList.add('pop');
    r.querySelector('.big').textContent=name;r.querySelector('.sub').textContent=RESULTS[name];
    log.unshift(name);log=log.slice(0,10);renderLog();
    if(name==='윷'||name==='모'){
      setAgain(true);sfx('again');twinsSay('again');splash('yut',null,name+'!',name==='모'?'다섯 칸! 한 번 더 던져요':'네 칸! 한 번 더 던져요');
      if(name==='모'&&!reduceMotion){const rr=sticksEl.getBoundingClientRect();fountainAt(rr.left+rr.width/2,rr.top+rr.height/2,['#FFD86B','#FFF6DE','#F2B84B','#E0A21A'],60);}
    }
    else if(name==='빽도'){sfx('backdo');splash('backdo',null,'빽도!','한 칸 뒤로 가야 해요');twinsSay('backdo');}
    tossing=false;throwBtn.disabled=false;
  },reduceMotion?50:820);
});
function renderLog(){$('#log').innerHTML=log.map(n=>'<span class="chip'+(n==='윷'||n==='모'?' again':'')+'">'+n+'</span>').join('');}
$('#clearLog').addEventListener('click',()=>{log=[];renderLog();});
