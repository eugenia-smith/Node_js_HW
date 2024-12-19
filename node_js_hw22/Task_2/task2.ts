import { Finance } from "./finance";

const loanPayment = Finance.LoanCalculator.calculateMonthlyPayment(
  100000,
  5,
  60
);
console.log("Monthly Loan Payment:", loanPayment.toFixed(2));

const tax = Finance.TaxCalculator.calculateIncomeTax(50000, 20);
console.log("Income Tax:", tax.toFixed(2));
