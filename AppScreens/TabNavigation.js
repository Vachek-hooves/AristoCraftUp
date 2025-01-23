import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Analytics,
  Profile,
  HomeScreen,
  PiggyBank,
  Calculator,
} from './Tab/index';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#6B7280',
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/tabbar/calculator.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#2196F3' : '#6B7280'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Piggy Bank"
        component={PiggyBank}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/tabbar/piggy.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#2196F3' : '#6B7280'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={styles.homeIconContainer}>
              <Image
                source={require('../assets/images/tabbar/home.png')}
                style={[styles.homeIcon, {tintColor: '#FFFFFF'}]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/tabbar/analytics.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#2196F3' : '#6B7280'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/tabbar/profile.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#2196F3' : '#6B7280'},
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000824',
    borderTopWidth: 0,
    height: 100,
    paddingBottom: 8,
    paddingTop: 8,
    borderTopColor: '#6B7280',
    borderTopWidth: 1,
    borderTopEndRadius: 42,
    borderTopStartRadius: 42,
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderLeftColor: '#6B7280',
    borderRightColor: '#6B7280',
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 0,
  },
  homeIconContainer: {
    backgroundColor: '#2196F3',
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: -24,
    left: '50%',
    marginLeft: -24,
    borderWidth: 4,
    borderColor: '#000824',
  },
  homeIcon: {
    width: 24,
    height: 24,
  },
});

export default TabNavigation;
