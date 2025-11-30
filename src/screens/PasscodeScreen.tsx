import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { validatePasscode } from "../lib/supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, "Passcode">;

const digits = ["1","2","3","4","5","6","7","8","9","0"];

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
      Alert.alert("Incorrect passcode");
      setCode("");
    }
  };

  const indicators = [0,1,2,3];

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="w-[80%] bg-[#f8fafc] rounded-2xl py-8 px-6 shadow-md">
        <Text className="text-center text-gray-900 font-semibold text-lg mb-1">
          KarmaTab POS
        </Text>
        <Text className="text-center text-xs text-gray-500 mb-4">
          Enter your passcode to continue
        </Text>

        {/* Dots */}
        <View className="flex-row justify-center space-x-2 mb-6">
          {indicators.map((i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < code.length ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          ))}
        </View>

        {/* Keypad */}
        <View className="flex-row flex-wrap justify-between">
          {digits.slice(0,9).map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => handleDigit(d)}
              className="w-[30%] bg-white rounded-xl py-3 my-1 items-center justify-center border border-gray-200 shadow-sm"
            >
              <Text className="text-gray-800 font-medium">{d}</Text>
            </TouchableOpacity>
          ))}

          {/* 0 row */}
          <View className="flex-row w-full justify-between mt-1">
            <TouchableOpacity
              className="w-[30%] rounded-xl py-3 my-1"
              disabled
            />
            <TouchableOpacity
              onPress={() => handleDigit("0")}
              className="w-[30%] bg-white rounded-xl py-3 my-1 items-center justify-center border border-gray-200 shadow-sm"
            >
              <Text className="text-gray-800 font-medium">0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBackspace}
              className="w-[30%] bg-white rounded-xl py-3 my-1 items-center justify-center border border-gray-200 shadow-sm"
            >
              <Text className="text-gray-600 text-xs">⌫</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className="mt-4">
          <Text className="text-center text-[11px] text-amber-500">
            Forgot Passcode?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

