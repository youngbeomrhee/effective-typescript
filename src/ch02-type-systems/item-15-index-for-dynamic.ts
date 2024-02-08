{
    const rocket = {
        name: 'Falcon 9',
        variant: 'Block 5',
        thrust: '7,607 kN',
    };

    // 인덱스 시그니처를 명시하여 유연하게 타입을 매핑 -> 하지만 잘못된 프로퍼티는 체크하지 못한다
    type Rocket = { [property: string]: string };
    const rocket2: Rocket = {
        name: 'Falcon 9',
        variant: 'v1.0',
        thrust: '4,940 kN',
    };
}
{
    // interface로 명시
    interface Rocket {
        name: string;
        variant: string;
        thrust_kN: number;
    }
    const falconHeavy: Rocket = {
        name: 'Falcon Heavy',
        variant: 'v1',
        thrust_kN: 15_200,
    };
}

// index signature가 필요한 경우
function parseCSV(input: string): { [columnName: string]: string }[] {
    const lines = input.split('\n');
    const [header, ...rows] = lines;
    return rows.map((rowStr) => {
        const row: { [columnName: string]: string } = {};
        rowStr.split(',').forEach((cell, i) => {
            row[header[i]] = cell;
        });
        return row;
    });
}
interface ProductRow {
    productId: string;
    name: string;
    price: string;
}

declare let csvData: string;
const products = parseCSV(csvData) as unknown as ProductRow[];
function safeParseCSV(
    input: string
): { [columnName: string]: string | undefined }[] {
    return parseCSV(input);
}
const rows = parseCSV(csvData);
const prices: { [produt: string]: number } = {};
for (const row of rows) {
    prices[row.productId] = Number(row.price);
}

const safeRows = safeParseCSV(csvData);
for (const row of safeRows) {
    if (row.productId) {
        // undefined가 오는 경우 체크
        prices[row.productId] = Number(row.price);
    }
}

{
    // 너무 광범위
    interface Row1 {
        [column: string]: number;
    }

    // 보다 나은 방식
    interface Row2 {
        a: number;
        b?: number;
        c?: number;
        d?: number;
    }

    // 가장 정확하지만 사용하기 번거로움
    type Row3 =
        | { a: number }
        | { a: number; b: number }
        | { a: number; b: number; c: number }
        | { a: number; b: number; c: number; d: number };

    // Record 도입
    type Vec3D = Record<'x' | 'y' | 'z', number>;
    // Type Vec3D = {
    //   x: number;
    //   y: number;
    //   z: number;
    // }
    type ABC = { [k in 'a' | 'b' | 'c']: k extends 'b' ? string : number };
    // Type ABC = {
    //   a: number;
    //   b: string;
    //   c: number;
    // }
}
