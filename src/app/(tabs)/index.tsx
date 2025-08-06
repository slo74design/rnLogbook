import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";

const Welcome = () => {
  const height = useBottomTabBarHeight();
  return (
    <View className="flex-1 items-start justify-start bg-white w-full px-4 py-2">
      <Text className="font-WorkSans text-base text-slate-600">
        Welcome Tabs 1 - {height}px
      </Text>
    </View>
  );
};

export default Welcome;
