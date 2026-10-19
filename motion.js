// Every section remains readable without JavaScript or motion.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover: hover) and (pointer: fine)');
const animations=new Set(),seen=new WeakSet();
let observer,frame=0,heroStarted=false;
function play(element,frames,options={}){
 if(!element||reduced.matches||!element.animate)return;
 const animation=element.animate(frames,{duration:650,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards',...options});
 animations.add(animation);animation.finished.then(()=>animations.delete(animation),()=>animations.delete(animation));
}
function reveal(element,delay=0){
 if(seen.has(element))return;seen.add(element);
 play(element,[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{delay});
}
function watch(root=document){
 root.querySelectorAll('.menu-product,.section-heading,.about-stat,.about-copy,.branch,.franchise-feature-photo,.franchise-feature-copy,.menu-page-intro,.enquiry-sidebar,.enquiry-form-wrap,.enquiry-faq>div,.partner-hero-copy,.partner-guide,.partner-form-card,.partner-questions,.footer-top').forEach(element=>{
  if(seen.has(element))return;if(observer)observer.observe(element);else reveal(element);
 });
}
function startHero(){
 if(heroStarted||document.documentElement.classList.contains('intro-pending'))return;
 heroStarted=true;if(scrollY>180)return;
 document.querySelectorAll('.hero-copy .eyebrow,.hero-copy h1,.hero-copy>p,.hero-actions').forEach((element,index)=>play(element,[{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],{duration:900,delay:80+index*115}));
 play(document.querySelector('.hero-art'),[{opacity:0,transform:'translateY(22px) scale(.96)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:1200,delay:150});
}
function syncScroll(){
 frame=0;const max=document.documentElement.scrollHeight-innerHeight;
 document.documentElement.style.setProperty('--page-progress',max>0?Math.min(1,Math.max(0,scrollY/max)):0);
 const links=[...document.querySelectorAll('.header nav>a[href^="#"]')];let current=null;
 for(const link of links){const section=document.getElementById(link.hash.slice(1));if(section&&section.getBoundingClientRect().top<innerHeight*.4)current=link;}
 links.forEach(link=>{if(link===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
}
export function initialiseMotion(){
 document.body.classList.add('experience-ready');
 if('IntersectionObserver' in window)observer=new IntersectionObserver(entries=>{let stagger=0;entries.forEach(entry=>{if(entry.isIntersecting){reveal(entry.target,Math.min(stagger++*65,195));observer.unobserve(entry.target);}});},{threshold:.08,rootMargin:'0px 0px -16px 0px'});
 watch();const grid=document.querySelector('#product-grid');
 if(grid)new MutationObserver(()=>watch(grid)).observe(grid,{childList:true});
 const introState=new MutationObserver(()=>{startHero();if(heroStarted)introState.disconnect();});
 introState.observe(document.documentElement,{attributes:true,attributeFilter:['class']});startHero();if(heroStarted)introState.disconnect();
 const queueScroll=()=>{if(!frame)frame=requestAnimationFrame(syncScroll);};
 addEventListener('scroll',queueScroll,{passive:true});addEventListener('resize',queueScroll,{passive:true});syncScroll();
 if('ResizeObserver' in window)new ResizeObserver(queueScroll).observe(document.body);
 const hero=document.querySelector('.hero');
 if(hero){
  if('IntersectionObserver' in window)new IntersectionObserver(([entry])=>hero.classList.toggle('hero-outside',!entry.isIntersecting)).observe(hero);
  hero.addEventListener('pointermove',event=>{if(reduced.matches||!fine.matches||event.pointerType==='touch')return;const rect=hero.getBoundingClientRect();hero.style.setProperty('--hero-x',((event.clientX-rect.left)/rect.width-.5)*14+'px');hero.style.setProperty('--hero-y',((event.clientY-rect.top)/rect.height-.5)*10+'px');},{passive:true});
  hero.addEventListener('pointerleave',()=>{hero.style.removeProperty('--hero-x');hero.style.removeProperty('--hero-y');});
 }
 document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)play(detail.querySelector('p'),[{opacity:0,transform:'translateY(-6px)'},{opacity:1,transform:'translateY(0)'}],{duration:280});}));
 document.addEventListener('visibilitychange',()=>document.body.classList.toggle('experience-paused',document.hidden));
 reduced.addEventListener('change',()=>{if(reduced.matches){animations.forEach(animation=>animation.cancel());animations.clear();}});
}
initialiseMotion();
