import React from "react";
import { View, Text, ScrollView, TextInput, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";

const items = [
  { id: 1, name: "Grilled Salmon", price: "$24.99", image: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg" },
  { id: 2, name: "Classic Burger", price: "$15.99", image: "https://images.pexels.com/photos/1639560/pexels-photo-1639560.jpeg" },
  { id: 3, name: "Margherita Pizza", price: "$18.99", image: "https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg" },
  { id: 4, name: "Creamy Pasta", price: "$16.99", image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg" },
  { id: 5, name: "Fresh Garden Salad", price: "$12.99", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" },
  { id: 6, name: "Chocolate Cake", price: "$8.99", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg" },
];

export default function MenuScreen() {
  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      {/* simple "hero" image strip placeholder */}
      <View className="mt-3 items-center">
        <View className="w-[80%] h-16 rounded-2xl overflow-hidden bg-gray-200" />
      </View>

      {/* search */}
      <View className="mt-3 px-6">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Feather name="search" size={16} color="#9ca3af" />
          <TextInput
            placeholder="Search menu..."
            placeholderTextColor="#9ca3af"
            className="ml-2 flex-1 text-sm text-gray-700"
          />
        </View>
      </View>

      {/* grid */}
      <ScrollView className="mt-3 px-6 mb-20">
        <View className="flex-row flex-wrap justify-between">
          {items.map((item) => (
            <View
              key={item.id}
              className="w-[48%] bg-white rounded-2xl mb-3 border border-gray-200 shadow-sm"
            >
              <Image
                source={{ uri: item.image }}
                className="w-full h-32 rounded-t-2xl"
              />
              <View className="px-3 py-2">
                <Text className="text-xs text-gray-700" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-[11px] text-gray-400 mt-1">
                  {item.price}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

