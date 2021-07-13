import { defineComponent, PropType, Ref, toRef } from "vue";
import { IComponentOptions, useSetupMapComponent } from "../composables/index";

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
  props: {
    options: {
      type: Object as PropType<google.maps.MarkerOptions>,
      required: true,
    },
  },
  emits: markerEvents,
  setup(props, { emit }) {
    const options = toRef(props, "options") as Ref<IComponentOptions>;
    const marker = useSetupMapComponent("Marker", markerEvents, options, emit);

    return { marker };
  },
  render: () => null,
});
