import type { MarkerClusterer } from "@googlemaps/markerclusterer";
import { InjectionKey, Ref } from "vue";

export const mapSymbol: InjectionKey<Ref<google.maps.Map>> = Symbol("map");
export const apiSymbol: InjectionKey<Ref<typeof google.maps>> = Symbol("api");
export const markerSymbol: InjectionKey<Ref<google.maps.Marker>> = Symbol("marker");
export const markerClusterSymbol: InjectionKey<Ref<MarkerClusterer>> = Symbol("markerCluster");
export const customMarkerClassSymbol = Symbol("CustomMarker") as unknown as "CustomMarker";
/**
 * Utilitary flag for components that need to know the map
 * was fully loaded (including its tiles) to decide their behavior
 */
export const mapTilesLoadedSymbol: InjectionKey<Ref<boolean>> = Symbol("mapTilesLoaded");

export const polylineEvents = [
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "rightclick",
];
