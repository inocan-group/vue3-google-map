import { defineComponent, PropType, toRef } from "vue";
import { useSetupMapComponent } from "../composables/index";
import { polylineEvents as polygonEvents } from "../shared/index";

export default defineComponent({
  name: "Polygon",
  props: {
    options: {
      type: Object as PropType<google.maps.PolygonOptions>,
      required: true,
    },
  },
  emits: polygonEvents,
  setup(props, { emit }) {
    const options = toRef(props, "options");
    const polygon = useSetupMapComponent("Polygon", polygonEvents, options, emit);

    return { polygon };
  },
  render: () => null,
});
