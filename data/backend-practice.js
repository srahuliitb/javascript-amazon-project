const xhr = new XMLHttpRequest();

// First, set up an event listener.
xhr.addEventListener('load', () => { // 'load' means that response has loaded
  console.log(xhr.response);
});

// Then, trigger the event.
xhr.open('GET', 'https://supersimplebackend.dev/');
xhr.send();