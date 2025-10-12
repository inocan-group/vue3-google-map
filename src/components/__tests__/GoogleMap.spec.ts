import { mount, flushPromises } from "@vue/test-utils";
import GoogleMap, { mapEvents, __resetOptionsFlag } from "../GoogleMap.vue";
import { mockInstances } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol, mapTilesLoadedSymbol, customMarkerClassSymbol } from "../../shared";
import * as jsApiLoader from "@googlemaps/js-api-loader";
import { inject } from "vue";

jest.mock("@googlemaps/js-api-loader", () => ({
  setOptions: jest.fn(),
  importLibrary: jest.fn(() => Promise.resolve({})),
}));

jest.mock("../../utils", () => ({
  createCustomMarkerClass: jest.fn().mockReturnValue(function MockCustomMarker() {
    return {};
  }),
}));

describe("GoogleMap Component", () => {
  let mockApi: typeof google.maps;
  let mockSetOptions: jest.Mock;
  let mockImportLibrary: jest.Mock;
  let createMapSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.Map>>;

  let getMapMocks: () => google.maps.Map[];

  beforeEach(() => {
    mockSetOptions = jsApiLoader.setOptions as jest.Mock;
    mockImportLibrary = jsApiLoader.importLibrary as jest.Mock;

    // Clear mocks
    mockSetOptions.mockClear();
    mockImportLibrary.mockClear();

    // Reset options flag for fresh environment
    __resetOptionsFlag();

    mockApi = google.maps;

    createMapSpy = jest.fn();

    google.maps.Map = class extends google.maps.Map {
      constructor(...args: ConstructorParameters<typeof google.maps.Map>) {
        createMapSpy(...args);
        super(...args);
      }
    };

    getMapMocks = () => mockInstances.get(google.maps.Map);
  });

  const createWrapper = (props: any = {}) => {
    const defaultProps = {
      apiKey: "test-api-key",
      center: { lat: 37.774, lng: -122.414 },
      zoom: 8,
    };

    return mount(GoogleMap, {
      props: {
        ...defaultProps,
        ...props,
      },
      slots: {
        // eslint-disable-next-line quotes
        default: '<div class="map-child">Map Child Content</div>',
      },
    });
  };

  const createWrapperWithApiPromise = (props: any = {}) => {
    const mockApiPromise = Promise.resolve(google);
    return createWrapper({
      apiPromise: mockApiPromise,
      ...props,
    });
  };

  describe("Instance Creation", () => {
    it("should create Map when loader resolves successfully", async () => {
      createWrapper();

      await flushPromises();

      expect(getMapMocks()).toHaveLength(1);
    });

    it("should create Map when apiPromise is provided", async () => {
      createWrapperWithApiPromise();

      await flushPromises();

      expect(getMapMocks()).toHaveLength(1);
    });

    it("should call setOptions with correct parameters", async () => {
      const props = {
        apiKey: "custom-api-key",
        version: "3.55",
        libraries: ["places", "geometry"],
        region: "US",
        language: "en",
      };

      createWrapper(props);

      expect(mockSetOptions).toHaveBeenCalledWith({
        key: "custom-api-key",
        v: "3.55",
        libraries: ["places", "geometry"],
        region: "US",
        language: "en",
      });
    });

    it("should not call setOptions or importLibrary when apiPromise is provided", async () => {
      createWrapperWithApiPromise();

      expect(mockSetOptions).not.toHaveBeenCalled();
      expect(mockImportLibrary).not.toHaveBeenCalled();
    });
  });

  describe("Options Mapping", () => {
    it("should pass props to Map constructor as options", async () => {
      const options = {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 12,
        mapTypeId: "satellite",
        disableDefaultUi: true, // Prop uses lowercase 'i'
        zoomControl: false,
        scrollwheel: false,
      };

      createWrapper(options);
      await flushPromises();

      expect(createMapSpy).toHaveBeenCalledTimes(1);
      expect(createMapSpy).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          center: { lat: 40.7128, lng: -74.006 },
          zoom: 12,
          mapTypeId: "satellite",
          disableDefaultUI: true, // This gets mapped from disableDefaultUi prop
          zoomControl: false,
          scrollwheel: false,
        })
      );
    });

    it("should handle control position options correctly", async () => {
      createWrapper({
        zoomControlPosition: "TOP_RIGHT",
        fullscreenControlPosition: "TOP_LEFT",
      });

      await flushPromises();

      expect(createMapSpy).toHaveBeenCalledTimes(1);
      expect(createMapSpy).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          zoomControlOptions: { position: google.maps.ControlPosition.TOP_RIGHT },
          fullscreenControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
        })
      );
    });

    it("should strip undefined values from options", async () => {
      createWrapper({
        center: { lat: 37.774, lng: -122.414 },
        zoom: 8,
        draggable: undefined,
        scrollwheel: undefined,
      });

      await flushPromises();

      expect(createMapSpy).toHaveBeenCalledTimes(1);

      const constructorOptions = createMapSpy.mock.calls[0][1];
      expect(constructorOptions).toHaveProperty("center", { lat: 37.774, lng: -122.414 });
      expect(constructorOptions).toHaveProperty("zoom", 8);
      expect(constructorOptions).not.toHaveProperty("draggable");
      expect(constructorOptions).not.toHaveProperty("scrollwheel");
    });
  });

  describe("Reactive Options", () => {
    it("should update map options when props change", async () => {
      const wrapper = createWrapper({
        center: { lat: 37.774, lng: -122.414 },
        zoom: 8,
      });

      await flushPromises();

      const map = getMapMocks()[0];

      await wrapper.setProps({
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 12,
        draggable: false,
      });

      expect(map.setOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          draggable: false,
        })
      );
      expect(map.setZoom).toHaveBeenCalledWith(12);
      expect(map.panTo).toHaveBeenCalledWith({ lat: 40.7128, lng: -74.006 });
    });

    it("should not update center when coordinates are the same", async () => {
      const center = { lat: 37.774, lng: -122.414 };
      const wrapper = createWrapper({ center });

      await flushPromises();

      const map = getMapMocks()[0];

      await wrapper.setProps({ center });

      expect(map.panTo).not.toHaveBeenCalled();
    });

    it("should not update zoom when value is the same or is undefined", async () => {
      const wrapper = createWrapper({ zoom: 8 });

      await flushPromises();

      const map = getMapMocks()[0];

      await wrapper.setProps({ zoom: 8 });
      expect(map.setZoom).not.toHaveBeenCalled();

      await wrapper.setProps({ zoom: undefined });
      expect(map.setZoom).not.toHaveBeenCalled();
    });
  });

  describe("Event Forwarding", () => {
    it("should setup listeners for all map events", async () => {
      createWrapper();

      await flushPromises();

      const map = getMapMocks()[0];
      const addListener = map.addListener as jest.Mock;

      expect(addListener).toHaveBeenCalledTimes(mapEvents.length);
      addListener.mock.calls.forEach(([eventType], i) => {
        expect(eventType).toBe(mapEvents[i]);
      });
    });

    it("should emit Vue events when Google Maps events fire", async () => {
      const wrapper = createWrapper();

      await flushPromises();

      const map = getMapMocks()[0];
      const addListener = map.addListener as jest.Mock;

      const mockEventData = { type: "test_event" };
      addListener.mock.calls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("Provider Functionality", () => {
    it("should provide map, api, and mapTilesLoaded to child components", async () => {
      let providedMap: any;
      let providedApi: any;
      let providedMapTilesLoaded: any;

      const ChildComponent = {
        setup() {
          providedMap = inject(mapSymbol);
          providedApi = inject(apiSymbol);
          providedMapTilesLoaded = inject(mapTilesLoadedSymbol);
          return {};
        },
        template: "<div>Child</div>",
      };

      mount(GoogleMap, {
        props: {
          apiPromise: Promise.resolve(google),
          center: { lat: 37.774, lng: -122.414 },
          zoom: 8,
        },
        slots: {
          default: ChildComponent,
        },
      });

      await flushPromises();

      expect(providedMap.value).toBeInstanceOf(google.maps.Map);
      expect(providedApi.value).toBe(google.maps);
      expect(providedMapTilesLoaded.value).toBeDefined();
    });
  });

  describe("CustomMarker Integration", () => {
    it("should attach CustomMarker class to api object", async () => {
      createWrapper();

      await flushPromises();

      expect(mockApi[customMarkerClassSymbol]).toBeInstanceOf(Function);
    });
  });

  describe("Tiles Loaded Tracking", () => {
    it("should set mapTilesLoaded to true when tilesloaded event fires", async () => {
      const wrapper = createWrapper();

      await flushPromises();

      expect(wrapper.vm.mapTilesLoaded).toBe(false);

      const addListenerOnce = mockApi.event.addListenerOnce as jest.Mock;
      const tilesloadedCall = addListenerOnce.mock.calls.find((call) => call[1] === "tilesloaded");
      expect(tilesloadedCall).toBeDefined();

      const tilesloadedListener = tilesloadedCall[2];
      tilesloadedListener();

      expect(wrapper.vm.mapTilesLoaded).toBe(true);
    });
  });

  describe("Library Loading", () => {
    it("should load with default libraries", async () => {
      createWrapper();

      expect(mockSetOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          libraries: ["places", "marker"],
        })
      );

      expect(mockImportLibrary).toHaveBeenCalledWith("places");
      expect(mockImportLibrary).toHaveBeenCalledWith("marker");
      expect(mockImportLibrary).toHaveBeenCalledTimes(2);
    });

    it("should load with custom libraries when provided", async () => {
      createWrapper({
        libraries: ["geometry", "visualization"],
      });

      expect(mockSetOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          libraries: ["geometry", "visualization"],
        })
      );

      expect(mockImportLibrary).toHaveBeenCalledWith("geometry");
      expect(mockImportLibrary).toHaveBeenCalledWith("visualization");
      expect(mockImportLibrary).toHaveBeenCalledTimes(2);
    });
  });

  describe("Instance Exposure", () => {
    it("should expose map, api, ready, and mapTilesLoaded via component instance", async () => {
      const wrapper = createWrapper();

      await flushPromises();

      expect(wrapper.vm.map).toBeInstanceOf(google.maps.Map);
      expect(wrapper.vm.api).toBe(google.maps);
      expect(wrapper.vm.ready).toBe(true);
      expect(wrapper.vm.mapTilesLoaded).toBeDefined();
    });
  });

  describe("Cleanup", () => {
    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();

      await flushPromises();

      const map = getMapMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(map);
    });

    it("should reset mapTilesLoaded on unmount", async () => {
      const wrapper = createWrapper();

      await flushPromises();

      wrapper.vm.mapTilesLoaded = true;

      wrapper.unmount();

      expect(wrapper.vm.mapTilesLoaded).toBe(false);
    });
  });
});
