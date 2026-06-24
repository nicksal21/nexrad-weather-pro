import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { XMLParser } from 'fast-xml-parser';
import { Level2Radar } from 'nexrad-level-2-data';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { NEXRAD_STATIONS } from './src/stations.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Temporary directory for processing
const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

// Helper: Calculate distance between two coordinates
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Color tables based on user provided GRLevelX format
const BR_TABLE = [
  { val: -30, c1: [165, 165, 165, 0], c2: [8, 230, 230, 255] },
  { val: 10, c1: [0, 165, 255, 255], c2: [0, 8, 197, 255] },
  { val: 20, c1: [16, 255, 8, 255], c2: [10, 126, 3, 255] },
  { val: 35, c1: [251, 238, 0, 255], c2: [210, 112, 2, 255] },
  { val: 50, c1: [255, 0, 0, 255], c2: [171, 0, 1, 255] },
  { val: 65, c1: [247, 1, 249, 255], c2: [136, 63, 174, 255] },
  { val: 75, c1: [255, 255, 255, 255], c2: [184, 184, 184, 255] },
  { val: 85, c1: [184, 184, 184, 255] },
  { val: 95, c1: [184, 184, 184, 255] }
];

const BV_TABLE = [
  { val: 120, c1: [255, 255, 98, 255] },
  { val: 70, c1: [247, 186, 0, 255] },
  { val: 65, c1: [243, 155, 3, 255] },
  { val: 60, c1: [240, 121, 5, 255] },
  { val: 55, c1: [247, 180, 87, 255] },
  { val: 50, c1: [255, 176, 176, 255] },
  { val: 40, c1: [255, 79, 79, 255] },
  { val: 35, c1: [235, 42, 42, 255], c2: [255, 54, 54, 255] },
  { val: 30, c1: [216, 31, 31, 255] },
  { val: 25, c1: [170, 16, 16, 255], c2: [204, 0, 0, 255] },
  { val: 20, c1: [139, 31, 31, 255] },
  { val: 15, c1: [108, 28, 28, 255], c2: [114, 0, 0, 255] },
  { val: 10, c1: [102, 52, 52, 255] },
  { val: 5, c1: [144, 123, 123, 255], c2: [108, 63, 63, 255] },
  { val: 0, c1: [172, 172, 172, 255] },
  { val: -5, c1: [113, 138, 113, 255] },
  { val: -10, c1: [58, 105, 58, 255] },
  { val: -15, c1: [0, 160, 0, 255], c2: [0, 120, 0, 255] },
  { val: -30, c1: [63, 255, 63, 255] },
  { val: -40, c1: [170, 250, 184, 255] },
  { val: -45, c1: [94, 219, 215, 255] },
  { val: -50, c1: [9, 184, 250, 255] },
  { val: -65, c1: [0, 42, 136, 255] },
  { val: -70, c1: [6, 0, 102, 255] },
  { val: -80, c1: [120, 0, 141, 255] },
  { val: -90, c1: [172, 0, 159, 255] },
  { val: -120, c1: [226, 0, 178, 255] }
];

const SW_TABLE = [
  { val: 0, c1: [5, 5, 6, 255] },
  { val: 2, c1: [42, 42, 49, 255] },
  { val: 4, c1: [78, 77, 91, 255] },
  { val: 6, c1: [115, 114, 133, 255] },
  { val: 8, c1: [152, 148, 173, 255] },
  { val: 10, c1: [200, 109, 105, 255] },
  { val: 12, c1: [246, 75, 42, 255] },
  { val: 14, c1: [248, 116, 52, 255] },
  { val: 16, c1: [250, 161, 63, 255] },
  { val: 18, c1: [252, 203, 73, 255] },
  { val: 20, c1: [255, 244, 83, 255] },
  { val: 22, c1: [255, 248, 111, 255] },
  { val: 24, c1: [255, 250, 140, 255] },
  { val: 26, c1: [255, 251, 170, 255] },
  { val: 28, c1: [255, 252, 199, 255] },
  { val: 30, c1: [255, 254, 226, 255] },
  { val: 32, c1: [246, 246, 246, 255] }
];

