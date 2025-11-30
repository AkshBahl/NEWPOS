import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";
import { fetchTables, updateTableStatus } from "../services/supabase";

const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "free":
      return { bg: "#dcfce7", border: "#22c55e", text: "#15803d", icon: "#22c55e" };
    case "occupied":
      return { bg: "#fef3c7", border: "#d97706", text: "#92400e", icon: "#d97706" };
    case "reserved":
      return { bg: "#dbeafe", border: "#3b82f6", text: "#1d4ed8", icon: "#3b82f6" };
    default:
      return { bg: "#f3f4f6", border: "#9ca3af", text: "#6b7280", icon: "#9ca3af" };
  }
};

export default function TablesScreen() {
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    setLoading(true);
    const data = await fetchTables();
    setTables(data);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      <View className="px-5 mt-4">
        <Text className="text-base font-semibold text-gray-800 mb-4">Tables</Text>

        {loading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#d4a574" />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between pb-24">
              {tables.map((table) => {
                const style = getStatusStyle(table.status);
                return (
                  <TouchableOpacity
                    key={table.id}
                    className="w-[48%] rounded-2xl mb-4 items-center justify-center py-6"
                    style={{ backgroundColor: style.bg, borderColor: style.border, borderWidth: 1.5 }}
                    activeOpacity={0.7}
                  >
                    <Feather name="layout" size={28} color={style.icon} />
                    <Text className="mt-3 text-sm font-medium" style={{ color: style.text }}>
                      {table.name}
                    </Text>
                    <View 
                      className="mt-2 px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${style.border}20` }}
                    >
                      <Text className="text-xs font-medium" style={{ color: style.text }}>
                        {table.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
