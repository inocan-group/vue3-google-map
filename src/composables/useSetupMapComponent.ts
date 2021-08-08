import { watch, ref, Ref, inject, onBeforeUnmount } from "vue";
import { apiSymbol, mapSymbol } from "../shared/index";

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
): { component: Ref<IComponent | null> } => {
  let _component: IComponent | null = null;
  const component = ref<IComponent | null>(null);

  const map = inject(mapSymbol, ref(null));
  const api = inject(apiSymbol, ref(null));

  watch(
    [map, options],
    (_, [oldMap, oldOptions]) => {
      const checkIfChanged = JSON.stringify(options.value) !== JSON.stringify(oldOptions) || map.value !== oldMap;
      if (map.value && api.value && checkIfChanged) {
        if (_component) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          _component.setOptions(options.value as any);
          _component.setMap(map.value);
        } else {
          component.value = _component = new api.value[componentName]({
            ...options.value,
            map: map.value,
          });
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
      _component.setMap(null);
    }
  });

  return { component };
};
