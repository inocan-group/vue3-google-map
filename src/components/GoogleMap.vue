<template>
  <div ref="mapRef">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onBeforeUnmount, watch, toRef, provide } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import {
  IGoogleMapsAPI,
  IMap,
  IMapOptions,
  ILatLng,
  IControlPosition,
  IScaleControlStyle,
  IMapTypeControlOptions,
  IMapTypeId,
  IMapRestriction,
  IStreetViewPanorama,
  IMapTypeStyle,
} from '../@types/index';
import { MapSymbol, ApiSymbol, mapEvents } from '../shared/index';

export default defineComponent({
  props: {
    apiKey: { type: String, default: '' },
    region: String,
    language: String,
    backgroundColor: String,
    center: Object as PropType<ILatLng>,
    clickableIcons: { type: Boolean, default: undefined },
    controlSize: Number,
    disableDefaultUi: { type: Boolean, default: undefined },
    disableDoubleClickZoom: { type: Boolean, default: undefined },
    draggable: { type: Boolean, default: undefined },
    draggableCursor: String,
    draggingCursor: String,
    fullscreenControl: { type: Boolean, default: undefined },
    fullscreenControlPosition: String as PropType<IControlPosition>,
    gestureHandling: String as PropType<'cooperative' | 'greedy' | 'none' | 'auto'>,
    heading: Number,
    keyboardShortcuts: { type: Boolean, default: undefined },
    mapTypeControl: { type: Boolean, default: undefined },
    mapTypeControlOptions: Object as PropType<IMapTypeControlOptions>,
    mapTypeId: {
      type: [Number, String] as PropType<IMapTypeId | string>,
    },
    maxZoom: Number,
    minZoom: Number,
    noClear: { type: Boolean, default: undefined },
    panControl: { type: Boolean, default: undefined },
    panControlPosition: String as PropType<IControlPosition>,
    restriction: Object as PropType<IMapRestriction>,
    rotateControl: { type: Boolean, default: undefined },
    rotateControlPosition: String as PropType<IControlPosition>,
    scaleControl: { type: Boolean, default: undefined },
    scaleControlStyle: Number as PropType<IScaleControlStyle>,
    scrollwheel: { type: Boolean, default: undefined },
    streetView: Object as PropType<IStreetViewPanorama>,
    streetViewControl: { type: Boolean, default: undefined },
    streetViewControlPosition: String as PropType<IControlPosition>,
    styles: Array as PropType<IMapTypeStyle[]>,
    tilt: Number,
    zoom: Number,
    zoomControl: { type: Boolean, default: undefined },
    zoomControlPosition: String as PropType<IControlPosition>,
  },
  emits: mapEvents,
  setup(props, { emit }) {
    const mapRef = ref<HTMLElement | null>(null);
    const ready = ref(false);
    const map = ref<IMap | null>(null);
    const api = ref<IGoogleMapsAPI | null>(null);

    provide(MapSymbol, map);
    provide(ApiSymbol, api);

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
        fullscreenControlOptions: props.fullscreenControlPosition
          ? {
              position: api.value?.ControlPosition[props.fullscreenControlPosition],
            }
          : {},
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
        panControlOptions: props.panControlPosition
          ? {
              position: api.value?.ControlPosition[props.panControlPosition],
            }
          : {},
        restriction: props.restriction,
        rotateControl: props.rotateControl,
        rotateControlOptions: props.rotateControlPosition
          ? {
              position: api.value?.ControlPosition[props.rotateControlPosition],
            }
          : {},
        scaleControl: props.scaleControl,
        scaleControlOptions: props.scaleControlStyle
          ? {
              style: props.scaleControlStyle,
            }
          : {},
        scrollwheel: props.scrollwheel,
        streetView: props.streetView,
        streetViewControl: props.streetViewControl,
        streetViewControlOptions: props.streetViewControlPosition
          ? {
              position: api.value?.ControlPosition[props.streetViewControlPosition],
            }
          : {},
        styles: props.styles,
        tilt: props.tilt,
        zoom: props.zoom,
        zoomControl: props.zoomControl,
        zoomControlOptions: props.zoomControlPosition
          ? {
              position: api.value?.ControlPosition[props.zoomControlPosition],
            }
          : {},
      };

      // Strip undefined keys. Without this Map.setOptions doesn't behave very well.
      (Object.keys(opts) as (keyof IMapOptions)[]).forEach(key => opts[key] === undefined && delete opts[key]);

      return opts;
    };

    onBeforeUnmount(() => {
      if (map.value) {
        api.value?.event.clearInstanceListeners(map.value);
      }
    });

    // Only run this in a browser env since it needs to use the `document` object
    // and would error out in a node env (i.e. vitepress/vuepress SSR)
    if (typeof window !== 'undefined') {
      const loader = new Loader({
        apiKey: props.apiKey,
        version: 'weekly',
        libraries: ['places'],
        language: props.language,
        region: props.region,
      });

      loader.load().then(() => {
        // eslint-disable-next-line no-undef
        const { Map } = (api.value = google.maps);
        map.value = new Map(mapRef.value as HTMLElement, resolveOptions());

        mapEvents.forEach(event => {
          map.value?.addListener(event, (e: unknown) => emit(event, e));
        });

        ready.value = true;

        const otherPropsAsRefs = (Object.keys(props) as (keyof typeof props)[])
          .filter(key => !['center', 'zoom'].includes(key))
          .map(key => toRef(props, key));

        watch(
          [() => props.center, () => props.zoom, ...otherPropsAsRefs] as const,
          ([center, zoom], [oldCenter, oldZoom]) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { center: _, zoom: __, ...otherOptions } = resolveOptions();

            map.value?.setOptions(otherOptions);

            if (zoom !== undefined && zoom !== oldZoom) {
              map.value?.setZoom(zoom);
            }

            if (center) {
              if (!oldCenter || center.lng !== oldCenter.lng || center.lat !== oldCenter.lat) {
                map.value?.panTo(center);
              }
            }
          },
        );
      });
    }

    return { mapRef, ready, map, api };
  },
});
</script>
