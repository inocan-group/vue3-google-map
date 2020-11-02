import { defineComponent, PropType, toRef } from 'vue';
import { useSetupMapComponent } from '../composables/index';
import { IRectangleOptions } from '../@types/index';
import { rectangleEvents } from '../shared/index';

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IRectangleOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const options = toRef(props, 'options');
    const rectangle = useSetupMapComponent('Rectangle', rectangleEvents, options, emit);

    return { rectangle };
  },
  render: () => null,
});
