import { defineComponent, PropType, toRef, provide, computed, inject, markRaw, onBeforeUnmount, ref, watch } from "vue";
import { advancedMarkerSymbol, apiSymbol, mapSymbol, markerClusterSymbol } from "../shared/index";
import equal from "fast-deep-equal";

const markerEvents = ["click", "drag", "dragend", "dragstart", "gmp-click"];

export default defineComponent({
  name: "AdvancedMarker",
  props: {
    options: {
      type: Object as PropType<google.maps.marker.AdvancedMarkerElementOptions>,
      required: true,
    },
    pinOptions: {
      type: Object as PropType<google.maps.marker.PinElementOptions>,
      required: false,
    },
  },
  emits: markerEvents,
  setup(props, { emit, expose, slots }) {
    const options = toRef(props, "options");
    const pinOptions = toRef(props, "pinOptions");

    const marker = ref<google.maps.marker.AdvancedMarkerElement>();
    const pin = ref<google.maps.marker.PinElement>();

    const map = inject(mapSymbol, ref());
    const api = inject(apiSymbol, ref());
    const markerCluster = inject(markerClusterSymbol, ref());

    const isMarkerInCluster = computed(
      () => !!(markerCluster.value && api.value && marker.value instanceof google.maps.marker.AdvancedMarkerElement)
    );

    watch(
      [map, options],
      async (_, [oldMap, oldOptions]) => {
        const hasChanged = !equal(options.value, oldOptions) || map.value !== oldMap;

        if (!map.value || !api.value || !hasChanged) return;
        const { AdvancedMarkerElement, PinElement } = (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

        if (marker.value) {
          if (isMarkerInCluster.value) {
            markerCluster.value?.removeMarker(marker.value);
            markerCluster.value?.addMarker(marker.value);
          }
        } else {
          if (pinOptions.value) {
            pin.value = markRaw(new PinElement(pinOptions.value));
            options.value.content = pin.value.element;
          }

          marker.value = markRaw(new AdvancedMarkerElement(options.value));

          if (isMarkerInCluster.value) {
            markerCluster.value?.addMarker(marker.value);
          } else {
            marker.value.map = map.value;
          }

          markerEvents.forEach((event) => {
            marker.value?.addListener(event, (e: unknown) => emit(event, e));
          });
        }
      },
      {
        immediate: true,
      }
    );

    onBeforeUnmount(() => {
      if (marker.value) {
        api.value?.event.clearInstanceListeners(marker.value);

        if (isMarkerInCluster.value) {
          markerCluster.value?.removeMarker(marker.value);
        } else {
          marker.value.map = null;
        }
      }
    });

    provide(advancedMarkerSymbol, marker);

    expose({ marker });

    return () => slots.default?.();
  },
});
