import { PropType, type Ref } from "vue";
import { MarkerClustererOptions, MarkerClustererEvents } from "@googlemaps/markerclusterer";
import { DebouncedMarkerClusterer } from "./DebouncedMarkerClusterer";
export interface IMarkerClusterExposed {
    markerCluster: Ref<DebouncedMarkerClusterer | undefined>;
}
export declare const markerClusterEvents: MarkerClustererEvents[];
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<MarkerClustererOptions>;
        default: () => {};
    };
    renderDebounceDelay: {
        type: NumberConstructor;
        default: number;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, MarkerClustererEvents[], MarkerClustererEvents, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<MarkerClustererOptions>;
        default: () => {};
    };
    renderDebounceDelay: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onClusteringbegin?: ((...args: any[]) => any) | undefined;
    onClusteringend?: ((...args: any[]) => any) | undefined;
    "onGmp-click"?: ((...args: any[]) => any) | undefined;
}>, {
    options: MarkerClustererOptions;
    renderDebounceDelay: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
