/**
 * DEMO DATA source for rainfall observations.
 *
 * This module is intentionally decoupled from the map UI. To move to a real
 * rainfall/weather API, replace `fetchRainfallObservations` with a network
 * call that returns the same `RainfallObservation[]` shape.
 */

export interface RainfallObservation {
  id: string;
  latitude: number;
  longitude: number;
  /** millimetres of rainfall in the observation window */
  rainfallAmount: number;
  state: string;
  district: string;
  /** ISO timestamp */
  timestamp: string;
}

/** mm thresholds used for intensity ramping and the legend */
export const RAINFALL_MAX_MM = 120;

interface Station {
  id: string;
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  /** typical rainfall for this station, mm */
  baseline: number;
}

const STATIONS: Station[] = [
  { id: "kar-udupi", latitude: 13.34, longitude: 74.75, state: "Karnataka", district: "Udupi", baseline: 88 },
  { id: "kar-kodagu", latitude: 12.42, longitude: 75.74, state: "Karnataka", district: "Kodagu", baseline: 76 },
  { id: "kar-chikkamagaluru", latitude: 13.32, longitude: 75.77, state: "Karnataka", district: "Chikkamagaluru", baseline: 64 },
  { id: "kar-bengaluru", latitude: 12.97, longitude: 77.59, state: "Karnataka", district: "Bengaluru Urban", baseline: 22 },
  { id: "kar-kalaburagi", latitude: 17.33, longitude: 76.83, state: "Karnataka", district: "Kalaburagi", baseline: 12 },
  { id: "ker-wayanad", latitude: 11.69, longitude: 76.13, state: "Kerala", district: "Wayanad", baseline: 95 },
  { id: "ker-idukki", latitude: 9.85, longitude: 76.97, state: "Kerala", district: "Idukki", baseline: 90 },
  { id: "ker-kochi", latitude: 9.93, longitude: 76.26, state: "Kerala", district: "Ernakulam", baseline: 70 },
  { id: "goa-north", latitude: 15.6, longitude: 73.83, state: "Goa", district: "North Goa", baseline: 74 },
  { id: "mah-mumbai", latitude: 19.08, longitude: 72.88, state: "Maharashtra", district: "Mumbai Suburban", baseline: 82 },
  { id: "mah-ratnagiri", latitude: 16.99, longitude: 73.31, state: "Maharashtra", district: "Ratnagiri", baseline: 86 },
  { id: "mah-pune", latitude: 18.52, longitude: 73.86, state: "Maharashtra", district: "Pune", baseline: 40 },
  { id: "mah-nagpur", latitude: 21.15, longitude: 79.09, state: "Maharashtra", district: "Nagpur", baseline: 26 },
  { id: "guj-surat", latitude: 21.17, longitude: 72.83, state: "Gujarat", district: "Surat", baseline: 44 },
  { id: "guj-kutch", latitude: 23.24, longitude: 69.67, state: "Gujarat", district: "Kachchh", baseline: 8 },
  { id: "raj-jaisalmer", latitude: 26.92, longitude: 70.91, state: "Rajasthan", district: "Jaisalmer", baseline: 4 },
  { id: "raj-jaipur", latitude: 26.91, longitude: 75.79, state: "Rajasthan", district: "Jaipur", baseline: 14 },
  { id: "raj-udaipur", latitude: 24.58, longitude: 73.71, state: "Rajasthan", district: "Udaipur", baseline: 20 },
  { id: "mp-bhopal", latitude: 23.26, longitude: 77.41, state: "Madhya Pradesh", district: "Bhopal", baseline: 30 },
  { id: "mp-jabalpur", latitude: 23.18, longitude: 79.99, state: "Madhya Pradesh", district: "Jabalpur", baseline: 34 },
  { id: "cg-raipur", latitude: 21.25, longitude: 81.63, state: "Chhattisgarh", district: "Raipur", baseline: 32 },
  { id: "up-lucknow", latitude: 26.85, longitude: 80.95, state: "Uttar Pradesh", district: "Lucknow", baseline: 24 },
  { id: "up-gorakhpur", latitude: 26.76, longitude: 83.37, state: "Uttar Pradesh", district: "Gorakhpur", baseline: 38 },
  { id: "utt-chamoli", latitude: 30.41, longitude: 79.32, state: "Uttarakhand", district: "Chamoli", baseline: 66 },
  { id: "utt-nainital", latitude: 29.39, longitude: 79.45, state: "Uttarakhand", district: "Nainital", baseline: 72 },
  { id: "utt-dehradun", latitude: 30.32, longitude: 78.03, state: "Uttarakhand", district: "Dehradun", baseline: 58 },
  { id: "hp-shimla", latitude: 31.1, longitude: 77.17, state: "Himachal Pradesh", district: "Shimla", baseline: 54 },
  { id: "hp-kullu", latitude: 31.96, longitude: 77.11, state: "Himachal Pradesh", district: "Kullu", baseline: 50 },
  { id: "jk-srinagar", latitude: 34.08, longitude: 74.8, state: "Jammu and Kashmir", district: "Srinagar", baseline: 18 },
  { id: "lad-leh", latitude: 34.15, longitude: 77.58, state: "Ladakh", district: "Leh", baseline: 3 },
  { id: "pun-ludhiana", latitude: 30.9, longitude: 75.86, state: "Punjab", district: "Ludhiana", baseline: 16 },
  { id: "hry-gurugram", latitude: 28.46, longitude: 77.03, state: "Haryana", district: "Gurugram", baseline: 15 },
  { id: "del-newdelhi", latitude: 28.61, longitude: 77.21, state: "Delhi", district: "New Delhi", baseline: 18 },
  { id: "bih-patna", latitude: 25.59, longitude: 85.14, state: "Bihar", district: "Patna", baseline: 36 },
  { id: "bih-araria", latitude: 26.15, longitude: 87.52, state: "Bihar", district: "Araria", baseline: 62 },
  { id: "jh-ranchi", latitude: 23.34, longitude: 85.31, state: "Jharkhand", district: "Ranchi", baseline: 34 },
  { id: "wb-kolkata", latitude: 22.57, longitude: 88.36, state: "West Bengal", district: "Kolkata", baseline: 56 },
  { id: "wb-darjeeling", latitude: 27.04, longitude: 88.26, state: "West Bengal", district: "Darjeeling", baseline: 84 },
  { id: "od-puri", latitude: 19.81, longitude: 85.83, state: "Odisha", district: "Puri", baseline: 60 },
  { id: "od-sambalpur", latitude: 21.47, longitude: 83.97, state: "Odisha", district: "Sambalpur", baseline: 38 },
  { id: "as-guwahati", latitude: 26.14, longitude: 91.74, state: "Assam", district: "Kamrup Metropolitan", baseline: 78 },
  { id: "as-dibrugarh", latitude: 27.47, longitude: 94.91, state: "Assam", district: "Dibrugarh", baseline: 88 },
  { id: "meg-cherrapunji", latitude: 25.28, longitude: 91.72, state: "Meghalaya", district: "East Khasi Hills", baseline: 110 },
  { id: "ar-itanagar", latitude: 27.1, longitude: 93.62, state: "Arunachal Pradesh", district: "Papum Pare", baseline: 92 },
  { id: "man-imphal", latitude: 24.82, longitude: 93.94, state: "Manipur", district: "Imphal West", baseline: 52 },
  { id: "miz-aizawl", latitude: 23.73, longitude: 92.72, state: "Mizoram", district: "Aizawl", baseline: 64 },
  { id: "nag-kohima", latitude: 25.67, longitude: 94.11, state: "Nagaland", district: "Kohima", baseline: 58 },
  { id: "tri-agartala", latitude: 23.83, longitude: 91.28, state: "Tripura", district: "West Tripura", baseline: 66 },
  { id: "sik-gangtok", latitude: 27.33, longitude: 88.61, state: "Sikkim", district: "East Sikkim", baseline: 80 },
  { id: "ap-visakhapatnam", latitude: 17.69, longitude: 83.22, state: "Andhra Pradesh", district: "Visakhapatnam", baseline: 44 },
  { id: "ap-tirupati", latitude: 13.63, longitude: 79.42, state: "Andhra Pradesh", district: "Tirupati", baseline: 28 },
  { id: "tel-hyderabad", latitude: 17.39, longitude: 78.49, state: "Telangana", district: "Hyderabad", baseline: 26 },
  { id: "tn-chennai", latitude: 13.08, longitude: 80.27, state: "Tamil Nadu", district: "Chennai", baseline: 42 },
  { id: "tn-nilgiris", latitude: 11.41, longitude: 76.7, state: "Tamil Nadu", district: "The Nilgiris", baseline: 68 },
  { id: "tn-madurai", latitude: 9.93, longitude: 78.12, state: "Tamil Nadu", district: "Madurai", baseline: 20 },
  { id: "py-puducherry", latitude: 11.94, longitude: 79.83, state: "Puducherry", district: "Puducherry", baseline: 36 },
  { id: "an-portblair", latitude: 11.62, longitude: 92.73, state: "Andaman and Nicobar Islands", district: "South Andaman", baseline: 74 },
  { id: "lk-kavaratti", latitude: 10.57, longitude: 72.64, state: "Lakshadweep", district: "Lakshadweep", baseline: 48 },
];

/** per-station drift state so updates feel continuous rather than random */
const drift = new Map<string, number>();

function nextAmount(station: Station): number {
  const previous = drift.get(station.id) ?? station.baseline;
  // slow random walk around the baseline, with occasional surges
  const pull = (station.baseline - previous) * 0.25;
  const noise = (Math.random() - 0.5) * station.baseline * 0.55;
  const surge = Math.random() < 0.06 ? station.baseline * 0.8 : 0;
  const next = Math.max(0, Math.min(RAINFALL_MAX_MM, previous + pull + noise + surge));
  drift.set(station.id, next);
  return Math.round(next * 10) / 10;
}

/**
 * DEMO DATA — returns a fresh snapshot of rainfall observations.
 * Swap this implementation for a real API call when available.
 */
export function fetchRainfallObservations(): RainfallObservation[] {
  const timestamp = new Date().toISOString();
  return STATIONS.map((station) => ({
    id: station.id,
    latitude: station.latitude,
    longitude: station.longitude,
    rainfallAmount: nextAmount(station),
    state: station.state,
    district: station.district,
    timestamp,
  }));
}
