import { defineComponent, PropType, ref, provide, inject, watch, markRaw, onBeforeUnmount } from "vue";
import {
  MarkerClusterer,
  MarkerClustererOptions,
  MarkerClustererEvents,
  SuperClusterViewportAlgorithm,
} from "@googlemaps/markerclusterer";
import { mapSymbol, apiSymbol, markerClusterSymbol } from "../shared/index";

const markerClusterEvents = Object.values(MarkerClustererEvents);

export default defineComponent({
  name: "MarkerCluster",
  props: {
    options: {
      type: Object as PropType<MarkerClustererOptions>,
      default: () => ({}),
    },
  },
  emits: markerClusterEvents,
  setup(props, { emit, expose, slots }) {
    const markerCluster = ref<MarkerClusterer>();
    const map = inject(mapSymbol, ref());
    const api = inject(apiSymbol, ref());

    provide(markerClusterSymbol, markerCluster);

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
    });

    expose({ markerCluster });

    return () => slots.default?.();
  },
});
