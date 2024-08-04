import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["visualization", "marker"],
});

export const apiPromise = import.meta.env.SSR ? Promise.resolve() : loader.load();
