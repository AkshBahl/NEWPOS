/**
 * SearchBar Component
 * Rounded search input matching Figma design
 */
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search menu...',
  onClear,
}) => {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <MaterialCommunityIcons name="magnify" size={20} color="#9ca3af" />
      
      {/* Search Input */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {/* Clear Button */}
      {value ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <MaterialCommunityIcons name="close-circle" size={18} color="#9ca3af" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    marginLeft: 10,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
