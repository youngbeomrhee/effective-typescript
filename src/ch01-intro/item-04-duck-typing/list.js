"use strict";
(() => {
    function calculateLength(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
    const v = { x: 3, y: 4, name: 'Zee' };
    calculateLength(v);
    function normalize(v) {
        // Vector3D에 x, y가 존재하므로 아래 코드는 오류 없이 실행됨
        const length = calculateLength(v);
        return {
            x: v.x / length,
            y: v.y / length,
            z: v.z / length,
        };
    }
    console.log(normalize({ x: 3, y: 4, z: 5 }));
    {
        function calculateLengthL1(v) {
            let length = 0;
            for (const axis of Object.keys(v)) {
                const coord = v[axis];
                // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Vector3D'.
                // No index signature with a parameter of type 'string' was found on type 'Vector3D'.
                length += Math.abs(coord);
            }
            return length;
        }
        const vec3D = { x: 3, y: 4, z: 1, address: '123 Broadway' };
        console.log(calculateLengthL1(vec3D));
    }
    {
        // 루프보다는 모든 속성을 각각 더하는 구현이 더 낫다
        function calculateLengthL1(v) {
            return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
        }
    }
})();
{
    class C {
        foo;
        constructor(foo) {
            this.foo = foo;
        }
    }
    const c = new C('instance of C');
    const d = { foo: 'object literal' }; // 정상
}
{
    function getAuthors(database) {
        const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
        return authorRows.map((row) => ({ first: row[0], last: row[1] }));
    }
    {
        function getAuthors(database) {
            const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
            return authorRows.map((row) => ({ first: row[0], last: row[1] }));
        }
    }
}
