# Marker

Use the `Marker` component to draw markers, drop pins or any custom icons on a map.

## Options

You can pass a [MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) object to the `options` prop to configure your marker.

<!-- prettier-ignore -->
```vue
<template>
  <GoogleMap
  api-key="YOUR_GOOGLE_MAPS_API_KEY"
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="13"
  >
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 35, lng: -95 }
    const markerOptions = { position: center, label: 'M', title: 'MY MARKER' }

    return { center, markerOptions }
  },
})
</script>
```

\
<GoogleMap style="width: 100%; height: 500px" :center="{ lat: 35, lng: -95 }" :zoom="13">
<Marker :options="{ position: { lat: 35, lng: -95 }, label: 'M', title: 'MY MARKER' }" />
</GoogleMap>

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker.animation_changed) on the `Marker` component.
