// Shop destinations supplied by the owner, including explicit confirmation of Matannur/Thaliparamba order.
export const shopMapLinks={
 Kuthuparamba:'https://www.google.com/maps?vet=10CAAQoqAOahcKEwjYuYfLhcGXAxUAAAAAHQAAAAAQBQ..i&rlz=1C1CHBD_enIN1234IN1234&udm&fvr=1&pvq=Cg0vZy8xMXl2ZHNuMHlfIg8KCWxlZSBsYWJhbhACGAM&lqi=CglsZWUgbGFiYW5Iv4eozOm9gIAIWhsQABABGAAYASIJbGVlIGxhYmFuKgYIAhAAEAGSAQxkZXNzZXJ0X3Nob3A&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KakQdXAAL6Q7Ma7nuFcftkcx&daddr=Kuthuparamba,+Keralam+670643',
 Thaliparamba:'https://www.google.com/maps?cid=11708387546744801983',
 Matannur:'https://www.google.com/maps?cid=12822160800585166194'
};
export function mapDestination(branchName){
 if(!Object.hasOwn(shopMapLinks,branchName))return null;
 const exact=shopMapLinks[branchName];
 return {url:exact??`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Lee Laban '+branchName+' Kerala')}`,exact:!!exact};
}
