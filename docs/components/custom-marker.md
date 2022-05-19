# Custom Marker

Regular markers can be customized a great deal but if you need to you can use the `CustomMarker` component and provide your own custom markup through it's `default` slot.

## Options

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `position` | `{ lat: number, lng: number}` | Sets the marker position. |
| `anchorPoint` | `'CENTER' \| 'TOP_CENTER' \|'BOTTOM_CENTER' \| 'LEFT_CENTER' \| 'RIGHT_CENTER' \| 'TOP_LEFT' \| 'TOP_RIGHT' \| 'BOTTOM_LEFT' \| 'BOTTOM_RIGHT'` | Sets how the marker is anchored relative to it's `position` point. Default is `CENTER`. |
| `offsetX` | `number` | Horizontal offset from the `position` point. |
| `offsetY` | `number` | Vertical offset from the `position` point. |
| `zIndex` | `number` | `z-index` value of the marker. |

<!-- prettier-ignore -->
```vue
<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <CustomMarker :options="{ position: center, anchorPoint: 'BOTTOM_CENTER' }">
      <div style="text-align: center">
        <div style="font-size: 1.125rem">Vuejs Amsterdam</div>
        <img src="https://vuejs.org/images/logo.png" width="50" height="50" style="margin-top: 8px" />
      </div>
    </CustomMarker>
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, CustomMarker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, CustomMarker },
  setup() {
    const center = { lat: 52.36834, lng: 4.88635 }

    return { center }
  },
})
</script>
```

\
<GoogleMap style="width: 100%; height: 500px" :center="{ lat: 52.36834, lng: 4.88635 }" :zoom="15">
<CustomMarker :options="{ position: { lat: 52.36834, lng: 4.88635 }, anchorPoint: 'BOTTOM_CENTER' }">
<div style="text-align: center">
<div style="font-size: 1.125rem">Vuejs Amsterdam</div>
<img src="https://vuejs.org/images/logo.png" width="50" height="50" style="margin-top: 8px" />
</div>
</CustomMarker>
</GoogleMap>
