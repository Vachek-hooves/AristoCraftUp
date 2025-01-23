import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('INCOME'); // 'INCOME' or 'EXPENSES'
  const [dateFilter, setDateFilter] = useState('DAY'); // 'DAY', 'WEEK', 'MONTH', 'YEAR'

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity>
          <Text style={styles.historyButton}>History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'INCOME' && styles.activeTab]}
            onPress={() => setActiveTab('INCOME')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'INCOME' && styles.activeTabText,
              ]}>
              INCOME
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'EXPENSES' && styles.activeTab]}
            onPress={() => setActiveTab('EXPENSES')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'EXPENSES' && styles.activeTabText,
              ]}>
              EXPENSES
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ImageBackground
        source={require('../../assets/images/header/frame.png')}
        style={styles.contentContainer}
        imageStyle={styles.backgroundImage}>
        <View style={styles.dateFilterContainer}>
          {['DAY', 'WEEK', 'MONTH', 'YEAR'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                dateFilter === filter && styles.activeFilterButton,
              ]}
              onPress={() => setDateFilter(filter)}>
              <Text
                style={[
                  styles.filterText,
                  dateFilter === filter && styles.activeFilterText,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.dateText}>Today, {formatDate()}</Text>

        <Text style={styles.emptyText}>There's nothing here yet</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate(
              activeTab === 'INCOME' ? 'IncomeForm' : 'ExpenseForm',
            )
          }>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
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
    paddingTop: 80,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
    backgroundColor: '#2196F3',
  },
  historyButton: {
    fontSize: 16,
    color: '#FFFFFF',
    position: 'absolute',
    right: 16,
  },
  tabWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    // marginTop: 10,
    backgroundColor: '#2196F3',
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    height: 50,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#2196F3',
  },
  dateFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  contentContainer: {
    // flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    height: 240,
   
  },
  backgroundImage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 32,
    color: '#2196F3',
    fontWeight: '400',
    lineHeight: 32,
  },
});

export default HomeScreen;
