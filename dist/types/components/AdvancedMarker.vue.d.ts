import { PropType, type Ref } from "vue";
export interface IAdvancedMarkerExposed {
    marker: Ref<google.maps.marker.AdvancedMarkerElement | undefined>;
}
export declare const markerEvents: string[];
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.marker.AdvancedMarkerElementOptions>;
        required: true;
    };
    pinOptions: {
        type: PropType<google.maps.marker.PinElementOptions>;
        required: false;
    };
}>, {
    hasCustomSlotContent: import("vue").ComputedRef<boolean | undefined>;
    markerRef: Ref<HTMLElement | undefined, HTMLElement | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.marker.AdvancedMarkerElementOptions>;
        required: true;
    };
    pinOptions: {
        type: PropType<google.maps.marker.PinElementOptions>;
        required: false;
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
