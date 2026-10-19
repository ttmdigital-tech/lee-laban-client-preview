// Catalogue images retouched from the owner's photos use a consistent square frame.
export function productMedia(product,category){
 const mobile=product.image.replace('.webp','-640.webp');
 return `<img src="${product.image}" srcset="${mobile} 640w, ${product.image} 1254w" sizes="(max-width:600px) calc((100vw - 48px) / 2), (max-width:1000px) 44vw, 30vw" alt="${category.name}: ${product.name}" loading="lazy" decoding="async" width="1280" height="1280">`;
}
