import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function TabLayout() {
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
            borderTopWidth: 0,
            position: "absolute",
            bottom: 10,
            borderRadius: 25,
            marginHorizontal: 10,
            marginBottom: 10,
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
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "dots-grid" : "dots-circle"}
                size={30}
                color={focused ? "#312e81" : "#94a3b8"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={30}
                color={focused ? "#312e81" : "#94a3b8"}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
