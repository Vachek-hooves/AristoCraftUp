import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppProvider} from './store/context';
import {IntroScreen} from './AppScreens/Stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './AppScreens/TabNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="IntroScreen" component={IntroScreen} /> */}
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
