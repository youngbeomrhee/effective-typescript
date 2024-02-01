{
    interface Person {
        name: string;
    }

    const alice: Person = { name: 'Alice' };
    const bob = { name: 'Bob' } as Person;

    // 타입 선언을 사용한 경우에는 오류를 감지
    const alice2: Person = {};
    // 타입 단언을 사용한 경우에는 오류를 감지하지 못함
    const bob2 = {} as Person;

    // 속성을 추가할때도 마찬가지
    const alice3: Person = {
        name: 'Alice',
        occupation: 'Typescript developer',
        // Object literal may only specify known properties, and 'occupation' does not exist in type 'Person'.ts(2353)
    };

    const bob3 = {
        name: 'Bob',
        occupation: 'Javascript developer',
    } as Person;

    const people = ['alice', 'bob', 'jan'].map((name) => ({ name }));
    /*
    const people: {
        name: string;
    }[]
    */

    const people2 = ['alice', 'bob', 'jan'].map((name) => ({ name }) as Person);
    /*
    const people2: Person[]
    */

    const people3 = ['alice', 'bob', 'jan'].map((name) => ({}) as Person); // 오류 없음 -> 런타임시 오류

    const people4 = ['alice', 'bob', 'jan'].map((name) => {
        const person: Person = { name };
        return person;
    });

    const people5 = ['alice', 'bob', 'jan'].map((name): Person => ({ name }));

    const people6: Person[] = ['alice', 'bob', 'jan'].map(
        (name): Person => ({ name })
    );

    // 타입 단언이 꼭 필요한 경우: 타입 체커가 추론한 타입보다 개발자가 판단하는 타입이 더 정확할 때 의미가 있다
    document.querySelector('#myButton')?.addEventListener('click', (e) => {
        e.currentTarget;
        const button = e.currentTarget as HTMLButtonElement;
        button;
    });

    const elNull = document.getElementById('foo');
    elNull.textContent; // 'elNull' is possibly 'null'.ts(18047)

    const el = document.getElementById('foo')!;
    el.textContent;

    {
        interface Person {
            name: string;
        }
        const body = document.body;
        const el = body as Person;
        /**
        Conversion of type 'HTMLElement' to type 'Person' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
            Property 'name' is missing in type 'HTMLElement' but required in type 'Person'.ts(2352)
         */

        const el2 = document.body as unknown as Person;
    }
}
