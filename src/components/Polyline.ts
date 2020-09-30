import { defineComponent, PropType, watch, ref } from 'vue'
import { useMap } from '@/composables/index'
import { IPolyline, IPolylineOptions } from '@/@types/index'
import { polylineEvents } from '@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IPolylineOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let _polyline: IPolyline | null = null
    const polyline = ref<IPolyline | null>(null)
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        polyline.value = _polyline = new api.value.Polyline({
          ...props.options,
          map: map.value,
        })

        polylineEvents.forEach(event => {
          _polyline?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (_polyline) {
          api.value?.event.clearInstanceListeners(_polyline)
          _polyline.setMap(null)
        }
      })
    })

    return { polyline }
  },
  render: () => null,
})
