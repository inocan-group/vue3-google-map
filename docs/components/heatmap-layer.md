<script setup>
import { GoogleMap, HeatmapLayer } from '@lib'
import { apiPromise } from '@docs/shared'

const sanFrancisco = { lat: 37.774546, lng: -122.433523 };

const heatmapData = [
  { location: { lat: 37.782, lng: -122.447 }, weight: 0.5 },
  { lat: 37.782, lng: -122.445 },
  { location: { lat: 37.782, lng: -122.443 }, weight: 2 },
  { location: { lat: 37.782, lng: -122.441 }, weight: 3 },
  { location: { lat: 37.782, lng: -122.439 }, weight: 2 },
  { lat: 37.782, lng: -122.437 },
  { location: { lat: 37.782, lng: -122.435 }, weight: 0.5 },

  { location: { lat: 37.785, lng: -122.447 }, weight: 3 },
  { location: { lat: 37.785, lng: -122.445 }, weight: 2 },
  { lat: 37.785, lng: -122.443 },
  { location: { lat: 37.785, lng: -122.441 }, weight: 0.5 },
  { lat: 37.785, lng: -122.439 },
  { location: { lat: 37.785, lng: -122.437 }, weight: 2 },
  { location: { lat: 37.785, lng: -122.435 }, weight: 3 },
];
</script>

# Heatmap Layer

Use the `HeatmapLayer` component to depict the intensity of data at geographical points on the map. Make sure to include the `visualization` library in the `libraries` prop of the `GoogleMap` component.

## Options

You can pass a [HeatmapLayerOptions](https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions) object to the `options` prop to configure your heatmap layer. Note that for convenience you can use [LatLngLiteral](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngLiteral)s if you wish for the locations.

```vue
<script setup>
import { GoogleMap, HeatmapLayer } from 'vue3-google-map'

const sanFrancisco = { lat: 37.774546, lng: -122.433523 }

const heatmapData = [
  { location: { lat: 37.782, lng: -122.447 }, weight: 0.5 },
  { lat: 37.782, lng: -122.445 },
  { location: { lat: 37.782, lng: -122.443 }, weight: 2 },
  { location: { lat: 37.782, lng: -122.441 }, weight: 3 },
  { location: { lat: 37.782, lng: -122.439 }, weight: 2 },
  { lat: 37.782, lng: -122.437 },
  { location: { lat: 37.782, lng: -122.435 }, weight: 0.5 },

  { location: { lat: 37.785, lng: -122.447 }, weight: 3 },
  { location: { lat: 37.785, lng: -122.445 }, weight: 2 },
  { lat: 37.785, lng: -122.443 },
  { location: { lat: 37.785, lng: -122.441 }, weight: 0.5 },
  { lat: 37.785, lng: -122.439 },
  { location: { lat: 37.785, lng: -122.437 }, weight: 2 },
  { location: { lat: 37.785, lng: -122.435 }, weight: 3 },
]
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :libraries="['visualization']"
    style="width: 100%; height: 500px"
    :center="sanFrancisco"
    :zoom="13"
  >
    <HeatmapLayer :options="{ data: heatmapData }" />
  </GoogleMap>
</template>
```

<ClientOnly>
  <GoogleMap
    :api-promise="apiPromise"
    style="width: 100%; height: 500px"
    :center="sanFrancisco"
    :zoom="13"
  >
    <HeatmapLayer :options="{ data: heatmapData }" />
  </GoogleMap>
</ClientOnly>
