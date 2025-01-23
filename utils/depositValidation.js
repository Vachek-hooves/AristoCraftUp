export const validateDepositForm = (calculatorData) => {0
  const newErrors = {};
  let isValid = true;

  // Validate Deposit Amount
  if (!calculatorData.depositAmount?.trim()) {
    newErrors.depositAmount = 'Deposit amount is required';
    isValid = false;
  } else if (isNaN(calculatorData.depositAmount) || parseFloat(calculatorData.depositAmount) <= 0) {
    newErrors.depositAmount = 'Enter a valid deposit amount';
    isValid = false;
  }

  // Validate Term Value
  if (!calculatorData.termValue?.trim()) {
    newErrors.termValue = 'Term value is required';
    isValid = false;
  } else if (isNaN(calculatorData.termValue) || parseFloat(calculatorData.termValue) <= 0) {
    newErrors.termValue = 'Enter a valid term value';
    isValid = false;
  }

  // Validate Term Placement
  if (!calculatorData.termPlacement) {
    newErrors.termPlacement = 'Term placement is required';
    isValid = false;
  }

  // Validate Selected Date
  if (!calculatorData.selectedDate) {
    newErrors.selectedDate = 'Date is required';
    isValid = false;
  }

  // Validate Interest Rate
  if (!calculatorData.interestRate) {
    newErrors.interestRate = 'Interest rate type is required';
    isValid = false;
  }

  // Validate Interest Percent
  if (!calculatorData.interestPercent?.trim()) {
    newErrors.interestPercent = 'Interest percentage is required';
    isValid = false;
  } else if (
    isNaN(calculatorData.interestPercent) || 
    parseFloat(calculatorData.interestPercent) < 0 || 
    parseFloat(calculatorData.interestPercent) > 100
  ) {
    newErrors.interestPercent = 'Interest percentage must be between 0 and 100';
    isValid = false;
  }

  // Validate Payout Frequency
  if (!calculatorData.payoutFrequency) {
    newErrors.payoutFrequency = 'Payout frequency is required';
    isValid = false;
  }

  // Validate Additional Deposits if enabled
  if (calculatorData.deposits && calculatorData.deposits !== 'One-time') {
    if (!calculatorData.depositAmount2?.trim()) {
      newErrors.depositAmount2 = 'Additional deposit amount is required';
      isValid = false;
    }
    if (!calculatorData.depositDate) {
      newErrors.depositDate = 'Additional deposit date is required';
      isValid = false;
    }
  }

  // Validate Withdrawals if enabled
  if (calculatorData.withdrawalType && calculatorData.withdrawalType !== 'One-time') {
    if (!calculatorData.withdrawalAmount?.trim()) {
      newErrors.withdrawalAmount = 'Withdrawal amount is required';
      isValid = false;
    }
    if (!calculatorData.withdrawalDate) {
      newErrors.withdrawalDate = 'Withdrawal date is required';
      isValid = false;
    }
  }

  return {
    isValid,
    errors: newErrors
  };
};
