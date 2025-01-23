import {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({
  deductions: [],
  setDeductions: () => {},
});

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
    calculationResult: null,
  });
  const [piggyBanks, setPiggyBanks] = useState([]);
  const [deductions, setDeductions] = useState([]);
  // console.log(calculatorData);
  console.log(piggyBanks);
  console.log(deductions);

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

  useEffect(() => {
    const loadPiggyBanks = async () => {
      try {
        const savedPiggyBanks = await AsyncStorage.getItem('piggyBanks');
        if (savedPiggyBanks) {
          setPiggyBanks(JSON.parse(savedPiggyBanks));
        }
      } catch (error) {
        console.error('Error loading piggy banks:', error);
      }
    };
    loadPiggyBanks();
  }, []);

  useEffect(() => {
    const loadDeductions = async () => {
      try {
        const savedDeductions = await AsyncStorage.getItem('deductions');
        if (savedDeductions) {
          setDeductions(JSON.parse(savedDeductions));
        }
      } catch (error) {
        console.error('Error loading deductions:', error);
      }
    };
    loadDeductions();
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

  const savePiggyBank = async newPiggyBank => {
    try {
      const updatedPiggyBanks = [...piggyBanks, newPiggyBank];
      await AsyncStorage.setItem(
        'piggyBanks',
        JSON.stringify(updatedPiggyBanks),
      );
      setPiggyBanks(updatedPiggyBanks);
      return true;
    } catch (error) {
      console.error('Error saving piggy bank:', error);
      return false;
    }
  };

  const saveDeduction = async (newDeduction) => {
    try {
      const updatedDeductions = [...deductions, newDeduction];
      await AsyncStorage.setItem('deductions', JSON.stringify(updatedDeductions));
      setDeductions(updatedDeductions);
      return true;
    } catch (error) {
      console.error('Error saving deduction:', error);
      return false;
    }
  };

  const updatePiggyBankAmount = async (id, newAmount) => {
    try {
      const updatedPiggyBanks = piggyBanks.map(piggy => 
        piggy.id === id 
          ? {...piggy, currentAmount: newAmount}
          : piggy
      );

      await AsyncStorage.setItem('piggyBanks', JSON.stringify(updatedPiggyBanks));
      setPiggyBanks(updatedPiggyBanks);
      return true;
    } catch (error) {
      console.error('Error updating piggy bank amount:', error);
      return false;
    }
  };

  const value = {
    calculatorData,
    updateCalculatorData,
    piggyBanks,
    savePiggyBank,
    deductions,
    saveDeduction,
    setDeductions,
    updatePiggyBankAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
