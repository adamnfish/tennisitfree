const utils = require("./utils");

const {groupCount, formatDate, resolveDate} = utils;


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

describe('resolveDate', () => {
    // edge case when tests are run just before midnight is low risk for this project
    const today = new Date();

    test('with no args uses current date', () => {
        expect(resolveDate(undefined, today)).toEqual(today);
    });

    test('uses current date if today was provided', () => {
        expect(resolveDate("today", today)).toEqual(today);
    });

    test('uses today +1 day if tomorrow was provided', () => {
        const result = resolveDate("tomorrow", today);
        const expected = new Date(today);
        expected.setDate(today.getDate() + 1);
        expect(result).toEqual(expected);
    });

    test('uses today +1 day if +1 was provided', () => {
        const result = resolveDate("+1", today);
        const expected = new Date(today);
        expected.setDate(today.getDate() + 1);
        expect(result).toEqual(expected);
    });

    test('uses today +3 day if +3 was provided', () => {
        const result = resolveDate("+3", today);
        const expected = new Date(today);
        expected.setDate(today.getDate() + 3);
        expect(result).toEqual(expected);
    });
});
