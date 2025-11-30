import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { validatePasscode } from "../lib/supabaseClient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, "Passcode">;

export default function PasscodeScreen({ navigation }: Props) {
  const [code, setCode] = useState("");

  const handleDigit = (d: string) => {
    if (code.length >= 4) return;
    const next = code + d;
    setCode(next);
    if (next.length === 4) submit(next);
  };

  const handleBackspace = () => {
    setCode((c) => c.slice(0, -1));
  };

  const submit = async (pass: string) => {
    const ok = await validatePasscode(pass);
    if (ok) {
      navigation.replace("MainTabs");
    } else {
      Alert.alert("Incorrect passcode", "Please try again.");
      setCode("");
    }
  };

  const renderDot = (index: number) => (
    <View
      key={index}
      style={{
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: index < code.length ? "#6b7280" : "#d1d5db",
        marginHorizontal: 8,
      }}
    />
  );

  const renderButton = (digit: string) => (
    <TouchableOpacity
      key={digit}
      onPress={() => handleDigit(digit)}
      style={{
        width: "30%",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        paddingVertical: 18,
        marginVertical: 6,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: 22, fontWeight: "500", color: "#374151" }}>
        {digit}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Card Container */}
      <View
        style={{
          width: "85%",
          backgroundColor: "#f8fafc",
          borderRadius: 24,
          paddingVertical: 36,
          paddingHorizontal: 24,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        {/* Title */}
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#1f2937", marginBottom: 8 }}>
          KarmaTab POS
        </Text>
        
        {/* Subtitle */}
        <Text style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>
          Enter your passcode to continue
        </Text>

        {/* Dots */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 32 }}>
          {[0, 1, 2, 3].map(renderDot)}
        </View>

        {/* Number Pad */}
        <View style={{ width: "100%" }}>
          {/* Row 1 */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {renderButton("1")}
            {renderButton("2")}
            {renderButton("3")}
          </View>

          {/* Row 2 */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {renderButton("4")}
            {renderButton("5")}
            {renderButton("6")}
          </View>

          {/* Row 3 */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {renderButton("7")}
            {renderButton("8")}
            {renderButton("9")}
          </View>

          {/* Row 4 - Empty, 0, Backspace */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {/* Empty space */}
            <View style={{ width: "30%" }} />
            
            {/* 0 */}
            {renderButton("0")}
            
            {/* Backspace */}
            <TouchableOpacity
              onPress={handleBackspace}
              style={{
                width: "30%",
                backgroundColor: "#ffffff",
                borderRadius: 16,
                paddingVertical: 18,
                marginVertical: 6,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#e5e7eb",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="backspace-outline" size={22} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Passcode */}
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 13, color: "#d4a574", fontWeight: "500" }}>
            Forgot Passcode?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
