import { useNavigation, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewActivity() {
  const router = useRouter();
  const navigation = useNavigation();

  const handleClose = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      // Si no se puede retroceder, haz algo más, como navegar a la pestaña principal
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View
        style={{
          width: "90%",
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Text>Este es el modal para crear una nueva tarjeta.</Text>
        <Button title="Cerrar Modal" onPress={handleClose} />
      </View>
    </SafeAreaView>
  );
}
