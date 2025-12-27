// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../shims-google-maps.ts" />
import * as themes from "../themes/index";

export type IControlPosition = keyof typeof google.maps.ControlPosition;
export type ITheme = keyof typeof themes;
export type CustomMarkerOptions = google.maps.CustomMarkerOptions;
