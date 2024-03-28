declare function map<U, V>(array: U[], fn: (u: U) => V): V[];

// type을 체크해주는 helper 함수
function assertType<T>(x: T) {}

{
    assertType<number[]>(map(['john', 'paul'], (name) => name.length));

    // 아래의 경우는 ok
    const n = 12;
    assertType<number>(n); // OK

    //
    const beatles = ['john', 'paul', 'george', 'ringo'];
    assertType<{ name: string }[]>(
        map(beatles, (name) => ({
            name,
            inYellowSubmarine: name === 'ringo',
        }))
    ); // OK

    const add = (a: number, b: number) => a + b;
    assertType<(a: number, b: number) => number>(add); // OK

    const double = (x: number) => 2 * x;
    assertType<(a: number, b: number) => number>(double); // OK!?

    // 선언된 것보다 적은 매개변수를 가진 함수를 할당하는 경우는 아무런 문제가 없음
    const g: (x: string) => number = () => 12; // OK
}
{
    // 매개변수 타입과 반환 타입만 분리하여 테스트 가능
    const double = (x: number) => 2 * x;
    const p: Parameters<typeof double> = null!;
    assertType<[number, number]>(p);
    //                           ~ Argument of type '[number]' is not
    //                             assignable to parameter of type [number, number]
    const r: ReturnType<typeof double> = null!;
    assertType<number>(r); // OK
}

{
    const beatles = ['john', 'paul', 'george', 'ringo'];
    assertType<number[]>(
        map(beatles, function (name, i, array) {
            // ~~~~~~~ Argument of type '(name: any, i: any, array: any) => any' is
            //         not assignable to parameter of type '(u: string) => any'
            assertType<string>(name);
            assertType<number>(i);
            assertType<string[]>(array);
            assertType<string[]>(this);
            // ~~~~ 'this' implicitly has type 'any'
            return name.length;
        })
    );
}

declare function map<U, V>(
    array: U[],
    fn: (this: U[], u: U, i: number, array: U[]) => V
): V[];
