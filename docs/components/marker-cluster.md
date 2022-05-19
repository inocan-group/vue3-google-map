# Marker Cluster

Use the `MarkerCluster` component to display a large number of markers on a map. It will combine markers of close proximity into clusters, and simplify the display of markers on the map. Can be used with the `Marker` or `CustomMarker` components.

## Usage

Simply pass your `Marker`/`CustomMarker`(s) in the `default` slot of the `MarkerCluster` component.

<!-- prettier-ignore -->
```vue
<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="3"
  >
    <MarkerCluster>
      <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" />
    </MarkerCluster>
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Marker, MarkerCluster },
  setup() {
    const center = { lat: -28.024, lng: 140.887 }

    const locations = [
      { lat: -31.56391, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
      { lat: -33.727111, lng: 150.371124 },
      { lat: -33.848588, lng: 151.209834 },
      { lat: -33.851702, lng: 151.216968 },
      { lat: -34.671264, lng: 150.863657 },
      { lat: -35.304724, lng: 148.662905 },
      { lat: -36.817685, lng: 175.699196 },
      { lat: -36.828611, lng: 175.790222 },
      { lat: -37.75, lng: 145.116667 },
      { lat: -37.759859, lng: 145.128708 },
      { lat: -37.765015, lng: 145.133858 },
      { lat: -37.770104, lng: 145.143299 },
      { lat: -37.7737, lng: 145.145187 },
      { lat: -37.774785, lng: 145.137978 },
      { lat: -37.819616, lng: 144.968119 },
      { lat: -38.330766, lng: 144.695692 },
      { lat: -39.927193, lng: 175.053218 },
      { lat: -41.330162, lng: 174.865694 },
      { lat: -42.734358, lng: 147.439506 },
      { lat: -42.734358, lng: 147.501315 },
      { lat: -42.735258, lng: 147.438 },
      { lat: -43.999792, lng: 170.463352 },
    ]

    return { center, locations }
  },
})
</script>
```

\
<MarkerClusterExample style="width: 100%; height: 500px" />

## Options

`MarkerCluster` accepts an `options` prop (an object) where you can configure `algorithm`, `onClusterClick`, and `renderer` from the [MarkerClustererOptions](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html) interface. Note that all these options are completely optional but non-reactive.

## Events

You can listen for [the following events](https://googlemaps.github.io/js-markerclusterer/enums/MarkerClustererEvents.html) on the `MarkerCluster` component.
