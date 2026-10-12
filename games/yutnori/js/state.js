// 게임 상태(말 위치·팀 수·이름·기록), 저장/불러오기, 되돌리기 기록
import {STORE,MAX_TEAMS,PER_TEAM,DEFAULT_NAMES,DEFAULT_TEAMS} from './config.js';

export const pieces=[];
for(let t=0;t<MAX_TEAMS;t++) for(let k=0;k<PER_TEAM;k++) pieces.push({id:t+'-'+k,team:t,idx:k});
const blankStats=()=>[0,1,2,3].map(()=>({caught:0,lost:0,stacks:0,backdo:0,goals:0,escapes:0}));

// state 는 이 모듈 안에서만 다시 대입한다(resetState·load). 다른 모듈은 속성만 바꾼다.
export let state=freshState();
export const history=[];
export const announced=[false,false,false,false];

function freshState(names,count){
  const locs={}; pieces.forEach(p=>locs[p.id]='wait');
  return {teamCount:count||DEFAULT_TEAMS,names:names||DEFAULT_NAMES.slice(),locs,stats:blankStats(),lastCaughtBy:[-1,-1,-1,-1],lastCapturer:-1};
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
      // 예전 기본 이름 '셋째 팀'은 새 기본 이름(김가네)으로 바꿔 준다
      const names=DEFAULT_NAMES.map((d,i)=>(s.names[i]&&!(i===2&&s.names[i]==='셋째 팀'))?s.names[i]:d);
      state={teamCount:s.teamCount||DEFAULT_TEAMS,names,locs:Object.assign(f.locs,s.locs),stats:(s.stats&&s.stats.length===4)?s.stats:f.stats,lastCaughtBy:s.lastCaughtBy||f.lastCaughtBy,lastCapturer:s.lastCapturer??-1};
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

export function pushHistory(){history.push(JSON.stringify({locs:state.locs,teamCount:state.teamCount,stats:state.stats,lastCaughtBy:state.lastCaughtBy,lastCapturer:state.lastCapturer}));if(history.length>80)history.shift();}
export function popHistory(){
  const h=JSON.parse(history.pop());
  state.locs=h.locs;state.teamCount=h.teamCount;
  if(h.stats){state.stats=h.stats;state.lastCaughtBy=h.lastCaughtBy;state.lastCapturer=h.lastCapturer;}
}
