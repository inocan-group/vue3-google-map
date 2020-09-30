<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GoogleMap, Marker, CustomControl } from '@/components/index'

export default defineComponent({
  name: 'ServeDev',
  components: {
    GoogleMap,
    Marker,
    CustomControl,
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
    <GoogleMap api-key="" style="width: 100%; height: 80vh" :center="{ lat: 35, lng: -95 }" :zoom="13">
      <Marker :options="{ position: { lat: 35, lng: -95 + dist } }" />
      <Marker :options="{ position: { lat: 35, lng: -95 } }" @click="greet" />
      <CustomControl position="BOTTOM_CENTER">
        <button style="width: 60px; height: 20px; background: orange; color: white" @click="greet">Greet</button>
      </CustomControl>
    </GoogleMap>
  </div>
</template>
