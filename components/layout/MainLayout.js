import {StyleSheet, Text, View, ImageBackground} from 'react-native';

const MainLayout = ({children}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/bg/bg.png')}>
      {children}
    </ImageBackground>
  );
};

export default MainLayout;

const styles = StyleSheet.create({container: {flex: 1}});
