import { expectTypeOf } from "expect-type";
import type { ComponentInstance } from "vue";
import type {
  GoogleMap,
  AdvancedMarker,
  Marker,
  Polyline,
  Polygon,
  Rectangle,
  Circle,
  InfoWindow,
} from "vue3-google-map";

/**
 * Type-level tests for component prop interfaces.
 *
 * These verify that each component's public type exposes exactly the expected
 * set of props with the correct types. If a prop is added, removed, or its
 * type changes without updating these tests, they will fail at compile time
 * via `tsc --noEmit`.
 */

// Extract prop keys, excluding event handlers, Vue internals, and HTML attributes
type PropKeys<T> = Exclude<
  keyof ComponentInstance<T>["$props"],
  `on${string}` | "key" | "ref" | "ref_for" | "ref_key" | "class" | "style"
>;

// Shorthand for extracting a component's full props type
type Props<T> = ComponentInstance<T>["$props"];

// --- Prop keys ---

// GoogleMap
expectTypeOf<PropKeys<typeof GoogleMap>>().toEqualTypeOf<
  | "apiPromise"
  | "apiKey"
  | "version"
  | "libraries"
  | "region"
  | "language"
  | "backgroundColor"
  | "center"
  | "clickableIcons"
  | "colorScheme"
  | "controlSize"
  | "disableDefaultUi"
  | "disableDoubleClickZoom"
  | "draggable"
  | "draggableCursor"
  | "draggingCursor"
  | "fullscreenControl"
  | "fullscreenControlPosition"
  | "gestureHandling"
  | "heading"
  | "isFractionalZoomEnabled"
  | "keyboardShortcuts"
  | "mapTypeControl"
  | "mapTypeControlOptions"
  | "mapTypeId"
  | "mapId"
  | "maxZoom"
  | "minZoom"
  | "noClear"
  | "panControl"
  | "panControlPosition"
  | "restriction"
  | "rotateControl"
  | "rotateControlPosition"
  | "scaleControl"
  | "scaleControlStyle"
  | "scrollwheel"
  | "streetView"
  | "streetViewControl"
  | "streetViewControlPosition"
  | "styles"
  | "tilt"
  | "zoom"
  | "zoomControl"
  | "zoomControlPosition"
  | "cameraControl"
  | "cameraControlPosition"
>();

// AdvancedMarker
expectTypeOf<PropKeys<typeof AdvancedMarker>>().toEqualTypeOf<"options" | "pinOptions">();

// Marker (legacy)
expectTypeOf<PropKeys<typeof Marker>>().toEqualTypeOf<"options">();

// Polyline
expectTypeOf<PropKeys<typeof Polyline>>().toEqualTypeOf<"options">();

// Polygon
expectTypeOf<PropKeys<typeof Polygon>>().toEqualTypeOf<"options">();

// Circle
expectTypeOf<PropKeys<typeof Circle>>().toEqualTypeOf<"options">();

// Rectangle
expectTypeOf<PropKeys<typeof Rectangle>>().toEqualTypeOf<"options">();

// InfoWindow
expectTypeOf<PropKeys<typeof InfoWindow>>().toEqualTypeOf<"options" | "modelValue">();

// --- Prop value types ---

// GoogleMap
expectTypeOf<Props<typeof GoogleMap>["center"]>().toEqualTypeOf<
  google.maps.LatLng | google.maps.LatLngLiteral | undefined
>();

expectTypeOf<Props<typeof GoogleMap>["gestureHandling"]>().toEqualTypeOf<
  "cooperative" | "greedy" | "none" | "auto" | undefined
>();

// AdvancedMarker
expectTypeOf<
  Props<typeof AdvancedMarker>["options"]
>().toEqualTypeOf<google.maps.marker.AdvancedMarkerElementOptions>();

expectTypeOf<Props<typeof AdvancedMarker>["pinOptions"]>().toEqualTypeOf<
  google.maps.marker.PinElementOptions | undefined
>();

// Marker (legacy)
expectTypeOf<Props<typeof Marker>["options"]>().toEqualTypeOf<google.maps.MarkerOptions>();

// Polyline
expectTypeOf<Props<typeof Polyline>["options"]>().toEqualTypeOf<google.maps.PolylineOptions>();

// Polygon
expectTypeOf<Props<typeof Polygon>["options"]>().toEqualTypeOf<google.maps.PolygonOptions>();

// Circle
expectTypeOf<Props<typeof Circle>["options"]>().toEqualTypeOf<google.maps.CircleOptions>();

// Rectangle
expectTypeOf<Props<typeof Rectangle>["options"]>().toEqualTypeOf<google.maps.RectangleOptions>();

// InfoWindow
expectTypeOf<Props<typeof InfoWindow>["options"]>().toEqualTypeOf<google.maps.InfoWindowOptions | undefined>();

expectTypeOf<Props<typeof InfoWindow>["modelValue"]>().toEqualTypeOf<boolean | undefined>();
