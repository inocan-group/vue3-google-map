import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import MarkerCluster, { markerClusterEvents, type IMarkerClusterExposed } from "../MarkerCluster";
import { Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol } from "../../shared";
import {
  SuperClusterViewportAlgorithm,
  type MarkerClustererOptions,
  type SuperClusterViewportOptions,
} from "@googlemaps/markerclusterer";

// Mock registry
let mockMarkerClustererInstances: any[] = [];
let createMarkerClustererSpy: jest.Mock | undefined;

jest.mock("../DebouncedMarkerClusterer", () => {
  return {
    DebouncedMarkerClusterer: class {
      addListener = jest.fn();
      clearMarkers = jest.fn();
      setMap = jest.fn();
      destroy = jest.fn();

      constructor(options: MarkerClustererOptions, debounceDelay?: number) {
        createMarkerClustererSpy?.(options, debounceDelay);
        mockMarkerClustererInstances.push(this);
      }
    },
  };
});

describe("MarkerCluster Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;
  let createSuperClusterViewportAlgorithmSpy: jest.Mock<
    void,
    ConstructorParameters<typeof SuperClusterViewportAlgorithm>
  >;

  beforeEach(() => {
    // Reset mocks before each test
    mockMarkerClustererInstances = [];

    mockApi = google.maps;
    mockMap = new Map(null);

    createMarkerClustererSpy = jest.fn();
    createSuperClusterViewportAlgorithmSpy = jest.fn();

    (SuperClusterViewportAlgorithm as any) = class extends SuperClusterViewportAlgorithm {
      constructor(options: SuperClusterViewportOptions) {
        createSuperClusterViewportAlgorithmSpy(options);
        super(options);
      }
    };
  });

  const getMarkerClustererMocks = () => mockMarkerClustererInstances;

  const createWrapper = (options: MarkerClustererOptions = {}) => {
    return mount(MarkerCluster, {
      props: {
        options,
      },
      global: {
        provide: {
          [mapSymbol]: ref(mockMap),
          [apiSymbol]: ref(mockApi),
        },
      },
    });
  };

  describe("Instance Creation", () => {
    it("should create MarkerClusterer with SuperClusterViewportAlgorithm as default", async () => {
      expect(getMarkerClustererMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getMarkerClustererMocks()).toHaveLength(1);
      expect(createMarkerClustererSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
          algorithm: expect.any(SuperClusterViewportAlgorithm),
        }),
        expect.any(Number)
      );
    });

    it("should not create MarkerClusterer when map is unavailable", async () => {
      mount(MarkerCluster, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getMarkerClustererMocks()).toHaveLength(0);
    });

    it("should pass algorithmOptions to SuperClusterViewportAlgorithm", async () => {
      const algorithmOptions = { maxZoom: 15 };
      createWrapper({ algorithmOptions });
      await nextTick();

      expect(createSuperClusterViewportAlgorithmSpy).toHaveBeenCalledWith(algorithmOptions);
    });

    it("should use empty object as default algorithmOptions when not provided", async () => {
      createWrapper();
      await nextTick();

      expect(createSuperClusterViewportAlgorithmSpy).toHaveBeenCalledWith({});
    });
  });

  describe("Options Mapping", () => {
    it("should pass options to MarkerClusterer constructor", async () => {
      const options = {
        algorithmOptions: { maxZoom: 12 },
      };

      createWrapper(options);
      await nextTick();

      expect(createMarkerClustererSpy).toHaveBeenCalledWith(expect.objectContaining(options), expect.any(Number));
    });

    it("should merge options with map and algorithm", async () => {
      const options = {
        algorithmOptions: { maxZoom: 12 },
      };

      createWrapper(options);
      await nextTick();

      expect(createMarkerClustererSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
          algorithm: expect.any(Object),
          ...options,
        }),
        expect.any(Number)
      );
    });

    it("should allow algorithm to be overridden via options", async () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const customAlgorithm = { calculate: (): any => {} };
      createWrapper({ algorithm: customAlgorithm });
      await nextTick();

      expect(createMarkerClustererSpy).toHaveBeenCalledWith(
        expect.objectContaining({ algorithm: customAlgorithm }),
        expect.any(Number)
      );
    });
  });

  describe("Event Forwarding", () => {
    it("should set up event listeners for all MarkerClustererEvents", async () => {
      createWrapper();
      await nextTick();

      const markerClusterer = getMarkerClustererMocks()[0];
      const addListener = markerClusterer.addListener as jest.Mock;

      expect(addListener).toHaveBeenCalledTimes(markerClusterEvents.length);
      addListener.mock.calls.forEach(([eventType], i) => {
        expect(eventType).toBe(markerClusterEvents[i]);
      });
    });

    it("should emit events when MarkerClusterer events are triggered", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const markerClusterer = getMarkerClustererMocks()[0];
      const addListener = markerClusterer.addListener as jest.Mock;

      const mockEventData = { type: "test_event" };
      addListener.mock.calls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("Instance Exposure", () => {
    it("should expose MarkerClusterer instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect((wrapper.vm as unknown as IMarkerClusterExposed).markerCluster).toBeDefined();
    });
  });

  describe("Cleanup", () => {
    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const markerClusterer = getMarkerClustererMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(markerClusterer);
    });

    it("should clear markers on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const markerClusterer = getMarkerClustererMocks()[0];

      wrapper.unmount();

      expect(markerClusterer.clearMarkers).toHaveBeenCalledTimes(1);
    });

    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const markerClusterer = getMarkerClustererMocks()[0];

      wrapper.unmount();

      expect(markerClusterer.setMap).toHaveBeenCalledTimes(1);
      expect(markerClusterer.setMap).toHaveBeenCalledWith(null);
    });

    it("should call destroy on unmount", () => {
      const wrapper = createWrapper();
      const markerClusterer = getMarkerClustererMocks()[0];

      wrapper.unmount();

      expect(markerClusterer.destroy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Debounce Configuration", () => {
    it("should use default debounce delay of 10ms", () => {
      createWrapper();

      expect(createMarkerClustererSpy).toHaveBeenCalledWith(expect.objectContaining({ map: mockMap }), 10);
    });

    it("should use custom renderDebounceDelay when provided", () => {
      mount(MarkerCluster, {
        props: { renderDebounceDelay: 50 },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
          },
        },
      });

      expect(createMarkerClustererSpy).toHaveBeenCalledWith(expect.anything(), 50);
    });
  });
});
