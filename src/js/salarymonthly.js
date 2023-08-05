let calculateWage = {
  timeHalf: 1.5,
  straightTime: 40,
  medicare: 1.45,
  socialSecurity: 6.2,
  stateTax: 6.04,
  oneFederalTax: 10,
  twoFederalTax: 12,
  threeFederalTax: 22,
  fourFederalTax: 24,
  fiveFederalTax: 32,
  sixFederalTax: 35,
  federalTax: 0,

  salaryPayCalculator: function (n) {
    let employeeWage = n;

    let withdrawals =
      this.medicare + this.socialSecurity + this.stateTax + this.federalTax;
    let totalWithdrawals = withdrawals / 100;

    //Tax bracket conditional logic
    let wage = document.getElementById('wage').value;
    if (wage < 578125 && wage > 231250) {
      this.federalTax = this.sixFederalTax;
    } else if (wage < 231255 && wage > 182100) {
      this.federalTax = this.fiveFederalTax;
    } else if (wage < 182105 && wage > 95375) {
      this.federalTax = this.fourFederalTax;
    } else if (wage < 95377 && wage > 44725) {
      this.federalTax = this.threeFederalTax;
    } else if (wage < 44726 && wage > 11000) {
      this.federalTax = this.twoFederalTax;
    } else {
      this.federalTax = this.oneFederalTax;
    }

    let monthlyPay = employeeWage / 12;
    return monthlyPay - monthlyPay * totalWithdrawals;
  },
  //total taxes calculation
  totalTaxes: function (n) {
    employeeWage = n;

    withdrawals =
      this.medicare + this.socialSecurity + this.stateTax + this.federalTax;
    totalWithdrawals = withdrawals / 100;

    monthlyPay = employeeWage / 12;

    return monthlyPay * totalWithdrawals;
  },
  //function for gross amount into pie chart
  pieChartGross: function (n) {
    employeeWage = n;

    monthlyPay = employeeWage / 12;

    return monthlyPay;
  },
  //function for fica taxes inputed into pie chart
  pieChartFicaTaxes: function (n) {
    employeeWage = n;

    let ficaTaxes = this.medicare + this.socialSecurity;
    let finalTax = ficaTaxes / 100;
    monthlyPay = employeeWage / 12;

    return monthlyPay * finalTax;
  },
  //function for federal taxes inputted into pie chart
  pieChartFederalTax: function (n) {
    employeeWage = n;

    let fedTax = this.federalTax / 100;

    monthlyPay = employeeWage / 12;

    return monthlyPay * fedTax;
  },
  //function for state taxes put in to pie chart
  pieChartStateTax: function (n) {
    employeeWage = n;

    let stateTaxes = this.stateTax / 100;
    monthlyPay = employeeWage / 12;

    return monthlyPay * stateTaxes;
  }
};
//declarations to get document nodes for button
const ctx = document.getElementById('myChart');
let button = document.querySelector('#calButton');
let results = document.querySelector('#results-printed');
let form = document.querySelector('#pay-form');
let payAmount = document.querySelector('.pay-amount');
let wage = document.getElementById('wage').value;
let logo = document.getElementById('original-logo');
let graphLogo = document.getElementById('graph-logo');
let earnings = document.getElementById('earnings');
let taxes = document.getElementById('taxes');
let takeHome = document.getElementById('take-home');

//calculate button that takes uses weekly pay function and generates chart.
button.addEventListener('click', function () {
  let wage = document.getElementById('wage').value;

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
  results.innerHTML = '$' + calculateWage.salaryPayCalculator(wage).toFixed(2);

  results.innerHTML = '$' + calculateWage.salaryPayCalculator(wage).toFixed(2);

  //dynamic inner html logic from calculateWage object
  earnings.innerHTML =
    'Gross: ' + '$' + calculateWage.pieChartGross(wage).toFixed(2) + ' |';

  taxes.innerHTML =
    'Taxes: ' + '-$' + calculateWage.totalTaxes(wage).toFixed(2) + ' |';

  takeHome.innerHTML =
    'Take Home: ' + '$' + calculateWage.salaryPayCalculator(wage).toFixed(2);

  //data from calculateWage that populates the pie chart
  const PayGraphInfo = [
    calculateWage.pieChartGross(wage),
    calculateWage.pieChartFicaTaxes(wage).toFixed(2),
    calculateWage.pieChartFederalTax(wage).toFixed(2),
    calculateWage.pieChartStateTax(wage).toFixed(2)
  ];
  //creating a pie chart when you hit the calculate button
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Gross Pay',
        'Fica Taxes(Medicare,Social Security)',
        'Federal Tax',
        'State Tax'
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

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}
