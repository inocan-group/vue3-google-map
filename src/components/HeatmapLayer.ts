import { defineComponent, PropType, ref, inject, watch, markRaw, onBeforeUnmount } from "vue";
import { mapSymbol, apiSymbol } from "../shared/index";

type HeatmapLayerOptions = google.maps.visualization.HeatmapLayerOptions;

interface ExtendedHeatmapLayerOptions extends Omit<HeatmapLayerOptions, "data"> {
  data: HeatmapLayerOptions["data"] | (google.maps.LatLngLiteral | { location: google.maps.LatLngLiteral })[];
}

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
        const checkIfChanged = JSON.stringify(options) !== JSON.stringify(oldOptions) || map.value !== oldMap;
        if (map.value && api.value && checkIfChanged) {
          if (options.data && !(options.data instanceof api.value.MVCArray)) {
            const LatLng = api.value.LatLng;

            options.data = options.data?.map((point) => {
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
          }

          if (heatmapLayer.value) {
            heatmapLayer.value.setOptions(options as HeatmapLayerOptions);
          } else {
            heatmapLayer.value = markRaw(
              new api.value.visualization.HeatmapLayer({
                ...options,
                map: map.value,
              } as HeatmapLayerOptions)
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

    return heatmapLayer;
  },
});
