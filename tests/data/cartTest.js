import { addToCart, cart, loadCartFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe('test suit: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem'); // To pretend or mock saving an item to localStorage.
  });
  
  // A test can have multiple expectations. A test passes ONLY if all the expections within it pass.
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => { // To pretend or mock getting an item from localStorage.
      return JSON.stringify([]);
    });
    loadCartFromStorage();

    // Add a product with id 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' and quantity = 4 to the cart.
    addToCart(productId1, 4); // Since localStorage.setItem() is mocked, the product will not actually get added into the cart.
    
    expect(cart.length).toEqual(1);
    
    // To check if localStorage.setItem() function was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // we expect the setItem() method to be called exactly once.
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(4);

    /**
     * expect() has another method called .toHaveBeenCalledWith(). It checks what values a mocked method received. 
     * For example, expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
     * Checks if the code called localStorage.setItem('cart', '[]') at some point.
     */
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', 
      JSON.stringify([{
        productId: productId1, 
        quantity: 4,
        deliveryOptionId: "1"
      }])
    );
  });

  // A mock only lasts for 1 test. Once the test is finished, it no longer exists as a global entity in the whole test suite.

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => { // To pretend or mock getting an item from localStorage.
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadCartFromStorage();

    // Add a product with id 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' and quantity = 1 to the cart.
    addToCart(productId1, 1); // Since localStorage.setItem() is mocked, the product will not actually get added into the cart.
    
    expect(cart.length).toEqual(1);
    
    // To check if localStorage.setItem() function was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // we expect the setItem() method to be called exactly once.
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', 
      JSON.stringify([{
        productId: productId1, 
        quantity: 2,
        deliveryOptionId: "1"
      }])
    );
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('remove a productId that is in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => { // To pretend or mock getting an item from localStorage.
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });
    loadCartFromStorage();

    // Remove a product with id 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    removeFromCart(productId1); // Since localStorage.setItem() is mocked, the product will not actually get removed from the cart.
    
    expect(cart.length).toEqual(0);
    
    // To check if localStorage.setItem() function was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // we expect the setItem() method to be called exactly once.
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  it('does nothing if a productId DOES NOT exist in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => { // To pretend or mock getting an item from localStorage.
      return JSON.stringify([{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadCartFromStorage();

    // Shouldn't affect cart becuase productId 1 does not exist in the cart
    removeFromCart(productId1); 
    
    expect(cart.length).toEqual(1);
    
    // To check if localStorage.setItem() function was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // we expect the setItem() method to be called exactly once.
    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', 
      JSON.stringify([{
        productId: productId2, 
        quantity: 1,
        deliveryOptionId: "2"
      }])
    );
  });

});

describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => { // To pretend or mock getting an item from localStorage.
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });
    loadCartFromStorage();
  });

  it('update delivery option of an existing productId in the cart', () => {
    updateDeliveryOption(productId1, '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // we expect the setItem() method to be called exactly once.
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', 
      JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '3'
      }])
    );
  });

  it('does nothing if a productId DOES NOT exist in the cart', () => {
    updateDeliveryOption(productId2, '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0); // we don't expect the setItem() method to be called at all.
  });

  it('does nothing if a deliverOptionId is invalid', () => {
    updateDeliveryOption(productId1, '4');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0); // we don't expect the setItem() method to be called at all.
  });
});