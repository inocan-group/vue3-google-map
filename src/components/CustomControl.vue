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
import { defineComponent, PropType, watch, ref, inject, Ref, onBeforeUnmount } from "vue";
import { apiSymbol, mapSymbol, mapWasLoadedSymbol } from "../shared/index";
import { IControlPosition, IGoogleMapsAPI } from "../@types/index";

type ControlRef = HTMLElement & { index: number };

export default defineComponent({
  props: {
    position: {
      type: String as PropType<IControlPosition>,
      required: true,
    },
    index: {
      type: Number,
      default: 1,
    },
  },

  emits: ["content:loaded"],

  setup(props, { emit }) {
    const controlRef = ref<HTMLElement | null>(null);

    const map = inject(mapSymbol, ref(null));
    const api = inject(apiSymbol, ref(null));
    const mapWasLoaded = inject(mapWasLoadedSymbol, ref(false));

    const showContent = ref(false);

    // To avoid rendering the content outside the map we need to wait for the map AND the api to fully load
    const stopWatchingOnMapLoad = watch(
      [mapWasLoaded, api, controlRef],
      ([newMapLoadedStatus, newApi, newControlRef]) => {
        const contentRef = (newControlRef as unknown) as Ref<HTMLElement | null>;
        const mapLoadedStatus = newMapLoadedStatus as boolean;
        const api = newApi as IGoogleMapsAPI | null;

        if (api && mapLoadedStatus && contentRef) {
          addControl(props.position);

          showContent.value = true;

          emit("content:loaded");

          // As the watcher is imediately invoked if the api and the map was already loaded
          // the watchStopHandler wasnt created because this function has not fully executed
          // therefore i propagate the watchStopHandler execution on the event loop to ensure
          // it exists when its called.
          setTimeout(stopWatchingOnMapLoad, 0);
        }
      },
      { immediate: true }
    );

    const addControl = (controlPosition: IControlPosition) => {
      if (map.value && api.value && controlRef.value) {
        const position = api.value.ControlPosition[controlPosition];
        map.value.controls[position].push(controlRef.value);
      }
    };

    const removeControl = (controlPosition: IControlPosition) => {
      if (map.value && api.value) {
        let contentControlIndex: number | null = null;

        const position = api.value.ControlPosition[controlPosition];

        map.value.controls[position].forEach((node, idx) => {
          if (node === controlRef.value) contentControlIndex = idx;
        });

        if (contentControlIndex !== null) {
          map.value.controls[position].removeAt(contentControlIndex);
        }
      }
    };

    // Manually remove the control on component destruction
    onBeforeUnmount(() => removeControl(props.position));

    watch(
      () => props.position,
      (newPosition, oldPosition) => {
        // Very important to remove it first as adding the same node ref before removing it breaks stuff.
        removeControl(oldPosition);
        addControl(newPosition);
      }
    );

    watch(
      () => props.index,
      (newIndex) => {
        if (newIndex && controlRef.value) (controlRef.value as ControlRef).index = props.index;
      }
    );

    return { controlRef, showContent };
  },
});
</script>
