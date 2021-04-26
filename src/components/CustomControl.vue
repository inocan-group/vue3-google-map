<template>
  <!--
    v-show must be used instead of v-if otherwise there
    would be no rendered content pushed to the map controls
  -->
  <div ref="controlRef" v-show="showContent">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, inject } from "vue";
import { apiSymbol, mapSymbol } from "../shared/index";
import { IControlPosition } from "../@types/index";

export default defineComponent({
  props: {
    position: {
      type: String as PropType<IControlPosition>,
      required: true,
    },
    index: Number,
  },

  emits: ["content:loaded"],

  setup(props, { emit }) {
    const controlRef = ref<HTMLElement | null>(null);

    const map = inject(mapSymbol, ref(null));
    const api = inject(apiSymbol, ref(null));

    const showContent = ref(false);

    // To avoid rendering the content outside the map we need to wait for it to fully load
    const apiWatcherStopHandler = watch(api, () => {
      if (api.value && map.value) {
        api.value.event.addListenerOnce(map.value, "tilesloaded", () => {
          showContent.value = true;
          emit("content:loaded");
        });
        apiWatcherStopHandler();
      }
    });

    watch(
      [map, () => props.position, () => props.index] as const,
      (_, [_ignore, oldPosition], onInvalidate) => {
        if (map.value && api.value) {
          if (props.index) {
            (controlRef.value as HTMLElement & { index: number }).index = props.index;
          }

          if (controlRef.value) {
            map.value.controls[api.value.ControlPosition[props.position]].push(controlRef.value);
          }
        }

        onInvalidate(() => {
          if (map.value && api.value && oldPosition) {
            let index: number | undefined = undefined;

            // Not a native array so we have to iterate using forEach of MVCArray:
            // https://developers.google.com/maps/documentation/javascript/reference/event?hl=en#MVCArray
            map.value.controls[api.value.ControlPosition[oldPosition]].forEach((c, i) => {
              if (c === controlRef.value) {
                index = i;
              }
            });

            if (index) {
              map.value.controls[api.value.ControlPosition[oldPosition]].removeAt(index);
            }
          }
        });
      },
      {
        immediate: true,
      }
    );

    return { controlRef, showContent };
  },
});
</script>
