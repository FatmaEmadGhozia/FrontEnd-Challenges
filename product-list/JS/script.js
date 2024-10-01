




var arr = new Array(10).fill(0);
var sumArray = new Array(10).fill(0);
var productsArray = [];
var productsPrice = 0;
var productCount= 0;
 


function AddToCart(clickedButton) {   // clicked button is the tag where i clicked

   // find the parent of the clicked button (the product )
    let product = clickedButton.closest('.product');
    var numID = Number(product.id);
    let numberOfProducts = numberOfClickedProducts(product);
      // return the array that contains number of products
      var productImg = product.querySelector('img');
      
  // find the content inside the h5 tag which will be the product name 
   let name = product.querySelector('h5').textContent;
   // find the content inside the span which is class nemed price which will be the product price
   let price = product.querySelector('.price').textContent;
   let intPrice = Number(price.substr(1));
   var totalPrice = Number((intPrice * numberOfProducts[numID]).toFixed(2)) ;
    // the place where i will the created productinfo
   var cartContent = document.querySelector('.cart-content');
   let existingProduct = document.querySelector(`.productInfo[data-id="${numID}"]`);
    if (numberOfProducts[numID] === 1){
    // i will create li to represent the description about product 
    var productInfo = document.createElement('li');
    productInfo.className = "productInfo";
    productInfo.setAttribute('data-id', numID);
    productInfo.innerHTML = `
    <p class="p3" > ${name} </p>
    <p class="p4" >
     <span class="text-danger">  ${numberOfProducts[numID]}X </span>
     <span class="ms-1"> @  ${price} </span>
     <span class="ms-1" > $${(totalPrice)} </span>
    </p> 
    <i class="fa-regular fa-circle-xmark delete"></i>
    <div class="line"></div>
    `;
      
    document.querySelector('.cart-items').appendChild(productInfo);   // append the li into cart 
    sumArray[numID] = totalPrice;       // upate each with new price as number encreases
    calculateTotalPrice();


      productsArray.push(productInfo);


     // remove product from the cart ...
     productInfo.querySelector(".delete").addEventListener('click',function() {
      // numberOfProducts[numID] = 0; 
       deletedProduct(product);
      productInfo.remove(); 
          viewOrRemove();
    
    });

    productImg.addEventListener('click' ,function(){
        product.querySelector('i').classList.toggle('d-none');
        product.querySelector('span').classList.toggle('d-none');
    });




    
     }  else {
    
      let quantityElement = existingProduct.querySelector('.p4 span:first-child');
      let totalpriceElement = existingProduct.querySelector('.p4 span:last-child');
            // Update the quantity and total price
      quantityElement.innerHTML = `${numberOfProducts[numID]}X`;
      totalpriceElement.innerHTML = `$${(totalPrice)}`;
      sumArray[numID] = totalPrice;
      calculateTotalPrice(); 
  
      
      
     }

     ++productCount; 
      document.querySelector('.p1 span').innerHTML = `${productCount}`;
      viewOrRemove() ;

    
}






// function for counting the number i clicked on product to add to cart ..

function numberOfClickedProducts ( productt) {
  // console.log(arr);
  let numID = Number(productt.id);
  arr[numID] += 1;  
  return arr;
}


  // function to calculate of total price to all products that bought 

function calculateTotalPrice() {
  let sum = 0;
  sumArray.forEach( (value) => {
    sum += value;
   }) ;

  document.querySelector('.total').innerHTML = ` $${sum}`; 
  
    
}

 // un updated function after deletion the items from cart 
function deletedProduct(product) {      // 
  let numID = Number(product.id);
  productCount -= arr[numID]; 
  document.querySelector('.p1 span').innerHTML = `${productCount}`;
  sumArray[numID] = 0;
  calculateTotalPrice();
  arr[numID] = 0; 

    }
   
    
function viewOrRemove() {
  if (productCount === 0 )
    {
      document.querySelector('.cart-content').style.display = 'block';
     document.querySelector('.confirm-order').style.display = 'none';
    }
    else {
      document.querySelector('.cart-content').style.display = 'none';
     document.querySelector('.confirm-order').style.display = 'block';
    }
}


  let button = document.querySelector('.btn1');
  let submission = document.querySelector('.submission');
  let cover = document.querySelector('.cover');
  
  button.addEventListener('click' ,function(){
    submission.style.display ='block';
    cover.style.display ='block';

  })
  let btn = document.querySelector('.btn2');
  let products = document.querySelectorAll('.productInfo')
  btn.addEventListener('click' ,function(){
    submission.style.display ='none';
    cover.style.display ='none';
   
          // productsArray has all productinfo that i had created and this for looping and delete them all 
    productsArray.forEach( (product) => {
      deletedProduct(product);
      product.remove(); 
          
    } );
        // make all arrays and variables with zero values like the begining to start new order
        arr = new Array(10).fill(0);
        sumArray = new Array(10).fill(0);
        productsArray = [];
        productsPrice = 0;
        productCount= 0; 
     viewOrRemove();
     document.querySelector('.p1 span').innerHTML = `${productCount}`;
   

  });
  

