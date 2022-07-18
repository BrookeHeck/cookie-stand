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

const seattle = new CookieShop('Seattle', 23, 65, 6.3);
const tokyo = new CookieShop('Tokyo', 3, 24, 1.2);
const dubai = new CookieShop('Dubai', 11, 38, 3.7);
const paris = new CookieShop('Paris', 20, 38, 2.3);
const lima = new CookieShop('Lima', 2, 16, 4.6);

const shopArr = [seattle, tokyo, dubai, paris, lima];

function createDisplayTable(shop) {
  const list = document.createElement('ul');
  list.innerHTML = shop.location;
  for(let i = 0; i < shop.totalSales.length; i++) {
    const listItem = document.createElement('li');
    if (i < 14) {
      listItem.innerHTML = `${i + 6}00: ${shop.totalSales[i]} cookies`;
    } else if(i === 14) {
      listItem.innerHTML = `Total: ${shop.totalSales[14]}`
    }
    list.append(listItem);
  }
  return list;
}

const container = document.querySelector('#tables');
for(let shop of shopArr) {
  container.appendChild(createDisplayTable(shop));
}





