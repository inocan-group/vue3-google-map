---
cities:
  chicago:
    center:
      lat: 41.878
      lng: -87.629
    population: 2714856
  newyork:
    center:
      lat: 40.714
      lng: -74.005
    population: 8405837
  losangeles:
    center:
      lat: 34.052
      lng: -118.243
    population: 3857799
  vancouver:
    center:
      lat: 49.25
      lng: -123.1
    population: 603502

circleStyles:
  strokeColor: "#FF0000"
  strokeOpacity: 0.8
  strokeWeight: 2
  fillColor: "#FF0000"
  fillOpacity: 0.35
---

# Circle

Use the `Circle` component to draw circles on a map.

## Options

You can pass a [CircleOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions) object to the `options` prop to configure your circle.

<!-- prettier-ignore -->
```vue
<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    mapTypeId="terrain"
    :center="center"
    :zoom="4"
  >
    <Circle v-for="circle in circles" :options="circle" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Circle } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Circle },
  setup() {
    const center = { lat: 37.09, lng: -95.712 }
    const cities = {
      chicago: {
        center: { lat: 41.878, lng: -87.629 },
        population: 2714856,
      },
      newyork: {
        center: { lat: 40.714, lng: -74.005 },
        population: 8405837,
      },
      losangeles: {
        center: { lat: 34.052, lng: -118.243 },
        population: 3857799,
      },
      vancouver: {
        center: { lat: 49.25, lng: -123.1 },
        population: 603502,
      },
    }

    const circles = {}

    for (const key in cities) {
      circles[key] = {
        center: cities[key].center,
        radius: Math.sqrt(cities[key].population) * 100,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      }
    }

    return { center, circles }
  },
})
</script>
```

\
<GoogleMap style="width: 100%; height: 500px" :center="{ lat: 37.09, lng: -95.712 }" :zoom="4" mapTypeId="terrain">
<Circle
v-for="{ center, population } in $page.frontmatter.cities"
:options="{ ...$page.frontmatter.circleStyles, center, radius: Math.sqrt(population) * 100 }"
/>
</GoogleMap>

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle-Events) on the `Circle` component.
