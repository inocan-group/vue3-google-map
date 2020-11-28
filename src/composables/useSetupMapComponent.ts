import { watch, ref, Ref } from 'vue';
import { useMap } from '../composables/index';
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
} from '../@types/index';

type IComponent = IMarker | IPolyline | IPolygon | IRectangle | ICircle;
type IComponentOptions = IMarkerOptions | IPolylineOptions | IPolygonOptions | IRectangleOptions | ICircleOptions;

export const useSetupMapComponent = (
  componentName: 'Marker' | 'Polyline' | 'Polygon' | 'Rectangle' | 'Circle',
  events: string[],
  options: Ref<IComponentOptions>,
  emit: (event: string, ...args: any[]) => void,
): { component: Ref<IComponent | null> } => {
  let _component: IComponent | null = null;
  const component = ref<IComponent | null>(null);
  const { map, api } = useMap();

  watch([map, options], (_, __, onInvalidate) => {
    if (map.value && api.value) {
      component.value = _component = new api.value[componentName]({
        ...options.value,
        map: map.value,
      });

      events.forEach(event => {
        _component?.addListener(event, (e: unknown) => emit(event, e));
      });
    }

    onInvalidate(() => {
      if (_component) {
        api.value?.event.clearInstanceListeners(_component);
        _component.setMap(null);
      }
    });
  });

  return { component };
};
