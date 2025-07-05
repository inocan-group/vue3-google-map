<script setup>
import { GoogleMap, AdvancedMarker } from '@lib'
import { apiPromise } from '@docs/shared'

const center = { lat: 40.689247, lng: -74.044502 }
</script>


# Advanced Marker

Use the `AdvancedMarker` component to draw markers, drop pins or any custom icons on a map. `AdvancedMarker` is the new version offered by google when deprecated the `Marker` component ([read more here](https://developers.google.com/maps/deprecations#googlemapsmarker_in_the_deprecated_as_of_february_2024)).

In order to use the `AdvancedMarker` component is necessary to specify a MapId on declaring the `GoogleMap` component ([see more here](https://developers.google.com/maps/documentation/javascript/advanced-markers/start#create_a_map_id)).

## Options

You can pass a [AdvancedMarkerElementOptions](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions) object to the `options` prop to configure your marker.

You can also pass a [PinElementOptions interface](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions) object to customize pin used by the marker.

Additionally, `AdvancedMarker` supports custom slot content via the `content` slot, allowing you to use custom HTML or Vue components inside the marker.

```vue
<script setup>
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'

const center = { lat: 40.689247, lng: -74.044502 }
const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' }
const pinOptions = { background: '#FBBC04' }
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    mapId="DEMO_MAP_ID"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <AdvancedMarker :options="markerOptions" :pin-options="pinOptions"/>
    <AdvancedMarker :options="markerOptions">
       <template #content>
         <div style="background: white; color: black; padding: 5px; border-radius: 5px">
          Custom Content
        </div>
       </template>
    </AdvancedMarker>
  </GoogleMap>
</template>
```

<ClientOnly>
  <GoogleMap
    :api-promise="apiPromise"
    mapId="DEMO_MAP_ID"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <AdvancedMarker :options="{ position: { lat: 40.689247, lng: -74.044502 } }" :pin-options="{ background: '#FBBC04' }" />
    <AdvancedMarker :options="{ position: { lat: 40.689247, lng: -74.044502 } }">
      <template #content>
        <div style="background: white; color: black; padding: 5px; border-radius: 5px;">
          Custom Content
        </div>
      </template>
    </AdvancedMarker>
  </GoogleMap>
</ClientOnly>

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement-Events) on the `AdvancedMarker` component.
