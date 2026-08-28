import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

import {
  fetchRainfallObservations,
  RAINFALL_MAX_MM,
  type RainfallObservation,
} from "@/data/rainfall";
import { MAP_LAYERS, PLANNED_MAP_LAYERS, type MapLayerId } from "@/lib/map-layers";
import { Menu, Search, Plus, Minus, Home, Layers } from "lucide-react";

const INDIA_CENTER: [number, number] = [22.6, 79.5];
const INDIA_ZOOM = 5;
const UPDATE_INTERVAL_MS = 12000;

interface StateEntry {
  name: string;
  bounds: L.LatLngBounds;
}

type HeatLayer = L.Layer & {
  setLatLngs: (points: Array<[number, number, number]>) => void;
};

export default function DiscatraMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const heatRef = useRef<HeatLayer | null>(null);

  const [states, setStates] = useState<StateEntry[]>([]);
  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [observations, setObservations] = useState<RainfallObservation[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [enabledLayers, setEnabledLayers] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(MAP_LAYERS.map((l) => [l.id, l.defaultEnabled])),
  );

  // 1. Basemap + 2. boundaries -------------------------------------------------
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: INDIA_CENTER,
      zoom: INDIA_ZOOM,
      minZoom: 3,
      maxZoom: 17,
      zoomControl: false,
      worldCopyJump: true,
    });
    mapRef.current = map;

    // REAL satellite/terrain tiles (Esri World Imagery — no API key required)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 17,
        attribution:
          "Imagery &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community",
      },
    ).addTo(map);

    // Thin place labels/roads reference overlay (transparent, keeps imagery visible)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 17, opacity: 0.55 },
    ).addTo(map);

    let cancelled = false;
    void fetch("/india-states.geojson")
      .then((r) => r.json())
      .then((geo: GeoJSON.FeatureCollection) => {
        if (cancelled || !mapRef.current) return;
        // STATE BOUNDARIES — stroke only, never filled
        const layer = L.geoJSON(geo, {
          style: {
            color: "#ffffff",
            weight: 1,
            opacity: 0.65,
            fill: false,
            interactive: false,
          },
        }).addTo(map);
        layer.bringToFront();

        const entries: StateEntry[] = [];
        layer.eachLayer((child) => {
          const feature = (child as L.GeoJSON).feature as GeoJSON.Feature | undefined;
          const name = (feature?.properties as { NAME_1?: string } | undefined)?.NAME_1;
          if (!name) return;
          entries.push({ name, bounds: (child as L.Polygon).getBounds() });
        });
        entries.sort((a, b) => a.name.localeCompare(b.name));
        setStates(entries);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      map.remove();
      mapRef.current = null;
      heatRef.current = null;
    };
  }, []);

  // 3. Rainfall data (DEMO, dynamic) -------------------------------------------
  useEffect(() => {
    const tick = () => {
      setObservations(fetchRainfallObservations());
      setUpdatedAt(new Date());
    };
    tick();
    const id = window.setInterval(tick, UPDATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  // 4. Rainfall heatmap overlay -------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const active = enabledLayers["rainfall"];

    if (!active) {
      if (heatRef.current) {
        map.removeLayer(heatRef.current);
        heatRef.current = null;
      }
      return;
    }

    const points = observations.map(
      (o) =>
        [o.latitude, o.longitude, Math.min(1, o.rainfallAmount / RAINFALL_MAX_MM)] as [
          number,
          number,
          number,
        ],
    );

    if (!heatRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layer = (L as any).heatLayer(points, {
        radius: 45,
        blur: 40,
        max: 1,
        maxZoom: 6,
        minOpacity: 0.2,
        gradient: {
          0.0: "rgba(56,189,248,0)",
          0.25: "#38bdf8",
          0.45: "#22c55e",
          0.65: "#facc15",
          0.82: "#f97316",
          1.0: "#dc2626",
        },
      });
      layer.addTo(map);
      // keep the satellite imagery readable underneath the overlay
      const canvas = (layer as unknown as { _canvas?: HTMLCanvasElement })._canvas;
      if (canvas) {
        canvas.style.opacity = "0.62";
        canvas.style.transition = "opacity 400ms ease";
      }
      heatRef.current = layer as HeatLayer;
    } else {
      heatRef.current.setLatLngs(points);
    }
  }, [observations, enabledLayers]);

  // Search ----------------------------------------------------------------------
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const fuzzy = new RegExp(q.split("").map((c) => c.replace(/[^a-z0-9]/g, "")).filter(Boolean).join(".*"), "i");
    return states
      .filter((s) => s.name.toLowerCase().includes(q) || fuzzy.test(s.name))
      .slice(0, 8);
  }, [query, states]);

  const flyToState = (entry: StateEntry) => {
    mapRef.current?.flyToBounds(entry.bounds, { padding: [40, 40], duration: 1.4 });
    setQuery(entry.name);
    setOpenSearch(false);
  };

  const resetView = () =>
    mapRef.current?.flyTo(INDIA_CENTER, INDIA_ZOOM, { duration: 1.2 });

  const heaviest = useMemo(
    () => [...observations].sort((a, b) => b.rainfallAmount - a.rainfallAmount).slice(0, 3),
    [observations],
  );

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* 1-2-3-4. map surface */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* 5. controls / UI */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex items-start gap-3 p-4">
        <button
          type="button"
          aria-label="Open menu"
          className="pointer-events-auto grid size-11 place-items-center rounded-xl border border-panel-border bg-panel text-panel-foreground backdrop-blur-md transition-colors hover:bg-panel-hover"
        >
          <Menu className="size-5" />
        </button>

        <div className="pointer-events-auto flex h-11 items-center gap-2 rounded-xl border border-panel-border bg-panel px-4 backdrop-blur-md">
          <span className="text-sm font-semibold tracking-[0.28em] text-panel-foreground">
            DISCATRA
          </span>
          <span className="hidden text-[10px] uppercase tracking-widest text-panel-muted sm:inline">
            GIS
          </span>
        </div>

        <div className="pointer-events-auto relative ml-auto w-full max-w-xs">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-panel-border bg-panel px-3 backdrop-blur-md">
            <Search className="size-4 shrink-0 text-panel-muted" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenSearch(true);
              }}
              onFocus={() => setOpenSearch(true)}
              placeholder="Search state or UT"
              className="w-full bg-transparent text-sm text-panel-foreground outline-none placeholder:text-panel-muted"
            />
          </div>
          {openSearch && matches.length > 0 && (
            <ul className="absolute mt-2 w-full overflow-hidden rounded-xl border border-panel-border bg-panel backdrop-blur-md">
              {matches.map((m) => (
                <li key={m.name}>
                  <button
                    type="button"
                    onClick={() => flyToState(m)}
                    className="block w-full px-4 py-2.5 text-left text-sm text-panel-foreground transition-colors hover:bg-panel-hover"
                  >
                    {m.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* zoom / home */}
      <div className="absolute right-4 top-1/2 z-[500] flex -translate-y-1/2 flex-col gap-2">
        {[
          { label: "Zoom in", icon: Plus, action: () => mapRef.current?.zoomIn() },
          { label: "Zoom out", icon: Minus, action: () => mapRef.current?.zoomOut() },
          { label: "Reset view", icon: Home, action: resetView },
        ].map(({ label, icon: Icon, action }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={action}
            className="grid size-10 place-items-center rounded-xl border border-panel-border bg-panel text-panel-foreground backdrop-blur-md transition-colors hover:bg-panel-hover"
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>

      {/* layer control */}
      <div className="absolute left-4 top-24 z-[500] w-56 rounded-xl border border-panel-border bg-panel p-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-panel-muted">
          <Layers className="size-3.5" /> Map Layers
        </div>
        <div className="mt-3 space-y-2">
          {MAP_LAYERS.map((layer) => (
            <label
              key={layer.id}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-panel-foreground"
            >
              <input
                type="checkbox"
                checked={!!enabledLayers[layer.id]}
                onChange={(e) =>
                  setEnabledLayers((prev) => ({
                    ...prev,
                    [layer.id as MapLayerId]: e.target.checked,
                  }))
                }
                className="size-4 accent-[oklch(0.62_0.21_28)]"
              />
              {layer.label}
            </label>
          ))}
          <p className="pt-1 text-[10px] leading-relaxed text-panel-muted">
            {PLANNED_MAP_LAYERS.length} more hazard layers planned
          </p>
        </div>

        <div className="mt-4 border-t border-panel-border pt-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-panel-muted">
            Rainfall (mm)
          </div>
          <div className="mt-2 h-2 rounded-full bg-[linear-gradient(90deg,#38bdf8,#22c55e,#facc15,#f97316,#dc2626)]" />
          <div className="mt-1 flex justify-between text-[10px] text-panel-muted">
            <span>0</span>
            <span>{RAINFALL_MAX_MM}+</span>
          </div>
        </div>
      </div>

      {/* demo live indicator */}
      <div className="absolute bottom-6 left-4 z-[500] rounded-xl border border-panel-border bg-panel px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-medium text-panel-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[oklch(0.72_0.19_145)] opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-[oklch(0.72_0.19_145)]" />
          </span>
          DEMO LIVE DATA
        </div>
        <div className="mt-1 text-[11px] text-panel-muted">
          Last updated:{" "}
          {updatedAt ? updatedAt.toLocaleTimeString("en-IN", { hour12: false }) : "—"}
        </div>
        <div className="mt-2 space-y-0.5 text-[10px] text-panel-muted">
          {heaviest.map((o) => (
            <div key={o.id}>
              {o.district}, {o.state} — {o.rainfallAmount.toFixed(1)} mm
            </div>
          ))}
        </div>
        <div className="mt-2 text-[9px] uppercase tracking-widest text-panel-muted">
          Sample observations · not operational
        </div>
      </div>
    </div>
  );
}
