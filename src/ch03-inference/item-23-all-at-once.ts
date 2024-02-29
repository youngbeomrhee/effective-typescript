{
    interface Point {
        x: number;
        y: number;
    }
    const pt = { x: 3, y: 4 };
    const id = { name: 'Pythagoras' };
    const namedPoint = {};
    Object.assign(namedPoint, pt, id);
    namedPoint.name;
}
{
    interface Point {
        x: number;
        y: number;
    }
    const pt = { x: 3, y: 4 };
    const id = { name: 'Pythagoras' };
    const namedPoint = { ...pt, ...id };
    namedPoint.name; // OK, type is string
}

// 타입에 안전한 방식으로 조건부 속성을 추가하려면 속성을 추가하지 않는 null 또는 {}으로 객체 전개를 사용하면 됨
declare let hasMiddle: boolean;
const firstLast = { first: 'Harry', last: 'Truman' };
const president = {
    ...firstLast,
    ...(hasMiddle ? { middle: 'S' } : {}),
};
/**
const president: {
    middle?: string | undefined;
    first: string;
    last: string;
}
*/

let president4: {
    middle?: string;
    first: string;
    last: string;
};
// 선택적 필드로 정의되지 않음
let president2:
    | {
          middle: string;
          first: string;
          last: string;
      }
    | {
          first: string;
          last: string;
      };
president2.middle;

// 선택적 필드로 만들기 위해 헬퍼 함수를 사용
function addOptional<T extends object, U extends object>(
    a: T,
    b: U | null
): T & Partial<U> {
    return { ...a, ...b };
}
const president3 = addOptional(firstLast, hasMiddle ? { middle: 'S' } : null);
president3.middle;
