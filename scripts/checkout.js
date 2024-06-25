import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

generateCartItems();


// ▶Functions section 🔽

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
        <p class="delivery-date">Delivery date: <span class="date-of-delivery">Tuesday, July 2</span></p>

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
              Quantity: ${cartItem.quantity} 
              <div class="update-quantity">
                <p data-toggle="${matchingProduct.id}" style="font-weight: 400;" class="on update" href="">Update</p>
                <div data-toggle="${matchingProduct.id}" class="off update-field">
                  <input type="number" min="1"> 
                  <p data-toggle="${matchingProduct.id}" style="display: inline;" class="save">Save</p>
                </div>
              </div>
              <p id="${matchingProduct.id}" class="delete" href="">Delete</p>
            </div>
          </div>
        </div>

        <div class="delivery-section">
          <p>Choose a delivery option:</p>
          <div class="option1">
            <input checked="checked" name="delivery-option-${matchingProduct.id}"  id="1-${matchingProduct.id}" type="radio">
            <label for="1-${matchingProduct.id}">
              <span>Tuesday, july1 <br></span>
              FREE Shipping
            </label>
          </div>
          
          <div class="option2">
            <input name="delivery-option-${matchingProduct.id}" id="2-${matchingProduct.id}" type="radio">
            <label for="2-${matchingProduct.id}">
              <span>Tuesday, july <br></span>
              $4.99 Shipping
            </label>
          </div>

          <div class="option3">
            <input name="delivery-option-${matchingProduct.id}"  id="3-${matchingProduct.id}" type="radio">
            <label for="3-${matchingProduct.id}">
              <span>Tuesday, july3 <br></span>
              $9.99 Shipping
            </label>
          </div>
        </div>

      </div>
    `

  })

  let itemsList = document.querySelector('.items-list');
  itemsList.innerHTML = itemHTML;


  const updateButtons = document.querySelectorAll('.update');
  updateButtons.forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      toggleElementVisibility(updateButton);
    })
  })


  const saveButtons = document.querySelectorAll('.save');
  saveButtons.forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      toggleElementVisibility(saveButton.parentElement);
    })
  })

  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const BtnID = deleteButton.id;
      const newCart = cart.filter(item => item.productId !== BtnID);
      cart.length = 0;
      cart.push(...newCart);
      generateCartItems();
    })
  })

  const paypalSelector = document.querySelector('.paypal-option input[type=checkbox]');
  paypalSelector.addEventListener('click', () => {

    const placeOrderButton = document.querySelector('.place-order-button')
    const paypalSection = document.querySelector('.paypal-section')

    if (placeOrderButton.classList.contains('on')) {
      toggleElementVisibility(placeOrderButton);
    } else {
      toggleElementVisibility(paypalSection);
    }
  })

}

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





