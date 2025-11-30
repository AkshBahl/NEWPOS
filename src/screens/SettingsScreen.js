/**
 * SettingsScreen Component
 * Displays settings options with logout
 * Matches Figma design
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/TopBar';

const settingsItems = [
  { label: 'Profile', icon: 'account-outline' },
  { label: 'Change Passcode', icon: 'lock-outline' },
  { label: 'Payment Methods', icon: 'credit-card-outline' },
  { label: 'Printer Setup', icon: 'printer-outline' },
  { label: 'App Theme', icon: 'brightness-6' },
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
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
  };

  const handleSettingPress = (label) => {
    Alert.alert(label, `${label} settings will be available soon.`);
  };

  const handleSettingsIconPress = () => {
    // Already on settings page
  };

  return (
    <View style={styles.container}>
      <TopBar onProfilePress={handleSettingsIconPress} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Title */}
        <Text style={styles.sectionTitle}>Settings</Text>

        {/* Settings Items */}
        <View style={styles.settingsContainer}>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.settingCard}
              onPress={() => handleSettingPress(item.label)}
              activeOpacity={0.7}
            >
              {/* Icon */}
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color="#6b7280"
                />
              </View>

              {/* Label */}
              <Text style={styles.settingLabel}>{item.label}</Text>

              {/* Chevron */}
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#d1d5db"
              />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="logout"
              size={20}
              color="#ef4444"
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  settingsContainer: {
    paddingHorizontal: 20,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    padding: 16,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
});

export default SettingsScreen;
