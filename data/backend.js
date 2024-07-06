class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  
  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  ratingUrl(){
    return `/images/ratings/rating-${this.rating.stars*10}.png`;
  }

  giveExtraProductInfo(){
      return '';
  }

  getPrice(){
    return (this.priceCents/100).toFixed(2);
  }

} 

class Clothing extends Product{
  type;
  sizeChartLink;
  
  constructor(productDetails){
    super(productDetails);
    this.type = productDetails.type;
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  giveExtraProductInfo() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}

class Appliance extends Product{
  type;
  instructionslink;
  warrantlylink;
  
  constructor(productDetails){
    super(productDetails);
    this.type = productDetails.type;
    this.instructionslink = productDetails.instructionslink;
    this.warrantlylinks = productDetails.warrantlylink;
  }
  giveExtraProductInfo() {
    return `<a href="${this.instructionslink}" target="_blank">instructions</a>
    <a href="${this.warrantlylink}" target="_blank">warrantly</a>`;
  }
}


export async function loadProducts(){
  try{
    const response =  await fetch('https://supersimplebackend.dev/products');
    const productsData = await response.json();
    const products = productsData.map((product)=>{
      if (product.type === "clothing") {
        return new Clothing(product);
      }else if (product.type === "appliance"){
        return new Appliance(product);
      }else{
        return new Product(product);
      }
    });
    
    return products;

  } catch (err){
    console.log("erreur de chargement de l/'API ");
  }
}













