import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';
const main = document.querySelector('main');

//Loading products in amazon page.

products.forEach((product)=>{
  productsHTML +=
  `
    <div class="container">
      <div class="product-picture">
        <img class="product-picture" src="/${product.image}" alt="">
      </div>
        <p>
          ${product.name}
        </p>
        <p class="rating">
          <img class="rating-img" src="/images/ratings/rating-${product.rating.stars*10}.png" alt=""> <span>${product.rating.count}</span>
        </p>
        <p class="price">
          $${(product.priceCents/100)
          .toFixed(2)}
        </p>

  ${/* Each select gets a unique ID based on product.id 
  to know which product will be added to the cart*/ ""}
  
  <div class="cart-count-selector">
          <select name="cart-count" id="${product.id}">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
            </div>
            
  ${/* Each add-to-cart-button gets a data attribut based on product.id to know which select it refers*/ ""}
        <button class="add-to-cart-button" data-product-id= "${product.id}">
          add to Cart
        </button>
        </div>
        `
      })
      main.innerHTML = productsHTML;

     
/**
 * adds product to cart
 * 
 * it also updates the count of the items in the cart 
 * 
 * @param {HTMLButtonElement} addBtn 
 */

function addProductToCart(addBtn){
  let ProductExistInCart = false;

      const productId =  addBtn.dataset.productId;
      const quantity = Number(document.getElementById(`${productId}`).value) 

      cart.forEach((product)=>{
        if (product.productId === productId) {
          product.quantity = quantity
          ProductExistInCart = true;
        }
      })
      if (!ProductExistInCart) {
        cart.push({
          productId: productId,
          quantity: quantity
        })
      }

      //taking each product with quantity = 0 out of the cart
      const newCart = cart.filter(product=>product.quantity > 0);
      cart.length = 0;
      cart.push(...newCart);
      
      
      console.clear();
      console.log(cart);
      
    }

//updating the cart-count 

function updateCartCount(){
  let cartCount = cart.reduce((sum , product)=> sum + product.quantity, 0);
      
  document.querySelector('.cart-quantity')
    .innerHTML = cartCount;
}

document.querySelectorAll('.add-to-cart-button')
  .forEach((addToCartButton)=>{
    addToCartButton.addEventListener('click',()=>{
      addProductToCart(addToCartButton);
      updateCartCount();

    })
  })
