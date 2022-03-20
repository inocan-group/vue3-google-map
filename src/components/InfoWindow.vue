<template>
  <div ref="infoWindowRef" v-if="hasSlotContent" v-show="mapTilesLoaded">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, computed, inject, onBeforeUnmount, Comment } from "vue";
import { apiSymbol, mapSymbol, mapTilesLoadedSymbol } from "../shared/index";

const infoWindowEvents = ["closeclick", "content_changed", "domready", "position_changed", "visible", "zindex_changed"];

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<google.maps.InfoWindowOptions>,
      required: true,
    },
  },

  emits: infoWindowEvents,

  setup(props, { slots, emit }) {
    let _infoWindow: google.maps.InfoWindow;
    const infoWindow = ref<google.maps.InfoWindow>();
    const infoWindowRef = ref<HTMLElement>();

    const map = inject(mapSymbol, ref(null));
    const api = inject(apiSymbol, ref(null));
    const mapTilesLoaded = inject(mapTilesLoadedSymbol, ref(false));

    const hasSlotContent = computed(() => slots.default?.().some((vnode) => vnode.type !== Comment));

    watch(
      [map, () => props.options, mapTilesLoaded],
      ([_, options, newMapTilesLoaded], [oldMap, oldOptions, oldMapTilesLoaded]) => {
        const checkIfChanged = JSON.stringify(options) !== JSON.stringify(oldOptions) || map.value !== oldMap;

        if (map.value && api.value && (checkIfChanged || (newMapTilesLoaded && !oldMapTilesLoaded))) {
          if (_infoWindow) {
            _infoWindow.setOptions({
              ...options,
              content: hasSlotContent.value ? infoWindowRef.value : options.content,
            });

            if (!hasSlotContent.value || mapTilesLoaded.value) _infoWindow.open({ map: map.value });
          } else {
            infoWindow.value = _infoWindow = new api.value.InfoWindow({
              ...options,
              content: hasSlotContent.value ? infoWindowRef.value : options.content,
            });

            if (!hasSlotContent.value || mapTilesLoaded.value) _infoWindow.open({ map: map.value });

            infoWindowEvents.forEach((event) => {
              _infoWindow?.addListener(event, (e: unknown) => emit(event, e));
            });
          }
        }
      },
      {
        immediate: true,
      }
    );

    onBeforeUnmount(() => {
      if (_infoWindow) {
        api.value?.event.clearInstanceListeners(_infoWindow);
        _infoWindow.close();
      }
    });

    return { infoWindow, infoWindowRef, hasSlotContent, mapTilesLoaded };
  },
});
</script>
