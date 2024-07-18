import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // This is default export
import isSatSun from "./exercises/15f.js"; // We can rename a default export wehen we import.
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFromBackend } from "../data/products.js";

import { loadCartFromBackend } from "../data/cart.js";

// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js'

Promise.all([
  new Promise((resolve) => {
    loadProductsFromBackend(() => {
      resolve('value1');
    });
  }),
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