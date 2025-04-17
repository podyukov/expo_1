import React from "react";
import { View, Text, Button, FlatList, Alert, Image, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { ImageData, RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMarkers } from "../../context/MarkerContext";

type Props = NativeStackScreenProps<RootStackParamList, "MarkerDetails">;

// Отображает детали маркера, включая его изображения и позволяет управлять
export default function MarkerDetails() {
  const route = useRoute<Props["route"]>();
  const navigation = useNavigation();
  const { id } = route.params; // получаем id маркера
  const { markers, addImageToMarker, removeImageFromMarker } = useMarkers(); // получаем маркеры и функции для работы с ними

  const marker = markers.find(m => m.id === id); // ищем маркер по id

  if (!marker) { // если маркер не найден
    return (
      <View style={styles.container}>
        <Text>Маркер не найден</Text>
        <Button title="Назад к карте" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const addImage = async () => { // добавление изображения к маркеру
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ // открытие галереи
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // только изображения
        quality: 1, // максимальное качество
      });

      if (!result.canceled && result.assets?.length) { // если пользователь выбрал изображение
        const newImage: ImageData = { // создание нового объекта изображения
          id: Date.now().toString(), // уникальный id
          uri: result.assets[0].uri, // uri изображения
        };
        addImageToMarker(marker.id, newImage); // добавление изображения к маркеру
      }
    } catch (error) { // если произошла ошибка
      Alert.alert("Ошибка", "Не удалось выбрать изображение");
    }
  };

  const deleteImage = (imageId: string) => { // удаление изображения из маркера по id
    removeImageFromMarker(marker.id, imageId);
  };

  return ( // отображение деталей маркера
    <View style={styles.container}>
      <Text>Маркер ID: {marker.id}</Text>
      <Text>Широта: {marker.latitude}</Text>
      <Text>Долгота: {marker.longitude}</Text>

      <Button title="Добавить изображение" onPress={addImage} />

      <FlatList
        data={marker.images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageBlock}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Button title="Удалить" onPress={() => deleteImage(item.id)} />
          </View>
        )}
      />

      <Button title="Назад к карте" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({ // стили для компонентов
  container: { flex: 1, padding: 20 },
  imageBlock: { marginVertical: 10 },
  image: { width: 200, height: 200, borderRadius: 10 },
});