import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RadioSelector = ({selectedValue, onValueChange}) => {
  return (
    <View>
      <Text style={styles.label}>Type of Monthly Payments</Text>

      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedValue === 'Annuity' && styles.radioButtonActive,
        ]}
        onPress={() => onValueChange('Annuity')}>
        <View style={styles.radio}>
          {selectedValue === 'Annuity' && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.radioText}>Annuity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedValue === 'Differentiated' && styles.radioButtonActive,
        ]}
        onPress={() => onValueChange('Differentiated')}>
        <View style={styles.radio}>
          {selectedValue === 'Differentiated' && (
            <View style={styles.radioInner} />
          )}
        </View>
        <Text style={styles.radioText}>Differentiated</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#6B7280',
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2F3B52',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  radioText: {
    color: '#FFFFFF',
  },
});

export default RadioSelector;
