{
    function hasTwelveLetterKey(o: { [key: string]: any }) {
        for (const key in o) {
            if (key.length === 12) {
                console.log(key, o[key]);
                return true;
            }
        }
        return false;
    }
}
{
    function hasTwelveLetterKey(o: object) {
        // object 타입은 객체의 키를 열거할 수는 있지만
        for (const key in o) {
            if (key.length === 12) {
                // 속성에 접근할 수 없음 ->
                console.log(key, o[key]);
                //               ~~~~~~ Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
                return true;
            }
        }
        return false;
    }
}
{
    type Fn0 = () => any; // any function callable with no params
    type Fn1 = (arg: any) => any; // With one param
    type FnN = (...args: any[]) => any; // With any number of params
    // same as "Function" type

    const numArgsBad = (...args: any) => args.length; // Returns any
    const numArgsGood = (...args: any[]) => args.length; // Returns number
}
