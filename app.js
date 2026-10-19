import {mapDestination} from './locations.js';
import {categories,branches,menuItemCount} from './data.js?v=menu-39';
import {enhanceIcons,initialiseUI} from './ui.js';
const grid=document.querySelector('#product-grid');
const status=document.querySelector('#menu-status');
const search=document.querySelector('#menu-search');
let selectedCategory='all';
document.querySelector('#category-controls').innerHTML=`<button type="button" data-category="all" aria-pressed="true">All desserts <span>${menuItemCount}</span></button>`+categories.map(c=>`<button type="button" data-category="${c.id}" aria-pressed="false">${c.name} <span>${String(c.products.length).padStart(2,'0')}</span></button>`).join('');

export function renderCategory(categoryId=selectedCategory){
 selectedCategory=categoryId;
 const query=(search.value||'').trim().toLocaleLowerCase();
 const visible=categoryId==='all'?categories:categories.filter(c=>c.id===categoryId);
 const products=visible.flatMap(category=>category.products.map(product=>({category,product}))).filter(({category,product})=>`${category.name} ${product.name}`.toLocaleLowerCase().includes(query));
 document.querySelectorAll('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===categoryId)));
 document.querySelector('#category-note').textContent=categoryId==='all'?'Every dessert, every flavour. Find your favourite.':visible[0].note;
 document.querySelector('#category-count').textContent=products.length+' '+(products.length===1?'DESSERT':'DESSERTS');
 grid.classList.add('catalogue-grid');
 grid.setAttribute('aria-label',categoryId==='all'?'All dessert collections':visible[0].name+' desserts');
 grid.replaceChildren(...products.map(({category,product})=>{
  const card=document.createElement('article');card.className='menu-product';
  card.innerHTML=`<div class="menu-product-photo"><img src="${product.image}" alt="${category.name}: ${product.name}, enhanced from the supplied menu" loading="lazy" decoding="async" width="720" height="720"></div><div class="menu-product-copy"><span class="menu-product-category">${category.name}</span><div class="menu-product-heading"><h3>${product.name}</h3><span class="menu-product-price">₹${product.price}</span></div><button type="button" class="menu-product-order" aria-label="Choose a branch to order ${category.name} ${product.name}">Order from a branch <span>↗</span></button></div>`;
  card.querySelector('button').addEventListener('click',event=>openBranchChooser(event.currentTarget));
  enhanceIcons(card);return card;
 }));
 if(!products.length){const empty=document.createElement('p');empty.className='menu-empty';empty.textContent='No desserts found. Try another flavour or collection.';grid.append(empty);}
 status.textContent=`Showing ${products.length} of ${menuItemCount} menu entries.`;
}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>renderCategory(button.dataset.category)));
search.addEventListener('input',()=>renderCategory());
document.querySelectorAll('[data-hero-category]').forEach(link=>link.addEventListener('click',()=>{search.value='';renderCategory(link.dataset.heroCategory);}));
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
document.querySelector('#full-menu-content').innerHTML=categories.map((c,index)=>`<section id="full-${c.id}" class="full-menu-category"><div class="full-category-photo"><img src="${c.products[0].image}" alt="${c.name} from the supplied menu" loading="lazy"><span>0${index+1} / ${c.name.toUpperCase()}</span></div><div class="full-category-list"><span class="eyebrow">0${index+1} / THE COLLECTION</span><h3>${c.name}</h3><p>${c.note}</p><ul>${c.products.map(p=>`<li><img class="full-menu-product-thumb" src="${p.image}" alt="" loading="lazy" width="64" height="64"><span>${p.name}</span><strong>₹${p.price}</strong></li>`).join('')}</ul><button class="text-link" type="button" data-menu-order>Order from a branch ↗</button></div></section>`).join('');
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
