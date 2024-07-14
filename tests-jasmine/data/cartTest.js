import { addToCart, cart, loadCartFromStorage } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

describe('test suit: addToCart', () => {
  
  // A test can have multiple expectations. A test passes ONLY if all the expections within it pass.
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem'); // To pretend or mock saving an item to localStorage.
    spyOn(localStorage, 'getItem').and.callFake(() => { // To pretend or mock getting an item from localStorage.
      return JSON.stringify([]);
    });
    loadCartFromStorage();

    // Add a product with id 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' and quantity = 4 to the cart.
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 4); // Since localStorage.setItem() is mocked, the product will not actually get added into the cart.
    
    expect(cart.length).toEqual(1);
    
    // To check if localStorage.setItem() function was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // we expect the setItem() method to be called exactly once.
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(4);
  });

  // A mock only lasts for 1 test. Once the test is finished, it no longer exists as a global entity in the whole test suite.

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem'); // To pretend or mock saving an item to localStorage.
    spyOn(localStorage, 'getItem').and.callFake(() => { // To pretend or mock getting an item from localStorage.
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadCartFromStorage();

    // Add a product with id 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' and quantity = 1 to the cart.
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1); // Since localStorage.setItem() is mocked, the product will not actually get added into the cart.
    
    expect(cart.length).toEqual(1);
    
    // To check if localStorage.setItem() function was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // we expect the setItem() method to be called exactly once.
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
});