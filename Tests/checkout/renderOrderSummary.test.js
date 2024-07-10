import { renderOrderSummary } from "../../scripts/checkout/renderOrderSummary.js";
import { loadCartFromStorage } from "../../data/cart.js";

describe('render Order Summary',()=>{
  const itemID = CSS.escape("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  beforeEach(()=>{
    document.querySelector('.orderSummary-test-container')
      .innerHTML = `
      <div class="underlined itemsTotalShipping">$4.99 <br></div>
      <div class="totalBeforeTax">$47.74</div>
      <div class="tax">$4.77</div>
      <div class="orderTotal">$52.51</div>
      <div class="pay-section"></div>
      `;

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
    })
    afterEach(()=>{
    document.querySelector('orderSummary-test-container')
      .innerHTML = '';
  })

 

  it('should correctly calculate items-total price', () => {
    renderOrderSummary();
    
    const itemsTotalPrice = document.querySelector('.itemsTotalPrice');
    expect(Number(itemsTotalPrice.innerText)).toEqual(31.85);
  })
  
})