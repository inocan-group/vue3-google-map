<script setup>
import { GoogleMap, Polyline } from '@lib'
import { apiPromise } from '@docs/shared'

const center = { lat: 0, lng: -180 }
const flightPlanCoordinates = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
]
const flightPath = {
  path: flightPlanCoordinates,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
}
</script>

# Polyline

Use the `Polyline` component to draw paths and arbitrary shapes on a map.

## Options

You can pass a [PolylineOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions) object to the `options` prop to configure your polyline.

```vue
<script setup>
import { GoogleMap, Polyline } from 'vue3-google-map'

const center = { lat: 0, lng: -180 }
const flightPlanCoordinates = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
]
const flightPath = {
  path: flightPlanCoordinates,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
}
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="3"
  >
    <Polyline :options="flightPath" />
  </GoogleMap>
</template>
```

<ClientOnly>
  <GoogleMap
    :api-promise="apiPromise"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="3"
  >
    <Polyline :options="flightPath" />
  </GoogleMap>
</ClientOnly>

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline-Events) on the `Polyline` component.
