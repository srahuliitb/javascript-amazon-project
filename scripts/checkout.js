import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // This is default export
import isSatSun from "./exercises/15f.js"; // We can rename a default export wehen we import.
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFromBackend, loadProductsFromBackendFetch } from "../data/products.js";

import { loadCartFromBackend } from "../data/cart.js";

// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js'

// 'aysnc' makes a function return a promise. It also lets us use 'await'
// 'async' can only be used with promises
async function loadPage() {
  try {
    // 'await' lets us wait for a promise to finish before going to the next line
    // 'await' lets us write asynchronous code like a normal code
    // 'await' only works inside an async function & the following function must be a promise
    await loadProductsFromBackendFetch(); 
    await new Promise((resolve) => { // loadCartFromBackend is not a promise, so we had to create a promise to use 'await'
      loadCartFromBackend(() => {
        resolve();
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later');
  }
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
Promise.all([
  // new Promise((resolve) => {
  //   loadProductsFromBackend(() => {
  //     resolve('value1');
  //   });
  // }),
  loadProductsFromBackendFetch(),
  new Promise((resolve) => {
    loadCartFromBackend(() => {
      resolve();
    })
  })

]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => { // Promises keeps our code flat and avoid too much nesting.
  loadProductsFromBackend(() => {
    resolve(); // Resolve lets us control when to go to the next step
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProductsFromBackend(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

// renderCheckoutHeader();
// renderOrderSummary();
// renderPaymentSummary();

const date = dayjs().format('dddd');
console.log(isSatSun(date));