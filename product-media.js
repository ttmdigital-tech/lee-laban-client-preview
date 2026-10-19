// Catalogue images retouched from the owner's photos use a consistent square frame.
export function productMedia(product,category){
 return `<img src="${product.image}" alt="${category.name}: ${product.name}" loading="lazy" decoding="async" width="1280" height="1280">`;
}
