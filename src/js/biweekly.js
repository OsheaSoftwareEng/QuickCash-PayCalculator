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

  biweeklyPayCalculator: function (n, hr, hr2) {
    let employeeWage = n;
    let employeeHours = hr;
    let employeeHoursTwo = hr2;

    let withdrawals =
      this.medicare + this.socialSecurity + this.stateTax + this.federalTax;
    let totalWithdrawals = withdrawals / 100;

    let straightTimeGross = employeeWage * this.straightTime;

    let grossPay = employeeWage * employeeHours;
    let grossPayTwo = employeeWage * employeeHoursTwo;

    let timeHalfWage = employeeWage * this.timeHalf;

    let overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage;
    let overtimeGrossPayTwo =
      (employeeHoursTwo - this.straightTime) * timeHalfWage;

    let overtimePay = overtimeGrossPay + straightTimeGross;
    let overtimePayTwo = overtimeGrossPayTwo + straightTimeGross;

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

    let weekOne = 0;
    let weekTwo = 0;

    //conditional for if hours go over 40 Week 1
    if (employeeHours > this.straightTime) {
      weekOne = overtimePay;
    } else {
      weekOne = grossPay;
    }
    //conditional for if hours go over 40 Week 2
    if (employeeHoursTwo > this.straightTime) {
      weekTwo = overtimePayTwo;
    } else {
      weekTwo = grossPayTwo;
    }
    let sumTotal = weekOne + weekTwo;
    let netPay = sumTotal - sumTotal * totalWithdrawals;
    return netPay;
  },
  //total taxes calculation
  totalTaxes: function (n, hr, hr2) {
    employeeWage = n;
    employeeHours = hr;
    employeeHoursTwo = hr2;
    grossPay = employeeWage * employeeHours;
    grossPayTwo = employeeWage * employeeHoursTwo;

    timeHalfWage = employeeWage * this.timeHalf;

    overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage;
    overtimeGrossPayTwo = (employeeHoursTwo - this.straightTime) * timeHalfWage;

    overtimePay = overtimeGrossPay + straightTimeGross;
    overtimePayTwo = overtimeGrossPayTwo + straightTimeGross;

    let weekOneTax = 0;
    let weekTwoTax = 0;

    withdrawals =
      this.medicare + this.socialSecurity + this.stateTax + this.federalTax;
    totalWithdrawals = withdrawals / 100;

    //conditional for if hours go over 40 Week 1
    if (employeeHours > this.straightTime) {
      weekOneTax = overtimePay * totalWithdrawals;
    } else {
      weekOneTax = grossPay * totalWithdrawals;
    }
    //conditional for if hours go over 40 Week 2
    if (employeeHoursTwo > this.straightTime) {
      weekTwoTax = overtimePayTwo * totalWithdrawals;
    } else {
      weekTwoTax = grossPayTwo * totalWithdrawals;
    }
    let sumTaxes = weekOneTax + weekTwoTax;
    return sumTaxes;
  },
  //function for gross amount into pie chart
  pieChartGross: function (n, hr, hr2) {
    employeeWage = n;
    employeeHours = hr;
    employeeHoursTwo = hr2;

    grossPay = employeeWage * employeeHours;
    grossPayTwo = employeeWage * employeeHoursTwo;

    timeHalfWage = employeeWage * this.timeHalf;
    straightTimeGross = employeeWage * this.straightTime;

    overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage;
    overtimeGrossPayTwo = (employeeHoursTwo - this.straightTime) * timeHalfWage;

    let weekOneGross = 0;
    let weekTwoGross = 0;

    //conditional for if hours go over 40 Week 1
    if (employeeHours > this.straightTime) {
      weekOneGross = overtimeGrossPay + straightTimeGross;
    } else {
      weekOneGross = grossPay;
    }
    //conditional for if hours go over 40 Week 2
    if (employeeHoursTwo > this.straightTime) {
      weekTwoGross = overtimeGrossPayTwo + straightTimeGross;
    } else {
      weekTwoGross = grossPayTwo;
    }

    let sumGross = weekOneGross + weekTwoGross;
    return sumGross;
  },
  //function for fica taxes inputed into pie chart
  pieChartFicaTaxes: function (n, hr, hr2) {
    employeeWage = n;
    employeeHours = hr;
    employeeHoursTwo = hr2;

    grossPay = employeeWage * employeeHours;
    grossPayTwo = employeeWage * employeeHoursTwo;

    let ficaTaxes = this.medicare + this.socialSecurity;
    let finalTax = ficaTaxes / 100;
    let twoWeekTax = grossPay + grossPayTwo;

    return twoWeekTax * finalTax;
  },
  //function for federal taxes inputted into pie chart
  pieChartFederalTax: function (n, hr, hr2) {
    employeeWage = n;
    employeeHours = hr;
    employeeHoursTwo = hr2;

    grossPay = employeeWage * employeeHours;
    grossPayTwo = employeeWage * employeeHoursTwo;

    let fedTax = this.federalTax / 100;

    let biweeklyTotal = grossPay + grossPayTwo;

    return biweeklyTotal * fedTax;
  },
  //function for state taxes put in to pie chart
  pieChartStateTax: function (n, hr, hr2) {
    employeeWage = n;
    employeeHours = hr;
    employeeHoursTwo = hr2;

    grossPay = employeeWage * employeeHours;
    grossPayTwo = employeeWage * employeeHoursTwo;

    let stateTaxes = this.stateTax / 100;
    let biweeklyTotal = grossPay + grossPayTwo;

    return biweeklyTotal * stateTaxes;
  },
  //function for overtime amount inside part chart
  pieChartOvertime: function (n, hr, hr2) {
    employeeWage = n;
    employeeHours = hr;
    employeeHoursTwo = hr2;

    grossPay = employeeWage * employeeHours;
    grossPayTwo = employeeWage * employeeHoursTwo;

    overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage;
    let overtimeGrossPayTwo =
      (employeeHoursTwo - this.straightTime) * timeHalfWage;

    timeHalfWage = employeeWage * this.timeHalf;

    let weekOneOverTime = 0;
    let weekTwoOverTime = 0;

    if (employeeHours > this.straightTime) {
      weekOneOverTime = overtimeGrossPay;
    } else {
      weekOneOverTime = 0;
    }

    if (employeeHoursTwo > this.straightTime) {
      weekTwoOverTime = overtimeGrossPayTwo;
    } else {
      weekTwoOverTime = 0;
    }

    let totalOvertimeGross = weekOneOverTime + weekTwoOverTime;
    return totalOvertimeGross;
  }
};

