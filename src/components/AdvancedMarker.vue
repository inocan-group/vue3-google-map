<template>
  <div v-if="hasSlotContent" class="advanced-marker-wrapper">
    <div ref="markerRef" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRef,
  provide,
  computed,
  inject,
  markRaw,
  onBeforeUnmount,
  ref,
  watch,
  Comment,
} from "vue";
import { markerSymbol, apiSymbol, mapSymbol, markerClusterSymbol, markerClusterMethodsSymbol } from "../shared/index";
import equal from "fast-deep-equal";

const markerEvents = ["click", "drag", "dragend", "dragstart", "gmp-click"];

export default defineComponent({
  name: "AdvancedMarker",
  props: {
    options: {
      type: Object as PropType<google.maps.marker.AdvancedMarkerElementOptions>,
      required: true,
    },
    pinOptions: {
      type: Object as PropType<google.maps.marker.PinElementOptions>,
      required: false,
    },
  },
  emits: markerEvents,
  setup(props, { emit, expose, slots }) {
    const markerRef = ref<HTMLElement>();
    const hasSlotContent = computed(() => slots.default?.().some((vnode) => vnode.type !== Comment));

    const options = toRef(props, "options");
    const pinOptions = toRef(props, "pinOptions");

    const marker = ref<google.maps.marker.AdvancedMarkerElement>();

    const map = inject(mapSymbol, ref());
    const api = inject(apiSymbol, ref());
    const markerCluster = inject(markerClusterSymbol, ref());
    const markerClusterMethods = inject(markerClusterMethodsSymbol, undefined);

    const isMarkerInCluster = computed(
      () => !!(markerCluster.value && api.value && marker.value instanceof google.maps.marker.AdvancedMarkerElement)
    );

    watch(
      [map, options, pinOptions],
      async (_, [oldMap, oldOptions, oldPinOptions]) => {
        const hasOptionChange = !equal(options.value, oldOptions) || !equal(pinOptions.value, oldPinOptions);
        const hasChanged = hasOptionChange || map.value !== oldMap;

        if (!map.value || !api.value || !hasChanged) return;

        const { AdvancedMarkerElement, PinElement } = api.value.marker;

        if (marker.value) {
          const { map: _, content, ...otherOptions } = options.value;

          Object.assign(marker.value, {
            content: hasSlotContent.value
              ? markerRef.value
              : pinOptions.value
                ? new PinElement(pinOptions.value).element
                : content,
            ...otherOptions,
          });

          if (isMarkerInCluster.value) {
            markerClusterMethods?.removeMarker(marker.value);
            markerClusterMethods?.addMarker(marker.value);
          }
        } else {
          if (hasSlotContent.value) {
            options.value.content = markerRef.value;
          } else if (pinOptions.value) {
            options.value.content = new PinElement(pinOptions.value).element;
          }

          marker.value = markRaw(new AdvancedMarkerElement(options.value));

          if (isMarkerInCluster.value) {
            markerClusterMethods?.addMarker(marker.value);
          } else {
            marker.value.map = map.value;
          }

          markerEvents.forEach((event) => {
            marker.value?.addListener(event, (e: unknown) => emit(event, e));
          });
        }
      },
      {
        immediate: true,
      }
    );

    onBeforeUnmount(() => {
      if (marker.value) {
        api.value?.event.clearInstanceListeners(marker.value);

        if (isMarkerInCluster.value) {
          markerClusterMethods?.removeMarker(marker.value);
        } else {
          marker.value.map = null;
        }
      }
    });

    provide(markerSymbol, marker);

    expose({ marker });

    return { hasSlotContent, markerRef };
  },
});
</script>

<style>
.advanced-marker-wrapper {
  display: none;
}

.mapdiv .advanced-marker-wrapper {
  display: inline-block;
}
</style>
