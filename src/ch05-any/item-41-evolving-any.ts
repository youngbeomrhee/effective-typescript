{
    function range(start: number, limit: number) {
        const out = [];
        for (let i = start; i < limit; i++) {
            out.push(i);
        }
        return out; // Return type inferred as number[]
    }
    {
        const result = []; // Type is any[]
        result.push('a');
        result; // Type is string[]
        result.push(1);
        result; // Type is (string | number)[]
    }
    {
        let val; // Type is any
        if (Math.random() < 0.5) {
            val = /hello/;
            val; // Type is RegExp
        } else {
            val = 12;
            val; // Type is number
        }
        val; // Type is number | RegExp
    }
    {
        // 위의 any의 진화는 암시적 any에서만 발생
        // 아래처럼 명시적인 any인 경우는 타입이 any로 유지됨
        let val: any; // Type is any
        if (Math.random() < 0.5) {
            val = /hello/;
            val; // Type is any
        } else {
            val = 12;
            val; // Type is any
        }
        val; // Type is any
    }
    {
        function range(start: number, limit: number) {
            const out = [];
            //    ~~~ Variable 'out' implicitly has type 'any[]' in some
            //        locations where its type cannot be determined
            if (start === limit) {
                return out;
                //     ~~~ Variable 'out' implicitly has an 'any[]' type
            }
            for (let i = start; i < limit; i++) {
                out.push(i);
            }
            return out;
        }
    }
    {
        // 함수호출을 거쳐도 진화하지 않는다
        function makeSquares(start: number, limit: number) {
            const out = [];
            // ~~~ Variable 'out' implicitly has type 'any[]' in some locations
            range(start, limit).forEach((i) => {
                out.push(i * i);
            });
            return out;
            // ~~~ Variable 'out' implicitly has an 'any[]' type
        }
    }
}
