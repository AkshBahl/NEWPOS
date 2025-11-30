/**
 * AppNavigator Component
 * Main navigation container with stack navigation
 * Includes: Passcode -> Home (Tabs) -> Settings
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens and navigators
import PasscodeScreen from '../screens/PasscodeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

/**
 * Default screen options - no headers (screens use TopBar component)
 */
const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Passcode"
        screenOptions={screenOptions}
      >
        {/* Passcode Screen - Login */}
        <Stack.Screen
          name="Passcode"
          component={PasscodeScreen}
          options={{
            animation: 'fade',
          }}
        />

        {/* Home - Tab Navigator */}
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            animation: 'fade',
          }}
        />

        {/* Settings Screen */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

