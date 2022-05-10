import { watch, ref, Ref, inject, onBeforeUnmount, computed } from "vue";
import { apiSymbol, mapSymbol, markerClusterSymbol } from "../shared/index";

export type IComponent =
  | google.maps.Marker
  | google.maps.Polyline
  | google.maps.Polygon
  | google.maps.Rectangle
  | google.maps.Circle;

export type IComponentOptions =
  | google.maps.MarkerOptions
  | google.maps.PolylineOptions
  | google.maps.PolygonOptions
  | google.maps.RectangleOptions
  | google.maps.CircleOptions;

export const useSetupMapComponent = (
  componentName: "Marker" | "Polyline" | "Polygon" | "Rectangle" | "Circle",
  events: string[],
  options: Ref<IComponentOptions>,
  emit: (event: string, ...args: unknown[]) => void
): Ref<IComponent | null> => {
  let _component: IComponent | null = null;
  const component = ref<IComponent | null>(null);

  const map = inject(mapSymbol, ref());
  const api = inject(apiSymbol, ref());
  const markerCluster = inject(markerClusterSymbol, ref());

  const isMarkerInCluster = computed(
    () => !!(markerCluster.value && api.value && _component instanceof api.value.Marker)
  );

  watch(
    [map, options],
    (_, [oldMap, oldOptions]) => {
      const checkIfChanged = JSON.stringify(options.value) !== JSON.stringify(oldOptions) || map.value !== oldMap;
      if (map.value && api.value && checkIfChanged) {
        if (_component) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          _component.setOptions(options.value as any);

          if (isMarkerInCluster.value) {
            markerCluster.value?.removeMarker(_component as google.maps.Marker);
            markerCluster.value?.addMarker(_component as google.maps.Marker);
          }
        } else {
          if (componentName === "Marker") {
            component.value = _component = new api.value[componentName](options.value);
          } else {
            component.value = _component = new api.value[componentName]({
              ...options.value,
              map: map.value,
            });
          }

          if (isMarkerInCluster.value) {
            markerCluster.value?.addMarker(_component as google.maps.Marker);
          } else {
            _component.setMap(map.value);
          }

          events.forEach((event) => {
            _component?.addListener(event, (e: unknown) => emit(event, e));
          });
        }
      }
    },
    {
      immediate: true,
    }
  );

  onBeforeUnmount(() => {
    if (_component) {
      api.value?.event.clearInstanceListeners(_component);

      if (isMarkerInCluster.value) {
        markerCluster.value?.removeMarker(_component as google.maps.Marker);
      } else {
        _component.setMap(null);
      }
    }
  });

  return component;
};
