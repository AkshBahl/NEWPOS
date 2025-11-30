import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title?: string;
};

export default function HeaderBar({ title = "KarmaTab POS" }: Props) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="w-full flex-row items-center justify-between px-5 pb-3 bg-white border-b border-gray-100"
      style={{ paddingTop: insets.top + 12 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Hamburger Menu */}
      <TouchableOpacity className="p-1">
        <MaterialCommunityIcons name="menu" size={24} color="#374151" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-lg font-semibold text-gray-800">{title}</Text>

      {/* Settings Icon */}
      <TouchableOpacity 
        onPress={() => navigation.navigate("Settings")}
        className="w-10 h-10 rounded-full bg-amber-50 items-center justify-center"
      >
        <MaterialCommunityIcons name="cog-outline" size={22} color="#d4a574" />
      </TouchableOpacity>
    </View>
  );
}
