import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import PieChart from 'react-native-pie-chart';

const MortgageSum = ({route}) => {
  const {calculationResult} = route.params;
  const widthAndHeight = 180;

  // Calculate percentages for pie chart
  const initialPaymentPercentage = Math.max(1, Math.round((calculationResult.initialPaymentAmount / calculationResult.totalPayment) * 100));
  const loanPercentage = Math.max(1, Math.round(100 - initialPaymentPercentage));

  // Prepare pie chart data
  const series = [loanPercentage, initialPaymentPercentage].filter(value => value > 0);
  const sliceColor = ['#2196F3', '#4CAF50'].slice(0, series.length);

  // Format monthly payment
  const monthlyPayment = parseFloat(calculationResult.monthlyPayment).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mortgage Calculator</Text>

      <View style={styles.chartContainer}>
        <View style={styles.chartWrapper}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={[
              { value: series[0], color: sliceColor[0] },
              ...(series.length > 1 ? [{ value: series[1], color: sliceColor[1] }] : [])
            ]}
            coverRadius={0.8}
            coverFill={'#001250'}
          />
          {/* Percentage Labels */}
          <View style={[styles.percentageLabel, styles.loanPercentage]}>
            <Text style={styles.percentageText}>{loanPercentage}%</Text>
          </View>
          <View style={[styles.percentageLabel, styles.initialPaymentPercentage]}>
            <Text style={styles.percentageText}>{initialPaymentPercentage}%</Text>
          </View>
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: '#2196F3'}]} />
            <Text style={styles.legendText}>Principal debt</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: '#4CAF50'}]} />
            <Text style={styles.legendText}>Initial payment</Text>
          </View>
        </View>
      </View>

      <View style={styles.resultsContainer}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Monthly Payment</Text>
          <Text style={styles.resultValue}>
            {monthlyPayment}$
          </Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Accrued Interest</Text>
          <Text style={styles.resultValue}>
            {calculationResult.totalInterest.toFixed(2)}$
          </Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Principal + Interest</Text>
          <Text style={styles.resultValue}>
            {calculationResult.totalPayment.toFixed(2)}$
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
  },
  chartContainer: {
    backgroundColor: '#001250',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  chartWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  percentageLabel: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanPercentage: {
    left: '35%',
    top: '40%',
  },
  initialPaymentPercentage: {
    right: '15%',
    top: '20%',
  },
  percentageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  resultsContainer: {
    backgroundColor: '#001250',
    borderRadius: 16,
    padding: 16,
  },
  resultRow: {
    marginVertical: 8,
  },
  resultLabel: {
    color: '#6B7280',
    fontSize: 16,
    marginBottom: 4,
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MortgageSum;