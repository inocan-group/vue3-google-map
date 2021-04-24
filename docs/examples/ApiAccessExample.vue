<template>
  <GoogleMap ref="mapRef" class="map" :center="center" :zoom="2" v-bind="$attrs" />
  <label for="lng">Longitude</label>
  <input v-model.number="lng" id="lng" type="number" min="-180" max="180" step="10" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { GoogleMap } from "/@src/components/index";
import { IMap } from "/@src/@types/index";

type IGoogleMap = ReturnType<typeof defineComponent> & { ready: boolean; map: IMap };

export default defineComponent({
  components: { GoogleMap },
  setup() {
    const mapRef = ref<IGoogleMap | null>(null);
    const center = { lat: 0, lng: 0 };

    const _lng = ref(0);
    const lng = computed({
      get: () => _lng.value,
      set: (v) => {
        if (!Number.isFinite(v)) {
          _lng.value = 0;
        } else if (v > 180) {
          _lng.value = 180;
        } else if (v < -180) {
          _lng.value = -180;
        } else {
          _lng.value = v;
        }
      },
    });

    watch(lng, () => {
      if (mapRef.value?.ready) {
        mapRef.value.map.panTo({ lat: 0, lng: lng.value });
      }
    });

    return { mapRef, center, lng };
  },
});
</script>

<style scoped>
.map {
  position: relative;
}

.map::after {
  position: absolute;
  content: "";
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
  background: red;
}

input[type="number"] {
  width: 200px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
