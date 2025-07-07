<script setup>
import { GoogleMap, Marker } from '@lib'
import { apiPromise } from '@docs/shared'

const center = { lat: 40.689247, lng: -74.044502 }
</script>

# Marker

::: warning DEPRECATED
The `Marker` component is deprecated as of February 2024. Please use the [`AdvancedMarker`](./advanced-marker.md) component instead for new projects. The legacy `google.maps.Marker` API will be removed in a future version. [Learn more about the deprecation](https://developers.google.com/maps/deprecations#googlemapsmarker_in_the_deprecated_as_of_february_2024).
:::

Use the `Marker` component to draw markers, drop pins or any custom icons on a map.

## Options

You can pass a [MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) object to the `options` prop to configure your marker.

```vue
<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 40.689247, lng: -74.044502 }
const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' }
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>
```

<ClientOnly>
  <GoogleMap
    :api-promise="apiPromise"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: { lat: 40.689247, lng: -74.044502 }, label: 'L', title: 'LADY LIBERTY' }" />
  </GoogleMap>
</ClientOnly>

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events) on the `Marker` component.
