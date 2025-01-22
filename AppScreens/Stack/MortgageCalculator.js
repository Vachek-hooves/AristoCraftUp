import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {loanTermData} from '../../data/DropDown';
import {validateMortgageForm} from '../../utils/mortgageValidation';
import TabSelector from '../../components/MortgageComponents/TabSelector';
import RadioSelector from '../../components/MortgageComponents/RadioSelector';

const MortgageCalculator = ({navigation}) => {
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    calculationType: 'BY PROPERTY VALUE',
    propertyValue: '',
    initialPayment: '',
    loanTerm: '',
    termType: 'Years',
    interestRate: '',
    paymentType: 'Annuity',
    id: new Date().getTime().toString(),
  });


  // Validate form fields
  useEffect(() => {
    const {isValid, errors: newErrors} = validateMortgageForm(formData);
    setErrors(newErrors);
    setIsFormValid(isValid);
  }, [formData]);

  const handleCalculate = () => {
    const {isValid, errors: newErrors} = validateMortgageForm(formData);
    if (!isValid) {
      const firstError = Object.values(newErrors)[0];
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
    // Here add navigation to results or further processing
  };

  const handleTabChange = tab => {
    setFormData({...formData, calculationType: tab});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mortgage Calculator</Text>

      {/* Calculator Icon */}
      <Image
        source={require('../../assets/images/vector/calculator.png')}
        style={styles.calculatorIcon}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <TabSelector
        activeTab={formData.calculationType}
        onTabChange={handleTabChange}
      />

      {/* Calculator Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errors.propertyValue && styles.inputError]}
          placeholder={
            formData.calculationType === 'BY PROPERTY VALUE'
              ? 'Property Value'
              : 'Loan Amount'
          }
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={formData.propertyValue}
          onChangeText={value =>
            setFormData({...formData, propertyValue: value})
          }
        />

        <TextInput
          style={[styles.input, errors.initialPayment && styles.inputError]}
          placeholder="Initial payment (%)"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={formData.initialPayment}
          onChangeText={value =>
            setFormData({...formData, initialPayment: value})
          }
        />

        <View style={styles.termContainer}>
          <TextInput
            style={[
              styles.input,
              styles.termInput,
              errors.loanTerm && styles.inputError,
            ]}
            placeholder="Loan term"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
            value={formData.loanTerm}
            onChangeText={value => setFormData({...formData, loanTerm: value})}
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
          onChangeText={value =>
            setFormData({...formData, interestRate: value})
          }
        />

        <RadioSelector
          selectedValue={formData.paymentType}
          onValueChange={value =>
            setFormData({...formData, paymentType: value})
          }
        />

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
      </ScrollView>
    </SafeAreaView>
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
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 24,
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
  scrollView: {
    flex: 1,
  },
});

export default MortgageCalculator;
