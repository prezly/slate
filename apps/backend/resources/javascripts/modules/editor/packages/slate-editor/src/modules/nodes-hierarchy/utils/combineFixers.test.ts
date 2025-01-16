import { fake } from 'sinon';

import { combineFixers } from './combineFixers';

describe('combineFixers', () => {
    it('will stop on the first fixer', () => {
        const first = fake(() => true);
        const second = fake(() => true);
        const third = fake(() => true);

        const fix = combineFixers([first, second, third]);
        const isFixed = fix(null as any, null as any);

        expect(first).toBeCalledTimes(1);
        expect(second).not.toBeCalled();
        expect(third).not.toBeCalled();
        expect(isFixed).toBe(true);
    });

    it('will stop on the second fixer', () => {
        const first = fake(() => false);
        const second = fake(() => true);
        const third = fake(() => true);

        const fix = combineFixers([first, second, third]);
        const isFixed = fix(null as any, null as any);

        expect(first).toBeCalledTimes(1);
        expect(second).toBeCalledTimes(1);
        expect(third).not.toBeCalled();
        expect(isFixed).toBe(true);
    });

    it('will stop on the last fixer', () => {
        const first = fake(() => false);
        const second = fake(() => false);
        const third = fake(() => true);

        const fix = combineFixers([first, second, third]);
        const isFixed = fix(null as any, null as any);

        expect(first).toBeCalledTimes(1);
        expect(second).toBeCalledTimes(1);
        expect(third).toBeCalledTimes(1);
        expect(isFixed).toBe(true);
    });

    it('will apply no fixers', () => {
        const first = fake(() => false);
        const second = fake(() => false);
        const third = fake(() => false);

        const fix = combineFixers([first, second, third]);
        const isFixed = fix(null as any, null as any);

        expect(first).toBeCalledTimes(1);
        expect(second).toBeCalledTimes(1);
        expect(third).toBeCalledTimes(1);
        expect(isFixed).toBe(false);
    });
});
