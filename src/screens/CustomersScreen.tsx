import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";
import { fetchCustomers } from "../services/supabase";

export default function CustomersScreen() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await fetchCustomers();
    setCustomers(data);
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      {/* Search Bar */}
      <View className="px-5 mt-4">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search customers..."
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
        <ScrollView className="px-5 mt-4" showsVerticalScrollIndicator={false}>
          <View className="pb-24">
            {filteredCustomers.map((customer) => (
              <View
                key={customer.id}
                className="bg-white border border-gray-100 rounded-2xl px-4 py-4 mb-3 shadow-sm"
              >
                <View className="flex-row items-center">
                  {/* Avatar */}
                  <View className="w-12 h-12 rounded-full bg-amber-50 items-center justify-center">
                    <Feather name="user" size={22} color="#d4a574" />
                  </View>

                  {/* Info */}
                  <View className="ml-4 flex-1">
                    <Text className="text-base font-semibold text-gray-800">
                      {customer.name}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-0.5">
                      {customer.phone}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-0.5">
                      Last order: {formatDate(customer.last_order)}
                    </Text>
                  </View>

                  {/* Points */}
                  <View className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                    <Text className="text-sm font-semibold text-amber-700">
                      ★ {customer.points || 0}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
