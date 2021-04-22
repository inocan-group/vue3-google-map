import { defineComponent, PropType, Ref, toRef } from "vue";
import { IComponentOptions, useSetupMapComponent } from "../composables/index";
import { IMarkerOptions } from "../@types/index";
import { markerEvents } from "../shared/index";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IMarkerOptions>,
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
