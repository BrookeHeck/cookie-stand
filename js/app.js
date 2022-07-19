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
    this.hourlyServers = this.determineNumServers();
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
}

// a new object is created for each location
const seattle = new CookieShop('Seattle', 23, 65, 6.3);
const tokyo = new CookieShop('Tokyo', 3, 24, 1.2);
const dubai = new CookieShop('Dubai', 11, 38, 3.7);
const paris = new CookieShop('Paris', 20, 38, 2.3);
const lima = new CookieShop('Lima', 2, 16, 4.6);

// I put the objects and times in an array so it is easier to loop through them latter
const shopArr = [seattle, tokyo, dubai, paris, lima];
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

  // create a time row
  let timeRow = createRow('Time', time);
  table.appendChild(timeRow);

  // loop through each shop and call createRow function to make a row for each shop
  for(let shop of shopArr) {
    if(data === 'cookie') {
      arr = shop.totalSales; 
    } else {
      arr = shop.hourlyServers;
    }
    table.appendChild(createRow(shop.location, arr));
  }
  container.appendChild(table);
}

// grab the container created in the sales.html page
const container = document.querySelector('#tables');
createTable('cookie');
createTable('server');






