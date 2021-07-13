import { useSetupMapComponent } from "../composables/index";
import { defineComponent, PropType, toRef } from "vue";
import { polylineEvents } from "../shared/index";

const rectangleEvents = polylineEvents.concat(["bounds_changed"]);

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<google.maps.RectangleOptions>,
      required: true,
    },
  },
  emits: rectangleEvents,
  setup(props, { emit }) {
    const options = toRef(props, "options");
    const rectangle = useSetupMapComponent("Rectangle", rectangleEvents, options, emit);

    return { rectangle };
  },
  render: () => null,
});
