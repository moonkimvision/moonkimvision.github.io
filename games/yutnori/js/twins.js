// 쌍둥이 자리: 누나가 길게 떠들고(보케) → 동생이 느리게 한마디(태클). 판에서 큰일이 나면 반응하고, 누르면 말을 건다.
// 말투 규칙: 누나 = 반말 수다·허세, 스스로 말 끊기("아 잠깐"). 동생 = 짧고 느린 한마디, 말끝 "…". 훈계·비하 없음.
import {pick,$} from './config.js';

const LINES={
  hello:[['윷은 진짜 윷으로 던지고, 말은 여기서 옮기면 돼.','…응.'],['판 깔았어. 아 잠깐, 간식은?','…없어.']],
  poke:[['야.','…왜.'],['아 잠깐, 있잖아—','…응.'],['윷이면 내가 동네 1등이었거든? 아 잠깐, 그 동네에 나밖에 없었나.','…응.'],['이거 봐. 내 말이 제일 빨라.','…제일 뒤야.'],['오늘 손이 좀 뜨거운데?','…난로 앞이라.']],
  capture:[['잡았다! 봤지? 이게 실력이야.','…운이야.'],['집에 가세요~ 아 잠깐, 우리 편 아니지?','…아니야.'],['한 번 더! 진짜로, 한 번 더야.','…알아.']],
  caught:[['아 잠깐, 방금 잡힌 거 우리 편이야?','…응.']],
  stack:[['업었다! 어부바— 무거워 보이는데.','…같이 가.'],['둘이 가면 두 배로 빠른 거 알지? 아 잠깐, 그건 아닌가.','…아니야.']],
  nuk:[['넉동! 이번에 들어가면 끝이야, 진짜로.','…떨린다.']],
  backdo:[['빽도? 뒤로 가는 것도 작전이야. 아마.','…아마.'],['한 칸 뒤로. 인생도 그래. 아 잠깐, 멋있었다.','…아니.']],
  goal:[['들어왔다! 내가 그랬잖아, 들어온다고.','…말 안 했어.'],['골인! 박수 좀 쳐 줘. 아니 크게.','…짝.']],
  win:[['{A} 승리! 아 잠깐, 나 누구 편이었지?','…다 같이 했잖아.'],['{A} 이겼다! 사진 찍자. 내가 가운데.','…또.']],
  again:[['윷 아니면 모! 한 번 더 던져. 빨리.','…한 번 더.'],['한 번 더래! 이 손이야, 이 손.','…같은 손이야.']],
  phew:[['휴, 그냥 지나갔다. 심장 떨어질 뻔했네.','…안 떨어졌어.']]
};

const box=$('#twins'),sisB=$('#twSis'),broB=$('#twBro');
const sis=box&&box.querySelector('.tw-sister'),bro=box&&box.querySelector('.tw-brother');
let timers=[];
function hop(el){if(!el)return;el.classList.remove('hop');void el.offsetWidth;el.classList.add('hop');}
function later(fn,ms){timers.push(setTimeout(fn,ms));}
// kind: LINES 의 키. vars: {A:팀 이름} 같은 치환값. 둘이 한마디씩 주고받고 몇 초 뒤 사라진다.
export function twinsSay(kind,vars){
  if(!box||box.offsetParent===null) return;          // 숨겨진 배치(휴대폰 가로 등)에서는 조용히
  const pair=pick(LINES[kind]||LINES.poke).map(t=>t.replace(/\{(\w+)\}/g,(_,k)=>(vars&&vars[k])||''));
  timers.forEach(clearTimeout);timers=[];
  broB.classList.remove('show');
  sisB.textContent=pair[0];sisB.classList.add('show');hop(sis);
  const wait=Math.min(2200,700+pair[0].length*45);  // 누나가 다 말할 때까지 기다렸다가
  later(()=>{broB.textContent=pair[1];broB.classList.add('show');hop(bro);},wait);
  later(()=>sisB.classList.remove('show'),wait+2600);
  later(()=>broB.classList.remove('show'),wait+3000);
}
if(box){
  sis.addEventListener('click',()=>twinsSay('poke'));
  bro.addEventListener('click',()=>twinsSay('poke'));
}
