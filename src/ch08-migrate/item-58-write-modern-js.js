{
    // 객체의 인덱스 시그니처를 사용할 경우 프로토타입 체이닝 때문에 예상하지 못한 동작이 발생할 수 있다.
    function countWords(text) {
        var counts = {};
        for (var _i = 0, _a = text.split(/[\s,.]+/); _i < _a.length; _i++) {
            var word = _a[_i];
            counts[word] = 1 + (counts[word] || 0);
        }
        return counts;
    }
    console.log(countWords('Objects have a constructor and hasOwnProperty'));
}
{
    // 위와 같은 문제를 예방하려면 map을 사용한다
    function countWordsMap(text) {
        var counts = new Map();
        for (var _i = 0, _a = text.split(/[\s,.]+/); _i < _a.length; _i++) {
            var word = _a[_i];
            counts.set(word, 1 + (counts.get(word) || 0));
        }
        return counts;
    }
    console.log(countWordsMap('Objects have a constructor and hasOwnProperty'));
}
