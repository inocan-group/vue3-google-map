<template>
  <div ref="mapRef">
    <!-- find out why v-if isn't working with slots -->
    <slot />
    <!-- <p v-else>API not ready yet</p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { loadNow } from 'connect-google-maps'
import { useMap } from '@/composables/index'
import { ILatLng, IControlPosition } from '../@types/index'

export default defineComponent({
  props: {
    apiKey: String,
    center: Object as PropType<ILatLng>,
    fullscreen: Boolean,
    fullscreenControlPosition: {
      type: [String, Number] as PropType<IControlPosition>,
    },
    streetView: Boolean,
    streetViewControlPosition: {
      type: [String, Number] as PropType<IControlPosition>,
    },
    zoom: Number,
  },
  setup(props) {
    const mapRef = ref<HTMLElement | null>(null)
    const ready = ref(false)
    const { map, api } = useMap()

    const opts = {
      center: props.center,
      fullscreenControl: props.fullscreen,
      fullscreenControlOptions: props.fullscreenControlPosition
        ? {
            position: props.fullscreenControlPosition,
          }
        : {},
      streetViewControl: props.streetView,
      streetViewControlOptions: props.streetViewControlPosition
        ? {
            position: props.streetViewControlPosition,
          }
        : {},
      zoom: props.zoom,
    }

    loadNow('places', props.apiKey).then(res => {
      api.value = res.maps
      map.value = new api.value.Map(mapRef.value as HTMLElement, opts)

      ready.value = true
    })

    return { mapRef, ready, map, api }
  },
})
</script>
