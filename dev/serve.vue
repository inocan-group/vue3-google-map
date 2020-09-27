<script lang="ts">
import Vue from 'vue';
import { Vue3GoogleMapsSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    Vue3GoogleMapsSample,
  }
});
</script>

<template>
  <div id="app">
    <vue3-google-maps-sample />
  </div>
</template>
