import React from "react";
import { View, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";

const tables = [
  { id: 1, name: "Table 1", status: "Free", color: "#bbf7d0", border: "#22c55e" },
  { id: 2, name: "Table 2", status: "Occupied", color: "#fde68a", border: "#b45309" },
  { id: 3, name: "Table 3", status: "Reserved", color: "#bfdbfe", border: "#2563eb" },
  { id: 4, name: "Table 4", status: "Free", color: "#bbf7d0", border: "#22c55e" },
];

export default function TablesScreen() {
  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      <View className="px-6 mt-4">
        <Text className="text-sm text-gray-700 mb-2">Tables</Text>

        <View className="flex-row flex-wrap justify-between">
          {tables.map((t) => (
            <View
              key={t.id}
              className="w-[48%] rounded-2xl mb-3 items-center justify-center py-6"
              style={{ backgroundColor: t.color, borderColor: t.border, borderWidth: 1 }}
            >
              <Feather name="monitor" size={24} color={t.border} />
              <Text className="mt-2 text-xs text-gray-700">{t.name}</Text>
              <Text className="mt-1 text-[10px] text-gray-500">{t.status}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

