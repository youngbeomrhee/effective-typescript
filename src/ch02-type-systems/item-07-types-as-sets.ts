// 값의 크기에 따른 분류
// 가장 작은 집합 : never
let x: never;

// 한 가지 값만 포함하는 타입 : literal
type A = 'a';
type B = 'b';
type Twelve = 12;

// union 타입
type AB = A | B;
type AB12 = A | B | Twelve;

// 할당 가능
const a: AB = 'a';
const c: AB = 'c'; // Type '"c"' is not assignable to type '"a"'.

// 타입 체커의 주요 역할은 하나의 집합이 다른 집합의 부분 집합인지 검사하는 것
const ab: AB = Math.random() < 0.5 ? 'a' : 'b'; // 정상, {'a', 'b'}는 {'a', 'b'}의 부분 집합
const ab12: AB12 = ab; // 정상, {'a', 'b'}는 {'a', 'b', 12}의 부분 집합

declare let twelve: AB12;
const back: AB = twelve;
// Type 'AB12' is not assignable to type 'AB'.
//   Type '12' is not assignable to type 'AB'.ts(2322)

// 타입 : 값의 집합
interface Person {
    name: string;
}
interface Lifespan {
    birth: Date;
    death?: Date;
}
type PersonSpan = Person & Lifespan;

const ps: PersonSpan = {
    name: 'Alan Turing',
    birth: new Date('1912/06/23'),
    death: new Date('1954/06/07'),
};

type K = keyof (Person | Lifespan); // type K = never
type Kn = keyof (Person & Lifespan); // type K = never

type x = keyof (A & B);

{
    interface Person {
        name: string;
    }
    interface PersonSpan extends Person {
        birth: Date;
        death?: Date;
    }
}

interface Vector1D {
    x: number;
}
interface Vector2D extends Vector1D {
    y: number;
}
interface Vector3D extends Vector2D {
    z: number;
}

// 인터섹션(intersection, 교집합)
// 추가적인 속성을 가지는 값도
{
    type A = {
        a: number;
    };

    type B = {
        b: number;
    };

    type AandB = A & B;
    type AorB = A | B;

    const aAndB: AandB = { a: 1, b: 2 };
    const aOrB: AorB = { a: 1 };
    const aOrB2: AorB = { b: 2 };
    const aOrB3: AorB = { a: 1, b: 2 };

    // aAndB는 A와 B의 부분집합
    // A 타입에 aAndB 할당
    const a: A = aAndB; // No error

    // B 타입에 aAndB 할당
    const b: B = aAndB; // No error

    // A와 B는 AorB의 부분집합
    const aOrB4: AorB = a;
    const aOrB5: AorB = b;
}
{
    // extends는 상속의 개념보다는 부분집합의 개념이다
    function getKey<K extends string>(key: K) {
        return key;
    }

    let x = getKey('x'); // let x: "x"
    let ab = getKey(Math.random() > 0.5 ? 'a' : 'b'); // let ab: "a" | "b"
    let s = getKey(document.title);
    let n = getKey(12); // Argument of type 'number' is not assignable to parameter of type 'string'.

    // keyof
    interface Point {
        x: number;
        y: number;
    }
    type pointKeys = keyof Point;

    function sortBy<K extends keyof T, T extends Record<K, number>>(
        vals: T[],
        key: K
    ): T[] {
        return vals.sort((a: T, b: T) => a[key] - b[key]);
    }
    const pts: Point[] = [
        { x: 1, y: 2 },
        { x: 2, y: 0 },
    ];
    sortBy(pts, 'x');
    sortBy(pts, 'y');
    sortBy(pts, Math.random() < 0.5 ? 'x' : 'y');
    sortBy(pts, 'z');
    /*
    Argument of type 'Point[]' is not assignable to parameter of type 'Record<"z", number>[]'.
        Property 'z' is missing in type 'Point' but required in type 'Record<"z", number>'.ts(2345)
    */
}
{
    type TsUn = string | number;
    type TsUd = string | Date;
    type TsUnITsUd = TsUn & TsUd;
    let complexed: TsUnITsUd; // -> string
}
{
    // 배열과 튜플의 관계
    const list = [1, 2]; // const list: number[]
    const tuple: [number, number] = list;
    /*
    Type 'number[]' is not assignable to type '[number, number]'.
        Target requires 2 element(s) but source may have fewer.
    */
    // -> number[]는 [number, number]의 부분집합이 아니다 -> number[]를 [number, number]에 대입할 수 없다
    // 역([number, number]를 number[]에 대입)은 성립한다
    const list2: [number, number] = [1, 2]; // const list: number[]
    const tuple2: number[] = list2;

    // 올바른 표현
    const list3: [number, number] = [1, 2];
    const tuple3: [number, number] = list3;
}
{
    const triple: [number, number, number] = [1, 2, 3];
    const doubleAsTriple: [number, number] = triple;
}
{
    type T = Exclude<string | Date, string | number>;
    const t: T = new Date();
    type NonZeroNums = Exclude<number, 0>;
    const nonZeroNum: NonZeroNums = 0;
}
