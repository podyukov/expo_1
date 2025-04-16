export interface MarkerData {
    id: string;
    latitude: number;
    longitude: number;
    images: ImageData[];
  }
  
  export interface ImageData {
    id: string;
    uri: string;
  }
  
  export type RootStackParamList = {
    Map: undefined;
    MarkerDetails: { id: string };
  };
  