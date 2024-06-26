import { cart , removeItemFromCart , saveToStorage , updateCartItemQuantity} 
from '../data/cart.js';
import { products } from '../data/products.js';
import { format, addDays } from 'https://esm.sh/date-fns'



const paypalSelector = document.querySelector('#paypal');
paypalSelector.addEventListener('click', () => {
  
  const placeOrderButton = document.querySelector('.place-order-button')
  const paypalSection = document.querySelector('.paypal-section')
  
  if (placeOrderButton.classList.contains('on')) {
    toggleElementVisibility(placeOrderButton);
  } else {
    toggleElementVisibility(paypalSection);
  }
})

generateCartItems();




// ▶Functions section 🔽

/**
 * hides Element and shows another Element
 * with the same data-Attribut 
 * 
 * @param {Element} Element 
 */
function toggleElementVisibility(Element) {
  const matchingID = Element.dataset.toggle;
  document.querySelectorAll(`[data-toggle = "${matchingID}"]`)
    .forEach((matchingElement) => {
      if (matchingElement !== Element) {
        Element.classList.replace('on', 'off');
        matchingElement.classList.replace('off', 'on')
      }
    });
}

/**
 * gives delivery-date  
 * @param {number} NumberOfDayToAdd 
 * @returns delivery-date
*/
function GiveDeliveryDate(NumberOfDayToAdd){
  let date = new Date();
  date = addDays(date , NumberOfDayToAdd)
  const deliveryDate = format(date , "EEEE, MMMM d");
  return deliveryDate;
}

function generateCartItems() {
  let itemHTML = '';
  
  cart.forEach((cartItem) => {
    const itemID =cartItem.productId;
    let matchingProduct;
    
    products.forEach((product) => {
      if (product.id === itemID ) {
        matchingProduct = product;
      }
    })
  itemHTML +=
    `
      <div class="cart-item-container">
        <p class="delivery-date">Delivery date: <span data-deliveryDate-id ="${cartItem.productId}">${GiveDeliveryDate(7)}</span></p>

        <div class="items-section">

          <div class="item-picture">
            <img src="${matchingProduct.image}" alt="">
          </div>

          <div class="item-info">
            <p>
            ${matchingProduct.name}
            </p>
            <p class="price">
            ${(matchingProduct.priceCents / 100).toFixed(2)}
            </p>
            <div class="quantity-section">
              <p class="cart-item-quantity" data-item-quantity="${cartItem.productId}">
                 Quantity: ${cartItem.quantity}
              </p>
              <div class="updating-section">
                <p data-toggle="${matchingProduct.id}" style="font-weight: 400;" class="on update" href="">Update</p>
                <div data-toggle="${matchingProduct.id}" class="off update-field">
                  <input data-updated-quantity-ID="${cartItem.productId}" type="number" min="1"> 
                  <p data-toggle="${matchingProduct.id}" style="display: inline;" class="save">Save</p>
                </div>
              </div>
              <p data-product-id="${matchingProduct.id}" class="delete" href="">Delete</p>
            </div>
          </div>
        </div>

        <div class="delivery-section">
          <p>Choose a delivery option:</p>

          <div data-option-id = "${cartItem.productId}" class="option1">
            <input checked="checked" name="delivery-option-${matchingProduct.id}"  id="1-${matchingProduct.id}" type="radio">
            <label for="1-${matchingProduct.id}">
              <span>${GiveDeliveryDate(7)} <br></span>
              FREE Shipping
            </label>
          </div>
          
          <div data-option-id = "${cartItem.productId}" class="option2">
            <input name="delivery-option-${matchingProduct.id}" id="2-${matchingProduct.id}" type="radio">
            <label for="2-${matchingProduct.id}">
              <span>${GiveDeliveryDate(3)} <br></span>
              $4.99 Shipping
            </label>
          </div>

          <div data-option-id = "${cartItem.productId}" class="option3">
            <input name="delivery-option-${matchingProduct.id}"  id="3-${matchingProduct.id}" type="radio">
            <label for="3-${matchingProduct.id}">
              <span>${GiveDeliveryDate(1)} <br></span>
              $9.99 Shipping
            </label>
          </div>
        </div>

      </div>
    `
    document.querySelector('.number-of-items')
    .innerHTML = `${cart.length} Item(s) `;
  })
  
  let itemsList = document.querySelector('.items-list');
  itemsList.innerHTML = itemHTML;
  
// ▶Events for each button of the Item 🔽
  addEventsListenerToCartItems();

}

function addEventsListenerToCartItems(){


  const updateButtons = document.querySelectorAll('.update');
  updateButtons.forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      toggleElementVisibility(updateButton);
    })
  })
  
  const saveButtons = document.querySelectorAll('.save');
  saveButtons.forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      const itemID = saveButton.dataset.toggle
      const updatedQuantitySeletor = 
      document.querySelector(`[data-updated-quantity-ID = "${itemID}"]`);
      const updatedQuantity = Number(updatedQuantitySeletor.value);
      updateCartItemQuantity(itemID , updatedQuantity)
      toggleElementVisibility(saveButton.parentElement);
      //Updates quantity in the page
      document.querySelector(`[data-item-quantity="${itemID}"]`)
        .innerHTML = `Quantity ${updatedQuantity}`;
    })
  })

  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const productId = deleteButton.dataset.productId;
      removeItemFromCart(productId);
      document.querySelector('.number-of-items')
        .innerHTML = `${cart.length} Item(s)` ;
      saveToStorage();
      generateCartItems();
    })
  })

  const deliveryOptionButtons = document.querySelectorAll('[data-option-id]');
  deliveryOptionButtons.forEach((deliveryOptionButton)=>{
    deliveryOptionButton.addEventListener('click',()=>{
      const optionId = deliveryOptionButton.dataset.optionId;
      for (let i = 1; i <= 3; i++){
        const inputRadio = document.getElementById(`${i}-${optionId}`);
        if (inputRadio.checked) {
          const deliveryDate = document.querySelector(`label[for="${i}-${optionId}"] span`)
          document.querySelector(`[data-deliveryDate-id="${optionId}"]`)
            .innerHTML = deliveryDate.innerText
        }   
      }
    })
  })
 
}





