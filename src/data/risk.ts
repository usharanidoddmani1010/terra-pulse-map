/**
 * DEMO DATA source for disaster risk locations.
 *
 * Every record is a single identified risk LOCATION. District red-zone counts
 * are always CALCULATED from these records (see `src/lib/risk.ts`) — never
 * hard-coded in the UI. Replace `fetchRiskRecords` with a real API call that
 * returns the same `RiskRecord[]` shape to move to live data.
 */

export type HazardType =
  | "flood"
  | "landslide"
  | "cloudburst"
  | "cyclone"
  | "urban-flooding"
  | "drought";

export type Severity = "low" | "moderate" | "high" | "critical";

export interface RiskRecord {
  id: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  hazardType: HazardType;
  /** 0-100 */
  riskScore: number;
  severity: Severity;
  /** ISO timestamp */
  timestamp: string;
}

/** A location counts as a RED ZONE at/above this risk score. Configurable. */
export const RED_ZONE_SCORE_THRESHOLD = 70;

/** Red-zone count -> district priority. Configurable thresholds. */
export const PRIORITY_THRESHOLDS = [
  { level: "CRITICAL", min: 31, color: "#dc2626", dot: "🔴" },
  { level: "HIGH", min: 16, color: "#ef4444", dot: "🔴" },
  { level: "MEDIUM", min: 6, color: "#f97316", dot: "🟠" },
  { level: "LOWER", min: 0, color: "#facc15", dot: "🟡" },
] as const;

export type PriorityLevel = (typeof PRIORITY_THRESHOLDS)[number]["level"];

interface DistrictSeed {
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  /** demo number of red zones for this district */
  redZones: number;
  hazards: HazardType[];
}

