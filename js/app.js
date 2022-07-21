'use strict';

class CookieShop {
  location;
  minCust;
  maxCust;
  average;
  totalSales;
  hourlyServers;
  accurateProjections;
  controlCurve = [.5, .75, 1, .6, .8, 1, .7, .4, .6, .9, .7,
  .5, .3, .4, .6];

  constructor(location, minCust, maxCust, average) {
    this.location = location;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.average = Math.ceil(average);
    this.totalSales = this.getHourlyTotals();
    this.hourlyServers = this.determineNumServers();
    this.accurateProjections = this.applySaleCurve();
  }

  // function generates a random number of customers based on the stores min and max customers for every hour
  // it then multiplies it by the average cookie sale for each cookie to get the total cookies sold that hour
  getHourlyTotals() {
    let cookieTotals = [];
    let total = 0;
    for(let i = 0; i < 14; i++) {
      let customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
      let cookies = customers * this.average;
      cookieTotals.push(cookies);
      total += cookies;
    }
    cookieTotals.push(total);
    return cookieTotals;
  }

  // every server can serve 20 customers an hour, this function determines the min servers needed based on the total sales
  determineNumServers() {
    let hourlyServers = [];
    for (let numCookies of this.totalSales) {
      if (numCookies <= 40) {
        hourlyServers.push(2);
      } else {
        hourlyServers.push(Math.ceil((numCookies / this.average) / 20));
      }
    }
    return hourlyServers;
  }

  applySaleCurve() {
    let accurateProjections = [];
    for(let i = 0; i < this.controlCurve.length; i++) {
      accurateProjections.push(Math.ceil(this.controlCurve[i] * this.totalSales[i]));
    }
    return accurateProjections;
  }
}

// shop data inclueds location, min cust, max cust, average
let shopData = [
  ['Seattle', 23, 65, 6.3],
  ['Tokyo', 3, 24, 1.2],
  ['Dubai', 11, 38, 3.7],
  ['Paris', 20, 38, 2.3],
  ['Lima', 2, 16, 4.6]
];

// function loops through the shops to make objects and pushes it onto an array holding all shop objects
let shopArr = [];
function createShopObjects() {
  for(let shop of shopData) {
    let newShop = new CookieShop(shop[0], shop[1], shop[2], shop[3]);
    shopArr.push(newShop);
  }
}
createShopObjects();

// this array will be used to create the time row
const time = ['6am', '7am', '8am', '9am', '10am',
'11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
'6pm', '7pm', 'Total'];

// this function will calculate the total sales per hour from all the shops
function calcTotalHourly(data) {
  let hourlyTotalArr = [];
  for (let i = 0; i < shopArr[0].totalSales.length; i++) {
    let total = 0;
    for(let shop of shopArr) {
      if (data === 'Cookie Sales by Hours') total += shop.totalSales[i];
      else if (data === 'Servers Required by Hour') total += shop.hourlyServers[i];
      else total += shop.accurateProjections[i];    
    }
    hourlyTotalArr.push(total);
  }
  return hourlyTotalArr;
}

// function creates creates a table row and uses the hourly cookies sales array to make table data
function createRow(header, arr) {
  let row = document.createElement('tr');
  let titleHead = document.createElement('td');
  titleHead.innerHTML = header;
  row.appendChild(titleHead);
  for(let i = 0; i < arr.length; i++) {
    // add values to the row
    const cell = document.createElement('td');
    cell.innerHTML = arr[i];
    row.appendChild(cell);
  }
  return row;
}

// creates a table based on the specified data set that is passed to the function
function createTable(data) {
  let arr;
  let bottomRowArr;
  const table = document.createElement('table');

  const header = document.createElement('thead');
  const headerData = document.createElement('tr');
  headerData.innerHTML = data;
  header.appendChild(headerData);
  table.appendChild(header);

  // create a time row
  let timeRow = createRow('Time', time);
  table.appendChild(timeRow);

  // loop through each shop and call createRow function to make a row for each shop
  for(let shop of shopArr) {
    if(data === 'Cookie Sales by Hours') {
      arr = shop.totalSales;
    } else if(data === 'Servers Required by Hour') {
      arr = shop.hourlyServers;
    } else {
      arr = shop.accurateProjections;
    }
    table.appendChild(createRow(shop.location, arr));
  }
  table.appendChild(createRow('Total', calcTotalHourly(data)));
  container.appendChild(table);
}

// grab the container created in the sales.html page
const container = document.querySelector('#tables');
function renderTables() {
  container.innerHTML = '';
  createTable('Cookie Sales by Hours');
  createTable('Servers Required by Hour');
  createTable('Curve Sales Projections');
}
renderTables();


// HTML update or add store part of webpage
const formContainer = document.querySelector('#storeForm');
const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', createForm);

function createForm() {
  const inputs = [
    ['Location: ', 'location'],
    ['Minimum Customers: ', 'minCust'],
    ['Maximum Customers: ', 'maxCust'],
    ['Average: ', 'average']
  ];
  let formDiv = document.createElement('div');
  for(let input of inputs) {
    
    formDiv.setAttribute('class', 'formDiv');
    
    let label = document.createElement('label');
    label.setAttribute('for', input[1]);
    label.innerHTML = input[0];
    formDiv.appendChild(label);

    let inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('name', input[1]);
    inputField.setAttribute('id', input[1]);
    formDiv.appendChild(inputField);
  }

  let submitButton = document.createElement('button');
  submitButton.innerHTML = 'Submit';
  formDiv.appendChild(submitButton);
  submitButton.addEventListener('click', () => {
    let isPresent = false;
    let shopObj = null;
    let location = document.querySelector('#location')
    let minCust = document.querySelector('#minCust');
    let maxCust = document.querySelector('#maxCust');
    let average = document.querySelector('#average');
    for(let shop of shopArr) {
      if(shop.location.toLowerCase() === location.value.toLowerCase()) {
        shopObj = shop;
        isPresent = true;
        break;
      }
    }
    if(!isPresent) {
      shopObj = new CookieShop(location.value, minCust.value, maxCust.value, average.value);
      shopArr.push(shopObj);
    } else {
      shopObj.minCust = minCust.value;
      shopObj.maxCust = maxCust.value;
      shopObj.average = average.value;
    }
    formDiv.innerHTML = "";
    renderTables();
  });

  formContainer.appendChild(formDiv);

  addButton.disabled = 'disabled';
  addButton.disabled = 'disabled';
}

