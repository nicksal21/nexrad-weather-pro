import React, { useState, useEffect, useMemo } from 'react';
import { Type } from "@google/genai";
import { Search, Wind, CloudRain, MapPin, Loader2, Play, Pause, FastForward, Rewind, Info, AlertTriangle, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { MapContainer, TileLayer, ImageOverlay, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getNearestStation, processRadarData, RadarData, RadarFrame } from './services/radarService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NEXRAD_STATIONS } from './stations';
import { ApiKeySettings } from '@/components/ApiKeySettings';
import { createGeminiClient, getEffectiveApiKey } from '@/lib/geminiApiKey';

const stationMap = new Map();
NEXRAD_STATIONS.forEach(s => {
  stationMap.set(s.icao.toUpperCase(), s);
  stationMap.set(s.name.toUpperCase(), s);
  if (s.icao.startsWith('K') || s.icao.startsWith('P') || s.icao.startsWith('T')) {
    stationMap.set(s.icao.substring(1).toUpperCase(), s);
  }
});

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RadarMapProps {
  data: RadarData;
  mode: 'loop' | 'latest';
  layerType: 'reflectivity' | 'velocity' | 'spectralWidth';
  mapTheme: 'dark' | 'light';
  resetCounter: number;
}

function MapController({ center, bounds, resetCounter }: { center: [number, number], bounds?: L.LatLngBoundsExpression, resetCounter: number }) {
  const map = useMap();
  
  // Only set view on initial load or when station changes or reset is clicked
  useEffect(() => {
    map.setView(center, 8);
    if (bounds) {
      map.setMaxBounds(bounds);
    }
  }, [center, map, bounds, resetCounter]);

  return null;
}

const toDMS = (deg: number, isLat: boolean) => {
  const absolute = Math.abs(deg);
  const d = Math.floor(absolute);
  const m = Math.floor((absolute - d) * 60);
  const s = Math.round((absolute - d - m / 60) * 3600);
  const direction = deg >= 0 ? (isLat ? 'N' : 'E') : (isLat ? 'S' : 'W');
  return `${d}°${m}'${s}" ${direction}`;
};

const REF_SCALE = [
  { dbz: -30, color: '#A5A5A500' },
  { dbz: 10, color: '#00A5FF' },
  { dbz: 20, color: '#10FF08' },
  { dbz: 35, color: '#FBEE00' },
  { dbz: 50, color: '#FF0000' },
  { dbz: 65, color: '#F701F9' },
  { dbz: 75, color: '#FFFFFF' },
  { dbz: 85, color: '#B8B8B8' },
];

const VEL_SCALE = [
  { kts: -120, color: '#E200B2' },
  { kts: -100, color: '#AC009F' },
  { kts: -80, color: '#78008D' },
  { kts: -60, color: '#09B8FA' },
  { kts: -40, color: '#AAFAB8' },
  { kts: -20, color: '#00A000' },
  { kts: -10, color: '#3A693A' },
  { kts: 0, color: '#ACACAC' },
  { kts: 10, color: '#663434' },
  { kts: 20, color: '#8B1F1F' },
  { kts: 30, color: '#D81F1F' },
  { kts: 40, color: '#FF4F4F' },
  { kts: 50, color: '#FFB0B0' },
  { kts: 60, color: '#F07905' },
  { kts: 70, color: '#F7BA00' },
  { kts: 120, color: '#FFFF62' },
];

const SW_SCALE = [
  { kts: 0, color: '#050506' },
  { kts: 4, color: '#4E4D5B' },
  { kts: 8, color: '#9894AD' },
  { kts: 12, color: '#F64B2A' },
  { kts: 16, color: '#FA013F' },
  { kts: 20, color: '#FFF453' },
  { kts: 24, color: '#FFFA8C' },
  { kts: 28, color: '#FFFC7C' },
  { kts: 32, color: '#F6F6F6' },
];

function ColorScale({ type }: { type: 'reflectivity' | 'velocity' | 'spectralWidth' }) {
  const scale = type === 'reflectivity' ? REF_SCALE : type === 'velocity' ? VEL_SCALE : SW_SCALE;
  
  const minVal = type === 'reflectivity' ? (scale[0] as any).dbz : (scale[0] as any).kts;
  const maxVal = type === 'reflectivity' ? (scale[scale.length - 1] as any).dbz : (scale[scale.length - 1] as any).kts;
  const range = maxVal - minVal;

  const gradientStops = scale.map(s => {
    const val = type === 'reflectivity' ? (s as any).dbz : (s as any).kts;
    const percent = range === 0 ? 0 : ((val - minVal) / range) * 100;
    return `${s.color} ${percent}%`;
  }).join(', ');

  const gradient = `linear-gradient(to right, ${gradientStops})`;

  return (
    <div className="flex flex-col gap-1 min-w-[240px] w-full max-w-md">
      <div 
        className="h-3 border border-[#141414]/10 w-full" 
        style={{ background: gradient }}
      />
      <div className="relative w-full h-3">
        {scale.map((s, i) => {
          const val = type === 'reflectivity' ? (s as any).dbz : (s as any).kts;
          const percent = range === 0 ? 0 : ((val - minVal) / range) * 100;
          return (
            <span 
              key={i} 
              className="absolute top-0 text-[6px] font-mono opacity-60 transform -translate-x-1/2"
              style={{ left: `${percent}%` }}
            >
              {val}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function RadarMap({ data, mode, layerType, mapTheme, resetCounter }: RadarMapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(500);
  const [opacity, setOpacity] = useState(80);

  useEffect(() => {
    if (data.frames.length > 0) {
      if (mode === 'latest') {
        setCurrentIndex(data.frames.length - 1);
        setIsPlaying(false);
      } else {
        setCurrentIndex(prev => Math.min(prev, data.frames.length - 1));
      }
    } else {
      setCurrentIndex(0);
    }
  }, [mode, data.frames.length]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && mode === 'loop' && data.frames.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % data.frames.length);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, data.frames.length, mode]);

  const currentFrame = data.frames[currentIndex];
  
  // Calculate max bounds (roughly 500km around station)
  const maxBounds: L.LatLngBoundsExpression = [
    [data.stationCoords[0] - 5, data.stationCoords[1] - 5],
    [data.stationCoords[0] + 5, data.stationCoords[1] + 5]
  ];

  const tileUrl = mapTheme === 'dark' 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-[#141414] border-b border-[#E4E3E0]/10 p-3 flex flex-wrap items-center justify-between shrink-0 gap-4">
        {/* Left: Current Frame */}
        <div className="flex items-center gap-4 w-40">
          {currentFrame ? (
            <div className="flex flex-col">
              <p className="text-[10px] font-mono text-[#E4E3E0]/50 uppercase tracking-widest">Current Frame</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#E4E3E0] tabular-nums">{new Date(currentFrame.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            </div>
          ) : (
            <div className="text-[#E4E3E0]/50 text-sm">No frame data</div>
          )}
        </div>

        {/* Center: Player Controls */}
        {mode === 'loop' && (
          <div className="flex items-center gap-4 bg-[#E4E3E0]/5 px-4 py-1.5 rounded-full">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setSpeed(s => Math.min(2000, s + 100))} className="h-6 w-6 text-[#E4E3E0] hover:bg-white/10">
                <Rewind className="w-3 h-3" />
              </Button>
              <span className="text-[10px] font-mono text-[#E4E3E0] w-10 text-center">
                {Math.round(1000/speed)} FPS
              </span>
              <Button variant="ghost" size="icon" onClick={() => setSpeed(s => Math.max(100, s - 100))} className="h-6 w-6 text-[#E4E3E0] hover:bg-white/10">
                <FastForward className="w-3 h-3" />
              </Button>
            </div>

            <div className="h-3 w-[1px] bg-white/10" />

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => { setIsPlaying(false); setCurrentIndex(p => (p - 1 + data.frames.length) % data.frames.length); }} className="h-6 w-6 text-[#E4E3E0] hover:bg-white/10">
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)} className="h-8 w-8 text-[#141414] bg-[#E4E3E0] hover:bg-white rounded-full">
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => { setIsPlaying(false); setCurrentIndex(p => (p + 1) % data.frames.length); }} className="h-6 w-6 text-[#E4E3E0] hover:bg-white/10">
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>

            <div className="h-3 w-[1px] bg-white/10" />

            <div className="flex flex-col gap-1 w-32">
              <input 
                type="range" 
                min="0" 
                max={Math.max(0, data.frames.length - 1)} 
                value={currentIndex} 
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentIndex(parseInt(e.target.value));
                }}
                className="w-full h-1 bg-white/20 accent-[#E4E3E0] appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[8px] font-mono text-[#E4E3E0]/50 uppercase">
                <span>{data.frames.length > 0 ? new Date(data.frames[0].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                <span>{currentIndex + 1}/{Math.max(1, data.frames.length)}</span>
                <span>{data.frames.length > 0 ? new Date(data.frames[data.frames.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Right: Opacity Slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#E4E3E0]/50 uppercase">Opacity</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={opacity} 
            onChange={(e) => setOpacity(parseInt(e.target.value))}
            className="w-24 h-1 bg-white/20 accent-[#E4E3E0] appearance-none cursor-pointer"
          />
          <span className="text-[10px] font-mono text-[#E4E3E0] w-6 text-right">{opacity}%</span>
        </div>
      </div>

      <div className="flex-1 bg-[#141414] relative">
        <style>{`
          .radar-overlay {
            image-rendering: pixelated;
            image-rendering: crisp-edges;
          }
        `}</style>
        <MapContainer 
          center={data.stationCoords} 
          zoom={8} 
          className="w-full h-full"
          zoomControl={true}
          minZoom={7}
          maxZoom={12}
        >
          <TileLayer
            url={tileUrl}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <MapController center={data.stationCoords} bounds={maxBounds} resetCounter={resetCounter} />
          
          {currentFrame && currentFrame[layerType] && (
            <ImageOverlay
              url={currentFrame[layerType]}
              bounds={currentFrame.bounds}
              opacity={opacity / 100}
              interactive={true}
              className="radar-overlay"
            />
          )}
          
          <Marker position={data.stationCoords}>
            <div className="bg-white/20 p-2 rounded-full animate-ping" />
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default function App() {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const [stationInfo, setStationInfo] = useState<any>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [resolvedLocation, setResolvedLocation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'loop' | 'latest'>('loop');
  const [layerType, setLayerType] = useState<'reflectivity' | 'velocity' | 'spectralWidth'>('reflectivity');
  const [mapTheme, setMapTheme] = useState<'dark' | 'light'>('dark');
  const [resetCounter, setResetCounter] = useState(0);
  const [hasApiKey, setHasApiKey] = useState(!!getEffectiveApiKey());

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError(null);
    setRadarData(null);
    setAnalysis(null);
    setStationInfo(null);
    setResolvedLocation(null);

    try {
      const apiKey = getEffectiveApiKey();
      const ai = createGeminiClient(apiKey);

      let lat: number, lon: number, resolvedName: string;
      let currentStation: any = null;

      const queryUpper = location.trim().toUpperCase();
      const exactStation = stationMap.get(queryUpper);

      if (exactStation) {
        lat = exactStation.location.lat;
        lon = exactStation.location.lon;
        resolvedName = `${exactStation.name} (${exactStation.icao})`;
        currentStation = {
          station: {
            id: exactStation.icao,
            properties: { name: exactStation.name, stationId: exactStation.icao },
            geometry: { coordinates: [lon, lat] }
          },
          distance: 0
        };
        setStationInfo(currentStation);
      } else {
        if (!ai) {
          throw new Error(
            'A Gemini API key is required to search by city or zip. Enter your key above, or use a NEXRAD station ID (e.g. KINX).'
          );
        }

        const locationResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Find the latitude and longitude for the following location: "${location}". Return the result as JSON with keys: lat, lon, resolvedName.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                lat: { type: Type.NUMBER },
                lon: { type: Type.NUMBER },
                resolvedName: { type: Type.STRING }
              },
              required: ["lat", "lon", "resolvedName"]
            }
          }
        });
        const parsed = JSON.parse(locationResponse.text);
        lat = parsed.lat;
        lon = parsed.lon;
        resolvedName = parsed.resolvedName;
      }

      setResolvedLocation(resolvedName);

      if (!currentStation) {
        currentStation = await getNearestStation(lat, lon);
        setStationInfo(currentStation);
      }
      
      const stationId = currentStation.station?.id?.split('/').pop() || currentStation.station?.properties?.stationId;
      const radarResult = await processRadarData(stationId);
      setRadarData(radarResult);

      if (radarResult.frames.length > 0 && !ai) {
        setAnalysis(
          'Radar data loaded successfully. Add your Gemini API key above to enable AI-powered meteorological analysis.'
        );
      }

      // Analyze with Gemini
      if (radarResult.frames.length > 0 && ai) {
        const latestFrame = radarResult.frames[radarResult.frames.length - 1];
        const nwLat = latestFrame.bounds[1][0];
        const nwLon = latestFrame.bounds[0][1];
        const seLat = latestFrame.bounds[0][0];
        const seLon = latestFrame.bounds[1][1];

        const prompt = `Analyze this NEXRAD Level II radar data.
Station: ${radarResult.stationName} (${radarResult.stationId})
User Location: ${resolvedName}
Bounds: NW: ${toDMS(nwLat, true)} ${toDMS(nwLon, false)}, SE: ${toDMS(seLat, true)} ${toDMS(seLon, false)}

I am providing the latest 0.5-degree reflectivity and velocity frames. The images have a light-mode map layer for geographic context.
The red crosshair indicates the radar station location.

Please provide a detailed meteorological analysis including:
1. Significant precipitation patterns (intensity, movement).
2. Velocity signatures (rotation, wind shear, divergence/convergence).
3. Any severe weather indicators (hook echoes, TVS, bow echoes).
4. Local impacts based on the geographic context provided by the map overlay.`;

        const contents: any[] = [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/png",
              data: (latestFrame.reflectivityMap || latestFrame.reflectivity).split(',')[1]
            }
          }
        ];

        if (latestFrame.velocityMap || latestFrame.velocity) {
          contents.push({
            inlineData: {
              mimeType: "image/png",
              data: (latestFrame.velocityMap || latestFrame.velocity).split(',')[1]
            }
          });
        }

        try {
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: {
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: "image/png",
                    data: (latestFrame.reflectivityMap || latestFrame.reflectivity).split(',')[1]
                  }
                },
                ...(latestFrame.velocityMap || latestFrame.velocity ? [{
                  inlineData: {
                    mimeType: "image/png",
                    data: (latestFrame.velocityMap || latestFrame.velocity).split(',')[1]
                  }
                }] : [])
              ]
            }
          });
          setAnalysis(response.text);
        } catch (aiErr: any) {
          console.error('Gemini Error:', aiErr);
          if (aiErr.message?.includes('tokens') || aiErr.message?.includes('rate limit')) {
            setAnalysis("Analysis could not be provided at this time due to rate limits or token constraints.");
          } else {
            setAnalysis("Meteorological analysis is currently unavailable. Please try again later.");
          }
        }
      }
    } catch (err: any) {
      console.error('Search Error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0]">
      <header className="border-b border-[#141414] p-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Wind className="w-8 h-8" />
              NEXRAD Radar Pro
            </h1>
            <p className="text-xs font-mono opacity-60 uppercase tracking-widest">Advanced Meteorological Analysis System</p>
          </div>

          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <Input
                placeholder="Enter Zip, City, or Station (e.g. KINX)..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 bg-transparent border-[#141414] rounded-none focus-visible:ring-0 focus-visible:border-b-2"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#141414] text-[#E4E3E0] rounded-none hover:bg-[#141414]/90 px-8 uppercase font-bold tracking-tight"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyze'}
            </Button>
          </form>
        </div>

        <ApiKeySettings onKeyChange={setHasApiKey} />
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!radarData && !loading && !error && (
            <motion.div 
              key="initial-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-24 h-24 border-2 border-[#141414] rounded-full flex items-center justify-center mb-6 animate-pulse">
                <CloudRain className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Ready for Analysis</h2>
              <p className="text-sm font-mono opacity-60 max-w-md">
                Enter a US location to fetch real-time NEXRAD Level II data and generate AI-powered storm tracking insights.
                Add your Gemini API key above to enable geocoding and AI analysis.
              </p>
              {!hasApiKey && (
                <p className="text-xs font-mono text-amber-800 bg-amber-50 border border-amber-200 px-4 py-2 mt-4 max-w-md">
                  No API key configured. Station IDs (e.g. KINX) work without a key; city and zip searches require one.
                </p>
              )}
            </motion.div>
          )}

          {loading && !radarData && (
            <motion.div 
              key="loading-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-[600px] w-full bg-[#141414]/5 rounded-none" />
                <Skeleton className="h-40 w-full bg-[#141414]/5 rounded-none" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-64 w-full bg-[#141414]/5 rounded-none" />
                <Skeleton className="h-96 w-full bg-[#141414]/5 rounded-none" />
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border border-red-200 p-6 flex items-start gap-4"
            >
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <h3 className="font-bold text-red-900 uppercase tracking-tight">System Error</h3>
                <p className="text-sm text-red-700 font-mono">{error}</p>
                <Button variant="outline" onClick={() => handleSearch()} className="mt-4 border-red-200 text-red-700 hover:bg-red-100">
                  Retry Analysis
                </Button>
              </div>
            </motion.div>
          )}

          {radarData && (
            <motion.div 
              key="results-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-transparent border-[#141414] rounded-none shadow-none overflow-hidden h-[700px] flex flex-col">
                  <CardHeader className="border-b border-[#141414] py-3 px-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                        <Layers className="w-3 h-3" />
                        Interactive Radar Map
                      </CardTitle>
                      <Badge variant="outline" className="border-[#141414] rounded-none font-mono text-[10px] ml-4">
                        LEVEL II DATA
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 border-t border-[#141414]/10 pt-3">
                      <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)} className="w-auto">
                        <TabsList className="bg-[#141414] rounded-none h-8 p-0.5">
                          <TabsTrigger value="loop" className="rounded-none h-7 text-[10px] uppercase font-bold data-[state=active]:bg-[#E4E3E0] data-[state=active]:text-[#141414]">Loop</TabsTrigger>
                          <TabsTrigger value="latest" className="rounded-none h-7 text-[10px] uppercase font-bold data-[state=active]:bg-[#E4E3E0] data-[state=active]:text-[#141414]">Latest</TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase opacity-50">Layer:</span>
                        <Select value={layerType} onValueChange={(v: any) => setLayerType(v)}>
                          <SelectTrigger className="w-40 bg-transparent border-[#141414] rounded-none h-8 text-[10px] uppercase font-bold">
                            <SelectValue placeholder="Layer" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#E4E3E0] text-[#141414] border-[#141414] rounded-none z-[9999]">
                            <SelectItem value="reflectivity">Reflectivity</SelectItem>
                            <SelectItem value="velocity">Velocity</SelectItem>
                            <SelectItem value="spectralWidth">Spectrum Width</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase opacity-50">Theme:</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setMapTheme(mapTheme === 'dark' ? 'light' : 'dark')}
                          className="h-8 rounded-none border-[#141414] text-[10px] uppercase font-bold"
                        >
                          {mapTheme === 'dark' ? 'Dark' : 'Light'}
                        </Button>
                      </div>

                      <ColorScale type={layerType} />

                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setResetCounter(c => c + 1)}
                        className="h-8 rounded-none border-[#141414] text-[10px] uppercase font-bold ml-auto"
                      >
                        Reset View
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <RadarMap 
                      data={radarData} 
                      mode={viewMode} 
                      layerType={layerType} 
                      mapTheme={mapTheme} 
                      resetCounter={resetCounter}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-transparent border-[#141414] rounded-none shadow-none">
                  <CardHeader className="border-b border-[#141414] py-3 px-4">
                    <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      Station Metadata
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#141414]">
                      <div className="p-4">
                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">Location</p>
                        <p className="text-sm font-bold uppercase truncate">{resolvedLocation}</p>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">Station</p>
                        <p className="text-sm font-bold uppercase truncate">{radarData.stationName} ({radarData.stationId})</p>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">Coordinates</p>
                        <p className="text-sm font-bold uppercase">{radarData.stationCoords[0].toFixed(4)}°, {radarData.stationCoords[1].toFixed(4)}°</p>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] font-mono opacity-50 uppercase mb-1">Latest</p>
                        <p className="text-sm font-bold uppercase">
                          {radarData.frames.length > 0 
                            ? new Date(radarData.frames[radarData.frames.length - 1].timestamp).toLocaleTimeString() 
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-transparent border-[#141414] rounded-none shadow-none h-full flex flex-col">
                  <CardHeader className="border-b border-[#141414] py-3 px-4">
                    <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                      <Wind className="w-3 h-3" />
                      Meteorological Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-[700px]">
                      <div className="p-6">
                        {!analysis ? (
                          <div className="space-y-4">
                            {[...Array(6)].map((_, i) => (
                              <Skeleton key={`skeleton-analysis-${i}`} className={`h-4 bg-[#141414]/5 ${i % 2 === 0 ? 'w-full' : 'w-5/6'}`} />
                            ))}
                          </div>
                        ) : (
                          <div className="prose prose-sm font-sans text-[#141414] max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:font-bold prose-hr:border-[#141414]/10">
                            <ReactMarkdown>{analysis}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-auto border-t border-[#141414] p-6 text-center">
        <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.2em]">
          Data Source: AWS S3 (NEXRAD Level II) • Powered by Google Gemini
        </p>
      </footer>
    </div>
  );
}
