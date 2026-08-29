/**
 * DEMO DATA source for hazard-model outputs.
 *
 * Each record is one hazard model's prediction for one geographic location
 * (classification + confidence). District/region risk is always CALCULATED
 * from these predictions (see `src/lib/risk-engine.ts`) — never hard-coded in
 * the UI. Replace `fetchHazardPredictions` with a real API/websocket feed that
 * returns the same `HazardPrediction[]` shape to move to live model output.
 *
 * DEMO LIVE DATA — not real emergency information.
 */

import { HAZARD_TYPES, RISK_CONFIG } from "@/lib/risk-config";
import type { HazardPrediction, HazardType, SafeLocation } from "./risk-types";
import { classifyConfidence } from "@/lib/risk-engine";

export interface DistrictSeed {
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  population: number;
  /** baseline model confidence per hazard (0..1) */
  propensity: Partial<Record<HazardType, number>>;
}

export const DISTRICT_SEEDS: DistrictSeed[] = [
  // Karnataka
  { state: "Karnataka", district: "Bengaluru Urban", latitude: 12.97, longitude: 77.59, population: 9621551, propensity: { flood: 0.82, erosion: 0.4, landslide: 0.15 } },
  { state: "Karnataka", district: "Kodagu", latitude: 12.42, longitude: 75.74, population: 554519, propensity: { landslide: 0.88, flood: 0.7, erosion: 0.62 } },
  { state: "Karnataka", district: "Uttara Kannada", latitude: 14.79, longitude: 74.69, population: 1437169, propensity: { landslide: 0.76, flood: 0.66, cyclone: 0.45, erosion: 0.58 } },
  { state: "Karnataka", district: "Chikkamagaluru", latitude: 13.32, longitude: 75.77, population: 1137961, propensity: { landslide: 0.74, erosion: 0.5 } },
  { state: "Karnataka", district: "Udupi", latitude: 13.34, longitude: 74.75, population: 1177361, propensity: { flood: 0.68, cyclone: 0.52, erosion: 0.6 } },
  { state: "Karnataka", district: "Dakshina Kannada", latitude: 12.87, longitude: 74.88, population: 2089649, propensity: { flood: 0.64, landslide: 0.58, cyclone: 0.4 } },
  { state: "Karnataka", district: "Mysuru", latitude: 12.3, longitude: 76.64, population: 3001127, propensity: { flood: 0.5, erosion: 0.35 } },
  { state: "Karnataka", district: "Kalaburagi", latitude: 17.33, longitude: 76.83, population: 2566326, propensity: { flood: 0.3, erosion: 0.3 } },

  // Uttarakhand
  { state: "Uttarakhand", district: "Chamoli", latitude: 30.41, longitude: 79.32, population: 391605, propensity: { landslide: 0.93, cloudburst: 0.86, flood: 0.8, erosion: 0.7 } },
  { state: "Uttarakhand", district: "Rudraprayag", latitude: 30.28, longitude: 78.98, population: 242285, propensity: { landslide: 0.86, cloudburst: 0.78, flood: 0.7 } },
  { state: "Uttarakhand", district: "Pauri Garhwal", latitude: 30.15, longitude: 78.78, population: 687271, propensity: { landslide: 0.8, erosion: 0.6, cloudburst: 0.55 } },
  { state: "Uttarakhand", district: "Uttarkashi", latitude: 30.73, longitude: 78.44, population: 330086, propensity: { cloudburst: 0.84, landslide: 0.78, flood: 0.62 } },
  { state: "Uttarakhand", district: "Nainital", latitude: 29.39, longitude: 79.45, population: 954605, propensity: { landslide: 0.7, flood: 0.6 } },
  { state: "Uttarakhand", district: "Almora", latitude: 29.6, longitude: 79.66, population: 622506, propensity: { landslide: 0.66, erosion: 0.5 } },
  { state: "Uttarakhand", district: "Dehradun", latitude: 30.32, longitude: 78.03, population: 1696694, propensity: { flood: 0.62, landslide: 0.5 } },

  // Kerala
  { state: "Kerala", district: "Wayanad", latitude: 11.69, longitude: 76.13, population: 817420, propensity: { landslide: 0.9, flood: 0.72, erosion: 0.6 } },
  { state: "Kerala", district: "Idukki", latitude: 9.85, longitude: 76.97, population: 1108974, propensity: { landslide: 0.86, flood: 0.74 } },
  { state: "Kerala", district: "Alappuzha", latitude: 9.5, longitude: 76.34, population: 2127789, propensity: { flood: 0.85, erosion: 0.66, cyclone: 0.45 } },
  { state: "Kerala", district: "Ernakulam", latitude: 9.93, longitude: 76.26, population: 3282388, propensity: { flood: 0.78, erosion: 0.5 } },
  { state: "Kerala", district: "Kozhikode", latitude: 11.25, longitude: 75.78, population: 3086293, propensity: { flood: 0.66, landslide: 0.55, erosion: 0.5 } },

  // Maharashtra
  { state: "Maharashtra", district: "Mumbai Suburban", latitude: 19.13, longitude: 72.89, population: 9356962, propensity: { flood: 0.9, cyclone: 0.5, landslide: 0.4 } },
  { state: "Maharashtra", district: "Raigad", latitude: 18.52, longitude: 73.18, population: 2634200, propensity: { landslide: 0.78, cyclone: 0.6, flood: 0.6 } },
  { state: "Maharashtra", district: "Ratnagiri", latitude: 16.99, longitude: 73.31, population: 1615069, propensity: { flood: 0.66, cyclone: 0.62, erosion: 0.55 } },
  { state: "Maharashtra", district: "Kolhapur", latitude: 16.7, longitude: 74.24, population: 3876001, propensity: { flood: 0.8, landslide: 0.45 } },
  { state: "Maharashtra", district: "Pune", latitude: 18.52, longitude: 73.86, population: 9429408, propensity: { flood: 0.62, landslide: 0.48 } },
  { state: "Maharashtra", district: "Nagpur", latitude: 21.15, longitude: 79.09, population: 4653570, propensity: { flood: 0.4 } },

  // Himachal Pradesh
  { state: "Himachal Pradesh", district: "Kullu", latitude: 31.96, longitude: 77.11, population: 437903, propensity: { landslide: 0.9, cloudburst: 0.8, flood: 0.68 } },
  { state: "Himachal Pradesh", district: "Mandi", latitude: 31.71, longitude: 76.93, population: 999777, propensity: { landslide: 0.85, flood: 0.7, cloudburst: 0.66 } },
  { state: "Himachal Pradesh", district: "Shimla", latitude: 31.1, longitude: 77.17, population: 814010, propensity: { landslide: 0.8, cloudburst: 0.58 } },
  { state: "Himachal Pradesh", district: "Kinnaur", latitude: 31.58, longitude: 78.44, population: 84121, propensity: { landslide: 0.82, cloudburst: 0.7 } },

  // Assam
  { state: "Assam", district: "Dhemaji", latitude: 27.48, longitude: 94.58, population: 686133, propensity: { flood: 0.92, erosion: 0.8 } },
  { state: "Assam", district: "Barpeta", latitude: 26.32, longitude: 91.0, population: 1693622, propensity: { flood: 0.88, erosion: 0.74 } },
  { state: "Assam", district: "Kamrup Metropolitan", latitude: 26.14, longitude: 91.74, population: 1253938, propensity: { flood: 0.78, landslide: 0.5 } },
  { state: "Assam", district: "Dibrugarh", latitude: 27.47, longitude: 94.91, population: 1326335, propensity: { flood: 0.8, erosion: 0.7 } },

  // Bihar
  { state: "Bihar", district: "Araria", latitude: 26.15, longitude: 87.52, population: 2811569, propensity: { flood: 0.88, erosion: 0.6 } },
  { state: "Bihar", district: "Darbhanga", latitude: 26.15, longitude: 85.9, population: 3937385, propensity: { flood: 0.84, erosion: 0.55 } },
  { state: "Bihar", district: "Muzaffarpur", latitude: 26.12, longitude: 85.39, population: 4801062, propensity: { flood: 0.8 } },
  { state: "Bihar", district: "Patna", latitude: 25.59, longitude: 85.14, population: 5838465, propensity: { flood: 0.7 } },

  // Odisha
  { state: "Odisha", district: "Puri", latitude: 19.81, longitude: 85.83, population: 1698730, propensity: { cyclone: 0.9, flood: 0.7, erosion: 0.72 } },
  { state: "Odisha", district: "Kendrapara", latitude: 20.5, longitude: 86.42, population: 1440361, propensity: { cyclone: 0.86, flood: 0.74, erosion: 0.68 } },
  { state: "Odisha", district: "Balasore", latitude: 21.49, longitude: 86.93, population: 2320529, propensity: { cyclone: 0.8, flood: 0.68 } },
  { state: "Odisha", district: "Sambalpur", latitude: 21.47, longitude: 83.97, population: 1041099, propensity: { flood: 0.5 } },

  // West Bengal
  { state: "West Bengal", district: "South 24 Parganas", latitude: 22.16, longitude: 88.43, population: 8161961, propensity: { cyclone: 0.88, flood: 0.8, erosion: 0.7 } },
  { state: "West Bengal", district: "Kolkata", latitude: 22.57, longitude: 88.36, population: 4496694, propensity: { flood: 0.76, cyclone: 0.6 } },
  { state: "West Bengal", district: "Darjeeling", latitude: 27.04, longitude: 88.26, population: 1846823, propensity: { landslide: 0.86, cloudburst: 0.6 } },
  { state: "West Bengal", district: "Jalpaiguri", latitude: 26.52, longitude: 88.72, population: 3872846, propensity: { flood: 0.72, erosion: 0.55 } },

  // Tamil Nadu
  { state: "Tamil Nadu", district: "Chennai", latitude: 13.08, longitude: 80.27, population: 7088000, propensity: { flood: 0.86, cyclone: 0.7 } },
  { state: "Tamil Nadu", district: "Cuddalore", latitude: 11.75, longitude: 79.77, population: 2605914, propensity: { cyclone: 0.78, flood: 0.68, erosion: 0.6 } },
  { state: "Tamil Nadu", district: "The Nilgiris", latitude: 11.41, longitude: 76.7, population: 735394, propensity: { landslide: 0.84, erosion: 0.6 } },
  { state: "Tamil Nadu", district: "Madurai", latitude: 9.93, longitude: 78.12, population: 3038252, propensity: { flood: 0.4 } },

  // Andhra Pradesh / Telangana
  { state: "Andhra Pradesh", district: "Visakhapatnam", latitude: 17.69, longitude: 83.22, population: 4290589, propensity: { cyclone: 0.84, landslide: 0.5, erosion: 0.6 } },
  { state: "Andhra Pradesh", district: "Krishna", latitude: 16.51, longitude: 80.65, population: 4517398, propensity: { flood: 0.72, cyclone: 0.66 } },
  { state: "Telangana", district: "Hyderabad", latitude: 17.39, longitude: 78.49, population: 6809970, propensity: { flood: 0.78 } },
  { state: "Telangana", district: "Warangal", latitude: 17.98, longitude: 79.59, population: 1135707, propensity: { flood: 0.55 } },

  // West / Central / North India
  { state: "Gujarat", district: "Surat", latitude: 21.17, longitude: 72.83, population: 6081322, propensity: { flood: 0.8, cyclone: 0.55 } },
  { state: "Gujarat", district: "Kachchh", latitude: 23.24, longitude: 69.67, population: 2092371, propensity: { cyclone: 0.7, erosion: 0.5 } },
  { state: "Rajasthan", district: "Jaipur", latitude: 26.91, longitude: 75.79, population: 6626178, propensity: { flood: 0.45, erosion: 0.3 } },
  { state: "Rajasthan", district: "Jaisalmer", latitude: 26.92, longitude: 70.91, population: 669919, propensity: { erosion: 0.3 } },
  { state: "Madhya Pradesh", district: "Bhopal", latitude: 23.26, longitude: 77.41, population: 2371061, propensity: { flood: 0.55 } },
  { state: "Madhya Pradesh", district: "Jabalpur", latitude: 23.18, longitude: 79.99, population: 2463289, propensity: { flood: 0.52 } },
  { state: "Uttar Pradesh", district: "Gorakhpur", latitude: 26.76, longitude: 83.37, population: 4440895, propensity: { flood: 0.84, erosion: 0.55 } },
  { state: "Uttar Pradesh", district: "Ballia", latitude: 25.76, longitude: 84.15, population: 3239774, propensity: { flood: 0.8, erosion: 0.7 } },
  { state: "Uttar Pradesh", district: "Lucknow", latitude: 26.85, longitude: 80.95, population: 4589838, propensity: { flood: 0.6 } },

  // Himalaya / North East / others
  { state: "Jammu and Kashmir", district: "Ramban", latitude: 33.24, longitude: 75.24, population: 283713, propensity: { landslide: 0.86, cloudburst: 0.6 } },
  { state: "Jammu and Kashmir", district: "Srinagar", latitude: 34.08, longitude: 74.8, population: 1236829, propensity: { flood: 0.66, landslide: 0.4 } },
  { state: "Ladakh", district: "Leh", latitude: 34.15, longitude: 77.58, population: 133487, propensity: { cloudburst: 0.7, landslide: 0.5 } },
  { state: "Sikkim", district: "East Sikkim", latitude: 27.33, longitude: 88.61, population: 283583, propensity: { landslide: 0.84, cloudburst: 0.7, flood: 0.6 } },
  { state: "Meghalaya", district: "East Khasi Hills", latitude: 25.28, longitude: 91.72, population: 825922, propensity: { landslide: 0.8, cloudburst: 0.72 } },
  { state: "Arunachal Pradesh", district: "Papum Pare", latitude: 27.1, longitude: 93.62, population: 176573, propensity: { landslide: 0.78, flood: 0.6 } },
  { state: "Mizoram", district: "Aizawl", latitude: 23.73, longitude: 92.72, population: 400309, propensity: { landslide: 0.76 } },
  { state: "Nagaland", district: "Kohima", latitude: 25.67, longitude: 94.11, population: 267988, propensity: { landslide: 0.7 } },
  { state: "Manipur", district: "Imphal West", latitude: 24.82, longitude: 93.94, population: 517992, propensity: { flood: 0.6, landslide: 0.5 } },
  { state: "Tripura", district: "West Tripura", latitude: 23.83, longitude: 91.28, population: 918000, propensity: { flood: 0.64 } },
  { state: "Goa", district: "North Goa", latitude: 15.6, longitude: 73.83, population: 818008, propensity: { flood: 0.6, erosion: 0.55, cyclone: 0.4 } },
  { state: "Jharkhand", district: "Ranchi", latitude: 23.34, longitude: 85.31, population: 2914253, propensity: { flood: 0.5 } },
  { state: "Chhattisgarh", district: "Raipur", latitude: 21.25, longitude: 81.63, population: 2160876, propensity: { flood: 0.5 } },
  { state: "Punjab", district: "Ludhiana", latitude: 30.9, longitude: 75.86, population: 3498739, propensity: { flood: 0.55 } },
  { state: "Haryana", district: "Gurugram", latitude: 28.46, longitude: 77.03, population: 1514432, propensity: { flood: 0.66 } },
  { state: "Delhi", district: "New Delhi", latitude: 28.61, longitude: 77.21, population: 16787941, propensity: { flood: 0.7 } },
  { state: "Puducherry", district: "Puducherry", latitude: 11.94, longitude: 79.83, population: 950289, propensity: { cyclone: 0.66, flood: 0.55, erosion: 0.5 } },
];

