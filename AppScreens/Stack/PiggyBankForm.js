import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const PiggyBankForm = ({navigation}) => {
  const [formData, setFormData] = useState({
    goalName: '',
    targetAmount: '',
    targetDate: null,
    description: '',
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = date => {
    const dateObj = new Date(date);
    setFormData({...formData, targetDate: dateObj.toISOString()});
    setShowCalendar(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Piggy bank</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={require('../../assets/images/vector/piggybank.png')}
          style={styles.piggyImage}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Goal Name"
            placeholderTextColor="#FFF"
            value={formData.goalName}
            onChangeText={text => setFormData({...formData, goalName: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="Target Amount"
            placeholderTextColor="#FFF"
            keyboardType="numeric"
            value={formData.targetAmount}
            onChangeText={text =>
              setFormData({...formData, targetAmount: text})
            }
          />

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowCalendar(true)}>
            <Text style={styles.dateText}>
              {formData.targetDate
                ? formData.targetDate.format('MMMM DD, YYYY')
                : 'Target Date'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            placeholderTextColor="#FFF"
            multiline
            value={formData.description}
            onChangeText={text => setFormData({...formData, description: text})}
          />
        </View>
      </View>

      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={handleDateSelect}
            //   minDate={new Date()}
              selectedDayColor="#2196F3"
              selectedDayTextColor="#FFFFFF"
              textStyle={{color: '#FFFFFF'}}
              todayBackgroundColor="transparent"
              todayTextStyle={{color: '#2196F3'}}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    color: '#2196F3',
    fontSize: 16,
  },
  doneButton: {
    color: '#2196F3',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  piggyImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 16,
    backgroundColor: '#001250',
    padding: 10,
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#000D39',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  dateInput: {
    backgroundColor: '#000D39',
    borderRadius: 8,
    padding: 16,
  },
  dateText: {
    color: '#FFF',
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#001250',
    borderRadius: 16,
    padding: 16,
    width: '90%',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PiggyBankForm;
