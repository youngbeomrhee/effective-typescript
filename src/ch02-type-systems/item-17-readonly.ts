/* eslint-disable no-inner-declarations */
import { DeepReadonly } from 'ts-essentials';

{
    function arraySum(arr: number[]) {
        let sum = 0,
            num;
        while ((num = arr.pop()) !== undefined) {
            sum += num;
        }
        return sum;
    }
    function printTriangles(n: number) {
        const nums = [];
        for (let i = 0; i < n; i++) {
            nums.push(i);
            console.log(arraySum(nums));
        }
        console.log(nums);
    }
    printTriangles(5);

    // readonly 도입
    function arraySum2(arr: readonly number[]) {
        let sum = 0,
            num;
        while ((num = arr.pop()) !== undefined) {
            // ~~~ 'pop' does not exist on type 'readonly number[]'
            sum += num;
        }
        return sum;
    }

    // 매개변수를 변경하지 않는 방식으로 개선
    function arraySum3(arr: readonly number[]) {
        let sum = 0;
        for (const num of arr) {
            sum += num;
        }
        return sum;
    }
}
{
    const a: number[] = [1, 2, 3];
    const b: readonly number[] = a;
    const c: number[] = b;
}
{
    // readonly는 얕게 동작
    const dates: readonly Date[] = [new Date()];
    dates.push(new Date());
    // ~~~~ Property 'push' does not exist on type 'readonly Date[]'
    dates[0].setFullYear(2037); // OK

    interface Outer {
        inner: {
            x: number;
        };
    }
    const o: Readonly<Outer> = { inner: { x: 0 } };
    o.inner = { x: 1 };
    // ~~~~ Cannot assign to 'inner' because it is a read-only property
    o.inner.x = 1; // OK

    type T = Readonly<Outer>;
    // type T = {
    //     readonly inner: {
    //         x: number;
    //     };
    // };

    const oDeep: DeepReadonly<Outer> = { inner: { x: 0 } };
    oDeep.inner = { x: 1 };
    //    ~~~~ Cannot assign to 'inner' because it is a read-only property
    oDeep.inner.x = 1; // OK
    //          ~ Cannot assign to 'x' because it is a read-only property.
}
{
    // 인덱스 시그니처에도 사용 가능
    // let obj: { readonly [k: string]: number } = {};
    let obj: Readonly<{ [k: string]: number }> = {};
    obj.hi = 45;
    //  ~~ Index signature in type ... only permits reading
    obj = { ...obj, hi: 12 }; // OK
    obj = { ...obj, bye: 34 }; // OK
}

interface Todo {
    title: string;
}

const todo: Readonly<Todo> = {
    title: 'Delete inactive users',
};

todo.title = 'Hello';
