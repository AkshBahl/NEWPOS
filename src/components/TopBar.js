/**
 * TopBar Component
 * Displays hamburger menu, app name, and settings icon
 * Used across all screens for consistent header
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const TopBar = ({ title = 'KarmaTab POS', onProfilePress }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      navigation.navigate('Settings');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.iconButton}>
        <MaterialCommunityIcons name="menu" size={24} color="#374151" />
      </TouchableOpacity>
      
      {/* App Title */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Settings Icon */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleSettingsPress}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="cog-outline" size={22} color="#d4a574" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  iconButton: {
    padding: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: '#1f2937',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBar;
