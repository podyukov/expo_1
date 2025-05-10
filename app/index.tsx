import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, LongPressEvent } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useMarkers } from '../context/MarkerContext';

export default function Index() {
  const { markers, addMarker } = useMarkers(); // получаем маркеры
  const router = useRouter();

  const handleLongPress = (e: LongPressEvent) => { // добавление нового маркера при долгом нажатии
    const newMarker = {
      id: `${Date.now()}`,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };
    addMarker(newMarker); // сохраняем маркер в контекст
  };

  const handleMarkerPress = (id: string) => { // при нажатии на маркер
    router.push(`/marker/${id}`); // переходим на экран маркера
  };

  return (
    <View>
      <MapView // рендер карты
        style={styles.map}
        onLongPress={handleLongPress}
        initialRegion={{ // точка спавна пермь
          latitude: 58.17448,
          longitude: 56.2280,
          latitudeDelta: 1.0, // уровень зума
          longitudeDelta: 1.0,
        }}
      >
        {markers.map((marker) => { // рендер маркеров из контекста
          return (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              onPress={() => handleMarkerPress(marker.id)}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({ // стилизация
  container: {
    flex: 1,
  },
  map: { // задаём карте размер на весь экран
    width: '100%',
    height: '100%',
  },
});