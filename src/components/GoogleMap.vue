<template>
  <div ref="mapRef">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { loadNow } from 'connect-google-maps'
import { useMap } from '@/composables/index'
import {
  ILatLng,
  IControlPosition,
  IScaleControlStyle,
  IMapTypeControlOptions,
  IMapTypeId,
  IMapRestriction,
  IStreetViewPanorama,
  IMapTypeStyle,
} from '@/@types/index'

export default defineComponent({
  props: {
    apiKey: String,
    backgroundColor: String,
    center: Object as PropType<ILatLng>,
    clickableIcons: Boolean,
    controlSize: Number,
    disableDefaultUi: Boolean,
    disableDoubleClickZoom: Boolean,
    draggable: Boolean,
    draggableCursor: String,
    draggingCursor: String,
    fullscreenControl: Boolean,
    fullscreenControlPosition: String as PropType<IControlPosition>,
    gestureHandling: String as PropType<'cooperative' | 'greedy' | 'none' | 'auto'>,
    heading: Number,
    keyboardShortcuts: Boolean,
    mapTypeControl: Boolean,
    mapTypeControlOptions: Object as PropType<IMapTypeControlOptions>,
    mapTypeId: {
      type: [Number, String] as PropType<IMapTypeId | string>,
    },
    maxZoom: Number,
    minZoom: Number,
    noClear: Boolean,
    panControl: Boolean,
    panControlPosition: String as PropType<IControlPosition>,
    restriction: Object as PropType<IMapRestriction>,
    rotateControl: Boolean,
    rotateControlPosition: String as PropType<IControlPosition>,
    scaleControl: Boolean,
    scaleControlStyle: Number as PropType<IScaleControlStyle>,
    scrollwheel: Boolean,
    streetView: Object as PropType<IStreetViewPanorama>,
    streetViewControl: Boolean,
    streetViewControlPosition: String as PropType<IControlPosition>,
    styles: Array as PropType<IMapTypeStyle[]>,
    tilt: Number,
    zoom: Number,
    zoomControl: Boolean,
    zoomControlPosition: String as PropType<IControlPosition>,
  },
  setup(props) {
    const mapRef = ref<HTMLElement | null>(null)
    const ready = ref(false)
    const { map, api } = useMap()

    const opts = () => ({
      backgroundColor: props.backgroundColor,
      center: props.center,
      clickableIcons: props.clickableIcons,
      controlSize: props.controlSize,
      disableDefaultUi: props.disableDefaultUi,
      disableDoubleClickZoom: props.disableDoubleClickZoom,
      draggable: props.draggable,
      draggableCursor: props.draggableCursor,
      draggingCursor: props.draggingCursor,
      fullscreenControl: props.fullscreenControl,
      fullscreenControlOptions: props.fullscreenControlPosition
        ? {
            position: api.value?.ControlPosition[props.fullscreenControlPosition],
          }
        : {},
      gestureHandling: props.gestureHandling,
      heading: props.heading,
      keyboardShortcuts: props.keyboardShortcuts,
      mapTypeControl: props.mapTypeControl,
      mapTypeControlOptions: props.mapTypeControlOptions,
      mapTypeId: props.mapTypeId,
      maxZoom: props.maxZoom,
      minZoom: props.minZoom,
      noClear: props.noClear,
      panControl: props.panControl,
      panControlOptions: props.panControlPosition
        ? {
            position: api.value?.ControlPosition[props.panControlPosition],
          }
        : {},
      restriction: props.restriction,
      rotateControl: props.rotateControl,
      rotateControlOptions: props.rotateControlPosition
        ? {
            position: api.value?.ControlPosition[props.rotateControlPosition],
          }
        : {},
      scaleControl: props.scaleControl,
      scaleControlOptions: props.scaleControlStyle
        ? {
            style: props.scaleControlStyle,
          }
        : {},
      scrollwheel: props.scrollwheel,
      streetView: props.streetView,
      streetViewControl: props.streetViewControl,
      streetViewControlOptions: props.streetViewControlPosition
        ? {
            position: api.value?.ControlPosition[props.streetViewControlPosition],
          }
        : {},
      styles: props.styles,
      tilt: props.tilt,
      zoom: props.zoom,
      zoomControl: props.zoomControl,
      zoomControlOptions: props.zoomControlPosition
        ? {
            position: api.value?.ControlPosition[props.zoomControlPosition],
          }
        : {},
    })

    loadNow('places', props.apiKey).then(res => {
      api.value = res.maps
      map.value = new api.value.Map(mapRef.value as HTMLElement, opts())

      ready.value = true

      watch(props, () => {
        map.value = new api.value!.Map(mapRef.value as HTMLElement, opts())
      })
    })

    return { mapRef, ready, map, api }
  },
})
</script>
