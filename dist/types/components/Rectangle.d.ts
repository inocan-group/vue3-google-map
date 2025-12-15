import { PropType } from "vue";
export declare const rectangleEvents: string[];
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.RectangleOptions>;
        required: true;
    };
}>, {
    rectangle: import("vue").Ref<google.maps.Rectangle | undefined, google.maps.Rectangle | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.RectangleOptions>;
        required: true;
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
