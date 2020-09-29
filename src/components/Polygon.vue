<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'
import { useMap } from '@/composables/index'
import { Polygon, PolygonOptions } from '@types'
import { polygonEvents } from '@/shared/index'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<PolygonOptions>,
      required: true,
    },
  },
  setup(props, { emit }) {
    let polygon: Polygon | null = null
    const { map, api } = useMap()

    watch([map, () => props.options], (_, __, onInvalidate) => {
      if (map.value && api.value) {
        polygon = new api.value.Polygon({
          ...props.options,
          map: map.value,
        })

        polygonEvents.forEach(event => {
          polygon?.addListener(event, () => emit(event))
        })
      }

      onInvalidate(() => {
        if (polygon) {
          api.value?.event.clearInstanceListeners(polygon)
          polygon.setMap(null)
        }
      })
    })

    return { polygon }
  },
  render: () => null,
})
</script>
