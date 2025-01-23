import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useEffect} from 'react';
const IntroScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('TabNavigation', {
        screen: 'HomeScreen',
      });
    }, 1500);
  }, []);
  return (
    <ImageBackground
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      source={require('../../assets/images/flashScreen/SplachScreen.png')}>
      <Text style={styles.title}>Aristo Craft Up</Text>
    </ImageBackground>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 150,
  },
});
