let productsHTML = '';
const main = document.querySelector('main');


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
        <div class="cart-count-selector">
          <select name="cart-count" id="${product.id}">
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
        
        <button class="add-to-cart-button" data-product-id= "${product.id}">
          add to Cart
        </button>
        </div>
        `
      })
      main.innerHTML = productsHTML;
      
      /* add-button-cart interaction*/

document.querySelectorAll('.add-to-cart-button')
  .forEach((addButton)=>{
    addButton.addEventListener('click',()=>{
      let ProductExistInCart = false;

      const productId =  addButton.dataset.productId;
      const quantity = Number(document.getElementById(`${productId}`).value) 

      cart.forEach((product)=>{
        if (productId === product.productId) {
          product.quantity += quantity
          ProductExistInCart = true;
        }
      })
      if (!ProductExistInCart) {
        cart.push({
          productId: productId,
          quantity: quantity
        })
      }
      let cartCount = cart.reduce((sum , product)=> sum + product.quantity, 0);
     
      document.querySelector('.cart-quantity')
        .innerHTML = cartCount;
    })
    
  })
