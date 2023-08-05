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
  salaryPayCalculator: function (e) {
    let t = e,
      a =
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
    let o = t / 12;
    return o - o * a;
  },
  totalTaxes: function (e) {
    return (
      (employeeWage = e),
      (withdrawals =
        this.medicare + this.socialSecurity + this.stateTax + this.federalTax),
      (totalWithdrawals = withdrawals / 100),
      (monthlyPay = employeeWage / 12),
      monthlyPay * totalWithdrawals
    );
  },
  pieChartGross: function (e) {
    return (employeeWage = e), (monthlyPay = employeeWage / 12), monthlyPay;
  },
  pieChartFicaTaxes: function (e) {
    employeeWage = e;
    let t = this.medicare + this.socialSecurity;
    return (monthlyPay = employeeWage / 12), monthlyPay * (t / 100);
  },
  pieChartFederalTax: function (e) {
    employeeWage = e;
    let t = this.federalTax / 100;
    return (monthlyPay = employeeWage / 12), monthlyPay * t;
  },
  pieChartStateTax: function (e) {
    employeeWage = e;
    let t = this.stateTax / 100;
    return (monthlyPay = employeeWage / 12), monthlyPay * t;
  }
};
const t = document.getElementById('myChart');
let a = document.querySelector('#calButton'),
  l = document.querySelector('#results-printed'),
  o = document.querySelector('#pay-form'),
  i = document.querySelector('.pay-amount'),
  r =
    (document.getElementById('wage').value,
    document.getElementById('original-logo')),
  n = document.getElementById('graph-logo'),
  s = document.getElementById('earnings'),
  d = document.getElementById('taxes'),
  y = document.getElementById('take-home');
a.addEventListener('click', function () {
  let a = document.getElementById('wage').value;
  window.scrollTo({ top: 50, left: 50 }),
    n.classList.remove('display-none'),
    r.classList.add('display-none'),
    o.classList.add('display-none'),
    i.classList.remove('display-none'),
    (l.innerHTML = '$' + e.salaryPayCalculator(a).toFixed(2)),
    (l.innerHTML = '$' + e.salaryPayCalculator(a).toFixed(2)),
    (s.innerHTML = 'Gross: $' + e.pieChartGross(a).toFixed(2) + ' |'),
    (d.innerHTML = 'Taxes: -$' + e.totalTaxes(a).toFixed(2) + ' |'),
    (y.innerHTML = 'Take Home: $' + e.salaryPayCalculator(a).toFixed(2));
  const c = [
    e.pieChartGross(a),
    e.pieChartFicaTaxes(a).toFixed(2),
    e.pieChartFederalTax(a).toFixed(2),
    e.pieChartStateTax(a).toFixed(2)
  ];
  new Chart(t, {
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

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}
