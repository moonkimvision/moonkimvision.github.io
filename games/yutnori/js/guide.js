// 사용법 안내(TV·스마트뷰·빔·게임 진행): 처음 연 사람에게 한 번 자동으로 띄우고, 툴바·주소 #guide 로 다시 연다
import {STORE,$} from './config.js';

const dlg=$('#guide');
const tabs=[...dlg.querySelectorAll('[role="tab"]')];
const SEEN=STORE+'-guide';

export function openGuide(tabId){
  if(tabId) selectTab(tabId);
  if(dlg.open) return;
  if(dlg.showModal) dlg.showModal(); else dlg.setAttribute('open','');
  dlg.querySelector('.g-card').scrollTop=0;
}
function closeGuide(){
  if(dlg.close) dlg.close(); else dlg.removeAttribute('open');
}
dlg.addEventListener('close',()=>{
  try{localStorage.setItem(SEEN,'seen');}catch(e){}
  if(location.hash==='#guide') history.replaceState(null,'',location.pathname+location.search);
});
function selectTab(id){
  tabs.forEach(t=>{
    const on=t.id===id;
    t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;
    $('#'+t.getAttribute('aria-controls')).hidden=!on;
  });
}
tabs.forEach((t,i)=>{
  t.addEventListener('click',()=>selectTab(t.id));
  t.addEventListener('keydown',e=>{
    const d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d) return;
    const n=tabs[(i+d+tabs.length)%tabs.length];selectTab(n.id);n.focus();e.preventDefault();
  });
});
$('#guideBtn').addEventListener('click',()=>openGuide());
$('#guideX').addEventListener('click',closeGuide);
$('#guideGo').addEventListener('click',closeGuide);
dlg.addEventListener('click',e=>{if(e.target===dlg)closeGuide();});   // 바깥(어두운 곳) 누르면 닫기
window.addEventListener('hashchange',()=>{if(location.hash==='#guide')openGuide();});

// 아이폰은 아이폰 탭부터 보여 준다
const firstTab=/iPhone|iPad|iPod/.test(navigator.userAgent)?'gt-ip':'gt-sv';
selectTab(firstTab);
let seen=false;try{seen=localStorage.getItem(SEEN)==='seen';}catch(e){}
if(location.hash==='#guide'||!seen) setTimeout(()=>openGuide(),400);
