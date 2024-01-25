"use strict";
// 유효한 코드이지만 transpile 없이 실행할수는 없는 코드
(() => {
    function greet(who) {
        console.log(`Hello, ${who}`);
    }
})();
// (오타로 인한) 오류를 사전에 감지
() => {
    let city = 'New York city';
    console.log(city.toUppercase());
    // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
};
// (실행시) 오류가 발생하지는 않지만 의도와 다르게 동작하는 코드
() => {
    const states = [
        { name: 'Alabama', capital: 'Montgomery' },
        { name: 'Alaska', capital: 'Juneau' },
        { name: 'Arizona', capital: 'Phoenix' },
    ];
    for (const state of states) {
        console.log(state.capitol);
        // Property 'capitol' does not exist on type '{ name: string; capital: string; }'. Did you mean 'capital'?ts(2551)
    }
};
// 잘못 제시된 해결책 (데이터와 코드 중 어느 쪽이 오타인지 판단하지 못함)
() => {
    const states = [
        { name: 'Alabama', capitol: 'Montgomery' },
        { name: 'Alaska', capitol: 'Juneau' },
        { name: 'Arizona', capitol: 'Phoenix' },
    ];
    for (const state of states) {
        console.log(state.capital);
        // Property 'capital' does not exist on type '{ name: string; capitol: string; }'. Did you mean 'capitol'?ts(2551)
    }
};
// 명시적으로 타입을 선언한 interface를 도입하여 위와 같은 문제를 해결
() => {
    const states = [
        { name: 'Alabama', capitol: 'Montgomery' },
        // Object literal may only specify known properties, but 'capitol' does not exist in type 'State'. Did you mean to write 'capital'?ts(2561)
        { name: 'Alaska', capitol: 'Juneau' },
        { name: 'Arizona', capitol: 'Phoenix' },
    ];
    for (const state of states) {
        console.log(state.capital);
    }
    // 타입 구문 없이 배열 안에서 딱 한 번 capitol이란 오타를 썼다면 인지하지 못함
    hiddenBomb: {
        const states = [
            { name: 'Alabama', capital: 'Montgomery' },
            { name: 'Alaska', capitol: 'Juneau' },
            { name: 'Arizona', capital: 'Phoenix' },
        ];
        for (const state of states) {
            console.log(state.capital);
        }
    }
    // interface를 도입하여 사전에 오류를 감지
    // @see hiddenBomb
    detecedBomb: {
        const states = [
            { name: 'Alabama', capital: 'Montgomery' },
            { name: 'Alaska', capitol: 'Juneau' },
            { name: 'Arizona', capital: 'Phoenix' },
        ];
        for (const state of states) {
            console.log(state.capital);
        }
    }
};
() => {
    // 정적 타입의 언어를 사용하는 경우라면 당황스러울 코드. 하지만 오류로 체크하지 않는다.
    // 책에 나와있는 예제만 보면 법칙이 모호해 보이지만 모든 자료형에 대해서 열거해보면 법칙은 명확하다
    // https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values
    undefined + undefined;
    undefined + null;
    undefined + true;
    undefined + ''; // 가능
    undefined + Symbol();
    undefined + 1;
    undefined + BigInt(1);
    undefined + new Object();
    null + undefined;
    null + null;
    null + true;
    null + ''; // 가능
    null + Symbol();
    null + 1;
    null + BigInt(1);
    null + new Object();
    true + undefined;
    true + null;
    true + true;
    true + ''; // 가능
    true + Symbol();
    true + 1;
    true + BigInt(1);
    true + new Object();
    '' + undefined;
    '' + null;
    '' + true;
    '' + '';
    '' + Symbol(); // 불가
    '' + 1;
    '' + BigInt(1);
    '' + new Object();
    Symbol() + undefined;
    Symbol() + null;
    Symbol() + true;
    Symbol() + ''; // 가능
    Symbol() + Symbol();
    Symbol() + 1;
    Symbol() + BigInt(1);
    Symbol() + new Object();
    1 + undefined;
    1 + null;
    1 + true;
    1 + ''; // 가능
    1 + Symbol();
    1 + 1; // 가능
    1 + BigInt(1);
    1 + new Object();
    BigInt(1) + undefined;
    BigInt(1) + null;
    BigInt(1) + true;
    BigInt(1) + ''; // 가능
    BigInt(1) + Symbol();
    BigInt(1) + 1;
    BigInt(1) + BigInt(1); // 가능
    BigInt(1) + new Object();
    new Object() + undefined;
    new Object() + null;
    new Object() + true;
    new Object() + ''; // 가능
    new Object() + Symbol();
    new Object() + 1;
    new Object() + BigInt(1);
    new Object() + new Object();
    // 연산자가 문자열을 이어붙이는 경우(피연산자가 하나라도 String 타입)는 Symbol을 제외하고 모두 가능
    /*
        Symbol을 붙일 수 없는 이유는 spec 상에 잘 정의되어 있다.
        요약하자면 + 연산자의 피연산자가 하나라도 String이면 ToString(피연산자)를 수행하여 값을 가져오는데 피연산자가 Symbol인 경우만 TypeError exception을 throw 한다.
        https://tc39.es/ecma262/#prod-AdditiveExpression
        https://tc39.es/ecma262/#sec-applystringornumericbinaryoperator
        https://tc39.es/ecma262/#sec-tostring
    */
    // 그 외에는 산술연산자로 동작하기 때문에 Numeric types(Number, BigInt)만 가능
    // cf) BigInt를 사용하기 위해서는 tsconfig.json의 target을 ES2020 이상으로 설정해야 한다.
};
// 타입 체크는 통과했지만 여전히 런타임에 오류가 발생하는 예제
(() => {
    const names = ['Alice', 'Bob'];
    console.log(names[2].toUpperCase());
})();
