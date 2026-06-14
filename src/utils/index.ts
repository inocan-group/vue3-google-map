function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Snapshots the plain-data portions of an options object so it can be compared
 * against a future value even if the source (or any of its nested arrays /
 * objects) is mutated in place. This is what enables deep reactivity of
 * `:options` props: without a snapshot insulated from in-place mutation, the
 * change-detection `equal()` check would compare the live value against an old
 * value that shares the same (already-mutated) nested references and therefore
 * never detect a change.
 *
 * Plain objects and arrays are deep-cloned. Non-plain values — DOM nodes, class
 * instances (e.g. `google.maps.LatLng`), and functions — are preserved by
 * reference and compared by identity.
 */
export function cloneOptions<T>(options: T): T {
  if (Array.isArray(options)) {
    return options.map((item) => cloneOptions(item)) as unknown as T;
  }

  if (isPlainObject(options)) {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(options)) {
      result[key] = cloneOptions(options[key]);
    }
    return result as unknown as T;
  }

  return options;
}

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

        const xPos = point.x + (this.opts.offsetX || 0) + "px";
        const yPos = point.y + (this.opts.offsetY || 0) + "px";
        // eslint-disable-next-line prettier/prettier
        this.element.style.transform = `translateX(${transformX}) translateX(${xPos}) translateY(${transformY}) translateY(${yPos})`;

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
