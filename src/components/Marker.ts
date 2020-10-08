import { defineComponent, PropType, watch, ref } from 'vue'
import { useMap } from '/@/composables/index'
import { IMarker, IMarkerOptions } from '/@/@types/index'
import { markerEvents } from '/@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<IMarkerOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let _marker: IMarker | null = null
    const marker = ref<IMarker | null>(null)
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        marker.value = _marker = new api.value.Marker({
          ...props.options,
          map: map.value,
        })

        markerEvents.forEach(event => {
          _marker?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (_marker) {
          api.value?.event.clearInstanceListeners(_marker)
          _marker.setMap(null)
        }
      })
    })

    return { marker }
  },
  render: () => null,
})
