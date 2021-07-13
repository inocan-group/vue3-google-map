import { useSetupMapComponent } from "../composables/index";
import { defineComponent, PropType, toRef } from "vue";
import { polylineEvents } from "../shared/index";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<google.maps.PolylineOptions>,
      required: true,
    },
  },
  emits: polylineEvents,
  setup(props, { emit }) {
    const options = toRef(props, "options");
    const polyline = useSetupMapComponent("Polyline", polylineEvents, options, emit);

    return { polyline };
  },
  render: () => null,
});
