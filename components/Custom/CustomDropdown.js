import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

const CustomDropdown = ({label, options, value, onSelect, zIndex}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = option => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={[styles.inputGroup, {zIndex}]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selectButton} onPress={handlePress}>
        <Text style={styles.selectButtonText}>{value}</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.dropdownItem}
              onPress={() => handleSelect(option)}>
              <Text style={styles.dropdownText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
export default CustomDropdown;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  'inputGroup:nth-child(1)': {
    zIndex: 6,
  },
  'inputGroup:nth-child(2)': {
    zIndex: 5,
  },
  'inputGroup:nth-child(3)': {
    zIndex: 4,
  },
  'inputGroup:nth-child(4)': {
    zIndex: 3,
  },
  'inputGroup:nth-child(5)': {
    zIndex: 2,
  },
  label: {
    color: '#6B7280',
    marginBottom: 8,
    fontSize: 14,
  },
  selectButton: {
    backgroundColor: '#001250',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
  },
  chevron: {
    color: 'white',
    fontSize: 20,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#001250',
    borderRadius: 12,
    marginTop: 4,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
});
