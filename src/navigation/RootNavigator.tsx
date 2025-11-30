import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
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
          height: 64,
          borderTopColor: "#e5e7eb",
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontSize: 11, marginBottom: 4 },
        tabBarIcon: ({ color, size }) => {
          const nameMap: Record<string, string> = {
            Menu: "grid",
            Tables: "layers",
            Orders: "clipboard",
            Customers: "users",
            Receipts: "file-text",
          };
          const iconName = nameMap[route.name] ?? "circle";
          return <Feather name={iconName as any} color={color} size={20} />;
        },
        tabBarActiveTintColor: "#bfa06a",
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

