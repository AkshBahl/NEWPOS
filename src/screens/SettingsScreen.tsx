import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import HeaderBar from "../components/HeaderBar";

const settingsItems = [
  { label: "Profile", icon: "user" },
  { label: "Change Passcode", icon: "lock" },
  { label: "Payment Methods", icon: "credit-card" },
  { label: "Printer Setup", icon: "printer" },
  { label: "App Theme", icon: "globe" },
];

export default function SettingsScreen() {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => navigation.replace("Passcode")
        },
      ]
    );
  };

  const handleSettingPress = (label: string) => {
    Alert.alert(label, `${label} settings will be available soon.`);
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      <View className="px-5 mt-4">
        <Text className="text-base font-semibold text-gray-800 mb-4">Settings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-5"
      >
        <View className="pb-24">
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => handleSettingPress(item.label)}
              className="bg-white border border-gray-100 rounded-2xl px-4 py-4 mb-3 shadow-sm flex-row items-center"
              activeOpacity={0.7}
            >
              <View className="w-11 h-11 bg-gray-100 rounded-xl items-center justify-center">
                <Feather name={item.icon as any} size={20} color="#6b7280" />
              </View>
              <Text className="ml-4 flex-1 text-base text-gray-700">{item.label}</Text>
              <Feather name="chevron-right" size={22} color="#d1d5db" />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity 
            onPress={handleLogout}
            className="mt-4 bg-red-50 border border-red-100 rounded-2xl py-4 flex-row items-center justify-center"
            activeOpacity={0.7}
          >
            <Feather name="log-out" size={18} color="#ef4444" />
            <Text className="ml-2 text-red-500 font-semibold text-base">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
