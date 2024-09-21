// let AddToCart = document.querySelector('.add-to-cart');
// let cartContent = document.querySelector('.cart-content');

// AddToCart.addEventListener('click',function (){
 
//     cartContent.style.display = 'none';
//     let listItem = document.createElement('li');

// });

 


function AddToCart(clickedButton) {   // clicked button is the tag where i clicked

   // find the parent of the clicked button (the product )
    let product = clickedButton.closest('.product');
    let numID = Number(product.id);
     let numberOfProducts = numberOfClickedProducts(product);  // return the array that contains number of products
      
  // find the content inside the h5 tag which will be the product name 
   let name = product.querySelector('h5').textContent;
   // find the content inside the span which is class nemed price which will be the product price
   let price = product.querySelector('.price').textContent;

   let intPrice = Number(price.substr(1));
    // the place where i will the created productinfo
   let cartContent = document.querySelector('.cart-content');
   let existingProduct = document.querySelector(`.productInfo[data-id="${numID}"]`);
    if (numberOfProducts[numID] === 1){
    // i will create li to represent the description about product 
    let productInfo = document.createElement('li');
    productInfo.className = "productInfo";
    productInfo.setAttribute('data-id', numID);
    productInfo.innerHTML = `
    <p class="p3" > ${name} </p>
    <p class="p4" >
     <span class="text-danger">  ${numberOfProducts[numID]}X </span>
     <span class="ms-1"> @  ${price} </span>
     <span class="ms-1" > $${(intPrice * numberOfProducts[numID] ).toFixed(2)} </span>
    </p> 
    <i class="fa-regular fa-circle-xmark delete"></i>
    <div class="line"></div>
    `;
      
    document.querySelector('.cart-items').appendChild(productInfo); 
    // cartContent.style.display = 'none'; 

       // remove product from the cart ...
    productInfo.querySelector(".delete").addEventListener('click',function() {
      numberOfProducts[numID] = 0; 
      productInfo.remove();
      
    })
     }  else {
    
      let quantityElement = existingProduct.querySelector('.p4 span:first-child');
      let totalpriceElement = existingProduct.querySelector('.p4 span:last-child');
            // Update the quantity and total price
      quantityElement.innerHTML = `${numberOfProducts[numID]}X`;
      totalpriceElement.innerHTML = `$${(intPrice * numberOfProducts[numID]).toFixed(2)}`;
      
     }

     ++productCount;
     document.querySelector('.p1 span').innerHTML = `${productCount}`;

     if (productCount === 0)
     {
      cartContent.style.display = 'block';
     }
     else {
      cartContent.style.display = 'none';
      document.querySelector('.confirm-order').style.display = 'block';
     }
     
    
}





var arr = new Array(10).fill(0);
var productCount = 0;

// function for counting the number i clicked on product to add to cart ..

function numberOfClickedProducts ( productt) {
  // console.log(arr);
  let numID = Number(productt.id);
  arr[numID] += 1;  
  return arr;
}



function calculateTotalPrice () {
  
}