<script setup>
import { GoogleMap, Rectangle } from '@lib'
import { apiPromise } from '@docs/shared'

const center = { lat: 33.678, lng: -116.243 }
const rectangle = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  bounds: {
    north: 33.685,
    south: 33.671,
    east: -116.234,
    west: -116.251,
  },
}
</script>

# Rectangle

Use the `Rectangle` component to draw simple rectangles on a map.

## Options

You can pass a [RectangleOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions) object to the `options` prop to configure your rectangle.

```vue
<script setup>
import { GoogleMap, Rectangle } from 'vue3-google-map'

const center = { lat: 33.678, lng: -116.243 }
const rectangle = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  bounds: {
    north: 33.685,
    south: 33.671,
    east: -116.234,
    west: -116.251,
  },
}
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    mapTypeId="terrain"
    :center="center"
    :zoom="11"
  >
    <Rectangle :options="rectangle" />
  </GoogleMap>
</template>
```

<ClientOnly>
  <GoogleMap
    :api-promise="apiPromise"
    style="width: 100%; height: 500px"
    mapTypeId="terrain"
    :center="center"
    :zoom="11"
  >
    <Rectangle :options="rectangle" />
  </GoogleMap>
</ClientOnly>

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle-Events) on the `Rectangle` component.
