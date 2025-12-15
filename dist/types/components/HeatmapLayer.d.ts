import { PropType } from "vue";
type HeatmapLayerOptions = google.maps.visualization.HeatmapLayerOptions;
interface ExtendedHeatmapLayerOptions extends Omit<HeatmapLayerOptions, "data"> {
    data: HeatmapLayerOptions["data"] | (google.maps.LatLngLiteral | {
        location: google.maps.LatLngLiteral;
    })[];
}
/**
 * @deprecated The HeatmapLayer component was deprecated on May 27, 2025 and will be sunset in May 2026.
 * Google recommends migrating to third-party library integrations like deck.gl, which offers a HeatmapLayer implementation.
 * @see {@link https://developers.google.com/maps/deprecations} for more information.
 */
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<ExtendedHeatmapLayerOptions>;
        default: () => {};
    };
}>, {
    heatmapLayer: import("vue").Ref<google.maps.visualization.HeatmapLayer | undefined, google.maps.visualization.HeatmapLayer | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<ExtendedHeatmapLayerOptions>;
        default: () => {};
    };
}>> & Readonly<{}>, {
    options: ExtendedHeatmapLayerOptions;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
