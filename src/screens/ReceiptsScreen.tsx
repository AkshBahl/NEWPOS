import React from "react";
import { View, Text } from "react-native";
import HeaderBar from "../components/HeaderBar";

export default function ReceiptsScreen() {
  return (
    <View className="flex-1 bg-white">
      <HeaderBar />
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-sm">
          Receipts list will go here (ID, Amount, Date, Download icon).
        </Text>
      </View>
    </View>
  );
}

