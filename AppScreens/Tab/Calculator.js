import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const Calculator = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>

      <View style={styles.content}>
        <Image
          source={require('../../assets/images/vector/calculator.png')} // Make sure to add calculator icon to assets
          style={styles.calculatorIcon}
        />
        <Text style={styles.emptyText}>There's nothing{'\n'} here yet</Text>

        <TouchableOpacity
          style={styles.depositButton}
          onPress={() => navigation.navigate('DepositCalculator')}>
          <Text style={styles.depositText}>Deposit Calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mortgageButton}
          onPress={() => navigation.navigate('MortgageCalculator')}>
          <Text style={styles.mortgageText}>Mortgage Calculator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginTop: 40,
    textAlign: 'center',
    marginVertical: 20,
  },
  content: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
    backgroundColor: '#001250',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  calculatorIcon: {
    width: 250,
    height: 250,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 26,

    fontWeight: '600',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
    // marginHorizontal: 40,
    fontWeight: 'bold',
  },
  depositButton: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  mortgageButton: {
    backgroundColor: '#0066FF',
    width: '100%',
    padding: 16,
    borderRadius: 12,
  },

  depositText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0E57B6',
    textAlign: 'center',
    letterSpacing: 1,
  },
  mortgageText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
