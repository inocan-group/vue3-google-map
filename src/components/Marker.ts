import { defineComponent, PropType, watch } from 'vue'
import { useMap } from '@/composables/index'
import { IMarker, IMarkerOptions } from '@/@types/index'
import { markerEvents } from '@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IMarkerOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let marker: IMarker | null = null
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        marker = new api.value.Marker({
          ...props.options,
          map: map.value,
        })

        markerEvents.forEach(event => {
          marker?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (marker) {
          api.value?.event.clearInstanceListeners(marker)
          marker.setMap(null)
        }
      })
    })

    return { marker }
  },
  render: () => null,
})
