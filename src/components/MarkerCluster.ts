import { defineComponent, PropType, ref, provide, inject, watch, markRaw, onBeforeUnmount, type Ref } from "vue";
import {
  MarkerClustererOptions,
  MarkerClustererEvents,
  SuperClusterViewportAlgorithm,
  type SuperClusterViewportOptions,
} from "@googlemaps/markerclusterer";
import { mapSymbol, apiSymbol, markerClusterSymbol } from "../shared/index";
import { DebouncedMarkerClusterer } from "./DebouncedMarkerClusterer";

/**
 * Wrapper around SuperClusterViewportAlgorithm that ensures the supercluster
 * is properly initialized even when starting with zero markers.
 *
 * This fixes an issue where SuperClusterViewportAlgorithm.getClusters() would
 * throw "Cannot read properties of undefined (reading 'range')" when the
 * algorithm's calculate() method is called for the first time with an empty
 * markers array (which can happen with an empty MarkerCluster component).
 */
class SafeSuperClusterViewportAlgorithm extends SuperClusterViewportAlgorithm {
  constructor(options: SuperClusterViewportOptions) {
    super(options);
    // Initialize the supercluster with an empty dataset to ensure the internal
    // tree structure is created. This prevents errors when getClusters() is called
    // before any markers have been added.
    this.superCluster.load([]);
  }
}

export interface IMarkerClusterExposed {
  markerCluster: Ref<DebouncedMarkerClusterer | undefined>;
}

export const markerClusterEvents = Object.values(MarkerClustererEvents);

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
    },
  },
  emits: markerClusterEvents,
  setup(props, { emit, expose, slots }) {
    const markerCluster = ref<DebouncedMarkerClusterer>();
    const map = inject(mapSymbol, ref());
    const api = inject(apiSymbol, ref());

    provide(markerClusterSymbol, markerCluster);

    watch(
      map,
      () => {
        if (map.value) {
          markerCluster.value = markRaw(
            new DebouncedMarkerClusterer(
              {
                map: map.value,
                // Better perf than the default `SuperClusterAlgorithm`. See:
                // https://github.com/googlemaps/js-markerclusterer/pull/640
                algorithm: new SafeSuperClusterViewportAlgorithm(props.options.algorithmOptions ?? {}),
                ...props.options,
              },
              props.renderDebounceDelay
            )
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
        markerCluster.value.clearMarkers(true); // Skip render since we're destroying
        markerCluster.value.setMap(null);
        markerCluster.value.destroy();
      }
    });

    expose({ markerCluster });

    return () => slots.default?.();
  },
});
