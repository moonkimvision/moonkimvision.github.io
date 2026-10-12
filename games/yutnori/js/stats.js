// 기록판(팀별 잡음·잡힘·업기·빽도·살아남음)과 상, 응원 버튼(이모지가 판 위로 떠오름)
import {reduceMotion,$,rnd,pick} from './config.js';
import {state,nameOf,goalCount} from './state.js';
import {board} from './view.js';
import {sfx} from './sound.js';

/* ----- Stats & awards ----- */
export function awardsFor(){
  const teams=[...Array(state.teamCount).keys()];
  const best=(key,label,desc)=>{
    let top=-1,v=0;teams.forEach(t=>{if(state.stats[t][key]>v){v=state.stats[t][key];top=t;}});
    return top>=0?'<li data-team="'+top+'"><b>'+label+'</b>'+nameOf(top)+' '+desc.replace('{v}',v)+'</li>':'';
  };
  return best('caught','사냥꾼상','상대 말 {v}개 잡음')+best('stacks','단짝상','업기 {v}번')+best('lost','오뚝이상','{v}번 잡혀도 다시 출발')+best('backdo','뒷걸음 장인상','빽도 {v}번')+best('escapes','구사일생상','{v}번 아슬아슬하게 살아남음');
}
function renderStats(){
  let h='<tr><th>팀</th><th>골인</th><th>잡음</th><th>잡힘</th><th>업기</th><th>빽도</th><th>살아남음</th></tr>';
  for(let t=0;t<state.teamCount;t++){
    const s=state.stats[t];
    h+='<tr data-team="'+t+'"><td>'+nameOf(t)+'</td><td>'+goalCount(t)+'/4</td><td>'+s.caught+'</td><td>'+s.lost+'</td><td>'+s.stacks+'</td><td>'+s.backdo+'</td><td>'+(s.escapes||0)+'</td></tr>';
  }
  $('#statsTable').innerHTML=h;$('#liveAwards').innerHTML=awardsFor();
}
$('#statsBtn').addEventListener('click',()=>{renderStats();$('#statsModal').classList.add('show');});
$('#statsClose').addEventListener('click',()=>$('#statsModal').classList.remove('show'));
$('#statsModal').addEventListener('click',e=>{if(e.target.id==='statsModal')$('#statsModal').classList.remove('show');});

/* ----- Reactions (응원) ----- */
const REACT={clap:['👏','👏','🙌'],fire:['🔥','🔥','💥'],shock:['😱','😲','🫢'],laugh:['🤣','😂','😆']};
document.querySelectorAll('.react button').forEach(b=>b.addEventListener('click',()=>{
  const kind=b.dataset.r;sfx('r-'+kind);
  const r=board.getBoundingClientRect();
  const count=reduceMotion?3:9;
  for(let i=0;i<count;i++){
    const e=document.createElement('span');e.className='floaty';e.textContent=pick(REACT[kind]);
    e.style.left=(r.left+rnd(r.width*.1,r.width*.9))+'px';e.style.top=(r.bottom-rnd(10,60))+'px';
    e.style.setProperty('--dx',rnd(-60,60)+'px');e.style.setProperty('--dy',(-r.height*rnd(.5,.95))+'px');
    e.style.setProperty('--rot',rnd(-40,40)+'deg');e.style.setProperty('--dur',rnd(1.6,2.6)+'s');
    e.style.fontSize=rnd(26,46)+'px';e.style.animationDelay=(i*0.06)+'s';
    document.body.appendChild(e);setTimeout(()=>e.remove(),3200);
  }
}));
