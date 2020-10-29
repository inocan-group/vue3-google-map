import { defineComponent, PropType, toRef } from 'vue'
import { useSetupMapComponent } from '../composables/index'
import { IPolylineOptions } from '../@types/index'
import { polylineEvents } from '../shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IPolylineOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const options = toRef(props, 'options')
    const polyline = useSetupMapComponent('Polyline', polylineEvents, options, emit)

    return { polyline }
  },
  render: () => null,
})
