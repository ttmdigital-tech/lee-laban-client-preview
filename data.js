const product=(name,price,image)=>({name,price,image:`assets/products/${image}.webp`,alt:`Lee Laban ${name}`});
const bowlFlavours=['Nutella','Lotus','Kinder','Pistachio Nutella','Pistachio Kinder','Kinder Nutella','Pistachio Lotus','Trio'];
const bowlImages=['nutella','lotus','kinder','pistachio-nutella','pistachio-kinder','kinder-nutella-retouched','pistachio-lotus','trio'];
const bowls=()=>bowlFlavours.map((name,index)=>product(name,350,`bowl-${bowlImages[index]}`));
export const categories=[
 {id:'louh',name:'Louh',note:'Three classic flavours. ₹350 each.',products:bowls().slice(0,3)},
 {id:'salankatia',name:'Salankatia',note:'Eight flavour combinations. ₹350 each.',products:bowls()},
 {id:'koshari',name:'Koshari',note:'Eight flavour combinations. ₹350 each.',products:bowls()},
 {id:'crispy',name:'Crispy Ummu Ali',note:'Five flavours. ₹350 each.',products:[product('Pistachio Nutella',350,'crispy-pistachio-nutella'),product('Pistachio',350,'crispy-pistachio'),product('Nutella',350,'crispy-nutella'),product('Lotus',350,'crispy-lotus'),product('Pistachio Lotus',350,'crispy-pistachio-lotus')]},
 {id:'qusthuta',name:'Qusthuta',note:'Four flavours, served in a tray. ₹290 each.',products:[product('Strawberry',290,'qusthuta-strawberry-retouched'),product('Tender',290,'qusthuta-tender'),product('Pistachio Nutella',290,'qusthuta-pistachio-nutella'),product('Nutella',290,'qusthuta-nutella')]},
 {id:'specials',name:'Specials',note:'Cakes, kunafa and signature desserts.',products:[product('Cheese Bomb',290,'cheese-bomb-v2'),product('Hebba Cake',380,'hebba-cake-retouched'),product('Kabsa',380,'kabsa'),product('Creme de la Creme',380,'creme-de-la-creme'),product('Kunafa Bel Manga',380,'kunafa-bel-manga-retouched'),product('Fazea Chocola Kake',490,'fazea-chocola-kake-retouched'),product('Wonder Women',320,'wonder-women-retouched'),product('De Paris',420,'de-paris-retouched'),product('Elsabika',450,'elsabika'),product('Lazy Cat',250,'lazy-cat-retouched')]},
 {id:'bars',name:'Hazelnut Bar',note:'The hazelnut bar from our menu.',products:[product('Hazelnut Bar',690,'hazelnut-bar-v2')]}
];
export const menuItemCount=categories.reduce((total,category)=>total+category.products.length,0);
export const branches=[{name:'Kuthuparamba',phone:'+919539425262',status:'open'},{name:'Thaliparamba',phone:'+919562369934',status:'open'},{name:'Matannur',phone:'+919539425237',status:'open'},{name:'Panoor',phone:null,status:'soon'}];
export const franchisePhone='+919108664784';
