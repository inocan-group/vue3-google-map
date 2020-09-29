import { defineComponent, PropType, watch } from 'vue'
import { useMap } from '@/composables/index'
import { ICircle, ICircleOptions } from '@/@types/index'
import { circleEvents } from '@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<ICircleOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let circle: ICircle | null = null
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        circle = new api.value.Circle({
          ...props.options,
          map: map.value,
        })

        circleEvents.forEach(event => {
          circle?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (circle) {
          api.value?.event.clearInstanceListeners(circle)
          circle.setMap(null)
        }
      })
    })

    return { circle }
  },
  render: () => null,
})
