import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import Circle from "../Circle";
import { mockInstances, Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol } from "../../shared";
import { circleEvents } from "../Circle";

describe("Circle Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;

  let createCircleSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.Circle>>;

  let getCircleMocks: () => google.maps.Circle[];

  beforeEach(() => {
    mockApi = google.maps;
    mockMap = new Map(null);

    createCircleSpy = jest.fn();

    google.maps.Circle = class extends google.maps.Circle {
      constructor(...args: ConstructorParameters<typeof google.maps.Circle>) {
        createCircleSpy(...args);
        super(...args);
      }
    };

    getCircleMocks = () => mockInstances.get(google.maps.Circle);
  });

  const createWrapper = (options: google.maps.CircleOptions = {}) => {
    const defaultCenter = { lat: 37.774, lng: -122.414 };
    const defaultRadius = 100;

    return mount(Circle, {
      props: {
        options: { center: defaultCenter, radius: defaultRadius, ...options },
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
    it("should create Circle with map association when all dependencies available", async () => {
      expect(getCircleMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getCircleMocks()).toHaveLength(1);

      // Verify association with map
      expect(createCircleSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
        })
      );
    });

    it("should not create Circle when map is unavailable", async () => {
      expect(getCircleMocks()).toHaveLength(0);

      mount(Circle, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getCircleMocks()).toHaveLength(0);
    });

    it("should not create Circle when api is unavailable", async () => {
      expect(getCircleMocks()).toHaveLength(0);

      mount(Circle, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getCircleMocks()).toHaveLength(0);
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to Circle constructor", async () => {
      const options = {
        center: { lat: 40.7128, lng: -74.006 },
        radius: 500,
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

      expect(createCircleSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });
  });

  describe("Reactive Options", () => {
    it("should call setOptions when props change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const circle = getCircleMocks()[0];

      const options = {
        center: { lat: 45.0, lng: -75.0 },
        radius: 200,
        fillColor: "#00FF00",
      };

      await wrapper.setProps({ options });

      expect(circle.setOptions).toHaveBeenCalledTimes(1);
      expect(circle.setOptions).toHaveBeenCalledWith(options);
    });

    it("should maintain same Circle instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getCircleMocks()).toHaveLength(1);
      const circle = getCircleMocks()[0];

      await wrapper.setProps({
        options: {
          center: { lat: 45.0, lng: -75.0 },
          radius: 300,
        },
      });

      expect(getCircleMocks()).toHaveLength(1);
      expect(getCircleMocks()[0]).toBe(circle);
    });
  });

  describe("Event Forwarding", () => {
    it("should setup listeners for all circle events", async () => {
      createWrapper();
      await nextTick();

      const circle = getCircleMocks()[0];
      const addListener = circle.addListener as jest.Mock;

      expect(addListener).toHaveBeenCalledTimes(circleEvents.length);
      addListener.mock.calls.forEach(([eventType], i) => {
        expect(eventType).toBe(circleEvents[i]);
      });
    });

    it("should emit Vue events when Google Maps events fire", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const circle = getCircleMocks()[0];
      const addListener = circle.addListener as jest.Mock;

      const mockEventData = { type: "test_event" };
      addListener.mock.calls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("Instance Exposure", () => {
    it("should expose Circle instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(wrapper.vm.circle).toBeInstanceOf(google.maps.Circle);
    });
  });

  describe("Cleanup", () => {
    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const circle = getCircleMocks()[0];

      wrapper.unmount();

      expect(circle.setMap).toHaveBeenCalledTimes(1);
      expect(circle.setMap).toHaveBeenCalledWith(null);
    });

    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const circle = getCircleMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(circle);
    });
  });
});
