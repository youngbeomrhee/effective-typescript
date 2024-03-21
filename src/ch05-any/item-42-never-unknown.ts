interface Book {
    name: string;
    author: string;
}

// 반환 타입을 알 수 없을 때 any로 지정하면 타입 체커가 의미 없어짐
{
    function parseYAML(yaml: string): any {
        // ...
    }
    const book = parseYAML(`
  name: Jane Eyre
  author: Charlotte Brontë
`);
    alert(book.title); // No error, alerts "undefined" at runtime
    book('read'); // No error, throws "TypeError: book is not a
    // function" at runtime
}
// unknown으로 변경한 경우
{
    function parseYAML(yaml: string): any {
        // ...
    }
    function safeParseYAML(yaml: string): unknown {
        return parseYAML(yaml);
    }
    const book = safeParseYAML(`
  name: The Tenant of Wildfell Hall
  author: Anne Brontë
`);
    alert(book.title);
    // ~~~~ Object is of type 'unknown'
    book('read');
    // ~~~~~~~~~~ Object is of type 'unknown'
}
// 그대로는 사용할 수 없게 때문에 반환 결과를 기대하던 타입으로 단언하게 됨
{
    function parseYAML(yaml: string): any {
        // ...
    }
    function safeParseYAML(yaml: string): unknown {
        return parseYAML(yaml);
    }
    const book = safeParseYAML(`
  name: Villette
  author: Charlotte Brontë
`) as Book;
    alert(book.title);
    // ~~~~~ Property 'title' does not exist on type 'Book'
    book('read');
    // ~~~~~~~~~ this expression is not callable
}

{
    // 어떤 타입이 올지 알 수 없는 properties
    interface Geometry {}
    interface Feature {
        id?: string | number;
        geometry: Geometry;
        properties: unknown;
    }
    {
        // 타입가드로도 체크 가능
        function processValue(val: unknown) {
            if (val instanceof Date) {
                val; // Type is Date
            }
        }
    }
    {
        // 사용자 정의 타입 가드도 원하는 타입으로 변환 가능
        function isBook(val: unknown): val is Book {
            return (
                typeof val === 'object' &&
                val !== null &&
                'name' in val &&
                'author' in val
            );
        }

        function processValue(val: unknown) {
            if (isBook(val)) {
                val; // Type is Book
            }
        }
    }
    {
        function parseYAML(yaml: string): any {
            // ...
        }
        // unknown대신 제네릭을 사용
        function safeParseYAML<T>(yaml: string): T {
            return parseYAML(yaml);
        }

        // 타입 단언문을 사용하는 방식과 큰 차이 없음
        // -> 제네릭보다는 unknown을 반환하고 사용자가
        const book1 = safeParseYAML(`
  name: Villette
  author: Charlotte Brontë
`) as Book;

        const book2 = safeParseYAML<Book>(`
  name: Villette
  author: Charlotte Brontë
`);
    }
}
// 단언문에서도 any 대신 unknown 형태가 보다 안전
interface Foo {
    foo: string;
}
interface Bar {
    bar: string;
}
declare const foo: Foo;
const barAny = foo as any as Bar;
const barUnk = foo as unknown as Bar;
// 두 개의 단언을 분리하는 리팩토링 진행시 any로의 단언이 퍼지는 문제가 있음
// 그런데 사실 이 경우는 현실적으로 발생하기 어렵기 때문에 any로 단언하지 말라는 내용으로 이해

// unknown과 유사하지만 조금 다른 object, {}
const barObj = foo as object as Bar;
const barObj2 = foo as {} as Bar; // Don't use `{}` as a type. `{}` actually means "any non-nullish value".
