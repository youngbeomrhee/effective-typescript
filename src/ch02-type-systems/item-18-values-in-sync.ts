/* eslint-disable no-inner-declarations */
{
    interface ScatterProps {
        // The data
        xs: number[];
        ys: number[];

        // Display
        xRange: [number, number];
        yRange: [number, number];
        color: string;

        // Events
        onClick: (x: number, y: number, index: number) => void;
    }

    // 필요할 때에만 차트를 업데이트 하도록 최적화
    // 보수적 접근법 | (변경을 감지해서 update를 수행하는 기능) 실패에 닫힌 (fail close) 접근법
    // 차트는 정확하지만 너무 자주 다시 그려질 가능성도 있음
    function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
        let k: keyof ScatterProps;
        for (k in oldProps) {
            if (oldProps[k] !== newProps[k]) {
                if (k !== 'onClick') return true;
            }
        }
        return false;
    }

    // 실패에 열린 접근법
    // 불필요하게 다시 그려지는 단점은 해결되지만 프로퍼티가 추가될 경우 제대로 동작하지 않을 가능성도 존재
    function shouldUpdate2(oldProps: ScatterProps, newProps: ScatterProps) {
        return (
            oldProps.xs !== newProps.xs ||
            oldProps.ys !== newProps.ys ||
            oldProps.xRange !== newProps.xRange ||
            oldProps.yRange !== newProps.yRange ||
            oldProps.color !== newProps.color
            // (no check for onClick)
        );
    }

    // 주석으로 처리
    interface ScatterProps {
        xs: number[];
        ys: number[];
        // ...
        onClick: (x: number, y: number, index: number) => void;

        // Note: if you add a property here, update shouldUpdate!
    }

    // 속성과 update 여부를 정의한 타입 체커를 도입
    const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
        xs: true,
        ys: true,
        xRange: true,
        yRange: true,
        color: true,
        onClick: false,
        onDoubleClick: false,
    };

    function shouldUpdate3(oldProps: ScatterProps, newProps: ScatterProps) {
        let k: keyof ScatterProps;
        for (k in oldProps) {
            if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
                return true;
            }
        }
        return false;
    }

    // onDoubleClick 라는 새로운 프로퍼티가 추가되는 경우 REQUIRES_UPDATE에 오류 발생
    interface ScatterProps {
        // ...
        onDoubleClick: () => void;
    }
}
