{
    // 선언의 모호함이 존재. number를 넘기고 string을 리턴하는 경우도 가능하다
    function double(x: number | string): number | string;
    function double(x: any) {
        return x + x;
    }

    const num = double(12); // Type is string | number
    const str = double('x'); // Type is string | number

    function f(x: number | string) {
        return double(x);
    }

    const res = f(12);
    const res2 = f('x');
}
{
    // 제네릭을 사용하면 타입을 한정할 수 있다
    function double<T extends number | string>(x: T): T;
    function double(x: any) {
        return x + x;
    }

    // 하지만 너무 구체적으로 잘못 한정됨
    const num = double(12); // number가 아니라 12인 literal 타입이 됨. 실제 리턴 결과는 24
    const str = double('x'); // string 아니라 'x'인 literal 타입이 됨. 실제 리턴 결과는 'xx'
}
{
    function double(x: number): number;
    function double(x: string): string;
    function double(x: any) {
        return x + x;
    }

    const num = double(12); // Type is number
    const str = double('x'); // Type is string

    // union type이 전달되는 경우에는 여전히 문제가 존재
    function f(x: number | string) {
        return double(x);
        // ~ Argument of type 'string | number' is not assignable
        //   to parameter of type 'string'
    }
}
{
    // 조건부 타입 도입
    function double<T extends number | string>(
        x: T
    ): T extends string ? string : number;
    function double(x: any) {
        return x + x;
    }

    const num = double(12); // Type is number
    const str = double('x'); // Type is string

    // f함수의 원본을 건드리지 않고 수정하려는 경우 아래처럼 overload로 타입을 명시
    // f함수를 수정할 수 있다면 double에 적용한 조건부 타입으로 수정하는게 가장 정확하다
    function f(x: number): number;
    function f(x: string): string;
    function f(x: number | string) {
        return double(x);
    }

    const fNum = f(12);
    const fStr = f('x');
}
