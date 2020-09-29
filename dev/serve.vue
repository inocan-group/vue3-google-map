<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GoogleMap, Marker } from '@/components/index'

export default defineComponent({
  name: 'ServeDev',
  components: {
    GoogleMap,
    Marker,
  },
  setup() {
    const greet = () => alert('hi')
    const dist = ref(0)

    setInterval(() => {
      dist.value += 0.005
    }, 1000)

    return { greet, dist }
  },
})
</script>

<template>
  <div id="app">
    <GoogleMap
    api-key=""
      style="width: 100%; height: 80vh"
      :center="{ lat: 35, lng: -95 }"
      :zoom="13"
    >
      <Marker :options="{ position: { lat: 35, lng: -95 + dist } }" />
      <Marker :options="{ position: { lat: 35, lng: -95 } }" @click="greet" />
    </GoogleMap>
  </div>
</template>
