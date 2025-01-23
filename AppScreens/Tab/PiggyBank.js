import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

const PiggyBank = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Piggy bank</Text>

      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/vector/piggybank.png')}
          style={styles.piggyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyText}>There's nothing here yet</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PiggyBankForm')}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
  },
  contentContainer: {
    // flex: 1,
    backgroundColor: '#001250',
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  piggyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#0E57B6',
    paddingVertical: 14,
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
});

export default PiggyBank;
