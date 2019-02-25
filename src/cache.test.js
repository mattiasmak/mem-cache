const assert = require('assert');
const cache = require('./cache');

describe(`Cache module`, () => {
    describe(`#should allow to put new value to cache`, () => {
        cache.put('test', 'apa');
        cache.put('test2', 'apa2');

        it(`Should return undefined for a non-existent market`, () => assert.deepStrictEqual(cache.get('test'), 'apa'));
        it(`Should return undefined for a non-existent market`, () =>
            assert.deepStrictEqual(cache.get('test2'), 'apa2'));
    });

    describe(`#should call timeout`, () => {
        jest.useFakeTimers();
        const spy = jest.fn();

        cache.put('key', 'value', 1, () => spy);

        expect(spy).not.toBeCalled();
        // Todo:
    });

    cache.debug();
});
