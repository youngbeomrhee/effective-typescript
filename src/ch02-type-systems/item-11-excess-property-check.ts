{
    interface Room {
        numDoors: number;
        ceilingHeightFt: number;
    }
    const r: Room = {
        numDoors: 1,
        ceilingHeightFt: 10,
        elephant: 'present',
    };

    const obj = {
        numDoors: 1,
        ceilingHeightFt: 10,
        elephant: 'present',
    };
    const r2: Room = obj;

    // 타입스크립트는 단순히 런타임에 예뢰를 던지는 코드에 오류를 표시하는 것뿐 아니라, 의도와 다르게 작성된 코드까지 찾으려 한다
    interface Options {
        title: string;
        darkMode?: boolean;
    }
    function createWindow(options: Options) {
        if (options.darkMode) {
            // setDarkMode()
        }
    }
    createWindow({
        title: 'Spider Solitaire',
        darkmode: true,
    });

    // 할당하려는 대상이 객체리터럴이 아닌 경우에는 excess property check를 하지 않는다
    const o1: Options = document;
    const o2: Options = new HTMLAnchorElement();

    // 리터럴을 사용한 경우는 체크됨
    const o3: Options = { darkmode: true, title: 'Ski Free' };

    const intermediate = { darkmode: true, title: 'Ski Free' };
    const o4: Options = intermediate;

    const o5 = { darkmode: true, title: 'Ski Free' } as Options;

    // excess property check를 원치 않는다면, 인덱스 시그니처를 사용해서 타입스크립트가 추가적인 속성을 예상하도록 할 수 있다.
    interface Options2 {
        darkMode?: boolean;
        [otherOptions: string]: unknown;
    }
    const o6: Options2 = { darkmode: true };

    // 선택적 속성만 가지는 약한(weak) 타입에도 비슷한 체크가 동작
    interface LineChartOptions {
        logscale?: boolean;
        invertedYAxis?: boolean;
        areaChart?: boolean;
    }
    const opts = { logScale: true };
    const o: LineChartOptions = opts;
}
