# Custom Controls

Use the `CustomControl` component to add custom buttons/controls to your map.

## Usage

You can define the markup of your custom control in the `default` slot of the `CustomControl` component. The component itself takes two props:

- `position`: Defines the position of your custom control on the map. Its value must be one of the [ControlPosition](https://developers.google.com/maps/documentation/javascript/reference/control#ControlPosition) constants.
- `index` (optional): Controls the order of placement for custom controls that occupy the same position.

Refer to the [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/controls#CustomControls) on custom controls positioning.

<!-- prettier-ignore -->
```vue
<template>
  <GoogleMap
  api-key="YOUR_GOOGLE_MAPS_API_KEY"
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="13"
  >
    <CustomControl position="BOTTOM_CENTER">
      <button class="custom-btn" @click="sayHi">👋</button>
    </CustomControl>
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, CustomControl } from 'vue3-google-maps'

export default defineComponent({
  components: { GoogleMap, CustomControl },
  setup() {
    const center = { lat: 35, lng: -95 }
    const sayHi = () => alert('Hi!')

    return { center, sayHi }
  },
})
</script>

<style scoped>
.custom-btn {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}
</style>
```

\
<CustomControlExample style="width: 100%; height: 500px" />
