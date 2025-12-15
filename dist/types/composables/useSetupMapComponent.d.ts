import { Ref } from "vue";
import { customMarkerClassSymbol } from "../shared/index";
type ICtorKey = "Marker" | "Polyline" | "Polygon" | "Rectangle" | "Circle" | typeof customMarkerClassSymbol;
type IComponent<T> = T extends "Marker" ? google.maps.Marker : T extends "Polyline" ? google.maps.Polyline : T extends "Polygon" ? google.maps.Polygon : T extends "Rectangle" ? google.maps.Rectangle : T extends "Circle" ? google.maps.Circle : T extends typeof customMarkerClassSymbol ? InstanceType<typeof google.maps.CustomMarker> : never;
type IComponentOptions<T> = T extends "Marker" ? google.maps.MarkerOptions : T extends "Polyline" ? google.maps.PolylineOptions : T extends "Polygon" ? google.maps.PolygonOptions : T extends "Rectangle" ? google.maps.RectangleOptions : T extends "Circle" ? google.maps.CircleOptions : T extends typeof customMarkerClassSymbol ? google.maps.CustomMarkerOptions & {
    element?: HTMLElement;
} : never;
export declare const useSetupMapComponent: <T extends ICtorKey>(ctorKey: T, events: string[], options: Ref<IComponentOptions<T>>, emit: (event: string, ...args: unknown[]) => void) => Ref<IComponent<T> | undefined>;
export {};
