type ICustomMarkerInterface = google.maps.OverlayView & {
  getPosition(): google.maps.LatLng | null;
  getVisible(): boolean;
  setOptions(options: google.maps.CustomMarkerOptions): void;
};

interface ICustomMarkerCtor {
  new (opts: google.maps.CustomMarkerOptions & { element?: HTMLElement }): ICustomMarkerInterface;
}

export function createCustomMarkerClass(api: typeof google.maps): ICustomMarkerCtor {
  return class CustomMarker extends api.OverlayView {
    private element?: HTMLElement;
    private opts: google.maps.CustomMarkerOptions;

    constructor(opts: google.maps.CustomMarkerOptions & { element?: HTMLElement }) {
      super();

      const { element, ...rest } = opts;

      this.element = element;
      this.opts = rest;

      if (this.opts.map) {
        this.setMap(this.opts.map);
      }
    }

    getPosition() {
      return this.opts.position
        ? this.opts.position instanceof api.LatLng
          ? this.opts.position
          : new api.LatLng(this.opts.position)
        : null;
    }

    getVisible() {
      if (!this.element) return false;

      const element = this.element;
      return (
        element.style.display !== "none" &&
        element.style.visibility !== "hidden" &&
        (element.style.opacity === "" || Number(element.style.opacity) > 0.01)
      );
    }

    onAdd() {
      if (!this.element) return;

      const panes = this.getPanes();

      if (panes) {
        panes.overlayMouseTarget.appendChild(this.element);
      }
    }

    draw() {
      if (!this.element) return;

      const overlayProjection = this.getProjection();
      const point = overlayProjection?.fromLatLngToDivPixel(this.getPosition());

      if (point) {
        this.element.style.position = "absolute";
        let transformX: string, transformY: string;

        switch (this.opts.anchorPoint) {
          case "TOP_CENTER":
            transformX = "-50%";
            transformY = "-100%";
            break;
          case "BOTTOM_CENTER":
            transformX = "-50%";
            transformY = "0";
            break;
          case "LEFT_CENTER":
            transformX = "-100%";
            transformY = "-50%";
            break;
          case "RIGHT_CENTER":
            transformX = "0";
            transformY = "-50%";
            break;
          case "TOP_LEFT":
            transformX = "-100%";
            transformY = "-100%";
            break;
          case "TOP_RIGHT":
            transformX = "0";
            transformY = "-100%";
            break;
          case "BOTTOM_LEFT":
            transformX = "-100%";
            transformY = "0";
            break;
          case "BOTTOM_RIGHT":
            transformX = "0";
            transformY = "0";
            break;
          default:
            // "center"
            transformX = "-50%";
            transformY = "-50%";
        }

        this.element.style.left = point.x + (this.opts.offsetX || 0) + "px";
        this.element.style.top = point.y + (this.opts.offsetY || 0) + "px";
        // eslint-disable-next-line prettier/prettier
        this.element.style.transform = `translateX(${transformX}) translateY(${transformY})`;

        if (this.opts.zIndex) {
          this.element.style.zIndex = this.opts.zIndex.toString();
        }
      }
    }

    onRemove() {
      if (!this.element) return;

      this.element.remove();
    }

    setOptions(opts: google.maps.CustomMarkerOptions & { element?: HTMLElement }) {
      const { element, ...rest } = opts;

      this.element = element;
      this.opts = rest;
      this.draw();
    }
  };
}
