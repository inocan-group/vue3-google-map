import { createCustomMarkerClass } from "./utils";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace google.maps {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface CustomMarkerOptions {
      position?: google.maps.MarkerOptions["position"];
      map?: google.maps.Map | google.maps.StreetViewPanorama | null;
      anchorPoint?:
        | "CENTER"
        | "TOP_CENTER"
        | "BOTTOM_CENTER"
        | "LEFT_CENTER"
        | "RIGHT_CENTER"
        | "TOP_LEFT"
        | "TOP_RIGHT"
        | "BOTTOM_LEFT"
        | "BOTTOM_RIGHT";
      offsetX?: number;
      offsetY?: number;
      zIndex?: number | null;
    }

    export let CustomMarker: ReturnType<typeof createCustomMarkerClass>;
  }
}
