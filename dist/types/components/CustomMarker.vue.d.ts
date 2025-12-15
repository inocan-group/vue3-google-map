import { PropType } from "vue";
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.CustomMarkerOptions>;
        required: true;
    };
}>, {
    customMarkerRef: import("vue").Ref<HTMLElement | undefined, HTMLElement | undefined>;
    customMarker: import("vue").Ref<(google.maps.OverlayView & {
        getPosition(): google.maps.LatLng | null;
        getVisible(): boolean;
        setOptions(options: google.maps.CustomMarkerOptions): void;
    }) | undefined, (google.maps.OverlayView & {
        getPosition(): google.maps.LatLng | null;
        getVisible(): boolean;
        setOptions(options: google.maps.CustomMarkerOptions): void;
    }) | undefined>;
    hasSlotContent: import("vue").ComputedRef<boolean | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.CustomMarkerOptions>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
