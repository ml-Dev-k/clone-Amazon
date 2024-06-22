export const cart = [];

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

      //taking each product with quantity = 0 out of the cart
      const newCart = cart.filter(product=>product.quantity > 0);
      cart.length = 0;
      cart.push(...newCart);
      
      
      console.clear();
      console.log(cart);
      
    }  