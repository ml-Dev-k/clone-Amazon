export class Cart {
  cartItems = [];

  constructor(){
    this.loadCartFromStorage();
  }

  loadCartFromStorage(){
    return this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  } 

  removeItemFromCart(itemID){
    this.cartItems = this.cartItems.filter(item => item.productId !== itemID);
    this.saveCartToStorage();
  }

  addProductToCart(productId){
    let ProductExistInCart = false;
    // Get value in the HtmlSelectElement with the same ID
    const quantity = Number(document.getElementById(`${productId}`).value) 
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId === productId) {
          cartItem.quantity = quantity
          ProductExistInCart = true;
        }
      })
      if (!ProductExistInCart) {
        this.cartItems.push({
          productId : productId,
          quantity: quantity,
          deliveryOptionId: '1'
        })
      }
      this.saveCartToStorage()
    }  

    updateCartItemQuantity(itemID , updatedQuantity){
      this.cartItems.map((item)=>{
      if (item.productId === itemID) {
        item.quantity = updatedQuantity 
        this.saveCartToStorage();
      }
    })
  }
  updateDeliveryOption(itemID , updatedOption){
    this.cartItems.map((item)=>{
    if (item.productId === itemID) {
      item.deliveryOptionId = String(updatedOption); 
      this.saveCartToStorage();
    }
  })
 }
  saveCartToStorage(){
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
  }


}

console.log(new Cart().cartItems)

  
  



