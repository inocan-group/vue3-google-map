import { defineComponent, PropType, toRef } from "vue";
import { useSetupMapComponent } from "../composables/index";
import { polylineEvents } from "../shared/index";

const circleEvents = polylineEvents.concat(["center_changed", "radius_changed"]);

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<google.maps.CircleOptions>,
      required: true,
    },
  },
  emits: circleEvents,
  setup(props, { emit }) {
    const options = toRef(props, "options");
    const circle = useSetupMapComponent("Circle", circleEvents, options, emit);

    return { circle };
  },
  render: () => null,
});
