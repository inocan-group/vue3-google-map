import { watch, ref, Ref, inject, onBeforeUnmount, computed, markRaw } from "vue";
import equal from "fast-deep-equal";
import { apiSymbol, mapSymbol, markerClusterSymbol, customMarkerClassSymbol, markerClusterMethodsSymbol } from "../shared/index";

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
  const markerClusterMethods = inject(markerClusterMethodsSymbol, undefined);

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
      const hasChanged = !equal(options.value, oldOptions) || map.value !== oldMap;

      if (!map.value || !api.value || !hasChanged) return;

      if (component.value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component.value.setOptions(options.value as any);

        if (isMarkerInCluster.value) {
          markerClusterMethods?.removeMarker(component.value as google.maps.Marker);
          markerClusterMethods?.addMarker(component.value as google.maps.Marker);
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
          markerClusterMethods?.addMarker(component.value as google.maps.Marker);
        } else {
          component.value.setMap(map.value);
        }

        events.forEach((event) => {
          component.value?.addListener(event, (e: unknown) => emit(event, e));
        });
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
        markerClusterMethods?.removeMarker(component.value as google.maps.Marker);
      } else {
        component.value.setMap(null);
      }
    }
  });

  return component;
};
