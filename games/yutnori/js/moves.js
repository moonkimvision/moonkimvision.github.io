// 말 옮기기 규칙(잡기·업기·넉동·빽도·골인)과 그에 맞는 연출·기록, 승리·새 게임
import {TEAM_COLORS,PER_TEAM,$,pick} from './config.js';
import {isBackdo,movePath,THROW_NAME} from './board.js';
import {pieces,state,resetState,active,nameOf,goalCount,pushHistory,save} from './state.js';
import {render,captureRects,checkWin,goalRowEls,tokenOf,playAnim} from './view.js';
import {splash,ringAt,shakeBoard,toast} from './effects.js';
import {celebrate,landPuff,miniBurst} from './fx.js';
import {labelsReset,stampAt,reliefAt} from './labels.js';
import {awardsFor} from './stats.js';
import {setAgain} from './yut.js';
import {twinsSay} from './twins.js';
import {sfx} from './sound.js';

/* Korean particle helper */
function josa(word,withB,withoutB){
  const c=(word||'').trim().slice(-1).charCodeAt(0);
  if(c>=0xAC00&&c<=0xD7A3) return word+(((c-0xAC00)%28)?withB:withoutB);
  return word+withoutB;
}
const fill=(t,v)=>t.replace(/\{(\w+)\}/g,(_,k)=>v[k]);
const LINES={
  capture:['{Aga} {B} 말 {n}개를 잡았어요. 한 번 더!','{B}, 집으로 돌아가세요! {A} 한 번 더','이걸 잡네! {A} 한 번 더 던지기'],
  revenge:['당한 만큼 갚았다! {Aga} {B}에게 설욕했어요','{A}의 복수극! {B} 말 {n}개 귀가','원수는 판 위에서 만난다! {A} 한 번 더'],
  sweep:['{B} 말 {n}개가 한꺼번에 집으로! {A} 한 번 더','한 방에 {n}개! {A} 한 번 더'],
  streak:['{A} 사냥 본능 폭발! 한 번 더','{A} 오늘 손이 뜨겁다! 한 번 더'],
  stack:['{A} 말 {k}개가 함께 달려요','{A} 말 {k}개 어부바!','같이 가면 멀리 간다! {A} {k}동'],
  nuk:['{A} 말 네 개가 한 몸! 이번에 들어가면 끝','역전의 넉동! {A} 한 방을 노려요'],
  backdo:['{A} 말이 한 칸 뒤로 물러났어요','뒤로 가는 것도 작전! {A}','{A} 한 걸음 후퇴!'],
  goal:['{A} 말 {n}개 골인! ({c}/4)','{A} 무사히 도착! ({c}/4)','{A} 집에 들어왔어요 ({c}/4)']
};

