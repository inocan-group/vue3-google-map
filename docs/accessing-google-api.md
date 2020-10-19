# Accessing the Google API

The basic components that `vue3-google-maps` provides are fully reactive and will get you pretty far. Should you need to access the Google Maps API, however, the `GoogleMaps` component exposes the following:

- `ready`: A boolean indicating whether the API has been loaded and is ready for use.
- `map`: The [Map](https://developers.google.com/maps/documentation/javascript/reference/map#Map) class instance.
- `api`: The [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference).

<!-- prettier-ignore -->
```vue
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

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { GoogleMap } from 'vue3-google-maps'

export default defineComponent({
  components: { GoogleMap },
  setup() {
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

    watch(lng, () => {
      if (mapRef.value?.ready) {
        mapRef.value.map.panTo({ lat: 0, lng: lng.value })
      }
    })

    return { mapRef, center, lng }
  },
})
</script>

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

input[type='number'] {
  width: 200px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
```

\
<ApiAccessExample style="width: 100%; height: 500px" />

In addition, most of the subcomponents expose their instance should you need it:

- `Marker` exposes `marker` (a [Marker](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker) class instance).
- `Polyline` exposes `polyline` (a [Polyline](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline) class instance).
- `Polygon` exposes `polygon` (a [Polygon](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline) class instance).
- `Rectangle` exposes `rectangle` (a [Rectangle](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle) class instance).
- `Circle` exposes `circle` (a [Circle](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle) class instance).
