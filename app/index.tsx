import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, LongPressEvent } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useMarkers } from '../context/MarkerContext';

export default function Index() {
  const { markers, addMarker } = useMarkers();
  const router = useRouter();

  const handleLongPress = (e: LongPressEvent) => {
    console.log('Long press detected', e.nativeEvent.coordinate); // Добавьте лог
    const newMarker = {
      id: `${Date.now()}`,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };
    console.log('New marker:', newMarker); // Лог нового маркера
    addMarker(newMarker);
  };

  const handleMarkerPress = (id: string) => {
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
        {markers.map((marker) => {
          console.log('Rendering marker:', marker); // Лог каждого маркера
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});