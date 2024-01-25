(() => {
    // Vector2D와 NamedVector의 관계를 선언하지 않았지만 호환되는 경우
    interface Vector2D {
        x: number;
        y: number;
    }

    function calculateLength(v: Vector2D) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    interface NamedVector {
        name: string;
        x: number;
        y: number;
    }
    const v: NamedVector = { x: 3, y: 4, name: 'Zee' };
    calculateLength(v);

    // 문제가 발생하는 경우
    interface Vector3D {
        x: number;
        y: number;
        z: number;
    }

    function normalize(v: Vector3D) {
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
        function calculateLengthL1(v: Vector3D) {
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
        function calculateLengthL1(v: Vector3D) {
            return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
        }
    }
})();
{
    class C {
        foo: string;
        constructor(foo: string) {
            this.foo = foo;
        }
    }

    const c = new C('instance of C');
    const d: C = { foo: 'object literal' }; // 정상
}
{
    // 구조적 타이핑이 유리한 경우
    interface Author {
        first: string;
        last: string;
    }
    function getAuthors(database: PostgresDB): Author[] {
        const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
        return authorRows.map((row) => ({ first: row[0], last: row[1] }));
    }
    {
        interface DB {
            runQuery: (sql: string) => any[];
        }

        function getAuthors(database: DB): Author[] {
            const authorRows = database.runQuery(
                `SELECT FIRST, LAST FROM AUTHORS`
            );
            return authorRows.map((row) => ({ first: row[0], last: row[1] }));
        }
    }
}
