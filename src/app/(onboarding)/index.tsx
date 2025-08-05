import { useStore } from "@/src/store/useStore";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { completeOnboarding } = useStore();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>OnBoarding Screen.</Text>
      <Button onPress={completeOnboarding} title="Go to Tabs" />
    </View>
  );
}
