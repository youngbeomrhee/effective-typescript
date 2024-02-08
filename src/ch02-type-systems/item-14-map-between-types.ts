{
    // DRY 원칙
    interface Person {
        firstName: string;
        lastName: string;
    }
    interface PersonWithBirthDate {
        firstName: string;
        lastName: string;
        birth: Date;
    }
    // Person이 변경되도 PersonWithBirthDate에 반영되지 않음
    // -> 개선
    interface PersonWithBirthDate2 extends Person {
        birth: Date;
    }
    // 이미 존재하는 type일 경우 인터섹션을 통한 확장도 가능
    type PersonWithBirthDate3 = Person & { birth: Date };

    // 반복을 줄이는 방법 : 타입에 이름 붙이기
    function distance(
        a: { x: number; y: number },
        b: { x: number; y: number }
    ) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.x, 2));
    }

    // 리터럴로 정의된 type을 분리
    interface Point2D {
        x: number;
        y: number;
    }
    function distance2(a: Point2D, b: Point2D) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.x, 2));
    }

    // 함수가 같은 타입 시그니처를 공유하고 있는 경우
    {
        function get(url: string, opts: Options): Promise<Response> {}
        function post(url: string, opts: Options): Promise<Response> {}
    }

    // 함수 타입으로 분리
    {
        type HTTPFunction = (url: string, opts: Options) => Promise<Response>;
        const get: HTTPFunction = (url, opts) => {};
        const post: HTTPFunction = (url, opts) => {};
    }

    // 전체의 상태를 표현하는 State와 일정 부분만 표현하는 TopNavState의 경우
    interface State {
        userId: string;
        pageTitle: string;
        recentFiles: string[];
        pageContents: string;
    }

    interface TopNavState {
        userId: string;
        pageTitle: string;
        recentFiles: string[];
    }

    interface TopNavState {
        userId: State['userId'];
        pageTitle: State['pageTitle'];
        recentFiles: State['recentFiles'];
    }

    // interface로는 정의 불가
    interface TopNavState {
        [k in ('userId' | 'pageTitle' | 'recentFiles')]: State[k];
    }

    type TopNavState2 = {
        [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k];
    };

    // Pick을 활용하는 방법
    type TopNavState3 = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;

    /** 태그된 유니온에서의 중복 */
    interface SaveAction {
        type: 'save';
    }
    interface LoadAction {
        type: 'load';
    }
    type Action = SaveAction | LoadAction;
    // 반복
    type ActionType = 'save' | 'load';
    // Action을 indexing
    type ActionType2 = Action['type'];
    // 아래와는 다름
    type ActionType3 = Pick<Action, 'type'>;

    /** 모든 프로퍼티가 optional로 바뀌는 경우 */
    interface Options {
        width: number;
        height: number;
        color: string;
        label: string;
    }
    interface OptionsUpdate {
        width?: number;
        height?: number;
        color?: string;
        label?: string;
    }
    class UIWidget {
        constructor(init: Options) {
            /* ... */
        }
        update(options: OptionsUpdate) {
            /* ... */
        }
    }
    //
    type OptionsUpdate2 = { [k in keyof Options]?: Options[k] };

    // 해당 기능을 하는 메서드가 Partial로 도입되어 있음
    class UIWidget2 {
        constructor(init: Options) {
            /* ... */
        }
        update(options: Partial<Options>) {
            /* ... */
        }
    }

    /** 값의 형태에 해당하는 타입을 정의하는 경우 */
    {
        const INIT_OPTIONS = {
            width: 640,
            height: 480,
            color: '#00FF00',
            label: 'VGA',
        };
        interface Options {
            width: number;
            height: number;
            color: string;
            label: string;
        }
        type Optios2 = typeof INIT_OPTIONS;
    }

    /** */
    const INIT_OPTIONS = {
        width: 640,
        height: 480,
        color: '#00FF00',
        label: 'VGA',
    };
    function getUserInfo(userId: string) {
        const name = 'Bob';
        const age = 12;
        const height = 48;
        const weight = 70;
        const favoriteColor = 'blue';
        return {
            userId,
            name,
            age,
            height,
            weight,
            favoriteColor,
        };
    }

    // 표준 라이브러리의 ReturnType generic 도입
    type UserInfo = ReturnType<typeof getUserInfo>;

    /** 제네릭 타입은 타입을 위한 함수와 같다! */

    /** 제네릭을 함수로 봤을 때 매개변수를 제한하는 방법 */
    interface Name {
        first: string;
        last: string;
    }
    type DancingDuo<T extends Name> = [T, T];

    const couple1: DancingDuo<Name> = [
        { first: 'Fred', last: 'Astaire' },
        { first: 'Ginger', last: 'Rogers' },
    ]; // OK
    const couple2: DancingDuo<{ first: string }> = [
        /*
        Type '{ first: string; }' does not satisfy the constraint 'Name'.
            Property 'last' is missing in type '{ first: string; }' but required in type 'Name'.ts(2344) 
         */
        { first: 'Sonny' },
        { first: 'Cher' },
    ];

    const dancingDuo = <T extends Name>(x: DancingDuo<T>) => x;
    const couple3 = dancingDuo([
        { first: 'Fred', last: 'Astaire' },
        { first: 'Ginger', last: 'Rogers' },
    ]);
    const couple4 = dancingDuo([
        { first: 'Bono' },
        { first: 'Prince' },
        /*
        Property 'last' is missing in type '{ first: string; }' but required in type 'Name'.ts(2741)
        */
    ]);

    // pick을 간략하게 구현한 버젼에서의 오류
    type WrongPick<T, K> = { [k in K]: T[K] };
    // Type 'K' is not assignable to type 'string | number | symbol'.ts(2322)

    // 범위를 더 좁혀야 한다
    type RightPick<T, K extends keyof T> = { [k in K]: T[K] };
    interface Name {
        first: string;
        last: string;
    }
    type FirstLast = RightPick<Name, 'first' | 'last'>;
    type FirstMiddle = RightPick<Name, 'first' | 'middle'>;
    /*
    Type '"first" | "middle"' does not satisfy the constraint 'keyof Name'.
        Type '"middle"' is not assignable to type 'keyof Name'.ts(2344)
    */
}
