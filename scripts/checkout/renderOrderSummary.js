import { deliveryOptions } from '../../data/deliveryOptions.js';
import { cart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { toggleElementVisibility } from '../checkout.js';

export function renderOrderSummary(){
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
  
  
  document.querySelector('.pay-section')
    .innerHTML = `
    <div class="payment-summary">
      
     <div class="payment-summary-row payment-summary-title">
      <p>Order Summary</p>
      <p class="details">show details</p>
      </div>
      
      <div class="payment-summary-row">
        <div class="number-of-items">Items (${cart.length}):</div>
        <div class="itemsTotalPrice">$${itemsTotalPrice}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="underlined itemsTotalShipping">$${itemsTotalShipping}<br></div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="totalBeforeTax">$${totalBeforeTax}</div>
      </div>
      
      <div class="underlined payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="tax">$${tax}</div>
      </div>
      
      <div class="payment-summary-row">
        <div>Order total:</div>
        <div class="orderTotal">$${orderTotal}</div>
      </div>

      <div class="payment-summary-row">
        <div class="paypal-option">
          <p>Use Paypal</p>
          <input id="paypal" type="checkbox">
        </div>
      </div>

      <button data-toggle="paymentOption" class="on place-order-button">
        Place your order
      </button>

      <div data-toggle="paymentOption" class="off paypal-section">
        <button class="paypal-button">
          <img src="/images/icons/paypal-logo.svg" alt="">
        </button>
        <button class="bank-card-button">
          <img src="/images/icons/bank-card-logo.svg" alt="">
          <p>carte banquaire</p>
        </button>
        <div>
          <p class="optimizer-info">Optimisé par <img src="/images/icons/paypal-logo.svg" alt=""></p>
        </div>
      </div>
     </div>
    `
 addEventListenerToOrderSummary()
}

function addEventListenerToOrderSummary(){
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

}








