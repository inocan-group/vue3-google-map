<template>
  <GoogleMap :center="center" :styles="theme" :zoom="4" v-bind="$attrs" />
  <label for="theme">Theme</label>
  <select v-model="theme" id="theme">
    <option value="">-- None --</option>
    <option v-for="(theme, key) in themes" :value="theme" :key="key">{{ key }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { GoogleMap } from "/@src/components/index";
import * as themes from "/@src/themes/index";

export default defineComponent({
  components: { GoogleMap },
  setup() {
    const center = { lat: 39.50024, lng: -98.350891 };
    const theme = ref("");

    return { center, themes, theme };
  },
});
</script>

<style scoped>
select {
  width: 200px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
