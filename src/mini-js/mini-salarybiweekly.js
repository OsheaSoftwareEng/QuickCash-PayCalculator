let e = {
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
  biweeklySalaryPayCalculator: function (e) {
    let a = e,
      t =
        (this.medicare +
          this.socialSecurity +
          this.stateTax +
          this.federalTax) /
        100,
      l = document.getElementById('wage').value;
    this.federalTax =
      l < 578125 && l > 231250
        ? this.sixFederalTax
        : l < 231255 && l > 182100
        ? this.fiveFederalTax
        : l < 182105 && l > 95375
        ? this.fourFederalTax
        : l < 95377 && l > 44725
        ? this.threeFederalTax
        : l < 44726 && l > 11e3
        ? this.twoFederalTax
        : this.oneFederalTax;
    let i = a / 12 / 2;
    return i - i * t;
  },
  totalTaxes: function (e) {
    return (
      (employeeWage = e),
      (withdrawals =
        this.medicare + this.socialSecurity + this.stateTax + this.federalTax),
      (totalWithdrawals = withdrawals / 100),
      (monthlyPay = employeeWage / 12),
      (biweeklyPay = monthlyPay / 2),
      biweeklyPay * totalWithdrawals
    );
  },
  pieChartGross: function (e) {
    return (
      (employeeWage = e),
      (monthlyPay = employeeWage / 12),
      (biweeklyPay = monthlyPay / 2),
      biweeklyPay
    );
  },
  pieChartFicaTaxes: function (e) {
    employeeWage = e;
    let a = this.medicare + this.socialSecurity;
    return (
      (monthlyPay = employeeWage / 12),
      (biweeklyPay = monthlyPay / 2),
      biweeklyPay * (a / 100)
    );
  },
  pieChartFederalTax: function (e) {
    employeeWage = e;
    let a = this.federalTax / 100;
    return (
      (monthlyPay = employeeWage / 12),
      (biweeklyPay = monthlyPay / 2),
      biweeklyPay * a
    );
  },
  pieChartStateTax: function (e) {
    employeeWage = e;
    let a = this.stateTax / 100;
    return (
      (monthlyPay = employeeWage / 12),
      (biweeklyPay = monthlyPay / 2),
      biweeklyPay * a
    );
  }
};
const a = document.getElementById('myChart');
let t = document.querySelector('#calButton'),
  l = document.querySelector('#results-printed'),
  i = document.querySelector('#pay-form'),
  o = document.querySelector('.pay-amount'),
  r =
    (document.getElementById('wage').value,
    document.getElementById('original-logo')),
  n = document.getElementById('graph-logo'),
  y = document.getElementById('earnings'),
  s = document.getElementById('taxes'),
  d = document.getElementById('take-home');
t.addEventListener('click', function () {
  let t = document.getElementById('wage').value;
  window.scrollTo({ top: 50, left: 50 }),
    n.classList.remove('display-none'),
    r.classList.add('display-none'),
    i.classList.add('display-none'),
    o.classList.remove('display-none'),
    (l.innerHTML = '$' + e.biweeklySalaryPayCalculator(t).toFixed(2)),
    (l.innerHTML = '$' + e.biweeklySalaryPayCalculator(t).toFixed(2)),
    (y.innerHTML = 'Gross: $' + e.pieChartGross(t).toFixed(2) + ' |'),
    (s.innerHTML = 'Taxes: -$' + e.totalTaxes(t).toFixed(2) + ' |'),
    (d.innerHTML =
      'Take Home: $' + e.biweeklySalaryPayCalculator(t).toFixed(2));
  const c = [
    e.pieChartGross(t),
    e.pieChartFicaTaxes(t).toFixed(2),
    e.pieChartFederalTax(t).toFixed(2),
    e.pieChartStateTax(t).toFixed(2)
  ];
  new Chart(a, {
    type: 'doughnut',
    data: {
      labels: [
        'Gross Pay',
        'Fica Taxes(Medicare,Social Security)',
        'Federal Tax',
        'State Tax'
      ],
      datasets: [{ data: c }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !0,
      layout: { padding: 20 },
      plugins: { title: { display: !0, text: 'Your Pay Breakdown' } },
      scales: { y: { beginAtZero: !0 } },
      font: { size: 30 }
    }
  });
}),
  document
    .querySelector('#reset-button')
    .addEventListener('click', function () {
      window.location.reload();
    });
