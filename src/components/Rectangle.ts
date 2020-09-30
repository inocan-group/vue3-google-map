import { defineComponent, PropType, watch, ref } from 'vue'
import { useMap } from '@/composables/index'
import { IRectangle, IRectangleOptions } from '@/@types/index'
import { rectangleEvents } from '@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IRectangleOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let _rectangle: IRectangle | null = null
    const rectangle = ref<IRectangle | null>(null)
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        rectangle.value = _rectangle = new api.value.Rectangle({
          ...props.options,
          map: map.value,
        })

        rectangleEvents.forEach(event => {
          _rectangle?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (_rectangle) {
          api.value?.event.clearInstanceListeners(_rectangle)
          _rectangle.setMap(null)
        }
      })
    })

    return { rectangle }
  },
  render: () => null,
})
