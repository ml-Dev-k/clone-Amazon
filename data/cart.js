export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 4
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 8
  },
  {
    productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 3
  },
];

/**
 * Removes item with itemID from the cart
 * @param {string} itemID 
 */
export function removeItemFromCart(itemID){
  cart = cart.filter(item => item.productId !== itemID);
}



/**
 * adds product to cart
 * 
 * @param {string} productId 
 */

export function addProductToCart(productId){

  let ProductExistInCart = false;
  // Get value in the HtmlSelectElement with the same ID
  const quantity = Number(document.getElementById(`${productId}`).value) 
  
      cart.forEach((cartItem)=>{
        if (cartItem.productId === productId) {
          cartItem.quantity = quantity
          ProductExistInCart = true;
        }
      })
      if (!ProductExistInCart) {
        cart.push({
          productId: productId,
          quantity: quantity
        })
      }
  }  
