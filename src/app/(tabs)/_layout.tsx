// src/app/(tabs)/_layout.tsx
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";

// Componente para el botón del headerRight
const HeaderRightButton = () => {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => router.push("/settings/index")} // <-- Usa la ruta absoluta aquí
            style={{ marginRight: 20 }}
        >
            <Ionicons name="list" size={28} color="#312e81" />
        </Pressable>
    );
};

export default function TabLayout() {
    return (
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
                // tabBarButton: HapticTab, // Descomenta si tienes HapticTab
                animation: "fade",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    // headerRight ya no va aquí, lo definiremos en el componente de la pantalla
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="list"
                            size={28}
                            color={focused ? "#312e81" : "#94a3b8"}
                        />
                    ),
                    headerRight: () => <HeaderRightButton />,
                }}
            />
            <Tabs.Screen
                name="new/index"
                options={{
                    title: "New Activity",
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="plus"
                            size={28}
                            color={focused ? "#312e81" : "#db2777"}
                        />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        router.push("/modal-newActivity"); // El router aquí es el de Tabs
                    },
                }}
            />
            <Tabs.Screen
                name="goals/index"
                options={{
                    title: "Goals",
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="rocket1"
                            size={28}
                            color={focused ? "#312e81" : "#94a3b8"}
                        />
                    ),
                }}
            />

            {/* Los modales se definen aquí, pero con href: null para que no aparezcan en la tab bar */}
            <Tabs.Screen
                name="settings/index"
                options={{
                    href: null, // No muestra esta pantalla en la barra de pestañas
                    presentation: "modal",
                    headerShown: true,
                    title: "Settings",
                }}
            />
            <Tabs.Screen
                name="modal-newActivity"
                options={{
                    href: null, // No muestra esta pantalla en la barra de pestañas
                    presentation: "modal",
                    headerShown: true,
                    title: "Activity",
                }}
            />
        </Tabs>
    );
}
