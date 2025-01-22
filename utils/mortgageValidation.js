export const validateMortgageForm = formData => {
  const newErrors = {};
  let isValid = true;

  // Validate Property Value
  if (!formData.propertyValue.trim()) {
    newErrors.propertyValue = 'Property value is required';
    isValid = false;
  } else if (
    isNaN(formData.propertyValue) ||
    parseFloat(formData.propertyValue) <= 0
  ) {
    newErrors.propertyValue = 'Enter a valid property value';
    isValid = false;
  }

  // Validate Initial Payment
  if (!formData.initialPayment.trim()) {
    newErrors.initialPayment = 'Initial payment is required';
    isValid = false;
  } else {
    const paymentValue = parseFloat(formData.initialPayment);
    if (isNaN(paymentValue) || paymentValue < 0 || paymentValue > 100) {
      newErrors.initialPayment = 'Initial payment must be between 0 and 100';
      isValid = false;
    }
  }

  // Validate Loan Term
  if (!formData.loanTerm.trim()) {
    newErrors.loanTerm = 'Loan term is required';
    isValid = false;
  } else {
    const termValue = parseFloat(formData.loanTerm);
    if (isNaN(termValue) || termValue <= 0) {
      newErrors.loanTerm = 'Enter a valid loan term';
      isValid = false;
    }
  }

  // Validate Interest Rate
  if (!formData.interestRate.trim()) {
    newErrors.interestRate = 'Interest rate is required';
    isValid = false;
  } else {
    const rateValue = parseFloat(formData.interestRate);
    if (isNaN(rateValue) || rateValue < 0 || rateValue > 100) {
      newErrors.interestRate = 'Interest rate must be between 0 and 100';
      isValid = false;
    }
  }

  return {
    isValid,
    errors: newErrors,
  };
};
