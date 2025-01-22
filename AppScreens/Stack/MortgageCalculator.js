import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const MortgageCalculator = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('BY PROPERTY VALUE');
  const [formData, setFormData] = useState({
    propertyValue: '',
    initialPayment: '',
    loanTerm: '',
    termType: 'Years',
    interestRate: '',
    paymentType: 'Annuity',
    id: new Date().getTime().toString(),
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const loanTermData = [
    {label: 'Years', value: 'Years'},
    {label: 'Months', value: 'Months'},
    {label: 'Days', value: 'Days'},
  ];

  // Validate form fields
  useEffect(() => {
    validateForm();
    console.log('Current form data:', formData); // Debug log
    console.log('Current errors:', errors); // Debug log
    console.log('Is form valid:', isFormValid); // Debug log
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate Property Value
    if (!formData.propertyValue.trim()) {
      newErrors.propertyValue = 'Property value is required';
      isValid = false;
    } else if (isNaN(formData.propertyValue) || parseFloat(formData.propertyValue) <= 0) {
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

    console.log('Validation result:', { isValid, errors: newErrors }); // Debug log
    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleCalculate = () => {
    const isValid = validateForm();
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      Alert.alert('Validation Error', firstError);
      return;
    }

    // Process the form data
    const calculationData = {
      ...formData,
      propertyValue: parseFloat(formData.propertyValue),
      initialPayment: parseFloat(formData.initialPayment),
      loanTerm: parseFloat(formData.loanTerm),
      interestRate: parseFloat(formData.interestRate),
    };

    console.log('Calculation data:', calculationData);
    // Here you can add navigation to results or further processing
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mortgage Calculator</Text>

      {/* Calculator Icon */}
      <Image
        source={require('../../assets/images/vector/calculator.png')}
        style={styles.calculatorIcon}
      />

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'BY PROPERTY VALUE' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('BY PROPERTY VALUE')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'BY PROPERTY VALUE' && styles.activeTabText,
            ]}>
            BY PROPERTY VALUE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'BY LOAN AMOUNT' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('BY LOAN AMOUNT')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'BY LOAN AMOUNT' && styles.activeTabText,
            ]}>
            BY LOAN AMOUNT
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calculator Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errors.propertyValue && styles.inputError]}
          placeholder="Property Value"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={formData.propertyValue}
          onChangeText={(value) => setFormData({...formData, propertyValue: value})}
        />

        <TextInput
          style={[styles.input, errors.initialPayment && styles.inputError]}
          placeholder="Initial payment (%)"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={formData.initialPayment}
          onChangeText={(value) => setFormData({...formData, initialPayment: value})}
        />

        <View style={styles.termContainer}>
          <TextInput
            style={[styles.input, styles.termInput, errors.loanTerm && styles.inputError]}
            placeholder="Loan term"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
            value={formData.loanTerm}
            onChangeText={(value) => setFormData({...formData, loanTerm: value})}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={loanTermData}
            maxHeight={200}
            labelField="label"
            valueField="value"
            value={formData.termType}
            onChange={item => setFormData({...formData, termType: item.value})}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>

        <TextInput
          style={[styles.input, errors.interestRate && styles.inputError]}
          placeholder="Interest Rate (%)"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={formData.interestRate}
          onChangeText={(value) => setFormData({...formData, interestRate: value})}
        />

        <Text style={styles.label}>Type of Monthly Payments</Text>

        <TouchableOpacity
          style={[
            styles.radioButton,
            formData.paymentType === 'Annuity' && styles.radioButtonActive,
          ]}
          onPress={() => setFormData({...formData, paymentType: 'Annuity'})}>
          <View style={styles.radio}>
            {formData.paymentType === 'Annuity' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioText}>Annuity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioButton,
            formData.paymentType === 'Differentiated' && styles.radioButtonActive,
          ]}
          onPress={() => setFormData({...formData, paymentType: 'Differentiated'})}>
          <View style={styles.radio}>
            {formData.paymentType === 'Differentiated' && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={styles.radioText}>Differentiated</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.calculateButton,
            !isFormValid && styles.calculateButtonDisabled,
          ]}
          onPress={handleCalculate}
          disabled={!isFormValid}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
  },
  calculatorIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 14,
  },
  activeTabText: {
    color: '#2196F3',
  },
  formContainer: {
    backgroundColor: '#001250',
    borderRadius: 16,
    padding: 16,
  },
  input: {
    backgroundColor: '#000D39',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
    marginVertical: 6,
  },
  termContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 1000,
  },
  termInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
    backgroundColor: '#000D39',
  },
  dropdown: {
    backgroundColor: '#000D39',
    borderRadius: 12,
    padding: 16,
    width: 120,
    height: 56,
  },
  dropdownContainer: {
    backgroundColor: '#001250',
    borderRadius: 12,
    marginTop: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItemContainer: {
    padding: 4,
    borderRadius: 22,
  },
  dropdownItemText: {
    color: '#FFF',
    fontSize: 18,
  },
  dropdownPlaceholder: {
    fontSize: 17,
  },
  dropdownSelectedText: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    color: '#6B7280',
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2F3B52',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  radioText: {
    color: '#FFFFFF',
  },
  calculateButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  calculateButtonDisabled: {
    backgroundColor: '#6B7280',
    opacity: 0.5,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#FF4444',
  },
});

export default MortgageCalculator;
