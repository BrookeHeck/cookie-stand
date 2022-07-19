'use strict';

class CookieShop {
  location;
  minCust;
  maxCust;
  average;
  totalSales;

  constructor(location, minCust, maxCust, average) {
    this.location = location;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.average = Math.ceil(average);
    this.totalSales = this.getHourlyTotals();
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
}

// a new object is created for each location
const seattle = new CookieShop('Seattle', 23, 65, 6.3);
const tokyo = new CookieShop('Tokyo', 3, 24, 1.2);
const dubai = new CookieShop('Dubai', 11, 38, 3.7);
const paris = new CookieShop('Paris', 20, 38, 2.3);
const lima = new CookieShop('Lima', 2, 16, 4.6);

const shopArr = [seattle, tokyo, dubai, paris, lima];
const time = ['6am', '7am', '8am', '9am', '10am',
'11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
'6pm', '7pm', 'Total'];

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
    table.appendChild(row);
  }
  return row;
}



const container = document.querySelector('#tables');
const table = document.createElement('table');
let timeRow = createRow('Time', time);
table.appendChild(timeRow);
for(let shop of shopArr) {
  table.appendChild(createRow(shop.location, shop.totalSales));
}
container.appendChild(table);





