import { MarkerClusterer, MarkerClustererOptions } from "@googlemaps/markerclusterer";
/**
 * MarkerClusterer with debounced rendering for batch operations.
 *
 * Uses leading+trailing debounce: renders immediately on first call,
 * then batches subsequent calls and renders once more after the delay.
 * This provides immediate visual feedback while still batching rapid updates.
 */
export declare class DebouncedMarkerClusterer extends MarkerClusterer {
    private readonly debouncedRender;
    constructor(options: MarkerClustererOptions, debounceDelay?: number);
    addMarker(marker: google.maps.Marker | google.maps.marker.AdvancedMarkerElement, noDraw?: boolean): void;
    removeMarker(marker: google.maps.Marker | google.maps.marker.AdvancedMarkerElement, noDraw?: boolean): boolean;
    addMarkers(markers: (google.maps.Marker | google.maps.marker.AdvancedMarkerElement)[], noDraw?: boolean): void;
    removeMarkers(markers: (google.maps.Marker | google.maps.marker.AdvancedMarkerElement)[], noDraw?: boolean): boolean;
    clearMarkers(noDraw?: boolean): void;
    /** Renders immediately, canceling any pending debounced render. */
    render(): void;
    destroy(): void;
}
