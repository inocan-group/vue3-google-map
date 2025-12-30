import * as themes from "../themes/index";

export type IControlPosition = keyof typeof google.maps.ControlPosition;
export type ITheme = keyof typeof themes;

export interface ICustomMarkerOptions {
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
