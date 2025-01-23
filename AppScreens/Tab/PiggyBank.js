import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {AppContext} from '../../store/context';

const PiggyBank = ({navigation}) => {
  const {piggyBanks, updatePiggyBankAmount} = useContext(AppContext);
  const [selectedPiggy, setSelectedPiggy] = useState(null);
  const [amount, setAmount] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleAmountChange = (text) => {
    // Allow only numbers and decimal point
    const regex = /^\d*\.?\d*$/;
    if (text === '' || regex.test(text)) {
      // Prevent multiple decimal points
      if (text.split('.').length - 1 <= 1) {
        // Limit decimal places to 2
        if (text.includes('.')) {
          const [, decimal] = text.split('.');
          if (decimal && decimal.length <= 2) {
            setAmount(text);
          }
        } else {
          setAmount(text);
        }
      }
    }
  };

  const handleUpdateAmount = async () => {
    if (selectedPiggy && amount) {
      const numAmount = parseFloat(amount);
      
      // Validate amount
      if (isNaN(numAmount) || numAmount <= 0) {
        Alert.alert('Invalid Amount', 'Please enter a valid positive number');
        return;
      }

      const newAmount = parseFloat(selectedPiggy.currentAmount) + numAmount;
      const success = await updatePiggyBankAmount(selectedPiggy.id, newAmount);
      
      if (success) {
        setAmount('');
        setSelectedPiggy(null);
        setShowUpdateModal(false);
      } else {
        Alert.alert('Error', 'Failed to update amount');
      }
    }
  };

  const openUpdateModal = (piggy) => {
    setSelectedPiggy(piggy);
    setShowUpdateModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Piggy bank</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../../assets/images/vector/piggybank.png')}
            style={styles.piggyImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('PiggyBankForm')}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {piggyBanks.length > 0 && (
          <View style={styles.cardsContainer}>
            {piggyBanks.map((piggy) => (
              <TouchableOpacity 
                key={piggy.id} 
                style={styles.card}
                onPress={() => openUpdateModal(piggy)}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.goalName}>{piggy.goalName}</Text>
                  <Text style={styles.targetDate}>
                    {formatDate(piggy.targetDate)}
                  </Text>
                </View>

                <View style={styles.amountContainer}>
                  <Text style={styles.currentAmount}>
                    ${piggy.currentAmount.toFixed(2)}
                  </Text>
                  <Text style={styles.targetAmount}>
                    of ${parseFloat(piggy.targetAmount).toFixed(2)}
                  </Text>
                </View>

                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      {
                        width: `${calculateProgress(
                          piggy.currentAmount,
                          piggy.targetAmount
                        )}%`
                      }
                    ]} 
                  />
                </View>

                <Text style={styles.description} numberOfLines={2}>
                  {piggy.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{height:100}}/>
      </ScrollView>

      <Modal
        visible={showUpdateModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Add to {selectedPiggy?.goalName}
            </Text>
            
            <TextInput
              style={styles.amountInput}
              placeholder="Enter amount"
              placeholderTextColor="#6B7280"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={handleAmountChange}
              maxLength={10} // Prevent extremely large numbers
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowUpdateModal(false);
                  setSelectedPiggy(null);
                  setAmount('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.modalButton, 
                  styles.saveButton,
                  (!amount || parseFloat(amount) <= 0) ? styles.disabledButton : null
                ]}
                onPress={handleUpdateAmount}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
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
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
  },
  contentContainer: {
    backgroundColor: '#001250',
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardsContainer: {
    paddingHorizontal: 16,
  },
  piggyImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#001250',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  targetDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  currentAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  targetAmount: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#000D39',
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#001250',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  amountInput: {
    backgroundColor: '#000D39',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default PiggyBank;