const DISTRICT_SEEDS: DistrictSeed[] = [
  // Karnataka
  { state: "Karnataka", district: "Bengaluru Urban", latitude: 12.97, longitude: 77.59, redZones: 24, hazards: ["urban-flooding", "flood"] },
  { state: "Karnataka", district: "Kodagu", latitude: 12.42, longitude: 75.74, redZones: 18, hazards: ["landslide", "flood"] },
  { state: "Karnataka", district: "Uttara Kannada", latitude: 14.79, longitude: 74.69, redZones: 15, hazards: ["landslide", "flood"] },
  { state: "Karnataka", district: "Chikkamagaluru", latitude: 13.32, longitude: 75.77, redZones: 12, hazards: ["landslide"] },
  { state: "Karnataka", district: "Udupi", latitude: 13.34, longitude: 74.75, redZones: 10, hazards: ["flood", "cyclone"] },
  { state: "Karnataka", district: "Mysuru", latitude: 12.3, longitude: 76.64, redZones: 7, hazards: ["flood"] },
  { state: "Karnataka", district: "Dakshina Kannada", latitude: 12.87, longitude: 74.88, redZones: 9, hazards: ["flood", "landslide"] },
  { state: "Karnataka", district: "Kalaburagi", latitude: 17.33, longitude: 76.83, redZones: 4, hazards: ["drought"] },

  // Uttarakhand
  { state: "Uttarakhand", district: "Chamoli", latitude: 30.41, longitude: 79.32, redZones: 33, hazards: ["landslide", "cloudburst"] },
  { state: "Uttarakhand", district: "Rudraprayag", latitude: 30.28, longitude: 78.98, redZones: 21, hazards: ["landslide", "cloudburst"] },
  { state: "Uttarakhand", district: "Pauri Garhwal", latitude: 30.15, longitude: 78.78, redZones: 19, hazards: ["landslide"] },
  { state: "Uttarakhand", district: "Almora", latitude: 29.6, longitude: 79.66, redZones: 11, hazards: ["landslide"] },
  { state: "Uttarakhand", district: "Nainital", latitude: 29.39, longitude: 79.45, redZones: 14, hazards: ["landslide", "flood"] },
  { state: "Uttarakhand", district: "Dehradun", latitude: 30.32, longitude: 78.03, redZones: 8, hazards: ["flood", "urban-flooding"] },
  { state: "Uttarakhand", district: "Uttarkashi", latitude: 30.73, longitude: 78.44, redZones: 17, hazards: ["cloudburst", "landslide"] },

  // Kerala
  { state: "Kerala", district: "Wayanad", latitude: 11.69, longitude: 76.13, redZones: 26, hazards: ["landslide"] },
  { state: "Kerala", district: "Idukki", latitude: 9.85, longitude: 76.97, redZones: 22, hazards: ["landslide", "flood"] },
  { state: "Kerala", district: "Ernakulam", latitude: 9.93, longitude: 76.26, redZones: 13, hazards: ["flood", "urban-flooding"] },
  { state: "Kerala", district: "Alappuzha", latitude: 9.5, longitude: 76.34, redZones: 16, hazards: ["flood"] },
  { state: "Kerala", district: "Kozhikode", latitude: 11.25, longitude: 75.78, redZones: 9, hazards: ["flood", "landslide"] },

  // Maharashtra
  { state: "Maharashtra", district: "Mumbai Suburban", latitude: 19.13, longitude: 72.89, redZones: 29, hazards: ["urban-flooding", "flood"] },
  { state: "Maharashtra", district: "Raigad", latitude: 18.52, longitude: 73.18, redZones: 18, hazards: ["landslide", "cyclone"] },
  { state: "Maharashtra", district: "Ratnagiri", latitude: 16.99, longitude: 73.31, redZones: 14, hazards: ["flood", "cyclone"] },
  { state: "Maharashtra", district: "Pune", latitude: 18.52, longitude: 73.86, redZones: 11, hazards: ["flood", "landslide"] },
  { state: "Maharashtra", district: "Kolhapur", latitude: 16.7, longitude: 74.24, redZones: 15, hazards: ["flood"] },
  { state: "Maharashtra", district: "Nagpur", latitude: 21.15, longitude: 79.09, redZones: 5, hazards: ["urban-flooding"] },

  // Himachal Pradesh
  { state: "Himachal Pradesh", district: "Kullu", latitude: 31.96, longitude: 77.11, redZones: 27, hazards: ["landslide", "cloudburst"] },
  { state: "Himachal Pradesh", district: "Shimla", latitude: 31.1, longitude: 77.17, redZones: 20, hazards: ["landslide"] },
  { state: "Himachal Pradesh", district: "Mandi", latitude: 31.71, longitude: 76.93, redZones: 23, hazards: ["landslide", "flood"] },
  { state: "Himachal Pradesh", district: "Kinnaur", latitude: 31.58, longitude: 78.44, redZones: 12, hazards: ["landslide"] },

  // Assam
  { state: "Assam", district: "Kamrup Metropolitan", latitude: 26.14, longitude: 91.74, redZones: 17, hazards: ["urban-flooding", "flood"] },
  { state: "Assam", district: "Dhemaji", latitude: 27.48, longitude: 94.58, redZones: 25, hazards: ["flood"] },
  { state: "Assam", district: "Barpeta", latitude: 26.32, longitude: 91.0, redZones: 19, hazards: ["flood"] },
  { state: "Assam", district: "Dibrugarh", latitude: 27.47, longitude: 94.91, redZones: 13, hazards: ["flood"] },

  // Bihar
  { state: "Bihar", district: "Araria", latitude: 26.15, longitude: 87.52, redZones: 21, hazards: ["flood"] },
  { state: "Bihar", district: "Muzaffarpur", latitude: 26.12, longitude: 85.39, redZones: 16, hazards: ["flood"] },
  { state: "Bihar", district: "Patna", latitude: 25.59, longitude: 85.14, redZones: 12, hazards: ["urban-flooding", "flood"] },
  { state: "Bihar", district: "Darbhanga", latitude: 26.15, longitude: 85.9, redZones: 18, hazards: ["flood"] },

  // Odisha
  { state: "Odisha", district: "Puri", latitude: 19.81, longitude: 85.83, redZones: 20, hazards: ["cyclone", "flood"] },
  { state: "Odisha", district: "Kendrapara", latitude: 20.5, longitude: 86.42, redZones: 17, hazards: ["cyclone"] },
  { state: "Odisha", district: "Balasore", latitude: 21.49, longitude: 86.93, redZones: 14, hazards: ["cyclone", "flood"] },
  { state: "Odisha", district: "Sambalpur", latitude: 21.47, longitude: 83.97, redZones: 6, hazards: ["flood"] },

  // West Bengal
  { state: "West Bengal", district: "South 24 Parganas", latitude: 22.16, longitude: 88.43, redZones: 24, hazards: ["cyclone", "flood"] },
  { state: "West Bengal", district: "Darjeeling", latitude: 27.04, longitude: 88.26, redZones: 18, hazards: ["landslide"] },
  { state: "West Bengal", district: "Kolkata", latitude: 22.57, longitude: 88.36, redZones: 15, hazards: ["urban-flooding"] },
  { state: "West Bengal", district: "Jalpaiguri", latitude: 26.52, longitude: 88.72, redZones: 11, hazards: ["flood"] },

  // Tamil Nadu
  { state: "Tamil Nadu", district: "Chennai", latitude: 13.08, longitude: 80.27, redZones: 22, hazards: ["urban-flooding", "cyclone"] },
  { state: "Tamil Nadu", district: "The Nilgiris", latitude: 11.41, longitude: 76.7, redZones: 16, hazards: ["landslide"] },
  { state: "Tamil Nadu", district: "Cuddalore", latitude: 11.75, longitude: 79.77, redZones: 13, hazards: ["cyclone", "flood"] },
  { state: "Tamil Nadu", district: "Madurai", latitude: 9.93, longitude: 78.12, redZones: 5, hazards: ["drought"] },

  // Andhra Pradesh / Telangana
  { state: "Andhra Pradesh", district: "Visakhapatnam", latitude: 17.69, longitude: 83.22, redZones: 18, hazards: ["cyclone", "landslide"] },
  { state: "Andhra Pradesh", district: "Krishna", latitude: 16.51, longitude: 80.65, redZones: 12, hazards: ["flood", "cyclone"] },
  { state: "Telangana", district: "Hyderabad", latitude: 17.39, longitude: 78.49, redZones: 19, hazards: ["urban-flooding"] },
  { state: "Telangana", district: "Warangal", latitude: 17.98, longitude: 79.59, redZones: 8, hazards: ["flood"] },

  // Gujarat / Rajasthan / MP / UP
  { state: "Gujarat", district: "Surat", latitude: 21.17, longitude: 72.83, redZones: 17, hazards: ["flood", "urban-flooding"] },
  { state: "Gujarat", district: "Kachchh", latitude: 23.24, longitude: 69.67, redZones: 9, hazards: ["cyclone", "drought"] },
  { state: "Rajasthan", district: "Jaisalmer", latitude: 26.92, longitude: 70.91, redZones: 3, hazards: ["drought"] },
  { state: "Rajasthan", district: "Jaipur", latitude: 26.91, longitude: 75.79, redZones: 7, hazards: ["urban-flooding", "drought"] },
  { state: "Madhya Pradesh", district: "Bhopal", latitude: 23.26, longitude: 77.41, redZones: 10, hazards: ["urban-flooding"] },
  { state: "Madhya Pradesh", district: "Jabalpur", latitude: 23.18, longitude: 79.99, redZones: 8, hazards: ["flood"] },
  { state: "Uttar Pradesh", district: "Gorakhpur", latitude: 26.76, longitude: 83.37, redZones: 20, hazards: ["flood"] },
  { state: "Uttar Pradesh", district: "Lucknow", latitude: 26.85, longitude: 80.95, redZones: 11, hazards: ["urban-flooding"] },
  { state: "Uttar Pradesh", district: "Ballia", latitude: 25.76, longitude: 84.15, redZones: 15, hazards: ["flood"] },

  // Others
  { state: "Jammu and Kashmir", district: "Srinagar", latitude: 34.08, longitude: 74.8, redZones: 12, hazards: ["flood"] },
  { state: "Jammu and Kashmir", district: "Ramban", latitude: 33.24, longitude: 75.24, redZones: 16, hazards: ["landslide"] },
  { state: "Sikkim", district: "East Sikkim", latitude: 27.33, longitude: 88.61, redZones: 14, hazards: ["landslide", "cloudburst"] },
  { state: "Meghalaya", district: "East Khasi Hills", latitude: 25.28, longitude: 91.72, redZones: 13, hazards: ["landslide"] },
  { state: "Goa", district: "North Goa", latitude: 15.6, longitude: 73.83, redZones: 6, hazards: ["flood"] },
  { state: "Jharkhand", district: "Ranchi", latitude: 23.34, longitude: 85.31, redZones: 7, hazards: ["flood"] },
  { state: "Chhattisgarh", district: "Raipur", latitude: 21.25, longitude: 81.63, redZones: 6, hazards: ["flood"] },
  { state: "Punjab", district: "Ludhiana", latitude: 30.9, longitude: 75.86, redZones: 5, hazards: ["flood"] },
  { state: "Haryana", district: "Gurugram", latitude: 28.46, longitude: 77.03, redZones: 9, hazards: ["urban-flooding"] },
  { state: "Delhi", district: "New Delhi", latitude: 28.61, longitude: 77.21, redZones: 13, hazards: ["urban-flooding"] },
  { state: "Arunachal Pradesh", district: "Papum Pare", latitude: 27.1, longitude: 93.62, redZones: 12, hazards: ["landslide", "flood"] },
  { state: "Mizoram", district: "Aizawl", latitude: 23.73, longitude: 92.72, redZones: 10, hazards: ["landslide"] },
  { state: "Manipur", district: "Imphal West", latitude: 24.82, longitude: 93.94, redZones: 6, hazards: ["flood"] },
  { state: "Nagaland", district: "Kohima", latitude: 25.67, longitude: 94.11, redZones: 8, hazards: ["landslide"] },
  { state: "Tripura", district: "West Tripura", latitude: 23.83, longitude: 91.28, redZones: 7, hazards: ["flood"] },
  { state: "Ladakh", district: "Leh", latitude: 34.15, longitude: 77.58, redZones: 4, hazards: ["cloudburst"] },
  { state: "Puducherry", district: "Puducherry", latitude: 11.94, longitude: 79.83, redZones: 5, hazards: ["cyclone"] },
];

