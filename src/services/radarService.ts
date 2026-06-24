import axios from 'axios';

export interface RadarStation {
  id: string;
  properties: {
    name: string;
    id: string;
    stationType?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

export interface RadarFrame {
  reflectivity: string;
  velocity: string;
  spectralWidth: string;
  reflectivityMap?: string;
  velocityMap?: string;
  bounds: [[number, number], [number, number]];
  elevation: number;
  timestamp: string;
}

export interface RadarData {
  frames: RadarFrame[];
  stationId: string;
  stationName: string;
  stationCoords: [number, number];
}

export const getNearestStation = async (lat: number, lon: number, query?: string) => {
  const url = query 
    ? `/api/radar/station?lat=${lat}&lon=${lon}&query=${encodeURIComponent(query)}`
    : `/api/radar/station?lat=${lat}&lon=${lon}`;
  const response = await axios.get(url);
  return response.data;
};

export const processRadarData = async (stationId: string) => {
  const response = await axios.post('/api/radar/process', { stationId }, { timeout: 120000 });
  return response.data;
};
