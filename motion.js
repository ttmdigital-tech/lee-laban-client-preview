// Keep rendered content stable. Motion is limited to direct interactions.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover: hover) and (pointer: fine)');
const desktop=matchMedia('(min-width:761px)');
let frame=0;
const links=[...document.querySelectorAll('.header nav>a[href^="#"]')];
const sections=links.map(link=>({link,section:document.getElementById(link.hash.slice(1))})).filter(item=>item.section);
function syncScroll(){
 frame=0;
 if(desktop.matches){
  const max=document.documentElement.scrollHeight-innerHeight;
  document.documentElement.style.setProperty('--page-progress',max>0?Math.min(1,Math.max(0,scrollY/max)):0);
 }
 let current=null;
 for(const item of sections)if(item.section.getBoundingClientRect().top<innerHeight*.4)current=item.link;
 links.forEach(link=>{if(link===current){if(link.getAttribute('aria-current')!=='location')link.setAttribute('aria-current','location');}else if(link.hasAttribute('aria-current'))link.removeAttribute('aria-current');});
}
export function initialiseMotion(){
 document.body.classList.add('experience-ready');
 const queueScroll=()=>{if(!frame)frame=requestAnimationFrame(syncScroll);};
 addEventListener('scroll',queueScroll,{passive:true});addEventListener('resize',queueScroll,{passive:true});syncScroll();
 const hero=document.querySelector('.hero');
 if(hero){
  hero.addEventListener('pointermove',event=>{
   if(reduced.matches||!fine.matches||!desktop.matches||event.pointerType==='touch')return;
   const rect=hero.getBoundingClientRect();
   hero.style.setProperty('--hero-x',((event.clientX-rect.left)/rect.width-.5)*10+'px');
   hero.style.setProperty('--hero-y',((event.clientY-rect.top)/rect.height-.5)*6+'px');
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{hero.style.removeProperty('--hero-x');hero.style.removeProperty('--hero-y');});
 }
 document.addEventListener('visibilitychange',()=>document.body.classList.toggle('experience-paused',document.hidden));
}
initialiseMotion();
