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
    this.average = average;
    this.totalSales = this.getHourlyTotals();
  }

  
  getHourlyTotals() {
    let cookieTotals = [];
    let total = 0;
    for(let i = 0; i < 14; i++) {
      let hourly = Math.floor(Math.random() * this.average
       + 2);
      cookieTotals.push(hourly);
      total += hourly;
    }
    cookieTotals.push(total);
    return cookieTotals;
  }
}

const seattle = new CookieShop('Seattle', 23, 65, 6.3);
const tokyo = new CookieShop('Tokyo', 3, 24, 1.2);
const dubai = new CookieShop('Dubai', 11, 38, 3.7);
const paris = new CookieShop('Paris', 20, 38, 2.3);
const lima = new CookieShop('Lima', 2, 16, 4.6);

const shopArr = [seattle, tokyo, dubai, paris, lima];
const properties = ['location', 'minCust', 'maxCust', 'average', 'totalSales'];

function createDisplayTable(shop) {
  const list = document.createElement('ul');
  list.innerHTML = shop.location;
  for(let i = 1; i < 5; i++) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${properties[i]}: ${shop[properties[i]]}`;
    list.append(listItem);
  }
  return list;
}

const container = document.querySelector('#tables');
for(let shop of shopArr) {
  container.appendChild(createDisplayTable(shop));
}





