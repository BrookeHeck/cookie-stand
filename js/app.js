class CookieShop {
  location;
  minCust;
  maxCust;
  average;

  constructor(location, minCust, maxCust, average) {
    this.location = location;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.average = average;
  }

  
  getHourlyTotals() {
    let cookieTotals = [];
    let total = 0;
    for(let i = 0; i < 14; i++) {
      let min = Math.ceil(this.average - 15);
      let max = Math.floor(average + 15);
      let hourly = Math.floor(Math.random() * (max - min) + min);
      cookieTotals.push(hourly);
      total += hourly;
    }
    cookieTotals.push(total);
    return cookieTotals;
  }
}

