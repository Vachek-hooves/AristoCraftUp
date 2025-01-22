import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomDropdown from '../../components/Custom/CustomDropdown';

const DepositCalculator = () => {
  const [depositAmount, setDepositAmount] = useState('5000');
  const [termValue, setTermValue] = useState('12');
  const [termPlacement, setTermPlacement] = useState('Months');
  const [interestRate, setInterestRate] = useState('Fixed');
  const [payoutFrequency, setPayoutFrequency] = useState('Every week');
  const [deposits, setDeposits] = useState('One-time');
  const [depositAmount2, setDepositAmount2] = useState('500');
  const [withdrawalType, setWithdrawalType] = useState('One-time');
  const [withdrawalAmount, setWithdrawalAmount] = useState('500');
  const [nonReducibleBalance, setNonReducibleBalance] = useState('60');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const termOptions = ['Months', 'Days', 'Years'];
  const interestRateOptions = [
    'Fixed',
    'Depends on the amount',
    'Depends on the time limit',
  ];
  const payoutFrequencyOptions = [
    'Every week',
    'At the end of the term',
    'Every day',
    'Once a month',
    'Once a quarter',
    'Every six months',
    'Once a year',
  ];
  const withdrawalOptions = [
    'One-time',
    'Once a month',
    'Once every 2 months',
    'Once a quarter',
    'Once a year',
  ];

  const handleDropdownPress = dropdownName => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleOptionSelect = (option, setter) => {
    setter(option);
    setActiveDropdown(null);
  };

  const renderDropdown = (options, currentValue, setter, index) => {
    return (
      <View style={[styles.dropdownMenu, {zIndex: 1000 - index}]}>
        {options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.dropdownItem}
            onPress={() => handleOptionSelect(option, setter)}>
            <Text style={styles.dropdownText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Deposit Calculator</Text>

      <Image
        source={require('../../assets/images/vector/calculator.png')}
        style={styles.calculatorIcon}
      />

      <View style={styles.formContainer}>
        <View style={[styles.inputGroup, {zIndex: 6}]}>
          <Text style={styles.label}>Deposit amount</Text>
          <TextInput
            style={styles.input}
            value={depositAmount}
            onChangeText={setDepositAmount}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 5}]}>
          <Text style={styles.label}>Term value</Text>
          <TextInput
            style={styles.input}
            value={termValue}
            onChangeText={setTermValue}
            keyboardType="numeric"
            placeholder="Enter term"
            placeholderTextColor="#6B7280"
          />
        </View>

        <CustomDropdown
          label="Term of placement"
          options={termOptions}
          value={termPlacement}
          onSelect={setTermPlacement}
          zIndex={8}
        />

        <View style={[styles.inputGroup, {zIndex: 3}]}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Image
              source={require('../../assets/images/vector/calendar.png')}
              style={styles.calendarIcon}
            />
            <Text style={styles.dateButtonText}>Select date</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.inputGroup, {zIndex: 6}]}>
          <Text style={styles.label}>Interest rate</Text>
          <View style={styles.rateContainer}>
            <CustomDropdown
              options={interestRateOptions}
              value={interestRate}
              onSelect={setInterestRate}
              zIndex={6}
            />
            <Text style={styles.percentSign}>%</Text>
          </View>
        </View>
        
        <CustomDropdown
          label="Interest payout frequency"
          options={payoutFrequencyOptions}
          value={payoutFrequency}
          onSelect={setPayoutFrequency}
          zIndex={4}
        />

        <View style={[styles.inputGroup, {zIndex: 5}]}>
          <View style={styles.checkboxRow}>
            <TouchableOpacity style={styles.checkbox} />
            <Text style={styles.label}>Interest capitalization</Text>
          </View>
        </View>

        <CustomDropdown
          label="Interest payout frequency"
          options={payoutFrequencyOptions}
          value={payoutFrequency}
          onSelect={setPayoutFrequency}
          zIndex={4}
        />

        <CustomDropdown
          label="Deposits"
          options={withdrawalOptions}
          value={deposits}
          onSelect={setDeposits}
          zIndex={3}
        />

        <View style={[styles.inputGroup, {zIndex: 2}]}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={depositAmount2}
            onChangeText={setDepositAmount2}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#6B7280"
          />
        </View>

        <CustomDropdown
          label="Partial withdrawals"
          options={withdrawalOptions}
          value={withdrawalType}
          onSelect={setWithdrawalType}
          zIndex={1}
        />

        <View style={[styles.inputGroup, {zIndex: 4}]}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={withdrawalAmount}
            onChangeText={setWithdrawalAmount}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 5}]}>
          <Text style={styles.label}>Non-reducible balance</Text>
          <TextInput
            style={styles.input}
            value={nonReducibleBalance}
            onChangeText={setNonReducibleBalance}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#6B7280"
          />
        </View>

        <TouchableOpacity style={styles.calculateButton}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DepositCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  calculatorIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  'inputGroup:nth-child(1)': {
    zIndex: 6,
  },
  'inputGroup:nth-child(2)': {
    zIndex: 5,
  },
  'inputGroup:nth-child(3)': {
    zIndex: 4,
  },
  'inputGroup:nth-child(4)': {
    zIndex: 3,
  },
  'inputGroup:nth-child(5)': {
    zIndex: 2,
  },
  label: {
    color: '#6B7280',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#001250',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  selectButton: {
    backgroundColor: '#001250',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
  },
  chevron: {
    color: 'white',
    fontSize: 20,
  },
  dateButton: {
    backgroundColor: '#001250',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  dateButtonText: {
    color: '#6B7280',
    fontSize: 16,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  percentSign: {
    color: 'white',
    fontSize: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#0066FF',
    borderRadius: 6,
  },
  calculateButton: {
    backgroundColor: '#666666',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#001250',
    borderRadius: 12,
    marginTop: 4,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
});
