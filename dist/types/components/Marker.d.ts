import { PropType, Ref } from "vue";
export interface IMarkerExposed {
    marker: Ref<google.maps.Marker | undefined>;
}
export declare const markerEvents: string[];
/**
 * @deprecated The Marker component is deprecated as of February 2024. Use AdvancedMarker instead.
 * The google.maps.Marker API is deprecated and will be removed in a future version.
 * Migrate to AdvancedMarker for the latest features and better performance.
 * @see {@link https://developers.google.com/maps/deprecations} for more information.
 */
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.MarkerOptions>;
        required: true;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.MarkerOptions>;
        required: true;
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
