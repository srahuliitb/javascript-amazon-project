import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // This is default export
import isSatSun from "./exercises/15f.js"; // We can rename a default export wehen we import.
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

// import '../data/cart-oop.js';
import '../data/cart-class.js';

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();

const date = dayjs().format('dddd');
console.log(isSatSun(date));