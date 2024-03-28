{
    // keyof T와 for-in loop 활용
    const obj = {
        one: 'uno',
        two: 'dos',
        three: 'tres',
    };
    for (const k in obj) {
        const v = obj[k];
        // ~~~~~~ Element implicitly has an 'any' type
        //        because type ... has no index signature
    }
    let k: keyof typeof obj; // Type is "one" | "two" | "three"
    for (k in obj) {
        const v = obj[k]; // OK
    }
}
{
    // Object.entries 활용
    interface ABC {
        a: string;
        b: string;
        c: number;
    }
    function foo(abc: ABC) {
        for (const [k, v] of Object.entries(abc)) {
            k; // Type is string
            v; // Type is any
        }
    }
}
