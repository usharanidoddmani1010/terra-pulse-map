/**
 * Registry of dynamic data layers rendered on top of the satellite basemap.
 * Only `rainfall` is implemented at this stage; the others are placeholders
 * so new hazard layers can be added without touching the map component.
 */
export type MapLayerId =
  | "rainfall"
  | "flood"
  | "landslide"
  | "erosion"
  | "cloudburst"
  | "cyclone"
  | "composite-risk"
  | "red-zones"
  | "alerts";

export interface MapLayerDefinition {
  id: MapLayerId;
  label: string;
  implemented: boolean;
  defaultEnabled: boolean;
}

export const MAP_LAYERS: MapLayerDefinition[] = [
  { id: "rainfall", label: "Rainfall", implemented: true, defaultEnabled: true },
];

export const PLANNED_MAP_LAYERS: MapLayerDefinition[] = [
  { id: "flood", label: "Flood", implemented: false, defaultEnabled: false },
  { id: "landslide", label: "Landslide", implemented: false, defaultEnabled: false },
  { id: "erosion", label: "Erosion", implemented: false, defaultEnabled: false },
  { id: "cloudburst", label: "Cloudburst", implemented: false, defaultEnabled: false },
  { id: "cyclone", label: "Cyclone", implemented: false, defaultEnabled: false },
  { id: "composite-risk", label: "Composite Risk", implemented: false, defaultEnabled: false },
  { id: "red-zones", label: "Red Zones", implemented: false, defaultEnabled: false },
  { id: "alerts", label: "Alerts", implemented: false, defaultEnabled: false },
];
