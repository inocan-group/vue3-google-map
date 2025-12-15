import { PropType } from "vue";
export declare const infoWindowEvents: string[];
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.InfoWindowOptions>;
        default: () => {};
    };
    modelValue: {
        type: BooleanConstructor;
    };
}>, {
    infoWindow: import("vue").Ref<google.maps.InfoWindow | undefined, google.maps.InfoWindow | undefined>;
    infoWindowRef: import("vue").Ref<HTMLElement | undefined, HTMLElement | undefined>;
    hasSlotContent: import("vue").ComputedRef<boolean | undefined>;
    open: (opts?: google.maps.InfoWindowOpenOptions) => void;
    close: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.InfoWindowOptions>;
        default: () => {};
    };
    modelValue: {
        type: BooleanConstructor;
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {
    options: google.maps.InfoWindowOptions;
    modelValue: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
