document.body.scrollTop = document.documentElement.scrollTop = 0;

let calculateWage = {
  timeHalf: 1.5,
  straightTime: 40,
  medicare: 1.45,
  socialSecurity: 6.2,
  stateTax: 4.25,
  oneFederalTax: 10,
  twoFederalTax: 12,
  threeFederalTax: 22,
  fourFederalTax: 24,
  fiveFederalTax: 32,
  sixFederalTax: 35,
  federalTax: 0,

  weeklyPayCalculator: function (n, hr) {
    let employeeWage = n;
    let employeeHours = hr;

    let withdrawals =
      this.medicare + this.socialSecurity + this.stateTax + this.federalTax;
    let totalWithdrawals = withdrawals / 100;

    let straightTimeGross = employeeWage * this.straightTime;

    let grossPay = employeeWage * employeeHours;

    let timeHalfWage = employeeWage * this.timeHalf;

    let overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage;

    let overtimePay = overtimeGrossPay + straightTimeGross;

    //Tax bracket conditional logic
    let wage = document.getElementById('wage').value;
    if (wage > 120 && wage < 302) {
      this.federalTax = this.sixFederalTax;
    } else if (wage > 94.8 && wage < 121) {
      this.federalTax = this.fiveFederalTax;
    } else if (wage > 49.5 && wage < 95.8) {
      this.federalTax = this.fourFederalTax;
    } else if (wage > 23.3 && wage < 50.5) {
      this.federalTax = this.threeFederalTax;
    } else if (wage > 5.9 && wage < 24.3) {
      this.federalTax = this.twoFederalTax;
    } else {
      this.federalTax = this.oneFederalTax;
    }

    //conditional for if hours go over 40
    if (employeeHours > this.straightTime) {
      return overtimePay - overtimePay * totalWithdrawals;
    } else {
      return grossPay - grossPay * totalWithdrawals;
    }
  },
  totalTaxes: function (n, hr) {
    employeeWage = n;
    employeeHours = hr;
    grossPay = employeeWage * employeeHours;
    timeHalfWage = employeeWage * this.timeHalf;
    overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage;
    overtimePay = overtimeGrossPay + straightTimeGross;
    withdrawals =
      this.medicare + this.socialSecurity + this.stateTax + this.federalTax;
    totalWithdrawals = withdrawals / 100;
    if (employeeHours > this.straightTime) {
      return overtimePay * totalWithdrawals;
    } else {
      return grossPay * totalWithdrawals;
    }
  },

  pieChartGross: function (n, hr) {
    employeeWage = n;
    employeeHours = hr;
    grossPay = employeeWage * employeeHours;
    timeHalfWage = employeeWage * this.timeHalf;
    straightTimeGross = employeeWage * this.straightTime;
    overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage;

    if (employeeHours > this.straightTime) {
      return overtimeGrossPay + straightTimeGross;
    } else {
      return grossPay;
    }
  },
  pieChartFicaTaxes: function (n, hr) {
    employeeWage = n;
    employeeHours = hr;
    grossPay = employeeWage * employeeHours;
    let ficaTaxes = this.medicare + this.socialSecurity;
    let finalTax = ficaTaxes / 100;
    return grossPay * finalTax;
  },
  pieChartFederalTax: function (n, hr) {
    employeeWage = n;
    employeeHours = hr;
    grossPay = employeeWage * employeeHours;
    let fedTax = this.federalTax / 100;
    return grossPay * fedTax;
  },
  pieChartStateTax: function (n, hr) {
    employeeWage = n;
    employeeHours = hr;
    grossPay = employeeWage * employeeHours;
    let stateTaxes = this.stateTax / 100;
    return grossPay * stateTaxes;
  },
  pieChartOvertime: function (n, hr) {
    employeeWage = n;
    employeeHours = hr;
    grossPay = employeeWage * employeeHours;
    overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage;
    timeHalfWage = employeeWage * this.timeHalf;

    if (employeeHours > this.straightTime) {
      return overtimeGrossPay;
    } else {
      return 0;
    }
  }
};

const ctx = document.getElementById('myChart');
let button = document.querySelector('#calButton');
let results = document.querySelector('#results-printed');
let form = document.querySelector('#pay-form');
let payAmount = document.querySelector('.pay-amount');
let wage = document.getElementById('wage').value;
let hours = document.getElementById('hours').value;
let logo = document.getElementById('original-logo');
let graphLogo = document.getElementById('graph-logo');
let earnings = document.getElementById('earnings');
let taxes = document.getElementById('taxes');
let takeHome = document.getElementById('take-home');

button.addEventListener('click', function () {
  let wage = document.getElementById('wage').value;
  let hours = document.getElementById('hours').value;
  window.scrollTo(0, 0);

  graphLogo.classList.remove('display-none');
  logo.classList.add('display-none');
  form.classList.add('display-none');
  payAmount.classList.remove('display-none');

  results.innerHTML =
    '$' + calculateWage.weeklyPayCalculator(wage, hours).toFixed(2);

  earnings.innerHTML =
    'Gross: ' +
    '$' +
    calculateWage.pieChartGross(wage, hours).toFixed(2) +
    ' |';

  taxes.innerHTML =
    'Taxes: ' + '-$' + calculateWage.totalTaxes(wage, hours).toFixed(2) + ' |';

  takeHome.innerHTML =
    'Take Home: ' +
    '$' +
    calculateWage.weeklyPayCalculator(wage, hours).toFixed(2);

  const payGraphInfo = [
    calculateWage.pieChartGross(wage, hours),
    calculateWage.pieChartFicaTaxes(wage, hours).toFixed(2),
    calculateWage.pieChartFederalTax(wage, hours).toFixed(2),
    calculateWage.pieChartStateTax(wage, hours).toFixed(2),
    calculateWage.pieChartOvertime(wage, hours).toFixed(2)
  ];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Gross Pay',
        'Fica Taxes(Medicare,Social Security)',
        'Federal Tax',
        'State Tax',
        'Overtime Pay'
      ],
      datasets: [
        {
          data: payGraphInfo
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: 20
      },
      plugins: {
        title: {
          display: true,
          text: 'Your Pay Breakdown'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      },
      font: {
        size: 30
      }
    }
  });
});

let reset = document.querySelector('#reset-button');

reset.addEventListener('click', function () {
  window.location.reload();
});
