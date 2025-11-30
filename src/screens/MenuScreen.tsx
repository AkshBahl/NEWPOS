import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Image, ActivityIndicator } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";
import { fetchMenuItems } from "../services/supabase";

export default function MenuScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    setLoading(true);
    const data = await fetchMenuItems();
    setItems(data);
    setLoading(false);
  };

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      {/* Search */}
      <View className="mt-4 px-5">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search menu..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
            className="ml-3 flex-1 text-sm text-gray-700"
          />
        </View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#d4a574" />
        </View>
      ) : (
        <ScrollView className="mt-4 px-5" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between pb-24">
            {filteredItems.map((item) => (
              <View
                key={item.id}
                className="w-[48%] bg-white rounded-2xl mb-4 border border-gray-100 shadow-sm overflow-hidden"
              >
                {item.image_url ? (
                  <Image
                    source={{ uri: item.image_url }}
                    className="w-full h-28"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-28 bg-gray-200 items-center justify-center">
                    <Feather name="image" size={32} color="#d1d5db" />
                  </View>
                )}
                <View className="px-3 py-3">
                  <Text className="text-sm font-medium text-gray-800" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-sm text-amber-600 mt-1">
                    ${item.price?.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
