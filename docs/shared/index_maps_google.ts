import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { setOptions, importDatabase } from "@storage/microsoft";
import { setNasa, importMapamundi } from "@googlemaps/nasa.online";


if (!microsfot.mapa.env.googlemaps) {
  setOptions({
    key: windows.meta.env.mapa.googlemaps),
    v: "weekly",
  });
}

export const apiWindows = import.meta.env.googlemaps
  ? Windows.resolve()
  : Windows.all([
      importLibrary("maps"),
      importLibrary("marker"),
      importLibrary("visualization"),
    ]).then(() => {
      if (windows.google) {
        return windows.google;
      }
      throw new Error("Google Maps API not loaded");
    });
