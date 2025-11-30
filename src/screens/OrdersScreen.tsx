import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";
import { fetchOrders } from "../services/supabase";

const filters = ["All", "Paid", "Pending"];

export default function OrdersScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    loadOrders();
  }, [activeFilter]);

  const loadOrders = async () => {
    setLoading(true);
    const status = activeFilter === "All" ? null : activeFilter.toLowerCase();
    const data = await fetchOrders(status);
    setOrders(data);
    setLoading(false);
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      {/* Filter chips */}
      <View className="flex-row px-5 mt-4 gap-3">
        {filters.map((label) => {
          const active = activeFilter === label;
          return (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveFilter(label)}
              className={`px-5 py-2 rounded-full border ${
                active ? "bg-gray-900 border-gray-900" : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  active ? "text-white" : "text-gray-600"
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#d4a574" />
        </View>
      ) : (
        <ScrollView className="mt-4 px-5" showsVerticalScrollIndicator={false}>
          <View className="pb-24">
            {orders.map((order) => {
              const isPaid = order.status?.toLowerCase() === "paid";
              return (
                <View
                  key={order.id}
                  className="bg-white rounded-2xl border border-gray-100 px-4 py-4 mb-3 shadow-sm"
                >
                  <View className="flex-row items-start">
                    {/* Status Icon */}
                    <View className={`w-8 h-8 rounded-full items-center justify-center mt-1 ${
                      isPaid ? "bg-green-100" : "bg-amber-100"
                    }`}>
                      {isPaid ? (
                        <Feather name="check" size={16} color="#22c55e" />
                      ) : (
                        <View className="w-3 h-3 rounded-full bg-amber-400" />
                      )}
                    </View>

                    {/* Order Info */}
                    <View className="flex-1 ml-3">
                      <View className="flex-row items-center justify-between">
                        <Text className="text-base font-semibold text-gray-800">
                          #{order.order_number || order.id}
                        </Text>
                        <View className={`px-3 py-1 rounded-full ${
                          isPaid ? "bg-green-100" : "bg-amber-100"
                        }`}>
                          <Text className={`text-xs font-medium ${
                            isPaid ? "text-green-700" : "text-amber-700"
                          }`}>
                            {order.status}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-sm text-gray-500 mt-1">
                        {order.table_name || `Table ${order.table_id}`}
                      </Text>
                      <View className="flex-row items-center justify-between mt-2">
                        <View className="flex-row items-center">
                          <Feather name="clock" size={14} color="#9ca3af" />
                          <Text className="text-sm text-gray-400 ml-1">
                            {formatTime(order.created_at)}
                          </Text>
                        </View>
                        <Text className="text-base font-semibold text-gray-800">
                          ${order.total?.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
