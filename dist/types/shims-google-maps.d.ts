import { createCustomMarkerClass } from "./utils";
declare global {
    namespace google.maps {
        interface CustomMarkerOptions {
            position?: google.maps.MarkerOptions["position"];
            map?: google.maps.Map | google.maps.StreetViewPanorama | null;
            anchorPoint?: "CENTER" | "TOP_CENTER" | "BOTTOM_CENTER" | "LEFT_CENTER" | "RIGHT_CENTER" | "TOP_LEFT" | "TOP_RIGHT" | "BOTTOM_LEFT" | "BOTTOM_RIGHT";
            offsetX?: number;
            offsetY?: number;
            zIndex?: number | null;
        }
        let CustomMarker: ReturnType<typeof createCustomMarkerClass>;
    }
}
