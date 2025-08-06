import { HapticTab } from "@/src/components/HapticTab";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function TabLayout() {
  const router = useRouter(); // Inicializa useRouter
  // Opcional: puedes usar estado para cambiar el título dinámicamente basado en la ruta
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      {/* Aquí puedes usar lógica para cambiar el título dinámico */}
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f8fafc",
          },
          headerTitleStyle: {
            fontSize: 14,
            textTransform: "uppercase",
          },
          headerTintColor: "#1e293b",
          headerTitleAlign: "left",
          tabBarStyle: {
            backgroundColor: "#f8fafc",
            borderColor: "#e5e7eb",
            borderBottomWidth: 1,
            shadowColor: "#000",
            position: "absolute",
            bottom: 10,
            borderRadius: 25,
            marginHorizontal: 20,
            marginBottom: 15,
            paddingVertical: 0,
            height: 60,
          },
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontFamily: "WorkSans",
            textTransform: "uppercase",
            fontSize: 13,
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "black",
          tabBarItemStyle: {
            paddingVertical: 10,
          },
          tabBarButton: HapticTab,
          animation: "fade",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name="list"
                size={28}
                color={focused ? "#312e81" : "#94a3b8"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="new/index"
          options={{
            title: "New Activity",
            tabBarIcon: ({ color, focused, size }) => (
              <AntDesign
                name="plus"
                size={28}
                color={focused ? "#312e81" : "#db2777"}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent default behavior
              e.preventDefault();
              router.push("/modal-newActivity");
            },
          }}
        />
        <Tabs.Screen
          name="goals/index"
          options={{
            title: "Goals",
            tabBarIcon: ({ color, focused, size }) => (
              <AntDesign
                name="rocket1"
                size={28}
                color={focused ? "#312e81" : "#94a3b8"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}
