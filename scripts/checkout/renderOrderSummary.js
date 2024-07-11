import { deliveryOptions } from '../../data/deliveryOptions.js';
import { Cart } from '../../data/cart.js';
import { toggleElementVisibility , updateNumberOfItem } from './checkout.js';
//import { products } from '../../data/products.js';
import { loadProducts } from '../../data/backend.js';
import { GiveDate } from "./checkout.js";
import { addOrder } from '../orders.js';

const products = await loadProducts();
const cart = new Cart();

export function renderOrderSummary(){
  cart.loadCartFromStorage();

  const orderSummary = [];
  let itemsTotalPrice;
  let itemsTotalShipping;
  let totalBeforeTax;
  let tax;
  let orderTotal;

  cart.cartItems.forEach((item)=>{
    let shipping;

    deliveryOptions.forEach((option)=>{
      if (item.deliveryOptionId === option.id) {
        shipping = option.price;
      }
    })
    products.forEach((products)=>{
      if (products.id == item.productId) {
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

  updateNumberOfItem();
  
}

export function addEventListenerToOrderSummary(){
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

  const placeOrderButton = document.querySelector('.place-order-button')
  placeOrderButton.addEventListener('click', async ()=>{
    if (cart.cartItems.length !== 0) {
      
    try{
      const response = await fetch('https://supersimplebackend.dev/orders' , {
        method: 'POST',
        headers: {
         'content-type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cartItems
        })
      })
      const order = await response.json();
      order.orderDate = GiveDate();
      let matchingProd
      for (let i = 0; i < order.products.length; i++) {
        const id = order.products[i].productId;
        console.log(id);
        for (let i = 0; i < cart.cartItems.length; i++) {
          let prod = cart.cartItems[i];
          console.log(prod)
          if (id === prod.productId ) {
            matchingProd = prod;
            break
          } 
        }

        deliveryOptions.forEach((delivOp)=>{
          if (delivOp.id === matchingProd.deliveryOptionId) {
            order.products[i].deliveryDate = GiveDate(delivOp.deliveryDays);
          }
        })
      }
      addOrder(order);
      window.location.href = './order.html'
      localStorage.removeItem('cart');

    } catch(error){
      console.log("Error de chargement de l'API , Ressayez plus tard");

    }
  }

  })

}