export function moveGroup(group,target,first){
  const team=group[0].team, from=state.locs[group[0].id];
  if(from===target){render(first);return;}
  pushHistory();
  const slow=new Set();
  const back=isBackdo(from,target);
  const path=back?null:movePath(from,target);
  const dist=path?path.length:0;
  // 지나쳐 간 칸에 있던 상대 말 (잡히지 않고 살아남음)
  const passed=[];
  if(path){
    path.slice(0,-1).forEach(nd=>{
      const byTeam={};
      pieces.forEach(p=>{if(p.team!==team&&active(p.team)&&state.locs[p.id]===nd)(byTeam[p.team]=byTeam[p.team]||[]).push(p);});
      Object.keys(byTeam).forEach(t=>passed.push({node:nd,team:+t,count:byTeam[t].length}));
    });
  }
  const via=back?'빽도로 ':dist?THROW_NAME[dist]+(dist===4?'으로 ':'로 '):'';
  let victims=[],mates=0;
  if(typeof target==='number'){
    victims=pieces.filter(p=>p.team!==team&&active(p.team)&&state.locs[p.id]===target);
    mates=pieces.filter(p=>p.team===team&&state.locs[p.id]===target).length;
  }
  const total=mates+group.length;
  const ev=victims.length?'capture':target==='goal'?'goal':mates?(total===PER_TEAM?'nuk':'stack'):back?'backdo':null;
  // sound first, before any DOM work, so it lines up with the visual
  if(ev) sfx(ev); else if(dist) sfx('tap'+dist);

  victims.forEach(v=>{state.locs[v.id]='wait';slow.add(v.id);});
  group.forEach(p=>state.locs[p.id]=target);
  const st=state.stats[team];
  if(back) st.backdo++;
  let title='',sub='',vars={A:nameOf(team),Aga:josa(nameOf(team),'이','가'),n:group.length,k:total};
  if(ev==='capture'){
    const vTeams=[...new Set(victims.map(v=>v.team))];
    const revenge=vTeams.includes(state.lastCaughtBy[team]);
    const streak=state.lastCapturer===team;
    st.caught+=victims.length; victims.forEach(v=>state.stats[v.team].lost++);
    vTeams.forEach(vt=>state.lastCaughtBy[vt]=team);
    if(revenge) state.lastCaughtBy[team]=-1;
    state.lastCapturer=team;
    vars.B=vTeams.map(nameOf).join(', ');vars.n=victims.length;
    if(revenge){title='복수 성공!';sub=fill(pick(LINES.revenge),vars);}
    else if(victims.length>=2){title='싹쓸이!';sub=fill(pick(LINES.sweep),vars);}
    else if(streak){title=via+'또 잡았다!';sub=fill(pick(LINES.streak),vars);}
    else{title=via+'잡았다!';sub=fill(pick(LINES.capture),vars);}
  }else if(ev==='goal'){
    st.goals+=group.length;
    vars.c=goalCount(team);
    title='골인!';sub=fill(pick(LINES.goal),vars);
  }else if(ev==='stack'||ev==='nuk'){
    st.stacks++;
    title=ev==='nuk'?(via?via+'넉동!':'넉동 업었다!'):via+'업었다!';
    sub=fill(pick(LINES[ev]),vars);
  }else if(ev==='backdo'){
    title='빽도!';sub=fill(pick(LINES.backdo),vars);
  }

  render(first,slow);
  // 쫀득 착지: 옮긴 말은 말랑하게 찌그러지고, 원래 있던 같은 편 말은 폴짝, 잡힌 말은 빙글빙글 집으로
  const movedIds=new Set(group.map(p=>p.id));
  group.forEach((p,i)=>playAnim(tokenOf(p.id),'land',.2+i*.05));
  if(typeof target==='number'){
    pieces.forEach(p=>{if(p.team===team&&state.locs[p.id]===target&&!movedIds.has(p.id))playAnim(tokenOf(p.id),'hop',.12);});
    landPuff(target,team);
  }
  victims.forEach((v,i)=>{playAnim(tokenOf(v.id),'spin-home',i*.04);setTimeout(()=>playAnim(tokenOf(v.id),'land',0),780+i*40);});
  if(!ev&&!dist) sfx('boing');

  // 스탬프·말풍선 자리를 한꺼번에 미리 계산 (서로, 그리고 말과 겹치지 않게)
  labelsReset();
  const showStamp=dist?stampAt(target,dist,team):null;
  if(dist>=4) setAgain(true);
  let bubbles=[];
  if(passed.length){
    passed.forEach(e=>{state.stats[e.team].escapes=(state.stats[e.team].escapes||0)+e.count;});
    save();
    bubbles=passed.slice(0,4).map(e=>reliefAt(e,team,target));
  }
  let conflict=false;   // 큰 메시지를 비켜도 겹치면, 큰 메시지를 짧게 먼저 보여 주고 나서 띄워요

  if(ev==='capture'){
    conflict=splash('capture',team,title,sub);
    ringAt(target,TEAM_COLORS[team][0]);
    shakeBoard();
  }else if(ev==='goal'){
    const row=goalRowEls[team];row.classList.remove('glow');void row.offsetWidth;row.classList.add('glow');
    const w=checkWin();
    if(w>=0){
      conflict=splash('goal',team,'골인!',josa(nameOf(team),'이','가')+' 말 네 개를 모두 들여보냈어요');
      celebrate(team,true);setTimeout(()=>showWin(w),1500);
    }else{conflict=splash('goal',team,title,sub);celebrate(team,false);}
  }else if(ev==='stack'||ev==='nuk'){
    conflict=splash('stack',team,title,sub);ringAt(target,'#FFF6DE');
    if(ev==='nuk'){ringAt(target,TEAM_COLORS[team][0]);miniBurst(target,team);}
  }else if(ev==='backdo'){
    conflict=splash('backdo',team,title,sub);ringAt(target,'#CDB8FF');
  }else if(target===0&&typeof from==='number'){
    toast('참먹이 도착! 이제 골인만 남았어요');
  }
  // 쌍둥이 한마디 (큰 메시지가 먼저 뜬 뒤에)
  const twin=ev==='goal'&&goalCount(team)===PER_TEAM?'win':ev||(dist>=4?'again':passed.length?'phew':null);
  if(twin) setTimeout(()=>twinsSay(twin,{A:nameOf(team)}),ev?500:250);
  if(showStamp) setTimeout(showStamp,conflict?1050:0);
  if(bubbles.length) setTimeout(()=>{sfx('phew');bubbles.forEach((show,i)=>setTimeout(show,i*220));},conflict?1200:(ev?650:380));
}

/* ----- Win ----- */
function showWin(t){
  $('#winCard').dataset.team=t;$('#winTitle').textContent=nameOf(t)+' 승리!';$('#awards').innerHTML=awardsFor();$('#win').classList.add('show');
  celebrate(t,true);sfx('goal');
}
$('#winClose').addEventListener('click',()=>$('#win').classList.remove('show'));
$('#winNew').addEventListener('click',()=>{$('#win').classList.remove('show');newGame();});

export function newGame(){
  const f=captureRects();resetState();
  setAgain(false);render(f);toast('새 게임을 시작했어요');
}
