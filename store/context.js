import {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
  const [calculatorData, setCalculatorData] = useState({
    depositAmount: '',
    termValue: '',
    termPlacement: 'Months',
    selectedDate: null,
    interestRate: 'Fixed',
    interestPercent: '',
    isCapitalization: false,
    payoutFrequency: 'Every week',
    deposits: 'One-time',
    depositDate: null,
    depositAmount2: '',
    withdrawalType: 'One-time',
    withdrawalDate: null,
    withdrawalAmount: '',
    nonReducibleBalance: '',
  });
  console.log(calculatorData);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadCalculatorData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('calculatorData');
        if (savedData) {
          setCalculatorData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading calculator data:', error);
      }
    };
    loadCalculatorData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  const updateCalculatorData = async newData => {
    try {
      const updatedData = {...calculatorData, ...newData};
      await AsyncStorage.setItem('calculatorData', JSON.stringify(updatedData));
      setCalculatorData(updatedData);
    } catch (error) {
      console.error('Error saving calculator data:', error);
    }
  };

  const value = {
    calculatorData,
    updateCalculatorData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
