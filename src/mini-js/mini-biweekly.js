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
  biweeklyPayCalculator: function (e, t, o) {
    let a = e,
      s = t,
      r = o,
      i =
        (this.medicare +
          this.socialSecurity +
          this.stateTax +
          this.federalTax) /
        100,
      l = a * this.straightTime,
      m = a * s,
      y = a * r,
      g = a * this.timeHalf,
      T = (s - this.straightTime) * g + l,
      u = (r - this.straightTime) * g + l,
      h = document.getElementById('wage').value;
    this.federalTax =
      h > 120 && h < 302
        ? this.sixFederalTax
        : h > 94.8 && h < 121
        ? this.fiveFederalTax
        : h > 49.5 && h < 95.8
        ? this.fourFederalTax
        : h > 23.3 && h < 50.5
        ? this.threeFederalTax
        : h > 5.9 && h < 24.3
        ? this.twoFederalTax
        : this.oneFederalTax;
    let n = 0,
      p = 0;
    (n = s > this.straightTime ? T : m), (p = r > this.straightTime ? u : y);
    let d = n + p;
    return d - d * i;
  },
  totalTaxes: function (e, t, o) {
    (employeeWage = e),
      (employeeHours = t),
      (employeeHoursTwo = o),
      (grossPay = employeeWage * employeeHours),
      (grossPayTwo = employeeWage * employeeHoursTwo),
      (timeHalfWage = employeeWage * this.timeHalf),
      (overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage),
      (overtimeGrossPayTwo =
        (employeeHoursTwo - this.straightTime) * timeHalfWage),
      (overtimePay = overtimeGrossPay + straightTimeGross),
      (overtimePayTwo = overtimeGrossPayTwo + straightTimeGross);
    let a = 0,
      s = 0;
    return (
      (withdrawals =
        this.medicare + this.socialSecurity + this.stateTax + this.federalTax),
      (totalWithdrawals = withdrawals / 100),
      (a =
        employeeHours > this.straightTime
          ? overtimePay * totalWithdrawals
          : grossPay * totalWithdrawals),
      (s =
        employeeHoursTwo > this.straightTime
          ? overtimePayTwo * totalWithdrawals
          : grossPayTwo * totalWithdrawals),
      a + s
    );
  },
  pieChartGross: function (e, t, o) {
    (employeeWage = e),
      (employeeHours = t),
      (employeeHoursTwo = o),
      (grossPay = employeeWage * employeeHours),
      (grossPayTwo = employeeWage * employeeHoursTwo),
      (timeHalfWage = employeeWage * this.timeHalf),
      (straightTimeGross = employeeWage * this.straightTime),
      (overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage),
      (overtimeGrossPayTwo =
        (employeeHoursTwo - this.straightTime) * timeHalfWage);
    let a = 0,
      s = 0;
    return (
      (a =
        employeeHours > this.straightTime
          ? overtimeGrossPay + straightTimeGross
          : grossPay),
      (s =
        employeeHoursTwo > this.straightTime
          ? overtimeGrossPayTwo + straightTimeGross
          : grossPayTwo),
      a + s
    );
  },
  pieChartFicaTaxes: function (e, t, o) {
    (employeeWage = e),
      (employeeHours = t),
      (employeeHoursTwo = o),
      (grossPay = employeeWage * employeeHours),
      (grossPayTwo = employeeWage * employeeHoursTwo);
    let a = this.medicare + this.socialSecurity;
    return (grossPay + grossPayTwo) * (a / 100);
  },
  pieChartFederalTax: function (e, t, o) {
    (employeeWage = e),
      (employeeHours = t),
      (employeeHoursTwo = o),
      (grossPay = employeeWage * employeeHours),
      (grossPayTwo = employeeWage * employeeHoursTwo);
    let a = this.federalTax / 100;
    return (grossPay + grossPayTwo) * a;
  },
  pieChartStateTax: function (e, t, o) {
    (employeeWage = e),
      (employeeHours = t),
      (employeeHoursTwo = o),
      (grossPay = employeeWage * employeeHours),
      (grossPayTwo = employeeWage * employeeHoursTwo);
    let a = this.stateTax / 100;
    return (grossPay + grossPayTwo) * a;
  },
  pieChartOvertime: function (e, t, o) {
    (employeeWage = e),
      (employeeHours = t),
      (employeeHoursTwo = o),
      (grossPay = employeeWage * employeeHours),
      (grossPayTwo = employeeWage * employeeHoursTwo),
      (overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage);
    let a = (employeeHoursTwo - this.straightTime) * timeHalfWage;
    timeHalfWage = employeeWage * this.timeHalf;
    let s = 0,
      r = 0;
    return (
      (s = employeeHours > this.straightTime ? overtimeGrossPay : 0),
      (r = employeeHoursTwo > this.straightTime ? a : 0),
      s + r
    );
  },
  pieChartWeekOne: function (e, t) {
    return (
      (employeeWage = e),
      (employeeHours = t),
      (grossPay = employeeWage * employeeHours),
      (timeHalfWage = employeeWage * this.timeHalf),
      (straightTimeGross = employeeWage * this.straightTime),
      (overtimeGrossPay = (employeeHours - this.straightTime) * timeHalfWage),
      (overtimePay = overtimeGrossPay + straightTimeGross),
      employeeHours > this.straightTime ? overtimePay : grossPay
    );
  },
  pieChartWeekTwo: function (e, t) {
    return (
      (employeeWage = e),
      (employeeHoursTwo = t),
      (grossPayTwo = employeeWage * employeeHoursTwo),
      (timeHalfWage = employeeWage * this.timeHalf),
      (straightTimeGross = employeeWage * this.straightTime),
      (overtimeGrossPay =
        (employeeHoursTwo - this.straightTime) * timeHalfWage),
      (overtimePayTwo = overtimeGrossPay + straightTimeGross),
      employeeHoursTwo > this.straightTime ? overtimePayTwo : grossPayTwo
    );
  }
};
const t = document.getElementById('myChart');
let o = document.querySelector('#calButtons'),
  a = document.querySelector('#results-printed'),
  s = document.querySelector('#pay-form'),
  r = document.querySelector('.pay-amount'),
  i =
    (document.getElementById('wage').value,
    document.getElementById('hours').value,
    document.getElementById('hoursTwo').value,
    document.getElementById('original-logo')),
  l = document.getElementById('graph-logo'),
  m = document.getElementById('earnings'),
  y = document.getElementById('taxes'),
  g = document.getElementById('take-home');
