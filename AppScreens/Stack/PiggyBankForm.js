import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {useAppContext} from '../../store/context';
import MainLayout from '../../components/layout/MainLayout';

const PiggyBankForm = ({navigation}) => {
  const {savePiggyBank} = useAppContext();
  const [formData, setFormData] = useState({
    goalName: '',
    targetAmount: '',
    targetDate: null,
    description: '',
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAmountChange = text => {
    // Allow only numbers and decimal point
    const regex = /^\d*\.?\d*$/;
    if (text === '' || regex.test(text)) {
      // Prevent multiple decimal points
      if (text.split('.').length - 1 <= 1) {
        // Limit decimal places to 2
        if (text.includes('.')) {
          const [, decimal] = text.split('.');
          if (decimal && decimal.length <= 2) {
            setFormData({...formData, targetAmount: text});
          }
        } else {
          setFormData({...formData, targetAmount: text});
        }
      }
    }
  };

  // Validate form
  const isFormValid = () => {
    if (!formData.goalName.trim()) {
      return false;
    }

    const amount = parseFloat(formData.targetAmount);
    if (isNaN(amount) || amount <= 0) {
      return false;
    }

    if (!formData.targetDate) {
      return false;
    }

    if (!formData.description.trim()) {
      return false;
    }

    return true;
  };

  const handleDateSelect = date => {
    setFormData({...formData, targetDate: date});
    setShowCalendar(false);
  };

  const handleSave = async () => {
    if (!formData.goalName.trim()) {
      Alert.alert('Error', 'Please enter a goal name');
      return;
    }

    const amount = parseFloat(formData.targetAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid target amount');
      return;
    }

    if (!formData.targetDate) {
      Alert.alert('Error', 'Please select a target date');
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    const newPiggyBank = {
      id: Date.now().toString(),
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      createdAt: new Date().toISOString(),
      currentAmount: 0,
    };

    const success = await savePiggyBank(newPiggyBank);
    if (success) {
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to save piggy bank');
    }
  };

  // Format date for display
  const formatDate = date => {
    if (!date) return 'Target Date';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Piggy bank</Text>
          <View style={{width: 40}} />
        </View>

        <ScrollView style={styles.content}>
          <Image
            source={require('../../assets/images/vector/piggybank.png')}
            style={styles.piggyImage}
            resizeMode="contain"
          />

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Goal Name"
              placeholderTextColor="#6B7280"
              value={formData.goalName}
              onChangeText={text => setFormData({...formData, goalName: text})}
            />

            <TextInput
              style={styles.input}
              placeholder="Target Amount"
              placeholderTextColor="#6B7280"
              keyboardType="decimal-pad"
              value={formData.targetAmount}
              onChangeText={handleAmountChange}
              maxLength={10}
            />

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowCalendar(true)}>
              <Text
                style={[
                  styles.dateText,
                  formData.targetDate && styles.activeText,
                ]}>
                {formatDate(formData.targetDate)}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description"
              placeholderTextColor="#6B7280"
              multiline
              value={formData.description}
              onChangeText={text =>
                setFormData({...formData, description: text})
              }
            />
          </View>

          {isFormValid() && (
            <TouchableOpacity style={styles.doneButton} onPress={handleSave}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <Modal visible={showCalendar} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              <CalendarPicker
                onDateChange={handleDateSelect}
                minDate={new Date()}
                selectedDayColor="#2196F3"
                selectedDayTextColor="#FFFFFF"
                textStyle={{color: '#FFFFFF'}}
                todayBackgroundColor="green"
                todayTextStyle={{color: 'yellow'}}
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
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000824',
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
    padding: 16,
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
    color: '#6B7280',
    fontSize: 16,
  },
  activeText: {
    color: '#FFFFFF',
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
    width: '100%',
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
  doneButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PiggyBankForm;
