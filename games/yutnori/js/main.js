// 진입점: 각 모듈을 불러오면 화면·이벤트가 붙고, 여기서 저장된 판을 불러와 첫 화면을 그린다
import {STORE,MAX_TEAMS,PER_TEAM} from './config.js';
import {load,announced,goalCount} from './state.js';
import {render} from './view.js';
import {sizeFx} from './fx.js';
import {setSound} from './sound.js';
import {setMode} from './toolbar.js';
import './drag.js';
import './yut.js';
import './stats.js';
import './guide.js';
import {twinsSay} from './twins.js';

load();
try{setMode(localStorage.getItem(STORE+'-view')!=='yut');}catch(e){setMode(true);}
try{setSound(localStorage.getItem(STORE+'-sound')!=='0');}catch(e){setSound(true);}
for(let t=0;t<MAX_TEAMS;t++) announced[t]=goalCount(t)===PER_TEAM;
render();
window.addEventListener('resize',()=>{sizeFx();render();});
setTimeout(()=>twinsSay('hello'),700);
