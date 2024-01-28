---
outline: false
---

<script setup>
import { GoogleMap, CustomMarker } from '@lib'
import { apiPromise } from '@docs/shared'

const center = { lat: 52.36834, lng: 4.88635 }
</script>

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

```vue
<script setup>
import { GoogleMap, CustomMarker } from 'vue3-google-map'

const center = { lat: 52.36834, lng: 4.88635 }
</script>

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
```

<ClientOnly>
  <GoogleMap
    :api-promise="apiPromise"
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
</ClientOnly>
