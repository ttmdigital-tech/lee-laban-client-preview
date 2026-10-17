import {mapDestination} from './locations.js';
import {categories,branches} from './data.js';
import {enhanceIcons,initialiseUI,transitionFlavour} from './ui.js';
const grid=document.querySelector('#product-grid');
const status=document.querySelector('#menu-status');

export function renderCategory(categoryId='all'){
 const visible=categoryId==='all'?categories:categories.filter(c=>c.id===categoryId);if(!visible.length)return;
 document.querySelectorAll('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===categoryId)));
 document.querySelector('#category-note').textContent=categoryId==='all'?'Browse a collection. Use the arrows to change flavours.':visible[0].note;
 const total=visible.reduce((n,c)=>n+c.products.length,0);document.querySelector('#category-count').textContent=String(total).padStart(2,'0')+' FLAVOURS TO EXPLORE';
 grid.classList.toggle('single-collection',visible.length===1);grid.setAttribute('aria-label',categoryId==='all'?'All dessert collections':visible[0].name+' desserts');
 grid.replaceChildren(...visible.map(category=>{
  let index=0;const card=document.createElement('article');card.className='dessert-card';
  card.innerHTML=`<div class="dessert-card-title"><h3>${category.name}</h3><span>${String(category.products.length).padStart(2,'0')} FLAVOURS</span></div><div class="dessert-card-image"><img src="assets/${category.id}-fast.webp" alt="${category.name} collection illustration" loading="lazy"><small>COLLECTION ILLUSTRATION</small></div><div class="dessert-card-body"><div class="dessert-flavour-heading"><h4></h4><span class="dessert-price"></span></div><p>${category.note}</p><div class="dessert-flavour-picker"><button type="button" class="flavour-prev" aria-label="Previous ${category.name} flavour">←</button><span class="flavour-position"></span><button type="button" class="flavour-next" aria-label="Next ${category.name} flavour">→</button></div><button type="button" class="dessert-order">Order from a branch <span>↗</span></button></div>`;
  const update=()=>{const p=category.products[index];card.querySelector('h4').textContent=p.name;card.querySelector('.dessert-price').textContent='₹'+p.price;card.querySelector('.flavour-position').textContent=String(index+1).padStart(2,'0')+' / '+String(category.products.length).padStart(2,'0');card.querySelector('.dessert-order').setAttribute('aria-label','Choose a branch to order '+category.name+' '+p.name);};
  card.querySelector('.flavour-prev').addEventListener('click',()=>{index=(index-1+category.products.length)%category.products.length;update();transitionFlavour(card.querySelector('.dessert-flavour-heading'));status.textContent=category.name+': '+category.products[index].name+', ₹'+category.products[index].price;});
  card.querySelector('.flavour-next').addEventListener('click',()=>{index=(index+1)%category.products.length;update();transitionFlavour(card.querySelector('.dessert-flavour-heading'));status.textContent=category.name+': '+category.products[index].name+', ₹'+category.products[index].price;});
  card.querySelector('.dessert-order').addEventListener('click',e=>openBranchChooser(e.currentTarget));update();enhanceIcons(card);return card;
 }));
 status.textContent=categoryId==='all'?'All four collections shown. Use the arrows to explore 16 flavours.':visible[0].name+': use the arrows to explore '+total+' flavours.';
}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>renderCategory(button.dataset.category)));
document.querySelectorAll('[data-hero-category]').forEach(a=>a.addEventListener('click',()=>renderCategory(a.dataset.heroCategory)));
const navigation=document.querySelector('#navigation');
const menuToggle=document.querySelector('.menu-toggle');
function closeNavigation(restoreFocus=false){navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');if(restoreFocus)menuToggle.focus();}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeNavigation()));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true')closeNavigation(true);});
const dialog=document.querySelector('#branch-dialog');let dialogTrigger=null;
export function openBranchChooser(trigger){dialogTrigger=trigger;closeNavigation();dialog.showModal();dialog.querySelector('.dialog-close').focus();}
export function closeBranchChooser(){dialog.close();}
document.querySelectorAll('[data-order]').forEach(button=>button.addEventListener('click',event=>openBranchChooser(event.currentTarget)));
dialog.querySelector('.dialog-close').addEventListener('click',closeBranchChooser);
dialog.addEventListener('close',()=>{if(dialogTrigger&&document.contains(dialogTrigger)){if(navigation.contains(dialogTrigger)&&!navigation.classList.contains('open')&&getComputedStyle(menuToggle).display!=='none')menuToggle.focus();else dialogTrigger.focus();}});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeBranchChooser();}});
document.querySelector('#dialog-branches').replaceChildren(...branches.filter(b=>b.status==='open').map(branch=>{const a=document.createElement('a');a.href=`tel:${branch.phone}`;a.className='dialog-branch';a.setAttribute('aria-label',`Call Lee Laban ${branch.name} ${branch.phone}`);a.innerHTML=`<span>${branch.name}<small>${branch.phone.replace('+91','+91 ')}</small></span><span aria-hidden="true">↗</span>`;return a;}));
document.querySelector('#year').textContent=String(new Date().getFullYear());
renderCategory('all');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');

