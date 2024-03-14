import { Feature, Geometry } from 'geojson';

{
    interface BoundingBox {
        lat: [number, number];
        lng: [number, number];
    }
    {
        type GeoJSONFeature = any;
        function calculateBoundingBox(f: GeoJSONFeature): BoundingBox | null {
            const box: BoundingBox | null = null;

            const helper = (coords: any[]) => {
                // ...
            };

            const { geometry } = f;
            if (geometry) {
                helper(geometry.coordinates);
            }

            return box;
        }
    }
    {
        // 임의로 정의한 GeoJSONFeature 대신 API의 Feature을 참조해서 잘못된 프로퍼티 체크
        function calculateBoundingBox(f: Feature): BoundingBox | null {
            const box: BoundingBox | null = null;

            const helper = (coords: any[]) => {
                // ...
            };

            const { geometry } = f;
            if (geometry) {
                helper(geometry.coordinates);
                // ~~~~~~~~~~~
                // Property 'coordinates' does not exist on type 'Geometry'
                //   Property 'coordinates' does not exist on type
                //   'GeometryCollection'
            }

            return box;
        }
    }
    {
        function calculateBoundingBox(f: Feature): BoundingBox | null {
            const box: BoundingBox | null = null;

            const helper = (coords: any[]) => {
                // ...
            };

            const { geometry } = f;
            if (geometry) {
                // geometry.type이 'GeometryCollection'인 경우 명시적으로 차단
                if (geometry.type === 'GeometryCollection') {
                    throw new Error('GeometryCollections are not supported.');
                }
                helper(geometry.coordinates);
            }

            return box;
        }
    }
    {
        function calculateBoundingBox(f: Feature): BoundingBox | null {
            const box: BoundingBox | null = null;

            const helper = (coords: any[]) => {
                // ...
            };

            // 모든 타입을 지원하도록 새로운 헬퍼함수 생성
            const geometryHelper = (g: Geometry) => {
                if (geometry.type === 'GeometryCollection') {
                    geometry.geometries.forEach(geometryHelper);
                } else {
                    helper(geometry.coordinates);
                }
            };

            const { geometry } = f;
            if (geometry) {
                geometryHelper(geometry);
            }

            return box;
        }
    }
}
