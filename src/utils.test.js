const utils = require("./utils");
const groupCount = utils.groupCount;
const formatDate = utils.formatDate;

describe('groupCount', () => {
    test('empty array works', () => {
        expect(groupCount([])).toEqual([]);
    });

    test('no duplicates works', () => {
        expect(groupCount([1, 2, 3]))
            .toEqual([[1, 1], [1, 2], [1, 3]]);
    });

    test('some duplicates works', () => {
        expect(groupCount([1, 2, 1, 3]))
            .toEqual([[2, 1], [1, 2], [1, 3]]);
    });

    test('lots of duplicates works', () => {
        expect(groupCount([1, 2, 1, 3, 1, 2, 3, 3]))
            .toEqual([[3, 1], [2, 2], [3, 3]]);
    });

    test('simple duplicates works', () => {
        expect(groupCount([1, 1, 1, 1]))
            .toEqual([[4, 1]]);
    });

});

describe('formatDate', () => {
    test('formats a Date properly', () => {
        const d = new Date(2020, 5, 27);
        expect(formatDate(d)).toEqual("2020-06-27");
    });
});
