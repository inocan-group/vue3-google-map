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
 * Type-level tests for component event handler props.
 *
 * These verify that each component's public type exposes exactly the expected
 * set of `on*` event handler props — no more, no less. If an event is added
 * or removed from a component without updating these tests, they will fail
 * at compile time via `tsc --noEmit`.
 */

// Extract only the `on*` event handler keys from a component's public props, excluding Vue internals
type EventKeys<T> = Exclude<Extract<keyof ComponentInstance<T>["$props"], `on${string}`>, `onVnode${string}`>;

// GoogleMap
expectTypeOf<EventKeys<typeof GoogleMap>>().toEqualTypeOf<
  | "onClick"
  | "onContextmenu"
  | "onDblclick"
  | "onDrag"
  | "onDragend"
  | "onDragstart"
  | "onMousemove"
  | "onMouseout"
  | "onMouseover"
  | "onRightclick"
  | "onBounds_changed"
  | "onCenter_changed"
  | "onHeading_changed"
  | "onIdle"
  | "onIsfractionalzoomenabled_changed"
  | "onMapcapabilities_changed"
  | "onMaptypeid_changed"
  | "onProjection_changed"
  | "onRenderingtype_changed"
  | "onTilesloaded"
  | "onTilt_changed"
  | "onZoom_changed"
>();

// AdvancedMarker
expectTypeOf<EventKeys<typeof AdvancedMarker>>().toEqualTypeOf<
  "onClick" | "onDrag" | "onDragend" | "onDragstart" | "onGmp-click"
>();

// Marker (legacy)
expectTypeOf<EventKeys<typeof Marker>>().toEqualTypeOf<
  | "onClick"
  | "onDblclick"
  | "onRightclick"
  | "onDrag"
  | "onDragend"
  | "onDragstart"
  | "onMouseover"
  | "onMousedown"
  | "onMouseout"
  | "onMouseup"
  | "onContextmenu"
  | "onAnimation_changed"
  | "onDraggable_changed"
  | "onClickable_changed"
  | "onCursor_changed"
  | "onFlat_changed"
  | "onZindex_changed"
  | "onIcon_changed"
  | "onPosition_changed"
  | "onShape_changed"
  | "onTitle_changed"
  | "onVisible_changed"
>();

// Polyline
expectTypeOf<EventKeys<typeof Polyline>>().toEqualTypeOf<
  | "onClick"
  | "onDblclick"
  | "onDrag"
  | "onDragend"
  | "onDragstart"
  | "onMousedown"
  | "onMousemove"
  | "onMouseout"
  | "onMouseover"
  | "onMouseup"
  | "onRightclick"
>();

// Polygon (same events as Polyline)
expectTypeOf<EventKeys<typeof Polygon>>().toEqualTypeOf<
  | "onClick"
  | "onDblclick"
  | "onDrag"
  | "onDragend"
  | "onDragstart"
  | "onMousedown"
  | "onMousemove"
  | "onMouseout"
  | "onMouseover"
  | "onMouseup"
  | "onRightclick"
>();

// Circle (polyline events + center_changed, radius_changed)
expectTypeOf<EventKeys<typeof Circle>>().toEqualTypeOf<
  | "onClick"
  | "onDblclick"
  | "onDrag"
  | "onDragend"
  | "onDragstart"
  | "onMousedown"
  | "onMousemove"
  | "onMouseout"
  | "onMouseover"
  | "onMouseup"
  | "onRightclick"
  | "onCenter_changed"
  | "onRadius_changed"
>();

// Rectangle (polyline events + bounds_changed)
expectTypeOf<EventKeys<typeof Rectangle>>().toEqualTypeOf<
  | "onClick"
  | "onDblclick"
  | "onDrag"
  | "onDragend"
  | "onDragstart"
  | "onMousedown"
  | "onMousemove"
  | "onMouseout"
  | "onMouseover"
  | "onMouseup"
  | "onRightclick"
  | "onBounds_changed"
>();

// InfoWindow
expectTypeOf<EventKeys<typeof InfoWindow>>().toEqualTypeOf<
  | "onCloseclick"
  | "onContent_changed"
  | "onDomready"
  | "onPosition_changed"
  | "onVisible"
  | "onZindex_changed"
  | "onUpdate:modelValue"
>();
