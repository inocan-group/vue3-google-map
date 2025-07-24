import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import Polygon from "../Polygon";
import { mockInstances, Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol, polylineEvents as polygonEvents } from "../../shared";

describe("Polygon Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;

  let createPolygonSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.Polygon>>;

  let getPolygonMocks: () => google.maps.Polygon[];

  beforeEach(() => {
    mockApi = google.maps;
    mockMap = new Map(null);

    createPolygonSpy = jest.fn();

    google.maps.Polygon = class extends google.maps.Polygon {
      constructor(...args: ConstructorParameters<typeof google.maps.Polygon>) {
        createPolygonSpy(...args);
        super(...args);
      }
    };

    getPolygonMocks = () => mockInstances.get(google.maps.Polygon);
  });

  const createWrapper = (options: google.maps.PolygonOptions = {}) => {
    const defaultPaths = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 },
    ];

    return mount(Polygon, {
      props: {
        options: { paths: defaultPaths, ...options },
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
    it("should create Polygon with map association when all dependencies available", async () => {
      expect(getPolygonMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getPolygonMocks()).toHaveLength(1);

      // Verify association with map
      expect(createPolygonSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
        })
      );
    });

    it("should not create Polygon when map is unavailable", async () => {
      expect(getPolygonMocks()).toHaveLength(0);

      mount(Polygon, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getPolygonMocks()).toHaveLength(0);
    });

    it("should not create Polygon when api is unavailable", async () => {
      expect(getPolygonMocks()).toHaveLength(0);

      mount(Polygon, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getPolygonMocks()).toHaveLength(0);
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to Polygon constructor", async () => {
      const options = {
        paths: [
          { lat: 37.782, lng: -122.447 },
          { lat: 37.782, lng: -122.443 },
          { lat: 37.785, lng: -122.443 },
          { lat: 37.785, lng: -122.447 },
        ],
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

      expect(createPolygonSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });
  });

  describe("Reactive Options", () => {
    it("should call setOptions when props change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const polygon = getPolygonMocks()[0];

      const options = {
        paths: [
          { lat: 40.748, lng: -73.986 },
          { lat: 40.748, lng: -73.982 },
          { lat: 40.751, lng: -73.982 },
          { lat: 40.751, lng: -73.986 },
        ],
        fillColor: "#00FF00",
      };

      await wrapper.setProps({ options });

      expect(polygon.setOptions).toHaveBeenCalledTimes(1);
      expect(polygon.setOptions).toHaveBeenCalledWith(options);
    });

    it("should maintain same Polygon instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getPolygonMocks()).toHaveLength(1);
      const polygon = getPolygonMocks()[0];

      await wrapper.setProps({
        options: {
          paths: [
            { lat: 45.0, lng: -75.0 },
            { lat: 45.0, lng: -74.0 },
            { lat: 46.0, lng: -74.0 },
            { lat: 46.0, lng: -75.0 },
          ],
        },
      });

      expect(getPolygonMocks()).toHaveLength(1);
      expect(getPolygonMocks()[0]).toBe(polygon);
    });
  });

  describe("Event Forwarding", () => {
    it("should setup listeners for all polygon events", async () => {
      createWrapper();
      await nextTick();

      const polygon = getPolygonMocks()[0];
      const addListener = polygon.addListener as jest.Mock;

      expect(addListener).toHaveBeenCalledTimes(polygonEvents.length);
      addListener.mock.calls.forEach(([eventType], i) => {
        expect(eventType).toBe(polygonEvents[i]);
      });
    });

    it("should emit Vue events when Google Maps events fire", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const polygon = getPolygonMocks()[0];
      const addListener = polygon.addListener as jest.Mock;

      const mockEventData = { type: "test_event" };
      addListener.mock.calls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("Instance Exposure", () => {
    it("should expose Polygon instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(wrapper.vm.polygon).toBeInstanceOf(google.maps.Polygon);
    });
  });

  describe("Cleanup", () => {
    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const polygon = getPolygonMocks()[0];

      wrapper.unmount();

      expect(polygon.setMap).toHaveBeenCalledTimes(1);
      expect(polygon.setMap).toHaveBeenCalledWith(null);
    });

    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const polygon = getPolygonMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(polygon);
    });
  });
});
