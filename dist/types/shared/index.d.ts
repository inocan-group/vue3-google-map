import type { MarkerClusterer } from "@googlemaps/markerclusterer";
import { InjectionKey, Ref } from "vue";
export declare const mapSymbol: InjectionKey<Ref<google.maps.Map | undefined>>;
export declare const apiSymbol: InjectionKey<Ref<typeof google.maps | undefined>>;
export declare const markerSymbol: InjectionKey<Ref<google.maps.Marker | google.maps.marker.AdvancedMarkerElement | undefined>>;
export declare const markerClusterSymbol: InjectionKey<Ref<MarkerClusterer | undefined>>;
export declare const customMarkerClassSymbol: "CustomMarker";
/**
 * Utilitary flag for components that need to know the map
 * was fully loaded (including its tiles) to decide their behavior
 */
export declare const mapTilesLoadedSymbol: InjectionKey<Ref<boolean>>;
export declare const polylineEvents: string[];
