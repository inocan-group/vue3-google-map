import { defineComponent, PropType, Ref, toRef } from "vue";
import { IComponentOptions, useSetupMapComponent } from "../composables/index";
import { markerEvents } from "../shared/index";

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
