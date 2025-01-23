import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  data,
  value,
  onChange,
  placeholder = 'Select option',
  zIndex = 1,
  containerStyle = {},
}) => {
  return (
    <Dropdown
      style={[styles.dropdown, {zIndex}, containerStyle]}
      placeholderStyle={styles.dropdownPlaceholder}
      selectedTextStyle={styles.dropdownSelectedText}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onChange={onChange}
      containerStyle={styles.dropdownContainer}
      itemContainerStyle={styles.dropdownItemContainer}
      itemTextStyle={styles.dropdownItemText}
      activeColor="#000824"
      backgroundColor={'#001250' + 90}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#000D39',
    borderRadius: 12,
    padding: 16,
    height: 56,
  },
  dropdownContainer: {
    backgroundColor: '#001250',
    borderRadius: 12,
    marginTop: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItemContainer: {
    padding: 4,
    borderRadius: 22,
  },
  dropdownItemText: {
    color: '#FFF',
    fontSize: 18,
  },
  dropdownPlaceholder: {
    fontSize: 17,
    color: '#6B7280',
  },
  dropdownSelectedText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomDropdown;
