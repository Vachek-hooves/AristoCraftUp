const calculateDeposit = (data) => {
    // Extract required values
    const principal = parseFloat(data.depositAmount);
    const interestRate = parseFloat(data.interestPercent) / 100;
    const isCapitalization = data.isCapitalization;
    
    // Get dates
    const startDate = new Date(data.selectedDate);
    const endDate = calculateEndDate(startDate, data.termPlacement);
    const termInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Calculate based on payout frequency
    let totalInterest = 0;
    let finalAmount = principal;
  
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
      }
      totalInterest = finalAmount - principal;
    } else {
      // Simple interest calculation
      totalInterest = (principal * interestRate * termInDays) / 365;
      finalAmount = principal + totalInterest;
    }
  
    // Handle additional deposits if any
    if (data.deposits !== 'One-time' && data.depositAmount2) {
      const additionalDeposit = parseFloat(data.depositAmount2);
      const depositDate = new Date(data.depositDate);
      const remainingDays = Math.floor((endDate - depositDate) / (1000 * 60 * 60 * 24));
      
      let additionalInterest = 0;
      if (isCapitalization) {
        // Compound interest for additional deposit
        additionalInterest = additionalDeposit * (Math.pow(1 + interestRate/365, remainingDays) - 1);
      } else {
        // Simple interest for additional deposit
        additionalInterest = (additionalDeposit * interestRate * remainingDays) / 365;
      }
      
      totalInterest += additionalInterest;
      finalAmount += additionalDeposit + additionalInterest;
    }
  
    // Handle withdrawals if any
    if (data.withdrawalType !== 'One-time' && data.withdrawalAmount) {
      const withdrawalAmount = parseFloat(data.withdrawalAmount);
      const withdrawalDate = new Date(data.withdrawalDate);
      const remainingDays = Math.floor((endDate - withdrawalDate) / (1000 * 60 * 60 * 24));
      
      finalAmount -= withdrawalAmount;
      
      // Adjust interest for the withdrawn amount
      const withdrawalInterest = isCapitalization
        ? withdrawalAmount * (Math.pow(1 + interestRate/365, remainingDays) - 1)
        : (withdrawalAmount * interestRate * remainingDays) / 365;
      
      totalInterest -= withdrawalInterest;
    }
  
    // Check non-reducible balance
    const nonReducibleBalance = parseFloat(data.nonReducibleBalance) || 0;
    if (finalAmount < nonReducibleBalance) {
      throw new Error('Final amount cannot be less than non-reducible balance');
    }
  
    return {
      initialDeposit: principal,
      totalInterest: Math.round(totalInterest * 100) / 100,
      finalAmount: Math.round(finalAmount * 100) / 100,
      effectiveRate: Math.round((totalInterest / principal * 100) * 100) / 100,
      termInDays,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
  };
  
  const calculateEndDate = (startDate, termPlacement) => {
    const date = new Date(startDate);
    switch (termPlacement) {
      case 'Days':
        date.setDate(date.getDate() + parseInt(termValue));
        break;
      case 'Months':
        date.setMonth(date.getMonth() + parseInt(termValue));
        break;
      case 'Years':
        date.setFullYear(date.getFullYear() + parseInt(termValue));
        break;
    }
    return date;
  };
  
  // Usage in handleCalculate
  const handleCalculate = async () => {
    try {
      if (!validateFields()) {
        const firstError = Object.values(errors)[0];
        Alert.alert('Validation Error', firstError);
        return;
      }
  
      const result = calculateDeposit(calculatorData);
      console.log('Calculation result:', result);
  
      // Save results and navigate
      await updateCalculatorData({
        ...calculatorData,
        calculationResult: result
      });
  
      // navigation.navigate('CalculationResults');
  
    } catch (error) {
      console.error('Calculation error:', error);
      Alert.alert('Error', error.message || 'Failed to calculate deposit');
    }
  };