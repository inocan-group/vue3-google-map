import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import HeatmapLayer from "../HeatmapLayer";
import { Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol } from "../../shared";

// Mock registry
let mockHeatmapLayerInstances: any[] = [];

describe("HeatmapLayer Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;
  let createHeatmapLayerSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.visualization.HeatmapLayer>>;

  beforeEach(() => {
    // Reset mocks before each test
    mockHeatmapLayerInstances = [];

    mockApi = google.maps;
    mockMap = new Map(null);

    createHeatmapLayerSpy = jest.fn();

    // Create a clean mock for HeatmapLayer since jest-mocks doesn't include visualization
    class MockHeatmapLayer {
      setOptions = jest.fn();
      setMap = jest.fn();

      constructor(options: google.maps.visualization.HeatmapLayerOptions) {
        Object.assign(this, options);
        mockHeatmapLayerInstances.push(this);
      }
    }

    // Mock the visualization namespace
    mockApi.visualization = {
      HeatmapLayer: MockHeatmapLayer,
    } as any;

    // Extend with constructor spy
    (mockApi.visualization.HeatmapLayer as any) = class extends MockHeatmapLayer {
      constructor(options: google.maps.visualization.HeatmapLayerOptions) {
        createHeatmapLayerSpy(options);
        super(options);
      }
    };
  });

  const getHeatmapLayerMocks = () => mockHeatmapLayerInstances;

  const createWrapper = (options: any = {}) => {
    return mount(HeatmapLayer, {
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
    it("should create HeatmapLayer with map association when all dependencies available", async () => {
      expect(getHeatmapLayerMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getHeatmapLayerMocks()).toHaveLength(1);

      // Verify HeatmapLayer created with map
      expect(createHeatmapLayerSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          map: mockMap,
        })
      );
    });

    it("should not create HeatmapLayer when map is unavailable", async () => {
      expect(getHeatmapLayerMocks()).toHaveLength(0);

      mount(HeatmapLayer, {
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getHeatmapLayerMocks()).toHaveLength(0);
    });

    it("should not create HeatmapLayer when api is unavailable", async () => {
      expect(getHeatmapLayerMocks()).toHaveLength(0);

      mount(HeatmapLayer, {
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getHeatmapLayerMocks()).toHaveLength(0);
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to HeatmapLayer constructor", async () => {
      const options = {
        radius: 20,
        opacity: 0.6,
        gradient: ["rgba(0, 255, 255, 0)", "rgba(0, 255, 255, 1)", "rgba(0, 191, 255, 1)"],
        maxIntensity: 100,
        dissipating: true,
      };

      createWrapper(options);
      await nextTick();

      expect(createHeatmapLayerSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });

    it("should transform LatLngLiteral data to LatLng objects", async () => {
      const data = [
        { lat: 37.774, lng: -122.414 },
        { lat: 37.775, lng: -122.415 },
      ];

      createWrapper({ data });
      await nextTick();

      expect(createHeatmapLayerSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.arrayContaining([expect.any(google.maps.LatLng), expect.any(google.maps.LatLng)]),
        })
      );
    });

    it("should transform weighted data points with LatLngLiteral locations", async () => {
      const data = [
        { location: { lat: 37.774, lng: -122.414 }, weight: 0.5 },
        { location: { lat: 37.775, lng: -122.415 }, weight: 1.0 },
      ];

      createWrapper({ data });
      await nextTick();

      expect(createHeatmapLayerSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              location: expect.any(google.maps.LatLng),
              weight: 0.5,
            }),
            expect.objectContaining({
              location: expect.any(google.maps.LatLng),
              weight: 1.0,
            }),
          ]),
        })
      );
    });

    it("should not transform data when it's already an MVCArray", async () => {
      const mockMVCArray = new google.maps.MVCArray([
        { lat: 37.774, lng: -122.414 },
        { lat: 37.775, lng: -122.415 },
      ]);
      const options = { data: mockMVCArray };

      createWrapper(options);
      await nextTick();

      expect(createHeatmapLayerSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });
  });

  describe("Reactive Options", () => {
    it("should call setOptions when props change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const heatmapLayer = getHeatmapLayerMocks()[0];

      const options = {
        data: [],
        radius: 30,
        opacity: 0.8,
        gradient: ["rgba(255, 0, 0, 0)", "rgba(255, 0, 0, 1)"],
      };

      await wrapper.setProps({ options });

      expect(heatmapLayer.setOptions).toHaveBeenCalledTimes(1);
      expect(heatmapLayer.setOptions).toHaveBeenCalledWith(options);
    });

    it("should maintain same HeatmapLayer instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getHeatmapLayerMocks()).toHaveLength(1);
      const heatmapLayer = getHeatmapLayerMocks()[0];

      await wrapper.setProps({
        options: {
          data: [],
          radius: 25,
          opacity: 0.7,
        },
      });

      expect(getHeatmapLayerMocks()).toHaveLength(1);
      expect(getHeatmapLayerMocks()[0]).toBe(heatmapLayer);
    });

    it("should transform new data when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const heatmapLayer = getHeatmapLayerMocks()[0];

      const newData = [
        { lat: 40.7128, lng: -74.006 },
        { lat: 40.7614, lng: -73.9776 },
      ];

      await wrapper.setProps({
        options: { data: newData },
      });

      expect(heatmapLayer.setOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.arrayContaining([expect.any(google.maps.LatLng), expect.any(google.maps.LatLng)]),
        })
      );
    });
  });

  describe("Instance Exposure", () => {
    it("should expose HeatmapLayer instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(wrapper.vm.heatmapLayer).toBeInstanceOf(google.maps.visualization.HeatmapLayer);
    });
  });

  describe("Cleanup", () => {
    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const heatmapLayer = getHeatmapLayerMocks()[0];

      wrapper.unmount();

      expect(heatmapLayer.setMap).toHaveBeenCalledWith(null);
    });
  });
});
