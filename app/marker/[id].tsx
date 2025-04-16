import React, { useState } from "react";
import { View, Text, Button, FlatList, Alert, Image, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { ImageData, MarkerData, RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "MarkerDetails">;

export default function MarkerDetails() {
  const route = useRoute<Props["route"]>();
  const navigation = useNavigation();
  const { id } = route.params;

  // В реальном проекте получаем из хранилища
  const [marker, setMarker] = useState<MarkerData>({
    id,
    latitude: 55.75,
    longitude: 37.61,
    images: [],
  });

  const addImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length) {
        const newImage: ImageData = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
        };
        setMarker((prev) => ({
          ...prev,
          images: [...prev.images, newImage],
        }));
      }
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось выбрать изображение");
    }
  };

  const deleteImage = (imageId: string) => {
    setMarker((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  return (
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  imageBlock: { marginVertical: 10 },
  image: { width: 200, height: 200, borderRadius: 10 },
});
