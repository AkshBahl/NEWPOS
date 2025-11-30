/**
 * PasscodeScreen Component
 * Displays 4-digit passcode entry with number pad
 * Matches Figma design exactly
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchPasscode } from '../services/supabase';

// Fallback passcode if Supabase fails
const FALLBACK_PASSCODE = '1234';

const PasscodeScreen = ({ navigation }) => {
  const [passcode, setPasscode] = useState('');
  const [storedPasscode, setStoredPasscode] = useState(FALLBACK_PASSCODE);

  // Fetch passcode from Supabase on mount
  useEffect(() => {
    loadPasscode();
  }, []);

  // Check passcode when 4 digits entered
  useEffect(() => {
    if (passcode.length === 4) {
      validatePasscode();
    }
  }, [passcode]);

  const loadPasscode = async () => {
    try {
      const code = await fetchPasscode();
      if (code) {
        setStoredPasscode(code);
      }
    } catch (err) {
      console.log('Using fallback passcode');
    }
  };

  const validatePasscode = () => {
    if (passcode === storedPasscode) {
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Incorrect passcode', 'Please try again.');
      setPasscode('');
    }
  };

  const handleNumberPress = (num) => {
    if (passcode.length < 4) {
      setPasscode((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setPasscode((prev) => prev.slice(0, -1));
  };

  const renderDot = (index) => (
    <View
      key={index}
      style={[
        styles.dot,
        passcode.length > index && styles.dotFilled,
      ]}
    />
  );

  const renderButton = (digit) => (
    <TouchableOpacity
      key={digit}
      style={styles.numberButton}
      onPress={() => handleNumberPress(digit)}
      activeOpacity={0.7}
    >
      <Text style={styles.numberText}>{digit}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Card Container */}
      <View style={styles.card}>
        {/* Title */}
        <Text style={styles.title}>KarmaTab POS</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>Enter your passcode to continue</Text>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {[0, 1, 2, 3].map(renderDot)}
        </View>

        {/* Number Pad */}
        <View style={styles.numberPad}>
          {/* Row 1 */}
          <View style={styles.row}>
            {renderButton('1')}
            {renderButton('2')}
            {renderButton('3')}
          </View>

          {/* Row 2 */}
          <View style={styles.row}>
            {renderButton('4')}
            {renderButton('5')}
            {renderButton('6')}
          </View>

          {/* Row 3 */}
          <View style={styles.row}>
            {renderButton('7')}
            {renderButton('8')}
            {renderButton('9')}
          </View>

          {/* Row 4 */}
          <View style={styles.row}>
            <View style={styles.emptyButton} />
            {renderButton('0')}
            <TouchableOpacity
              style={styles.numberButton}
              onPress={handleBackspace}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="backspace-outline" size={22} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Passcode */}
        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot Passcode?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 28,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#d1d5db',
    marginHorizontal: 8,
  },
  dotFilled: {
    backgroundColor: '#6b7280',
  },
  numberPad: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberButton: {
    width: '30%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 18,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emptyButton: {
    width: '30%',
  },
  numberText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#374151',
  },
  forgotButton: {
    marginTop: 20,
  },
  forgotText: {
    fontSize: 13,
    color: '#d4a574',
    fontWeight: '500',
  },
});

export default PasscodeScreen;
