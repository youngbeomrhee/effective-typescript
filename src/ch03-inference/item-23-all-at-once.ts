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

declare let hasDates: boolean;
const nameTitle = { name: 'Khufu', title: 'Pharaoh' };
const pharaoh = {
    ...nameTitle,
    ...(hasDates ? { start: -2589, end: -2566 } : {}),
};
pharaoh.start;
/*
const pharaoh: {
    start?: number | undefined;
    end?: number | undefined;
    name: string;
    title: string;
}
*/
// 책에서 나온대로 타입이 유니온으로 추론되지 않는다.
// -> 서문에 나온대로 typescript version 3.8.2로 변경하면 유니온으로 추론됨
// 논리적으로 봐도 위에 나온 타입에 안전한 방식으로 조건부 속성을 추가하는 president 예제와 동일한 구조인데 다른 결과가 나올 수 없다.
// -> 전개 대상이 1개인 경우 optional로, 2개 이상인 경우 union으로 추론됨. (end를 제거해보면 확인 가능)
// -> 직관적이지 않은 모호함 때문에 이후 버젼 (5.3.2에서 확인)에서는 이런 경우에 optional로 통일된 것으로 보임