o.addEventListener('click', function () {
  let o = document.getElementById('wage').value,
    T = document.getElementById('hours').value,
    u = document.getElementById('hoursTwo').value;
  window.scrollTo({ top: 50, left: 50 }),
    l.classList.remove('display-none'),
    i.classList.add('display-none'),
    s.classList.add('display-none'),
    r.classList.remove('display-none'),
    (a.innerHTML = '$' + e.biweeklyPayCalculator(o, T, u).toFixed(2)),
    (a.innerHTML = '$' + e.biweeklyPayCalculator(o, T, u).toFixed(2)),
    (m.innerHTML = 'Gross: $' + e.pieChartGross(o, T, u).toFixed(2) + ' |'),
    (y.innerHTML = 'Taxes: -$' + e.totalTaxes(o, T, u).toFixed(2) + ' |'),
    (g.innerHTML =
      'Take Home: $' + e.biweeklyPayCalculator(o, T, u).toFixed(2));
  const h = [
    e.pieChartGross(o, T, u),
    e.pieChartFicaTaxes(o, T, u).toFixed(2),
    e.pieChartFederalTax(o, T, u).toFixed(2),
    e.pieChartStateTax(o, T, u).toFixed(2),
    e.pieChartOvertime(o, T, u).toFixed(2),
    e.pieChartWeekOne(o, T).toFixed(2),
    e.pieChartWeekTwo(o, u).toFixed(2)
  ];
  new Chart(t, {
    type: 'doughnut',
    data: {
      labels: [
        'Gross Pay',
        'Fica Taxes(Medicare,Social Security)',
        'Federal Tax',
        'State Tax',
        'Overtime Pay',
        'Week 1 Earnings',
        'Week 2 Earnings'
      ],
      datasets: [{ data: h }]
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
