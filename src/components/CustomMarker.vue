<template>
  <div v-if="hasSlotContent" class="custom-marker-wrapper">
    <div ref="customMarkerRef" :style="{ cursor: !!$attrs.onClick ? 'pointer' : undefined }" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, Comment, onMounted } from "vue";
import { customMarkerClassSymbol } from "../shared/index";
import { useSetupMapComponent } from "../composables/index";

export default defineComponent({
  inheritAttrs: false,

  props: {
    options: {
      type: Object as PropType<google.maps.CustomMarkerOptions>,
      required: true,
    },
  },

  setup(props, { slots, emit }) {
    const customMarkerRef = ref<HTMLElement>();
    let customMarker = ref<InstanceType<typeof google.maps.CustomMarker>>();
    const hasSlotContent = computed(() => slots.default?.().some((vnode) => vnode.type !== Comment));
    const options = computed(() => ({
      ...props.options,
      element: customMarkerRef.value,
    }));

    onMounted(() => {
      customMarker = useSetupMapComponent(customMarkerClassSymbol, [], options, emit);
    });

    return { customMarkerRef, customMarker, hasSlotContent };
  },
});
</script>

<style scoped>
.custom-marker-wrapper {
  display: none;
}

.mapdiv .custom-marker-wrapper {
  display: inline-block;
}
</style>
