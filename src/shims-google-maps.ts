import { createCustomMarkerClass } from "./utils";
import type { ICustomMarkerOptions } from "./@types/index";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace google.maps {
    type CustomMarkerOptions = ICustomMarkerOptions;

    export let CustomMarker: ReturnType<typeof createCustomMarkerClass>;
  }
}
