'use strict';

var arr = new Array(10).fill(0);
var sumArray = new Array(10).fill(0);
var productsArray = [];
var productsPrice = 0;
var productCount = 0;
var clickedImagee = false;

function AddToCart(clickedButton) {
  // clicked button is the tag where i clicked

  // find the parent of the clicked button (the product )
  let product = clickedButton.closest('.product');
  let numID = Number(product.id);
  var numberOfProducts = numberOfClickedProducts(product);
  // return the array that contains number of products
  var productImg = product.querySelector('img');

  // find the content inside the h5 tag which will be the product name
  let name = product.querySelector('h5').textContent;
  // find the content inside the span which is class nemed price which will be the product price
  let price = product.querySelector('.price').textContent;
  let intPrice = Number(price.substr(1));
  var totalPrice = Number((intPrice * numberOfProducts[numID]).toFixed(2));
  // the place where i will the created productinfo
  var cartContent = document.querySelector('.cart-content');
  let existingProduct = document.querySelector(
    `.productInfo[data-id="${numID}"]`
  );
  if (numberOfProducts[numID] === 1) {
    // i will create li to represent the description about product
    var productInfo = document.createElement('li');
    productInfo.className = 'productInfo';
    productInfo.setAttribute('data-id', numID);
    productInfo.innerHTML = `
    <p class="p3" > ${name} </p>
    <p class="p4" >
     <span class="text-danger">  ${numberOfProducts[numID]}X </span>
     <span class="ms-1"> @  ${price} </span>
     <span class="ms-1" > $${totalPrice} </span>
    </p> 
    <i class="fa-regular fa-circle-xmark delete"></i>
    <div class="line"></div>
    `;

    document.querySelector('.cart-items').appendChild(productInfo); // append the li into cart
    sumArray[numID] = totalPrice; // upate each with new price as number encreases
    calculateTotalPrice();

    productsArray.push(productInfo);

    // remove product from the cart ...
    productInfo.querySelector('.delete').addEventListener('click', function () {
      // numberOfProducts[numID] = 0;
      deletedProduct(product);
      productInfo.remove();
      viewOrRemove();
    });
  } else {
    var quantityElement = existingProduct.querySelector('.p4 span:first-child');
    let totalpriceElement = existingProduct.querySelector(
      '.p4 span:last-child'
    );
    // Update the quantity and total price
    quantityElement.innerHTML = `${numberOfProducts[numID]}X`;
    totalpriceElement.innerHTML = `$${totalPrice.toFixed(1)}`;
    sumArray[numID] = totalPrice;
    calculateTotalPrice();
  }

  ++productCount;
  document.querySelector('.p1 span').innerHTML = `${productCount}`;
  viewOrRemove();
}

// function for counting the number i clicked on product to add to cart ..

function numberOfClickedProducts(productt) {
  // console.log(arr);
  let numID = Number(productt.id);
  arr[numID] += 1;
  return arr;
}

// function to calculate of total price to all products that bought

function calculateTotalPrice() {
  let sum = 0;
  sumArray.forEach((value) => {
    sum += value;
    
  });
 
  document.querySelector('.total').innerHTML = ` $${sum}`;
  return sum ;
}

function calculateTotalPrice2( price ,id) {
  let summ = calculateTotalPrice();
  summ-=price;
  sumArray[id]-=price;
  --productCount;
  
  
  document.querySelector('.total').innerHTML = ` $${summ}`;
}

// un updated function after deletion the items from cart
function deletedProduct(product) {
  //
  let numID = Number(product.id);
  let addToCART = product.querySelector('.add-to-cart');
   let count = addToCART.querySelector('.count');
  productCount -= arr[numID];
  document.querySelector('.p1 span').innerHTML = `${productCount}`;
  sumArray[numID] = 0;
  calculateTotalPrice();
  arr[numID]= 0;
  console.log (count);
     if (count != null) { addToCART.querySelector('.count').innerHTML = `${arr[numID]}`; }
 

}

function viewOrRemove() {
  if (productCount === 0) {
    document.querySelector('.cart-content').style.display = 'block';
    document.querySelector('.confirm-order').style.display = 'none';
  } else {
    document.querySelector('.cart-content').style.display = 'none';
    document.querySelector('.confirm-order').style.display = 'block';
  }
}

let button = document.querySelector('.btn1');
let submission = document.querySelector('.submission');
let cover = document.querySelector('.cover');

button.addEventListener('click', function () {
  submission.style.display = 'block';
  cover.style.display = 'block';
});



let btn = document.querySelector('.btn2');
let products = document.querySelectorAll('.productInfo');
btn.addEventListener('click', function () {
  submission.style.display = 'none';
  cover.style.display = 'none';

  // productsArray has all productinfo that i had created and this for looping and delete them all
  productsArray.forEach((productinfo) => {
    let id = productinfo.getAttribute('data-id');
    let product = document.getElementById(id)
    deletedProduct(product);   
    productinfo.remove();
  });
  
  // make all arrays and variables with zero values like the begining to start new order
  arr = new Array(10).fill(0);
  sumArray = new Array(10).fill(0);
  productsArray = [];
  productsPrice = 0;
  productCount = 0;
  viewOrRemove();
  document.querySelector('.p1 span').innerHTML = `${productCount}`;
});



  // this function for clicking the image to enable user increase and decrease and showing the amount of product ...

