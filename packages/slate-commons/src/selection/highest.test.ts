import { highest } from './highest';

describe('highest', function () {
    it('should return top-level path value for a given path', function () {
        expect(highest([2, 4, 5])).toEqual([2]);
        expect(highest([5])).toEqual([5]);
    });

    it('should return top-level path value for a given point', function () {
        expect(highest({ path: [2, 4, 5], offset: 10 })).toEqual([2]);
        expect(highest({ path: [5], offset: 1 })).toEqual([5]);
    });

    it('should return top-level focus point path for a given range', function () {
        expect(
            highest({
                anchor: { path: [2, 4, 5], offset: 10 },
                focus: { path: [5, 2], offset: 5 },
            }),
        ).toEqual([5]);
    });
});
