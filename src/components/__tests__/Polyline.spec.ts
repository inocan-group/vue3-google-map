import { mount } from "@vue/test-utils";
import { nextTick, reactive, ref } from "vue";
import Polyline from "../Polyline";
import { mockInstances, Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol, polylineEvents } from "../../shared";

describe("Polyline Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;

  let createPolylineSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.Polyline>>;

  let getPolylineMocks: () => google.maps.Polyline[];

  beforeEach(() => {
    mockApi = google.maps;
    mockMap = new Map(null);

    createPolylineSpy = jest.fn();

    google.maps.Polyline = class extends google.maps.Polyline {
      constructor(...args: ConstructorParameters<typeof google.maps.Polyline>) {
        createPolylineSpy(...args);
        super(...args);
      }
    };

    getPolylineMocks = () => mockInstances.get(google.maps.Polyline);
  });

  const createWrapper = (options: google.maps.PolylineOptions = {}) => {
    const defaultPath = [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ];

    return mount(Polyline, {
      props: {
        options: { path: defaultPath, ...options },
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
    it("should create Polyline with map association when all dependencies available", async () => {
      expect(getPolylineMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getPolylineMocks()).toHaveLength(1);

      // Verify association with map
      expect(createPolylineSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
        })
      );
    });

    it("should not create Polyline when map is unavailable", async () => {
      expect(getPolylineMocks()).toHaveLength(0);

      mount(Polyline, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getPolylineMocks()).toHaveLength(0);
    });

    it("should not create Polyline when api is unavailable", async () => {
      expect(getPolylineMocks()).toHaveLength(0);

      mount(Polyline, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getPolylineMocks()).toHaveLength(0);
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to Polyline constructor", async () => {
      const options = {
        path: [
          { lat: 37.75, lng: -122.45 },
          { lat: 37.76, lng: -122.46 },
          { lat: 37.77, lng: -122.47 },
        ],
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickable: true,
        draggable: true,
        editable: false,
        visible: true,
        zIndex: 1,
      };

      createWrapper(options);
      await nextTick();

      expect(createPolylineSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });
  });

  describe("Reactive Options", () => {
    it("should call setOptions when props change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const polyline = getPolylineMocks()[0];

      const options = {
        path: [
          { lat: 40.748, lng: -73.986 },
          { lat: 40.749, lng: -73.987 },
          { lat: 40.75, lng: -73.988 },
        ],
        strokeColor: "#00FF00",
      };

      await wrapper.setProps({ options });

      expect(polyline.setOptions).toHaveBeenCalledTimes(1);
      expect(polyline.setOptions).toHaveBeenCalledWith(options);
    });

    // Regression test for https://github.com/inocan-group/vue3-google-map/issues/242
    // A nested array is mutated in place and the options object is handed back
    // still referencing that same (now-mutated) array. Shallow change detection
    // misses this because the old and new values share the mutated reference.
    it("should call setOptions when a nested option is mutated in place (deep reactivity)", async () => {
      const path = [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
      ];

      const wrapper = mount(Polyline, {
        props: { options: { path, geodesic: true } },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      const polyline = getPolylineMocks()[0];

      path.push({ lat: -18.142, lng: 178.431 });
      await wrapper.setProps({ options: { path, geodesic: true } });

      expect(polyline.setOptions).toHaveBeenCalledTimes(1);
      expect(polyline.setOptions).toHaveBeenCalledWith(expect.objectContaining({ path }));
    });

    // Unlike the test above, this never re-assigns the prop: the reactive options
    // object is mutated in place and the watcher must fire on its own. This pins
    // the watcher's `deep: true` (the setProps-based tests fire the watcher via
    // the prop reference change and would pass without it).
    it("should call setOptions when a reactive options object is mutated in place without reassignment (deep reactivity)", async () => {
      const options = reactive({
        path: [
          { lat: 37.772, lng: -122.214 },
          { lat: 21.291, lng: -157.821 },
        ],
        geodesic: true,
      });

      mount(Polyline, {
        props: { options },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      const polyline = getPolylineMocks()[0];

      options.path.push({ lat: -18.142, lng: 178.431 });
      await nextTick();

      expect(polyline.setOptions).toHaveBeenCalledTimes(1);
    });

    // Guards the dedup optimization: a parent re-render that passes a fresh-but-
    // structurally-identical options object (e.g. an inline `:options="{...}"`
    // literal) must NOT trigger a redundant setOptions.
    it("should not call setOptions when a new but deeply-equal options object is passed (dedup)", async () => {
      const wrapper = mount(Polyline, {
        props: { options: { path: [{ lat: 37.772, lng: -122.214 }], geodesic: true } },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      const polyline = getPolylineMocks()[0];

      await wrapper.setProps({ options: { path: [{ lat: 37.772, lng: -122.214 }], geodesic: true } });

      expect(polyline.setOptions).not.toHaveBeenCalled();
    });

    it("should maintain same Polyline instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getPolylineMocks()).toHaveLength(1);
      const polyline = getPolylineMocks()[0];

      await wrapper.setProps({
        options: {
          path: [
            { lat: 45.0, lng: -75.0 },
            { lat: 45.1, lng: -75.1 },
            { lat: 45.2, lng: -75.2 },
          ],
        },
      });

      expect(getPolylineMocks()).toHaveLength(1);
      expect(getPolylineMocks()[0]).toBe(polyline);
    });
  });

  describe("Event Forwarding", () => {
    it("should setup listeners for all polyline events", async () => {
      createWrapper();
      await nextTick();

      const polyline = getPolylineMocks()[0];
      const addListener = polyline.addListener as jest.Mock;

      expect(addListener).toHaveBeenCalledTimes(polylineEvents.length);
      addListener.mock.calls.forEach(([eventType], i) => {
        expect(eventType).toBe(polylineEvents[i]);
      });
    });

    it("should emit Vue events when Google Maps events fire", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const polyline = getPolylineMocks()[0];
      const addListener = polyline.addListener as jest.Mock;

      const mockEventData = { type: "test_event" };
      addListener.mock.calls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("Instance Exposure", () => {
    it("should expose Polyline instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(wrapper.vm.polyline).toBeInstanceOf(google.maps.Polyline);
    });
  });

  describe("Cleanup", () => {
    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const polyline = getPolylineMocks()[0];

      wrapper.unmount();

      expect(polyline.setMap).toHaveBeenCalledTimes(1);
      expect(polyline.setMap).toHaveBeenCalledWith(null);
    });

    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const polyline = getPolylineMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(polyline);
    });
  });
});
