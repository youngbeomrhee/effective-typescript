"use strict";
{
    let x = 'hello';
    x = 1234;
}
{
    {
        // type 정보는 런타임시에 제거됨
        function calculateArea(shape) {
            if (shape instanceof Rectangle) {
                // 'Rectangle' only refers to a type, but is being used as a value here.ts(2693)
                return shape.width * shape.height;
                // Property 'height' does not exist on type 'Shape'.
                // Property 'height' does not exist on type 'Square'.ts(2339)
            }
            else {
                return shape.width * shape.width;
            }
        }
    }
    {
        // 타입가드 적용 (태그된 union : tagged union)
        function calculateArea(shape) {
            if ('height' in shape) {
                shape; // (parameter) shape: Rectangle
                return shape.width * shape.height;
            }
            else {
                shape; // (parameter) shape: Square
                return shape.width * shape.width;
            }
        }
    }
}
{
    // 인터페이스는 타입으로만 사용 가능하지만, Rectangle을 클래스로 선언하면 타입과 값으로 모두 사용할 수 있다
    class Square {
        width;
        constructor(width) {
            this.width = width;
        }
    }
    class Rectangle extends Square {
        width;
        height;
        constructor(width, height) {
            super(width);
            this.width = width;
            this.height = height;
        }
    }
    function calculateArea(shape) {
        if (shape instanceof Rectangle) {
            shape; // (parameter) shape: Rectangle
            return shape.width * shape.height;
        }
        else {
            shape; // (parameter) shape: Square
            return shape.width * shape.width;
        }
    }
}
{
    // number로 값을 narrowing하는 잘못된 방법
    function asNumber(val) {
        return val;
    }
}
{
    // 런타임시에 값을 정제하는 방법
    // 이런 방식이 좋은지 의문이 듦
    function asNumber(val) {
        return typeof val === 'string' ? Number(val) : val;
    }
}
{
    // 함수오버로딩 구현 불가
    function add(a, b) {
        return a + b;
    }
    function add(a, b) {
        return a + b;
    }
}
{
    function add(a, b) {
        return a + b;
    }
    const three = add(1, 2);
    const twelve = add('1', 2);
}
