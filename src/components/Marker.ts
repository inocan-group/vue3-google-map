import { defineComponent, PropType, toRef, provide } from "vue";
import { useSetupMapComponent } from "../composables/index";
import { markerSymbol } from "../shared/index";

const markerEvents = [
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
  "rightclick",
  "zindex_changed",
  "icon_changed",
  "position_changed",
  "shape_changed",
  "title_changed",
  "visible_changed",
];

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
