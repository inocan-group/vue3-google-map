---
rectangle:
  strokeColor: "#FF0000"
  strokeOpacity: 0.8
  strokeWeight: 2
  fillColor: "#FF0000"
  fillOpacity: 0.35
  bounds:
    north: 33.685
    south: 33.671
    east: -116.234
    west: -116.251
---

# Rectangle

Use the `Rectangle` component to draw simple rectangles on a map.

## Options

You can pass a [RectangleOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions) object to the `options` prop to configure your rectangle.

<!-- prettier-ignore -->
```vue
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

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
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

    return { center, rectangle }
  },
})
</script>
```

\
<GoogleMap style="width: 100%; height: 500px" :center="{ lat: 33.678, lng: -116.243 }" :zoom="11" mapTypeId="terrain">
<Rectangle :options="$page.frontmatter.rectangle" />
</GoogleMap>

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle-Events) on the `Rectangle` component.
