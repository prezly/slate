import { combineFixers } from './combineFixers';

describe('combineFixers', () => {
    it('will apply only the first fixer', () => {
        let checker = 0;

        const fix = combineFixers([
            () => {
                checker = 1;
                return true;
            },
            () => {
                return true;
            },
            () => {
                return true;
            },
        ]);

        fix(null as any, null as any, []);

        expect(checker).toEqual(1);
    });

    it('will apply only the second fixer', () => {
        let checker = 0;

        const fix = combineFixers([
            () => {
                return false;
            },
            () => {
                checker = 1;
                return true;
            },
            () => {
                return true;
            },
        ]);

        fix(null as any, null as any, []);

        expect(checker).toEqual(1);
    });

    it('will apply only the last fixer', () => {
        let checker = 0;

        const fix = combineFixers([
            () => {
                return false;
            },
            () => {
                return false;
            },
            () => {
                checker = 1;
                return true;
            },
        ]);

        fix(null as any, null as any, []);

        expect(checker).toEqual(1);
    });

    it('will apply no fixers', () => {
        const checker = 0;

        const fix = combineFixers([
            () => {
                return false;
            },
            () => {
                return false;
            },
            () => {
                return false;
            },
        ]);

        fix(null as any, null as any, []);

        expect(checker).toEqual(0);
    });
});
