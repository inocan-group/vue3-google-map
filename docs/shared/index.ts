import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

if (!import.meta.env.SSR) {
  setOptions({
    key: import.meta.env.VITE_GOOGLE_API_KEY,
    v: "weekly",
  });
}

export const apiPromise = import.meta.env.SSR
  ? Promise.resolve()
  : Promise.all([
      importLibrary("maps"),
      importLibrary("marker"),
      importLibrary("visualization"),
    ]).then(() => {
      if (window.google) {
        return window.google;
      }
      throw new Error("Google Maps API not loaded");
    });
