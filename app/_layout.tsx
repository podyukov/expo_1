import { Slot } from 'expo-router';  // Добавляем импорт Slot
import { MarkerProvider } from '../context/MarkerContext';

export default function RootLayout() {
  return (
    <MarkerProvider>
      <Slot />
    </MarkerProvider>
  );
}