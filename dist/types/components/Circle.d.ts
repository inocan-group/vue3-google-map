import { PropType } from "vue";
export declare const circleEvents: string[];
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.CircleOptions>;
        required: true;
    };
}>, {
    circle: import("vue").Ref<google.maps.Circle | undefined, google.maps.Circle | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: PropType<google.maps.CircleOptions>;
        required: true;
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
