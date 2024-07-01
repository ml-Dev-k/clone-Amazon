import { renderOrderSummary } from "../../scripts/checkout.js";
import { cart , loadCartFromStorage } from "../../data/cart.js";

describe('calculates order Total',()=>{
  const itemID = CSS.escape("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  beforeEach(()=>{
    document.querySelector('.orderSummary-test-container')
      // .innerHTML = `
      // <div class="underlined itemsTotalShipping">$4.99 <br></div>
      // <div class="totalBeforeTax">$47.74</div>
      // <div class="tax">$4.77</div>
      // <div class="orderTotal">$52.51</div>
      // `;
    })
    afterEach(()=>{
    document.querySelector('orderSummary-test-container')
     // .innerHTML = '';
  })

  spyOn(localStorage , 'setItem');
  spyOn(localStorage, 'getItem').and.callFake(()=>{
    return JSON.stringify([
      {
        deliveryOption: 2,
        id: itemID,
        quantity: 2
      },
      {
        deliveryOption: 3,
        id: itemID,
        quantity: 3
      }
    ]) ;
  }) 
  loadCartFromStorage();

  it('should correctly calculate items-total price', () => {
    renderOrderSummary();
    
    const itemsTotalPrice = document.querySelector('.itemsTotalPrice');
    expect(Number(itemsTotalPrice.innerText)).toEqual(31.85);
  })
  
})



import {cart ,loadCartFromStorage , 
  addProductToCart, updateCartItemQuantity , updateDeliveryOption} from '../../data/cart.js'
 
   describe('▶test suite: add product to Cart ',()=>{
     const itemID = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
     beforeEach(()=>{
       document.querySelector('.cart-test-container')
         .innerHTML = `
         <div class="cart-count-selector">
           <select name="cart-count" id="${itemID}">
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           </select>
         </div>    
         `;
       document.getElementById(`${itemID}`).value = 3;
     })
     afterEach(()=>{
       document.querySelector('.cart-test-container')
         .innerHTML = '';
     })
 
     it('adds new product',()=>{
       spyOn(localStorage , 'setItem');
       spyOn(localStorage, 'getItem').and.callFake(()=>{
         return JSON.stringify([]) ;
       }) 
       loadCartFromStorage();
       addProductToCart(itemID);
       expect(cart[0].id).toEqual(itemID);
       expect(cart[0].quantity).toEqual(3);
       expect(cart[0].deliveryOption).toEqual(1);
       expect(cart.length).toEqual(1);
       expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     })
 
     it('updates quantity of an existing product',()=>{
       spyOn(localStorage , 'setItem');
       spyOn(localStorage, 'getItem').and.callFake(()=>{
         return JSON.stringify([
           {
             id: itemID,
             quantity: 1,
             deliveryOption: 1
           }
         ]) ;
       }) 
       loadCartFromStorage();
       addProductToCart(itemID);
       expect(cart[0].id).toEqual(itemID);
       expect(cart[0].quantity).toEqual(3);
       expect(cart[0].deliveryOption).toEqual(1);
       expect(cart.length).toEqual(1);
       expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     })
   })
 
     describe('▶test suite: add cartItem quantity', ()=>{
     it('updates and saves cartItem quantity: ', ()=>{
       spyOn(localStorage , 'setItem');
       spyOn(localStorage, 'getItem').and.callFake(()=>{
         return JSON.stringify([
           {
             deliveryOption: 1,
             id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
             quantity: 3
           }
         ]) ;
       }) 
 
       loadCartFromStorage();
       updateCartItemQuantity('15b6fc6f-327a-4ec4-896f-486349e85a3d', 8);
       expect(cart[0].quantity).toEqual(8);
       expect(localStorage.setItem).toHaveBeenCalledTimes(1);
 
     })
   })
 
   describe('▶test suite: update the delivery option' ,()=>{
     it('updates and saves the delivery option', ()=>{
       spyOn(localStorage , 'setItem');
       spyOn(localStorage , 'getItem').and.callFake(()=>{
         return  JSON.stringify([
           {
             deliveryOption: 1,
             id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
             quantity: 3
           }
         ])
       })
   
       loadCartFromStorage();
       updateDeliveryOption("15b6fc6f-327a-4ec4-896f-486349e85a3d" , 3)
       expect(cart[0].deliveryOption).toEqual(3);
       expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     })
   })
   
  
 