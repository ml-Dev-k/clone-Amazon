import { Cart} from '../data/cart.js';
//import { products } from '../data/products.js';
import { loadProducts } from '../data/backend.js';

const products = await loadProducts()

const cart = new Cart();
//Loading products in amazon page.
generateProducts(products);

addToCart();
function addToCart(){
  document.querySelectorAll('.add-to-cart-button')
  .forEach((addToCartButton)=>{
    addToCartButton.addEventListener('click',()=>{
      const productId =  addToCartButton.dataset.productId;
      cart.addProductToCart(productId);
      updateCartCount();
    })
  })
}

document.querySelector('.search-button')
  .addEventListener('click',()=>{
    const searchBar = document.querySelector('.search-bar')
    const key = searchBar.value.trim().toLowerCase()
    window.location.href = `./amazon.html?search=${key}`;
  })

renderSearchedKey();

function renderSearchedKey(){
  let filteredProducts;
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');
  if (search) {
    filteredProducts = products.filter((product)=>{
    return product.keywords.includes(search);
  })
  generateProducts(filteredProducts);
  addToCart();
  updateCartCount();
}
 if (filteredProducts && filteredProducts.length === 0) {
   document.querySelector('main')
     .innerHTML = '<p class="search-result"> No products matched your search.</p>'
 }
}


// ▶Functions section 🔽

function generateProducts(datas){
  let productsHTML = '';
  const main = document.querySelector('main');

  updateCartCount();

  datas.forEach((data)=>{
    productsHTML +=
    `
      <div class="container">
        <div class="product-picture">
          <img class="product-picture" src="/${data.image}" alt="">
        </div>
          <p>
            ${data.name}
          </p>
          <p class="rating">
            <img class="rating-img" src="${data.ratingUrl()}" alt=""> <span>${data.rating.count}</span>
          </p>
          <p class="price">
            $${data.getPrice()}
          </p>
      <div class="cart-count-selector">
        <select name="cart-count" id="${data.id}">
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
      ${data.giveExtraProductInfo()}

      <button class="add-to-cart-button" data-product-id= "${data.id}">
        add to Cart
      </button>
    </div>

    `
    })
    main.innerHTML = productsHTML;
}

function updateCartCount(){
  let cartCount = cart.cartItems.reduce((sum , product)=> sum + product.quantity, 0);
  document.querySelector('.cart-quantity')
    .innerHTML = cartCount;
}

