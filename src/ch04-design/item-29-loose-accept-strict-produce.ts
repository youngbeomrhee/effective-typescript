interface CameraOptions {
    center?: LngLat;
    zoom?: number;
    bearing?: number;
    pitch?: number;
}
type LngLat =
    | { lng: number; lat: number }
    | { lon: number; lat: number }
    | [number, number];
type LngLatBounds =
    | { northeast: LngLat; southwest: LngLat }
    | [LngLat, LngLat]
    | [number, number, number, number];

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;
type Feature = any;
declare function calculateBoundingBox(
    f: Feature
): [number, number, number, number];

function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const {
        center: { lat, lng },
        zoom,
    } = camera;
    // ~~~      Property 'lat' does not exist on type ...
    //      ~~~ Property 'lng' does not exist on type ...
    zoom; // Type is number | undefined
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
}

// 개선안
{
    interface LngLat {
        lng: number;
        lat: number;
    }
    type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];

    interface Camera {
        center: LngLat;
        zoom: number;
        bearing: number;
        pitch: number;
    }
    interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
        center?: LngLatLike;
    }
    type LngLatBounds =
        | { northeast: LngLatLike; southwest: LngLatLike }
        | [LngLatLike, LngLatLike]
        | [number, number, number, number];

    declare function setCamera(camera: CameraOptions): void;
    declare function viewportForBounds(bounds: LngLatBounds): Camera;

    function focusOnFeature(f: Feature) {
        const bounds = calculateBoundingBox(f);
        const camera = viewportForBounds(bounds);
        setCamera(camera);
        const {
            center: { lat, lng },
            zoom,
        } = camera; // OK
        zoom; // Type is number
        window.location.search = `?v=@${lat},${lng}z${zoom}`;
    }
}
