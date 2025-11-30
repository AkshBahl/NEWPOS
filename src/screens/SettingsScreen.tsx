import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";

const settingsItems = [
  { label: "Profile", icon: "user" },
  { label: "Change Passcode", icon: "lock" },
  { label: "Payment Methods", icon: "credit-card" },
  { label: "Printer Setup", icon: "printer" },
  { label: "App Theme", icon: "sun" },
];

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        className="mt-4 w-full"
      >
        <View className="w-[88%] bg-[#f9fafb] rounded-2xl px-4 py-4">
          <Text className="text-xs text-gray-500 mb-2">Settings</Text>

          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-2 shadow-sm flex-row items-center"
            >
              <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                <Feather name={item.icon as any} size={18} color="#444" />
              </View>
              <Text className="ml-3 flex-1 text-gray-700">{item.label}</Text>
              <Feather name="chevron-right" size={20} color="#aaa" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity className="w-full mt-3 bg-red-50 rounded-xl py-3 flex-row items-center justify-center">
            <Feather name="log-out" size={16} color="#e63946" />
            <Text className="ml-2 text-red-600 font-medium">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

