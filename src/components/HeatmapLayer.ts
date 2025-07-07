import { defineComponent, PropType, ref, inject, watch, markRaw, onBeforeUnmount } from "vue";
import equal from "fast-deep-equal";
import { mapSymbol, apiSymbol } from "../shared/index";

type HeatmapLayerOptions = google.maps.visualization.HeatmapLayerOptions;

interface ExtendedHeatmapLayerOptions extends Omit<HeatmapLayerOptions, "data"> {
  data: HeatmapLayerOptions["data"] | (google.maps.LatLngLiteral | { location: google.maps.LatLngLiteral })[];
}

/**
 * @deprecated The HeatmapLayer component was deprecated on May 27, 2025 and will be sunset in May 2026.
 * Google recommends migrating to third-party library integrations like deck.gl, which offers a HeatmapLayer implementation.
 * @see {@link https://developers.google.com/maps/deprecations} for more information.
 */
export default defineComponent({
  name: "HeatmapLayer",
  props: {
    options: {
      type: Object as PropType<ExtendedHeatmapLayerOptions>,
      default: () => ({}),
    },
  },
  setup(props) {
    const heatmapLayer = ref<google.maps.visualization.HeatmapLayer>();
    const map = inject(mapSymbol, ref());
    const api = inject(apiSymbol, ref());

    watch(
      [map, () => props.options],
      ([_, options], [oldMap, oldOptions]) => {
        const hasChanged = !equal(options, oldOptions) || map.value !== oldMap;

        if (map.value && api.value && hasChanged) {
          let opts: HeatmapLayerOptions;

          if (options.data && !(options.data instanceof api.value.MVCArray)) {
            const LatLng = api.value.LatLng;

            const transformedData = options.data.map((point) => {
              if (
                point instanceof LatLng ||
                ("location" in point && (point.location instanceof LatLng || point.location === null))
              ) {
                return point;
              } else {
                if ("location" in point) {
                  return { ...point, location: new LatLng(point.location as google.maps.LatLngLiteral) };
                }

                return new LatLng(point);
              }
            }) as HeatmapLayerOptions["data"];

            // Create new options object with transformed data
            opts = {
              ...options,
              data: transformedData,
            };
          } else {
            // Use options as-is when no transformation needed
            opts = options as HeatmapLayerOptions;
          }

          if (heatmapLayer.value) {
            heatmapLayer.value.setOptions(opts);
          } else {
            heatmapLayer.value = markRaw(
              new api.value.visualization.HeatmapLayer({
                ...opts,
                map: map.value,
              })
            );
          }
        }
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      if (heatmapLayer.value) {
        heatmapLayer.value.setMap(null);
      }
    });

    return { heatmapLayer };
  },
  render: () => null,
});
