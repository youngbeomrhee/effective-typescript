{
    let x = 'hello';
    x = 1234;
}
{
    interface Square {
        width: number;
    }
    interface Rectangle extends Square {
        height: number;
    }
    type Shape = Square | Rectangle;

    {
        // type 정보는 런타임시에 제거됨
        function calculateArea(shape: Shape) {
            if (shape instanceof Rectangle) {
                // 'Rectangle' only refers to a type, but is being used as a value here.ts(2693)
                return shape.width * shape.height;
                // Property 'height' does not exist on type 'Shape'.
                // Property 'height' does not exist on type 'Square'.ts(2339)
            } else {
                return shape.width * shape.width;
            }
        }
    }
    {
        // 타입가드 적용 (태그된 union : tagged union)
        function calculateArea(shape: Shape) {
            if ('height' in shape) {
                shape; // (parameter) shape: Rectangle
                return shape.width * shape.height;
            } else {
                shape; // (parameter) shape: Square
                return shape.width * shape.width;
            }
        }
    }
}
{
    // 인터페이스는 타입으로만 사용 가능하지만, Rectangle을 클래스로 선언하면 타입과 값으로 모두 사용할 수 있다
    class Square {
        constructor(public width: number) {}
    }
    class Rectangle extends Square {
        constructor(
            public width: number,
            public height: number
        ) {
            super(width);
        }
    }
    type Shape = Square | Rectangle;

    function calculateArea(shape: Shape) {
        if (shape instanceof Rectangle) {
            shape; // (parameter) shape: Rectangle
            return shape.width * shape.height;
        } else {
            shape; // (parameter) shape: Square
            return shape.width * shape.width;
        }
    }
}
{
    // number로 값을 narrowing하는 잘못된 방법
    function asNumber(val: number | string): number {
        return val as number;
    }
}
{
    // 런타임시에 값을 정제하는 방법
    // 이런 방식이 좋은지 의문이 듦
    function asNumber(val: number | string): number {
        return typeof val === 'string' ? Number(val) : val;
    }
}

{
    // 함수오버로딩 구현 불가
    function add(a: number, b: number) {
        return a + b;
    }
    function add(a: string, b: number) {
        return a + b;
    }
}
{
    //
    function add(a: number, b: number): number;
    function add(a: string, b: number): string;
    function add(a, b) {
        return a + b;
    }
    const three = add(1, 2);
    const twelve = add('1', 2);
}
