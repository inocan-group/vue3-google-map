import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import CustomMarker from "../CustomMarker.vue";
import { Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol, markerClusterSymbol, customMarkerClassSymbol } from "../../shared";
import { type MarkerClusterer } from "@googlemaps/markerclusterer";

// Mock registry
let mockCustomMarkerInstances: any[] = [];

describe("CustomMarker Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;
  let createCustomMarkerSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.CustomMarker>>;

  beforeEach(() => {
    // Reset mocks before each test
    mockCustomMarkerInstances = [];

    mockApi = google.maps;
    mockMap = new Map(null);

    createCustomMarkerSpy = jest.fn();

    // Create a clean mock for CustomMarker
    class MockCustomMarker {
      setOptions = jest.fn();
      setMap = jest.fn();

      constructor(options: google.maps.CustomMarkerOptions) {
        Object.assign(this, options);
        mockCustomMarkerInstances.push(this);
      }
    }

    // Set up the mock in the API and extend with constructor spy
    (mockApi[customMarkerClassSymbol] as any) = class extends MockCustomMarker {
      constructor(options: google.maps.CustomMarkerOptions) {
        createCustomMarkerSpy(options);
        super(options);
      }
    };
  });

  const getCustomMarkerMocks = () => mockCustomMarkerInstances;

  const createWrapper = (options: google.maps.CustomMarkerOptions = {}) => {
    const defaultPosition = { lat: 37.774, lng: -122.414 };

    return mount(CustomMarker, {
      props: {
        options: { position: defaultPosition, ...options },
      },
      slots: {
        // eslint-disable-next-line quotes
        default: '<div class="custom-content">Custom Marker Content</div>',
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
    it("should create CustomMarker with map association when all dependencies are available", async () => {
      expect(getCustomMarkerMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getCustomMarkerMocks()).toHaveLength(1);

      const customMarker = getCustomMarkerMocks()[0];
      expect(customMarker.setMap).toHaveBeenCalledWith(mockMap);
    });

    it("should not create CustomMarker when map is unavailable", async () => {
      expect(getCustomMarkerMocks()).toHaveLength(0);

      mount(CustomMarker, {
        props: { options: { position: { lat: 0, lng: 0 } } },
        slots: {
          // eslint-disable-next-line quotes
          default: '<div class="content">Content</div>',
        },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getCustomMarkerMocks()).toHaveLength(0);
    });

    it("should not create CustomMarker when api is unavailable", async () => {
      expect(getCustomMarkerMocks()).toHaveLength(0);

      mount(CustomMarker, {
        props: { options: { position: { lat: 0, lng: 0 } } },
        slots: {
          // eslint-disable-next-line quotes
          default: '<div class="content">Content</div>',
        },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getCustomMarkerMocks()).toHaveLength(0);
    });

    it("should not create CustomMarker when no slot content is provided", async () => {
      expect(getCustomMarkerMocks()).toHaveLength(0);

      mount(CustomMarker, {
        props: { options: { position: { lat: 37.774, lng: -122.414 } } },
        // No slots provided
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getCustomMarkerMocks()).toHaveLength(0);
      expect(createCustomMarkerSpy).not.toHaveBeenCalled();
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to CustomMarker constructor", async () => {
      const options = {
        position: { lat: 40.7128, lng: -74.006 },
        zIndex: 1,
        anchorPoint: "CENTER" as const,
      };

      createWrapper(options);
      await nextTick();

      expect(createCustomMarkerSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });
  });

  describe("Reactive Options", () => {
    it("should call setOptions when props change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const customMarker = getCustomMarkerMocks()[0];

      // Clear setOptions calls from initial creation (element ref changes)
      customMarker.setOptions.mockClear();

      const options = {
        position: { lat: 45.0, lng: -75.0 },
        zIndex: 2,
      };

      await wrapper.setProps({ options });

      expect(customMarker.setOptions).toHaveBeenCalledTimes(1);
      expect(customMarker.setOptions).toHaveBeenCalledWith(expect.objectContaining(options));
    });

    it("should maintain same CustomMarker instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getCustomMarkerMocks()).toHaveLength(1);
      const customMarker = getCustomMarkerMocks()[0];

      await wrapper.setProps({
        options: {
          position: { lat: 45.0, lng: -75.0 },
          zIndex: 3,
        },
      });

      expect(getCustomMarkerMocks()).toHaveLength(1);
      expect(getCustomMarkerMocks()[0]).toBe(customMarker);
    });
  });

  describe("Slot Content", () => {
    it("should use slot content to render CustomMarker", async () => {
      createWrapper();
      await nextTick();

      expect(createCustomMarkerSpy).toHaveBeenCalledTimes(1);
      const constructorOptions = createCustomMarkerSpy.mock.calls[0][0];

      expect(constructorOptions?.element).toBeDefined();
      expect(constructorOptions?.element).toBeInstanceOf(HTMLElement);

      const contentDiv = constructorOptions?.element as HTMLElement;
      expect(contentDiv.querySelector(".custom-content")).toBeTruthy();
      expect(contentDiv.querySelector(".custom-content")?.textContent).toBe("Custom Marker Content");
    });

    it("should set pointer cursor when onClick handler is provided", async () => {
      const wrapper = mount(CustomMarker, {
        props: {
          options: { position: { lat: 37.774, lng: -122.414 } },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick: () => {},
        },
        slots: {
          // eslint-disable-next-line quotes
          default: '<div class="custom-content">Clickable Content</div>',
        },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      const innerDiv = wrapper.find(".custom-marker-wrapper > div");
      expect(innerDiv.attributes("style")).toContain("cursor: pointer");
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

    const createWrapperWithCluster = (options: google.maps.CustomMarkerOptions = {}) => {
      const defaultPosition = { lat: 37.774, lng: -122.414 };

      return mount(CustomMarker, {
        props: {
          options: { position: defaultPosition, ...options },
        },
        slots: {
          // eslint-disable-next-line quotes
          default: '<div class="custom-content">Custom Marker Content</div>',
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

      const customMarker = getCustomMarkerMocks()[0];

      expect(mockMarkerCluster.addMarker).toHaveBeenCalledWith(customMarker);
      expect(customMarker.setMap).not.toHaveBeenCalledWith(mockMap);
    });

    it("should remove and re-add marker to cluster when options change", async () => {
      const wrapper = createWrapperWithCluster();
      await nextTick();

      const customMarker = getCustomMarkerMocks()[0];

      await wrapper.setProps({
        options: {
          position: { lat: 45.0, lng: -75.0 },
          zIndex: 2,
        },
      });

      expect(mockMarkerCluster.removeMarker).toHaveBeenCalledWith(customMarker);
      expect(mockMarkerCluster.addMarker).toHaveBeenCalledWith(customMarker);
    });

    it("should remove marker from cluster on unmount", async () => {
      const wrapper = createWrapperWithCluster();
      await nextTick();

      const customMarker = getCustomMarkerMocks()[0];

      wrapper.unmount();

      expect(mockMarkerCluster.removeMarker).toHaveBeenCalledWith(customMarker);
    });
  });

  describe("Instance Exposure", () => {
    it("should expose CustomMarker instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(wrapper.vm.customMarker).toBeInstanceOf(mockApi[customMarkerClassSymbol]);
    });
  });

  describe("Cleanup", () => {
    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const customMarker = getCustomMarkerMocks()[0];

      wrapper.unmount();

      expect(customMarker.setMap).toHaveBeenCalledTimes(2);
      expect(customMarker.setMap).toHaveBeenNthCalledWith(1, mockMap);
      expect(customMarker.setMap).toHaveBeenNthCalledWith(2, null);
    });
  });
});
