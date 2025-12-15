type ICustomMarkerInterface = google.maps.OverlayView & {
    getPosition(): google.maps.LatLng | null;
    getVisible(): boolean;
    setOptions(options: google.maps.CustomMarkerOptions): void;
};
interface ICustomMarkerCtor {
    new (opts: google.maps.CustomMarkerOptions & {
        element?: HTMLElement;
    }): ICustomMarkerInterface;
}
export declare function createCustomMarkerClass(api: typeof google.maps): ICustomMarkerCtor;
export {};
