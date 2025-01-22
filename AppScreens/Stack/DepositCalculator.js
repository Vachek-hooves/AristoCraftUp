import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  SafeAreaView
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import {useAppContext} from '../../store/context';
import {
  termOptions,
  interestRateOptions,
  payoutFrequencyOptions,
  withdrawalOptions,
} from '../../data/DropDown';

const DepositCalculator = ({navigation}) => {
  const {calculatorData, updateCalculatorData} = useAppContext();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState(null);
  const [errors, setErrors] = useState({});

  const handleOpenCalendar = type => {
    setActiveCalendar(type);
    setIsCalendarVisible(true);
  };

  const formatDate = date => {
    if (!date) return 'Select date';

    // Handle string date from AsyncStorage
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    try {
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const handleDateChange = date => {
    if (!date) return;

    const dateObj = new Date(date);

    switch (activeCalendar) {
      case 'main':
        updateCalculatorData({selectedDate: dateObj.toISOString()});
        break;
      case 'deposit':
        updateCalculatorData({depositDate: dateObj.toISOString()});
        break;
      case 'withdrawal':
        updateCalculatorData({withdrawalDate: dateObj.toISOString()});
        break;
    }
    setIsCalendarVisible(false);
  };

  const validateFields = () => {
    const newErrors = {};

    // Required fields validation
    if (!calculatorData.depositAmount) {
      newErrors.depositAmount = 'Initial deposit amount is required';
    }
    if (!calculatorData.termValue) {
      newErrors.termValue = 'Term value is required';
    }
    if (!calculatorData.termPlacement) {
      newErrors.termPlacement = 'Term placement is required';
    }
    if (!calculatorData.selectedDate) {
      newErrors.selectedDate = 'Start date is required';
    }
    if (!calculatorData.interestPercent) {
      newErrors.interestPercent = 'Interest rate is required';
    }
    if (!calculatorData.payoutFrequency) {
      newErrors.payoutFrequency = 'Payout frequency is required';
    }

    // Additional deposits validation
    if (calculatorData.deposits !== 'One-time') {
      if (!calculatorData.depositAmount2) {
        newErrors.depositAmount2 = 'Additional deposit amount is required';
      }
      if (!calculatorData.depositDate) {
        newErrors.depositDate = 'Additional deposit date is required';
      }
    }

    // Withdrawals validation
    if (calculatorData.withdrawalType !== 'One-time') {
      if (!calculatorData.withdrawalAmount) {
        newErrors.withdrawalAmount = 'Withdrawal amount is required';
      }
      if (!calculatorData.withdrawalDate) {
        newErrors.withdrawalDate = 'Withdrawal date is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = async () => {
    try {
      if (!validateFields()) {
        const firstError = Object.values(errors)[0];
        Alert.alert('Validation Error', firstError);
        return;
      }

      // Prepare calculation data
      const calculationData = {
        depositAmount: calculatorData.depositAmount,
        termValue: calculatorData.termValue,
        termPlacement: calculatorData.termPlacement,
        selectedDate: calculatorData.selectedDate,
        interestRate: calculatorData.interestRate,
        interestPercent: calculatorData.interestPercent,
        isCapitalization: calculatorData.isCapitalization,
        payoutFrequency: calculatorData.payoutFrequency,
        deposits: calculatorData.deposits,
        depositDate: calculatorData.depositDate,
        depositAmount2: calculatorData.depositAmount2,
        withdrawalType: calculatorData.withdrawalType,
        withdrawalDate: calculatorData.withdrawalDate,
        withdrawalAmount: calculatorData.withdrawalAmount,
        nonReducibleBalance: calculatorData.nonReducibleBalance
      };

      const result = calculateDeposit(calculationData);
      console.log('Calculation result:', result);

      // Save results
      await updateCalculatorData({
        ...calculatorData,
        calculationResult: result
      });

      // Navigate to results
      navigation.navigate('DepositSum');

    } catch (error) {
      console.error('Calculation error:', error);
      Alert.alert('Error', error.message || 'Failed to calculate deposit');
    }
  };

  const calculateDeposit = (data) => {
    // Implement your calculation logic here
    // This is a placeholder and should be replaced with actual calculation
    return 0;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Deposit Calculator</Text>

      <Image
        source={require('../../assets/images/vector/calculator.png')}
        style={styles.calculatorIcon}
      />

      <View style={styles.formContainer}>
        <View style={[styles.inputGroup, {zIndex: 10}]}>
          {/* <Text style={styles.label}>Deposit amount</Text> */}
          <TextInput
            style={styles.input}
            value={calculatorData.depositAmount}
            onChangeText={value => updateCalculatorData({depositAmount: value})}
            keyboardType="numeric"
            placeholder="Deposit amount"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 10}]}>
          {/* <Text style={styles.label}>Deposit amount</Text> */}
          <TextInput
            style={styles.input}
            value={calculatorData.termValue}
            onChangeText={value => updateCalculatorData({termValue: value})}
            keyboardType="numeric"
            placeholder="Term of placement"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 9}]}>
          {/* <Text style={styles.label}>Term of placement</Text> */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={termOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={calculatorData.termPlacement}
            onChange={item => updateCalculatorData({termPlacement: item.value})}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 8}]}>
          {/* <Text style={styles.label}>Date</Text> */}
          <TouchableOpacity
            style={[
              styles.dateButton,
              {backgroundColor: '#000D39', paddingVertical: 4, height: 55},
            ]}
            onPress={() => handleOpenCalendar('main')}
            activeOpacity={0.7}>
            <Image
              source={require('../../assets/images/vector/calendar.png')}
              style={styles.calendarIcon}
            />
            <Text
              style={[
                styles.dateButtonText,
                calculatorData.selectedDate && styles.dateSelectedText,
              ]}>
              {formatDate(calculatorData.selectedDate)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.inputGroup, {zIndex: 7}]}>
          <Text style={styles.label}>Interest rate</Text>
          <View style={styles.rateContainer}>
            <Dropdown
              style={[styles.dropdown, {flex: 1}]}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              data={interestRateOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={calculatorData.interestRate}
              onChange={item =>
                updateCalculatorData({interestRate: item.value})
              }
              containerStyle={styles.dropdownContainer}
              itemContainerStyle={styles.dropdownItemContainer}
              itemTextStyle={styles.dropdownItemText}
              activeColor="#000824"
              backgroundColor={'#001250' + 90}
            />
            <View style={styles.percentInputContainer}>
              <TextInput
                style={styles.percentInput}
                value={calculatorData.interestPercent}
                onChangeText={value =>
                  updateCalculatorData({interestPercent: value})
                }
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#6B7280"
                maxLength={3}
              />
              <Text style={styles.percentSign}>%</Text>
            </View>
          </View>
        </View>

        <View style={[styles.inputGroup, {zIndex: 6}]}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() =>
              updateCalculatorData({
                isCapitalization: !calculatorData.isCapitalization,
              })
            }>
            <View
              style={[
                styles.checkbox,
                calculatorData.isCapitalization && styles.checkboxChecked,
              ]}
            />
            <Text style={styles.label}>Interest capitalization</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.inputGroup, {zIndex: 5}]}>
          <Text style={styles.label}>Interest payout frequency</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={payoutFrequencyOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={calculatorData.payoutFrequency}
            onChange={item =>
              updateCalculatorData({payoutFrequency: item.value})
            }
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 4}]}>
          <Text style={styles.label}>Deposits</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={withdrawalOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={calculatorData.deposits}
            onChange={item => updateCalculatorData({deposits: item.value})}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 3}]}>
          <TouchableOpacity
            style={[
              styles.dateButton,
              {backgroundColor: '#000D39', paddingVertical: 4, height: 55},
            ]}
            onPress={() => handleOpenCalendar('deposit')}
            activeOpacity={0.7}>
            <Image
              source={require('../../assets/images/vector/calendar.png')}
              style={styles.calendarIcon}
            />
            <Text
              style={[
                styles.dateButtonText,
                calculatorData.depositDate && styles.dateSelectedText,
              ]}>
              {formatDate(calculatorData.depositDate)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.inputGroup, {zIndex: 2}]}>
          <TextInput
            style={styles.input}
            value={calculatorData.depositAmount2}
            onChangeText={value =>
              updateCalculatorData({depositAmount2: value})
            }
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 1}]}>
          <Text style={styles.label}>Partial withdrawals</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={withdrawalOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={calculatorData.withdrawalType}
            onChange={item =>
              updateCalculatorData({withdrawalType: item.value})
            }
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 0}]}>
          <TouchableOpacity
            style={[
              styles.dateButton,
              {backgroundColor: '#000D39', paddingVertical: 4, height: 55},
            ]}
            onPress={() => handleOpenCalendar('withdrawal')}
            activeOpacity={0.7}>
            <Image
              source={require('../../assets/images/vector/calendar.png')}
              style={styles.calendarIcon}
            />
            <Text
              style={[
                styles.dateButtonText,
                calculatorData.withdrawalDate && styles.dateSelectedText,
              ]}>
              {formatDate(calculatorData.withdrawalDate)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.inputGroup, {zIndex: -1}]}>
          <TextInput
            style={styles.input}
            value={calculatorData.withdrawalAmount}
            onChangeText={value =>
              updateCalculatorData({withdrawalAmount: value})
            }
            keyboardType="numeric"
            placeholder="Amount"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: -2}]}>
          <Text style={styles.label}>Non-reducible balance</Text>
          <TextInput
            style={styles.input}
            value={calculatorData.nonReducibleBalance}
            onChangeText={value =>
              updateCalculatorData({nonReducibleBalance: value})
            }
            keyboardType="numeric"
            placeholder="Amount"
            placeholderTextColor="#6B7280"
          />
        </View>

        <TouchableOpacity
          style={[styles.calculateButton, {zIndex: -3}]}
          onPress={handleCalculate}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
        statusBarTranslucent>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setIsCalendarVisible(false)}>
            <View style={styles.calendarContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={e => e.stopPropagation()}>
                <CalendarPicker
                  onDateChange={handleDateChange}
                  selectedDayColor="#0066FF"
                  selectedDayTextColor="#FFFFFF"
                  textStyle={{color: '#FFFFFF'}}
                  todayBackgroundColor="transparent"
                  todayTextStyle={{color: '#FFFFFF'}}
                  monthTitleStyle={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  yearTitleStyle={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  dayLabelsWrapper={{borderTopWidth: 0, borderBottomWidth: 0}}
                  previousComponent={
                    <Text style={styles.navigationArrow}>{'<'}</Text>
                  }
                  nextComponent={
                    <Text style={styles.navigationArrow}>{'>'}</Text>
                  }
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={{height: 100}} />
    </ScrollView>
      </SafeAreaView>
  );
};

export default DepositCalculator;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#001250',
  },
  container: {
    flex: 1,
    backgroundColor: '#001250',
  //  paddingTop:50
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
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    color: '#6B7280',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#000D39',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  selectButton: {
    backgroundColor: '#000D39',
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
    padding: 8,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
    tintColor: '#FFF',
  },
  dateButtonText: {
    color: '#6B7280',
    fontSize: 16,
  },
  dateSelectedText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: '#001250',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  percentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000D39',
    borderRadius: 12,
    paddingHorizontal: 12,
    minWidth: 70,
    justifyContent: 'center',
  },
  percentInput: {
    color: 'white',
    fontSize: 16,
    padding: 16,
    minWidth: 40,
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
  checkboxChecked: {
    backgroundColor: '#0066FF',
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
  // dropdownMenu: {
  //   position: 'absolute',
  //   top: '100%',
  //   left: 0,
  //   right: 0,
  //   backgroundColor: '#000D39',
  //   borderRadius: 12,
  //   marginTop: 4,
  //   padding: 8,
  //   elevation: 5,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  // },
  // dropdownItem: {
  //   padding: 12,
  // },
  // dropdownText: {
  //   color: 'white',
  //   fontSize: 16,
  // },
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
  navigationArrow: {
    color: '#FFFFFF',
    fontSize: 24,
    padding: 10,
  },
  weekdayLabel: {
    color: '#6B7280',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  dayLabelsWrapper: {
    backgroundColor: '#001250',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
