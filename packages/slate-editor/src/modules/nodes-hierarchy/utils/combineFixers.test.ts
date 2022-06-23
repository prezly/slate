import { jest } from '@jest/globals';

import { combineFixers } from './combineFixers';

describe('combineFixers', () => {
    it('will stop on the first fixer', () => {
        const first = jest.fn(() => true);
        const second = jest.fn(() => true);
        const third = jest.fn(() => true);

        const fix = combineFixers([first, second, third]);
        const isFixed = fix(null as any, null as any);

        expect(first).toBeCalledTimes(1);
        expect(second).not.toBeCalled();
        expect(third).not.toBeCalled();
        expect(isFixed).toBe(true);
    });

    it('will stop on the second fixer', () => {
        const first = jest.fn(() => false);
        const second = jest.fn(() => true);
        const third = jest.fn(() => true);

        const fix = combineFixers([first, second, third]);
        const isFixed = fix(null as any, null as any);

        expect(first).toBeCalledTimes(1);
        expect(second).toBeCalledTimes(1);
        expect(third).not.toBeCalled();
        expect(isFixed).toBe(true);
    });

    it('will stop on the last fixer', () => {
        const first = jest.fn(() => false);
        const second = jest.fn(() => false);
        const third = jest.fn(() => true);

        const fix = combineFixers([first, second, third]);
        const isFixed = fix(null as any, null as any);

        expect(first).toBeCalledTimes(1);
        expect(second).toBeCalledTimes(1);
        expect(third).toBeCalledTimes(1);
        expect(isFixed).toBe(true);
    });

    it('will apply no fixers', () => {
        const first = jest.fn(() => false);
        const second = jest.fn(() => false);
        const third = jest.fn(() => false);

        const fix = combineFixers([first, second, third]);
        const isFixed = fix(null as any, null as any);

        expect(first).toBeCalledTimes(1);
        expect(second).toBeCalledTimes(1);
        expect(third).toBeCalledTimes(1);
        expect(isFixed).toBe(false);
    });
});
