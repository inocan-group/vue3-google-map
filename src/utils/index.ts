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
    private opts: Omit<google.maps.CustomMarkerOptions, "element">;

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
      const point = overlayProjection.fromLatLngToDivPixel(this.getPosition());

      if (point) {
        this.element.style.position = "absolute";
        const height = this.element.offsetHeight;
        const width = this.element.offsetWidth;
        let x: number, y: number;
        switch (this.opts.anchorPoint) {
          case "TOP_CENTER":
            x = point.x - width / 2;
            y = point.y;
            break;
          case "BOTTOM_CENTER":
            x = point.x - width / 2;
            y = point.y - height;
            break;
          case "LEFT_CENTER":
            x = point.x;
            y = point.y - height / 2;
            break;
          case "RIGHT_CENTER":
            x = point.x - width;
            y = point.y - height / 2;
            break;
          case "TOP_LEFT":
            x = point.x;
            y = point.y;
            break;
          case "TOP_RIGHT":
            x = point.x - width;
            y = point.y;
            break;
          case "BOTTOM_LEFT":
            x = point.x;
            y = point.y - height;
            break;
          case "BOTTOM_RIGHT":
            x = point.x - width;
            y = point.y - height;
            break;
          default:
            // "center"
            x = point.x - width / 2;
            y = point.y - height / 2;
        }

        this.element.style.left = x + "px";
        this.element.style.top = y + "px";
        // eslint-disable-next-line prettier/prettier
        this.element.style.transform = `translateX(${this.opts.offsetX || 0}px) translateY(${this.opts.offsetY || 0}px)`;

        if (this.opts.zIndex) {
          this.element.style.zIndex = this.opts.zIndex.toString();
        }
      }
    }

    onRemove() {
      if (!this.element) return;

      this.element.remove();
    }

    setOptions(opts: google.maps.CustomMarkerOptions) {
      this.opts = opts;
      this.draw();
    }
  };
}
