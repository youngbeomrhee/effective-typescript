{
    // 심벌(symbol)은 타입 공간이나 값 공간 중의 한 곳에 존재
    // 이름이 같더라도 속하는 공간에 따라 다른 것을 나타낼 수 있기 때문에 혼란스러울 수 있다
    interface Cylinder {
        radius: number;
        height: number;
    }

    const Cylinder = (radius: number, height: number) => ({ radius, height });

    function calculateVolume(shape: unknown) {
        if (shape instanceof Cylinder) {
            shape.radius;
        }
    }

    {
        interface Person {
            first: string;
            last: string;
        }
        const p: Person = { first: 'Jane', last: 'Jacobs' };

        function email(p: Person, subject: string, body: string): Response {}

        class Cylinder {
            radius = 1;
            height = 1;
        }

        function calculateVolume(shape: unknown) {
            if (shape instanceof Cylinder) {
                shape;
                shape.radius;
            }
        }

        // typeof
        type T1 = typeof p;
        type T2 = typeof email;

        const v1 = typeof p; // const v1: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
        const v2 = typeof email; // const v2: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

        const v = typeof Cylinder; // const v: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
        type T = typeof Cylinder; // type T = typeof Cylinder

        declare let fn: T;
        const c = new fn(); // let fn: new () => Cylinder

        type C = InstanceType<typeof Cylinder>; // type C = Cylinder

        const first: Person['first'] = p['first'];

        type PersonEl = Person['first' | 'last']; // 타입은 string
        type Tuple = [string, number, Date];
        type TupleEl = Tuple[number];

        {
            function Email(options: {
                person: Person;
                subject: string;
                body: string;
            }) {}
            function email({
                person,
                subject,
                body,
            }: {
                person: Person;
                subject: string;
                body: string;
            }) {
                person.first;
            }
            const email2: typeof Email = ({ person, subject, body }) => {
                person.first;
            };
        }
    }
}
