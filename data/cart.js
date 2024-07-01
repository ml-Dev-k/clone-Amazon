export let cart ;
loadCartFromStorage();
export function loadCartFromStorage( ){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
} 
  


// ▶Functions section 🔽

/**
 * Removes item with itemID from the cart
 * @param {string} itemID 
 */
export function removeItemFromCart(itemID){
  cart = cart.filter(item => item.id !== itemID);
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
      if (cartItem.id === productId) {
        cartItem.quantity = quantity
        ProductExistInCart = true;

      }
    })
    if (!ProductExistInCart) {
      cart.push({
        id: productId,
        quantity: quantity,
        deliveryOption: 1
      })
    }
    saveCartToStorage()
  }  

/**
 * updates the quantity of the cart item with the same ID
 * @param {string} itemID 
 * @param {number} updatedQuantity 
 */
export function updateCartItemQuantity(itemID , updatedQuantity){
    cart.map((item)=>{
    if (item.id === itemID) {
      item.quantity = updatedQuantity 
      saveCartToStorage();
    }
  })
}
/**
 * updates the deliveryOption of the cart item with the same ID
 * @param {string} itemID 
 * @param {number} updatedOption 
 */
export function updateDeliveryOption(itemID , updatedOption){
    cart.map((item)=>{
    if (item.id === itemID) {
      item.deliveryOption = updatedOption 
      saveCartToStorage();
    }
  })
}

  
  
  
export function saveCartToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


