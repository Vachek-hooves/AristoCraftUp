import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
// import {AppContext} from '../../store/context';
import {categories} from '../../data/categories';
import {useAppContext} from '../../store/context';

// const categories = [
//   {
//     id: 'health',
//     name: 'Health',
//     icon: require('../../assets/images/icons/health.png'),
//   },
//   {
//     id: 'leisure',
//     name: 'Leisure',
//     icon: require('../../assets/images/icons/leisure.png'),
//   },
//   {
//     id: 'home',
//     name: 'Home',
//     icon: require('../../assets/images/icons/home.png'),
//   },
//   {
//     id: 'cafe',
//     name: 'Cafe',
//     icon: require('../../assets/images/icons/cafe.png'),
//   },
//   {
//     id: 'education',
//     name: 'Education',
//     icon: require('../../assets/images/icons/education.png'),
//   },
//   {
//     id: 'gift',
//     name: 'Gift',
//     icon: require('../../assets/images/icons/gift.png'),
//   },
//   {
//     id: 'products',
//     name: 'Products',
//     icon: require('../../assets/images/icons/products.png'),
//   },
//   {
//     id: 'cafe2',
//     name: 'Cafe',
//     icon: require('../../assets/images/icons/cafe2.png'),
//   },
//   {
//     id: 'sport',
//     name: 'Sport',
//     icon: require('../../assets/images/icons/sport.png'),
//   },
//   {
//     id: 'transport',
//     name: 'Transport',
//     icon: require('../../assets/images/icons/transport.png'),
//   },
//   {
//     id: 'accounts',
//     name: 'Accounts',
//     icon: require('../../assets/images/icons/accounts.png'),
//   },
//   {
//     id: 'other',
//     name: 'Other',
//     icon: require('../../assets/images/icons/other.png'),
//   },
// ];

const DeductionForm = ({navigation, route}) => {
  const {type} = route.params;
  //   const {saveDeduction} = useContext(AppContext);
  const {saveDeduction} = useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: new Date(),
    note: '',
    category: '',
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = date => {
    setFormData({...formData, date: new Date(date)});
    setShowCalendar(false);
  };

  const formatDate = date => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.amount || !formData.category) return;

    const newDeduction = {
      id: Date.now().toString(),
      type,
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date.toISOString(),
    };

    const success = await saveDeduction(newDeduction);
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add {type.toLowerCase()}</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Image
          source={require('../../assets/images/vector/handcoin.png')}
          style={styles.headerImage}
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#6B7280"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount expense"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={text => setFormData({...formData, amount: text})}
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCalendar(true)}>
            <Text
              style={[
                styles.inputText,
                formData.date && styles.activeInputText,
              ]}>
              {formatDate(formData.date)}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={[styles.input, styles.noteInput]}
            placeholder="Note"
            placeholderTextColor="#6B7280"
            multiline
            value={formData.note}
            onChangeText={text => setFormData({...formData, note: text})}
          />

          <Text style={styles.categoriesTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() =>
                  setFormData({...formData, category: category.id})
                }>
                <View
                  style={[
                    styles.categoryIconContainer,
                    formData.category === category.id &&
                      styles.selectedCategoryContainer,
                  ]}>
                  <Image source={category.icon} style={styles.categoryIcon} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={handleDateSelect}
              selectedDayColor="#2196F3"
              selectedDayTextColor="#FFFFFF"
              textStyle={{color: '#FFFFFF'}}
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
    backgroundColor: '#000824',
  },
  backButton: {
    fontSize: 16,
    color: '#2196F3',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  doneButton: {
    fontSize: 16,
    color: '#2196F3',
  },
  headerImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#001250',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputText: {
    color: '#6B7280',
    fontSize: 16,
  },
  activeInputText: {
    color: '#FFFFFF',
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIconContainer: {
    // width: 60,
    // height: 60,
    borderRadius: 30,
    backgroundColor: '#001250',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    padding: 12,
  },
  selectedCategoryContainer: {
    backgroundColor: '#2196F3',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    // tintColor: '#FFFFFF',
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
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
});

export default DeductionForm;
