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
          $${Math.round(product.priceCents/100)
          .toFixed(2)}
        </p>
        <div class="cart-count-selector">
          <select name="cart-count" id="cart-count">
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
        
        <button class="add-to-cart-button">
          add to Cart
        </button>
      </div>
  `
})
main.innerHTML = productsHTML;
