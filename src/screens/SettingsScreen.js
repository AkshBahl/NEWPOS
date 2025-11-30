/**
 * SettingsScreen Component
 * Displays settings options list
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import TopBar from '../components/TopBar';

// Settings options configuration
const SETTINGS_OPTIONS = [
  {
    id: 'profile',
    title: 'Profile',
    icon: '👤',
    description: 'Manage your account details',
  },
  {
    id: 'passcode',
    title: 'Change Passcode',
    icon: '🔐',
    description: 'Update your security passcode',
  },
  {
    id: 'payment',
    title: 'Payment Methods',
    icon: '💳',
    description: 'Configure payment options',
  },
  {
    id: 'printer',
    title: 'Printer Setup',
    icon: '🖨️',
    description: 'Connect and manage printers',
  },
  {
    id: 'theme',
    title: 'Theme (Light/Dark)',
    icon: '🎨',
    description: 'Customize app appearance',
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: '🚪',
    description: 'Sign out of your account',
    isDestructive: true,
  },
];

const SettingsScreen = ({ navigation }) => {
  /**
   * Handle option press
   */
  const handleOptionPress = (option) => {
    if (option.id === 'logout') {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => navigation.replace('Passcode'),
          },
        ]
      );
    } else {
      Alert.alert(
        option.title,
        `${option.description}\n\nThis feature is coming soon!`,
        [{ text: 'OK' }]
      );
    }
  };

  /**
   * Render settings option
   */
  const renderOption = (option) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionItem}
      onPress={() => handleOptionPress(option)}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.optionIcon}>{option.icon}</Text>
      </View>

      {/* Content */}
      <View style={styles.optionContent}>
        <Text
          style={[
            styles.optionTitle,
            option.isDestructive && styles.destructiveText,
          ]}
        >
          {option.title}
        </Text>
        <Text style={styles.optionDescription}>{option.description}</Text>
      </View>

      {/* Arrow */}
      <Text style={styles.arrowIcon}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <TopBar title="Settings" showProfile={false} />

      {/* Settings List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Admin User</Text>
            <Text style={styles.userRole}>Store Manager</Text>
          </View>
        </View>

        {/* Settings Options */}
        <View style={styles.optionsContainer}>
          {SETTINGS_OPTIONS.map(renderOption)}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>NewPOS v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 NewPOS. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 28,
  },
  userInfo: {
    marginLeft: spacing.lg,
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  userRole: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  optionsContainer: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  optionIcon: {
    fontSize: 22,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  destructiveText: {
    color: colors.error,
  },
  arrowIcon: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  versionText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  copyrightText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
});

export default SettingsScreen;

