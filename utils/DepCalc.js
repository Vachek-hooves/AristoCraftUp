const calculateDeposit = (data) => {
  // Validate input data
  if (!data.depositAmount || !data.selectedDate || !data.interestPercent) {
    throw new Error('Missing required fields');
  }

  // Extract required values
  const principal = parseFloat(data.depositAmount);
  const interestRate = parseFloat(data.interestPercent) / 100;
  const isCapitalization = data.isCapitalization;
  
  // Get dates
  const startDate = new Date(data.selectedDate);
  const endDate = calculateEndDate(startDate, data.termPlacement, data.termValue);
  const termInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  
  // Initialize calculation variables
  let totalInterest = 0;
  let finalAmount = principal;
  let totalDeposits = principal;
  let totalWithdrawals = 0;

  if (isCapitalization) {
    // Compound interest calculation
    switch (data.payoutFrequency) {
      case 'Every day':
        finalAmount = principal * Math.pow(1 + interestRate/365, termInDays);
        break;
      case 'Every week':
        finalAmount = principal * Math.pow(1 + interestRate/52, termInDays/7);
        break;
      case 'Every month':
        finalAmount = principal * Math.pow(1 + interestRate/12, termInDays/30);
        break;
      case 'Every quarter':
        finalAmount = principal * Math.pow(1 + interestRate/4, termInDays/91);
        break;
      case 'Every year':
        finalAmount = principal * Math.pow(1 + interestRate, termInDays/365);
        break;
      default:
        finalAmount = principal * Math.pow(1 + interestRate/12, termInDays/30);
    }
    totalInterest = finalAmount - principal;
  } else {
    // Simple interest calculation
    totalInterest = (principal * interestRate * termInDays) / 365;
    finalAmount = principal + totalInterest;
  }

  // Handle additional deposits
  if (data.deposits !== 'One-time' && data.depositAmount2 && data.depositDate) {
    const additionalDeposit = parseFloat(data.depositAmount2);
    const depositDate = new Date(data.depositDate);
    const remainingDays = Math.floor((endDate - depositDate) / (1000 * 60 * 60 * 24));
    
    if (remainingDays > 0) {
      totalDeposits += additionalDeposit;
      let additionalInterest = 0;
      
      if (isCapitalization) {
        additionalInterest = additionalDeposit * (Math.pow(1 + interestRate/365, remainingDays) - 1);
      } else {
        additionalInterest = (additionalDeposit * interestRate * remainingDays) / 365;
      }
      
      totalInterest += additionalInterest;
      finalAmount += additionalDeposit + additionalInterest;
    }
  }

  // Handle withdrawals
  if (data.withdrawalType !== 'One-time' && data.withdrawalAmount && data.withdrawalDate) {
    const withdrawalAmount = parseFloat(data.withdrawalAmount);
    const withdrawalDate = new Date(data.withdrawalDate);
    const remainingDays = Math.floor((endDate - withdrawalDate) / (1000 * 60 * 60 * 24));
    
    if (remainingDays > 0) {
      totalWithdrawals += withdrawalAmount;
      finalAmount -= withdrawalAmount;
      
      const withdrawalInterest = isCapitalization
        ? withdrawalAmount * (Math.pow(1 + interestRate/365, remainingDays) - 1)
        : (withdrawalAmount * interestRate * remainingDays) / 365;
      
      totalInterest -= withdrawalInterest;
    }
  }

  // Calculate tax (example: 15% of interest earned)
  const tax = totalInterest * 0.15;

  // Check non-reducible balance
  const nonReducibleBalance = parseFloat(data.nonReducibleBalance) || 0;
  if (finalAmount < nonReducibleBalance) {
    throw new Error('Final amount cannot be less than non-reducible balance');
  }

  return {
    initialDeposit: principal,
    totalDeposits,
    totalWithdrawals,
    totalInterest: Math.round(totalInterest * 100) / 100,
    finalAmount: Math.round(finalAmount * 100) / 100,
    effectiveRate: Math.round((totalInterest / principal * 100) * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    termInDays,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
};

const calculateEndDate = (startDate, termPlacement, termValue) => {
  const date = new Date(startDate);
  const value = parseInt(termValue);
  
  if (isNaN(value)) {
    throw new Error('Invalid term value');
  }

  switch (termPlacement) {
    case 'Days':
      date.setDate(date.getDate() + value);
      break;
    case 'Months':
      date.setMonth(date.getMonth() + value);
      break;
    case 'Years':
      date.setFullYear(date.getFullYear() + value);
      break;
    default:
      throw new Error('Invalid term placement');
  }
  return date;
};

export { calculateDeposit };