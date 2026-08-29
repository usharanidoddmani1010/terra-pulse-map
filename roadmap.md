# DISCATRA roadmap

## Done
- Esri satellite basemap, thin state boundaries, state search + flyTo
- Rainfall demo heatmap with live-updating mock data

## In progress (current task)
- [x] Risk data model: state/district/lat/lng/hazard/classification/confidence/severity/population
- [x] District risk panel per selected state, red-zone counts calculated from data, sorted
- [x] District click -> zoom, district boundary, individual red-zone locations, local heatmap
- [x] Base map control: Satellite / Terrain / Satellite + Terrain (default)
- [x] Per-hazard model outputs (flood, landslide, erosion, cloudburst, cyclone) with classification + confidence
- [x] Composite/global risk engine incl. population exposure, configurable formula + thresholds
- [x] Global red zones on map with hover "why is it red?" card
- [x] Flood-specific hover: estimated time to event + Send Alert
- [x] Send Alert confirmation flow (demo), public safety message with nearby safe locations
- [x] Official relocation report (safe-site capacity, occupancy, overcrowding, resources)
- [x] Hazard layer filter (composite + per hazard) independent of base map
- [x] Demo live data refresh without reloading the map

## Later
- Real ML model outputs / weather / GIS / population APIs, websocket streams
- Carrying Capacity Studio integration
- Detailed Risk Details screen (district click currently stays on the map)
