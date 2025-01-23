import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {AppContext} from '../../store/context';

const PiggyBank = ({navigation}) => {
  const {piggyBanks} = useContext(AppContext);

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
              <View key={piggy.id} style={styles.card}>
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
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
});

export default PiggyBank;
