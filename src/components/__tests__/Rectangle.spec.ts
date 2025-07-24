import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import Rectangle from "../Rectangle";
import { mockInstances, Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol } from "../../shared";
import { rectangleEvents } from "../Rectangle";

describe("Rectangle Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;

  let createRectangleSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.Rectangle>>;

  let getRectangleMocks: () => google.maps.Rectangle[];

  beforeEach(() => {
    mockApi = google.maps;
    mockMap = new Map(null);

    createRectangleSpy = jest.fn();

    google.maps.Rectangle = class extends google.maps.Rectangle {
      constructor(...args: ConstructorParameters<typeof google.maps.Rectangle>) {
        createRectangleSpy(...args);
        super(...args);
      }
    };

    getRectangleMocks = () => mockInstances.get(google.maps.Rectangle);
  });

  const createWrapper = (options: google.maps.RectangleOptions = {}) => {
    const defaultBounds = {
      north: 37.599706,
      south: 37.561031,
      east: -122.325851,
      west: -122.402268,
    };

    return mount(Rectangle, {
      props: {
        options: { bounds: defaultBounds, ...options },
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
    it("should create Rectangle with map association when all dependencies available", async () => {
      expect(getRectangleMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getRectangleMocks()).toHaveLength(1);

      // Verify association with map
      expect(createRectangleSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
        })
      );
    });

    it("should not create Rectangle when map is unavailable", async () => {
      expect(getRectangleMocks()).toHaveLength(0);

      mount(Rectangle, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getRectangleMocks()).toHaveLength(0);
    });

    it("should not create Rectangle when api is unavailable", async () => {
      expect(getRectangleMocks()).toHaveLength(0);

      mount(Rectangle, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getRectangleMocks()).toHaveLength(0);
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to Rectangle constructor", async () => {
      const options = {
        bounds: { north: 40, south: 35, east: -70, west: -75 },
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: true,
        draggable: true,
        editable: false,
        visible: true,
        zIndex: 1,
      };

      createWrapper(options);
      await nextTick();

      expect(createRectangleSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });
  });

  describe("Reactive Options", () => {
    it("should call setOptions when props change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const rectangle = getRectangleMocks()[0];

      const options = {
        bounds: { north: 45, south: 40, east: -65, west: -70 },
        fillColor: "#00FF00",
      };

      await wrapper.setProps({ options });

      expect(rectangle.setOptions).toHaveBeenCalledTimes(1);
      expect(rectangle.setOptions).toHaveBeenCalledWith(options);
    });

    it("should maintain same Rectangle instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getRectangleMocks()).toHaveLength(1);
      const rectangle = getRectangleMocks()[0];

      await wrapper.setProps({
        options: {
          bounds: { north: 45, south: 40, east: -65, west: -70 },
        },
      });

      expect(getRectangleMocks()).toHaveLength(1);
      expect(getRectangleMocks()[0]).toBe(rectangle);
    });
  });

  describe("Event Forwarding", () => {
    it("should setup listeners for all rectangle events", async () => {
      createWrapper();
      await nextTick();

      const rectangle = getRectangleMocks()[0];
      const addListener = rectangle.addListener as jest.Mock;

      expect(addListener).toHaveBeenCalledTimes(rectangleEvents.length);
      addListener.mock.calls.forEach(([eventType], i) => {
        expect(eventType).toBe(rectangleEvents[i]);
      });
    });

    it("should emit Vue events when Google Maps events fire", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const rectangle = getRectangleMocks()[0];
      const addListener = rectangle.addListener as jest.Mock;

      const mockEventData = { type: "test_event" };
      addListener.mock.calls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("Instance Exposure", () => {
    it("should expose Rectangle instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(wrapper.vm.rectangle).toBeInstanceOf(google.maps.Rectangle);
    });
  });

  describe("Cleanup", () => {
    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const rectangle = getRectangleMocks()[0];

      wrapper.unmount();

      expect(rectangle.setMap).toHaveBeenCalledTimes(1);
      expect(rectangle.setMap).toHaveBeenCalledWith(null);
    });

    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const rectangle = getRectangleMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(rectangle);
    });
  });
});
