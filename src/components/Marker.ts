import { defineComponent, PropType, toRef, provide, Ref } from "vue";
import { useSetupMapComponent } from "../composables/index";
import { markerSymbol } from "../shared/index";

export interface IMarkerExposed {
  marker: Ref<google.maps.Marker | undefined>;
}

export const markerEvents = [
  "animation_changed",
  "click",
  "dblclick",
  "rightclick",
  "dragstart",
  "dragend",
  "drag",
  "mouseover",
  "mousedown",
  "mouseout",
  "mouseup",
  "draggable_changed",
  "clickable_changed",
  "contextmenu",
  "cursor_changed",
  "flat_changed",
  "zindex_changed",
  "icon_changed",
  "position_changed",
  "shape_changed",
  "title_changed",
  "visible_changed",
];

/**
 * @deprecated The Marker component is deprecated as of February 2024. Use AdvancedMarker instead.
 * The google.maps.Marker API is deprecated and will be removed in a future version.
 * Migrate to AdvancedMarker for the latest features and better performance.
 * @see {@link https://developers.google.com/maps/deprecations} for more information.
 */
export default defineComponent({
  name: "Marker",
  props: {
    options: {
      type: Object as PropType<google.maps.MarkerOptions>,
      required: true,
    },
  },
  emits: markerEvents,
  setup(props, { emit, expose, slots }) {
    const options = toRef(props, "options");
    const marker = useSetupMapComponent("Marker", markerEvents, options, emit);
    provide(markerSymbol, marker);

    expose({ marker });

    return () => slots.default?.();
  },
});
