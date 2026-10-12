// 윷판 칸 좌표(%)와 진행 방향 — DOM 없이 계산만 한다
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
