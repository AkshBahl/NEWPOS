import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";

const customers = [
  { name: "Sarah Johnson",  phone: "(595) 123-4567", last: "Nov 28, 2025", points: 460 },
  { name: "Michael Chen",   phone: "(595) 234-5678", last: "Nov 27, 2025", points: 320 },
  { name: "Emily Rodriguez",phone: "(595) 456-8709", last: "Nov 26, 2025", points: 290 },
  { name: "David Williams", phone: "(595) 409-7820", last: "Nov 25, 2025", points: 210 },
  { name: "Jessica Brown",  phone: "(595) 667-8901", last: "Nov 24, 2025", points: 170 },
  { name: "James Miller",   phone: "(595) 908-1123", last: "Nov 23, 2025", points: 190 },
  { name: "Amanda Davis",   phone: "(595) 789-0123", last: "Nov 22, 2025", points: 125 },
  { name: "Robert Taylor",  phone: "(595) 890-1234", last: "Nov 21, 2025", points: 760 },
];

export default function CustomersScreen() {
  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      {/* SEARCH BAR */}
      <View className="px-6 mt-4">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Feather name="search" size={16} color="gray" />
          <TextInput
            placeholder="Search customers..."
            placeholderTextColor="#999"
            className="ml-2 flex-1 text-sm"
          />
        </View>
      </View>

      {/* LIST */}
      <ScrollView className="px-6 mt-3 mb-20">
        {customers.map((c, index) => (
          <View
            key={index}
            className="bg-white w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 shadow-sm"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-amber-100 items-center justify-center">
                <Feather name="user" size={20} color="#b58b2b" />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-gray-700 font-semibold">{c.name}</Text>
                <Text className="text-xs text-gray-500">{c.phone}</Text>
                <Text className="text-[10px] text-gray-400">Last order: {c.last}</Text>
              </View>

              <View className="bg-amber-100 px-3 py-1 rounded-full">
                <Text className="text-[10px] font-semibold text-amber-700">
                  {c.points}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

