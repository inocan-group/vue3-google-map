import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import AdvancedMarker, { markerEvents, type IAdvancedMarkerExposed } from "../AdvancedMarker.vue";
import { mockInstances, Map, AdvancedMarkerElement, PinElement } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol, markerClusterSymbol } from "../../shared";
import { type MarkerClusterer } from "@googlemaps/markerclusterer";

describe("AdvancedMarker Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;

  let createAdvancedMarkerSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.marker.AdvancedMarkerElement>>;
  let createPinElementSpy: jest.Mock<void, ConstructorParameters<typeof google.maps.marker.PinElement>>;

  let getAdvancedMarkerMocks: () => google.maps.marker.AdvancedMarkerElement[];

  beforeEach(() => {
    mockApi = google.maps;
    mockMap = new Map(null);

    createAdvancedMarkerSpy = jest.fn();
    createPinElementSpy = jest.fn();

    const CustomAdvancedMarkerElement = class extends AdvancedMarkerElement {
      constructor(options?: google.maps.marker.AdvancedMarkerElementOptions) {
        createAdvancedMarkerSpy(options);
        super(options);
        this.content = document.createElement("div");
      }
    };

    const elementName = `gmp-advanced-marker-${Math.random().toString(36).slice(2)}`;
    customElements.define(elementName, CustomAdvancedMarkerElement);

    google.maps.marker.AdvancedMarkerElement = CustomAdvancedMarkerElement as any;

    const CustomPinElement = class extends PinElement {
      constructor(...args: ConstructorParameters<typeof google.maps.marker.PinElement>) {
        createPinElementSpy(...args);
        super(...args);
        this.element = this.element || document.createElement("div");
      }
    };

    const pinElementName = `gmp-pin-element-${Math.random().toString(36).slice(2)}`;
    customElements.define(pinElementName, CustomPinElement);

    google.maps.marker.PinElement = CustomPinElement as any;

    getAdvancedMarkerMocks = () => mockInstances.get(google.maps.marker.AdvancedMarkerElement);
  });

  const createWrapper = (
    options: google.maps.marker.AdvancedMarkerElementOptions = {},
    pinOptions?: google.maps.marker.PinElementOptions
  ) => {
    const defaultPosition = { lat: 37.774, lng: -122.414 };

    return mount(AdvancedMarker, {
      props: {
        options: { position: defaultPosition, ...options },
        ...(pinOptions && { pinOptions }),
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
    it("should create AdvancedMarker with map association when all dependencies available", async () => {
      expect(getAdvancedMarkerMocks()).toHaveLength(0);

      createWrapper();
      await nextTick();

      expect(getAdvancedMarkerMocks()).toHaveLength(1);

      const advancedMarker = getAdvancedMarkerMocks()[0];
      expect(advancedMarker.map).toEqual(mockMap);
    });

    it("should not create AdvancedMarker when map is unavailable", async () => {
      expect(getAdvancedMarkerMocks()).toHaveLength(0);

      mount(AdvancedMarker, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
          },
        },
      });
      await nextTick();

      expect(getAdvancedMarkerMocks()).toHaveLength(0);
    });

    it("should not create AdvancedMarker when api is unavailable", async () => {
      expect(getAdvancedMarkerMocks()).toHaveLength(0);

      mount(AdvancedMarker, {
        props: { options: {} },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
          },
        },
      });
      await nextTick();

      expect(getAdvancedMarkerMocks()).toHaveLength(0);
    });
  });

  describe("Options Mapping", () => {
    it("should pass props.options to AdvancedMarker constructor", async () => {
      const options = {
        position: { lat: 40.7128, lng: -74.006 },
        title: "New York City",
        zIndex: 1,
        collisionBehavior: "REQUIRED" as google.maps.CollisionBehavior,
      };

      createWrapper(options);
      await nextTick();

      expect(createAdvancedMarkerSpy).toHaveBeenCalledWith(expect.objectContaining(options));
    });

    it("should create PinElement when pinOptions provided", async () => {
      const pinOptions = {
        background: "#FF0000",
        borderColor: "#000000",
        glyphColor: "#FFFFFF",
      };

      createWrapper({}, pinOptions);
      await nextTick();

      expect(createPinElementSpy).toHaveBeenCalledWith(pinOptions);
      expect(createAdvancedMarkerSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.any(HTMLElement), // PinElement.element
        })
      );
    });
  });

  describe("Reactive Options", () => {
    it("should update marker properties when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const advancedMarker = getAdvancedMarkerMocks()[0];

      const newOptions = {
        position: { lat: 45.0, lng: -75.0 },
        title: "Montreal",
        zIndex: 2,
      };

      await wrapper.setProps({ options: newOptions });

      expect(advancedMarker.position).toEqual(newOptions.position);
      expect(advancedMarker.title).toBe(newOptions.title);
      expect(advancedMarker.zIndex).toBe(newOptions.zIndex);
    });

    it("should maintain same AdvancedMarker instance when options change", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(getAdvancedMarkerMocks()).toHaveLength(1);
      const advancedMarker = getAdvancedMarkerMocks()[0];

      await wrapper.setProps({
        options: {
          position: { lat: 45.0, lng: -75.0 },
          title: "Updated Title",
        },
      });

      expect(getAdvancedMarkerMocks()).toHaveLength(1);
      expect(getAdvancedMarkerMocks()[0]).toBe(advancedMarker);
    });
  });

  describe("Event Forwarding", () => {
    it("should setup listeners for all advanced marker events", async () => {
      createWrapper();
      await nextTick();

      const advancedMarker = getAdvancedMarkerMocks()[0];
      const addListener = advancedMarker.addListener as jest.Mock;

      expect(addListener).toHaveBeenCalledTimes(markerEvents.length);
      addListener.mock.calls.forEach(([eventType], i) => {
        expect(eventType).toBe(markerEvents[i]);
      });
    });

    it("should emit Vue events when Google Maps events fire", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const advancedMarker = getAdvancedMarkerMocks()[0];
      const addListener = advancedMarker.addListener as jest.Mock;

      const mockEventData = { type: "test_event" };
      addListener.mock.calls.forEach(([eventType, listener]) => {
        listener(mockEventData);
        expect(wrapper.emitted(eventType)).toEqual([[mockEventData]]);
      });
    });
  });

  describe("Custom Content", () => {
    it("should use custom slot content when provided", async () => {
      mount(AdvancedMarker, {
        props: {
          options: {},
        },
        slots: {
          // eslint-disable-next-line quotes
          content: '<div class="custom-marker">Custom Content</div>',
        },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
          },
        },
      });

      await nextTick();

      expect(createAdvancedMarkerSpy).toHaveBeenCalledTimes(1);

      const constructorOptions = createAdvancedMarkerSpy.mock.calls[0][0];

      expect(constructorOptions?.content).toBeDefined();
      expect(constructorOptions?.content).toBeInstanceOf(HTMLElement);

      const contentDiv = constructorOptions?.content as HTMLElement;
      expect(contentDiv.querySelector(".custom-marker")).toBeTruthy();
      expect(contentDiv.querySelector(".custom-marker")?.textContent).toBe("Custom Content");
    });
  });

  describe("Instance Exposure", () => {
    it("should expose AdvancedMarker instance via ref", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect((wrapper.vm as unknown as IAdvancedMarkerExposed).marker).toBeInstanceOf(
        google.maps.marker.AdvancedMarkerElement
      );
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

    const createWrapperWithCluster = (options: google.maps.marker.AdvancedMarkerElementOptions = {}) => {
      const defaultPosition = { lat: 37.774, lng: -122.414 };

      return mount(AdvancedMarker, {
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

      const advancedMarker = getAdvancedMarkerMocks()[0];

      expect(mockMarkerCluster.addMarker).toHaveBeenCalledWith(advancedMarker);
      expect(advancedMarker.map).not.toEqual(mockMap);
    });

    it("should remove and re-add marker to cluster when options change", async () => {
      const wrapper = createWrapperWithCluster();
      await nextTick();

      const advancedMarker = getAdvancedMarkerMocks()[0];

      await wrapper.setProps({
        options: {
          position: { lat: 45.0, lng: -75.0 },
          title: "Updated Title",
        },
      });

      expect(mockMarkerCluster.removeMarker).toHaveBeenCalledWith(advancedMarker);
      expect(mockMarkerCluster.addMarker).toHaveBeenCalledWith(advancedMarker);
    });

    it("should remove marker from cluster on unmount", async () => {
      const wrapper = createWrapperWithCluster();
      await nextTick();

      const advancedMarker = getAdvancedMarkerMocks()[0];

      wrapper.unmount();

      expect(mockMarkerCluster.removeMarker).toHaveBeenCalledWith(advancedMarker);
    });
  });

  describe("Cleanup", () => {
    it("should remove from map on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const advancedMarker = getAdvancedMarkerMocks()[0];

      wrapper.unmount();

      expect(advancedMarker.map).toBe(null);
    });

    it("should clear event listeners on unmount", async () => {
      const wrapper = createWrapper();
      await nextTick();

      const advancedMarker = getAdvancedMarkerMocks()[0];

      wrapper.unmount();

      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledTimes(1);
      expect(mockApi.event.clearInstanceListeners).toHaveBeenCalledWith(advancedMarker);
    });
  });
});
