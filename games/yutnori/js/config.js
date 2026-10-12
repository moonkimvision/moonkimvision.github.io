// 게임 전역 상수
export const STORE='yut-daehang-v2';
export const MAX_TEAMS=4, PER_TEAM=4;
export const DEFAULT_NAMES=['문가네','남가네','셋째 팀','넷째 팀'];
export const TEAM_COLORS=[
  ['#9DB5F0','#34549F','#172A5E'],['#F6A898','#B8382D','#661711'],
  ['#A6E6BE','#2E8A55','#12472A'],['#FFF1A6','#E0A21A','#865505']
];
export const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
export const $=s=>document.querySelector(s);
