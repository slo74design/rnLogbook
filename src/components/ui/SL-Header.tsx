import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SLHeaderProps = {
    // Define any props if needed, currently none are required
    title?: string;
};

export default function SLHeader({ title = "Logbook" }: SLHeaderProps) {
    return (
        <SafeAreaView className="bg-SL p-4 rounded-bl-[40px]">
            <StatusBar style="light" />
            <View className="flex flex-row items-center justify-center w-full">
                <Text className="text-white text-lg font-WorkSansBold">
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    );
}
