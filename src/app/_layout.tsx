import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import "../global.css";
import { useStore } from "../store/useStore";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { hasCompletedOnboarding, resetOnboarding } = useStore();

  // useEffect(() => {
  //   const third = setTimeout(() => {
  //     console.log("Resetting onboarding state");
  //     resetOnboarding();
  //   }, 1000);

  //   return () => {
  //     clearTimeout(third);
  //   };
  // }, [resetOnboarding]);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    WorkSans: require("../assets/fonts/WorkSans-Regular.ttf"),
    WorkSansBold: require("../assets/fonts/WorkSans-Bold.ttf"),
    WorkSansBlack: require("../assets/fonts/WorkSans-Black.ttf"),
    WorkSansLight: require("../assets/fonts/WorkSans-Light.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="miLog.db" onInit={migrateDbIfNeeded}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Protected guard={hasCompletedOnboarding}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal-newActivity"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Activity",
              }}
            />
          </Stack.Protected>
          <Stack.Protected guard={!hasCompletedOnboarding}>
            <Stack.Screen
              name="(onboarding)/index"
              options={{ headerShown: false }}
            />
          </Stack.Protected>
        </Stack>
      </SQLiteProvider>
    </ThemeProvider>
  );
}

// src/app/RootLayout.tsx (dentro del mismo archivo)

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  // Aseguramos que las claves foráneas están habilitadas
  await db.execAsync(`PRAGMA foreign_keys = ON;`);

  // --- TABLA tblCategorias ---
  // Verifica si la tabla tblCategorias ya existe
  const categoryTable = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='tblCategorias'"
  );
  if (categoryTable.length === 0) {
    console.log("Creando la tabla 'tblCategorias'");
    await db.execAsync(`
      CREATE TABLE tblCategorias (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        catName TEXT NOT NULL,
        catType TEXT NOT NULL,
        isVisible INTEGER NOT NULL
      );
    `);

    // --- INSERTAR DATOS INICIALES EN tblCategorias ---
    // Inserta dos categorías de ejemplo.
    await db.execAsync(`
      INSERT INTO tblCategorias (catName, catType, isVisible)
      VALUES
      ('Trabajo', 'Productividad', 1),
      ('Salud', 'Bienestar', 1);
    `);
    console.log("Datos iniciales insertados en 'tblCategorias'");
  }

  // --- TABLA tblActivities ---
  // Verifica si la tabla tblActivities ya existe
  const activitiesTable = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='tblActivities'"
  );
  if (activitiesTable.length === 0) {
    console.log("Creando la tabla 'tblActivities'");
    await db.execAsync(`
      CREATE TABLE tblActivities (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        category INTEGER,
        note TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (category) REFERENCES tblCategorias(ID)
      );
    `);
  }

  // --- TABLA tblGoals ---
  // Verifica si la tabla tblGoals ya existe
  const goalsTable = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='tblGoals'"
  );
  if (goalsTable.length === 0) {
    console.log("Creando la tabla 'tblGoals'");
    await db.execAsync(`
      CREATE TABLE tblGoals (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        catId INTEGER,
        goalType TEXT,
        goalNote TEXT,
        FOREIGN KEY (catId) REFERENCES tblCategorias(ID)
      );
    `);
  }
}