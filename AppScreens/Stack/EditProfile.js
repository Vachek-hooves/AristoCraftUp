import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfile = ({navigation, route}) => {
  const { isNewUser } = route.params;
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    birthDate: '',
    avatar: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!isNewUser) {
      loadExistingUserData();
    }
  }, [isNewUser]);

  const loadExistingUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue != null) {
        setUserData(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    }, (response) => {
      if (response.assets?.[0]?.uri) {
        setUserData({...userData, avatar: response.assets[0].uri});
      }
    });
  };

  const handleSave = async () => {
    if (!userData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUserData({
        ...userData,
        birthDate: selectedDate.toLocaleDateString('en-GB'),
      });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userData');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isNewUser ? 'Create Profile' : 'Edit Profile'}
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.avatarContainer}
        onPress={handleImagePick}>
        <Image
          source={
            userData.avatar
              ? {uri: userData.avatar}
              : require('../../assets/images/vector/defaultAvatar.png')
          }
          style={styles.avatar}
        />
        <View style={styles.editIconContainer}>
          <Image
            source={require('../../assets/images/icons/edit.png')}
            style={styles.editIcon}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#6B7280"
          value={userData.name}
          onChangeText={(text) => setUserData({...userData, name: text})}
        />

        {/* <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          value={userData.email}
          onChangeText={(text) => setUserData({...userData, email: text})}
          keyboardType="email-address"
          autoCapitalize="none"
        /> */}

        {/* <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}>
          <Text style={[styles.inputText, userData.birthDate && styles.activeInputText]}>
            {userData.birthDate || 'Birth Date'}
          </Text>
        </TouchableOpacity> */}

        {/* {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )} */}
      </View>

      {!isNewUser && (
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Profile</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
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
  },
  backButton: {
    fontSize: 16,
    color: '#2196F3',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  saveButton: {
    fontSize: 16,
    color: '#2196F3',
  },
  avatarContainer: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 24,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  form: {
    paddingHorizontal: 16,
    gap: 16,
  },
  input: {
    backgroundColor: '#001250',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputText: {
    color: '#6B7280',
    fontSize: 16,
  },
  activeInputText: {
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default EditProfile;