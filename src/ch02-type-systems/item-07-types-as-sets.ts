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

// intersection(교집합), union(합집합)
{
    type AC = {
        a: number;
        c: number;
    };

    type BC = {
        b: number;
        c: number;
    };

    type C = {
        c: number;
    };

    // intersection
    type AC_INTERSECTION_BC = AC & BC;

    type IsSubset<T, U> = T extends U ? true : false;

    // 교집합인 경우 A와 B의 공통 프로퍼티인 c만 가져야 된다고 착각할 수 있지만 a, b, c 모두 있어야 AC의 부분집합이면서 동시에 BC의 부분집합일 수 있다
    // extends를 통한 확인
    type IsSubset1 = IsSubset<C, AC>; // false
    type IsSubset2 = IsSubset<C, BC>; // false

    type IsSubset3 = IsSubset<AC_INTERSECTION_BC, AC>; // true
    type IsSubset4 = IsSubset<AC_INTERSECTION_BC, BC>; // true

    // 할당 가능성을 통한 확인
    let ac: AC = { a: 1, c: 3 };
    let bc: BC = { b: 2, c: 3 };
    let c: C = { c: 3 };
    let ac_intersection_bc: AC_INTERSECTION_BC = { a: 1, b: 2, c: 3 };

    ac = c; // Property 'a' is missing in type 'C' but required in type 'AC'.ts(2741)
    c = ac; // c에 ac 할당 가능 -> ac가 c의 부분집합

    ac = ac_intersection_bc;
    ac_intersection_bc = ac;
    /**
        Type 'AC' is not assignable to type 'AC_INTERSECTION_BC'.
            Property 'b' is missing in type 'AC' but required in type 'BC'.ts(2322)
     */
    // ac_intersection_bc가 ac에 할당 가능하므로 ac_intersection_bc가 ac의 부분집합
    // bc도 동일

    // union
    type AC_UNION_BC = AC | BC;

    // extends를 통한 확인
    type IsSubset5 = IsSubset<AC, AC_UNION_BC>; // true
    type IsSubset6 = IsSubset<BC, AC_UNION_BC>; // true

    // 할당을 통한 확인
    const aUnionB4: AC_UNION_BC = ac;
    const aUnionB5: AC_UNION_BC = bc;

    // 참고: 합집합이기 때문에 AC, BC 혹은 둘의 조합 모두 가능
    const aUnionB6: AC_UNION_BC = { a: 1, c: 3 };
    const aUnionB7: AC_UNION_BC = { b: 2, c: 3 };
    const aUnionB8: AC_UNION_BC = { a: 1, b: 2, c: 3 };
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
{
    /**
    집합론으로 이해하는 타입스크립트
    https://itchallenger.tistory.com/874
    */
    /** boolean */
    // intersection: 교집합
    type falseAndtrue = false & true; // never
    type booleanAndTrue = boolean & true; // true (전체집합인 boolean은 교집합의 항등원) (항등원: 다른 요소와 연산을 수행했을 때 다른 요소를 변경하지 않고 그대로 반환하는 요소)
    type bool = true | false;
    type booleanAndTrue2 = bool & true; // true
    type trueAndNever = true & never; // never

    // Exclude: 차집합
    type excludeBooleanTrue = Exclude<boolean, true>; // false
    type excludeBooleanFalse = Exclude<boolean, false>; // true

    // Union: 합집합
    type trueOrNever = true | never; // true
    type booleanOrTrue = boolean | true; // boolean

    // extends: 부분집합 (is subset of, is sub-type of)
    type A = boolean extends never ? true : false; // false
    type B = true extends boolean ? true : false; // true
    type C = never extends false ? true : false; // true
    type D = never extends never ? true : false; // true

    type T1 = 0 | 1 extends 0 ? true : false; // false (0 | 1은 0의 부분집합이 아님)
    type T2 = 0 extends 0 | 1 ? true : false; // true (0은 0 | 1의 부분집합)

    type T3<T extends string> = T extends `prefix${infer Rest}` ? Rest : T;

    const t3: T3<'a'> = 'a';

    /** string */
    type aaOrAb = 'aa' | 'ab'; // "aa" | "ab"
    type aaAndAb = 'aa' & 'ab'; // never (not 'a')
    type aLiteralAndALiteral = `a{string}` & `a{number}`; // never (not 'a')

    /** object */
    // 상단의 intersection(교집합), union(합집합) 참고

    /** interface와 object 타입 */
    const x: {} = 9;
    type O = {};
    const o: O = 9;
    type numKey = keyof number;
}