export function severityFromScore(score: number): Severity {
  if (score >= 85) return "critical";
  if (score >= RED_ZONE_SCORE_THRESHOLD) return "high";
  if (score >= 45) return "moderate";
  return "low";
}

/** deterministic pseudo-random so locations stay put between refreshes */
function seeded(seed: string, index: number): number {
  let h = 2166136261 ^ index;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

let cache: RiskRecord[] | null = null;

/**
 * DEMO DATA — individual risk locations across India.
 * Swap this implementation for a real API call when available.
 */
export function fetchRiskRecords(): RiskRecord[] {
  if (cache) return cache;
  const timestamp = new Date().toISOString();
  const records: RiskRecord[] = [];

  for (const seed of DISTRICT_SEEDS) {
    // red zones (score >= threshold) + a tail of lower-risk locations
    const total = seed.redZones + 4 + Math.round(seeded(seed.district, 99) * 6);
    for (let i = 0; i < total; i += 1) {
      const isRed = i < seed.redZones;
      const r1 = seeded(seed.district, i * 3 + 1);
      const r2 = seeded(seed.district, i * 3 + 2);
      const r3 = seeded(seed.district, i * 3 + 3);
      const score = isRed
        ? RED_ZONE_SCORE_THRESHOLD + Math.round(r3 * (100 - RED_ZONE_SCORE_THRESHOLD))
        : Math.round(20 + r3 * (RED_ZONE_SCORE_THRESHOLD - 21));
      records.push({
        id: `${seed.district}-${i}`.toLowerCase().replace(/\s+/g, "-"),
        state: seed.state,
        district: seed.district,
        latitude: seed.latitude + (r1 - 0.5) * 0.42,
        longitude: seed.longitude + (r2 - 0.5) * 0.42,
        hazardType: seed.hazards[i % seed.hazards.length],
        riskScore: score,
        severity: severityFromScore(score),
        timestamp,
      });
    }
  }

  cache = records;
  return records;
}
