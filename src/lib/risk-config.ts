/**
 * All risk thresholds, weights and the composite formula live here so they can
 * be swapped for the finalised business logic without touching UI components.
 */

import type { HazardType, PriorityLevel, RiskColor, Severity } from "@/data/risk-types";

export const HAZARD_TYPES: HazardType[] = [
  "flood",
  "landslide",
  "erosion",
  "cloudburst",
  "cyclone",
];

export const HAZARD_LABELS: Record<HazardType, string> = {
  flood: "Flood",
  landslide: "Landslide",
  erosion: "Erosion",
  cloudburst: "Cloudburst",
  cyclone: "Cyclone",
};

export const RISK_CONFIG = {
  /** a hazard model reports classification = 1 at/above this confidence */
  classificationThreshold: 0.55,

  /** relative danger weight per hazard model in the composite score */
  hazardWeights: {
    flood: 1.0,
    landslide: 0.95,
    erosion: 0.6,
    cloudburst: 0.85,
    cyclone: 0.9,
  } as Record<HazardType, number>,

  /** confidence -> severity bands */
  severityBands: [
    { min: 0.85, severity: "critical" as Severity, color: "red" as RiskColor },
    { min: 0.7, severity: "high" as Severity, color: "orange" as RiskColor },
    { min: 0.45, severity: "moderate" as Severity, color: "yellow" as RiskColor },
    { min: 0, severity: "low" as Severity, color: "green" as RiskColor },
  ],

  /** composite score (0-100) -> global classification */
  globalBands: [
    { min: 75, level: "RED" as const, color: "red" as RiskColor },
    { min: 55, level: "ORANGE" as const, color: "orange" as RiskColor },
    { min: 35, level: "YELLOW" as const, color: "yellow" as RiskColor },
    { min: 0, level: "NORMAL" as const, color: "green" as RiskColor },
  ],

  /**
   * Composite formula weights.
   * priority = modelRisk * modelWeight + populationExposure * populationWeight
   */
  composite: {
    modelWeight: 0.72,
    populationWeight: 0.28,
    /** population that maps to full (1.0) exposure on a log scale */
    populationSaturation: 250_000,
  },

  /** priority thresholds on the population-aware priority score (0-100) */
  priorityBands: [
    { min: 80, level: "CRITICAL" as PriorityLevel },
    { min: 60, level: "HIGH" as PriorityLevel },
    { min: 40, level: "MEDIUM" as PriorityLevel },
    { min: 0, level: "LOW" as PriorityLevel },
  ],

  /** a location is a RED ZONE when classified and at/above this confidence */
  redZoneConfidence: 0.7,

  /** red-zone count -> district attention band (used by the district panel) */
  redZoneCountBands: [
    { min: 31, level: "CRITICAL" as PriorityLevel },
    { min: 16, level: "HIGH" as PriorityLevel },
    { min: 6, level: "MEDIUM" as PriorityLevel },
    { min: 0, level: "LOWER" as PriorityLevel },
  ],

  /** demo live refresh cadence */
  refreshIntervalMs: 12_000,
};

export const RISK_COLOR_HEX: Record<RiskColor, string> = {
  green: "#22c55e",
  yellow: "#facc15",
  orange: "#f97316",
  red: "#dc2626",
};

export const RISK_COLOR_DOT: Record<RiskColor, string> = {
  green: "🟢",
  yellow: "🟡",
  orange: "🟠",
  red: "🔴",
};
