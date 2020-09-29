import { defineComponent, PropType, watch } from 'vue'
import { useMap } from '../composables/index'
import { IRectangle, IRectangleOptions } from '../@types/index'
import { rectangleEvents } from '../shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IRectangleOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let rectangle: IRectangle | null = null
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        rectangle = new api.value.Rectangle({
          ...props.options,
          map: map.value,
        })

        rectangleEvents.forEach(event => {
          rectangle?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (rectangle) {
          api.value?.event.clearInstanceListeners(rectangle)
          rectangle.setMap(null)
        }
      })
    })

    return { rectangle }
  },
  render: () => null,
})
