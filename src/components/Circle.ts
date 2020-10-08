import { defineComponent, PropType, watch, ref } from 'vue'
import { useMap } from '/@/composables/index'
import { ICircle, ICircleOptions } from '/@/@types/index'
import { circleEvents } from '/@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<ICircleOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let _circle: ICircle | null = null
    const circle = ref<ICircle | null>(null)
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        circle.value = _circle = new api.value.Circle({
          ...props.options,
          map: map.value,
        })

        circleEvents.forEach(event => {
          _circle?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (_circle) {
          api.value?.event.clearInstanceListeners(_circle)
          _circle.setMap(null)
        }
      })
    })

    return { circle }
  },
  render: () => null,
})
