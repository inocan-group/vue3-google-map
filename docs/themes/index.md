---
sidebar: auto
---

# Themes

`vue3-google-map` comse with a curated set of default themes for you to use. You can also define custom styles utilizing the Google Maps API.

## Default Themes

To use a default theme simply pass the theme's name to the `theme` prop of the `GoogleMap` component. The available themes are:

- `aubergine`
- `dark`
- `grey`
- `minimal`
- `retro`
- `roadways`
- `roadwaysMinimal`
- `ultraLight`

<!-- prettier-ignore -->
```vue
<template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" :center="center" :zoom="4" :styles="theme" />
  <label for="theme">Theme</label>
  <select v-model="theme" id="theme">
    <option value="">-- None --</option>
    <option v-for="theme in themes" :value="theme" :key="theme">{{ theme }}</option>
  </select>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { GoogleMap } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap },
  setup() {
    const center = { lat: 39.50024, lng: -98.350891 }
    const themes = ['aubergine', 'dark', 'grey', 'minimal', 'retro', 'roadways', 'roadwaysMinimal', 'ultraLight']
    const theme = ref('')

    return { center, themes, theme }
  },
})
</script>

<style scoped>
select {
  width: 200px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
```

\
<ThemesExample style="width: 100%; height: 500px" />

## Custom Styles

::: warning
Please be aware that if you specify a default theme that it will overrride any custom styles you define.
:::

Alternatively you can define your own styles by passing them to the `styles` prop of the `GoogleMap` component. Please refer to the [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.styles) on custom styles.
