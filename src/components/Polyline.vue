<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'
import { useMap } from '@/composables/index'
import { Polyline, PolylineOptions } from '@types'
import { polylineEvents } from '@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<PolylineOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let polyline: Polyline | null = null
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        polyline = new api.value.Polyline({
          ...props.options,
          map: map.value,
        })

        polylineEvents.forEach(event => {
          polyline?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (polyline) {
          api.value?.event.clearInstanceListeners(polyline)
          polyline.setMap(null)
        }
      })
    })

    return { polyline }
  },
  render: () => null,
})
</script>
