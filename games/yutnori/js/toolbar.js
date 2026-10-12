// 상단 툴바: 전체화면, 윷 던지기 화면, 되돌리기, 새 게임, 팀 수 선택, 화면 꺼짐 방지 (소리는 sound.js, 사용법은 guide.js)
import {STORE,$} from './config.js';
import {pieces,state,history,pushHistory,popHistory} from './state.js';
import {render,captureRects,flip} from './view.js';
import {toast} from './effects.js';
import {newGame} from './moves.js';

/* ----- Fullscreen ----- */
const fsBtn=$('#fsBtn');
const root=document.documentElement;
const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement;
const canFs=!!(root.requestFullscreen||root.webkitRequestFullscreen);
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
function syncFs(){
  const on=!!fsEl();
  fsBtn.setAttribute('aria-pressed',on?'true':'false');
  fsBtn.textContent=on?'전체화면 끄기':'전체화면';
  document.body.classList.toggle('is-fs',on);
}
if(standalone) fsBtn.hidden=true;
fsBtn.addEventListener('click',async()=>{
  try{
    if(fsEl()){ await (document.exitFullscreen||document.webkitExitFullscreen).call(document); return; }
    if(!canFs) throw new Error('unsupported');
    await (root.requestFullscreen||root.webkitRequestFullscreen).call(root,{navigationUI:'hide'});
  }catch(e){
    const ios=/iPhone|iPod/.test(navigator.userAgent);
    toast(ios?'아이폰은 공유 버튼에서 홈 화면에 추가한 뒤 그 아이콘으로 열면 전체화면이 돼요':'이 화면에서는 전체화면을 쓸 수 없어요. 파일을 브라우저로 직접 열어 주세요');
  }
});
document.addEventListener('fullscreenchange',()=>{syncFs();render();});
document.addEventListener('webkitfullscreenchange',()=>{syncFs();render();});
document.addEventListener('keydown',e=>{
  if((e.key==='f'||e.key==='F')&&!e.target.closest('input')&&!e.ctrlKey&&!e.metaKey) fsBtn.click();
});

/* ----- Board-only mode ----- */
const modeBtn=$('#modeBtn');
// 기본은 판만 보기(윷 패널 숨김) — 실제 윷을 던지고 화면은 판으로 쓰는 경우가 많아서. 버튼으로 바꾼 것만 기억한다.
export function setMode(on,remember){
  document.body.classList.toggle('board-only',on);modeBtn.setAttribute('aria-pressed',on?'false':'true');
  if(remember){try{localStorage.setItem(STORE+'-view',on?'board':'yut');}catch(e){}}
}
modeBtn.addEventListener('click',()=>{const f=captureRects();setMode(!document.body.classList.contains('board-only'),true);flip(f);});

/* ----- Undo · team count · reset ----- */
$('#undoBtn').addEventListener('click',()=>{
  if(!history.length)return;const f=captureRects();popHistory();render(f);toast('한 수 되돌렸어요');
});
document.querySelectorAll('#teamSeg button').forEach(b=>b.addEventListener('click',()=>{
  const n=+b.dataset.n;if(n===state.teamCount)return;
  pushHistory();const f=captureRects();
  pieces.forEach(p=>{if(p.team>=n)state.locs[p.id]='wait';});
  state.teamCount=n;render(f);toast(n+'팀으로 바꿨어요');
}));
const resetBtn=$('#resetBtn');let resetArm=null;
resetBtn.addEventListener('click',()=>{
  if(!resetArm){resetBtn.textContent='한 번 더 누르면 초기화';resetArm=setTimeout(()=>{resetArm=null;resetBtn.textContent='새 게임';},3000);return;}
  clearTimeout(resetArm);resetArm=null;resetBtn.textContent='새 게임';newGame();
});

/* ----- 화면 꺼짐 방지: TV에 미러링하는 동안 휴대폰 화면이 꺼지지 않게 (Screen Wake Lock 지원 브라우저) ----- */
let wakeLock=null;
async function keepAwake(){
  if(!('wakeLock' in navigator)||wakeLock||document.visibilityState!=='visible') return;
  try{wakeLock=await navigator.wakeLock.request('screen');wakeLock.addEventListener('release',()=>{wakeLock=null;});}catch(e){}
}
window.addEventListener('pointerdown',keepAwake,{passive:true});
document.addEventListener('visibilitychange',keepAwake);
