export let cart = JSON.parse(localStorage.getItem('cart')) || [];


// ▶Functions section 🔽

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
    saveToStorage()
  }  

/**
 * updates the quantity of the cart item with the same ID
 * @param {string} itemID 
 * @param {number} updatedQuantity 
 */
export function updateCartItemQuantity(itemID , updatedQuantity){
    cart.map((item)=>{
    if (item.productId === itemID) {
      item.quantity = updatedQuantity 
      saveToStorage();
    }
  })
}
  
  
  
export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


