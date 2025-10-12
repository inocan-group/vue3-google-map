import { MarkerClusterer, MarkerClustererOptions } from "@googlemaps/markerclusterer";
import debounce from "debounce";

export class DebouncedMarkerClusterer extends MarkerClusterer {
  private readonly debouncedRender: (() => void) & { clear(): void };

  constructor(options: MarkerClustererOptions, debounceDelay = 10) {
    super(options);

    this.debouncedRender = debounce(() => {
      super.render();
    }, debounceDelay);
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

  render(): void {
    this.debouncedRender.clear();
    super.render();
  }

  destroy(): void {
    this.debouncedRender.clear();
  }
}
