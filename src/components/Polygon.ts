import { defineComponent, PropType, toRef } from 'vue';
import { useSetupMapComponent } from '../composables/index';
import { IPolygonOptions } from '../@types/index';
import { polygonEvents } from '../shared/index';

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IPolygonOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const options = toRef(props, 'options');
    const polygon = useSetupMapComponent('Polygon', polygonEvents, options, emit);

    return { polygon };
  },
  render: () => null,
});
