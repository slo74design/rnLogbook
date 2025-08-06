import CategoryList from "@/src/components/ux/CategoryList";
import React from "react";
import { Text, View } from "react-native";

const GoalsTabs = () => {
    return (
        <View className="flex-1 items-start justify-start bg-white w-full ">
            <Text>Goals Tabs 1</Text>
            <CategoryList />
        </View>
    );
};

export default GoalsTabs;
