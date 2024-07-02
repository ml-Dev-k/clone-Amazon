import { renderCartItems } from './checkout/renderCartItems.js';
import { renderOrderSummary } from './checkout/renderOrderSummary.js';
import { Cart } 
from '../data/cart.js';
//import { format, addDays } from 'https://esm.sh/date-fns';

const cart = new Cart();

renderOrderSummary();
renderCartItems();





// ▶Functions section 🔽

/**
 * hides Element and shows another Element
 * with the same data-Attribut 
 * 
 * @param {Element} Element 
 */
export function toggleElementVisibility(Element) {
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
/*export function GiveDeliveryDate(NumberOfDayToAdd){
  let date = new Date();
  date = addDays(date , NumberOfDayToAdd)
  const deliveryDate = format(date , "EEEE, MMMM d");
  return deliveryDate;
}*/

export function updateNumberOfItem(){
  document.addEventListener('DOMContentLoaded',()=>{
    const numOfItems = document.querySelectorAll('.number-of-items');
    numOfItems[1].innerHTML = `Items (${cart.cartItems.length})` 
    numOfItems[0].innerHTML = `${cart.cartItems.length} Item(s)`;
  })
}

export function updateCheckedOption(){
  cart.cartItems.forEach((item)=>{
    const inputID = CSS.escape(item.deliveryOption);
    document.querySelector(`#${inputID}-${item.id}`).checked = true
  })
}


