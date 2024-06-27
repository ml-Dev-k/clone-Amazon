import { cart , removeItemFromCart , saveToStorage , 
  updateCartItemQuantity , updateDeliveryOption} 
from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { products } from '../data/products.js';
import { format, addDays } from 'https://esm.sh/date-fns'


const viewDetails = document.querySelector('.details')
viewDetails.addEventListener('click',()=>{
  const paymentSummaryRows = document.querySelectorAll('.payment-summary-row');
    for (let i = 1; i <= 4; i++) {
      paymentSummaryRows[i].classList.toggle('visible');
    }
    if (viewDetails.innerText === 'show details') {
      viewDetails.innerHTML = 'hide details';
      viewDetails.style.color = 'red';
    }else{
      viewDetails.innerHTML = 'show details';
      viewDetails.style.color = 'rgb(31, 31, 255)';
    }
})

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
calculateOrderTotal();


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
    const itemID =cartItem.id;
    let matchingProduct;
    
    products.forEach((product) => {
      if (product.id === itemID ) {
        matchingProduct = product;
      }
    })
  itemHTML +=
    `
      <div class="cart-item-container">
        <p class="delivery-date">Delivery date: <span data-deliveryDate-id ="${itemID}">${GiveDeliveryDate(7)}</span></p>

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
              <p class="cart-item-quantity" data-item-quantity="${itemID}">
                 Quantity: ${cartItem.quantity}
              </p>
              <div class="updating-section">
                <p data-toggle="${itemID}" style="font-weight: 400;" class="on update" href="">Update</p>
                <div data-toggle="${itemID}" class="off update-field">
                  <input data-updated-quantity-ID="${itemID}" type="number" min="1"> 
                  <p data-toggle="${itemID}" style="display: inline;" class="save">Save</p>
                </div>
              </div>
              <p data-item-id="${itemID}" class="delete" href="">Delete</p>
            </div>
          </div>
        </div>

        <div class="delivery-section">
          <p>Choose a delivery option:</p>

          <div data-option-id = "${itemID}" class="option1">
            <input checked="checked" name="delivery-option-${itemID}"  id="1-${itemID}" type="radio">
            <label for="1-${itemID}">
              <span>${GiveDeliveryDate(7)} <br></span>
              FREE Shipping
            </label>
          </div>
          
          <div data-option-id = "${itemID}" class="option2">
            <input name="delivery-option-${itemID}" id="2-${itemID}" type="radio">
            <label for="2-${itemID}">
              <span>${GiveDeliveryDate(3)} <br></span>
              $4.99 Shipping
            </label>
          </div>

          <div data-option-id = "${itemID}" class="option3">
            <input name="delivery-option-${itemID}"  id="3-${itemID}" type="radio">
            <label for="3-${itemID}">
              <span>${GiveDeliveryDate(1)} <br></span>
              $9.99 Shipping
            </label>
          </div>
        </div>

      </div>
    `
  })

  
  let itemsList = document.querySelector('.items-list');
  itemsList.innerHTML = itemHTML;

  updateCheckedOption();
  updateNumberOfItem();



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
      calculateOrderTotal();
      //Updates quantity in the page
      document.querySelector(`[data-item-quantity="${itemID}"]`)
        .innerHTML = `Quantity ${updatedQuantity}`;
    })
  })

  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const itemId = deleteButton.dataset.itemId;
      removeItemFromCart(itemId);
      updateNumberOfItem();
      calculateOrderTotal()
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
            .innerHTML = deliveryDate.innerText;
            updateDeliveryOption(optionId,i);
            calculateOrderTotal();
        }   
      }
    })
  })

}


function updateNumberOfItem(){
  const numOfItems = document.querySelectorAll('.number-of-items');
  numOfItems[1].innerHTML = `Items (${cart.length})` 
  numOfItems[0].innerHTML = `${cart.length} Item(s)`;
}
  
function calculateOrderTotal(){
  const orderSummary = [];
  let itemsTotalPrice;
  let itemsTotalShipping;
  let totalBeforeTax;
  let tax;
  let orderTotal;

  cart.forEach((item)=>{
    let shipping;

    deliveryOptions.forEach((option)=>{
      if (item.deliveryOption === option.id) {
        shipping = option.price;
      }
    })
    products.forEach((products)=>{
      if (products.id === item.id) {
        orderSummary.push({
          quantity: item.quantity,
          shipping: shipping,
          price: products.priceCents
        })
      }
    })
  })

  itemsTotalPrice = orderSummary.reduce((sum,item)=>sum + (item.quantity*item.price),0);
  itemsTotalPrice = Number((itemsTotalPrice/100).toFixed(2));
  itemsTotalShipping = orderSummary.reduce((sum,item)=>sum + (item.shipping),0);
  itemsTotalShipping = Number((itemsTotalShipping/100).toFixed(2));
  totalBeforeTax = (itemsTotalPrice + itemsTotalShipping).toFixed(2);
  totalBeforeTax = Number(totalBeforeTax);
  tax = (totalBeforeTax * 0.1).toFixed(2);
  tax = Number(tax)
  orderTotal = (totalBeforeTax + tax).toFixed(2);

  document.querySelector('.itemsTotalPrice')
    .innerHTML = itemsTotalPrice;
  document.querySelector('.itemsTotalShipping')
    .innerHTML = itemsTotalShipping;
  document.querySelector('.totalBeforeTax')
    .innerHTML = totalBeforeTax;
  document.querySelector('.tax')
    .innerHTML = tax;
  document.querySelector('.orderTotal')
    .innerHTML = orderTotal;

}

function updateCheckedOption(){
  cart.forEach((item)=>{
    const inputID = CSS.escape(item.deliveryOption);
    document.querySelector(`#${inputID}-${item.id}`)
      .checked = true
  })
}






