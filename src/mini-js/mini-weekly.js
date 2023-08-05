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
  weeklyPayCalculator: function (e, t) {
    let a = e,
      o = t,
      s =
        (this.medicare +
          this.socialSecurity +
          this.stateTax +
          this.federalTax) /
        100,
      i = a * this.straightTime,
      r = a * o,
      l = a * this.timeHalf,
      m = (o - this.straightTime) * l + i,
      y = document.getElementById('wage').value;
    return (
      (this.federalTax =
        y > 120 && y < 302
          ? this.sixFederalTax
          : y > 94.8 && y < 121
          ? this.fiveFederalTax
          : y > 49.5 && y < 95.8
          ? this.fourFederalTax
          : y > 23.3 && y < 50.5
          ? this.threeFederalTax
          : y > 5.9 && y < 24.3
          ? this.twoFederalTax
          : this.oneFederalTax),
      o > this.straightTime ? m - m * s : r - r * s
    );
  },
  totalTaxes: function (e, t) {
    return (
      (employeeWage = e),
      (employeeHours = t),
      (grossPay = employeeWage * employeeHours),
      (timeHalfWage = employeeWage * this.timeHalf),
      (overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage),
      (overtimePay = overtimeGrossPay + straightTimeGross),
      (withdrawals =
        this.medicare + this.socialSecurity + this.stateTax + this.federalTax),
      (totalWithdrawals = withdrawals / 100),
      employeeHours > this.straightTime
        ? overtimePay * totalWithdrawals
        : grossPay * totalWithdrawals
    );
  },
  totalTaxes: function (e, t) {
    return (
      (employeeWage = e),
      (employeeHours = t),
      (grossPay = employeeWage * employeeHours),
      (timeHalfWage = employeeWage * this.timeHalf),
      (overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage),
      (overtimePay = overtimeGrossPay + straightTimeGross),
      (withdrawals =
        this.medicare + this.socialSecurity + this.stateTax + this.federalTax),
      (totalWithdrawals = withdrawals / 100),
      employeeHours > this.straightTime
        ? overtimePay * totalWithdrawals
        : grossPay * totalWithdrawals
    );
  },
  pieChartGross: function (e, t) {
    return (
      (employeeWage = e),
      (employeeHours = t),
      (grossPay = employeeWage * employeeHours),
      (timeHalfWage = employeeWage * this.timeHalf),
      (straightTimeGross = employeeWage * this.straightTime),
      (overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage),
      employeeHours > this.straightTime
        ? overtimeGrossPay + straightTimeGross
        : grossPay
    );
  },
  pieChartFicaTaxes: function (e, t) {
    (employeeWage = e),
      (employeeHours = t),
      (grossPay = employeeWage * employeeHours);
    let a = this.medicare + this.socialSecurity;
    return grossPay * (a / 100);
  },
  pieChartFederalTax: function (e, t) {
    (employeeWage = e),
      (employeeHours = t),
      (grossPay = employeeWage * employeeHours);
    let a = this.federalTax / 100;
    return grossPay * a;
  },
  pieChartStateTax: function (e, t) {
    (employeeWage = e),
      (employeeHours = t),
      (grossPay = employeeWage * employeeHours);
    let a = this.stateTax / 100;
    return grossPay * a;
  },
  pieChartOvertime: function (e, t) {
    return (
      (employeeWage = e),
      (employeeHours = t),
      (grossPay = employeeWage * employeeHours),
      (overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage),
      (timeHalfWage = employeeWage * this.timeHalf),
      employeeHours > this.straightTime ? overtimeGrossPay : 0
    );
  }
};
const t = document.getElementById('myChart');
let a = document.querySelector('#calButton'),
  o = document.querySelector('#results-printed'),
  s = document.querySelector('#pay-form'),
  i = document.querySelector('.pay-amount'),
  r =
    (document.getElementById('wage').value,
    document.getElementById('hours').value,
    document.getElementById('original-logo')),
  l = document.getElementById('graph-logo'),
  m = document.getElementById('earnings'),
  y = document.getElementById('taxes'),
  n = document.getElementById('take-home');
a.addEventListener('click', function () {
  let a = document.getElementById('wage').value,
    d = document.getElementById('hours').value;
  window.scrollTo({ top: 50, left: 50 }),
    l.classList.remove('display-none'),
    r.classList.add('display-none'),
    s.classList.add('display-none'),
    i.classList.remove('display-none'),
    (o.innerHTML = '$' + e.weeklyPayCalculator(a, d).toFixed(2)),
    (o.innerHTML = '$' + e.weeklyPayCalculator(a, d).toFixed(2)),
    (m.innerHTML = 'Gross: $' + e.pieChartGross(a, d).toFixed(2) + ' |'),
    (y.innerHTML = 'Taxes: -$' + e.totalTaxes(a, d).toFixed(2) + ' |'),
    (n.innerHTML = 'Take Home: $' + e.weeklyPayCalculator(a, d).toFixed(2));
  const u = [
    e.pieChartGross(a, d),
    e.pieChartFicaTaxes(a, d).toFixed(2),
    e.pieChartFederalTax(a, d).toFixed(2),
    e.pieChartStateTax(a, d).toFixed(2),
    e.pieChartOvertime(a, d).toFixed(2)
  ];
  new Chart(t, {
    type: 'doughnut',
    data: {
      labels: [
        'Gross Pay',
        'Fica Taxes(Medicare,Social Security)',
        'Federal Tax',
        'State Tax',
        'Overtime Pay'
      ],
      datasets: [{ data: u }]
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
