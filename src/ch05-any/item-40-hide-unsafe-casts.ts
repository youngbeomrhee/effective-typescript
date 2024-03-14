declare function cacheLast<T extends Function>(fn: T): T;
declare function shallowEqual(a: any, b: any): boolean;
{
    function cacheLast<T extends Function>(fn: T): T {
        let lastArgs: any[] | null = null;
        let lastResult: any;
        return function (...args: any[]) {
            // 반환문에 있는 함수와 원본 함수 T 타입이 어떤 관련이 있는지 알지 못하기 때문에 오류 발생
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~
            //          Type '(...args: any[]) => any' is not assignable to type 'T'
            if (!lastArgs || !shallowEqual(lastArgs, args)) {
                lastResult = fn(...args);
                lastArgs = args;
            }
            return lastResult;
        };
    }
}
{
    function cacheLast<T extends Function>(fn: T): T {
        let lastArgs: any[] | null = null;
        let lastResult: any;
        return function (...args: any[]) {
            if (!lastArgs || !shallowEqual(lastArgs, args)) {
                lastResult = fn(...args);
                lastArgs = args;
            }
            return lastResult;
        } as unknown as T;
        // (...args: any[]) => any -> T와 동일한 매개변수로 호출되고 반환값 역시 예상한 결과이므로 단언문 사용
    }
}

declare function shallowObjectEqual<T extends object>(a: T, b: T): boolean;
{
    function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
        for (const [k, aVal] of Object.entries(a)) {
            if (!(k in b) || aVal !== b[k]) {
                // ~~~~ Element implicitly has an 'any' type
                //      because type '{}' has no index signature
                return false;
            }
        }
        return Object.keys(a).length === Object.keys(b).length;
    }
}
{
    function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
        for (const [k, aVal] of Object.entries(a)) {
            // k in b로 b객체에 k 속성이 있다는걸 확인했으므로 오류가 아님. 단언문 사용
            if (!(k in b) || aVal !== (b as any)[k]) {
                return false;
            }
        }
        return Object.keys(a).length === Object.keys(b).length;
    }
}
