{
    function countWords(text: string) {
        const counts: { [word: string]: number } = {};
        for (const word of text.split(/[\s,.]+/)) {
            counts[word] = 1 + (counts[word] || 0);
        }
        return counts;
    }
    console.log(countWords('Objects have a constructor and hasOwnProperty'));
}
{
    function countWordsMap(text: string) {
        const counts = new Map<string, number>();
        for (const word of text.split(/[\s,.]+/)) {
            counts.set(word, 1 + (counts.get(word) || 0));
        }
        return counts;
    }
    console.log(countWordsMap('Objects have a constructor and hasOwnProperty'));
}
