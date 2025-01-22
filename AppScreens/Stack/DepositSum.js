import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useAppContext } from '../../store/context';
import PieChart from 'react-native-pie-chart';

const DepositSum = () => {
  const { calculatorData } = useAppContext();
  const result = calculatorData.calculationResult || {};
  const widthAndHeight = 180;

  // Calculate percentages for the pie chart
  const initialDeposit = parseFloat(calculatorData.depositAmount) || 0;
  const additionalDeposit = parseFloat(calculatorData.depositAmount2) || 0;
  const totalInterest = result.totalInterest || 0;
  const total = initialDeposit + additionalDeposit + totalInterest;

  // Create series with proper format
  const series = [
    { 
      value: Math.max(1, Math.round((initialDeposit / total) * 100)), 
      color: '#FF4444',
      label: { text: `${Math.round((initialDeposit / total) * 100)}%` }
    },
    { 
      value: Math.max(1, Math.round((totalInterest / total) * 100)), 
      color: '#4CAF50',
      label: { text: `${Math.round((totalInterest / total) * 100)}%` }
    },
    { 
      value: Math.max(1, Math.round((additionalDeposit / total) * 100)), 
      color: '#2196F3',
      label: { text: `${Math.round((additionalDeposit / total) * 100)}%` }
    }
  ].filter(item => !isNaN(item.value) && item.value > 0);

  // Default series if no data
  if (series.length === 0 || total === 0) {
    series = [{ value: 1, color: '#FF4444' }];
  }

  const formatCurrency = (value) => {
    return `${value?.toFixed(2) || '0.00'}$`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
      
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          {total > 0 && (
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              cover={0.8}
              coverFill={'#001250'}
            />
          )}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF4444' }]} />
              <Text style={styles.legendText}>
                Initial deposit ({series[0]?.value || 0}%)
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>
                Interest income ({series[1]?.value || 0}%)
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#2196F3' }]} />
              <Text style={styles.legendText}>
                Top-ups ({series[2]?.value || 0}%)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.resultsCard}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Accrued interest</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.totalInterest)}</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Deposit amount with interest</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.finalAmount)}</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Capital gains</Text>
          <Text style={styles.resultValue}>{result.effectiveRate}%</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Total amount of all deposits</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.initialDeposit)}</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Total withdrawals</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.totalWithdrawals || 0)}</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Tax</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.tax || 60)}</Text>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#001250',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
  },
  legend: {
    marginTop: 16,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  resultsCard: {
    backgroundColor: '#001250',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  resultLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DepositSum;