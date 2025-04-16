import React, { createContext, useContext, useState } from 'react';
import { ImageData, MarkerData } from '../types';

type MarkerContextType = {
  markers: MarkerData[];
  addMarker: (marker: Omit<MarkerData, 'images'>) => void;
  addImageToMarker: (markerId: string, image: ImageData) => void;
  removeImageFromMarker: (markerId: string, imageId: string) => void;
};

const MarkerContext = createContext<MarkerContextType>({
  markers: [],
  addMarker: () => {},
  addImageToMarker: () => {},
  removeImageFromMarker: () => {},
});

export const MarkerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const addMarker = (marker: Omit<MarkerData, 'images'>) => {
    setMarkers(prev => [...prev, { ...marker, images: [] }]);
  };

  const addImageToMarker = (markerId: string, image: ImageData) => {
    setMarkers(prev => prev.map(marker => 
      marker.id === markerId 
        ? { ...marker, images: [...marker.images, image] } 
        : marker
    ));
  };

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

export const useMarkers = () => useContext(MarkerContext);