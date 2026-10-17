const product=(name,price,crop)=>({name,price,image:'assets/menu-poster.png',alt:`${name} dessert from the Lee Laban menu`,crop});
export const categories=[
 {id:'louh',name:'Louh',note:'Nutella, Lotus or Kinder.',products:[product('Nutella',350,[124,337,100,68]),product('Lotus',350,[251,337,117,70]),product('Kinder',350,[386,338,100,68])]},
 {id:'specials',name:'Specials',note:'Cheese Bomb, Heba Cake and more.',products:[product('Cheese Bomb',290,[78,482,103,66]),product('Heba Cake',380,[208,485,109,63]),product('Creme de la Creme',380,[334,483,111,66]),product('Kabsa',380,[454,485,100,63])]},
 {id:'crispy',name:'Crispy Ummu Ali',note:'Five flavours to choose from.',products:[product('Pistachio',350,[78,654,83,80]),product('Nutella',350,[180,655,84,79]),product('Lotus',350,[280,654,84,80]),product('Pistachio Lotus',350,[384,655,84,79]),product('Pistachio Nutella',350,[481,654,86,80])]},
 {id:'qusthuta',name:'Qusthuta',note:'Four flavours. Served in a tray.',products:[product('Nutella',290,[86,868,106,56]),product('Strawberry',290,[214,868,99,56]),product('Tender',290,[337,868,100,56]),product('Pistachio Nutella',290,[459,868,99,56])]}
];
export const branches=[{name:'Kuthuparamba',phone:'+919539425262',status:'open'},{name:'Thaliparamba',phone:'+919562369934',status:'open'},{name:'Matannur',phone:'+919539425237',status:'open'},{name:'Panoor',phone:null,status:'soon'}];
export const franchisePhone='+919108664784';
