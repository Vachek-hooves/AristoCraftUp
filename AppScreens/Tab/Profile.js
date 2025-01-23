import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue != null) {
        setUserData(JSON.parse(jsonValue));
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserData(null);
    }
  };

  const menuItems = [
    {
      id: 'website',
      title: 'Developer Website',
      onPress: () => {/* Handle website navigation */},
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      onPress: () => {/* Handle privacy policy */},
    },
    {
      id: 'terms',
      title: 'Terms of Use',
      onPress: () => {/* Handle terms of use */},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        {userData && (
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { isNewUser: false })}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/header/frame.png')}
          style={styles.profileCard}
          imageStyle={styles.profileCardBackground}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                userData?.avatar
                  ? {uri: userData.avatar}
                  : require('../../assets/images/vector/defaultAvatar.png')
              }
              style={styles.avatar}
            />
          </View>
          {userData ? (
            <>
              <Text style={styles.userName}>{userData.name}</Text>
              {/* <Text style={styles.userEmail}>{userData.email || 'email@example.com'}</Text> */}
              {/* <View style={styles.birthDateContainer}>
                <Image
                  source={require('../../assets/images/vector/calendar.png')}
                  style={styles.calendarIcon}
                />
                <Text style={styles.birthDate}>{userData.birthDate || 'DD.MM.YYYY'}</Text>
              </View> */}
            </>
          ) : (
            <TouchableOpacity 
              style={styles.createProfileButton}
              onPress={() => navigation.navigate('EditProfile', { isNewUser: true })}>
              <Text style={styles.createProfileButtonText}>Create Profile</Text>
            </TouchableOpacity>
          )}
        </ImageBackground>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}>
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000824',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
  },
  profileCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  profileCardBackground: {
    borderRadius: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 12,
  },
  birthDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#FFFFFF',
  },
  birthDate: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#001250',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  chevron: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  editButton: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 16,
  },
  createProfileButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginTop: 16,
  },
  createProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Profile;