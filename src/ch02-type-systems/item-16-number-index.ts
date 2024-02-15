{
    const xs = [1, 2, 3];
    const x0 = xs[0]; // number
    const x1 = xs['1']; // number
    function get<T>(array: T[], k: string): T {
        return array[k];
        // Element implicitly has an 'any' type because index expression is not of type 'number'.ts(7015)
    }
}
{
    const xs = [1, 2, 3];
    const keys = Object.keys(xs); // Type is string[]
    for (const key in xs) {
        key; // Type is string
        const x = xs[key]; // Type is number
    }
}
{
    const xs = [1, 2, 3];
    for (const x of xs) {
        x; // Type is number
    }
}
{
    const xs = [1, 2, 3];
    xs.forEach((x, i) => {
        i; // Type is number
        x; // Type is number
    });
}
{
    const xs = [1, 2, 3];
    for (let i = 0; i < xs.length; i++) {
        const x = xs[i];
        if (x < 0) break;
    }
}
// 배열과 비슷한 형태의 튜플을 사용하고 싶을 때 사용하는 ArrayLike
{
    const xs = [1, 2, 3];
    function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
        if (i < xs.length) {
            return xs[i];
        }
        throw new Error(`Attempt to access ${i} which is past end of array.`);
    }
}
{
    const xs = [1, 2, 3];
    const tupleLike: ArrayLike<string> = {
        '0': 'A',
        '1': 'B',
        length: 2,
    };
}
