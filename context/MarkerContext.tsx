import React, { createContext, useContext, useState } from 'react';
import { ImageData, MarkerData } from '../types';

type MarkerContextType = { // определение типа контекста
  markers: MarkerData[]; // массив маркеров
  addMarker: (marker: Omit<MarkerData, 'images'>) => void; // добавляет маркер без изображения
  addImageToMarker: (markerId: string, image: ImageData) => void; // добавляет изображение к маркеру по id
  removeImageFromMarker: (markerId: string, imageId: string) => void; // удаляет изображение из маркера по id изображения
};

const MarkerContext = createContext<MarkerContextType>({ // создание контекста
  markers: [],
  addMarker: () => {},
  addImageToMarker: () => {},
  removeImageFromMarker: () => {},
});

// создание провайдера контекста
export const MarkerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // функция для добавления маркера без изображения
  const addMarker = (marker: Omit<MarkerData, 'images'>) => {
    setMarkers(prev => [...prev, { ...marker, images: [] }]);
  };

  // функция для добавления изображения к маркеру
  // находит маркер по id и добавляет к нему новое изображение
  const addImageToMarker = (markerId: string, image: ImageData) => {
    setMarkers(prev => prev.map(marker => 
      marker.id === markerId
        ? { ...marker, images: [...marker.images, image] } 
        : marker
    ));
  };

  // функция для удаления изображения из маркера
  const removeImageFromMarker = (markerId: string, imageId: string) => {
    setMarkers(prev => prev.map(marker => 
      marker.id === markerId 
        ? { ...marker, images: marker.images.filter(img => img.id !== imageId) } 
        : marker
    ));
  };

  return (
    <MarkerContext.Provider value={{ 
      markers, 
      addMarker, 
      addImageToMarker, 
      removeImageFromMarker 
    }}>
      {children}
    </MarkerContext.Provider>
  );
};

// хук для использования контекста
export const useMarkers = () => useContext(MarkerContext);