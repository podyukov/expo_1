import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker, LongPressEvent } from 'react-native-maps';
import { useRouter } from 'expo-router';

export default function Index() {
  const [markers, setMarkers] = useState<{ id: string; latitude: number; longitude: number }[]>([]);
  const router = useRouter();

  // Обработчик для добавления маркера по долгому нажатию
  const handleLongPress = (e: LongPressEvent) => {
    const newMarker = {
      id: `${Date.now()}`, // Уникальный идентификатор для маркера
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  // Обработчик нажатия на маркер, переход на экран с деталями
  const handleMarkerPress = (id: string) => {
    // Навигация на экран с деталями маркера
    router.push(`/marker/${id}`);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onLongPress={handleLongPress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => handleMarkerPress(marker.id)} // Переход на экран маркера
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
