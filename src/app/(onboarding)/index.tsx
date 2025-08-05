import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>OnBoarding Screen.</Text>
      <Link href="/(tabs)" asChild>
        <Text style={{ color: "blue", marginTop: 20 }}>Go to Tabs</Text>
      </Link>
    </View>
  );
}
