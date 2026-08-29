# India Rainfall Map

Build the initial DISCATRA GIS map from scratch.

IMPORTANT:

Keep this implementation focused and small.

Do NOT build the complete DISCATRA dashboard yet.

Do NOT build relocation, reports, alerts, risk-details pages, or district red-zone screens.

For this first step, I ONLY want:

1. REAL SATELLITE/TERRAIN MAP

2. INDIA STATE SEARCH + ZOOM

3. ONE DYNAMIC RAINFALL HEATMAP LAYER

==================================================

1. REAL SATELLITE/TERRAIN BASEMAP

==================================================

Use an ACTUAL interactive satellite/terrain map from a legitimate online map-tile provider.

I do NOT want a map that is merely designed to look like satellite imagery.

Do NOT create satellite imagery using:

- CSS

- gradients

- SVG

- colored polygons

- generated graphics

- static screenshots

- fake terrain

The map must use real geographic satellite/terrain tiles.

The map should naturally show:

- green vegetation

- forests

- mountains

- brown/tan terrain

- valleys

- rivers

- lakes

- coastlines

- real geographic texture

When I zoom into Karnataka, I should see the REAL geographic terrain of Karnataka.

When I zoom into Uttarakhand, I should see the REAL Himalayan terrain.

The satellite/terrain imagery is the BASEMAP.

==================================================

2. VERY IMPORTANT — DO NOT MAKE THE MAP WHITE/DARK

==================================================

DO NOT:

- create a white India polygon

- create white state polygons

- create black India polygons

- create dark land overlays

- fill entire states with colors

- fill entire districts with colors

- use an SVG India map

- use a static India image

- create fake satellite imagery

The real satellite/terrain imagery must remain visible.

State boundaries should be thin lines only.

Do NOT fill the states.

==================================================

3. INTERACTIVE MAP

==================================================

The map must support:

- pan

- zoom in

- zoom out

- reset/home

- smooth map movement

Start centered on INDIA.

The map should occupy most of the screen.

==================================================

4. STATE SEARCH

==================================================

Add a search box:

"Search state or UT"

It must support partial matching.

Example:

User types:

Kra

Show:

Karnataka

When Karnataka is selected:

→ smoothly zoom into Karnataka

→ keep the real satellite/terrain imagery

→ do NOT navigate to another page

Also support other Indian states and Union Territories.

==================================================

5. STATE BOUNDARIES

==================================================

Show Indian state boundaries as subtle lines over the real satellite map.

IMPORTANT:

Lines only.

Do NOT fill states with:

white

black

red

orange

yellow

green

The satellite imagery must remain visible underneath.

==================================================

6. RAINFALL HEATMAP — ONLY ONE DYNAMIC LAYER

==================================================

For this first version, implement ONLY:

RAINFALL

Do not implement flood, landslide, erosion, cloudburst, cyclone, red zones, relocation, etc. yet.

Create a rainfall heatmap on top of the satellite/terrain map.

The rainfall heatmap must be a TRUE MAP OVERLAY.

It must NOT replace the basemap.

Use geographic rainfall observations containing:

- latitude

- longitude

- rainfall amount

- timestamp

- state

- district

Use realistic SAMPLE DATA for development.

Clearly label it as:

DEMO DATA

==================================================

7. RAINFALL HEATMAP VISUAL

==================================================

The rainfall layer should look like a geographic heatmap.

Use smooth intensity rather than large solid circles.

Low rainfall:

→ subtle / low intensity

Moderate rainfall:

→ stronger intensity

Heavy rainfall:

→ orange/red intensity

Very heavy rainfall:

→ strong red hotspot

The satellite/terrain imagery must remain clearly visible underneath.

Do NOT color entire states.

Do NOT color entire districts.

Only the areas around rainfall observations should receive the heatmap.

==================================================

8. MAP LAYER CONTROL

==================================================

Add a small map-layer control.

For now show:

MAP LAYERS

☑ Rainfall

Only implement the Rainfall layer at this stage.

Structure the code so we can later add:

Flood

Landslide

Erosion

Cloudburst

Cyclone

Composite Risk

Red Zones

Alerts

But DO NOT build those layers yet.

==================================================

9. DEMO DYNAMIC UPDATE

==================================================

Make the rainfall data dynamic using DEMO DATA.

For development:

Every 10–15 seconds, update the mock rainfall observations.

For example:

- rainfall amount changes

- heat intensity changes

- some rainfall hotspots increase

- some decrease

- timestamps update

Use smooth transitions.

Show a small indicator:

● DEMO LIVE DATA

Last updated: [time]

IMPORTANT:

The satellite imagery itself does NOT change every few seconds.

ONLY THE RAINFALL DATA / HEATMAP changes.

Keep the rainfall data layer completely separate from the satellite basemap.

==================================================

10. DATA ARCHITECTURE

==================================================

Create a clean data structure such as:

RainfallObservation:

- id

- latitude

- longitude

- rainfallAmount

- state

- district

- timestamp

Keep the mock data separate from the map UI.

Later we should be able to replace the mock data with a real rainfall/weather API without rebuilding the map.

==================================================

11. MAP LAYER ORDER

==================================================

Use this exact layer order:

1. REAL SATELLITE/TERRAIN BASEMAP

2. STATE BOUNDARIES

3. RAINFALL DATA

4. RAINFALL HEATMAP

5. MAP CONTROLS / UI

Never place a white or black land layer above the satellite imagery.

==================================================

12. PROVIDER / API KEY

==================================================

Use a legitimate real satellite/terrain imagery provider.

If the provider requires an API key:

- tell me which provider is being used

- tell me the required environment variable

- do NOT hardcode the API key

Use the appropriate Vite environment variable if this is a Vite project.

For example:

VITE_MAP_API_KEY

Do not expose secret keys in source code.

==================================================

13. KEEP THE UI SIMPLE

==================================================

For this first version, create only:

- DISCATRA logo/name

- hamburger menu placeholder

- state search

- map

- map controls

- rainfall layer control

- DEMO LIVE DATA indicator

Do NOT create the full dashboard yet.

The map must remain the main focus.

==================================================

FINAL RESULT

==================================================

When the page opens:

I should see a REAL satellite/terrain map of India.

Example:

REAL EARTH

+

REAL SATELLITE/TERRAIN

+

STATE BOUNDARIES

+

RAINFALL HEATMAP

The satellite map remains stable.

The rainfall heatmap changes dynamically when the demo rainfall data updates.

Most importantly:

REAL MAP = BASE

RAINFALL = DYNAMIC OVERLAY

Do not create a white map.

Do not create a dark artificial map.

Do not color entire states.

Build ONLY this first version.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2eff1f91-4952-49cd-8376-caafaba92a90).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
