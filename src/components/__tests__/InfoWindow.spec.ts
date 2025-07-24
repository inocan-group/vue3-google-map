import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import InfoWindow, { infoWindowEvents } from "../InfoWindow.vue";
import Marker from "../Marker";
import AdvancedMarker from "../AdvancedMarker.vue";
import { mockInstances, Map, AdvancedMarkerElement } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol, markerSymbol } from "../../shared";

describe("InfoWindow Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;

  let createInfoWindowSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.InfoWindow>>;

  let getInfoWindowMocks: () => google.maps.InfoWindow[];

  beforeEach(() => {
    mockApi = google.maps;
    mockMap = new Map(null);

    createInfoWindowSpy = jest.fn();

    google.maps.InfoWindow = class extends google.maps.InfoWindow {
      constructor(...args: ConstructorParameters<typeof google.maps.InfoWindow>) {
        createInfoWindowSpy(...args);
        super(...args);
      }
    };

    getInfoWindowMocks = () => mockInstances.get(google.maps.InfoWindow);
  });

  const createWrapper = (
    options: google.maps.InfoWindowOptions = {},
    modelValue?: boolean,
    customMarker?: AdvancedMarkerElement
  ) => {
    const wrapperOptions = {
      props: {
        options,
        ...(modelValue !== undefined && { modelValue }),
      },
      global: {
        provide: {
          [mapSymbol]: ref(mockMap),
          [apiSymbol]: ref(mockApi),
          ...(customMarker && { [markerSymbol]: ref(customMarker) }),
        },
      },
    };

    return mount(InfoWindow, wrapperOptions);
  };

  describe("Instance Creation", () => {
    it("should create InfoWindow when all dependencies available", async () => {
      expect(getInfoWindowMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getInfoWindowMocks()).toHaveLength(1);

      // Verify association with map through open call
      const infoWindow = getInfoWindowMocks()[0];
      expect(infoWindow.open).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
        })
      );
    });

    it("should use slot content when provided", async () => {
      mount(InfoWindow, {
        props: {
          options: { content: "Options content" },
        },
        slots: {
          // eslint-disable-next-line quotes
          default: '<div class="custom-content">Slot content</div>',
        },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
          },
        },
      });

      await nextTick();

      // Should use HTMLElement from slot, not options.content
      expect(createInfoWindowSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.any(HTMLElement),
        })
      );
    });

    it("should use options.content when no slot provided", async () => {
      const content = "Options content string";
      createWrapper({ content });
      await nextTick();

      expect(createInfoWindowSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          content: content,
        })
      );
    });

    it("should not create InfoWindow when map is unavailable", async () => {
      expect(getInfoWindowMocks()).toHaveLength(0);

      mount(InfoWindow, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getInfoWindowMocks()).toHaveLength(0);
    });

    it("should not create InfoWindow when api is unavailable", async () => {
      expect(getInfoWindowMocks()).toHaveLength(0);

      mount(InfoWindow, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getInfoWindowMocks()).toHaveLength(0);
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to InfoWindow constructor", async () => {
      const options = {
        position: { lat: 40.7128, lng: -74.006 },
        pixelOffset: new google.maps.Size(0, -30),
        maxWidth: 200,
        disableAutoPan: false,
        zIndex: 1,
      };

      createWrapper(options);
      await nextTick();

      expect(createInfoWindowSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          position: options.position,
          pixelOffset: options.pixelOffset,
          maxWidth: options.maxWidth,
          disableAutoPan: options.disableAutoPan,
          zIndex: options.zIndex,
        })
      );
    });
  });

  describe("Reactive Options", () => {
    it("should call setOptions when props change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const infoWindow = getInfoWindowMocks()[0];

      const options = {
        position: { lat: 45.0, lng: -75.0 },
        maxWidth: 300,
      };

      await wrapper.setProps({ options });

      expect(infoWindow.setOptions).toHaveBeenCalledTimes(1);
      expect(infoWindow.setOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          position: options.position,
          maxWidth: options.maxWidth,
        })
      );
    });

    it("should maintain same InfoWindow instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getInfoWindowMocks()).toHaveLength(1);
      const infoWindow = getInfoWindowMocks()[0];

      await wrapper.setProps({
        options: {
          position: { lat: 45.0, lng: -75.0 },
        },
      });

      expect(getInfoWindowMocks()).toHaveLength(1);
      expect(getInfoWindowMocks()[0]).toBe(infoWindow);
    });
  });

  describe("Event Forwarding", () => {
    it("should setup listeners for all infoWindow events", async () => {
      createWrapper();
      await nextTick();

      const infoWindow = getInfoWindowMocks()[0];
      const addListener = infoWindow.addListener as jest.Mock;

      // InfoWindow sets up listeners for events + closeclick (for v-model)
      expect(addListener).toHaveBeenCalledTimes(infoWindowEvents.length + 1);

      // Verify the standard events are set up correctly (ignoring the extra closeclick for v-model)
      addListener.mock.calls.slice(0, -1).forEach(([eventType], i) => {
        expect(eventType).toBe(infoWindowEvents[i]);
      });
    });

    it("should emit Vue events when Google Maps events fire", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const infoWindow = getInfoWindowMocks()[0];
      const addListener = infoWindow.addListener as jest.Mock;

      // Test only the standard events (not the extra closeclick for v-model)
      const standardEventCalls = addListener.mock.calls.filter(([eventType]) => infoWindowEvents.includes(eventType));

      const mockEventData = { type: "test_event" };
      standardEventCalls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("v-model Support", () => {
    it("should open InfoWindow when modelValue is true", async () => {
      createWrapper({}, true);
      await nextTick();

      const infoWindow = getInfoWindowMocks()[0];
      expect(infoWindow.open).toHaveBeenCalled();
    });

    it("should emit update:modelValue when InfoWindow closes", async () => {
      const wrapper = createWrapper({}, true);
      await nextTick();

      const infoWindow = getInfoWindowMocks()[0];
      const addListener = infoWindow.addListener as jest.Mock;

      // Find all closeclick listeners - there should be 2 (event forwarding + v-model)
      const closeClickCalls = addListener.mock.calls.filter(([eventType]) => eventType === "closeclick");
      expect(closeClickCalls).toHaveLength(2);

      // Trigger the v-model closeclick listener (the second one)
      closeClickCalls[1][1]();
      await nextTick();

      // Verify close emission (opening behavior is tested elsewhere)
      const emissions = wrapper.emitted("update:modelValue");
      expect(emissions?.at(-1)).toEqual([false]);
    });
  });

  describe("Anchor Integration", () => {
    it("should integrate with parent Marker component", async () => {
      mount(
        {
          template: `
          <Marker :options="{ position: { lat: 37.774, lng: -122.414 } }">
            <InfoWindow :options="{ content: 'Nested content' }" />
          </Marker>
        `,
          components: { Marker, InfoWindow },
        },
        {
          global: {
            provide: {
              [mapSymbol]: ref(mockMap),
              [apiSymbol]: ref(mockApi),
            },
          },
        }
      );

      await nextTick();

      const markers = mockInstances.get(google.maps.Marker);
      const infoWindows = getInfoWindowMocks();

      expect(markers).toHaveLength(1);
      expect(infoWindows).toHaveLength(1);

      const marker = markers[0];
      const infoWindow = infoWindows[0];

      const markerAddListenerCalls = (marker.addListener as jest.Mock).mock.calls;
      const markerClickListeners = markerAddListenerCalls.filter(([eventType]) => eventType === "click");
      expect(markerClickListeners).toHaveLength(2);

      // When anchor is present, InfoWindow doesn't open immediately
      expect(infoWindow.open).not.toHaveBeenCalled();

      // Simulate marker click to open InfoWindow
      markerClickListeners[1][1](); // Trigger the InfoWindow click listener
      expect(infoWindow.open).toHaveBeenCalledTimes(1);
      expect(infoWindow.open).toHaveBeenCalledWith(
        expect.objectContaining({
          anchor: marker,
        })
      );
    });

    it("should integrate with parent AdvancedMarker component", async () => {
      mount(
        {
          template: `
          <AdvancedMarker :options="{ position: { lat: 37.774, lng: -122.414 } }">
            <InfoWindow :options="{ content: 'Nested content' }" />
          </AdvancedMarker>
        `,
          components: { AdvancedMarker, InfoWindow },
        },
        {
          global: {
            provide: {
              [mapSymbol]: ref(mockMap),
              [apiSymbol]: ref(mockApi),
            },
          },
        }
      );

      await nextTick();

      const advancedMarkers = mockInstances.get(google.maps.marker.AdvancedMarkerElement);
      const infoWindows = getInfoWindowMocks();

      expect(advancedMarkers).toHaveLength(1);
      expect(infoWindows).toHaveLength(1);

      const advancedMarker = advancedMarkers[0];
      const infoWindow = infoWindows[0];

      const advancedMarkerAddListenerCalls = (advancedMarker.addListener as jest.Mock).mock.calls;
      const advancedMarkerClickListeners = advancedMarkerAddListenerCalls.filter(
        ([eventType]) => eventType === "click"
      );
      expect(advancedMarkerClickListeners).toHaveLength(2);

      // When anchor is present, InfoWindow doesn't open immediately
      expect(infoWindow.open).not.toHaveBeenCalled();

      // Simulate marker click to open InfoWindow
      advancedMarkerClickListeners[1][1](); // Trigger the InfoWindow click listener
      expect(infoWindow.open).toHaveBeenCalledTimes(1);
      expect(infoWindow.open).toHaveBeenCalledWith(
        expect.objectContaining({
          anchor: advancedMarker,
        })
      );
    });
  });

  describe("Instance Exposure", () => {
    it("should expose InfoWindow instance and methods via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(wrapper.vm.infoWindow).toBeInstanceOf(google.maps.InfoWindow);
      expect(typeof wrapper.vm.open).toBe("function");
      expect(typeof wrapper.vm.close).toBe("function");
    });
  });

  describe("Cleanup", () => {
    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const infoWindow = getInfoWindowMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(infoWindow);
    });

    it("should remove anchor click listener on unmount", async () => {
      const mockMarker = new AdvancedMarkerElement({ position: { lat: 37.774, lng: -122.414 } });
      const wrapper = createWrapper({}, undefined, mockMarker);
      await nextTick();

      // Mock the remove method on the listener
      const mockListener = { remove: jest.fn() };
      (mockMarker.addListener as jest.Mock).mockReturnValue(mockListener);

      // Remount to get the listener with remove method
      wrapper.unmount();
      const newWrapper = createWrapper({}, undefined, mockMarker);
      await nextTick();

      newWrapper.unmount();

      expect(mockListener.remove).toHaveBeenCalled();
    });
  });
});
