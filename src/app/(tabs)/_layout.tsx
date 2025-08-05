import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
    // Opcional: puedes usar estado para cambiar el título dinámicamente basado en la ruta
    return (
        <View style={{ flex: 1 }}>
            {/* Aquí puedes usar lógica para cambiar el título dinámico */}
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "#1D3557",
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
                <Tabs.Screen name="index" options={{ title: "Home" }} />
                <Tabs.Screen
                    name="settings/index"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? "home-sharp" : "home-outline"}
                                color={color}
                                size={24}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}
