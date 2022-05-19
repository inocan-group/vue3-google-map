import { watch, ref, Ref, inject, onBeforeUnmount, computed, markRaw } from "vue";
import { apiSymbol, mapSymbol, markerClusterSymbol, customMarkerClassSymbol } from "../shared/index";

type ICtorKey = "Marker" | "Polyline" | "Polygon" | "Rectangle" | "Circle" | typeof customMarkerClassSymbol;

type IComponent<T> = T extends "Marker"
  ? google.maps.Marker
  : T extends "Polyline"
  ? google.maps.Polyline
  : T extends "Polygon"
  ? google.maps.Polygon
  : T extends "Rectangle"
  ? google.maps.Rectangle
  : T extends "Circle"
  ? google.maps.Circle
  : T extends typeof customMarkerClassSymbol
  ? InstanceType<typeof google.maps.CustomMarker>
  : never;

type IShape<T = unknown> = Exclude<IComponent<T>, google.maps.Marker | typeof google.maps.CustomMarker>;

type IComponentOptions<T> = T extends "Marker"
  ? google.maps.MarkerOptions
  : T extends "Polyline"
  ? google.maps.PolylineOptions
  : T extends "Polygon"
  ? google.maps.PolygonOptions
  : T extends "Rectangle"
  ? google.maps.RectangleOptions
  : T extends "Circle"
  ? google.maps.CircleOptions
  : T extends typeof customMarkerClassSymbol
  ? google.maps.CustomMarkerOptions & { element?: HTMLElement }
  : never;

type IShapeOptions<T = unknown> = Exclude<IComponent<T>, google.maps.MarkerOptions | google.maps.CustomMarkerOptions>;

const isMarkerCtorKey = (key: ICtorKey): key is "Marker" => key === "Marker";
const isCustomMarkerCtorKey = (key: ICtorKey): key is typeof customMarkerClassSymbol => key === customMarkerClassSymbol;

export const useSetupMapComponent = <T extends ICtorKey>(
  ctorKey: T,
  events: string[],
  options: Ref<IComponentOptions<T>>,
  emit: (event: string, ...args: unknown[]) => void
): Ref<IComponent<T> | undefined> => {
  const component = ref<IComponent<T>>();

  const map = inject(mapSymbol, ref());
  const api = inject(apiSymbol, ref());
  const markerCluster = inject(markerClusterSymbol, ref());

  const isMarkerInCluster = computed(
    () =>
      !!(
        markerCluster.value &&
        api.value &&
        (component.value instanceof api.value.Marker || component.value instanceof api.value[customMarkerClassSymbol])
      )
  );

  watch(
    [map, options],
    (_, [oldMap, oldOptions]) => {
      const checkIfChanged = JSON.stringify(options.value) !== JSON.stringify(oldOptions) || map.value !== oldMap;
      if (map.value && api.value && checkIfChanged) {
        if (component.value) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component.value.setOptions(options.value as any);

          if (isMarkerInCluster.value) {
            markerCluster.value?.removeMarker(component.value as google.maps.Marker);
            markerCluster.value?.addMarker(component.value as google.maps.Marker);
          }
        } else {
          if (isMarkerCtorKey(ctorKey)) {
            component.value = markRaw(
              new api.value[ctorKey](options.value as IComponentOptions<typeof ctorKey>)
            ) as IComponent<typeof ctorKey>;
          } else if (isCustomMarkerCtorKey(ctorKey)) {
            component.value = markRaw(
              new api.value[ctorKey](options.value as IComponentOptions<typeof ctorKey>)
            ) as IComponent<typeof ctorKey>;
          } else {
            component.value = markRaw(
              new api.value[ctorKey]({
                ...options.value,
                map: map.value,
              } as IShapeOptions)
            ) as IShape;
          }

          if (isMarkerInCluster.value) {
            markerCluster.value?.addMarker(component.value as google.maps.Marker);
          } else {
            component.value.setMap(map.value);
          }

          events.forEach((event) => {
            component.value?.addListener(event, (e: unknown) => emit(event, e));
          });
        }
      }
    },
    {
      immediate: true,
    }
  );

  onBeforeUnmount(() => {
    if (component.value) {
      api.value?.event.clearInstanceListeners(component.value);

      if (isMarkerInCluster.value) {
        markerCluster.value?.removeMarker(component.value as google.maps.Marker);
      } else {
        component.value.setMap(null);
      }
    }
  });

  return component;
};
