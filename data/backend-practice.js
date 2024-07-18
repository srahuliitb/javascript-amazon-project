const xhr = new XMLHttpRequest();

// First, set up an event listener to wait for a response after the send() method gets executed
xhr.addEventListener('load', () => { // 'load' means that response has loaded
  console.log(xhr.response);
});

// Then, trigger the event.
xhr.open('GET', 'https://supersimplebackend.dev/');
xhr.send(); // send() is an asynchronous method, i.e., it will send a request but won't wait for a response.