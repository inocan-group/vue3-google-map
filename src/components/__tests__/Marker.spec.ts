import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import Marker, { markerEvents, type IMarkerExposed } from "../Marker";
import { mockInstances, Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol, markerClusterSymbol } from "../../shared";
import { type MarkerClusterer } from "@googlemaps/markerclusterer";

describe("Marker Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;

  let createMarkerSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.Marker>>;

  let getMarkerMocks: () => google.maps.Marker[];

  beforeEach(() => {
    mockApi = google.maps;
    mockMap = new Map(null);

    createMarkerSpy = jest.fn();

    google.maps.Marker = class extends google.maps.Marker {
      constructor(...args: ConstructorParameters<typeof google.maps.Marker>) {
        createMarkerSpy(...args);
        super(...args);
      }
    };

    getMarkerMocks = () => mockInstances.get(google.maps.Marker);
  });

  const createWrapper = (options: google.maps.MarkerOptions = {}) => {
    const defaultPosition = { lat: 37.774, lng: -122.414 };

    return mount(Marker, {
      props: {
        options: { position: defaultPosition, ...options },
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
    it("should create Marker with map association when all dependencies available", async () => {
      expect(getMarkerMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getMarkerMocks()).toHaveLength(1);

      const marker = getMarkerMocks()[0];
      expect(marker.setMap).toHaveBeenCalledWith(mockMap);
    });

    it("should not create Marker when map is unavailable", async () => {
      expect(getMarkerMocks()).toHaveLength(0);

      mount(Marker, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getMarkerMocks()).toHaveLength(0);
    });

    it("should not create Marker when api is unavailable", async () => {
      expect(getMarkerMocks()).toHaveLength(0);

      mount(Marker, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getMarkerMocks()).toHaveLength(0);
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to Marker constructor", async () => {
      const options = {
        position: { lat: 40.7128, lng: -74.006 },
        title: "New York City",
        label: "NYC",
        clickable: true,
        draggable: true,
        visible: true,
        zIndex: 1,
      };

      createWrapper(options);
      await nextTick();

      expect(createMarkerSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });
  });

  describe("Reactive Options", () => {
    it("should call setOptions when props change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const marker = getMarkerMocks()[0];

      const options = {
        position: { lat: 45.0, lng: -75.0 },
        title: "Montreal",
        draggable: true,
      };

      await wrapper.setProps({ options });

      expect(marker.setOptions).toHaveBeenCalledTimes(1);
      expect(marker.setOptions).toHaveBeenCalledWith(options);
    });

    it("should maintain same Marker instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getMarkerMocks()).toHaveLength(1);
      const marker = getMarkerMocks()[0];

      await wrapper.setProps({
        options: {
          position: { lat: 45.0, lng: -75.0 },
          title: "Updated Title",
        },
      });

      expect(getMarkerMocks()).toHaveLength(1);
      expect(getMarkerMocks()[0]).toBe(marker);
    });
  });

  describe("Event Forwarding", () => {
    it("should setup listeners for all marker events", async () => {
      createWrapper();
      await nextTick();

      const marker = getMarkerMocks()[0];
      const addListener = marker.addListener as jest.Mock;

      expect(addListener).toHaveBeenCalledTimes(markerEvents.length);
      addListener.mock.calls.forEach(([eventType], i) => {
        expect(eventType).toBe(markerEvents[i]);
      });
    });

    it("should emit Vue events when Google Maps events fire", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const marker = getMarkerMocks()[0];
      const addListener = marker.addListener as jest.Mock;

      const mockEventData = { type: "test_event" };
      addListener.mock.calls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("Instance Exposure", () => {
    it("should expose Marker instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect((wrapper.vm as unknown as IMarkerExposed).marker).toBeInstanceOf(google.maps.Marker);
    });
  });

  describe("Marker Cluster Integration", () => {
    let mockMarkerCluster: Pick<MarkerClusterer, "addMarker" | "removeMarker">;

    beforeEach(() => {
      mockMarkerCluster = {
        addMarker: jest.fn(),
        removeMarker: jest.fn(),
      };
    });

    const createWrapperWithCluster = (options: google.maps.MarkerOptions = {}) => {
      const defaultPosition = { lat: 37.774, lng: -122.414 };

      return mount(Marker, {
        props: {
          options: { position: defaultPosition, ...options },
        },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
            [markerClusterSymbol]: ref(mockMarkerCluster),
          },
        },
      });
    };

    it("should add marker to cluster instead of map when cluster is provided", async () => {
      createWrapperWithCluster();
      await nextTick();

      const marker = getMarkerMocks()[0];

      expect(mockMarkerCluster.addMarker).toHaveBeenCalledWith(marker);
      expect(marker.setMap).not.toHaveBeenCalledWith(mockMap);
      expect(createMarkerSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
        })
      );
    });

    it("should remove and re-add marker to cluster when options change", async () => {
      const wrapper = createWrapperWithCluster();
      await nextTick();

      const marker = getMarkerMocks()[0];

      await wrapper.setProps({
        options: {
          position: { lat: 45.0, lng: -75.0 },
          title: "Updated Title",
        },
      });

      expect(mockMarkerCluster.removeMarker).toHaveBeenCalledWith(marker);
      expect(mockMarkerCluster.addMarker).toHaveBeenCalledWith(marker);
    });

    it("should remove marker from cluster on unmount", async () => {
      const wrapper = createWrapperWithCluster();
      await nextTick();

      const marker = getMarkerMocks()[0];

      wrapper.unmount();

      expect(mockMarkerCluster.removeMarker).toHaveBeenCalledWith(marker);
    });
  });

  describe("Cleanup", () => {
    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const marker = getMarkerMocks()[0];

      wrapper.unmount();

      expect(marker.setMap).toHaveBeenCalledTimes(2);
      expect(marker.setMap).toHaveBeenNthCalledWith(1, mockMap);
      expect(marker.setMap).toHaveBeenNthCalledWith(2, null);
    });

    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const marker = getMarkerMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(marker);
    });
  });
});
