//import {products} from '../data/products.js';
import { loadProducts } from "../data/backend.js";

const products = await loadProducts();
console.log(products)


/*const cart = JSON.parse(localStorage.getItem('cart'));
let cartCount = cart.reduce((sum , product)=> sum + product.quantity, 0);
if (document.querySelector('.cart-quantity')) {
  document.querySelector('.cart-quantity').innerHTML = cartCount;
}*/

const orders = JSON.parse(localStorage.getItem('orders')) || []

export function addOrder(order){
  orders.unshift(order)
  localStorage.setItem('orders',JSON.stringify(orders));
}

console.log(orders)
const mainOrder = document.querySelector('.main');


for (let i = 0; i < orders.length; i++) {
  const order = orders[i]
    
  const orderSection = document.createElement('div');
  orderSection.classList.add('order-section');
  const orderContainer = document.createElement('div');
  orderContainer.classList.add('order-container');
  
  orderContainer.innerHTML = `
  <div class="order-info">
    <div>
      <p class="bold">Order Placed</p>
      <p>${order.orderDate}</p>
    </div>
    <div>
      <p class="bold">Total</p>
      <p>$${(order.totalCostCents/100).toFixed(2)}</p>
    </div>
    <div>
      <p class="bold">Order ID:</p>
      <p>${order.id}</p>
    </div>
  </div>
  `


  let matchingProduct;
  let prod;

    for (let i = 0; i < order.products.length; i++) {
      prod = order.products[i];
      console.log(order.products)

        for (let i = 0; i < products.length; i++) {
          let product = products[i];
          if (product.id === prod.productId ) {
            matchingProduct = product;
            break
          } 
        }
        
    //console.log(matchingProduct)
  

    orderContainer.innerHTML += `
    <div class="items-section">

    <div class="item-picture">
      <img src="${matchingProduct.image}" alt="">
    </div>

    <div class="item-info">
      <div class="item-details">
        <p class="bold">
          ${matchingProduct.name}
        </p>
        <p class="price">
          Arriving on: ${prod.deliveryDate}
        </p>
        <p>Quantity : ${prod.quantity}</p>
        <div class="buy-again-btn">
          <img src="/images/icons/buy-again.png" alt="">
          <p>Buy it again</p>
        </div>

      </div>
      <div>
        <button class="track-package">Track package</button>
      </div>
    </div>
  </div>`
  }

  
  orderSection.append(orderContainer);
  if (mainOrder) {
    mainOrder.append(orderSection);
  }
}
  






