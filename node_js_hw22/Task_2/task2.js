"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finance_1 = require("./finance");
var loanPayment = finance_1.Finance.LoanCalculator.calculateMonthlyPayment(100000, 5, 60);
console.log("Monthly Loan Payment:", loanPayment.toFixed(2));
var tax = finance_1.Finance.TaxCalculator.calculateIncomeTax(50000, 20);
console.log("Income Tax:", tax.toFixed(2));
