import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RootStackParamList, TabParamList } from "./types";

import MenuScreen from "../screens/MenuScreen";
import TablesScreen from "../screens/TablesScreen";
import OrdersScreen from "../screens/OrdersScreen";
import CustomersScreen from "../screens/CustomersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ReceiptsScreen from "../screens/ReceiptsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopColor: "#e5e7eb",
          borderTopWidth: 1,
          backgroundColor: "#ffffff",
        },
        tabBarLabelStyle: { 
          fontSize: 11, 
          fontWeight: "500",
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused }) => {
          const iconMap: Record<string, string> = {
            Menu: "silverware-fork-knife",
            Tables: "table-furniture",
            Orders: "clipboard-text-outline",
            Customers: "account-group-outline",
            Receipts: "receipt",
          };
          const iconName = iconMap[route.name] ?? "circle";
          return (
            <MaterialCommunityIcons 
              name={iconName} 
              color={color} 
              size={24} 
            />
          );
        },
        tabBarActiveTintColor: "#d4a574",
        tabBarInactiveTintColor: "#9ca3af",
      })}
    >
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Tables" component={TablesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Receipts" component={ReceiptsScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Passcode" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Passcode" component={require("../screens/PasscodeScreen").default} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
