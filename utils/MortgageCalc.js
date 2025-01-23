export const calculateMortgage = formData => {
  // Convert all numeric inputs to numbers and handle percentages
  const propertyValue = parseFloat(formData.propertyValue);
  const initialPaymentPercent = parseFloat(formData.initialPayment);
  const interestRate = parseFloat(formData.interestRate) / 100; // Convert to decimal
  const loanTerm = convertTermToMonths(
    parseFloat(formData.loanTerm),
    formData.termType,
  );

  // Calculate loan amount based on calculation type
  let loanAmount;
  if (formData.calculationType === 'BY PROPERTY VALUE') {
    // Calculate loan amount by subtracting initial payment
    const initialPaymentAmount = (propertyValue * initialPaymentPercent) / 100;
    loanAmount = propertyValue - initialPaymentAmount;
  } else {
    // For 'BY LOAN AMOUNT', use property value directly as loan amount
    loanAmount = propertyValue;
  }

  // Monthly interest rate
  const monthlyInterestRate = interestRate / 12;

  let monthlyPayment, totalPayment, totalInterest;

  if (formData.paymentType === 'Annuity') {
    // Annuity payment formula: PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    // Where: P = principal (loan amount), r = monthly interest rate, n = total number of months
    monthlyPayment =
      (loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm))) /
      (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);

    totalPayment = monthlyPayment * loanTerm;
    totalInterest = totalPayment - loanAmount;
  } else {
    // Differentiated payment calculation
    // Initial principal payment (constant throughout the term)
    const monthlyPrincipal = loanAmount / loanTerm;

    // Calculate payments for each month
    let totalPaymentDiff = 0;
    const payments = [];

    for (let month = 1; month <= loanTerm; month++) {
      const remainingBalance = loanAmount - monthlyPrincipal * (month - 1);
      const interestPayment = remainingBalance * monthlyInterestRate;
      const monthlyPaymentDiff = monthlyPrincipal + interestPayment;

      payments.push({
        month,
        payment: monthlyPaymentDiff,
        principal: monthlyPrincipal,
        interest: interestPayment,
        remainingBalance: remainingBalance - monthlyPrincipal,
      });

      totalPaymentDiff += monthlyPaymentDiff;
    }

    // First and last monthly payments for differentiated
    monthlyPayment = {
      initial: payments[0].payment,
      final: payments[payments.length - 1].payment,
    };
    totalPayment = totalPaymentDiff;
    totalInterest = totalPaymentDiff - loanAmount;
  }

  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    initialPaymentAmount:
      formData.calculationType === 'BY PROPERTY VALUE'
        ? (propertyValue * initialPaymentPercent) / 100
        : 0,
    effectiveRate: (interestRate * 100).toFixed(2), // Annual rate in percentage
    loanTermMonths: loanTerm,
    loanTermYears: (loanTerm / 12).toFixed(1),
  };
};

// Helper function to convert term to months based on selected type
const convertTermToMonths = (term, termType) => {
  switch (termType) {
    case 'Years':
      return term * 12;
    case 'Months':
      return term;
    case 'Days':
      return Math.ceil(term / 30); // Approximate months from days
    default:
      return term * 12; // Default to years
  }
};

// Helper function to format currency
export const formatCurrency = amount => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Helper function to format percentage
export const formatPercent = value => {
  return `${Number(value).toFixed(2)}%`;
};

// Helper function to calculate amortization schedule
export const calculateAmortizationSchedule = formData => {
  const {loanAmount, monthlyPayment, loanTermMonths, monthlyInterestRate} =
    calculateMortgage(formData);

  const schedule = [];
  let remainingBalance = loanAmount;

  for (let month = 1; month <= loanTermMonths; month++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return schedule;
};
