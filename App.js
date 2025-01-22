import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppProvider} from './store/context';
import {IntroScreen} from './AppScreens/Stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './AppScreens/TabNavigation';
import CalculatorDetails from './AppScreens/Stack/CalculatorDetails';
import MortgageCalculator from './AppScreens/Stack/MortgageCalculator';
import DepositCalculator from './AppScreens/Stack/DepositCalculator';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 700,
          }}>
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen
            name="CalculatorDetails"
            component={CalculatorDetails}
          />
          <Stack.Screen
            name="MortgageCalculator"
            component={MortgageCalculator}
          />
          <Stack.Screen
            name="DepositCalculator"
            component={DepositCalculator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
