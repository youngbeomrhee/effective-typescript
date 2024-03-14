{
    interface Vector2D {
        x: number;
        y: number;
    }
    function calculateNorm(p: Vector2D) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }

    calculateNorm({ x: 3, y: 4 }); // OK, result is 5
    const vec3D = { x: 3, y: 4, z: 1 };
    // 의도한바와 다르게 구조적 타이핑 때문에 (x, y가 있으므로) 호환 가능
    calculateNorm(vec3D); // OK! result is also 5
}
{
    interface Vector2D {
        _brand: '2d';
        x: number;
        y: number;
    }
    function vec2D(x: number, y: number): Vector2D {
        return { x, y, _brand: '2d' };
    }
    function calculateNorm(p: Vector2D) {
        return Math.sqrt(p.x * p.x + p.y * p.y); // Same as before
    }

    calculateNorm(vec2D(3, 4)); // OK, returns 5
    const vec3D = { x: 3, y: 4, z: 1 };
    // 'Vector2D' 타입이 아닌 경우 오류 발생
    calculateNorm(vec3D);
    // Argument of type '{ x: number; y: number; z: number; }' is not assignable to parameter of type 'Vector2D'.
}
{
    // 절대경로를 나타내는 타입을 선언하기 위해 브랜딩된 타입(nominal type) 기법 활용
    // -> 해당 타입을 직접 사용하기는 어렵고 보조함수 등을 통해서 활용 가능
    type AbsolutePath = string & { _brand: 'abs' };
    function listAbsolutePath(path: AbsolutePath) {
        // ...
    }
    function createAbsolutePath(path: string): AbsolutePath {
        if (!path.startsWith('/')) {
            throw new Error('경로는 "/"로 시작해야 합니다.');
        }
        return path as AbsolutePath;
    }

    const absPath = createAbsolutePath('/test');
    f(absPath);

    // 타입가드에 적용
    // is 구문은 Narrowing 파트 중 using type predicate 단락 참고 - https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
    function isAbsolutePath(path: string): path is AbsolutePath {
        return path.startsWith('/');
    }
    function f(path: string) {
        if (isAbsolutePath(path)) {
            listAbsolutePath(path);
        }
        listAbsolutePath(path);
        // ~~~~ Argument of type 'string' is not assignable
        //      to parameter of type 'AbsolutePath'
    }
}
{
    // 이진 탐색에 활용하는 경우. 이진 탐색의 대상인 이진트리가 정렬된 상태를 가정하는데 이런 상태를 타입 시스템으로는 표현하기 어렵다
    function binarySearch<T>(xs: T[], x: T): boolean {
        let low = 0,
            high = xs.length - 1;
        while (high >= low) {
            const mid = low + Math.floor((high - low) / 2);
            const v = xs[mid];
            if (v === x) return true;
            [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
        }
        return false;
    }
}
{
    // 정렬된 리스트라는 의도를 전달하기 위해 브랜딩된 타입 (nominal type) 적용
    type SortedList<T> = T[] & { _brand: 'sorted' };
    function isSorted<T>(xs: T[]): xs is SortedList<T> {
        for (let i = 0; i < xs.length; i++) {
            if (xs[i] < xs[i - 1]) {
                return false;
            }
        }
        return true;
    }
    function binarySearch<T>(xs: SortedList<T>, x: T): boolean {
        return true;
    }
    const xs = [1, 2, 4, 5, 3];
    if (isSorted(xs)) {
        const found = binarySearch(xs, 3);
        console.log(found);
    } else {
        console.log('목록이 정렬되지 않았습니다.');
    }
}
{
    // number 타입에 적용
    type Meters = number & { _brand: 'meters' };
    type Seconds = number & { _brand: 'seconds' };

    const meters = (m: number) => m as Meters;
    const seconds = (s: number) => s as Seconds;

    const oneKm = meters(1000); // Type is Meters
    const oneMin = seconds(60); // Type is Seconds

    // 단, 위와 같이 정의해도 산술연산 후에는 brand가 없어지기 때문에 실제로 사용하기에는 다소 무리
    const tenKm = oneKm * 10; // Type is number
    const v = oneKm / oneMin; // Type is number
}
