import type { Loader } from "@googlemaps/js-api-loader";
import { InjectionKey, ref, Ref } from "vue";

export const mapSymbol: InjectionKey<Ref<google.maps.Map | null>> = Symbol("map");
export const apiSymbol: InjectionKey<Ref<typeof google.maps | null>> = Symbol("api");
/**
 * Utilitary flag for components that need to know the map
 * was fully loaded (including its tiles) to decide their behavior
 */
export const mapWasLoadedSymbol: InjectionKey<Ref<boolean>> = Symbol("mapwasloaded");
export const loaderInstance = ref<Loader | null>(null);

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
