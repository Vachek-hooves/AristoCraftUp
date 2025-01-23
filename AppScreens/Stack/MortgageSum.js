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
  const sliceColor = ['#2196F3', '#5FFF10'].slice(0, series.length);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mortgage Calculator</Text>

      <View style={styles.chartContainer}>
        <View style={{marginBottom: 20}}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={[
              { value: series[0], color: sliceColor[0] },
              ...(series.length > 1 ? [{ value: series[1], color: sliceColor[1] }] : [])
            ]}
            coverRadius={0.8}
            coverFill={'#001250'}
          />
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: '#2196F3'}]} />
            <Text style={styles.legendText}>
              Principal debt ({loanPercentage}%)
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: '#5FFF10'}]} />
            <Text style={styles.legendText}>
              Initial payment ({initialPaymentPercentage}%)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.resultsContainer}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Monthly Payment</Text>
          <Text style={styles.resultValue}>
            {typeof calculationResult.monthlyPayment === 'object'
              ? `${calculationResult.monthlyPayment.initial.toFixed(2)}$ - ${calculationResult.monthlyPayment.final.toFixed(2)}$`
              : `${calculationResult.monthlyPayment.toFixed(2)}$`}
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