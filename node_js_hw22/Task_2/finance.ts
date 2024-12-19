export namespace Finance {
  export class LoanCalculator {
    static calculateMonthlyPayment(
      principal: number,
      rate: number,
      months: number
    ): number {
      const monthlyRate = rate / 12 / 100;
      return (
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      );
    }
  }

  export class TaxCalculator {
    static calculateIncomeTax(income: number, taxRate: number): number {
      return income * (taxRate / 100);
    }
  }
}
