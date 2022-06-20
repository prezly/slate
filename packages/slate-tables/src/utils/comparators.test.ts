import { compareNumbers } from './comparators';

describe('slate-tables - comparators', () => {
    it('should compare numbers using compareNumbers', () => {
        expect(compareNumbers(0, 1)).toBe(-1);
        expect(compareNumbers(1, 1)).toBe(0);
        expect(compareNumbers(1, 0)).toBe(1);
    });
});
