import { useFocusEffect, useRouter } from "expo-router"; // El hook se importa aquí
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

// Definimos los tipos para la categoría y el grupo
type Category = {
    ID: number;
    catName: string;
    catType: string;
    isVisible: number;
};

type GroupedCategory = {
    catType: string;
    data: Category[];
};

const CategoryList = () => {
    const [groupedCategories, setGroupedCategories] = useState<
        GroupedCategory[]
    >([]);
    const db = useSQLiteContext();
    const router = useRouter(); // <--- Llamada al hook en el lugar correcto

    const fetchAndGroupCategories = async () => {
        try {
            const allCategories = await db.getAllAsync<Category>(
                `SELECT * FROM tblCategorias ORDER BY catType, catName`
            );

            if (allCategories.length === 0) {
                setGroupedCategories([]);
                return;
            }

            const groupedData: Record<string, Category[]> = {};
            allCategories.forEach((category) => {
                if (!groupedData[category.catType]) {
                    groupedData[category.catType] = [];
                }
                groupedData[category.catType].push(category);
            });

            const groupedArray = Object.keys(groupedData).map((catType) => ({
                catType: catType,
                data: groupedData[catType],
            }));

            setGroupedCategories(groupedArray);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    // Usamos useFocusEffect para recargar la lista cada vez que la pantalla se enfoca
    useFocusEffect(
        React.useCallback(() => {
            fetchAndGroupCategories();
        }, [db]) // db es una dependencia estable, se puede omitir pero es buena práctica incluirla
    );

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <TouchableOpacity
            className="flex-row items-center p-3 border-b border-gray-200"
            onPress={() => console.log(`Seleccionada: ${item.catName}`)}
        >
            <Text className="text-base text-gray-800">{item.catName}</Text>
        </TouchableOpacity>
    );

    const renderGroup = ({ item }: { item: GroupedCategory }) => (
        <View className="mb-4">
            <Text className="text-xl font-bold text-gray-700 px-3 py-2 bg-gray-100">
                {item.catType}
            </Text>
            <View className="bg-white rounded-lg overflow-hidden">
                {item.data.map((category) => (
                    <View key={category.ID}>
                        {renderCategoryItem({ item: category })}
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <FlatList
            data={groupedCategories}
            renderItem={renderGroup}
            keyExtractor={(item) => item.catType}
            contentContainerStyle={{ padding: 10 }}
            ListEmptyComponent={
                <Text className="text-center mt-10">
                    No hay categorías disponibles.
                </Text>
            }
        />
    );
};

export default CategoryList;