const fullMenu=document.querySelector('#full-menu');let menuTrigger=null;
document.querySelector('.full-menu-nav').innerHTML=categories.map(c=>`<a href="#full-${c.id}">${c.name}</a>`).join('');
document.querySelector('#full-menu-content').innerHTML=categories.map((c,index)=>`<section id="full-${c.id}" class="full-menu-category"><div class="full-category-photo"><img src="assets/${c.id}-fast.webp" alt="${c.name} collection illustration" loading="lazy"><span>0${index+1} / ${c.name.toUpperCase()}</span></div><div class="full-category-list"><span class="eyebrow">0${index+1} / THE COLLECTION</span><h3>${c.name}</h3><p>${c.note}</p><ul>${c.products.map(p=>`<li><span>${p.name}</span><strong>₹${p.price}</strong></li>`).join('')}</ul><button class="text-link" type="button" data-menu-order>Order from a branch ↗</button></div></section>`).join('');
document.querySelectorAll('[data-full-menu]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();menuTrigger=link;fullMenu.showModal();fullMenu.scrollTop=0;document.querySelector('.full-menu-close').focus();document.body.classList.add('dialog-active');}));
document.querySelector('.full-menu-close').addEventListener('click',()=>fullMenu.close());
fullMenu.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();fullMenu.close();});
fullMenu.addEventListener('close',()=>{document.body.classList.remove('dialog-active');menuTrigger?.focus();});
document.querySelectorAll('[data-menu-order]').forEach(button=>button.addEventListener('click',()=>{fullMenu.close();openBranchChooser(menuTrigger);}));
document.querySelectorAll('.full-menu-nav a').forEach(a=>a.addEventListener('click',event=>{event.preventDefault();fullMenu.querySelector(a.getAttribute('href')).scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});}));
const locationDialog=document.querySelector('#location-dialog');let locationTrigger=null;
document.querySelectorAll('[data-branch]').forEach(button=>button.addEventListener('click',()=>{const branch=branches.find(b=>b.name===button.dataset.branch&&b.status==='open');if(!branch)return;const maps=mapDestination(branch.name);locationTrigger=button;document.querySelector('#location-title').textContent=branch.name;document.querySelector('#location-call').href='tel:'+branch.phone;document.querySelector('#location-phone').textContent=branch.phone.replace('+91','+91 ');const map=document.querySelector('#location-map');map.href=maps.url;document.querySelector('#location-map-label').textContent=maps.exact?'Open Google Maps':'Search Google Maps';document.querySelector('#location-map-note').textContent=maps.exact?'View the shop location':'Search Lee Laban in '+branch.name;locationDialog.showModal();locationDialog.querySelector('.location-close').focus();}));
locationDialog.querySelector('.location-close').addEventListener('click',()=>locationDialog.close());
locationDialog.addEventListener('close',()=>locationTrigger?.focus());
initialiseUI();
