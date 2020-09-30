import { defineComponent, PropType, watch, ref } from 'vue'
import { useMap } from '@/composables/index'
import { IPolygon, IPolygonOptions } from '@/@types/index'
import { polygonEvents } from '@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IPolygonOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let _polygon: IPolygon | null = null
    const polygon = ref<IPolygon | null>(null)
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        polygon.value = _polygon = new api.value.Polygon({
          ...props.options,
          map: map.value,
        })

        polygonEvents.forEach(event => {
          _polygon?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (_polygon) {
          api.value?.event.clearInstanceListeners(_polygon)
          _polygon.setMap(null)
        }
      })
    })

    return { polygon }
  },
  render: () => null,
})
