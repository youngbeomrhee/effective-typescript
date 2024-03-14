{
    // 유효한 값들의 형식
    [
        12,
        'red',
        ['+', 1, 2],
        ['/', 20, 2],
        ['case', ['>', 20, 10], 'red', 'blue'],
        ['rgb', 255, 0, 127],
    ];
    /*
    // 위의 값들을 모델링해 볼 수 있는 입력값의 종류
    1. 모두 허용
    2. 문자열, 숫자, 배열 허용
    3. 문자열, 숫자, 알려진 함수 이름으로 시작하는 배열 허용
    4. 각 함수가 받는 매개변수의 개수가 정확한지 확인
    5. 각 함수가 받는 매개변수의 타입이 정확한지 확인
    */
}
{
    // 1. 모두 허용
    // 2. 문자열, 숫자, 배열 허용
    type Expression1 = any;
    type Expression2 = number | string | any[];
    const tests: Expression2[] = [
        10,
        'red',
        true,
        // ~~~ Type 'true' is not assignable to type 'Expression2'
        ['+', 10, 5],
        ['case', ['>', 20, 10], 'red', 'blue', 'green'], // Too many values
        ['**', 2, 31], // Should be an error: no "**" function
        ['rgb', 255, 128, 64],
        ['rgb', 255, 0, 127, 0], // Too many values
    ];
}
{
    // 정밀도를 한 단계 더 끌어 올리기 위해서 튜플의 첫 번째 요소에 문자열 리터럴 타입의 유니온 사용
    type FnName = '+' | '-' | '*' | '/' | '>' | '<' | 'case' | 'rgb';
    type CallExpression = [FnName, ...any[]];
    type Expression3 = number | string | CallExpression;

    const tests: Expression3[] = [
        10,
        'red',
        true,
        // ~~~ Type 'true' is not assignable to type 'Expression3'
        ['+', 10, 5],
        ['case', ['>', 20, 10], 'red', 'blue', 'green'],
        ['**', 2, 31],
        // ~~~~~~~~~~~ Type '"**"' is not assignable to type 'FnName'
        ['rgb', 255, 128, 64],
    ];
}
{
    // 함수의 매개변수 개수가 정확한지 확인하기 위해 각 인터페이스를 나열해서 호출표현식을 정의
    type Expression4 = number | string | CallExpression;

    type CallExpression = MathCall | CaseCall | RGBCall;

    // 고정 길이의 배열을 나타내는 튜플로 표현
    interface MathCall {
        0: '+' | '-' | '/' | '*' | '>' | '<';
        1: Expression4;
        2: Expression4;
        length: 3;
    }

    interface CaseCall {
        0: 'case';
        1: Expression4;
        2: Expression4;
        3: Expression4;
        length: 4 | 6 | 8 | 10 | 12 | 14 | 16; // etc.
    }

    interface RGBCall {
        0: 'rgb';
        1: Expression4;
        2: Expression4;
        3: Expression4;
        length: 4;
    }

    const tests: Expression4[] = [
        10,
        'red',
        true,
        // ~~~ Type 'true' is not assignable to type 'Expression4'
        ['+', 10, 5],
        ['case', ['>', 20, 10], 'red', 'blue', 'green'],
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //  Type '["case", [">", ...], ...]' is not assignable to type 'Expression4'
        ['**', 2, 31],
        // ~~~~~~~~~~~~ Type '"**"' is not assignable to type '"+" | "/" | ">" | "-" | "*" | "<"'.
        ['rgb', 255, 128, 64],
        ['rgb', 255, 128, 64, 73],
        // ~~~~~~~~~~~~~~~~~~~~~~~~ Type '["rgb", number, number, number, number]'
        //                          is not assignable to type 'Expression4'
    ];
    // -> 무효한 표현식에서 전부 오류가 발생. 하지만 정의한 내용 외에도 아래처럼 유효한 표현이 있는 경우 오류로 처리됨

    const okExpressions: Expression4[] = [
        ['-', 12],
        // ~~~~~~~~~ Type '["-", number]' is not assignable to type 'Expression4'.
        ['+', 1, 2, 3],
        // ~~~~~~~~~~~~~~ Type '["+", number, ...]' is not assignable to type 'Expression4'
        ['*', 2, 3, 4],
        // ~~~~~~~~~~~~~~ Type '["*", number, ...]' is not assignable to type 'Expression4'
    ];
}
