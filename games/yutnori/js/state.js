// 게임 상태(말 위치·팀 수·이름), 저장/불러오기, 되돌리기 기록
import {STORE,MAX_TEAMS,PER_TEAM,DEFAULT_NAMES} from './config.js';

export const pieces=[];
for(let t=0;t<MAX_TEAMS;t++) for(let k=0;k<PER_TEAM;k++) pieces.push({id:t+'-'+k,team:t,idx:k});

// state 는 이 모듈 안에서만 다시 대입한다(resetState·load). 다른 모듈은 속성만 바꾼다.
export let state=freshState();
export const history=[];
export const announced=[false,false,false,false];

function freshState(names,count){
  const locs={}; pieces.forEach(p=>locs[p.id]='wait');
  return {teamCount:count||2,names:names||DEFAULT_NAMES.slice(),locs};
}
export function resetState(){
  state=freshState(state.names,state.teamCount);
  history.length=0;
  announced.fill(false);
}
export function load(){
  try{
    const s=JSON.parse(localStorage.getItem(STORE)||'null');
    if(s&&s.names&&s.locs){
      const f=freshState();
      state={teamCount:s.teamCount||2,names:DEFAULT_NAMES.map((d,i)=>s.names[i]||d),locs:Object.assign(f.locs,s.locs)};
      return;
    }
    const old=JSON.parse(localStorage.getItem('yut-daehang-v1')||'null');
    if(old&&old.names){ state.names[0]=old.names[0]||state.names[0]; state.names[1]=old.names[1]||state.names[1]; }
  }catch(e){}
}
export function save(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch(e){}}
export const active=t=>t<state.teamCount;
export const nameOf=t=>state.names[t];
export const goalCount=t=>pieces.filter(p=>p.team===t&&state.locs[p.id]==='goal').length;

export function pushHistory(){history.push(JSON.stringify({locs:state.locs,teamCount:state.teamCount}));if(history.length>80)history.shift();}
