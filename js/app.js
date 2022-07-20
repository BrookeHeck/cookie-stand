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
      accurateProjections.push(+(this.controlCurve[i] * this.totalSales[i]).toFixed(1));
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

function createTable(data) {
  let arr;
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
  container.appendChild(table);
}

// grab the container created in the sales.html page
const container = document.querySelector('#tables');
createTable('Cookie Sales by Hours');
createTable('Servers Required by Hour');
createTable('Control Curve Sales Projections');
