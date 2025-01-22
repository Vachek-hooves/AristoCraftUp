import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

const DepositCalculator = () => {
  const [depositAmount, setDepositAmount] = useState('5000')
  const [termValue, setTermValue] = useState('12')
  const [termPlacement, setTermPlacement] = useState('Months')
  const [interestRate, setInterestRate] = useState('Fixed')
  const [payoutFrequency, setPayoutFrequency] = useState('Every week')
  const [deposits, setDeposits] = useState('One-time')
  const [depositAmount2, setDepositAmount2] = useState('500')
  const [withdrawalType, setWithdrawalType] = useState('One-time')
  const [withdrawalAmount, setWithdrawalAmount] = useState('500')
  const [nonReducibleBalance, setNonReducibleBalance] = useState('60')

  const termOptions = ['Months', 'Days', 'Years']
  const interestRateOptions = ['Fixed', 'Depends on the amount', 'Depends on the time limit']
  const payoutFrequencyOptions = [
    'Every week',
    'At the end of the term',
    'Every day',
    'Once a month',
    'Once a quarter',
    'Every six months',
    'Once a year'
  ]
  const withdrawalOptions = [
    'One-time',
    'Once a month',
    'Once every 2 months',
    'Once a quarter',
    'Once a year'
  ]

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Deposit Calculator</Text>
      
      <Image 
        source={require('../../assets/images/vector/calculator.png')}
        style={styles.calculatorIcon}
      />

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
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

        <View style={styles.inputGroup}>
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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Term of placement</Text>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{termPlacement}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Image 
              source={require('../../assets/images/vector/calendar.png')}
              style={styles.calendarIcon}
            />
            <Text style={styles.dateButtonText}>Select date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Interest rate</Text>
          <View style={styles.rateContainer}>
            <TouchableOpacity style={[styles.selectButton, { flex: 1 }]}>
              <Text style={styles.selectButtonText}>{interestRate}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
            <Text style={styles.percentSign}>%</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.checkboxRow}>
            <TouchableOpacity style={styles.checkbox} />
            <Text style={styles.label}>Interest capitalization</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Interest payout frequency</Text>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{payoutFrequency}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Deposits</Text>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{deposits}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Partial withdrawals</Text>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{withdrawalType}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
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

        <View style={styles.inputGroup}>
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
  )
}

export default DepositCalculator

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
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
})