import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AppContext} from '../../store/context';

const DeductionForm = ({navigation, route}) => {
  const {type} = route.params; // 'INCOME' or 'EXPENSES'
  const {saveDeduction} = useContext(AppContext);

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date(),
  });

  const handleSave = async () => {
    if (!formData.amount || !formData.category) return;

    const newDeduction = {
      id: Date.now().toString(),
      type: type,
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
        <Text style={styles.title}>{type}</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={text => setFormData({...formData, amount: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="Category"
            placeholderTextColor="#6B7280"
            value={formData.category}
            onChangeText={text => setFormData({...formData, category: text})}
          />

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            placeholderTextColor="#6B7280"
            multiline
            value={formData.description}
            onChangeText={text => setFormData({...formData, description: text})}
          />
        </View>
      </ScrollView>
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
    backgroundColor: '#2196F3',
  },
  backButton: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  doneButton: {
    fontSize: 16,
    color: '#FFFFFF',
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
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default DeductionForm;
