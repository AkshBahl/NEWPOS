/**
 * TabNavigator Component
 * Bottom tab navigation for main app screens
 * Includes: Menu, Tables, Orders, Customers, Receipts
 */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

// Import screens
import MenuScreen from '../screens/MenuScreen';
import TablesScreen from '../screens/TablesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CustomersScreen from '../screens/CustomersScreen';
import ReceiptsScreen from '../screens/ReceiptsScreen';

const Tab = createBottomTabNavigator();

/**
 * Tab bar icon component
 */
const TabIcon = ({ icon, label, focused }) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      {icon}
    </Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
      {label}
    </Text>
  </View>
);

/**
 * Screen options configuration
 */
const screenOptions = {
  headerShown: false,
  tabBarStyle: styles.tabBar,
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textSecondary,
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {/* Menu Tab */}
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🍽️" label="Menu" focused={focused} />
          ),
        }}
      />

      {/* Tables Tab */}
      <Tab.Screen
        name="Tables"
        component={TablesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🪑" label="Tables" focused={focused} />
          ),
        }}
      />

      {/* Orders Tab */}
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📋" label="Orders" focused={focused} />
          ),
        }}
      />

      {/* Customers Tab */}
      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👥" label="Customers" focused={focused} />
          ),
        }}
      />

      {/* Receipts Tab */}
      <Tab.Screen
        name="Receipts"
        component={ReceiptsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🧾" label="Receipts" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xs,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  tabLabelFocused: {
    color: colors.primary,
    fontWeight: typography.weights.semiBold,
  },
});

export default TabNavigator;

