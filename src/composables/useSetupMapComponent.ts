import { watch, ref, Ref, inject } from "vue";
import {
  IMarker,
  IPolyline,
  IPolygon,
  IRectangle,
  ICircle,
  IMarkerOptions,
  IPolylineOptions,
  IPolygonOptions,
  IRectangleOptions,
  ICircleOptions,
} from "../@types/index";
import { apiSymbol, mapSymbol } from "../shared/index";

export type IComponent = IMarker | IPolyline | IPolygon | IRectangle | ICircle;
export type IComponentOptions =
  | IMarkerOptions
  | IPolylineOptions
  | IPolygonOptions
  | IRectangleOptions
  | ICircleOptions;

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
    (_, __, onInvalidate) => {
      if (map.value && api.value) {
        component.value = _component = new api.value[componentName]({
          ...options.value,
          map: map.value,
        });

        events.forEach((event) => {
          _component?.addListener(event, (e: unknown) => emit(event, e));
        });
      }

      onInvalidate(() => {
        if (_component) {
          api.value?.event.clearInstanceListeners(_component);
          _component.setMap(null);
        }
      });
    },
    {
      immediate: true,
    }
  );

  return { component };
};
