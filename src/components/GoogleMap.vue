<template>
  <div ref="mapRef">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, toRef } from 'vue'
import { loadNow } from 'connect-google-maps'
import { useMap } from '../composables/index'
import {
  IMapOptions,
  ILatLng,
  IControlPosition,
  IScaleControlStyle,
  IMapTypeControlOptions,
  IMapTypeId,
  IMapRestriction,
  IStreetViewPanorama,
  IMapTypeStyle,
} from '../@types/index'

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
  },
  setup(props) {
    const mapRef = ref<HTMLElement | null>(null)
    const ready = ref(false)
    const { map, api } = useMap()

    const resolveOptions = () => {
      const opts = {
        backgroundColor: props.backgroundColor,
        center: props.center,
        clickableIcons: props.clickableIcons,
        controlSize: props.controlSize,
        disableDefaultUI: props.disableDefaultUi,
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
      }

      // Strip undefined keys. Without this Map.setOptions doesn't behave very well.
      ;(Object.keys(opts) as (keyof IMapOptions)[]).forEach(key => opts[key] === undefined && delete opts[key])

      return opts
    }

    // Only run this in a browser env since it needs to use the `document` object
    // and would error out in a node env (i.e. vitepress/vuepress SSR)
    if (typeof window !== 'undefined') {
      loadNow('places', props.apiKey).then(({ maps }) => {
        const { Map } = (api.value = maps)
        map.value = new Map(mapRef.value as HTMLElement, resolveOptions())

        ready.value = true

        const otherPropsAsRefs = (Object.keys(props) as (keyof typeof props)[])
          .filter(key => !['center', 'zoom'].includes(key))
          .map(key => toRef(props, key))

        watch(
          [() => props.center, () => props.zoom, ...otherPropsAsRefs] as const,
          ([center, zoom], [oldCenter, oldZoom]) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { center: _, zoom: __, ...otherOptions } = resolveOptions()

            map.value?.setOptions(otherOptions)

            if (zoom !== undefined && zoom !== oldZoom) {
              map.value?.setZoom(zoom)
            }

            if (center) {
              if (!oldCenter || center.lng !== oldCenter.lng || center.lat !== oldCenter.lat) {
                map.value?.panTo(center)
              }
            }
          },
        )
      })
    }

    return { mapRef, ready, map, api }
  },
})
</script>
