<script setup>
import { GoogleMap, Marker } from '@lib'
import { apiPromise } from '@docs/shared'

const center = { lat: 40.689247, lng: -74.044502 }
</script>

# Getting Started

`vue3-google-map` offers a set of composable components for easy use of Google Maps in your Vue 3 projects.

## Installation

### NPM

```bash
npm install vue3-google-map
# OR
yarn add vue3-google-map
```

### CDN

Include the following script tag in your `index.html` (make sure to include it after Vue 3).

```html
<script src="https://unpkg.com/vue3-google-map"></script>
```

## Your first map

To construct a map using `vue3-google-map` you'll need to use the base `GoogleMap` component which receives your [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key), styles (e.g. setting width and height), and any [MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) to configure your map ([see this](https://github.com/inocan-group/vue3-google-map/blob/develop/src/components/GoogleMap.vue#L36-L230) for a all the supported `MapOptions`).
Other map features can be added to your map by passing map subcomponents ([Marker](/components/marker), [Polyline](/components/polyline), [Polygon](/components/polygon), [Rectangle](/components/rectangle), [Circle](/components/circle), or [CustomControl](/components/custom-control)) to the default slot of the `GoogleMap` component. 

The [the following events](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events) will be emitted by the `GoogleMap` component and can be listened to by using `@event_name`.

```vue
<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 40.689247, lng: -74.044502 }
</script>

<template>
  <GoogleMap
  api-key="YOUR_GOOGLE_MAPS_API_KEY"
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="15"
  >
    <Marker :options="{ position: center }" />
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
    <Marker :options="{ position: { lat: 40.689247, lng: -74.044502 } }" />
  </GoogleMap>
</ClientOnly>
