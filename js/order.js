'use strict';

let formContainer = document.querySelector('#buyForm');

let contactField = [
  ['Name: ', 'name', 'text'],
  ['Email: ', 'email', 'email'],
  ['Phone Number: ', 'phone', 'tel']
];

let cardInfo = [
  ['Card Number: ', 'cardNumber', 'text'],
  ['Expiration Date: ', 'date', 'text'],
  ['CVV: ', 'cvv', 'text']
];

let address = [
  ['Address', 'address', 'text'],
  ['City', 'city', 'text'],
  ['State', 'state', 'text'],
  ['Zipcode', 'zip', 'text']
];

// function will create a field set for each contact info field by looping through the arr passed to it and make labels and inputs with that array
function createFieldSet(legendName, inputArr) {
  let fieldset = document.createElement('fieldset');
  let legend = document.createElement('legend');
  legend.innerHTML = legendName;
  fieldset.appendChild(legend);

  for(let input of inputArr) {
    let label = document.createElement('label');
    label.setAttribute('for', input[1]);
    label.innerHTML = input[0];
    fieldset.appendChild(label);

    let inputField = document.createElement('input');
    inputField.setAttribute('type', input[2]);
    inputField.setAttribute('name', input[1]);
    inputField.setAttribute('id', input[1]);
    fieldset.appendChild(inputField);
  }
  return fieldset;
}

// this is the event handler for when a user hits a buy now button
function buyProduct() {
  formContainer.appendChild(createFieldSet('Contact Info', contactField));
  formContainer.appendChild(createFieldSet('Card Information', cardInfo));
  formContainer.appendChild(createFieldSet('Address', address));
  let submitButton = document.createElement('button');
  submitButton.innerHTML = 'Submit';
  // submit button should send the data to the hidden form, not currently working, see comment in event handler
  submitButton.addEventListener('click', () => {
    let inputs = document.querySelectorAll('input');
    let userInputs = [];
    for(let singleInput of inputs) {
      userInputs.push(` ${singleInput.id}: ${singleInput.value}`);
    }
    let listItem = document.createElement('li');
    listItem.innerHTML = userInputs.toString().trim();

    // The following two commented codes is what I had planned on doing, but I realized this won't work with a hidden form
    // let ordersList = document.querySelector('#ordersList');
    // ordersList.appendChild(listItem);
    // I believe I need to POST to my hidden form, but I'm going to have to work with it a little more

    formContainer.innerHTML ='';
    cookieButton.disabled = '';
    cutterButton.disabled = '';
    shirtButton.disabled = '';
  });
  formContainer.appendChild(submitButton);
}

let cookieButton = document.querySelector('#cookieButton');
cookieButton.addEventListener('click', () => {
  buyProduct();
  cookieButton.disabled = 'disabled';
  cutterButton.disabled = 'disabled';
  shirtButton.disabled = 'disabled';
});

let cutterButton = document.querySelector('#cutterButton');
cutterButton.addEventListener('click', () => {
  buyProduct();
  cookieButton.disabled = 'disabled';
  cutterButton.disabled = 'disabled';
  shirtButton.disabled = 'disabled';
});

let shirtButton = document.querySelector('#shirtButton');
shirtButton.addEventListener('click', () => {
  buyProduct();
  shirtButton.disabled = 'disabled';
  shirtButton.disabled = 'disabled';
  shirtButton.disabled = 'disabled';
});

