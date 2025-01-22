import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const MortgageCalculator = () => {
  const [activeTab, setActiveTab] = useState('BY PROPERTY VALUE');
  const [paymentType, setPaymentType] = useState('Annuity');
  const [loanTerm, setLoanTerm] = useState('Years');
  const loanTermData = [
    {label: 'Years', value: 'Years'},
    {label: 'Months', value: 'Months'},
    {label: 'Days', value: 'Days'},
  ];
  console.log(loanTerm);

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
          style={styles.input}
          placeholder="Property Value"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Initial payment (%)"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
        />

        <View style={styles.termContainer}>
          <TextInput
            style={[styles.input, styles.termInput]}
            placeholder="Loan term"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={loanTermData}
            maxHeight={200}
            labelField="label"
            valueField="value"
            // placeholder="Select Loan Term"
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
            value={loanTerm}
            onChange={setLoanTerm}
         
          />
          {/* <Pressable style={styles.termSelector}>
            <Text style={styles.termText}>{loanTerm}</Text>
            <Text style={styles.termArrow}>›</Text>
          </Pressable> */}
        </View>

        <TextInput
          style={[styles.input]}
          placeholder="Interest Rate (%)"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Type of Monthly Payments</Text>

        <Pressable
          style={[
            styles.radioButton,
            paymentType === 'Annuity' && styles.radioButtonActive,
          ]}
          onPress={() => setPaymentType('Annuity')}>
          <View style={styles.radio}>
            {paymentType === 'Annuity' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioText}>Annuity</Text>
        </Pressable>

        <Pressable
          style={[
            styles.radioButton,
            paymentType === 'Differentiated' && styles.radioButtonActive,
          ]}
          onPress={() => setPaymentType('Differentiated')}>
          <View style={styles.radio}>
            {paymentType === 'Differentiated' && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={styles.radioText}>Differentiated</Text>
        </Pressable>

        <TouchableOpacity style={styles.calculateButton}>
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
  },
  termInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
  },
  termSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2F3B52',
    borderRadius: 8,
    padding: 12,
    width: 100,
  },
  termText: {
    color: '#FFFFFF',
    flex: 1,
  },
  termArrow: {
    color: '#FFFFFF',
    fontSize: 18,
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
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
    backgroundColor: '#000D39',
    borderRadius: 12,
    padding: 16,
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
});

export default MortgageCalculator;
