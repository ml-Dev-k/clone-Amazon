export class Cart {
  cartItems;

  constructor(){
    this.loadCartFromStorage();

  }
  loadCartFromStorage( ){
    return this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  } 

  removeItemFromCart(itemID){
    this.cartItems = this.cartItems.filter(item => item.id !== itemID);
  }
  addProductToCart(productId){

    let ProductExistInCart = false;
    // Get value in the HtmlSelectElement with the same ID
    const quantity = Number(document.getElementById(`${productId}`).value) 
  
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.id === productId) {
          cartItem.quantity = quantity
          ProductExistInCart = true;
  
        }
      })
      if (!ProductExistInCart) {
        this.cartItems.push({
          id: productId,
          quantity: quantity,
          deliveryOption: 1
        })
      }
      this.saveCartToStorage()
    }  

    updateCartItemQuantity(itemID , updatedQuantity){
      this.cartItems.map((item)=>{
      if (item.id === itemID) {
        item.quantity = updatedQuantity 
        this.saveCartToStorage();
      }
    })
  }
  updateDeliveryOption(itemID , updatedOption){
    this.cartItems.map((item)=>{
    if (item.id === itemID) {
      item.deliveryOption = updatedOption 
      this.saveCartToStorage();
    }
  })
 }
  saveCartToStorage(){
  localStorage.setItem('cart',JSON.stringify(this.cartItems));
 }
}

console.log(new Cart().cartItems)


// ▶Functions section 🔽

/**
 * Removes item with itemID from the cart
 * @param {string} itemID 
 */



/**
 * adds product to cart
 * 
 * @param {string} productId 
 */



/**
 * updates the quantity of the cart item with the same ID
 * @param {string} itemID 
 * @param {number} updatedQuantity 
 */

/**
 * updates the deliveryOption of the cart item with the same ID
 * @param {string} itemID 
 * @param {number} updatedOption 
 */


  
  
  



