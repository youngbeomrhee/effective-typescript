{
    function parseCSV(
        contents: string | Buffer
    ): { [column: string]: string }[] {
        if (typeof contents === 'object') {
            // It's a buffer
            return parseCSV(contents.toString('utf8'));
        }
        // COMPRESS
        return [];
        // END
    }
}
{
    // Buffer는 @types/node에 정의.
    // Node와 무관한 개발자에게는 불필요한 의존성이 발생
    // -> 구조적 타이핑을 활용하여 toString이라는 이름의 메서드를 가진 새로운 인터페이스를 정의해서 사용
    interface CsvBuffer {
        toString(encoding: string): string;
    }
    function parseCSV(
        contents: string | CsvBuffer
    ): { [column: string]: string }[] {
        if (typeof contents === 'object') {
            // It's a buffer
            return parseCSV(contents.toString('utf8'));
        }
        // COMPRESS
        return [];
        // END
    }

    parseCSV(new Buffer('column1,column2\nval1,val2', 'utf-8')); // OK
}
