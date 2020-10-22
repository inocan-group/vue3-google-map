<template>
  <div ref="mapRef">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { loadNow } from 'connect-google-maps'
import { useMap } from '/@/composables/index'
import {
  ILatLng,
  IControlPosition,
  IScaleControlStyle,
  IMapTypeControlOptions,
  IMapTypeId,
  IMapRestriction,
  IStreetViewPanorama,
  IMapTypeStyle,
  ITheme,
} from '/@/@types/index'

export default defineComponent({
  props: {
    apiKey: String,
    backgroundColor: String,
    center: Object as PropType<ILatLng>,
    clickableIcons: { type: Boolean, default: undefined },
    controlSize: Number,
    disableDefaultUi: { type: Boolean, default: undefined },
    disableDoubleClickZoom: { type: Boolean, default: undefined },
    draggable: { type: Boolean, default: undefined },
    draggableCursor: String,
    draggingCursor: String,
    fullscreenControl: { type: Boolean, default: undefined },
    fullscreenControlPosition: String as PropType<IControlPosition>,
    gestureHandling: String as PropType<'cooperative' | 'greedy' | 'none' | 'auto'>,
    heading: Number,
    keyboardShortcuts: { type: Boolean, default: undefined },
    mapTypeControl: { type: Boolean, default: undefined },
    mapTypeControlOptions: Object as PropType<IMapTypeControlOptions>,
    mapTypeId: {
      type: [Number, String] as PropType<IMapTypeId | string>,
    },
    maxZoom: Number,
    minZoom: Number,
    noClear: { type: Boolean, default: undefined },
    panControl: { type: Boolean, default: undefined },
    panControlPosition: String as PropType<IControlPosition>,
    restriction: Object as PropType<IMapRestriction>,
    rotateControl: { type: Boolean, default: undefined },
    rotateControlPosition: String as PropType<IControlPosition>,
    scaleControl: { type: Boolean, default: undefined },
    scaleControlStyle: Number as PropType<IScaleControlStyle>,
    scrollwheel: { type: Boolean, default: undefined },
    streetView: Object as PropType<IStreetViewPanorama>,
    streetViewControl: { type: Boolean, default: undefined },
    streetViewControlPosition: String as PropType<IControlPosition>,
    styles: Array as PropType<IMapTypeStyle[]>,
    tilt: Number,
    zoom: Number,
    zoomControl: { type: Boolean, default: undefined },
    zoomControlPosition: String as PropType<IControlPosition>,
    theme: String as PropType<ITheme>,
  },
  setup(props) {
    const mapRef = ref<HTMLElement | null>(null)
    const ready = ref(false)
    const { map, api } = useMap()

    const resolveOptions = async () => {
      let theme

      if (props.theme) {
        ;({ [props.theme]: theme } = await import(`/@/themes/index`))
      }

      return {
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
        styles: theme || props.styles,
        tilt: props.tilt,
        zoom: props.zoom,
        zoomControl: props.zoomControl,
        zoomControlOptions: props.zoomControlPosition
          ? {
              position: api.value?.ControlPosition[props.zoomControlPosition],
            }
          : {},
      }
    }

    // Only run this in a browser env since it needs to use the `document` object
    // and would error out in a node env (i.e. vitepress/vuepress SSR)
    if (typeof window !== 'undefined') {
      Promise.all([loadNow('places', props.apiKey), resolveOptions()]).then(([{ maps }, options]) => {
        const { Map } = (api.value = maps)
        map.value = new Map(mapRef.value as HTMLElement, options)

        ready.value = true

        watch(props, () => {
          resolveOptions().then(options => {
            map.value = new Map(mapRef.value as HTMLElement, options)
          })
        })
      })
    }

    return { mapRef, ready, map, api }
  },
})
</script>
