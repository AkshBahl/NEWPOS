import React from "react";
import { View, Text, ScrollView } from "react-native";
import HeaderBar from "../components/HeaderBar";

const orders = [
  { id: "#1024", table: "Table 2", time: "2:45 PM", status: "Paid", total: "$42.50" },
  { id: "#1023", table: "Table 5", time: "2:30 PM", status: "Pending", total: "$87.80" },
  { id: "#1022", table: "Table 1", time: "2:15 PM", status: "Paid", total: "$28.99" },
  { id: "#1021", table: "Table 3", time: "1:50 PM", status: "Paid", total: "$91.20" },
  { id: "#1020", table: "Table 7", time: "1:35 PM", status: "Pending", total: "$55.40" },
];

const chips = ["All", "Paid", "Pending"];

export default function OrdersScreen() {
  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      {/* Filter chips */}
      <View className="flex-row justify-center mt-4 space-x-3">
        {chips.map((label, index) => {
          const active = index === 0;
          return (
            <View
              key={label}
              className={`px-4 py-1 rounded-full border ${
                active ? "bg-amber-100 border-amber-300" : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`text-xs ${
                  active ? "text-amber-700 font-medium" : "text-gray-500"
                }`}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <ScrollView className="mt-4 px-6 mb-20">
        {orders.map((o) => (
          <View
            key={o.id}
            className="bg-white rounded-2xl border border-gray-200 px-4 py-3 mb-3 shadow-sm"
          >
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-xs text-gray-700">{o.id}</Text>
              <View
                className={`px-3 py-[2px] rounded-full ${
                  o.status === "Paid" ? "bg-green-100" : "bg-amber-100"
                }`}
              >
                <Text
                  className={`text-[10px] ${
                    o.status === "Paid" ? "text-green-700" : "text-amber-700"
                  }`}
                >
                  {o.status}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[11px] text-gray-500">{o.table}</Text>
                <Text className="text-[10px] text-gray-400">{o.time}</Text>
              </View>
              <Text className="text-xs text-gray-800">{o.total}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

