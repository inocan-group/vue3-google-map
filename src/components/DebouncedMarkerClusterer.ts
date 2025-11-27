import { MarkerClusterer, MarkerClustererOptions } from "@googlemaps/markerclusterer";
import debounce from "lodash-es/debounce";

/**
 * MarkerClusterer with debounced rendering for batch operations.
 *
 * Uses leading+trailing debounce: renders immediately on first call,
 * then batches subsequent calls and renders once more after the delay.
 * This provides immediate visual feedback while still batching rapid updates.
 */
export class DebouncedMarkerClusterer extends MarkerClusterer {
  private readonly debouncedRender: ReturnType<typeof debounce>;

  constructor(options: MarkerClustererOptions, debounceDelay = 10) {
    super(options);

    this.debouncedRender = debounce(
      () => {
        super.render();
      },
      debounceDelay,
      { leading: true, trailing: true }
    );
  }

  addMarker(marker: google.maps.Marker | google.maps.marker.AdvancedMarkerElement, noDraw?: boolean): void {
    super.addMarker(marker, true);
    if (!noDraw) {
      this.debouncedRender();
    }
  }

  removeMarker(marker: google.maps.Marker | google.maps.marker.AdvancedMarkerElement, noDraw?: boolean): boolean {
    const result = super.removeMarker(marker, true);
    if (!noDraw) {
      this.debouncedRender();
    }
    return result;
  }

  addMarkers(markers: (google.maps.Marker | google.maps.marker.AdvancedMarkerElement)[], noDraw?: boolean): void {
    super.addMarkers(markers, true);
    if (!noDraw) {
      this.debouncedRender();
    }
  }

  removeMarkers(markers: (google.maps.Marker | google.maps.marker.AdvancedMarkerElement)[], noDraw?: boolean): boolean {
    const result = super.removeMarkers(markers, true);
    if (!noDraw) {
      this.debouncedRender();
    }
    return result;
  }

  clearMarkers(noDraw?: boolean): void {
    super.clearMarkers(true);
    if (!noDraw) {
      this.debouncedRender();
    }
  }

  /** Renders immediately, canceling any pending debounced render. */
  render(): void {
    this.debouncedRender.cancel();
    super.render();
  }

  destroy(): void {
    this.debouncedRender.cancel();
  }
}
