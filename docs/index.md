## Introduction

`vue3-google-maps` offers a set of composable components for easy use of Google Maps in your Vue 3 projects.

## Installation

### NPM

```bash
npm install vue3-google-maps
# OR
yarn add vue3-google-maps
```

### CDN

Include the following script tag in your `index.html` (make sure to include it after Vue 3).

```html
<script src="https://unpkg.com/vue3-google-maps"></script>
```

## Your first map

To construct a map using `vue3-google-maps` you'll need to use the base `GoogleMap` component which receives your [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key), styles (e.g. setting width and height), and any [MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) to configure your map ([see this](https://github.com/inocan-group/vue3-google-maps/blob/develop/src/components/GoogleMap.vue#L24-L62) for a all the supported `MapOptions`).
Other map features can be added to your map by passing map subcomponents ([Marker](/components/marker), [Polyline](/components/polyline), [Polygon](/components/polygon), [Rectangle](/components/rectangle), [Circle](/components/circle), or [CustomControl](/components/custom-control)) to the default slot of the `GoogleMap` component.

<!-- prettier-ignore -->
```vue
<template>
  <GoogleMap
  api-key="YOUR_GOOGLE_MAPS_API_KEY"
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="13"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-maps'

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 35, lng: -95 }

    return { center }
  },
})
</script>
```

\
<GoogleMap style="width: 100%; height: 500px" :center="{ lat: 35, lng: -95 }" :zoom="13">
<Marker :options="{ position: { lat: 35, lng: -95 } }" />
</GoogleMap>
