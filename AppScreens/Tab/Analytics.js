import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { AppContext } from '../../store/context';
import PieChart from 'react-native-pie-chart';
import { Dimensions } from 'react-native';

const Analytics = () => {
  const { deductions } = useContext(AppContext);

  const getCategoryData = () => {
    if (!deductions || deductions.length === 0) {
      return [{
        value: 100,
        color: '#6B7280',
        name: 'No transactions yet'
      }];
    }

    // Filter only EXPENSES
    const expensesOnly = deductions.filter(item => item.type === 'EXPENSES');
    
    if (expensesOnly.length === 0) {
      return [{
        value: 100,
        color: '#6B7280',
        name: 'No expenses yet'
      }];
    }

    const categoryTotals = expensesOnly.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = 0;
      }
      acc[item.category] += parseFloat(item.amount);
      return acc;
    }, {});

    const categoryColors = {
      health: '#FF3B30',      
      leisure: '#34D399',     
      home: '#FF9F0A',        
      cafe: '#8B5CF6',        
      education: '#5856D6',   
      gift: '#FF6482',        
      products: '#34C759',    
      sport: '#FF9500',       
      transport: '#64B5F6',   
      accounts: '#BF5AF2',    
      other: '#6B7280',       
    };

    const series = Object.entries(categoryTotals).map(([category, amount]) => ({
      value: amount,
      color: categoryColors[category.toLowerCase()] || categoryColors.other,
      name: category
    }));

    return series;
  };

  const getMonthlyData = (type) => {
    if (!deductions || deductions.length === 0) {
      return [
        { value: 100, color: '#6B7280' }
      ];
    }

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthTotal = deductions
      .filter(item => {
        const date = new Date(item.date);
        return date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear && 
               item.type === type;
      })
      .reduce((sum, item) => sum + parseFloat(item.amount), 0);

    const lastMonthTotal = deductions
      .filter(item => {
        const date = new Date(item.date);
        return date.getMonth() === (currentMonth - 1) && 
               date.getFullYear() === currentYear && 
               item.type === type;
      })
      .reduce((sum, item) => sum + parseFloat(item.amount), 0);

    if (thisMonthTotal === 0 && lastMonthTotal === 0) {
      return [{ value: 100, color: '#6B7280' }];
    }

    return [
      { value: thisMonthTotal || 0.1, color: type === 'INCOME' ? '#34C759' : '#FF3B30' },
      { value: lastMonthTotal || 0.1, color: type === 'INCOME' ? '#5856D6' : '#FF9F0A' }
    ];
  };

  // Calculate total expenses only
  const totalExpenses = deductions
    ? deductions
        .filter(item => item.type === 'EXPENSES')
        .reduce((sum, item) => sum + parseFloat(item.amount), 0)
    : 0;

  const categoryData = getCategoryData();
  const incomeData = getMonthlyData('INCOME');
  const expensesData = getMonthlyData('EXPENSES');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Analytics</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total amount spent this month</Text>
          <View style={styles.chartContainer}>
            <PieChart
              widthAndHeight={220}
              series={categoryData}
              cover={0.65}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.totalAmount}>${totalExpenses}</Text>
            </View>
          </View>
          <View style={styles.legendContainer}>
            {categoryData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.compareContainer}>
          <View style={styles.compareCard}>
            <Text style={styles.compareTitle}>Income</Text>
            <PieChart
              widthAndHeight={120}
              series={incomeData}
              cover={0.65}
            />
            <View style={styles.monthlyData}>
              <Text style={styles.monthlyText}>
                Current month - ${incomeData[0]?.value === 100 ? 0 : incomeData[0]?.value || 0}
              </Text>
              <Text style={styles.monthlyText}>
                Previous month - ${incomeData[1]?.value || 0}
              </Text>
            </View>
          </View>

          <View style={styles.compareCard}>
            <Text style={styles.compareTitle}>Expenses</Text>
            <PieChart
              widthAndHeight={120}
              series={expensesData}
              cover={0.65}
            />
            <View style={styles.monthlyData}>
              <Text style={styles.monthlyText}>
                Current month - ${expensesData[0]?.value === 100 ? 0 : expensesData[0]?.value || 0}
              </Text>
              <Text style={styles.monthlyText}>
                Previous month - ${expensesData[1]?.value || 0}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
    padding: 16,
    paddingTop:50
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#000824',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#001250',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  totalContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  compareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compareCard: {
    backgroundColor: '#001250',
    borderRadius: 20,
    padding: 16,
    width: '48%',
  },
  compareTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  monthlyData: {
    marginTop: 12,
  },
  monthlyText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default Analytics;