//declarations to get document nodes for button
const ctx = document.getElementById('myChart');
let button = document.querySelector('#calButtons');
let results = document.querySelector('#results-printed');
let form = document.querySelector('#pay-form');
let payAmount = document.querySelector('.pay-amount');
let wage = document.getElementById('wage').value;
let hours = document.getElementById('hours').value;
let hoursTwo = document.getElementById('hoursTwo').value;
let logo = document.getElementById('original-logo');
let graphLogo = document.getElementById('graph-logo');
let earnings = document.getElementById('earnings');
let taxes = document.getElementById('taxes');
let takeHome = document.getElementById('take-home');

//calculate button that takes uses weekly pay function and generates chart.
button.addEventListener('click', function () {
  let wage = document.getElementById('wage').value;
  let hours = document.getElementById('hours').value;
  let hoursTwo = document.getElementById('hoursTwo').value;

  //scroll to top of page when button is clicked
  window.scrollTo({
    top: 50,
    left: 50
  });

  //un-hiding and hiding forms after users clicks calculate
  graphLogo.classList.remove('display-none');
  logo.classList.add('display-none');
  form.classList.add('display-none');
  payAmount.classList.remove('display-none');

  //temporary fix duplicated code to show correct take home amount
  results.innerHTML =
    '$' + calculateWage.biweeklyPayCalculator(wage, hours, hoursTwo).toFixed(2);

  results.innerHTML =
    '$' + calculateWage.biweeklyPayCalculator(wage, hours, hoursTwo).toFixed(2);

  //dynamic inner html logic from calculateWage object
  earnings.innerHTML =
    'Gross: ' +
    '$' +
    calculateWage.pieChartGross(wage, hours, hoursTwo).toFixed(2) +
    ' |';

  taxes.innerHTML =
    'Taxes: ' +
    '-$' +
    calculateWage.totalTaxes(wage, hours, hoursTwo).toFixed(2) +
    ' |';

  takeHome.innerHTML =
    'Take Home: ' +
    '$' +
    calculateWage.biweeklyPayCalculator(wage, hours, hoursTwo).toFixed(2);

  //data from calculateWage that populates the pie chart
  const PayGraphInfo = [
    calculateWage.pieChartGross(wage, hours, hoursTwo),
    calculateWage.pieChartFicaTaxes(wage, hours, hoursTwo).toFixed(2),
    calculateWage.pieChartFederalTax(wage, hours, hoursTwo).toFixed(2),
    calculateWage.pieChartStateTax(wage, hours, hoursTwo).toFixed(2),
    calculateWage.pieChartOvertime(wage, hours, hoursTwo).toFixed(2)
  ];
  //creating a pie chart when you hit the calculate button
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
          data: PayGraphInfo
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

//reset button that just reloads the window
let reset = document.querySelector('#reset-button');
reset.addEventListener('click', function () {
  window.location.reload();
});
