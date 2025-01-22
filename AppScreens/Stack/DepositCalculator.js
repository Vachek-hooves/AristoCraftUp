import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  termOptions,
  interestRateOptions,
  payoutFrequencyOptions,
  withdrawalOptions,
} from '../../data/DropDown';
import CalendarPicker from 'react-native-calendar-picker';

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
  const [interestPercent, setInterestPercent] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const formatDate = date => {
    if (!date) return 'Select date';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = date => {
    console.log('Selected date:', date);
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Deposit Calculator</Text>

      <Image
        source={require('../../assets/images/vector/calculator.png')}
        style={styles.calculatorIcon}
      />

      <View style={styles.formContainer}>
        <View style={[styles.inputGroup, {zIndex: 10}]}>
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

        <View style={[styles.inputGroup, {zIndex: 9}]}>
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

        <View style={[styles.inputGroup, {zIndex: 8}]}>
          <Text style={styles.label}>Term of placement</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={termOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={termPlacement}
            onChange={item => setTermPlacement(item.value)}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>
        <View style={[styles.inputGroup, {zIndex: 7}, ,]}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              {backgroundColor: '#000D39', paddingVertical: 4, height: 55},
            ]}
            onPress={() => setIsCalendarVisible(true)}
            activeOpacity={0.7}>
            <Image
              source={require('../../assets/images/vector/calendar.png')}
              style={styles.calendarIcon}
            />
            <Text
              style={[
                styles.dateButtonText,
                selectedDate && styles.dateSelectedText,
              ]}>
              {formatDate(selectedDate)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.inputGroup, {zIndex: 6}]}>
          <Text style={styles.label}>Interest rate</Text>
          <View style={styles.rateContainer}>
            <View style={{flex: 1}}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                data={interestRateOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={interestRate}
                onChange={item => setInterestRate(item.value)}
                containerStyle={styles.dropdownContainer}
                itemContainerStyle={styles.dropdownItemContainer}
                itemTextStyle={styles.dropdownItemText}
                activeColor="#000824"
                backgroundColor={'#001250' + 90}
              />
            </View>
            <View style={styles.percentInputContainer}>
              <TextInput
                style={styles.percentInput}
                value={interestPercent}
                onChangeText={setInterestPercent}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#6B7280"
              />
              <Text style={styles.percentSign}>%</Text>
            </View>
          </View>
        </View>

        <View style={[styles.inputGroup, {zIndex: 5}]}>
          <View style={styles.checkboxRow}>
            <TouchableOpacity style={styles.checkbox} />
            <Text style={styles.label}>Interest capitalization</Text>
          </View>
        </View>

        <View style={[styles.inputGroup, {zIndex: 4}]}>
          <Text style={styles.label}>Interest payout frequency</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={payoutFrequencyOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={payoutFrequency}
            onChange={item => setPayoutFrequency(item.value)}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 3}]}>
          <Text style={styles.label}>Deposits</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            data={withdrawalOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={deposits}
            onChange={item => setDeposits(item.value)}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>

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
            value={withdrawalType}
            onChange={item => setWithdrawalType(item.value)}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor="#000824"
            backgroundColor={'#001250' + 90}
          />
        </View>

        <View style={[styles.inputGroup, {zIndex: 0}]}>
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

        <View style={[styles.inputGroup, {zIndex: -1}]}>
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

        <TouchableOpacity style={[styles.calculateButton, {zIndex: -2}]}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
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
                  dayLabelsWrapper={{
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    backgroundColor: '#001250',
                  }}
                  previousComponent={
                    <Text style={styles.navigationArrow}>{'<'}</Text>
                  }
                  nextComponent={
                    <Text style={styles.navigationArrow}>{'>'}</Text>
                  }
                  weekdays={['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']}
                  weekdaysStyle={styles.weekdayLabel}
                //   dayLabelsWrapper={styles.dayLabelsWrapper}
                  customDatesStyles={[
                    {
                      date: selectedDate,
                      style: {backgroundColor: '#0066FF'},
                      textStyle: {color: '#FFFFFF'},
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

export default DepositCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001250',
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
    fontSize: 14,
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
    // maxWidth: 340,
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
    backgroundColor: '#000D39',
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
    // color: '#6B7280',
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
