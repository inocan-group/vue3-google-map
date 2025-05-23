<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onBeforeUnmount, watch, toRef, provide, markRaw } from "vue";
import { mapSymbol, apiSymbol, mapTilesLoadedSymbol, customMarkerClassSymbol } from "../shared/index";
import { Loader, Library } from "@googlemaps/js-api-loader";
import { createCustomMarkerClass } from "../utils";
import { IControlPosition } from "../@types/index";

let loaderInstance: Loader | undefined;

const mapEvents = [
  "bounds_changed",
  "center_changed",
  "click",
  "contextmenu",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "heading_changed",
  "idle",
  "isfractionalzoomenabled_changed",
  "mapcapabilities_changed",
  "maptypeid_changed",
  "mousemove",
  "mouseout",
  "mouseover",
  "projection_changed",
  "renderingtype_changed",
  "rightclick",
  "tilesloaded",
  "tilt_changed",
  "zoom_changed",
];

export default defineComponent({
  props: {
    apiPromise: {
      type: Promise as PropType<Promise<typeof google>>,
    },
    apiKey: {
      type: String,
      default: "",
    },
    version: {
      type: String,
      default: "weekly",
    },
    libraries: {
      type: Array as PropType<Library[]>,
      default: () => ["places", "marker"],
    },
    region: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    center: {
      type: Object as PropType<google.maps.LatLng | google.maps.LatLngLiteral>,
      default: () => ({ lat: 0, lng: 0 }),
    },
    clickableIcons: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    colorScheme: {
      type: String as PropType<keyof typeof google.maps.ColorScheme>,
      required: false,
    },
    controlSize: {
      type: Number,
      required: false,
    },
    disableDefaultUi: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    disableDoubleClickZoom: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    draggable: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    draggableCursor: {
      type: String,
      required: false,
    },
    draggingCursor: {
      type: String,
      required: false,
    },
    fullscreenControl: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    fullscreenControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    gestureHandling: {
      type: String as PropType<"cooperative" | "greedy" | "none" | "auto">,
      required: false,
    },
    heading: {
      type: Number,
      required: false,
    },
    isFractionalZoomEnabled: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    keyboardShortcuts: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    mapTypeControl: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    mapTypeControlOptions: {
      type: Object as PropType<google.maps.MapTypeControlOptions>,
      required: false,
    },
    mapTypeId: {
      type: [Number, String] as PropType<google.maps.MapTypeId | string>,
      required: false,
    },
    mapId: {
      type: String,
      required: false,
    },
    maxZoom: {
      type: Number,
      required: false,
    },
    minZoom: {
      type: Number,
      required: false,
    },
    noClear: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    panControl: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    panControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    restriction: {
      type: Object as PropType<google.maps.MapRestriction>,
      required: false,
    },
    rotateControl: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    rotateControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    scaleControl: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    scaleControlStyle: {
      type: Number as PropType<google.maps.ScaleControlStyle>,
      required: false,
    },
    scrollwheel: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    streetView: {
      type: Object as PropType<google.maps.StreetViewPanorama>,
      required: false,
    },
    streetViewControl: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    streetViewControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    styles: {
      type: Array as PropType<google.maps.MapTypeStyle[]>,
      required: false,
    },
    tilt: {
      type: Number,
      required: false,
    },
    zoom: {
      type: Number,
      required: false,
    },
    zoomControl: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    zoomControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    cameraControl: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    cameraControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    nonce: {
      type: String,
      default: "",
    },
  },

  emits: mapEvents,

  setup(props, { emit }) {
    const mapRef = ref<HTMLElement>();
    const ready = ref(false);

    const map = ref<google.maps.Map>();
    const api = ref<typeof google.maps>();

    const mapTilesLoaded = ref(false);

    provide(mapSymbol, map);
    provide(apiSymbol, api);
    provide(mapTilesLoadedSymbol, mapTilesLoaded);

    const resolveOptions = (): google.maps.MapOptions => {
      const options: google.maps.MapOptions = { ...props };
      const keys = Object.keys(options) as (keyof google.maps.MapOptions)[];

      // Strip undefined keys. Without this Map.setOptions doesn't behave very well.
      keys.forEach((key) => {
        if (options[key] === undefined) delete options[key];
      });

      const createControlOptionsWithPosition = (position?: IControlPosition) =>
        position ? { position: api.value?.ControlPosition[position] } : {};

      // Options where the prop value should not be directly assigned to the map instance
      const otherOptions = {
        scaleControlOptions: props.scaleControlStyle ? { style: props.scaleControlStyle } : {},
        panControlOptions: createControlOptionsWithPosition(props.panControlPosition),
        zoomControlOptions: createControlOptionsWithPosition(props.zoomControlPosition),
        rotateControlOptions: createControlOptionsWithPosition(props.rotateControlPosition),
        streetViewControlOptions: createControlOptionsWithPosition(props.streetViewControlPosition),
        fullscreenControlOptions: createControlOptionsWithPosition(props.fullscreenControlPosition),
        cameraControlOptions: createControlOptionsWithPosition(props.cameraControlPosition),
        disableDefaultUI: props.disableDefaultUi,
      };

      return { ...options, ...otherOptions };
    };

    const stopWatchingMapApiAndRef = watch(
      [api, map],
      ([newApi, newMap]) => {
        const api = newApi as typeof google.maps | null;
        const map = newMap as google.maps.Map | null;

        if (api && map) {
          api.event.addListenerOnce(map, "tilesloaded", () => {
            mapTilesLoaded.value = true;
          });
          // As the watcher is immediately invoked if the api and the map was already loaded
          // the watchStopHandler wasn't created because this function has not fully executed
          // therefore i propagate the watchStopHandler execution on the event loop to ensure
          // it exists when its called.
          setTimeout(stopWatchingMapApiAndRef, 0);
        }
      },
      { immediate: true }
    );

    const loadMapsAPI = () => {
      try {
        const { apiKey, region, version, language, libraries, nonce } = props;
        loaderInstance = new Loader({ apiKey, region, version, language, libraries: libraries as Library[], nonce });
      } catch (err) {
        // Loader instantiated again with different options, which isn't allowed by js-api-loader
        console.error(err);
      }
    };

    const setupMap = (_google: typeof google) => {
      api.value = markRaw(_google.maps);
      map.value = markRaw(new _google.maps.Map(mapRef.value as HTMLElement, resolveOptions()));
      const CustomMarker = createCustomMarkerClass(api.value);
      api.value[customMarkerClassSymbol] = CustomMarker;

      mapEvents.forEach((event) => {
        map.value?.addListener(event, (e: unknown) => emit(event, e));
      });

      ready.value = true;

      const otherPropsAsRefs = (Object.keys(props) as (keyof typeof props)[])
        .filter(
          (key) =>
            !["apiPromise", "apiKey", "version", "libraries", "region", "language", "center", "zoom", "nonce"].includes(key)
        )
        .map((key) => toRef(props, key));

      watch(
        [() => props.center, () => props.zoom, ...otherPropsAsRefs] as const,
        ([center, zoom], [oldCenter, oldZoom]) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { center: _, zoom: __, ...otherOptions } = resolveOptions();

          map.value?.setOptions(otherOptions);

          if (zoom !== undefined && zoom !== oldZoom) map.value?.setZoom(zoom);

          const centerHasChanged = !oldCenter || center.lng !== oldCenter.lng || center.lat !== oldCenter.lat;
          if (center && centerHasChanged) map.value?.panTo(center);
        }
      );
    };

    onMounted(() => {
      if (props.apiPromise && props.apiPromise instanceof Promise) {
        props.apiPromise.then(setupMap);
      } else {
        loadMapsAPI();

        (loaderInstance as Loader).load().then(setupMap);
      }
    });

    onBeforeUnmount(() => {
      mapTilesLoaded.value = false;
      if (map.value) api.value?.event.clearInstanceListeners(map.value);
    });

    return { mapRef, ready, map, api, mapTilesLoaded };
  },
});
</script>

<template>
  <div>
    <div ref="mapRef" class="mapdiv" />
    <slot v-bind="{ ready, map, api, mapTilesLoaded }" />
  </div>
</template>

<style scoped>
.mapdiv {
  width: 100%;
  height: 100%;
}
</style>
