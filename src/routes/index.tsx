import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const DiscatraMap = lazy(() => import("@/components/discatra/DiscatraMap"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DISCATRA GIS — Live Rainfall Map of India" },
      {
        name: "description",
        content:
          "Interactive satellite map of India with state boundaries and a dynamic rainfall heatmap overlay (demo data).",
      },
      { property: "og:title", content: "DISCATRA GIS — Live Rainfall Map of India" },
      {
        property: "og:description",
        content:
          "Real satellite terrain basemap, searchable Indian states, and a live-updating rainfall heatmap overlay.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function MapSkeleton() {
  return (
    <div className="grid h-screen w-full place-items-center bg-background">
      <p className="text-sm tracking-[0.28em] text-muted-foreground">LOADING DISCATRA GIS…</p>
    </div>
  );
}

function Index() {
  return (
    <main>
      <h1 className="sr-only">DISCATRA GIS — India rainfall map</h1>
      <ClientOnly fallback={<MapSkeleton />}>
        <Suspense fallback={<MapSkeleton />}>
          <DiscatraMap />
        </Suspense>
      </ClientOnly>
    </main>
  );
}
