import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import HeaderBar from "../components/HeaderBar";
import { fetchReceipts } from "../services/supabase";

export default function ReceiptsScreen() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
    setLoading(true);
    const data = await fetchReceipts();
    setReceipts(data);
    setLoading(false);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
    const timeStr = date.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit", 
      hour12: true 
    });
    return `${dateStr} ${timeStr}`;
  };

  const handleDownload = (receipt: any) => {
    Alert.alert("Download", `Downloading receipt ${receipt.receipt_number || receipt.id}...`);
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderBar />

      <View className="px-5 mt-4">
        <Text className="text-base font-semibold text-gray-800 mb-4">Receipts</Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#d4a574" />
        </View>
      ) : (
        <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
          <View className="pb-24">
            {receipts.map((receipt) => (
              <View
                key={receipt.id}
                className="bg-white border border-gray-100 rounded-2xl px-4 py-4 mb-3 shadow-sm"
              >
                <View className="flex-row items-center">
                  {/* Receipt Icon */}
                  <View className="w-11 h-11 rounded-xl bg-amber-50 items-center justify-center">
                    <Feather name="file-text" size={20} color="#d4a574" />
                  </View>

                  {/* Receipt Info */}
                  <View className="ml-4 flex-1">
                    <Text className="text-base font-semibold text-gray-800">
                      RCP-{receipt.receipt_number || receipt.id}
                    </Text>
                    <Text className="text-sm text-gray-400 mt-0.5">
                      {formatDateTime(receipt.created_at)}
                    </Text>
                  </View>

                  {/* Amount & Download */}
                  <View className="items-end">
                    <Text className="text-base font-semibold text-gray-800">
                      ${receipt.total?.toFixed(2)}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => handleDownload(receipt)}
                      className="mt-1"
                    >
                      <Feather name="download" size={20} color="#d4a574" />
                    </TouchableOpacity>
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
