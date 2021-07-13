<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onBeforeUnmount, watch, toRef, provide } from "vue";
import { mapSymbol, apiSymbol, loaderInstance, mapEvents, mapWasLoadedSymbol } from "../shared/index";
import { Loader } from "@googlemaps/js-api-loader";
import {
  IMapTypeControlOptions,
  IStreetViewPanorama,
  IScaleControlStyle,
  IControlPosition,
  IMapRestriction,
  IGoogleMapsAPI,
  IMapTypeStyle,
  IMapTypeId,
  ILatLng,
  IMap,
} from "../@types/index";

export default defineComponent({
  props: {
    apiKey: {
      type: String,
      default: "",
    },
    version: {
      type: String,
      default: "weekly",
    },
    libraries: {
      type: Array as PropType<("drawing" | "geometry" | "localContext" | "places" | "visualization")[]>,
      default: () => ["places"],
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
      type: Object as PropType<ILatLng>,
      default: () => ({ lat: 0, lng: 0 }),
    },
    clickableIcons: {
      type: Boolean,
      required: false,
    },
    controlSize: {
      type: Number,
      required: false,
    },
    disableDefaultUi: {
      type: Boolean,
      required: false,
    },
    disableDoubleClickZoom: {
      type: Boolean,
      required: false,
    },
    draggable: {
      type: Boolean,
      required: false,
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
    keyboardShortcuts: {
      type: Boolean,
      required: false,
    },
    mapTypeControl: {
      type: Boolean,
      required: false,
    },
    mapTypeControlOptions: {
      type: Object as PropType<IMapTypeControlOptions>,
      required: false,
    },
    mapTypeId: {
      type: [Number, String] as PropType<IMapTypeId | string>,
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
    },
    panControl: {
      type: Boolean,
      required: false,
    },
    panControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    restriction: {
      type: Object as PropType<IMapRestriction>,
      required: false,
    },
    rotateControl: {
      type: Boolean,
      required: false,
    },
    rotateControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    scaleControl: {
      type: Boolean,
      required: false,
    },
    scaleControlStyle: {
      type: Number as PropType<IScaleControlStyle>,
      required: false,
    },
    scrollwheel: {
      type: Boolean,
      required: false,
    },
    streetView: {
      type: Object as PropType<IStreetViewPanorama>,
      required: false,
    },
    streetViewControl: {
      type: Boolean,
      required: false,
    },
    streetViewControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
    styles: {
      type: Array as PropType<IMapTypeStyle[]>,
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
    },
    zoomControlPosition: {
      type: String as PropType<IControlPosition>,
      required: false,
    },
  },

  emits: mapEvents,

  setup(props, { emit }) {
    const mapRef = ref<HTMLElement | null>(null);
    const ready = ref(false);

    const map = ref<IMap | null>(null);
    const api = ref<IGoogleMapsAPI | null>(null);

    const mapWasLoaded = ref(false);

    provide(mapSymbol, map);
    provide(apiSymbol, api);
    provide(mapWasLoadedSymbol, mapWasLoaded);

    const resolveOptions = () => {
      const opts = {
        backgroundColor: props.backgroundColor,
        center: props.center,
        clickableIcons: props.clickableIcons,
        controlSize: props.controlSize,
        disableDefaultUI: props.disableDefaultUi,
        disableDoubleClickZoom: props.disableDoubleClickZoom,
        draggable: props.draggable,
        draggableCursor: props.draggableCursor,
        draggingCursor: props.draggingCursor,
        fullscreenControl: props.fullscreenControl,
        gestureHandling: props.gestureHandling,
        heading: props.heading,
        keyboardShortcuts: props.keyboardShortcuts,
        mapTypeControl: props.mapTypeControl,
        mapTypeControlOptions: props.mapTypeControlOptions,
        mapTypeId: props.mapTypeId,
        maxZoom: props.maxZoom,
        minZoom: props.minZoom,
        noClear: props.noClear,
        panControl: props.panControl,
        restriction: props.restriction,
        rotateControl: props.rotateControl,
        scaleControl: props.scaleControl,
        scrollwheel: props.scrollwheel,
        streetView: props.streetView,
        streetViewControl: props.streetViewControl,
        styles: props.styles,
        tilt: props.tilt,
        zoom: props.zoom,
        zoomControl: props.zoomControl,
        scaleControlOptions: props.scaleControlStyle ? { style: props.scaleControlStyle } : {},
        zoomControlOptions: props.zoomControlPosition
          ? { position: api.value?.ControlPosition[props.zoomControlPosition] }
          : {},
        streetViewControlOptions: props.streetViewControlPosition
          ? { position: api.value?.ControlPosition[props.streetViewControlPosition] }
          : {},
        rotateControlOptions: props.rotateControlPosition
          ? { position: api.value?.ControlPosition[props.rotateControlPosition] }
          : {},
        fullscreenControlOptions: props.fullscreenControlPosition
          ? { position: api.value?.ControlPosition[props.fullscreenControlPosition] }
          : {},
        panControlOptions: props.panControlPosition
          ? { position: api.value?.ControlPosition[props.panControlPosition] }
          : {},
      };

      // Strip undefined keys. Without this Map.setOptions doesn't behave very well.
      Object.keys(opts).forEach((key) => {
        if (opts[key as keyof typeof opts] === undefined) delete opts[key as keyof typeof opts];
      });

      return opts;
    };

    const stopWatchingMapApiAndRef = watch(
      [api, map],
      ([newApi, newMap]) => {
        const api = newApi as IGoogleMapsAPI | null;
        const map = newMap as IMap | null;

        if (api && map) {
          api.event.addListenerOnce(map, "tilesloaded", () => {
            mapWasLoaded.value = true;
          });
          // As the watcher is imediately invoked if the api and the map was already loaded
          // the watchStopHandler wasnt created because this function has not fully executed
          // therefore i propagate the watchStopHandler execution on the event loop to ensure
          // it exists when its called.
          setTimeout(stopWatchingMapApiAndRef, 0);
        }
      },
      { immediate: true }
    );

    const loadMapsAPI = () => {
      try {
        const { apiKey, region, version, language, libraries } = props;
        loaderInstance.value = new Loader({ apiKey, region, version, language, libraries });
      } catch (err) {
        // Loader instantiated again with different options, which isn't allowed by js-api-loader
        console.error(err);
      }
    };

    onMounted(() => {
      loadMapsAPI();

      (loaderInstance.value as Loader).load().then(() => {
        // eslint-disable-next-line no-undef
        api.value = google.maps;
        // eslint-disable-next-line no-undef
        map.value = new google.maps.Map(mapRef.value as HTMLElement, resolveOptions());

        mapEvents.forEach((event) => {
          map.value?.addListener(event, (e: unknown) => emit(event, e));
        });

        ready.value = true;

        const otherPropsAsRefs = (Object.keys(props) as (keyof typeof props)[])
          .filter((key) => !["center", "zoom"].includes(key))
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
      });
    });

    onBeforeUnmount(() => {
      mapWasLoaded.value = false;
      if (map.value) api.value?.event.clearInstanceListeners(map.value);
    });

    return { mapRef, ready, map, api };
  },
});
</script>

<template>
  <div>
    <div ref="mapRef" class="mapdiv" />
    <slot />
  </div>
</template>

<style scoped>
.mapdiv {
  width: 100%;
  height: 100%;
}
</style>
