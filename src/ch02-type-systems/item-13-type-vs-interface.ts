{
    type TState = {
        name: string;
        capital: string;
    };
    interface IState {
        name: string;
        capital: string;
    }

    /** 공통점 : 추가 속성 체크 */
    const wyoming: TState = {
        name: 'Wyoming',
        capital: 'Cheyenne',
        population: 500000,
    };
    const wyoming2: IState = {
        name: 'Wyoming',
        capital: 'Cheyenne',
        population: 500000,
    };

    /** 공통점 : 인덱스 시그니처 사용 가능 */
    type Tdict = { [key: string]: string };
    interface Idict {
        [key: string]: string;
    }

    /** 공통점 : 함수 타입 정의 가능 */
    type TFn = (x: number) => string;
    interface IFn {
        (x: number): string;
    }

    const fn: TFn = (x) => '';

    const fn2: TFn = (x) => '';

    type TFnWithProp = {
        (x: number): string;
        prop: string;
    };
    interface IFnWithProp {
        (x: number): string;
        prop: string;
    }

    /** 공통점 : 제네릭 가능 */
    type TPair<T> = {
        first: T;
        second: T;
    };
    interface IPair<T> {
        first: T;
        second: T;
    }

    /** 공통점 : 서로 확장 가능 */
    interface IStateWithPop extends TState {
        population: number;
    }
    type TStateWithPop = IState & { population: number };

    const stateWithPop: IStateWithPop = {
        name: '',
        capital: '',
        population: 0,
    };
    const stateWithPop2: TStateWithPop = {
        name: '',
        capital: '',
        population: 0,
    };

    // 참고 : interface는 타입의 조합을 확장하는 경우에도 object 타입 또는 object 타입의 intersection type만 가능
    type Tcomplex = string & number;
    type Tcomplex2 = ({ a: string } & { b: string }) | { c: string };
    interface Icomplex extends Tcomplex {} // An interface can only extend an object type or intersection of object types with statically known members.ts(2312)
    interface Icomplex2 extends Tcomplex2 {} // An interface can only extend an object type or intersection of object types with statically known members.ts(2312)

    /** 공통점 : class를 구현(implements)할 때 모두 사용 가능 */
    class StateT implements TState {
        name: string = '';
        capital: string = '';
    }
    class StateI implements IState {
        name: string = '';
        capital: string = '';
    }

    /** 차이점 : 유니온 타입은 있지만 유니온 인터페이스는 불가 */
    type TAorB = { a: string } | { b: string };

    interface IA {
        a: string;
    }
    interface IB {
        b: string;
    }
    // type으로 새롭게 정의하는 경우만 가능
    type TAorB2 = IA | IB;
    const aOrB: TAorB2 = {
        a: '',
    };

    // intersection은 type의 도움 없이 정의 가능
    interface IandB extends IA, IB {}
    const aAndB: IandB = {
        a: '',
        b: '',
    };

    /** 차이점 : interface는 타입을 확장할 수 있지만 union을 할수는 없음 */
    type Input = { i: string };
    type Output = { o: string };
    type NamedVariable = (Input | Output) & { name: string };

    // 본문의 예제 : interface의 제한을 설명하기에 적절하지 못하다
    interface VariableMap {
        [name: string]: Input | Output;
    }
    // 위와 같은 방식이라면 아래처럼 하면 그만
    interface VariableMap2 {
        [name: string]: (Input | Output) & { name: string };
    }

    interface VaraibleMap3 extends NamedVariable {} // An interface can only extend an object type or intersection of object types with statically known members.ts(2312)

    /** 차이점 : type이 보다 다양한 표현 가능. tuple, list 등 */
    type Pair = [number, number];
    type StringList = string[];
    type NamedNums = [string, ...number[]];

    // interface도 튜플과 비슷하게 구현은 가능
    interface ITuple {
        0: number;
        1: number;
        length: 2;
    }
    const t: ITuple = [10, 20]; // 0, 1, length만 속성으로 가짐
    const t2: Pair = [10, 20]; // 0, 1, length 이외에도 tuple, list의 속성 사용 가능

    /** 차이점 : 인터페이스는 다시 열어서 (re-opened) 새로운 프로퍼티 추가해서 확장할 수 있다. 선언병합(declaration merging)이라고도 한다.
     * 본문에 나온 augment보다는 extendable 이란 용어가 더 적절할듯 https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
     */
    {
        interface IState {
            name: string;
            capital: string;
        }
        interface IState {
            population: number;
        }
        const wyoming: IState = {
            name: 'Wyoming',
            capital: 'Cheyenne',
            population: 500000,
        };
    }
}
