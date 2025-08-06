import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import "../global.css";
import { useStore } from "../store/useStore";

// Solo para desarrollo: borra la base de datos al inicio
const clearDatabaseForDevelopment = async () => {
    const dbFile = `${FileSystem.documentDirectory}SQLite/miLog.db`;
    try {
        const fileInfo = await FileSystem.getInfoAsync(dbFile);
        if (fileInfo.exists) {
            console.log("Borrando la base de datos existente...");
            await FileSystem.deleteAsync(dbFile);
        }
    } catch (error) {
        console.error("Error al borrar la base de datos:", error);
    }
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const { hasCompletedOnboarding } = useStore();

    useEffect(() => {
        // Si estás en modo de desarrollo, puedes llamar a esta función
        if (__DEV__) {
            clearDatabaseForDevelopment();
        }
    }, []);

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
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <SQLiteProvider databaseName="miLog.db" onInit={migrateDbIfNeeded}>
                <StatusBar style="light" />
                <Stack>
                    <Stack.Protected guard={hasCompletedOnboarding}>
                        {/* El _layout de las pestañas se encarga de las tabs y sus modales */}
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
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

// Define la versión actual de la base de datos
const DATABASE_VERSION = 2; // Incrementar este número cada vez que hagas un cambio

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    await db.execAsync(`PRAGMA foreign_keys = ON;`);

    let currentVersion = await getDbVersion(db);

    // Si la versión es 0, significa que la base de datos es completamente nueva.
    // Creamos todas las tablas y datos iniciales en un solo paso.
    if (currentVersion < 1) {
        console.log("Migrando a la versión 1: Creando tablas iniciales...");

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS tblCategorias (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                catName TEXT NOT NULL,
                catType TEXT NOT NULL,
                isVisible INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS tblActivities (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                category INTEGER,
                note TEXT,
                createdAt TEXT NOT NULL,
                updatedAt TEXT NOT NULL,
                FOREIGN KEY (category) REFERENCES tblCategorias(ID)
            );
            CREATE TABLE IF NOT EXISTS tblGoals (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                catId INTEGER,
                goalType TEXT,
                goalNote TEXT,
                FOREIGN KEY (catId) REFERENCES tblCategorias(ID)
            );
        `);
        console.log("Tablas iniciales creadas o ya existentes.");

        // Solo insertamos datos si la tabla tblCategorias está vacía.
        // Esto evita duplicados si la tabla ya existía pero vacía.
        const categoryCount = await db.getFirstAsync<{ count: number }>(
            "SELECT count(*) as count FROM tblCategorias"
        );
        if (categoryCount?.count === 0) {
            console.log("Insertando datos iniciales en tblCategorias...");
            await db.execAsync(`
                INSERT INTO tblCategorias (catName, catType, isVisible)
                VALUES
                ('Comida - Desayuno', 'Comida y Nutrición', 1),
                ('Comida - Almuerzo', 'Comida y Nutrición', 1),
                ('Comida - Snack', 'Comida y Nutrición', 1),
                ('Comida - Cena', 'Comida y Nutrición', 1),
                ('Comida - Comer fuera', 'Comida y Nutrición', 1),
                ('Comida - Pizza', 'Comida y Nutrición', 1),
                ('Comida - Basura', 'Comida y Nutrición', 1),
                ('Coffee time', 'Comida y Nutrición', 1),
                ('Gym - Bici estatica', 'Ejercicio y Deporte', 1),
                ('Gym - Caminar en la cinta', 'Ejercicio y Deporte', 1),
                ('Gym - Correr en la cinta', 'Ejercicio y Deporte', 1),
                ('Gym - Eliptica', 'Ejercicio y Deporte', 1),
                ('Gym - Maquinas', 'Ejercicio y Deporte', 1),
                ('Gym - Entrenamiento libre', 'Ejercicio y Deporte', 1),
                ('Gym - Remos', 'Ejercicio y Deporte', 1),
                ('Correr al aire libre', 'Ejercicio y Deporte', 1),
                ('Trabajo - en la Oficina', 'Trabajo y Productividad', 1),
                ('Trabajo - en remoto', 'Trabajo y Productividad', 1),
                ('Trabajo - Proyecto personal', 'Trabajo y Productividad', 1),
                ('Trabajo - Investigación', 'Trabajo y Productividad', 1),
                ('Hogar - Cocinar', 'Hogar y Tareas Domésticas', 1),
                ('Hogar - Facturas y Pagos', 'Hogar y Tareas Domésticas', 1),
                ('Hogar - Fregar Platos', 'Hogar y Tareas Domésticas', 1),
                ('Hogar - Lavadora', 'Hogar y Tareas Domésticas', 1),
                ('Hogar - Limpiar', 'Hogar y Tareas Domésticas', 1),
                ('Hogar - Mantenimiento', 'Hogar y Tareas Domésticas', 1),
                ('Cuidado - Facial', 'Bienestar y Cuidado Personal', 1),
                ('Cuidado - Masaje/Spa', 'Bienestar y Cuidado Personal', 1),
                ('Cuidado - Peluqueria', 'Bienestar y Cuidado Personal', 1),
                ('Cuidado - Piès', 'Bienestar y Cuidado Personal', 1),
                ('Cuidado - Uñas', 'Bienestar y Cuidado Personal', 1),
                ('Ocio - Evento social', 'Social y Ocio', 1),
                ('Ocio - Ir de compras', 'Social y Ocio', 1),
                ('Ocio - Salir con amigos', 'Social y Ocio', 1),
                ('Ocio - Viaje', 'Social y Ocio', 1),
                ('Aprendizaje - Curso online', 'Aprendizaje', 1),
                ('Aprendizaje - Estudiar', 'Aprendizaje', 1),
                ('Aprendizaje - Leer un libro', 'Aprendizaje', 1),
                ('Citas - Dentista', 'Salud y Citas', 1),
                ('Citas - Fisioterapia', 'Salud y Citas', 1),
                ('Citas - Medico', 'Salud y Citas', 1),
                ('Citas - Terapia', 'Salud y Citas', 1),
                ('Salud - Medicamientos', 'Salud y Citas', 1),
                ('Salud - Vitaminas', 'Salud y Citas', 1)
            `);
            console.log("Datos iniciales insertados en tblCategorias.");
        }
    }

    // Si la base de datos es nueva (currentVersion 0) o ya es V1, actualizamos a la V2
    if (currentVersion < DATABASE_VERSION) {
        console.log(
            `Actualizando la versión de la base de datos a ${DATABASE_VERSION}...`
        );
        await setDbVersion(db, DATABASE_VERSION);
        console.log(
            `Base de datos actualizada a la versión ${DATABASE_VERSION}`
        );
    }
}

async function getDbVersion(db: SQLiteDatabase): Promise<number> {
    const result = await db.getFirstAsync<{ version: number }>(
        `PRAGMA user_version;`
    );
    return result?.version || 0;
}

async function setDbVersion(db: SQLiteDatabase, version: number) {
    await db.execAsync(`PRAGMA user_version = ${version};`);
}