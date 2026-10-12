// 말 옮기기 규칙(잡기·업기·빽도·골인)과 그에 맞는 연출, 승리·새 게임
import {TEAM_COLORS,PER_TEAM,$} from './config.js';
import {isBackdo} from './board.js';
import {pieces,state,resetState,active,nameOf,goalCount,pushHistory} from './state.js';
import {render,captureRects,checkWin,goalRowEls} from './view.js';
import {splash,ringAt,shakeBoard,celebrate,toast} from './effects.js';
import {sfx} from './sound.js';

export function moveGroup(group,target,first){
  const team=group[0].team, from=state.locs[group[0].id];
  if(from===target){render(first);return;}
  pushHistory();
  const slow=new Set();
  const back=isBackdo(from,target);
  let victims=[],mates=0;
  if(typeof target==='number'){
    victims=pieces.filter(p=>p.team!==team&&active(p.team)&&state.locs[p.id]===target);
    mates=pieces.filter(p=>p.team===team&&state.locs[p.id]===target).length;
    victims.forEach(v=>{state.locs[v.id]='wait';slow.add(v.id);});
  }
  group.forEach(p=>state.locs[p.id]=target);
  render(first,slow);

  const nm=nameOf(team);
  if(victims.length){
    const vTeams=[...new Set(victims.map(v=>v.team))].map(nameOf).join(', ');
    splash('capture',team,back?'빽도로 잡았다!':'잡았다!',nm+'가 '+vTeams+' 말 '+victims.length+'개를 잡았어요. 한 번 더!');
    ringAt(target,TEAM_COLORS[team][0]);
    shakeBoard();
    sfx('capture');
  }else if(target==='goal'){
    const c=goalCount(team);
    const row=goalRowEls[team];row.classList.remove('glow');void row.offsetWidth;row.classList.add('glow');
    const w=checkWin();
    if(w>=0){
      splash('goal',team,'골인!',nm+' 말 네 개가 모두 들어왔어요');
      sfx('goal');celebrate(team,true);
      setTimeout(()=>showWin(w),1500);
    }else{
      splash('goal',team,'골인!',nm+' 말 '+group.length+'개 골인 ('+c+'/'+PER_TEAM+')');
      sfx('goal');celebrate(team,false);
    }
  }else if(mates){
    splash('stack',team,back?'빽도로 업었다!':'업었다!',nm+' 말 '+(mates+group.length)+'개가 함께 달려요');
    ringAt(target,'#FFF6DE');sfx('stack');
  }else if(back){
    splash('backdo',team,'빽도!',nm+' 말이 한 칸 뒤로 물러났어요');
    ringAt(target,'#CDB8FF');sfx('backdo');
  }
}

function showWin(t){
  $('#winCard').dataset.team=t;$('#winTitle').textContent=nameOf(t)+' 승리!';$('#win').classList.add('show');
  celebrate(t,true);sfx('goal');
}
$('#winClose').addEventListener('click',()=>$('#win').classList.remove('show'));
$('#winNew').addEventListener('click',()=>{$('#win').classList.remove('show');newGame();});

export function newGame(){
  const f=captureRects();resetState();
  render(f);toast('새 게임을 시작했어요');
}
