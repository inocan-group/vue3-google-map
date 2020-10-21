import { defineComponent, PropType, toRef } from 'vue'
import { useSetupMapComponent } from '/@/composables/index'
import { ICircleOptions } from '/@/@types/index'
import { circleEvents } from '/@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<ICircleOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const options = toRef(props, 'options')
    const circle = useSetupMapComponent('Circle', circleEvents, options, emit)

    return { circle }
  },
  render: () => null,
})
