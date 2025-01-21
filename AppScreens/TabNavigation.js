import {StyleSheet, Text, View} from 'react-native';
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
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="PiggyBank" component={PiggyBank} />
      <Tab.Screen name="Calculator" component={Calculator} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
