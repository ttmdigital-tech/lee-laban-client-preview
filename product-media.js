// Original owner photography is preserved. Frames crop only its display in cards.
export const originalPhotos={
 'fazea-chocola-kake':{x:0,y:.585,size:1},
 'hebba-cake':{x:.234,y:.548,size:.504},
 'qusthuta-strawberry':{x:.095,y:.512,size:.731},
 'bowl-kinder-nutella':{x:.19,y:.621,size:.585},
 'wonder-women':{x:.278,y:.512,size:.497},
 'kunafa-bel-manga':{x:.205,y:.621,size:.526},
 'de-paris':{x:.132,y:.365,size:.731},
 'lazy-cat':{x:.263,y:.556,size:.475}
};
export function productMedia(product,category){
 const id=product.image.split('/').pop().replace(/-original\.webp$/,'');
 const frame=originalPhotos[id];
 const style=frame?` style="position:absolute;width:${100/frame.size}%;max-width:none;height:auto;left:${-100*frame.x/frame.size}%;top:${-100*frame.y/frame.size}%;object-fit:initial"`:'';
 return `<img src="${product.image}" alt="${category.name}: ${product.name}${frame?'':' product illustration'}" loading="lazy" decoding="async"${style}>`;
}