function interpolateColor(val: number, table: any[]): [number, number, number, number] {
  const isAscending = table[0].val < table[table.length - 1].val;
  
  if (isAscending) {
    if (val <= table[0].val) return table[0].c1 as any;
    if (val >= table[table.length - 1].val) return (table[table.length - 1].c2 || table[table.length - 1].c1) as any;
    
    for (let i = 0; i < table.length - 1; i++) {
      const v1 = table[i].val;
      const v2 = table[i+1].val;
      if (val >= v1 && val < v2) {
        const c1 = table[i].c1;
        const c2 = table[i].c2 || table[i+1].c1;
        const ratio = (val - v1) / (v2 - v1);
        return [
          Math.round(c1[0] + (c2[0] - c1[0]) * ratio),
          Math.round(c1[1] + (c2[1] - c1[1]) * ratio),
          Math.round(c1[2] + (c2[2] - c1[2]) * ratio),
          Math.round(c1[3] + (c2[3] - c1[3]) * ratio)
        ];
      }
    }
  } else {
    // Descending
    if (val >= table[0].val) return table[0].c1 as any;
    if (val <= table[table.length - 1].val) return (table[table.length - 1].c2 || table[table.length - 1].c1) as any;
    
    for (let i = 0; i < table.length - 1; i++) {
      const v1 = table[i].val;
      const v2 = table[i+1].val;
      if (val <= v1 && val > v2) {
        const c1 = table[i].c1;
        const c2 = table[i].c2 || table[i+1].c1;
        const ratio = (v1 - val) / (v1 - v2);
        return [
          Math.round(c1[0] + (c2[0] - c1[0]) * ratio),
          Math.round(c1[1] + (c2[1] - c1[1]) * ratio),
          Math.round(c1[2] + (c2[2] - c1[2]) * ratio),
          Math.round(c1[3] + (c2[3] - c1[3]) * ratio)
        ];
      }
    }
  }
  return [0, 0, 0, 0];
}

// Color scales
function getRefColor(val: number): [number, number, number, number] {
  return interpolateColor(val, BR_TABLE);
}

function getVelColor(val: number): [number, number, number, number] {
  return interpolateColor(val, BV_TABLE);
}

function getSWColor(val: number): [number, number, number, number] {
  return interpolateColor(val, SW_TABLE);
}

