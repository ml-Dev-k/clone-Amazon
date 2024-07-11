import { orders } from "./orders.js";
import { loadProducts } from "../data/backend.js";
import { differenceInHours  } from 'https://esm.sh/date-fns';

document.querySelector('.search-button')
  .addEventListener('click',()=>{
    const searchBar = document.querySelector('.search-bar')
    const key = searchBar.value.trim().toLowerCase()
    window.location.href = `./amazon.html?search=${key}`;
  })

const products = await loadProducts();
console.log(orders)

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const matchingOrder = orders.find(order => order.id === orderId)
const  matchingProduct = products.find(product=>product.id === productId)
const matchingOrderProduct = matchingOrder.products.find(product => product.productId == productId)
console.log(matchingOrderProduct)


const orderTime = new Date(matchingOrder.orderTime)
console.log(orderTime)

const estimatedDeliveryTime = new Date(matchingOrderProduct.estimatedDeliveryTime)
console.log(estimatedDeliveryTime)

const currentTime = new Date()
console.log(currentTime)

const elapsedTime = differenceInHours(currentTime , orderTime);
console.log(elapsedTime)

const totalTime = differenceInHours(estimatedDeliveryTime,orderTime); 

console.log(totalTime)
let barProgress = (elapsedTime / totalTime) * 100;

console.log(barProgress); 

//barProgress = 88

const main = document.querySelector('main');
if (main) {
  main.innerHTML =`
  <div class="product-info">
      <p class="date">Arriving on : ${matchingOrderProduct.deliveryDate}</p>
      <p>${matchingProduct.name}</p>
      <P>Quantity : ${matchingOrderProduct.quantity}</P>

    </div>
    <div class="product-image">
      <img src="${matchingProduct.image}" alt="">
    </div>
    <div class="progress-bar">
      <div class="progress-bar-label">
        <p>Preparing</p>
        <p>Shipped</p>
        <p>Delivered</p>
      </div>
      <div class="bar-line">
        <div class="preparing"></div>
        <div class="shipped"></div>
        <div class="delivered"></div>
      </div>
    </div>
  `
}

function addWidth(elem , wth){
  let width = 0
  let intervalId = setInterval(()=>{
    width += 0.1;
    if (width >= wth) {
      clearInterval(intervalId)
    }
    elem.style.width = `${width}%`
  },1)
}

const barLineFragments = document.querySelectorAll('.bar-line div');

if (barProgress === 0) {
  barLineFragments[0].style.width = `1%`;
}else if (barProgress <= 33.3333) {
  addWidth(barLineFragments[0] , barProgress);
}else if(barProgress > 33.3333 && barProgress <= 66.6666){
  addWidth(barLineFragments[0] , 33.3333);
  addWidth(barLineFragments[1] , (barProgress-33.3333));
}else if (barProgress > 66.6666){
  addWidth(barLineFragments[0] , 33.3333);
  addWidth(barLineFragments[1] , 33.3333);
  addWidth(barLineFragments[2] , (barProgress-66.6666));
}

/*
if (barProgress === 0) {
  barLineFragments[0].style.width = `1%`;
}else if (barProgress <= 33.3333) {
  barLineFragments[0].style.width = `${barProgress}%`;
}else if(barProgress > 33.3333 && barProgress <= 66.6666){
  barLineFragments[0].style.width = `33.3333%`;
  barLineFragments[1].style.width = `${barProgress-33.3333}%`;
}else if(barProgress > 66.6666){
  barLineFragments[0].style.width = `33.3333%`;
  barLineFragments[1].style.width = `33.3333%`;
  barLineFragments[2].style.width = `${barProgress-66.6666}%`;
}
*/




