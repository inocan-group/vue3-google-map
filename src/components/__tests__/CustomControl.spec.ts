import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import CustomControl from "../CustomControl.vue";
import { Map } from "@googlemaps/jest-mocks";
import { mapSymbol, apiSymbol, mapTilesLoadedSymbol } from "../../shared";
import { IControlPosition } from "@/@types";

const DEFAULT_POSITION: IControlPosition = "TOP_LEFT";

describe("CustomControl Component", () => {
  let mockMap: google.maps.Map;
  let mockApi: typeof google.maps;

  beforeEach(() => {
    mockApi = google.maps;
    mockMap = new Map(null);
  });

  const getControlsForPosition = (position: IControlPosition) => {
    const positionNumber = mockApi.ControlPosition[position];
    return mockMap.controls[positionNumber];
  };

  const createWrapper = (props: Partial<{ position: IControlPosition; index: number }> = {}, mapTilesLoaded = true) => {
    const defaultProps = {
      position: DEFAULT_POSITION,
      index: 1,
    };

    return mount(CustomControl, {
      props: {
        ...defaultProps,
        ...props,
      },
      slots: {
        default: "Custom Control Content",
      },
      global: {
        provide: {
          [mapSymbol]: ref(mockMap),
          [apiSymbol]: ref(mockApi),
          [mapTilesLoadedSymbol]: ref(mapTilesLoaded),
        },
      },
    });
  };

  describe("Instance Creation", () => {
    it("should add control to map when all dependencies are available", async () => {
      createWrapper();
      await nextTick();

      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);
      expect(topLeftControls.push).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it("should not add control when map tiles are not loaded", async () => {
      createWrapper({}, false);
      await nextTick();

      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);
      expect(topLeftControls.push).not.toHaveBeenCalled();
    });

    it("should not add control when map is unavailable", async () => {
      mount(CustomControl, {
        props: { position: DEFAULT_POSITION },
        global: {
          provide: {
            [mapSymbol]: ref(undefined),
            [apiSymbol]: ref(mockApi),
            [mapTilesLoadedSymbol]: ref(true),
          },
        },
      });
      await nextTick();

      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);
      expect(topLeftControls.push).not.toHaveBeenCalled();
    });

    it("should not add control when api is unavailable", async () => {
      mount(CustomControl, {
        props: { position: DEFAULT_POSITION },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(undefined),
            [mapTilesLoadedSymbol]: ref(true),
          },
        },
      });
      await nextTick();

      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);
      expect(topLeftControls.push).not.toHaveBeenCalled();
    });
  });

  describe("Position Mapping", () => {
    it("should add control to correct position", async () => {
      createWrapper({ position: "TOP_RIGHT" });
      await nextTick();

      const topRightControls = getControlsForPosition("TOP_RIGHT");
      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);

      expect(topRightControls.push).toHaveBeenCalledWith(expect.any(HTMLElement));
      expect(topLeftControls.push).not.toHaveBeenCalled();
    });

    it("should add control with correct index property", async () => {
      const wrapper = createWrapper({ position: "BOTTOM_CENTER", index: 1 });
      await nextTick();

      const bottomCenterControls = getControlsForPosition("BOTTOM_CENTER");
      const controlElement = (bottomCenterControls.push as jest.Mock).mock.calls[0][0] as HTMLElement & {
        index: number;
      };

      await wrapper.setProps({ index: 5 });
      expect(controlElement.index).toBe(5);
    });
  });

  describe("Reactivity", () => {
    it("should move control when position changes", async () => {
      const wrapper = createWrapper({ position: DEFAULT_POSITION });
      await nextTick();

      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);
      const bottomRightControls = getControlsForPosition("BOTTOM_RIGHT");

      const controlElement = (topLeftControls.push as jest.Mock).mock.calls[0][0] as HTMLElement;

      (topLeftControls.forEach as jest.Mock).mockImplementation(
        (callback: (element: HTMLElement, index: number) => void) => {
          callback(controlElement, 1);
        }
      );

      await wrapper.setProps({ position: "BOTTOM_RIGHT" });

      expect(topLeftControls.removeAt).toHaveBeenCalledWith(1);
      expect(bottomRightControls.push).toHaveBeenCalledWith(controlElement);
    });

    it("should update control index when index prop changes", async () => {
      const wrapper = createWrapper({ index: 2 });
      await nextTick();

      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);
      const controlElement = (topLeftControls.push as jest.Mock).mock.calls[0][0] as HTMLElement & { index: number };

      await wrapper.setProps({ index: 8 });

      expect(controlElement.index).toBe(8);
    });
  });

  describe("Slot Content", () => {
    it("should render slot content in DOM", async () => {
      createWrapper();
      await nextTick();

      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);
      const controlElement = (topLeftControls.push as jest.Mock).mock.calls[0][0] as HTMLElement;
      // eslint-disable-next-line quotes
      expect(controlElement.outerHTML).toBe('<div class="custom-control-wrapper">Custom Control Content</div>');
    });
  });

  describe("Event Emission", () => {
    it("should emit content:loaded when control is added to map", async () => {
      const wrapper = createWrapper();
      await nextTick();

      expect(wrapper.emitted("content:loaded")).toHaveLength(1);
    });

    it("should not emit content:loaded when control is not added", async () => {
      const wrapper = createWrapper({}, false);
      await nextTick();

      expect(wrapper.emitted("content:loaded")).toBeUndefined();
    });
  });

  describe("Async Loading", () => {
    it("should add control when map tiles load after component mount", async () => {
      const mapTilesLoadedRef = ref(false);

      const wrapper = mount(CustomControl, {
        props: { position: DEFAULT_POSITION },
        slots: {
          // eslint-disable-next-line quotes
          default: '<div class="delayed-content">Delayed Content</div>',
        },
        global: {
          provide: {
            [mapSymbol]: ref(mockMap),
            [apiSymbol]: ref(mockApi),
            [mapTilesLoadedSymbol]: mapTilesLoadedRef,
          },
        },
      });
      await nextTick();

      mapTilesLoadedRef.value = true;
      await nextTick();

      const topLeftControls = getControlsForPosition(DEFAULT_POSITION);

      expect(topLeftControls.push).toHaveBeenCalledTimes(1);
      expect(topLeftControls.push).toHaveBeenCalledWith(expect.any(HTMLElement));

      const controlElement = (topLeftControls.push as jest.Mock).mock.calls[0][0];
      expect(controlElement.outerHTML).toBe(
        // eslint-disable-next-line quotes
        '<div class="custom-control-wrapper"><div class="delayed-content">Delayed Content</div></div>'
      );

      expect(wrapper.emitted("content:loaded")).toHaveLength(1);
    });
  });

  describe("Cleanup", () => {
    it("should remove control on unmount", async () => {
      const wrapper = createWrapper({ position: "BOTTOM_LEFT" });
      await nextTick();

      const bottomLeftControls = getControlsForPosition("BOTTOM_LEFT");
      const controlElement = (bottomLeftControls.push as jest.Mock).mock.calls[0][0];

      (bottomLeftControls.forEach as jest.Mock).mockImplementation((callback: any) => {
        callback(controlElement, 1);
      });

      wrapper.unmount();

      expect(bottomLeftControls.removeAt).toHaveBeenCalledWith(1);
    });
  });
});
