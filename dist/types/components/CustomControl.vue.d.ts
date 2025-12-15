import { PropType, Ref } from "vue";
import { IControlPosition } from "../@types/index";
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    position: {
        type: PropType<IControlPosition>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        default: number;
    };
}>, {
    controlRef: Ref<HTMLElement | null, HTMLElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "content:loaded"[], "content:loaded", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    position: {
        type: PropType<IControlPosition>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    "onContent:loaded"?: ((...args: any[]) => any) | undefined;
}>, {
    index: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
