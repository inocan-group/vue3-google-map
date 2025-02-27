import { defineComponent, PropType, ref, provide, inject, watch, markRaw, onBeforeUnmount } from "vue";
import {
  MarkerClusterer,
  MarkerClustererOptions,
  MarkerClustererEvents,
  SuperClusterViewportAlgorithm,
} from "@googlemaps/markerclusterer";
import { mapSymbol, apiSymbol, markerClusterSymbol, markerClusterMethodsSymbol } from "../shared/index";
import debounce from 'debounce';

const markerClusterEvents = Object.values(MarkerClustererEvents);

export default defineComponent({
  name: "MarkerCluster",
  props: {
    options: {
      type: Object as PropType<MarkerClustererOptions>,
      default: () => ({}),
    },
    renderDebounceDelay: {
      type: Number,
      default: 10,
    }
  },
  emits: markerClusterEvents,
  setup(props, { emit, expose, slots }) {
    const markerCluster = ref<MarkerClusterer>();
    const map = inject(mapSymbol, ref());
    const api = inject(apiSymbol, ref());

    const debouncedRender = debounce(() => {
      if (markerCluster.value) {
        markerCluster.value?.render();
      }
    }, props.renderDebounceDelay);

    const addMarker = (marker: google.maps.Marker | google.maps.marker.AdvancedMarkerElement) => {
      if (markerCluster.value) {
        markerCluster.value?.addMarker(marker, true);
        debouncedRender();
      }
    };

    const removeMarker = (marker: google.maps.Marker | google.maps.marker.AdvancedMarkerElement) => {
      if (markerCluster.value) {
        markerCluster.value?.removeMarker(marker, true);
        debouncedRender();
      }
    };

    provide(markerClusterSymbol, markerCluster);
    provide(markerClusterMethodsSymbol, { addMarker, removeMarker });

    watch(
      map,
      () => {
        if (map.value) {
          markerCluster.value = markRaw(
            new MarkerClusterer({
              map: map.value,
              // Better perf than the default `SuperClusterAlgorithm`. See:
              // https://github.com/googlemaps/js-markerclusterer/pull/640
              algorithm: new SuperClusterViewportAlgorithm(props.options.algorithmOptions ?? {}),
              ...props.options,
            })
          );

          markerClusterEvents.forEach((event) => {
            markerCluster.value?.addListener(event, (e: unknown) => emit(event, e));
          });
        }
      },
      {
        immediate: true,
      }
    );

    onBeforeUnmount(() => {
      if (markerCluster.value) {
        api.value?.event.clearInstanceListeners(markerCluster.value);
        markerCluster.value.clearMarkers();
        markerCluster.value.setMap(null);
      }
      debouncedRender.clear()
    });

    expose({ markerCluster });

    return () => slots.default?.();
  },
});
