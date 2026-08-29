/** Shared risk data structures — backend-integration ready. */

export type HazardType = "flood" | "landslide" | "erosion" | "cloudburst" | "cyclone";

export type Severity = "low" | "moderate" | "high" | "critical";

export type RiskColor = "green" | "yellow" | "orange" | "red";

export type PriorityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "LOWER";

export type GlobalClassification = "NORMAL" | "YELLOW" | "ORANGE" | "RED";

/** One hazard model's output for one geographic location. */
export interface HazardPrediction {
  id: string;
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  hazardType: HazardType;
  /** 1 = model flags this location as affected/high-risk */
  classification: 0 | 1;
  /** 0..1 */
  confidenceScore: number;
  severity: Severity;
  color: RiskColor;
  /** ISO timestamp of the prediction */
  timestamp: string;
  /** ISO timestamp of the forecast event (model output, flood-style hazards) */
  predictedEventTime?: string;
}

/** Per-hazard rollup for a region. */
export interface HazardSummary {
  hazardType: HazardType;
  classification: 0 | 1;
  confidenceScore: number;
  severity: Severity;
  color: RiskColor;
  predictedEventTime?: string;
}

/** Composite/global assessment for a region (district granularity today). */
export interface RegionRisk {
  regionId: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  compositeRiskScore: number;
  /** population-aware priority score, 0-100 */
  priorityScore: number;
  priority: PriorityLevel;
  populationExposed: number;
  hazards: HazardSummary[];
  globalClassification: GlobalClassification;
  color: RiskColor;
  /** calculated from the underlying predictions, never hard-coded */
  redZoneCount: number;
  timestamp: string;
}

export interface SafeLocation {
  id: string;
  name: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  capacity: number;
  currentOccupancy: number;
  availableCapacity: number;
  distanceKm: number;
}
