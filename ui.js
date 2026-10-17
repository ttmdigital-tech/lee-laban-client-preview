// One consistent SVG icon set; no platform-dependent arrow or emoji rendering.
const paths={
 'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
 'arrow-right':'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 'arrow-left':'<path d="M19 12H5m6-6-6 6 6 6"/>',
 'arrow-down':'<path d="M12 5v14m-6-6 6 6 6-6"/>',
 'arrow-up':'<path d="M12 19V5m-6 6 6-6 6 6"/>',
 'close':'<path d="m6 6 12 12M6 18 18 6"/>',
 'menu':'<path d="M4 7h16M4 12h16M4 17h16"/>',
 'phone':'<path d="m8 3 3 5-2 2a14 14 0 0 0 5 5l2-2 5 3c0 3-2 5-5 4C9 18 5 14 3 8 2 5 5 3 8 3Z"/>',
 'sparkle':'<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4Z"/>',
 'chevron':'<path d="m8 10 4 4 4-4"/>'
};
export function icon(name,className=''){
 return `<svg class="ui-icon ${className}" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]??paths['arrow-up-right']}</svg>`;
}
const glyphs={'↗':'arrow-up-right','←':'arrow-left','→':'arrow-right','↓':'arrow-down','↑':'arrow-up','×':'close','✳':'sparkle'};
export function enhanceIcons(root=document.body){
 const nodes=[];
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){return !node.parentElement?.closest('svg,script,style,textarea,input,option')&&/[↗←→↓↑×✳]/.test(node.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
 while(walker.nextNode())nodes.push(walker.currentNode);
 for(const node of nodes){const fragment=document.createDocumentFragment();for(const part of node.nodeValue.split(/([↗←→↓↑×✳])/)){if(glyphs[part]){const template=document.createElement('template');template.innerHTML=icon(glyphs[part]);fragment.append(template.content);}else fragment.append(document.createTextNode(part));}node.replaceWith(fragment);}
}
export function initialiseUI(){
 enhanceIcons();
 const menu=document.querySelector('.menu-toggle');
 if(menu)menu.innerHTML=icon('menu','nav-menu-icon')+icon('close','nav-close-icon');
 document.querySelectorAll('.floating-contact').forEach(button=>{button.innerHTML=icon('phone');button.setAttribute('aria-label','Choose a branch to call');});
 document.querySelectorAll('.branch>a i').forEach(container=>container.innerHTML=icon('phone'));
 const narrow=matchMedia('(max-width:760px)');
 const syncNavigation=()=>document.body.classList.toggle('navigation-open',narrow.matches&&menu?.getAttribute('aria-expanded')==='true');
 if(menu){new MutationObserver(syncNavigation).observe(menu,{attributes:true,attributeFilter:['aria-expanded']});document.addEventListener('pointerdown',event=>{if(narrow.matches&&menu.getAttribute('aria-expanded')==='true'&&!event.target.closest('.header'))menu.click();});narrow.addEventListener('change',()=>{if(menu.getAttribute('aria-expanded')==='true')menu.click();syncNavigation();});}
 let frame=0;
 const onScroll=()=>{if(frame)return;frame=requestAnimationFrame(()=>{document.body.classList.toggle('page-scrolled',scrollY>30);frame=0;});};
 addEventListener('scroll',onScroll,{passive:true});onScroll();
 document.querySelectorAll('img').forEach(img=>{img.decoding='async';if(img.classList.contains('hero-desserts'))img.fetchPriority='high';});
 // Native modal focus trapping is retained; only the underlying page scroll is locked.
 const syncDialog=()=>{const open=!!document.querySelector('dialog[open]');document.documentElement.classList.toggle('modal-open',open);};
 document.querySelectorAll('dialog').forEach(dialog=>new MutationObserver(syncDialog).observe(dialog,{attributes:true,attributeFilter:['open']}));
 syncDialog();
}
export function transitionFlavour(element){
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&element.animate)element.animate([{opacity:.35,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:210,easing:'cubic-bezier(.2,.7,.2,1)'});
}
