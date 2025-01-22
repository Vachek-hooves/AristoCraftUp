import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TabSelector = ({activeTab, onTabChange}) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'BY PROPERTY VALUE' && styles.activeTab,
        ]}
        onPress={() => onTabChange('BY PROPERTY VALUE')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'BY PROPERTY VALUE' && styles.activeTabText,
          ]}>
          BY PROPERTY VALUE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'BY LOAN AMOUNT' && styles.activeTab]}
        onPress={() => onTabChange('BY LOAN AMOUNT')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'BY LOAN AMOUNT' && styles.activeTabText,
          ]}>
          BY LOAN AMOUNT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 14,
  },
  activeTabText: {
    color: '#2196F3',
  },
});

export default TabSelector;
