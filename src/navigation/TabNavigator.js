/**
 * TabNavigator Component
 * Bottom tab navigation for main app screens
 * Includes: Menu, Tables, Orders, Customers, Receipts
 */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

// Import screens
import MenuScreen from '../screens/MenuScreen';
import TablesScreen from '../screens/TablesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CustomersScreen from '../screens/CustomersScreen';
import ReceiptsScreen from '../screens/ReceiptsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          backgroundColor: '#ffffff',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused }) => {
          const iconMap = {
            Menu: 'silverware-fork-knife',
            Tables: 'table-furniture',
            Orders: 'clipboard-text-outline',
            Customers: 'account-group-outline',
            Receipts: 'receipt',
          };
          const iconName = iconMap[route.name] || 'circle';
          return (
            <MaterialCommunityIcons
              name={iconName}
              color={color}
              size={24}
            />
          );
        },
        tabBarActiveTintColor: '#d4a574',
        tabBarInactiveTintColor: '#9ca3af',
      })}
    >
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Tables" component={TablesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Receipts" component={ReceiptsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