// Image generation
async function generateRadarImage(radials: any[], type: 'reflect' | 'velocity' | 'spectrum', size: number = 2048, rangeKm: number = 250, addMap: boolean = false, stationCoords?: [number, number]) {
  const validRadials = radials.filter(r => r[type]);
  if (validRadials.length === 0) return null;

  const buffer = Buffer.alloc(size * size * 4);
  const center = size / 2;
  const pixelsPerKm = center / rangeKm;

  // Sort radials by azimuth for faster lookup
  const sortedRadials = [...validRadials].sort((a, b) => a.azimuth - b.azimuth);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = center - y;
      const r = Math.sqrt(dx * dx + dy * dy) / pixelsPerKm;
      
      if (r > rangeKm) continue;

      let theta = (Math.atan2(dx, dy) * 180) / Math.PI;
      if (theta < 0) theta += 360;

      // Binary search for nearest radial
      let low = 0;
      let high = sortedRadials.length - 1;
      let radialIdx = 0;
      
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (sortedRadials[mid].azimuth < theta) {
          low = mid + 1;
        } else {
          high = mid - 1;
          radialIdx = mid;
        }
      }
      
      const radial = sortedRadials[radialIdx];
      if (!radial) continue;

      const data = radial[type];
      const binIdx = Math.floor(r / data.gate_size);
      
      if (binIdx < data.moment_data.length) {
        const val = data.moment_data[binIdx];
        if (val === null || val === undefined) continue;

        let color: [number, number, number, number];
        if (type === 'reflect') color = getRefColor(val);
        else if (type === 'velocity') color = getVelColor(val);
        else color = getSWColor(val);

        const offset = (y * size + x) * 4;
        buffer[offset] = color[0];
        buffer[offset + 1] = color[1];
        buffer[offset + 2] = color[2];
        buffer[offset + 3] = color[3];
      }
    }
  }

  let image = sharp(buffer, { raw: { width: size, height: size, channels: 4 } });

  if (addMap && stationCoords) {
    const svgOverlay = Buffer.from(`
      <svg width="${size}" height="${size}">
        <rect x="0" y="0" width="${size}" height="${size}" fill="none" stroke="#141414" stroke-width="8"/>
        <circle cx="${center}" cy="${center}" r="20" fill="none" stroke="red" stroke-width="4"/>
        <line x1="${center-40}" y1="${center}" x2="${center+40}" y2="${center}" stroke="red" stroke-width="4"/>
        <line x1="${center}" y1="${center-40}" x2="${center}" y2="${center+40}" stroke="red" stroke-width="4"/>
        <text x="40" y="80" font-family="monospace" font-size="48" fill="#141414" font-weight="bold">NEXRAD LEVEL II - ${type.toUpperCase()}</text>
        <text x="40" y="140" font-family="monospace" font-size="36" fill="#141414">STATION: ${stationCoords[0].toFixed(4)}, ${stationCoords[1].toFixed(4)}</text>
      </svg>
    `);
    
    const background = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 228, g: 227, b: 224, alpha: 1 }
      }
    }).png().toBuffer();

    image = sharp(background)
      .composite([
        { input: buffer, raw: { width: size, height: size, channels: 4 } },
        { input: svgOverlay }
      ]);
  }

  return image.png().toBuffer();
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// API Routes
app.get('/api/radar/station', async (req, res) => {
  const { lat, lon, query } = req.query;
  
  try {
    // Check if query is a station ID
    if (query && typeof query === 'string' && query.length >= 3 && query.length <= 4) {
      const q = query.toUpperCase();
      const station = NEXRAD_STATIONS.find(s => s.icao === q || s.icao === `K${q}`);
      if (station) {
        return res.json({ 
          station: {
            id: station.icao,
            properties: { name: station.name, id: station.icao },
            geometry: { coordinates: [station.location.lon, station.location.lat] }
          },
          distance: 0 
        });
      }
    }

    if (!lat || !lon) return res.status(400).json({ error: 'Lat/Lon required' });
    const uLat = parseFloat(lat as string);
    const uLon = parseFloat(lon as string);

    // Fetch all stations to find the absolute nearest (including non-K)
    const stationsResponse = await axios.get('https://api.weather.gov/radar/stations', {
      headers: { 'User-Agent': 'NEXRAD-Radar-Pro/1.0' }
    });

    const stations = stationsResponse.data.features;
    let nearestStation = null;
    let minDistance = Infinity;

    for (const station of stations) {
      const [sLon, sLat] = station.geometry.coordinates;
      const dist = calculateDistance(uLat, uLon, sLat, sLon);
      if (dist < minDistance) {
        minDistance = dist;
        nearestStation = station;
      }
    }

    if (!nearestStation) throw new Error('No radar station found');

    res.json({ station: nearestStation, distance: minDistance });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/radar/process', async (req, res) => {
  const { stationId } = req.body;
  if (!stationId) return res.status(400).json({ error: 'Station ID required' });

  const stationIdUpper = stationId.toUpperCase();
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  
  const prefix = `${year}/${month}/${day}/${stationIdUpper}/`;
  const s3Url = `https://unidata-nexrad-level2.s3.amazonaws.com/?list-type=2&prefix=${prefix}`;

  try {
    console.log(`[DEBUG] Listing S3 files: ${s3Url}`);
    const listResponse = await axios.get(s3Url);
    const parser = new XMLParser();
    const xmlData = parser.parse(listResponse.data);
    
    let contents = xmlData.ListBucketResult.Contents;
    if (!contents) throw new Error('No files found for today');
    if (!Array.isArray(contents)) contents = [contents];

    // Filter and sort by key (timestamp is in filename)
    const files = contents
      .filter((f: any) => !f.Key.endsWith('_MDM'))
      .sort((a: any, b: any) => b.Key.localeCompare(a.Key));

    console.log(`[DEBUG] Found ${files.length} latest files`);

    const frames: any[] = [];
    let sLat: number, sLon: number, sName: string;
    
    try {
      const stationCoordsResponse = await axios.get(`https://api.weather.gov/radar/stations/${stationIdUpper}`, {
        headers: { 'User-Agent': 'NEXRAD-Radar-Pro/1.0' }
      });
      [sLon, sLat] = stationCoordsResponse.data.geometry.coordinates;
      sName = stationCoordsResponse.data.properties.name;
    } catch (err) {
      console.warn(`[WARN] Failed to fetch station from weather.gov, checking local list: ${stationIdUpper}`);
      const localStation = NEXRAD_STATIONS.find(s => s.icao === stationIdUpper);
      if (localStation) {
        sLat = localStation.location.lat;
        sLon = localStation.location.lon;
        sName = localStation.name;
      } else {
        throw new Error(`Station ${stationIdUpper} not found`);
      }
    }

    for (const file of files) {
      if (frames.length >= 10) break;

      const fileUrl = `https://unidata-nexrad-level2.s3.amazonaws.com/${file.Key}`;
      console.log(`[DEBUG] Downloading Level II file: ${fileUrl}`);
      
      const fileResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const nexradData = new Level2Radar(fileResponse.data);
      
      // Group elevations by rounded angle
      const elevations = nexradData.listElevations();
      const elevGroups = new Map<number, number[]>();
      
      for (const elevNum of elevations) {
        const radials = nexradData.data[elevNum];
        if (!radials || radials.length === 0) continue;
        const angle = Math.round(radials[0].record.elevation_angle * 10) / 10;
        if (!elevGroups.has(angle)) elevGroups.set(angle, []);
        elevGroups.get(angle)!.push(elevNum);
      }

      // Find the lowest angle that has all three data types
      let targetElevNums: number[] = [];
      let minElevAngle = 999;

      for (const [angle, elevNums] of Array.from(elevGroups.entries()).sort((a, b) => a[0] - b[0])) {
        let hasReflect = false;
        let hasVelocity = false;
        let hasSpectrum = false;

        for (const e of elevNums) {
          const rds = nexradData.data[e];
          if (!rds) continue;
          for (const r of rds) {
            if (r.record.reflect) hasReflect = true;
            if (r.record.velocity) hasVelocity = true;
            if (r.record.spectrum) hasSpectrum = true;
            if (hasReflect && hasVelocity && hasSpectrum) break;
          }
          if (hasReflect && hasVelocity && hasSpectrum) break;
        }

        if (hasReflect && hasVelocity && hasSpectrum) {
          minElevAngle = angle;
          targetElevNums = elevNums;
          break;
        }
      }

      if (targetElevNums.length === 0) {
        console.log(`[DEBUG] No elevation found with all three data types in file ${file.Key}. Skipping.`);
        continue;
      }

      console.log(`[DEBUG] Lowest elevation angle with all data: ${minElevAngle} deg (Elevations: ${targetElevNums.join(', ')})`);

      // We only need to process the merged radials once per file
      const allRadialsAtThisElev = [];
      for (const e of targetElevNums) {
        const rds = nexradData.data[e];
        if (rds) allRadialsAtThisElev.push(...rds.map((r: any) => r.record));
      }
      
      const firstRadial = allRadialsAtThisElev[0];
      const rangeKm = 250;
      
      const [refImg, velImg, swImg, refImgMap, velImgMap] = await Promise.all([
        generateRadarImage(allRadialsAtThisElev, 'reflect', 2048, rangeKm),
        generateRadarImage(allRadialsAtThisElev, 'velocity', 2048, rangeKm),
        generateRadarImage(allRadialsAtThisElev, 'spectrum', 2048, rangeKm),
        generateRadarImage(allRadialsAtThisElev, 'reflect', 2048, rangeKm, true, [sLat, sLon]),
        generateRadarImage(allRadialsAtThisElev, 'velocity', 2048, rangeKm, true, [sLat, sLon])
      ]);

      if (refImg) {
        const latDiff = rangeKm / 111.32;
        const lonDiff = rangeKm / (111.32 * Math.cos(deg2rad(sLat)));
        const bounds = [
          [sLat - latDiff, sLon - lonDiff],
          [sLat + latDiff, sLon + lonDiff]
        ];

        frames.push({
          reflectivity: `data:image/png;base64,${refImg.toString('base64')}`,
          velocity: velImg ? `data:image/png;base64,${velImg.toString('base64')}` : null,
          spectralWidth: swImg ? `data:image/png;base64,${swImg.toString('base64')}` : null,
          reflectivityMap: `data:image/png;base64,${refImgMap.toString('base64')}`,
          velocityMap: velImgMap ? `data:image/png;base64,${velImgMap.toString('base64')}` : null,
          bounds,
          elevation: minElevAngle,
          timestamp: new Date(nexradData.header.modified_julian_date * 86400000 + firstRadial.mseconds).getTime()
        });
      }
    }

    // Sort frames chronologically
    const sortedFrames = frames.sort((a, b) => a.timestamp - b.timestamp);

    res.json({
      frames: sortedFrames.map(f => ({ ...f, timestamp: new Date(f.timestamp).toISOString() })),
      stationId: stationIdUpper,
      stationName: sName,
      stationCoords: [sLat, sLon]
    });

  } catch (error: any) {
    console.error('[ERROR] Processing failed:', error.message);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
