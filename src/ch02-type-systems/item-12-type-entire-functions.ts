{
    // statement (function declaration) vs expression
    function rollDice1(sides: number): number {} // 문
    const rollDice2 = function (sides: number): number {}; // 식
    const rollDice3 = (sides: number): number => {}; // 식

    // 함수 시그니처를 선언하여 함수 표현식에 재사용 할 수 있기 때문에 함수 표현식을 권장
    type DiceRollFn = (sides: number) => number;
    const rollDice4: DiceRollFn = (sides) => {
        return Math.floor(Math.random() * 6) + 1;
    };
}
{
    // 함수 타입 선언으로 불필요한 코드의 반복 줄이기
    function add(a: number, b: number) {
        return a + b;
    }
    function sub(a: number, b: number) {
        return a - b;
    }
    function mul(a: number, b: number) {
        return a * b;
    }
    function div(a: number, b: number) {
        return a / b;
    }
}
{
    // 함수 타입 도입 및 함수 표현식에 적용
    type BinaryFn = (a: number, b: number) => number;
    const add: BinaryFn = (a, b) => a + b;
    const sub: BinaryFn = (a, b) => a - b;
    const mul: BinaryFn = (a, b) => a * b;
    const div: BinaryFn = (a, b) => a / b;
}
{
    // declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    async function checkedFetch(input: RequestInfo, init?: RequestInit) {
        const response = await fetch(input, init);
        if (!response.ok) {
            throw new Error('Request failed: ' + response.status);
        }
        return response;
    }
}
{
    // typeof를 활용해서 Wrapping하고자 하는 함수의 타입을 직접 활용
    const checkedFetch: typeof fetch = async (input, init) => {
        const response = await fetch(input, init);
        if (!response.ok) {
            throw new Error('Request failed: ' + response.status);
        }
        return response;
    };
}
