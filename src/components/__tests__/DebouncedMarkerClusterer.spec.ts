import debounce from "lodash-es/debounce";
import { DebouncedMarkerClusterer } from "../DebouncedMarkerClusterer";

const DEFAULT_DEBOUNCE_DELAY = 10;

const mockAddMarker = jest.fn();
const mockRemoveMarker = jest.fn();
const mockAddMarkers = jest.fn();
const mockRemoveMarkers = jest.fn();
const mockClearMarkers = jest.fn();
const mockRender = jest.fn();

jest.mock("@googlemaps/markerclusterer", () => {
  return {
    MarkerClusterer: class {
      addMarker(marker: unknown, noDraw?: boolean) {
        mockAddMarker(marker, noDraw);
      }
      removeMarker(marker: unknown, noDraw?: boolean) {
        return mockRemoveMarker(marker, noDraw);
      }
      addMarkers(markers: unknown[], noDraw?: boolean) {
        mockAddMarkers(markers, noDraw);
      }
      removeMarkers(markers: unknown[], noDraw?: boolean) {
        return mockRemoveMarkers(markers, noDraw);
      }
      clearMarkers(noDraw?: boolean) {
        mockClearMarkers(noDraw);
      }
      render() {
        mockRender();
      }
    },
  };
});

const mockDebouncedRender = Object.assign(jest.fn(), { cancel: jest.fn() });

jest.mock("lodash-es/debounce", () => {
  return jest.fn(() => mockDebouncedRender);
});

describe("DebouncedMarkerClusterer", () => {
  let clusterer: DebouncedMarkerClusterer;
  let mockMarker: google.maps.marker.AdvancedMarkerElement;

  beforeEach(() => {
    jest.clearAllMocks();
    mockMarker = {} as google.maps.marker.AdvancedMarkerElement;
    clusterer = new DebouncedMarkerClusterer({ map: {} as google.maps.Map }, DEFAULT_DEBOUNCE_DELAY);
  });

  describe("Instance Creation", () => {
    it("should create debounced render with correct delay and options", () => {
      expect(debounce).toHaveBeenCalledWith(expect.any(Function), DEFAULT_DEBOUNCE_DELAY, {
        leading: true,
        trailing: true,
      });
    });

    it("should use custom delay when provided", () => {
      new DebouncedMarkerClusterer({ map: {} as google.maps.Map }, 50);

      expect(debounce).toHaveBeenCalledWith(expect.any(Function), 50, { leading: true, trailing: true });
    });
  });

  describe("Marker Operations", () => {
    it("should pass noDraw=true to parent and call debounced render", () => {
      clusterer.addMarker(mockMarker);

      expect(mockAddMarker).toHaveBeenCalledWith(mockMarker, true);
      expect(mockDebouncedRender).toHaveBeenCalled();
    });

    it("should not call debounced render when noDraw=true", () => {
      clusterer.addMarker(mockMarker, true);

      expect(mockAddMarker).toHaveBeenCalledWith(mockMarker, true);
      expect(mockDebouncedRender).not.toHaveBeenCalled();
    });

    it("should call debounced render for all marker operations", () => {
      clusterer.addMarker(mockMarker);
      clusterer.removeMarker(mockMarker);
      clusterer.addMarkers([mockMarker]);
      clusterer.removeMarkers([mockMarker]);
      clusterer.clearMarkers();

      expect(mockDebouncedRender).toHaveBeenCalledTimes(5);
    });

    it("should return result from parent for remove operations", () => {
      mockRemoveMarker.mockReturnValue(true);
      mockRemoveMarkers.mockReturnValue(false);

      expect(clusterer.removeMarker(mockMarker)).toBe(true);
      expect(clusterer.removeMarkers([mockMarker])).toBe(false);
    });
  });

  describe("render()", () => {
    it("should cancel pending debounced render and render immediately", () => {
      clusterer.render();

      expect(mockDebouncedRender.cancel).toHaveBeenCalled();
      expect(mockDebouncedRender).not.toHaveBeenCalled();
      expect(mockRender).toHaveBeenCalled();
    });
  });

  describe("destroy()", () => {
    it("should cancel pending debounced render", () => {
      clusterer.destroy();

      expect(mockDebouncedRender.cancel).toHaveBeenCalled();
      expect(mockRender).not.toHaveBeenCalled();
    });
  });
});
