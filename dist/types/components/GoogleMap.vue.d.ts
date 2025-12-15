import { PropType } from "vue";
import { IControlPosition } from "../@types/index";
export declare const __resetOptionsFlag: () => void;
export declare const mapEvents: string[];
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    apiPromise: {
        type: PropType<Promise<typeof google>>;
    };
    apiKey: {
        type: StringConstructor;
        default: string;
    };
    version: {
        type: StringConstructor;
        default: string;
    };
    libraries: {
        type: PropType<string[]>;
        default: () => string[];
    };
    region: {
        type: StringConstructor;
        required: false;
    };
    language: {
        type: StringConstructor;
        required: false;
    };
    backgroundColor: {
        type: StringConstructor;
        required: false;
    };
    center: {
        type: PropType<google.maps.LatLng | google.maps.LatLngLiteral>;
        default: () => {
            lat: number;
            lng: number;
        };
    };
    clickableIcons: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    colorScheme: {
        type: PropType<keyof typeof google.maps.ColorScheme>;
        required: false;
    };
    controlSize: {
        type: NumberConstructor;
        required: false;
    };
    disableDefaultUi: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    disableDoubleClickZoom: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    draggable: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    draggableCursor: {
        type: StringConstructor;
        required: false;
    };
    draggingCursor: {
        type: StringConstructor;
        required: false;
    };
    fullscreenControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    fullscreenControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    gestureHandling: {
        type: PropType<"cooperative" | "greedy" | "none" | "auto">;
        required: false;
    };
    heading: {
        type: NumberConstructor;
        required: false;
    };
    isFractionalZoomEnabled: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    keyboardShortcuts: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    mapTypeControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    mapTypeControlOptions: {
        type: PropType<google.maps.MapTypeControlOptions>;
        required: false;
    };
    mapTypeId: {
        type: PropType<google.maps.MapTypeId | string>;
        required: false;
    };
    mapId: {
        type: StringConstructor;
        required: false;
    };
    maxZoom: {
        type: NumberConstructor;
        required: false;
    };
    minZoom: {
        type: NumberConstructor;
        required: false;
    };
    noClear: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    panControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    panControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    restriction: {
        type: PropType<google.maps.MapRestriction>;
        required: false;
    };
    rotateControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    rotateControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    scaleControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    scaleControlStyle: {
        type: PropType<google.maps.ScaleControlStyle>;
        required: false;
    };
    scrollwheel: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    streetView: {
        type: PropType<google.maps.StreetViewPanorama>;
        required: false;
    };
    streetViewControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    streetViewControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    styles: {
        type: PropType<google.maps.MapTypeStyle[]>;
        required: false;
    };
    tilt: {
        type: NumberConstructor;
        required: false;
    };
    zoom: {
        type: NumberConstructor;
        required: false;
    };
    zoomControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    zoomControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    cameraControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    cameraControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
}>, {
    mapRef: import("vue").Ref<HTMLElement | undefined, HTMLElement | undefined>;
    ready: import("vue").Ref<boolean, boolean>;
    map: import("vue").Ref<google.maps.Map | undefined, google.maps.Map | undefined>;
    api: import("vue").Ref<typeof google.maps | undefined, typeof google.maps | undefined>;
    mapTilesLoaded: import("vue").Ref<boolean, boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    apiPromise: {
        type: PropType<Promise<typeof google>>;
    };
    apiKey: {
        type: StringConstructor;
        default: string;
    };
    version: {
        type: StringConstructor;
        default: string;
    };
    libraries: {
        type: PropType<string[]>;
        default: () => string[];
    };
    region: {
        type: StringConstructor;
        required: false;
    };
    language: {
        type: StringConstructor;
        required: false;
    };
    backgroundColor: {
        type: StringConstructor;
        required: false;
    };
    center: {
        type: PropType<google.maps.LatLng | google.maps.LatLngLiteral>;
        default: () => {
            lat: number;
            lng: number;
        };
    };
    clickableIcons: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    colorScheme: {
        type: PropType<keyof typeof google.maps.ColorScheme>;
        required: false;
    };
    controlSize: {
        type: NumberConstructor;
        required: false;
    };
    disableDefaultUi: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    disableDoubleClickZoom: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    draggable: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    draggableCursor: {
        type: StringConstructor;
        required: false;
    };
    draggingCursor: {
        type: StringConstructor;
        required: false;
    };
    fullscreenControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    fullscreenControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    gestureHandling: {
        type: PropType<"cooperative" | "greedy" | "none" | "auto">;
        required: false;
    };
    heading: {
        type: NumberConstructor;
        required: false;
    };
    isFractionalZoomEnabled: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    keyboardShortcuts: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    mapTypeControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    mapTypeControlOptions: {
        type: PropType<google.maps.MapTypeControlOptions>;
        required: false;
    };
    mapTypeId: {
        type: PropType<google.maps.MapTypeId | string>;
        required: false;
    };
    mapId: {
        type: StringConstructor;
        required: false;
    };
    maxZoom: {
        type: NumberConstructor;
        required: false;
    };
    minZoom: {
        type: NumberConstructor;
        required: false;
    };
    noClear: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    panControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    panControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    restriction: {
        type: PropType<google.maps.MapRestriction>;
        required: false;
    };
    rotateControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    rotateControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    scaleControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    scaleControlStyle: {
        type: PropType<google.maps.ScaleControlStyle>;
        required: false;
    };
    scrollwheel: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    streetView: {
        type: PropType<google.maps.StreetViewPanorama>;
        required: false;
    };
    streetViewControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    streetViewControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    styles: {
        type: PropType<google.maps.MapTypeStyle[]>;
        required: false;
    };
    tilt: {
        type: NumberConstructor;
        required: false;
    };
    zoom: {
        type: NumberConstructor;
        required: false;
    };
    zoomControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    zoomControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
    cameraControl: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    cameraControlPosition: {
        type: PropType<IControlPosition>;
        required: false;
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {
    apiKey: string;
    version: string;
    libraries: string[];
    center: google.maps.LatLng | google.maps.LatLngLiteral;
    clickableIcons: boolean;
    disableDefaultUi: boolean;
    disableDoubleClickZoom: boolean;
    draggable: boolean;
    fullscreenControl: boolean;
    isFractionalZoomEnabled: boolean;
    keyboardShortcuts: boolean;
    mapTypeControl: boolean;
    noClear: boolean;
    panControl: boolean;
    rotateControl: boolean;
    scaleControl: boolean;
    scrollwheel: boolean;
    streetViewControl: boolean;
    zoomControl: boolean;
    cameraControl: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
