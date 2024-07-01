import { GiveDeliveryDate , updateCheckedOption , updateNumberOfItem , toggleElementVisibility } from "../checkout.js";
import { renderOrderSummary } from "./renderOrderSummary.js";
import { cart , removeItemFromCart , saveCartToStorage , 
updateCartItemQuantity , updateDeliveryOption  } from '../../data/cart.js';
import { products } from '../../data/products.js';


export function renderCartItems() {
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
                  <input data-updated-quantity-ID="${itemID}" type="number" value="1" min="1"> 
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
  if (itemsList) {
    itemsList.innerHTML = itemHTML;
  }

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
      renderOrderSummary();
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
      renderOrderSummary()
      saveCartToStorage();
      renderCartItems();

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
            renderOrderSummary();
        }   
      }
    })
  })

}