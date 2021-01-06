<template>
  <div ref="controlRef"><slot /></div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, inject } from 'vue';
import { ApiSymbol, MapSymbol } from '../shared/index';
import { IControlPosition } from '../@types/index';

export default defineComponent({
  props: {
    position: {
      type: String as PropType<IControlPosition>,
      required: true,
    },
    index: Number,
  },
  setup(props) {
    const controlRef = ref<HTMLElement | null>(null);

    const map = inject(MapSymbol, ref(null));
    const api = inject(ApiSymbol, ref(null));

    watch(
      [map, () => props.position, () => props.index] as const,
      (_, [__, oldPosition], onInvalidate) => {
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
      },
    );

    return { controlRef };
  },
});
</script>