function clickedImage(imageSelector, id) {
  let img = document.querySelector(imageSelector);
  let numID = id;
  let addToCART = img.parentElement.querySelector('.add-to-cart');
   
  img.addEventListener('click', function () {
    // Check if it's already selected
    if (!clickedImagee) {
      // First time click (select and apply styles)
      img.style.border = '3px solid hsl(13, 59%, 53%)';
      addToCART.style.backgroundColor = 'hsl(13, 59%, 53%)';
      addToCART.querySelector('i').style.display = 'none';
      addToCART.querySelector('span').style.display = 'none';
      addToCART.style.display = 'flex'; 
      addToCART.querySelector('.minus').style.display = 'block';
      addToCART.querySelector('.plus').style.display = 'block';
      addToCART.querySelector('.count').style.display = 'block'; // Ensure count is visible
      addToCART.querySelector('.count').innerHTML = ` ${arr[numID]}`;  // showing the amount of clicking product
      clickedImagee = true;
    } else {
      // Second time click (reset styles)
      deletedLastUpdates(imageSelector); 
      clickedImagee = false;
    }
  });
}



 // calling function for all products ....
clickedImage('.Waffle img', 1);
clickedImage('.Creme img', 2);
clickedImage('.Macaron img', 3);
clickedImage('.Tiramisu img', 4);
clickedImage('.Baklava img', 5);
clickedImage('.Pie img', 6);
clickedImage('.Cake img', 7);
clickedImage('.Brownie  img', 8);
clickedImage('.Panna-cotta img', 9);

let plusArray = document.querySelectorAll('.plus');
plusArray.forEach(function (plusIcon) {
  plusIcon.addEventListener('click', function () {
    let count = plusIcon.parentElement.querySelector('.count');
    let numId = Number(plusIcon.closest('.product').id);
    count.innerHTML = ` ${arr[numId]}`;
  });
});




  // this function for when  user re-click image to return to initial state ....
function deletedLastUpdates(selectedImage) {
  let img = document.querySelector(selectedImage);
  let addToCART = img.parentElement.querySelector('.add-to-cart');
  
  // Reset all styles back to default
  img.style.border = '0';
  addToCART.style.backgroundColor = 'white';
  addToCART.querySelector('i').style.display = 'block';
  addToCART.querySelector('i').style.padding = '3px 0px 0px 10px'; 
  addToCART.querySelector('span').style.display = 'block';
  addToCART.querySelector('span').style.paddingLeft = '12px';
  addToCART.querySelector('.minus').style.display = 'none';
  addToCART.querySelector('.plus').style.display = 'none';
  addToCART.querySelector('.count').style.display = 'none'; // Hide count again
}

let minusArray = document.querySelectorAll('.minus');
minusArray.forEach(function (minusIcon) {
  minusIcon.addEventListener('click', function () {
    let numId = Number(minusIcon.closest('.product').id); // Get the product ID
    let countElement = minusIcon.parentElement.querySelector('.count'); // Get the count display
    let currentCount = arr[numId]; // Get the current count for this product

    // Check if the count is greater than 0 before decrementing
    if (currentCount > 0) {
      arr[numId] -= 1; // Decrease the count for this product
      countElement.innerHTML = ` ${arr[numId]}`; // Update the displayed count

      // Update the quantity displayed in the cart
      let productInfo = document.querySelector(`.productInfo[data-id="${numId}"]`);
      if (productInfo) {
        let quantityElement = productInfo.querySelector('.p4 span:first-child'); // Access the quantity element
        quantityElement.innerHTML = `${arr[numId]}X`; // Update quantity in cart

        // Update the total price for this product
        let priceElement = productInfo.querySelector('.p4 span:last-child'); // Access the total price element
        let price = Number(minusIcon.closest('.product').querySelector('.price').textContent.substring(1)); // Get the product price
        let totalPrice = (arr[numId] * price).toFixed(2); // Calculate new total price
        
        priceElement.innerHTML = `$${totalPrice}`; // Update the total price in the cart
      }
     
      // If the count reaches 0, remove the product from the cart
     
      let price = Number(minusIcon.closest('.product').querySelector('.price').textContent.substring(1));
      calculateTotalPrice2(price,numId ); // Update the total price in the cart
      let count = document.querySelector('.p1 span').innerHTML=`${productCount}`;

      if (arr[numId] === 0) {
        let productInfo = document.querySelector(`.productInfo[data-id="${numId}"]`);
        if (productInfo) {
          productInfo.remove(); // Remove the product from the cart
          productsArray.splice(productsArray.indexOf(productInfo), 1); // Remove from the productsArray
        }
        deletedProduct(minusIcon.closest('.product')); // Call the deletedProduct function
      }
      viewOrRemove();
    }
  });
});


