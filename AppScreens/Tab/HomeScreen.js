import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {AppContext} from '../../store/context';

const HomeScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('INCOME'); // 'INCOME' or 'EXPENSES'
  const [dateFilter, setDateFilter] = useState('DAY'); // 'DAY', 'WEEK', 'MONTH', 'YEAR'
  const {deductions} = useContext(AppContext);

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAmount = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const filterDeductions = () => {
    const today = new Date();
    let filteredData = deductions.filter(
      item => item.type.toUpperCase() === activeTab,
    );

    switch (dateFilter) {
      case 'DAY':
        filteredData = filteredData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate.toDateString() === today.toDateString();
        });
        break;
      case 'WEEK':
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        filteredData = filteredData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= weekAgo && itemDate <= today;
        });
        break;
      case 'MONTH':
        filteredData = filteredData.filter(item => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
          );
        });
        break;
      case 'YEAR':
        filteredData = filteredData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate.getFullYear() === today.getFullYear();
        });
        break;
    }

    return filteredData;
  };

  const filteredDeductions = filterDeductions();
  const totalAmount = filteredDeductions.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const getIconForCategory = category => {
    const icons = {
      health: require('../../assets/images/icons/health.png'),
      leisure: require('../../assets/images/icons/leisure.png'),
      home: require('../../assets/images/icons/home.png'),
      cafe: require('../../assets/images/icons/cafe.png'),
      education: require('../../assets/images/icons/education.png'),
      gift: require('../../assets/images/icons/gift.png'),
      products: require('../../assets/images/icons/products.png'),
      sport: require('../../assets/images/icons/sport.png'),
      transport: require('../../assets/images/icons/transport.png'),
      accounts: require('../../assets/images/icons/accounts.png'),
      other: require('../../assets/images/icons/other.png'),
      salary: require('../../assets/images/icons/salary.png'), // Add salary icon
    };
    return icons[category.toLowerCase()] || icons.other;
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

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentWrapper}>
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

            <Text style={styles.dateText}>Today, {formatDate(new Date())}</Text>
            <Text style={styles.totalAmount}>{formatAmount(totalAmount)}</Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                navigation.navigate('DeductionForm', {
                  type: activeTab,
                })
              }>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </ImageBackground>

          {filteredDeductions.length > 0 ? (
            <View style={styles.deductionsList}>
              {filteredDeductions.map(item => (
                <TouchableOpacity key={item.id} style={styles.deductionItem}>
                  <View style={styles.deductionIconContainer}>
                    <Image
                      source={getIconForCategory(item.category)}
                      style={styles.deductionIcon}
                    />
                  </View>
                  <View style={styles.deductionInfo}>
                    <Text style={styles.deductionName}>{item.name}</Text>
                    <Text style={styles.deductionCategory}>
                      {item.category}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.deductionAmount,
                      item.type === 'INCOME'
                        ? styles.incomeText
                        : styles.expenseText,
                    ]}>
                    {item.type === 'INCOME' ? '+' : '-'}
                    {formatAmount(item.amount)}
                  </Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>There's nothing here yet</Text>
          )}
        </View>
      </ScrollView>
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
    // backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
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
  scrollView: {
    flex: 1,
  },
  contentWrapper: {
    position: 'relative',
  },
  contentContainer: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 200,
    position: 'relative',
  },
  backgroundImage: {
    borderRadius: 20,
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
    marginTop: 40,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    // bottom: -28,
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
    bottom: 10,
  },
  addButtonText: {
    fontSize: 32,
    color: '#2196F3',
    fontWeight: '400',
    lineHeight: 32,
  },
  deductionsList: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Add padding for the floating button
  },
  deductionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#001250',
    borderRadius: 12,
    marginBottom: 8,
  },
  deductionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deductionIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  deductionInfo: {
    flex: 1,
  },
  deductionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  deductionCategory: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  deductionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  incomeText: {
    color: '#5FFF10', // Green color for income
  },
  expenseText: {
    color: '#F63536', // Red color for expenses
  },
  chevron: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
