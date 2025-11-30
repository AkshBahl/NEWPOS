/**
 * PasscodeScreen Component
 * Displays 4-digit passcode entry with number pad
 * Validates against Supabase settings table
 * Falls back to "1234" if Supabase fails
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { fetchPasscode } from '../services/supabase';

// Fallback passcode if Supabase fails
const FALLBACK_PASSCODE = '1234';

const PasscodeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  // State
  const [passcode, setPasscode] = useState('');
  const [storedPasscode, setStoredPasscode] = useState(FALLBACK_PASSCODE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Animation ref for shake effect
  const shakeAnimation = useRef(new Animated.Value(0)).current;

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

  /**
   * Load passcode from Supabase
   */
  const loadPasscode = async () => {
    try {
      setLoading(true);
      const code = await fetchPasscode();
      if (code) {
        setStoredPasscode(code);
      }
    } catch (err) {
      console.log('Using fallback passcode');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Validate entered passcode
   */
  const validatePasscode = () => {
    if (passcode === storedPasscode) {
      // Correct - navigate to home
      navigation.replace('Home');
    } else {
      // Incorrect - shake and show error
      setError('Incorrect passcode. Please try again.');
      triggerShake();
      // Clear passcode after animation
      setTimeout(() => {
        setPasscode('');
        setError('');
      }, 1000);
    }
  };

  /**
   * Trigger shake animation
   */
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  /**
   * Handle number pad press
   */
  const handleNumberPress = (num) => {
    if (passcode.length < 4) {
      setPasscode((prev) => prev + num);
    }
  };

  /**
   * Handle delete/backspace
   */
  const handleDelete = () => {
    setPasscode((prev) => prev.slice(0, -1));
  };

  /**
   * Render passcode dots
   */
  const renderPasscodeDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            passcode.length > i && styles.dotFilled,
            error && styles.dotError,
          ]}
        />
      );
    }
    return dots;
  };

  /**
   * Render number pad button
   */
  const renderNumberButton = (num) => (
    <TouchableOpacity
      key={num}
      style={styles.numberButton}
      onPress={() => handleNumberPress(num.toString())}
      activeOpacity={0.7}
    >
      <Text style={styles.numberText}>{num}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xxl }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>NewPOS</Text>
        <Text style={styles.subtitle}>Enter your passcode</Text>
      </View>

      {/* Passcode Dots */}
      <Animated.View
        style={[
          styles.dotsContainer,
          { transform: [{ translateX: shakeAnimation }] },
        ]}
      >
        {renderPasscodeDots()}
      </Animated.View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Number Pad */}
      <View style={styles.numberPad}>
        {/* Row 1 */}
        <View style={styles.numberRow}>
          {[1, 2, 3].map(renderNumberButton)}
        </View>

        {/* Row 2 */}
        <View style={styles.numberRow}>
          {[4, 5, 6].map(renderNumberButton)}
        </View>

        {/* Row 3 */}
        <View style={styles.numberRow}>
          {[7, 8, 9].map(renderNumberButton)}
        </View>

        {/* Row 4 */}
        <View style={styles.numberRow}>
          {/* Empty space */}
          <View style={styles.numberButton} />
          
          {/* Zero */}
          {renderNumberButton(0)}
          
          {/* Delete */}
          <TouchableOpacity
            style={styles.numberButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer hint */}
      <Text style={styles.hintText}>Default passcode: 1234</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.lg,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    marginHorizontal: spacing.md,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: colors.primary,
  },
  dotError: {
    borderColor: colors.error,
    backgroundColor: colors.error,
  },
  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    marginBottom: spacing.lg,
  },
  numberPad: {
    marginTop: spacing.xxl,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.sm,
  },
  numberText: {
    fontSize: 32,
    fontWeight: typography.weights.semiBold,
    color: colors.textPrimary,
  },
  deleteText: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  hintText: {
    position: 'absolute',
    bottom: 40,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
});

export default PasscodeScreen;

