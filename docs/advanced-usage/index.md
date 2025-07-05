<script setup>
import { ref, computed, watch } from 'vue'
import { GoogleMap } from '@lib'
import { apiPromise } from '@docs/shared'

const mapRef = ref(null)
const center = { lat: 0, lng: 0 }

const _lng = ref(0)
const lng = computed({
  get: () => _lng.value,
  set: v => {
    if (!Number.isFinite(v)) {
      _lng.value = 0
    } else if (v > 180) {
      _lng.value = 180
    } else if (v < -180) {
      _lng.value = -180
    } else {
      _lng.value = v
    }
  },
})

watch([() => mapRef.value?.ready, lng], ([ready, lng]) => {
  if (!ready)
    return

  mapRef.value.map.panTo({ lat: 0, lng })
})
</script>

# Advanced Usage

The basic components that `vue3-google-map` provides are fully reactive and will get you pretty far. Should you need to access the Google Maps API, however, the `GoogleMap` component exposes the following:

- `ready`: A boolean indicating when the Google Maps script has been loaded. By this point the map instance has been created, the API is ready for use and event listeners have been set up on the map.
- `map`: The [Map](https://developers.google.com/maps/documentation/javascript/reference/map#Map) class instance.
- `api`: The [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference).
- `mapTilesLoaded`: A boolean indicating when the map tiles have been fully loaded.

In addition, most of the subcomponents expose their instance should you need it:

- `Marker` exposes `marker` (a [Marker](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker) class instance).
- `Polyline` exposes `polyline` (a [Polyline](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline) class instance).
- `Polygon` exposes `polygon` (a [Polygon](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon) class instance).
- `Rectangle` exposes `rectangle` (a [Rectangle](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle) class instance).
- `Circle` exposes `circle` (a [Circle](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle) class instance).
- `InfoWindow` exposes `infoWindow` (an [InfoWindow](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow) class instance).
- `MarkerCluster` exposes `markerCluster` (a [MarkerClusterer](https://googlemaps.github.io/js-markerclusterer/classes/MarkerClusterer.html) class instance).
- `HeatmapLayer` exposes `heatmapLayer` (a [HeatmapLayer](https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer) class instance).

## Usage Patterns

```vue
<script setup>
import { ref, computed, watch } from 'vue'
import { GoogleMap } from 'vue3-google-map'

const mapRef = ref(null)

// First pattern: compute some value using the API or map instance when "ready"
const markerIcon = computed(() => mapRef.value?.ready
  ? {
    url: /* icon image url */,
    scaledSize: new mapRef.value.api.Size(20, 20)
  }
  : null)

// Second pattern: watch for "ready" then do something with the API or map instance
watch(() => mapRef.value?.ready, (ready) => {
  if (!ready) return

  // do something with the api using `mapRef.value.api`
  // or with the map instance using `mapRef.value.map`
})
</script>

<template>
  <GoogleMap ref="mapRef">
    <template #default="{ ready, api, map, mapTilesLoaded }">
      <!-- Third pattern: Here you have access to the API and map instance.
      "ready" is a boolean that indicates when the Google Maps script
      has been loaded and the api and map instance are ready to be used -->
    </template>
  </GoogleMap>
</template>
```

Example:

```vue
<script setup>
import { ref, computed, watch } from 'vue'
import { GoogleMap } from 'vue3-google-map'

const mapRef = ref(null)
const center = { lat: 0, lng: 0 }

const _lng = ref(0)
const lng = computed({
  get: () => _lng.value,
  set: v => {
    if (!Number.isFinite(v)) {
      _lng.value = 0
    } else if (v > 180) {
      _lng.value = 180
    } else if (v < -180) {
      _lng.value = -180
    } else {
      _lng.value = v
    }
  },
})

watch([() => mapRef.value?.ready, lng], ([ready, lng]) => {
  if (!ready)
    return

  mapRef.value.map.panTo({ lat: 0, lng })
})
</script>

<template>
  <GoogleMap
    ref="mapRef"
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    class="map"
    :center="center"
    :zoom="2"
  />
  <label for="lng">Longitude</label>
  <input v-model.number="lng" id="lng" type="number" min="-180" max="180" step="10" />
</template>

<style scoped>
.map {
  position: relative;
  width: 100%;
  height: 500px;
}

.map::after {
  position: absolute;
  content: '';
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
  background: red;
}

label {
  font-weight: 500;
}

input[type='number'] {
  margin-top: 20px;
  margin-left: 10px;
  outline: 1px solid #ccc;
  border-radius: 4px;
}
</style>
```

<ClientOnly>
  <GoogleMap
    ref="mapRef"
    :api-promise="apiPromise"
    class="map"
    :center="center"
    :zoom="2"
  />
  <label for="lng">Longitude</label>
  <input v-model.number="lng" id="lng" type="number" min="-180" max="180" step="10" />
</ClientOnly>

## Loading the Google Maps API script externally

By default you would pass your API key as a prop to the `GoogleMap` component and it handles the loading of the Google Maps API script for you. There are cases, however, where you might want to load the script yourself. For example, you might be using other Google Maps components or your Vue app might be a part of a larger app that uses the Google Maps API elsewhere. In these cases you can use the `apiPromise` prop to pass a promise that resolves to the Google Maps API global `google` object.

```vue
<script setup>
import { GoogleMap, Marker } from 'vue3-google-map';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: YOUR_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places'],
});

const apiPromise = loader.load();

const center = { lat: 40.689247, lng: -74.044502 };
</script>

<template>
  <GoogleMap
    :api-promise="apiPromise"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
```

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events) on the `GoogleMap` component by using `@event_name`. For example if you want to call a function whenever the zoom value is changed, you can use it like this:

```vue
<GoogleMap
  @zoom_changed="yourFunctionName"
/>
```


<style scoped>
.map {
  position: relative;
  width: 100%;
  height: 500px;
}

.map::after {
  position: absolute;
  content: '';
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
  background: red;
}

label {
  font-weight: 500;
}

input[type='number'] {
  margin-top: 20px;
  margin-left: 10px;
  outline: 1px solid #ccc;
  border-radius: 4px;
}
</style>
