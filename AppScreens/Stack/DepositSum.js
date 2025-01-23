import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useAppContext } from '../../store/context';
import PieChart from 'react-native-pie-chart';
import { calculateDeposit } from '../../utils/DepCalc';

const DepositSum = () => {
  const { calculatorData } = useAppContext();
  const widthAndHeight = 180;
  const [calculationResult, setCalculationResult] = useState(null);

  useEffect(() => {
    try {
      // Calculate results using DepCalc.js function
      const result = calculateDeposit(calculatorData);
      setCalculationResult(result);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  }, [calculatorData]);

  // Get values from calculation result
  const initialDeposit = parseFloat(calculatorData.depositAmount) || 0;
  const additionalDeposit = parseFloat(calculatorData.depositAmount2) || 0;
  const totalInterest = calculationResult?.accruedInterest || 0;
  const total = initialDeposit + additionalDeposit + totalInterest;

  // Prepare pie chart data
  let series = [100]; // Default value
  let sliceColor = ['#FF4444']; // Default color
  let percentages = [100, 0, 0];

  if (total > 0) {
    percentages = [
      Math.max(1, Math.round((initialDeposit / total) * 100)),
      Math.max(1, Math.round((totalInterest / total) * 100)),
      Math.max(1, Math.round((additionalDeposit / total) * 100))
    ];
    
    // Only include non-zero values
    series = percentages.filter(value => value > 0);
    sliceColor = ['#FF4444', '#4CAF50', '#2196F3'].slice(0, series.length);
  }

  const formatCurrency = (value) => {
    return `${value?.toFixed(2) || '0.00'}$`;
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
      
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={[
              { value: series[0], color: sliceColor[0] },
              ...(series.length > 1 ? [{ value: series[1], color: sliceColor[1] }] : []),
              ...(series.length > 2 ? [{ value: series[2], color: sliceColor[2] }] : [])
            ]}
            coverRadius={0.8}
            coverFill={'#001250'}
          />
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF4444' }]} />
              <Text style={styles.legendText}>
                Initial deposit ({percentages[0]}%)
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>
                Interest income ({percentages[1]}%)
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#2196F3' }]} />
              <Text style={styles.legendText}>
                Top-ups ({percentages[2]}%)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.resultsCard}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Accrued interest</Text>
          <Text style={styles.resultValue}>
            {formatCurrency(calculationResult?.accruedInterest)}
          </Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Deposit amount with interest</Text>
          <Text style={styles.resultValue}>
            {formatCurrency(calculationResult?.finalAmount)}
          </Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Capital gains</Text>
          <Text style={styles.resultValue}>
            {calculationResult?.capitalGains}%
          </Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Total amount of all deposits</Text>
          <Text style={styles.resultValue}>
            {formatCurrency(calculationResult?.totalDeposits)}
          </Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Total withdrawals</Text>
          <Text style={styles.resultValue}>
            {formatCurrency(calculationResult?.totalWithdrawals)}
          </Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Tax</Text>
          <Text style={styles.resultValue}>
            {formatCurrency(calculationResult?.tax)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
    paddingTop:50
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