/** deterministic pseudo-random so demo locations stay put between refreshes */
function seeded(seed: string, index: number): number {
  let h = 2166136261 ^ index;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

interface Site {
  id: string;
  seed: DistrictSeed;
  hazardType: HazardType;
  latitude: number;
  longitude: number;
  baseline: number;
}

let sites: Site[] | null = null;

function buildSites(): Site[] {
  if (sites) return sites;
  const built: Site[] = [];
  for (const seed of DISTRICT_SEEDS) {
    for (const hazardType of HAZARD_TYPES) {
      const baseline = seed.propensity[hazardType] ?? 0.12;
      const count = Math.max(3, Math.round(baseline * 22));
      for (let i = 0; i < count; i += 1) {
        const key = `${seed.district}-${hazardType}`;
        const r1 = seeded(key, i * 3 + 1);
        const r2 = seeded(key, i * 3 + 2);
        const r3 = seeded(key, i * 3 + 3);
        built.push({
          id: `${key}-${i}`.toLowerCase().replace(/\s+/g, "-"),
          seed,
          hazardType,
          latitude: seed.latitude + (r1 - 0.5) * 0.5,
          longitude: seed.longitude + (r2 - 0.5) * 0.5,
          baseline: Math.max(0.02, Math.min(0.99, baseline + (r3 - 0.5) * 0.3)),
        });
      }
    }
  }
  sites = built;
  return built;
}

/** per-site drift so demo updates feel continuous rather than random noise */
const drift = new Map<string, number>();

function nextConfidence(site: Site): number {
  const previous = drift.get(site.id) ?? site.baseline;
  const pull = (site.baseline - previous) * 0.3;
  const noise = (Math.random() - 0.5) * 0.1;
  const next = Math.max(0.01, Math.min(0.99, previous + pull + noise));
  drift.set(site.id, next);
  return Math.round(next * 100) / 100;
}

/** hazards that carry a "time to event" style forecast */
const TIMED_HAZARDS: HazardType[] = ["flood", "cloudburst", "cyclone"];

/**
 * DEMO LIVE DATA — a fresh snapshot of hazard model outputs.
 * Swap for a real model/API feed returning the same shape.
 */
export function fetchHazardPredictions(): HazardPrediction[] {
  const now = Date.now();
  const timestamp = new Date(now).toISOString();

  return buildSites().map((site) => {
    const confidenceScore = nextConfidence(site);
    const { severity, color } = classifyConfidence(confidenceScore);
    const classification: 0 | 1 =
      confidenceScore >= RISK_CONFIG.classificationThreshold ? 1 : 0;

    const timed = TIMED_HAZARDS.includes(site.hazardType) && classification === 1;
    // higher confidence => nearer forecast event time
    const minutesAhead = Math.round(30 + (1 - confidenceScore) * 900);

    return {
      id: site.id,
      latitude: site.latitude,
      longitude: site.longitude,
      state: site.seed.state,
      district: site.seed.district,
      hazardType: site.hazardType,
      classification,
      confidenceScore,
      severity,
      color,
      timestamp,
      predictedEventTime: timed
        ? new Date(now + minutesAhead * 60_000).toISOString()
        : undefined,
    } satisfies HazardPrediction;
  });
}

/** DEMO safe shelters per district — future Carrying Capacity Studio source. */
export function getSafeLocations(district: string): SafeLocation[] {
  const seed = DISTRICT_SEEDS.find((s) => s.district === district);
  if (!seed) return [];
  const names = ["Safe Point A", "Safe Point B", "Safe Point C"];
  return names.map((name, i) => {
    const r1 = seeded(`${district}-safe`, i * 2 + 1);
    const r2 = seeded(`${district}-safe`, i * 2 + 2);
    const capacity = Math.round(3000 + r1 * 14000);
    const currentOccupancy = Math.round(capacity * (0.25 + r2 * 0.55));
    return {
      id: `${district}-safe-${i}`.toLowerCase().replace(/\s+/g, "-"),
      name,
      state: seed.state,
      district,
      latitude: seed.latitude + (r1 - 0.5) * 0.2,
      longitude: seed.longitude + (r2 - 0.5) * 0.2,
      capacity,
      currentOccupancy,
      availableCapacity: capacity - currentOccupancy,
      distanceKm: Math.round((1.5 + i * 1.4 + r1 * 1.6) * 10) / 10,
    } satisfies SafeLocation;
  });
}
