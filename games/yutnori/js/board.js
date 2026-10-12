// 윷판 칸 좌표(%)와 진행 방향, 이동 경로 추정 — DOM 없이 계산만 한다
const P=v=>8+v*0.84;
const raw=[];
for(let k=0;k<5;k++) raw.push([100,100-20*k]);   // 0~4  right side, bottom→top (0 = 출발)
for(let k=0;k<5;k++) raw.push([100-20*k,0]);     // 5~9  top, right→left
for(let k=0;k<5;k++) raw.push([0,20*k]);         // 10~14 left, top→bottom
for(let k=0;k<5;k++) raw.push([20*k,100]);       // 15~19 bottom, left→right
const t1=100/6,t2=100/3;
raw.push([100-t1,t1],[100-t2,t2],[t1,t1],[t2,t2],[t1,100-t1],[t2,100-t2],[100-t1,100-t1],[100-t2,100-t2],[50,50]);
export const NODES=raw.map(([x,y],i)=>({i,x:P(x),y:P(y),big:(x%100===0&&y%100===0)||(x===50&&y===50)}));

// forward (진행 방향) edges: used to detect 빽도
const NEXT={};
const addEdge=(a,b)=>{(NEXT[a]=NEXT[a]||[]).push(b);};
for(let i=0;i<19;i++) addEdge(i,i+1);
addEdge(19,0);
[[5,20],[20,21],[21,28],[28,25],[25,24],[24,15],[10,22],[22,23],[23,28],[28,27],[27,26],[26,0]].forEach(([a,b])=>addEdge(a,b));
export const isBackdo=(from,to)=>typeof from==='number'&&typeof to==='number'&&(NEXT[to]||[]).includes(from);

// 이동 거리 추정: 모서리/가운데에 '멈춰 있던' 말은 지름길, 지나가는 말은 가던 길 (전통 규칙)
export const THROW_NAME=['','도','개','걸','윷','모'];
const OUT={};for(let i=0;i<19;i++)OUT[i]=i+1;OUT[19]=0;
Object.assign(OUT,{20:21,21:28,22:23,23:28,25:24,24:15,27:26,26:0,28:27});
function stepFrom(cur,prev,first){
  if(first){if(cur===5)return 20;if(cur===10)return 22;if(cur===28)return 27;}
  else if(cur===28) return prev===21?25:27;
  return OUT[cur];
}
// 이동 경로(지나간 칸 + 도착 칸)를 추정. 1~5칸 안에 닿지 않으면 null
export function movePath(from,to){
  if(typeof to!=='number') return null;
  if(from!=='wait'&&(typeof from!=='number'||from===0)) return null;
  let cur=from==='wait'?0:from,prev=null;const path=[];
  for(let k=1;k<=5;k++){
    if(k>1&&cur===0) break;
    const nx=(from==='wait'&&k===1)?1:stepFrom(cur,prev,k===1);
    prev=cur;cur=nx;path.push(cur);
    if(cur===to) return path;
  }
  // 집마다 규칙이 달라 다른 갈림길로 간 경우를 위한 보조 계산
  let frontier=[[from==='wait'?-1:from,[]]];
  for(let k=1;k<=5;k++){
    const nxt=[];
    for(const [c,p] of frontier){
      for(const n of (c===-1?[1]:(c===0&&k>1?[]:NEXT[c]||[]))){
        const np=p.concat(n);
        if(n===to) return np;
        nxt.push([n,np]);
      }
    }
    frontier=nxt;
  }
  return null;
}
