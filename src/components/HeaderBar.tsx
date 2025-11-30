import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title?: string;
};

export default function HeaderBar({ title = "KarmaTab POS" }: Props) {
  const navigation = useNavigation<any>();

  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <TouchableOpacity>
        <Feather name="menu" size={22} color="#111827" />
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-gray-900">{title}</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Feather name="settings" size={22} color="#111827" />
      </TouchableOpacity>
    </View>
  );
}

